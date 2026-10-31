'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/stripe';
import type { Book } from '../lib/books';

// Only what the cards need is stored, not the whole summary.
function pick(book: Book) {
  return {
    id: book.id,
    title: book.title,
    author: book.author,
    subTitle: book.subTitle,
    imageLink: book.imageLink,
    audioLink: book.audioLink,
    averageRating: book.averageRating,
    subscriptionRequired: book.subscriptionRequired,
  };
}

type Item = { book: Book; saved: boolean; finished: boolean };

// Each book is one document: customers/{uid}/library/{bookId}
// with two flags, saved and finished. The document is deleted when both are false.
export function useLibrary() {
  const { user, loading: authLoading } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setItems([]);
      setDataLoading(false);
      return;
    }
    setDataLoading(true);
    const unsubscribe = onSnapshot(
      collection(db, 'customers', user.uid, 'library'),
      (snap) => {
        setItems(
          snap.docs.map((d) => {
            const data = d.data();
            return { book: data as unknown as Book, saved: !!data.saved, finished: !!data.finished };
          })
        );
        setDataLoading(false);
      },
      () => {
        setItems([]);
        setDataLoading(false);
      }
    );
    return unsubscribe;
  }, [user, authLoading]);

  const saved = useMemo(() => items.filter((i) => i.saved).map((i) => i.book), [items]);
  const finished = useMemo(() => items.filter((i) => i.finished).map((i) => i.book), [items]);

  const isSaved = useCallback((id: string) => items.some((i) => i.saved && i.book.id === id), [items]);

  const saveBook = useCallback(
    async (book: Book) => {
      if (!user) return;
      await setDoc(
        doc(db, 'customers', user.uid, 'library', book.id),
        { ...pick(book), saved: true, savedAt: serverTimestamp() },
        { merge: true }
      );
    },
    [user]
  );

  const unsaveBook = useCallback(
    async (id: string) => {
      if (!user) return;
      const ref = doc(db, 'customers', user.uid, 'library', id);
      const current = items.find((i) => i.book.id === id);
      if (current?.finished) await updateDoc(ref, { saved: false });
      else await deleteDoc(ref);
    },
    [user, items]
  );

  const markFinished = useCallback(
    async (book: Book) => {
      if (!user) return;
      await setDoc(
        doc(db, 'customers', user.uid, 'library', book.id),
        { ...pick(book), finished: true, finishedAt: serverTimestamp() },
        { merge: true }
      );
    },
    [user]
  );

  return {
    saved,
    finished,
    isSaved,
    saveBook,
    unsaveBook,
    markFinished,
    loading: authLoading || dataLoading,
  };
}

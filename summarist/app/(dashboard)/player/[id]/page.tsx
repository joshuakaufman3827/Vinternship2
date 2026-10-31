'use client';

import { Suspense, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import AudioPlayer from '../../../components/AudioPlayer';
import { useAuth } from '../../../context/AuthContext';
import { useAuthModal } from '../../../context/AuthModalContext';
import { useLibrary } from '../../../hooks/useLibrary';
import { useSubscription } from '../../../hooks/useSubscription';
import { fetchBookById, type Book } from '../../../lib/books';

type Status = 'loading' | 'ready' | 'notFound' | 'error';

function PlayerSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[1070px] animate-pulse px-6 py-6 md:px-14" aria-hidden="true">
      <div className="h-8 w-2/3 bg-[#e1e7ea]" />
      <div className="mt-4 border-t border-[#e1e7ea] pt-6">
        <div className="space-y-3">
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} className="h-4 w-full bg-[#e1e7ea]" />
          ))}
        </div>
      </div>
    </div>
  );
}

function Message({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-[1070px] px-6 py-10 text-base text-[#394547] md:px-14">{children}</div>;
}

function Player({ id }: { id: string }) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { openModal } = useAuthModal();
  const { isSubscribed } = useSubscription();
  const { markFinished } = useLibrary();

  const [book, setBook] = useState<Book | null>(null);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    let cancelled = false;

    fetchBookById(id)
      .then((found) => {
        if (cancelled) return;
        setBook(found);
        setStatus(found ? 'ready' : 'notFound');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  // Someone who opens a premium player URL directly still has to be subscribed.
  const needsPlan = Boolean(book?.subscriptionRequired) && !isSubscribed;

  useEffect(() => {
    if (!authLoading && user && needsPlan) router.replace('/choose-plan');
  }, [authLoading, user, needsPlan, router]);

  if (status === 'loading' || authLoading) return <PlayerSkeleton />;
  if (status === 'error') return <Message>We couldn’t load this book. Please refresh the page and try again.</Message>;
  if (!book) return <Message>Book not found.</Message>;

  if (!user) {
    return (
      <Message>
        <p>Log in to read or listen to this book.</p>
        <button
          type="button"
          onClick={() => openModal('login')}
          className="mt-4 flex h-10 w-full max-w-[300px] cursor-pointer items-center justify-center rounded-sm bg-[#2bd97c] text-base text-[#032b41] hover:bg-[#20ba68]"
        >
          Login
        </button>
      </Message>
    );
  }

  if (needsPlan) return <PlayerSkeleton />;

  return (
    <>
      {/* Bottom padding keeps the end of the summary clear of the fixed audio bar. */}
      <div className="mx-auto w-full max-w-[1070px] px-6 pb-48 pt-6 md:px-14 md:pb-32">
        {/* The line belongs to the title block, so it only spans the text column. */}
        <h1 className="border-b border-[#e1e7ea] pb-4 text-2xl font-bold text-[#032b41]">{book.title}</h1>
        <p className="mt-6 whitespace-pre-line text-base font-normal leading-[1.4] text-[#032b41]">
          {book.summary}
        </p>
      </div>
      <AudioPlayer book={book} onFinished={() => void markFinished(book).catch(() => {})} />
    </>
  );
}

// useParams() needs a Suspense boundary above it in Next 16.
function PlayerRoute() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  // key={id} resets all state when the id changes.
  return id ? <Player key={id} id={id} /> : <PlayerSkeleton />;
}

export default function PlayerPage() {
  return (
    <Suspense fallback={<PlayerSkeleton />}>
      <PlayerRoute />
    </Suspense>
  );
}

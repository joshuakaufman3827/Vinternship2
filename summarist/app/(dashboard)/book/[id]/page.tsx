'use client';

import { Suspense, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { IconType } from 'react-icons';
import { AiOutlineBulb, AiOutlineClockCircle, AiOutlineStar } from 'react-icons/ai';
import { BiBookOpen, BiMicrophone } from 'react-icons/bi';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';

import { useAuth } from '../../../context/AuthContext';
import { useAuthModal } from '../../../context/AuthModalContext';
import { useAudioDuration } from '../../../hooks/useAudioDuration';
import { useLibrary } from '../../../hooks/useLibrary';
import { useSubscription } from '../../../hooks/useSubscription';
import { fetchBookById, formatClock, type Book } from '../../../lib/books';

type Status = 'loading' | 'ready' | 'notFound' | 'error';

// "audio & text" -> "Audio & Text"
function formatType(type: string): string {
  return type
    .split(' ')
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(' ');
}

function BookSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[1070px] animate-pulse px-6 py-10" aria-hidden="true">
      <div className="flex flex-col items-center gap-10 lg:flex-row-reverse lg:items-start lg:gap-4">
        <div className="aspect-square w-full max-w-[300px] shrink-0 bg-[#e1e7ea]" />
        <div className="w-full flex-1 space-y-4">
          <div className="h-8 w-3/4 bg-[#e1e7ea]" />
          <div className="h-4 w-32 bg-[#e1e7ea]" />
          <div className="h-6 w-2/3 bg-[#e1e7ea]" />
          <div className="h-20 w-full bg-[#e1e7ea]" />
          <div className="flex gap-4">
            <div className="h-12 w-36 bg-[#e1e7ea]" />
            <div className="h-12 w-36 bg-[#e1e7ea]" />
          </div>
          <div className="h-6 w-56 bg-[#e1e7ea]" />
          <div className="h-24 w-full bg-[#e1e7ea]" />
        </div>
      </div>
    </div>
  );
}

function BookDetails({ id }: { id: string }) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { openModal } = useAuthModal();
  const { isSubscribed } = useSubscription();
  const { isSaved, saveBook, unsaveBook } = useLibrary();

  const [book, setBook] = useState<Book | null>(null);
  const [status, setStatus] = useState<Status>('loading');
  const [libraryError, setLibraryError] = useState('');
  const duration = useAudioDuration(book?.audioLink);
  const saved = book ? isSaved(book.id) : false;

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

  const handleReadOrListen = () => {
    if (!book || authLoading) return;
    if (!user) {
      openModal('login');
      return;
    }
    if (book.subscriptionRequired && !isSubscribed) {
      router.push('/choose-plan');
      return;
    }
    router.push(`/player/${book.id}`);
  };

  const handleToggleLibrary = async () => {
    if (!book || authLoading) return;
    if (!user) {
      openModal('login');
      return;
    }
    setLibraryError('');
    try {
      if (isSaved(book.id)) await unsaveBook(book.id);
      else await saveBook(book);
    } catch {
      setLibraryError('Could not update your library. Please try again.');
    }
  };

  if (status === 'loading') return <BookSkeleton />;

  if (status === 'error') {
    return (
      <p className="mx-auto max-w-[1070px] px-6 py-10 text-base text-[#394547]">
        We couldn’t load this book. Please refresh the page and try again.
      </p>
    );
  }

  if (!book) {
    return (
      <p className="mx-auto max-w-[1070px] px-6 py-10 text-base text-[#394547]">
        Book not found.
      </p>
    );
  }

  const stats: { icon: IconType; text: string }[] = [
    { icon: AiOutlineStar, text: `${book.averageRating} (${book.totalRating} ratings)` },
    { icon: AiOutlineClockCircle, text: duration === null ? '--:--' : formatClock(duration) },
    { icon: BiMicrophone, text: formatType(book.type) },
    { icon: AiOutlineBulb, text: `${book.keyIdeas} Key ideas` },
  ];

  return (
    <div className="mx-auto w-full max-w-[1070px] px-6 py-10 text-[#032b41]">
      {/* Stacked on narrower screens (image first); image on the right from lg up. */}
      <div className="flex flex-col items-center gap-10 lg:flex-row-reverse lg:items-start lg:gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={book.imageLink} alt={book.title} className="h-auto w-full max-w-[300px] shrink-0" />

        <div className="w-full min-w-0 flex-1">
          <h1 className="text-[32px] font-bold leading-[1.2]">{book.title}</h1>
          <p className="mt-4 text-base font-bold">{book.author}</p>
          <p className="mt-4 text-xl font-light text-[#394547]">{book.subTitle}</p>

          <div className="mt-4 border-y border-[#e1e7ea] py-4">
            <div className="grid max-w-[400px] grid-cols-2 gap-4 text-sm font-medium">
              {stats.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              type="button"
              onClick={handleReadOrListen}
              className="flex h-12 w-36 cursor-pointer items-center justify-center gap-2 rounded-sm bg-[#032b41] text-base text-white transition-opacity hover:opacity-90"
            >
              <BiBookOpen className="h-6 w-6" aria-hidden="true" />
              Read
            </button>
            <button
              type="button"
              onClick={handleReadOrListen}
              className="flex h-12 w-36 cursor-pointer items-center justify-center gap-2 rounded-sm bg-[#032b41] text-base text-white transition-opacity hover:opacity-90"
            >
              <BiMicrophone className="h-6 w-6" aria-hidden="true" />
              Listen
            </button>
          </div>

          <button
            type="button"
            onClick={handleToggleLibrary}
            className="mt-6 flex cursor-pointer items-center gap-2 text-lg font-medium text-[#0365f2] hover:underline"
          >
            {saved ? (
              <BsBookmarkFill className="h-5 w-5" aria-hidden="true" />
            ) : (
              <BsBookmark className="h-5 w-5" aria-hidden="true" />
            )}
            {saved ? 'Saved in My Library' : 'Add title to My Library'}
          </button>
          {libraryError && <p className="mt-2 text-sm text-red-600">{libraryError}</p>}

          <h2 className="mt-8 text-lg font-bold">What’s it about?</h2>
          <div className="mt-4 flex flex-wrap gap-4">
            {book.tags?.map((tag) => (
              <span key={tag} className="rounded-sm bg-[#f1f6f4] px-4 py-3 text-base font-medium">
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-4 text-base leading-6">{book.bookDescription}</p>

          <h2 className="mt-8 text-lg font-bold">About the author</h2>
          <p className="mt-4 text-base leading-6">{book.authorDescription}</p>
        </div>
      </div>
    </div>
  );
}

// useParams() needs a Suspense boundary above it in Next 16.
function BookRoute() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  // key={id} gives each book a fresh state, so moving between books (e.g. from search) starts clean.
  return id ? <BookDetails key={id} id={id} /> : <BookSkeleton />;
}

export default function BookPage() {
  return (
    <Suspense fallback={<BookSkeleton />}>
      <BookRoute />
    </Suspense>
  );
}
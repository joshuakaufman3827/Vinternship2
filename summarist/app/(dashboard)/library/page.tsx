'use client';

import Image from 'next/image';
import Link from 'next/link';

import BookCard from '../../components/BookCard';
import { useAuth } from '../../context/AuthContext';
import { useAuthModal } from '../../context/AuthModalContext';
import { useLibrary } from '../../hooks/useLibrary';
import type { Book } from '../../lib/books';

function Section({
  title,
  books,
  emptyTitle,
  emptyText,
}: {
  title: string;
  books: Book[];
  emptyTitle: string;
  emptyText: string;
}) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-4 text-base font-light text-[#6b757b]">
        {books.length} {books.length === 1 ? 'item' : 'items'}
      </p>

      {books.length === 0 ? (
        <div className="mt-4 rounded-sm bg-[#f1f6f4] p-6">
          <h3 className="text-lg font-bold">{emptyTitle}</h3>
          <p className="mt-1 text-base font-light text-[#394547]">{emptyText}</p>
          <Link
            href="/for-you"
            className="mt-4 flex h-10 w-full max-w-[200px] items-center justify-center rounded-sm bg-[#2bd97c] text-base text-[#032b41] transition-colors hover:bg-[#20ba68]"
          >
            Browse books
          </Link>
        </div>
      ) : (
        <div className="mt-6 flex gap-1 overflow-x-auto pb-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </section>
  );
}

function LibrarySkeleton() {
  return (
    <div className="mx-auto w-full max-w-[1070px] animate-pulse px-6 py-6" aria-hidden="true">
      <div className="h-9 w-40 bg-[#e1e7ea]" />
      <div className="mt-6 h-6 w-32 bg-[#e1e7ea]" />
      <div className="mt-4 h-28 w-full bg-[#e1e7ea]" />
    </div>
  );
}

export default function LibraryPage() {
  const { user, loading: authLoading } = useAuth();
  const { openModal } = useAuthModal();
  const { saved, finished, loading } = useLibrary();

  if (authLoading || (user && loading)) return <LibrarySkeleton />;

  return (
    <div className="mx-auto w-full max-w-[1070px] px-6 py-8 text-[#032b41]">
      {!user ? (
        <div className="flex flex-col items-center pt-4 text-center">
          <h1 className="mb-6 w-full border-b border-[#e1e7ea] pb-4 text-left text-[32px] font-bold">My Library</h1>
          <Image
            src="/home/login.png"
            alt="Log in to see your library"
            width={400}
            height={300}
            priority
            className="h-auto w-full max-w-[400px] object-contain"
          />
          <h2 className="mt-6 text-xl font-bold">Log in to your account to see your library.</h2>
          <button
            type="button"
            onClick={() => openModal('login')}
            className="mt-4 flex h-10 w-[180px] cursor-pointer items-center justify-center rounded-sm bg-[#2bd97c] text-base text-[#032b41] transition-colors hover:bg-[#20ba68]"
          >
            Login
          </button>
        </div>
      ) : (
        <>
          <Section
            title="Saved Books"
            books={saved}
            emptyTitle="Save your favorite books!"
            emptyText="When you save a book, it will appear here."
          />
          <Section
            title="Finished"
            books={finished}
            emptyTitle="Done and dusted!"
            emptyText="When you finish a book, you can find it here later."
          />
        </>
      )}
    </div>
  );
}

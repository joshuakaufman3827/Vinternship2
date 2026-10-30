'use client';

import { useEffect, useState } from 'react';
import BookCard from '../../components/BookCard';
import SelectedBook from '../../components/SelectedBook';
import { fetchBooksByStatus, type Book } from '../../lib/books';

interface ForYouData {
  selected: Book | null;
  recommended: Book[];
  suggested: Book[];
}

function Shelf({ title, subtitle, books }: { title: string; subtitle: string; books: Book[] }) {
  return (
    <section className="mt-10">
      <h2 className="text-[22px] font-bold text-[#032b41]">{title}</h2>
      <p className="mb-4 mt-1 text-base font-light text-[#394547]">{subtitle}</p>
      <div className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-2">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}

function ShelfSkeleton() {
  return (
    <section className="mt-10 animate-pulse" aria-hidden="true">
      <div className="h-6 w-56 bg-[#e1e7ea]" />
      <div className="mb-4 mt-2 h-4 w-44 bg-[#e1e7ea]" />
      <div className="flex gap-2 overflow-hidden">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="w-[212px] shrink-0 p-3">
            <div className="aspect-square w-full bg-[#e1e7ea]" />
            <div className="mt-3 h-4 w-3/4 bg-[#e1e7ea]" />
            <div className="mt-2 h-3 w-1/2 bg-[#e1e7ea]" />
            <div className="mt-3 h-3 w-full bg-[#e1e7ea]" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ForYouPage() {
  const [data, setData] = useState<ForYouData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      fetchBooksByStatus('selected'),
      fetchBooksByStatus('recommended'),
      fetchBooksByStatus('suggested'),
    ])
      .then(([selected, recommended, suggested]) => {
        if (!cancelled) setData({ selected: selected[0] ?? null, recommended, suggested });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-[1070px] px-6 py-6">
      <h1 className="mb-4 text-[22px] font-bold text-[#032b41]">Selected just for you</h1>

      {failed && (
        <p className="text-base text-[#394547]">
          We couldn’t load the books. Please refresh the page and try again.
        </p>
      )}

      {!data && !failed && (
        <>
          <div className="h-[188px] animate-pulse rounded-sm bg-[#e1e7ea]" aria-hidden="true" />
          <ShelfSkeleton />
          <ShelfSkeleton />
        </>
      )}

      {data && (
        <>
          {data.selected && <SelectedBook book={data.selected} />}
          <Shelf title="Recommended For You" subtitle="We think you’ll like these" books={data.recommended} />
          <Shelf title="Suggested Books" subtitle="Browse those books" books={data.suggested} />
        </>
      )}
    </div>
  );
}

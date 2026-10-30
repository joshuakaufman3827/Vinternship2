'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDebounce } from '../hooks/useDebounce';

interface BookResult {
  id: string;
  title: string;
  author: string;
  imageLink: string;
}

const SEARCH_URL =
  'https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle';

function ResultSkeleton() {
  return (
    <div className="flex animate-pulse items-center gap-3 px-4 py-3" aria-hidden="true">
      <div className="h-16 w-12 shrink-0 bg-[#e1e7ea]" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-3/4 bg-[#e1e7ea]" />
        <div className="h-3 w-1/2 bg-[#e1e7ea]" />
      </div>
    </div>
  );
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  // Remember which search term the stored books belong to.
  const [result, setResult] = useState<{ term: string; books: BookResult[] }>({
    term: '',
    books: [],
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const term = query.trim();
  const debouncedTerm = useDebounce(term, 300); // wait 300ms after typing stops

  useEffect(() => {
    if (!debouncedTerm) return;

    const controller = new AbortController();
    fetch(`${SEARCH_URL}?search=${encodeURIComponent(debouncedTerm)}`, {
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : []))
      .then((data: unknown) =>
        setResult({
          term: debouncedTerm,
          books: Array.isArray(data) ? (data as BookResult[]) : [],
        })
      )
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setResult({ term: debouncedTerm, books: [] });
      });

    return () => controller.abort();
  }, [debouncedTerm]);

  // Close the dropdown when clicking elsewhere.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const hasResults = term !== '' && term === debouncedTerm && result.term === debouncedTerm;
  const loading = term !== '' && !hasResults; // typing, waiting on the debounce, or fetching
  const showDropdown = open && term !== '';

  const pickBook = () => {
    setOpen(false);
    setQuery('');
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-[340px]">
      <div className="flex h-10 overflow-hidden rounded-sm border-2 border-[#e1e7ea]">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
          placeholder="Search for books"
          aria-label="Search for books by title or author"
          className="min-w-0 flex-1 bg-[#f1f6f4] px-4 text-base font-light text-[#032b41] placeholder:text-[#6b757b] focus:outline-none"
        />
        <span className="flex w-10 shrink-0 items-center justify-center border-l-2 border-[#e1e7ea] bg-white text-[#032b41]">
          <AiOutlineSearch className="text-2xl" aria-hidden="true" />
        </span>
      </div>

      {showDropdown && (
        <div className="absolute left-0 right-0 top-full z-40 mt-1 max-h-[420px] overflow-y-auto border border-[#e1e7ea] bg-white shadow-lg">
          {loading && (
            <>
              <ResultSkeleton />
              <ResultSkeleton />
              <ResultSkeleton />
            </>
          )}

          {hasResults && result.books.length === 0 && (
            <p className="px-4 py-4 text-sm text-[#394547]">No books found</p>
          )}

          {hasResults &&
            result.books.map((book) => (
              <Link
                key={book.id}
                href={`/book/${book.id}`}
                onClick={pickBook}
                className="flex items-center gap-3 border-b border-[#e1e7ea] px-4 py-3 last:border-b-0 hover:bg-[#f1f6f4]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={book.imageLink} alt="" className="h-16 w-12 shrink-0 object-cover" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[#032b41]">{book.title}</p>
                  <p className="truncate text-sm font-light text-[#6b757b]">{book.author}</p>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}

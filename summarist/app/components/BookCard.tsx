'use client';

import Link from 'next/link';
import { AiOutlineClockCircle, AiOutlineStar } from 'react-icons/ai';
import { useAudioDuration } from '../hooks/useAudioDuration';
import { formatClock, type Book } from '../lib/books';

export default function BookCard({ book }: { book: Book }) {
  const duration = useAudioDuration(book.audioLink);

  return (
    <Link
      href={`/book/${book.id}`}
      className="relative block w-[212px] shrink-0 rounded-sm p-3 pt-6 transition-colors hover:bg-[#f1f6f4]"
    >
      {book.subscriptionRequired && (
        <span className="absolute right-3 top-0 rounded-full bg-[#032b41] px-2 py-0.5 text-xs text-white">
          Premium
        </span>
      )}
      {/* The cover images already include the coloured arch behind the book. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={book.imageLink} alt={book.title} className="h-auto w-full" />
      <h3 className="mt-2 text-base font-bold leading-snug text-[#032b41]">{book.title}</h3>
      <p className="mt-1 text-sm font-light text-[#6b757b]">{book.author}</p>
      <p className="mt-2 text-sm font-light leading-snug text-[#032b41]">{book.subTitle}</p>
      <div className="mt-2 flex items-center gap-3 text-sm font-light text-[#394547]">
        <span className="flex items-center gap-1">
          <AiOutlineClockCircle aria-hidden="true" />
          {duration === null ? '--:--' : formatClock(duration)}
        </span>
        <span className="flex items-center gap-1">
          <AiOutlineStar aria-hidden="true" />
          {book.averageRating}
        </span>
      </div>
    </Link>
  );
}

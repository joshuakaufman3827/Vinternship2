'use client';

import Link from 'next/link';
import { BsFillPlayFill } from 'react-icons/bs';
import { useAudioDuration } from '../hooks/useAudioDuration';
import { formatMinSec, type Book } from '../lib/books';

export default function SelectedBook({ book }: { book: Book }) {
  const duration = useAudioDuration(book.audioLink);

  return (
    <Link
      href={`/book/${book.id}`}
      className="flex flex-col gap-6 rounded-sm bg-[#fbefd6] p-6 md:flex-row md:items-center"
    >
      <p className="text-base font-light text-[#032b41] md:w-1/3 md:border-r md:border-[#bac8ce] md:pr-6">
        {book.subTitle}
      </p>
      <div className="flex items-center gap-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={book.imageLink} alt={book.title} className="h-[140px] w-[140px] shrink-0" />
        <div>
          <h3 className="text-lg font-bold text-[#032b41]">{book.title}</h3>
          <p className="mt-2 text-base font-light text-[#394547]">{book.author}</p>
          <div className="mt-4 flex items-center gap-3 text-base font-medium text-[#032b41]">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
              <BsFillPlayFill size={24} aria-hidden="true" />
            </span>
            <span>{duration === null ? '--' : formatMinSec(duration)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

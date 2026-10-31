'use client';

import { useRef, useState } from 'react';
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';
import { RiForward10Fill, RiReplay10Fill } from 'react-icons/ri';
import { formatClock, type Book } from '../lib/books';

const thumbClass =
  '[&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white ' +
  '[&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white';

export default function AudioPlayer({
  book,
  onFinished,
}: {
  book: Book;
  onFinished?: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void audio.play();
    } else {
      audio.pause();
    }
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const max = Number.isFinite(audio.duration) ? audio.duration : 0;
    audio.currentTime = Math.min(Math.max(audio.currentTime + seconds, 0), max);
    setCurrent(audio.currentTime);
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrent(value);
  };

  const percent = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 bg-[#042330] px-6 py-4 text-white md:left-[200px]">
      <audio
        ref={audioRef}
        src={book.audioLink}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          onFinished?.();
        }}
      />

      {/* Three columns on desktop: book | controls | time + bar. Stacked on phones. */}
      <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-3 md:gap-6">
        <div className="hidden min-w-0 items-center gap-4 md:flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={book.imageLink} alt="" className="h-14 w-14 shrink-0 object-contain" />
          <div className="min-w-0">
            <p className="line-clamp-2 text-sm font-normal">{book.title}</p>
            <p className="mt-1 truncate text-sm font-light text-[#bac8ce]">{book.author}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => skip(-10)}
            aria-label="Back 10 seconds"
            className="cursor-pointer text-white"
          >
            <RiReplay10Fill size={30} />
          </button>
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? 'Pause' : 'Play'}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-[#042330]"
          >
            {playing ? <BsPauseFill size={30} /> : <BsFillPlayFill size={30} />}
          </button>
          <button
            type="button"
            onClick={() => skip(10)}
            aria-label="Forward 10 seconds"
            className="cursor-pointer text-white"
          >
            <RiForward10Fill size={30} />
          </button>
        </div>

        <div className="flex items-center gap-4 text-sm font-light">
          <span className="w-11 shrink-0 tabular-nums">{formatClock(current)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={current}
            onChange={(e) => seek(Number(e.target.value))}
            aria-label="Seek"
            className={`h-3 min-w-0 flex-1 cursor-pointer appearance-none ${thumbClass}`}
            style={{
              background: `linear-gradient(to right, #ffffff ${percent}%, #5f7480 ${percent}%) center / 100% 4px no-repeat`,
            }}
          />
          <span className="w-11 shrink-0 text-right tabular-nums">{formatClock(duration)}</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";

interface Book {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  summary: string;
  bookDescription: string;
}

export default function PlayerPage() {
  const params = useParams();
  const id = params?.id as string;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchBookPlayer() {
      try {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
        );
        const data = await res.json();
        setBook(data);
      } catch (error) {
        console.error("Failed to fetch book player details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookPlayer();
  }, [id]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const skipTime = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime += seconds;
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "00:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-slate-500 animate-pulse">Loading player...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-slate-700">Book summary not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#032b41] pb-32 flex flex-col justify-between">
      {/* Top Header Title */}
      <div className="border-b border-slate-200 py-4 px-8 text-center">
        <h1 className="text-xl font-bold">{book.title}</h1>
      </div>

      {/* Main Content: Summary Display */}
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8 flex-1">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold"><b>{book.title}</b> Summary</h2>
          <div className="text-slate-700 leading-relaxed space-y-4 whitespace-pre-line text-lg">
            {book.summary || book.bookDescription || "Summary content loading..."}
          </div>
        </div>
      </div>

      {/* Hidden HTML5 Audio Element */}
      {book.audioLink && (
        <audio
          ref={audioRef}
          src={book.audioLink}
          onTimeUpdate={() => audioRef.current && setCurrentTime(audioRef.current.currentTime)}
          onLoadedMetadata={() => audioRef.current && setDuration(audioRef.current.duration)}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Bottom Fixed Audio Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#032b41] text-white py-4 px-6 flex items-center justify-between shadow-lg z-50">
        <div className="flex items-center gap-4 w-1/4">
          {book.imageLink && (
            <img 
              src={book.imageLink} 
              alt={book.title} 
              className="w-10 h-14 object-cover rounded shadow"
            />
          )}
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold truncate">{book.title}</h4>
            <p className="text-[10px] text-slate-300 truncate">{book.author}</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 w-2/4">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => skipTime(-10)} 
              className="text-slate-300 hover:text-white transition text-xs font-semibold flex items-center gap-1"
            >
              ↩ 10
            </button>
            <button 
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-white text-[#032b41] flex items-center justify-center hover:bg-slate-200 transition font-bold text-lg shadow"
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>
            <button 
              onClick={() => skipTime(10)} 
              className="text-slate-300 hover:text-white transition text-xs font-semibold flex items-center gap-1"
            >
              10 ↪
            </button>
          </div>

          <div className="flex items-center gap-3 w-full max-w-md text-xs text-slate-300">
            <span>{formatTime(currentTime)}</span>
            <input 
              type="range" 
              min={0} 
              max={duration || 100} 
              value={currentTime}
              onChange={(e) => {
                if (audioRef.current) {
                  audioRef.current.currentTime = Number(e.target.value);
                  setCurrentTime(Number(e.target.value));
                }
              }}
              className="w-full h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-[#2bd97c]"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="w-1/4 hidden md:block"></div>
      </div>
    </div>
  );
}
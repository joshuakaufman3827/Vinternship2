"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthModal } from "../../../app/context/AuthModalContext";
import { auth } from "../../../app/firebase";

interface Book {
  id: string;
  author: string;
  title: string;
  subTitle?: string;
  imageLink?: string;
  audioLink?: string;
  totalRating?: number;
  averageRating?: number;
  keyIdeas?: number;
  type?: string;
  status?: string;
  subscriptionRequired?: boolean;
  summary?: string;
  tags?: string[];
  bookDescription?: string;
  authorDescription?: string;
}

function BookDetailsContent() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { openModal } = useAuthModal();
  
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    async function fetchBookDetails() {
      try {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
        );
        const data = await res.json();
        setBook(data);
      } catch (error) {
        console.error("Failed to fetch book details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookDetails();
  }, [id]);

  const handleAction = (actionType: "read" | "listen") => {
  console.log("Current User:", auth.currentUser);
  console.log("Book:", book);

  router.push(`/player/${id}`);
};

  const handleAddToLibrary = () => {
    if (!auth.currentUser) {
      openModal("login");
      return;
    }
    alert("Book added to library!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-slate-500 animate-pulse">Loading book details...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-slate-700">Book not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8 text-[#032b41]">
      <div className="flex flex-col md:flex-row gap-12 mb-12 items-start">
        {/* Left Column: Details & Actions */}
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#032b41] mb-2 leading-tight">
              {book.title}
            </h1>
            <p className="text-base text-slate-600 mb-2">{book.subTitle}</p>
            <p className="text-base font-semibold text-[#032b41]">By {book.author}</p>
          </div>

          {/* Stats Divider Box */}
          <div className="py-4 border-y border-slate-200 grid grid-cols-2 sm:grid-cols-2 gap-4 text-sm text-slate-700">
            <div className="flex items-center gap-2">
              <span>⭐</span>
              <span className="font-semibold">{book.averageRating || "4.4"}</span>
              <span className="text-slate-500">({book.totalRating || 608} ratings)</span>
            </div>
            <div className="flex items-center gap-2">
              <span>⏱️</span>
              <span className="font-semibold">03:24</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🎤</span>
              <span className="font-semibold">Audio & Text</span>
            </div>
            <div className="flex items-center gap-2">
              <span>💡</span>
              <span className="font-semibold">{book.keyIdeas || 8} Key ideas</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleAction('read')}
              className="bg-[#032b41] hover:bg-[#043d5d] text-white font-medium px-8 py-3.5 rounded-lg transition flex items-center gap-2 shadow-sm"
            >
              <span>📖</span> Read
            </button>
            <button
              onClick={() => handleAction('listen')}
              className="bg-[#032b41] hover:bg-[#043d5d] text-white font-medium px-8 py-3.5 rounded-lg transition flex items-center gap-2 shadow-sm"
            >
              <span>🎧</span> Listen
            </button>
          </div>

          {/* Add to Library Link */}
          <div>
            <button
              onClick={handleAddToLibrary}
              className="flex items-center gap-2 text-[#2bd97c] hover:text-[#20b868] font-semibold text-sm transition mt-2"
            >
              <span>📌</span> Add title to My Library
            </button>
          </div>
        </div>

        {/* Right Column: Book Image Cover */}
        <div className="w-full md:w-80 flex-shrink-0 flex justify-center">
          {book.imageLink && (
            <img
              src={book.imageLink}
              alt={book.title}
              className="w-64 h-96 object-cover rounded-xl shadow-md"
            />
          )}
        </div>
      </div>

      {/* What's it about Section */}
      <div className="space-y-6 border-t border-slate-200 pt-8">
        <h2 className="text-2xl font-bold text-[#032b41]">What's it about?</h2>
        
        {/* Tags / Pills */}
        <div className="flex flex-wrap gap-2">
          {book.tags?.map((tag, index) => (
            <span key={index} className="bg-slate-100 text-[#032b41] px-4 py-2 rounded-lg text-sm font-semibold">
              {tag}
            </span>
          ))}
        </div>

        <p className="text-slate-700 leading-relaxed text-base">
          {book.bookDescription}
        </p>

        {/* About the author Section */}
        <div className="pt-6 space-y-4">
          <h3 className="text-xl font-bold text-[#032b41]">About the author</h3>
          <p className="text-slate-700 leading-relaxed text-base">
            {book.authorDescription}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function BookDetailsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <BookDetailsContent />
    </Suspense>
  );
}
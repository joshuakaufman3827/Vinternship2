"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthModal } from "../../../context/AuthModalContext";
import { auth } from "../../../firebase";

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
  const [loading, setLoading] = useState(true);

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

  const handleReadOrListen = () => {
    if (!auth.currentUser) {
      openModal("login");
      return;
    }

    if (book?.subscriptionRequired) {
      router.push("/choose-plan");
      return;
    }

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
      <div className="animate-pulse max-w-6xl mx-auto p-8">
        <div className="flex gap-10">
          <div className="flex-1 space-y-4">
            <div className="h-10 w-96 bg-slate-200 rounded"></div>
            <div className="h-6 w-80 bg-slate-200 rounded"></div>
            <div className="h-6 w-48 bg-slate-200 rounded"></div>

            <div className="h-24 bg-slate-200 rounded"></div>

            <div className="flex gap-4">
              <div className="h-12 w-32 bg-slate-200 rounded"></div>
              <div className="h-12 w-32 bg-slate-200 rounded"></div>
            </div>
          </div>

          <div className="w-64 h-96 bg-slate-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-slate-700">
          Book not found.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8 text-[#032b41]">
      <div className="flex flex-col md:flex-row gap-12 mb-12 items-start">
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {book.title}
            </h1>

            <p className="text-slate-600 mb-2">
              {book.subTitle}
            </p>

            <p className="font-semibold">
              By {book.author}
            </p>
          </div>

          <div className="py-4 border-y border-slate-200 grid grid-cols-2 gap-4 text-sm">
            <div>
              ⭐ {book.averageRating || 4.4}
            </div>

            <div>
              ⏱️ 03:24
            </div>

            <div>
              🎤 Audio & Text
            </div>

            <div>
              💡 {book.keyIdeas || 8} Key ideas
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleReadOrListen}
              className="bg-[#032b41] text-white px-8 py-3 rounded-lg"
            >
              📖 Read
            </button>

            <button
              onClick={handleReadOrListen}
              className="bg-[#032b41] text-white px-8 py-3 rounded-lg"
            >
              🎧 Listen
            </button>
          </div>

          <button
            onClick={handleAddToLibrary}
            className="text-[#2bd97c] font-semibold"
          >
            📌 Add title to My Library
          </button>
        </div>

        <div className="w-full md:w-80 flex justify-center">
          {book.imageLink && (
            <img
              src={book.imageLink}
              alt={book.title}
              className="w-64 h-96 object-cover rounded-xl shadow-md"
            />
          )}
        </div>
      </div>

      <div className="border-t border-slate-200 pt-8 space-y-6">
        <h2 className="text-2xl font-bold">
          What's it about?
        </h2>

        <div className="flex flex-wrap gap-2">
          {book.tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-slate-100 px-4 py-2 rounded-lg text-sm font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="leading-relaxed">
          {book.bookDescription}
        </p>

        <div>
          <h3 className="text-xl font-bold mb-4">
            About the author
          </h3>

          <p className="leading-relaxed">
            {book.authorDescription}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function BookDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <BookDetailsContent />
    </Suspense>
  );
}
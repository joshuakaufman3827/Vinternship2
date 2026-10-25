"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Book {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas: number;
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
  duration?: string;
}

export default function ForYouPage() {
  const router = useRouter();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const [selectedRes, recommendedRes, suggestedRes] = await Promise.all([
          fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"),
          fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"),
          fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"),
        ]);

        const selectedData = await selectedRes.json();
        const recommendedData = await recommendedRes.json();
        const suggestedData = await suggestedRes.json();

        setSelectedBook(selectedData[0] || null);
        setRecommendedBooks(recommendedData || []);
        setSuggestedBooks(suggestedData || []);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-slate-500 animate-pulse">Loading books...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto text-[#032b41]">
      <h1 className="text-2xl font-bold mb-6">Selected just for you</h1>

      {/* Selected Book Section */}
<section className="mb-12">
  {selectedBook && (
    <div
      onClick={() => router.push(`/book/${selectedBook.id}`)}
      className="grid grid-cols-1 md:grid-cols-3 items-center bg-[#fef6e7] border border-transparent rounded-2xl p-8 cursor-pointer hover:shadow-lg transition gap-8"
    >
      {/* Column 1: Subtitle & Divider */}
      <div className="md:border-r md:border-amber-200/60 md:pr-8">
        <p className="text-base font-semibold text-slate-800 leading-relaxed">
          {selectedBook.subTitle}
        </p>
      </div>

      {/* Column 2: Book Cover */}
      <div className="flex justify-center">
        <img
          src={selectedBook.imageLink}
          alt={selectedBook.title}
          className="w-40 h-56 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Column 3: Title, Author & Play Button */}
      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-bold text-[#032b41] mb-1">{selectedBook.title}</h3>
          <p className="text-sm text-slate-600">{selectedBook.author}</p>
        </div>
        <div className="flex items-center gap-3 pt-2 text-sm font-semibold text-[#032b41]">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#032b41] text-white shadow-sm">
            ▶
          </span>
          <span>3 mins 23 secs</span>
        </div>
      </div>
    </div>
  )}
</section>

      {/* Recommended Books Section */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-1">Recommended For You</h2>
        <p className="text-sm text-slate-500 mb-6">We think you’ll like these</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {recommendedBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => router.push(`/book/${book.id}`)}
              className="bg-white rounded-xl p-4 cursor-pointer hover:shadow-md transition relative flex flex-col justify-between group"
            >
              {book.subscriptionRequired && (
                <span className="absolute top-3 right-3 bg-[#032b41] text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                  premium
                </span>
              )}
              <div>
                <img src={book.imageLink} alt={book.title} className="w-full h-48 object-cover rounded-lg mb-3 shadow-sm group-hover:scale-[1.02] transition" />
                <h3 className="font-bold text-[#032b41] text-sm mb-1 line-clamp-1">{book.title}</h3>
                <p className="text-xs text-slate-500 mb-2">{book.author}</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 line-clamp-2 mb-3">{book.subTitle}</p>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">⏱ 03:24</span>
                  <span className="flex items-center gap-1">⭐ 4.3</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Suggested Books Section */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-1">Suggested Books</h2>
        <p className="text-sm text-slate-500 mb-6">Browse those books</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {suggestedBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => router.push(`/book/${book.id}`)}
              className="bg-white rounded-xl p-4 cursor-pointer hover:shadow-md transition relative flex flex-col justify-between group"
            >
              {book.subscriptionRequired && (
                <span className="absolute top-3 right-3 bg-[#032b41] text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                  premium
                </span>
              )}
              <div>
                <img src={book.imageLink} alt={book.title} className="w-full h-48 object-cover rounded-lg mb-3 shadow-sm group-hover:scale-[1.02] transition" />
                <h3 className="font-bold text-[#032b41] text-sm mb-1 line-clamp-1">{book.title}</h3>
                <p className="text-xs text-slate-500 mb-2">{book.author}</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 line-clamp-2 mb-3">{book.subTitle}</p>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">⏱ 03:24</span>
                  <span className="flex items-center gap-1">⭐ 4.3</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
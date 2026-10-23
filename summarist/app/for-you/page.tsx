"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

        // The selected endpoint returns an array containing the selected book object
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
        <p className="text-lg font-medium text-gray-500 animate-pulse">Loading books...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">For You</h1>

      {/* Selected Book Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Selected Book</h2>
        {selectedBook && (
          <div
            onClick={() => router.push(`/book/${selectedBook.id}`)}
            className="flex flex-col md:flex-row bg-gray-50 border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-md transition shadow-sm relative"
          >
            {selectedBook.subscriptionRequired && (
              <span className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded">
                Premium
              </span>
            )}
            <img
              src={selectedBook.imageLink}
              alt={selectedBook.title}
              className="w-36 h-52 object-cover rounded shadow mb-4 md:mb-0 md:mr-6"
            />
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{selectedBook.subTitle}</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedBook.title}</h3>
                <p className="text-sm text-gray-700 mb-4">{selectedBook.author}</p>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{selectedBook.bookDescription}</p>
            </div>
          </div>
        )}
      </section>

      {/* Recommended Books Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Recommended Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommendedBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => router.push(`/book/${book.id}`)}
              className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition relative flex flex-col justify-between"
            >
              {book.subscriptionRequired && (
                <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                  Premium
                </span>
              )}
              <div>
                <img src={book.imageLink} alt={book.title} className="w-full h-48 object-cover rounded mb-3" />
                <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-1">{book.title}</h3>
                <p className="text-xs text-gray-600 mb-2">{book.author}</p>
              </div>
              <p className="text-xs text-gray-500 line-clamp-2">{book.subTitle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Suggested Books Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Suggested Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {suggestedBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => router.push(`/book/${book.id}`)}
              className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition relative flex flex-col justify-between"
            >
              {book.subscriptionRequired && (
                <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                  Premium
                </span>
              )}
              <div>
                <img src={book.imageLink} alt={book.title} className="w-full h-48 object-cover rounded mb-3" />
                <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-1">{book.title}</h3>
                <p className="text-xs text-gray-600 mb-2">{book.author}</p>
              </div>
              <p className="text-xs text-gray-500 line-clamp-2">{book.subTitle}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
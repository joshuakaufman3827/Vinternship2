"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";

interface Book {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  subscriptionRequired: boolean;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const router = useRouter();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>(query);

  useEffect(() => {
    async function fetchSearchResults() {
      if (!query) {
        setBooks([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthor?search=${encodeURIComponent(
            query
          )}`
        );
        const data = await res.json();
        // The API might return an array or an object containing books
        setBooks(Array.isArray(data) ? data : data.books || []);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSearchResults();
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Search Input Header */}
      <form onSubmit={handleSearchSubmit} className="mb-10 max-w-xl mx-auto relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for books or authors..."
          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
      </form>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Search Results for <span className="text-emerald-600">"{query}"</span>
      </h1>

      {loading ? (
        <p className="text-gray-500 text-center py-12 animate-pulse">Searching books...</p>
      ) : books.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200">
          <p className="text-gray-600 text-lg mb-2">No books found matching your query.</p>
          <p className="text-gray-400 text-sm">Try searching with different keywords or author names.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
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
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase";
import { useAuthModal } from "../../context/AuthModalContext";

interface Book {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  subscriptionRequired: boolean;
}

export default function MyLibraryPage() {
  const router = useRouter();
  const { openModal } = useAuthModal();
  const [libraryBooks, setLibraryBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        setLoading(false);
        openModal("login");
        return;
      }
      
      // TODO: Fetch user's saved library books from Firestore database
      // For now, we initialize an empty array or mock data structure
      setLibraryBooks([]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [openModal]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-gray-500 animate-pulse">Loading your library...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Saved Books <span className="text-lg font-normal text-gray-500">({libraryBooks.length})</span>
      </h1>

      {libraryBooks.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Your library is empty</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            When you find books you want to read later, add them to your library to access them quickly here.
          </p>
          <button
            onClick={() => router.push("/for-you")}
            className="bg-emerald-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-emerald-700 transition"
          >
            Explore Books
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {libraryBooks.map((book) => (
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
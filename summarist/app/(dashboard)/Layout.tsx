"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Search, Home, Bookmark, LogOut } from "lucide-react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col justify-between p-6">
        <div>
          <div className="text-xl font-bold text-[#032b41] mb-10">Summarist</div>
          <nav className="space-y-2">
            <button
              onClick={() => router.push("/for-you")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                pathname === "/for-you"
                  ? "bg-emerald-50 text-emerald-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Home className="w-5 h-5" />
              For You
            </button>
            <button
              onClick={() => router.push("/my-library")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                pathname === "/my-library"
                  ? "bg-emerald-50 text-emerald-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Bookmark className="w-5 h-5" />
              My Library
            </button>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition w-full"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header with Search Bar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-30">
          <form onSubmit={handleSearch} className="relative w-full max-w-md">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for books or authors..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-transparent rounded-lg text-sm focus:outline-none focus:bg-white focus:border-emerald-600 transition"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          </form>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col justify-between p-6">
      <div>
        <h1 className="text-2xl font-bold text-[#032b41] mb-10">
          Summarist
        </h1>

        <nav className="flex flex-col gap-4">
          <Link
            href="/for-you"
            className="text-[#032b41] font-medium hover:text-[#2bd97c]"
          >
            For You
          </Link>

          <Link
            href="/library"
            className="text-[#032b41] font-medium hover:text-[#2bd97c]"
          >
            Library
          </Link>

          <button
            className="text-left cursor-not-allowed text-gray-400"
            disabled
          >
            Highlights
          </button>

          <button
            className="text-left cursor-not-allowed text-gray-400"
            disabled
          >
            Search
          </button>

          <Link
            href="/settings"
            className="text-[#032b41] font-medium hover:text-[#2bd97c]"
          >
            Settings
          </Link>

          <button
            className="text-left cursor-not-allowed text-gray-400"
            disabled
          >
            Help & Support
          </button>
        </nav>
      </div>

     <button
  onClick={handleLogout}
  className="flex items-center gap-2"
>
  Logout
</button>
    </aside>
  );
}
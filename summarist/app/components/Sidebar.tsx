"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Bookmark,
  Pencil,
  Search,
  Settings,
  CircleHelp,
  LogOut,
} from "lucide-react";
import { FaBook } from "react-icons/fa";

import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const linkStyles = (path: string) =>
    `flex items-center gap-4 py-4 pl-6 transition text-[#032b41]
    ${
      pathname === path
        ? "border-l-4 border-[#2bd97c] bg-white font-semibold"
        : "border-l-4 border-transparent hover:bg-gray-100"
    }`;

  return (
    <aside className="w-[250px] h-screen bg-[#f7f8f8] border-r border-gray-200 flex flex-col justify-between">

      {/* TOP SECTION */}
      <div>
        {/* LOGO */}
        <div className="flex items-center gap-3 px-6 py-8">
         <FaBook
  size={36}
  className="text-[#032b41]"
/>

          <h1 className="text-3xl font-bold text-[#032b41]">
            Summarist
          </h1>
        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-col">

          <Link
            href="/for-you"
            className={linkStyles("/for-you")}
          >
            <Home size={22} />
            <span>For You</span>
          </Link>

          <Link
            href="/my-library"
            className={linkStyles("/my-library")}
          >
            <Bookmark size={22} />
            <span>My Library</span>
          </Link>

          <button
            className="flex items-center gap-4 py-4 pl-6 text-[#032b41]"
            disabled
          >
            <Pencil size={22} />
            <span>Highlights</span>
          </button>

          <Link
            href="/search"
            className={linkStyles("/search")}
          >
            <Search size={22} />
            <span>Search</span>
          </Link>

        </nav>
      </div>

      {/* BOTTOM SECTION */}
      <div className="pb-8 flex flex-col">

        <Link
          href="/settings"
          className={linkStyles("/settings")}
        >
          <Settings size={22} />
          <span>Settings</span>
        </Link>

        <button
          className="flex items-center gap-4 py-4 pl-6 text-[#032b41]"
          disabled
        >
          <CircleHelp size={22} />
          <span>Help & Support</span>
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-4 py-4 pl-6 text-[#032b41] hover:bg-gray-100 transition"
        >
          <LogOut size={22} />
          <span>Logout</span>
        </button>

      </div>
    </aside>
  );
}
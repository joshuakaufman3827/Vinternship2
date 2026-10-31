'use client';

import { Suspense, useState, type ReactNode } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import SearchBar from './SearchBar';
import Sidebar from './SideBar';

export default function DashboardShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* The sidebar reads the current URL (usePathname), which Next 16 wants inside Suspense.
          The fallback just holds the sidebar's space until it is ready. */}
      <Suspense
        fallback={
          <div className="hidden w-[200px] shrink-0 border-r border-[#e1e7ea] bg-[#f7faf9] md:block" />
        }
      >
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      </Suspense>
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-end gap-4 border-b border-[#e1e7ea] bg-white px-6">
          <SearchBar />
          {/* Phones: the sidebar is hidden and opens from this button. */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="cursor-pointer text-[#032b41] md:hidden"
          >
            <AiOutlineMenu size={28} />
          </button>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}

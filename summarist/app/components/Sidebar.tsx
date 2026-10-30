'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'firebase/auth';
import {
  Bookmark,
  CircleHelp,
  Home,
  LogOut,
  Pencil,
  Search,
  Settings,
  type LucideIcon,
} from 'lucide-react';

import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useAuthModal } from '../context/AuthModalContext';

// border-l-4 + pl-4 puts the icon 20px from the edge; the green bar marks the active page.
const rowClass =
  'flex w-full items-center gap-2 border-l-4 py-5 pl-4 text-base font-normal text-[#032b41]';

function NavItem({
  icon: Icon,
  label,
  href,
  active = false,
  onNavigate,
}: {
  icon: LucideIcon;
  label: string;
  href?: string;
  active?: boolean;
  onNavigate?: () => void;
}) {
  const content = (
    <>
      <Icon size={22} aria-hidden="true" />
      <span>{label}</span>
    </>
  );

  // No href = not built yet (Highlights, Search, Help & Support): show the not-allowed cursor.
  if (!href) {
    return (
      <button
        type="button"
        disabled
        className={`${rowClass} cursor-not-allowed border-transparent`}
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`${rowClass} transition-colors hover:bg-[#eef3f1] ${
        active ? 'border-[#2bd97c]' : 'border-transparent'
      }`}
    >
      {content}
    </Link>
  );
}

function AuthItem({ onNavigate }: { onNavigate: () => void }) {
  const { user, loading } = useAuth();
  const { openModal } = useAuthModal();

  // Don't flash "Login" for a logged-in user while Firebase is still checking.
  if (loading) {
    return (
      <div className="border-l-4 border-transparent py-5 pl-4" aria-hidden="true">
        <div className="h-6 w-24 animate-pulse bg-[#e1e7ea]" />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        if (user) {
          signOut(auth);
        } else {
          openModal('login');
        }
        onNavigate();
      }}
      className={`${rowClass} cursor-pointer border-transparent transition-colors hover:bg-[#eef3f1]`}
    >
      <LogOut size={22} aria-hidden="true" />
      <span>{user ? 'Logout' : 'Login'}</span>
    </button>
  );
}

export default function Sidebar({
  open = false,
  onClose = () => {},
}: {
  open?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Dark backdrop behind the sidebar on phones. */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[200px] shrink-0 flex-col justify-between border-r border-[#e1e7ea] bg-[#f7faf9] transition-transform duration-200 md:sticky md:top-0 md:z-auto md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          <div className="px-4 py-5">
            <Image
              src="/home/logo.png"
              alt="Summarist"
              width={160}
              height={37}
              priority
              className="h-auto w-[160px]"
            />
          </div>

          <nav className="mt-2 flex flex-col">
            <NavItem icon={Home} label="For you" href="/for-you" active={pathname === '/for-you'} onNavigate={onClose} />
            <NavItem icon={Bookmark} label="My Library" href="/library" active={pathname === '/library'} onNavigate={onClose} />
            <NavItem icon={Pencil} label="Highlights" />
            <NavItem icon={Search} label="Search" />
          </nav>
        </div>

        <div className="flex flex-col pb-6">
          <NavItem icon={Settings} label="Settings" href="/settings" active={pathname === '/settings'} onNavigate={onClose} />
          <NavItem icon={CircleHelp} label="Help & Support" />
          <AuthItem onNavigate={onClose} />
        </div>
      </aside>
    </>
  );
}

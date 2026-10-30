'use client';

import Image from 'next/image';
import { useAuthModal } from '../../context/AuthModalContext';

const links = ['About', 'Contact', 'Help'];

export default function HomeHeader() {
  const { openModal } = useAuthModal();

  return (
    <header className="mx-auto flex h-20 w-full max-w-[1070px] items-center justify-between px-6">
      <Image
        src="/home/logo.png"
        alt="Summarist"
        width={200}
        height={46}
        priority
        className="h-auto w-[200px]"
      />
      <nav className="flex gap-6 text-base text-[#032b41]">
        <button
          type="button"
          onClick={() => openModal('login')}
          className="cursor-pointer transition-colors duration-100 hover:text-[#2bd97c]"
        >
          Login
        </button>
        {/* Not built yet: not-allowed cursor, hidden on narrow phones (.nav__list--mobile). */}
        {links.map((label) => (
          <span key={label} className="hidden cursor-not-allowed min-[577px]:inline">
            {label}
          </span>
        ))}
      </nav>
    </header>
  );
}

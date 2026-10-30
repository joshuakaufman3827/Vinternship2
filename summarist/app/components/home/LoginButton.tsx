'use client';

import { useAuthModal } from '../../context/AuthModalContext';

// .btn / .home__cta--btn from home.css: 40px tall, 4px radius, 16px text, max 300px wide.
export default function LoginButton() {
  const { openModal } = useAuthModal();

  return (
    <button
      type="button"
      onClick={() => openModal('login')}
      className="flex h-10 w-full min-w-[180px] max-w-[300px] cursor-pointer items-center justify-center rounded-sm bg-[#2bd97c] text-base text-[#032b41] transition-colors duration-200 hover:bg-[#20ba68] active:translate-y-px"
    >
      Login
    </button>
  );
}

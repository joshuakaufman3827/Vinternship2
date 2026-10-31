'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { useAuth } from '../../context/AuthContext';
import { useAuthModal } from '../../context/AuthModalContext';
import { useSubscription } from '../../hooks/useSubscription';
import { cancelDemoSubscription } from '../../lib/stripe';

function SettingsSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[1070px] animate-pulse px-6 py-6" aria-hidden="true">
      <div className="h-9 w-40 bg-[#e1e7ea]" />
      <div className="mt-4 border-t border-[#e1e7ea] pt-6">
        <div className="h-5 w-52 bg-[#e1e7ea]" />
        <div className="mt-3 h-4 w-32 bg-[#e1e7ea]" />
      </div>
      <div className="mt-6 border-t border-[#e1e7ea] pt-6">
        <div className="h-5 w-24 bg-[#e1e7ea]" />
        <div className="mt-3 h-4 w-56 bg-[#e1e7ea]" />
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const { openModal } = useAuthModal();
  const { plan } = useSubscription();
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState('');

  async function handleCancel() {
    if (!user) return;
    setCancelError('');
    setCancelling(true);
    try {
      await cancelDemoSubscription(user.uid);
    } catch {
      setCancelError('Could not cancel. Please try again.');
    } finally {
      setCancelling(false);
    }
  }

  if (loading) return <SettingsSkeleton />;

  return (
    <div className="mx-auto w-full max-w-[1070px] px-6 py-6 text-[#032b41]">
      <h1 className="border-b border-[#e1e7ea] pb-4 text-[32px] font-bold">Settings</h1>

      {!user ? (
        // Logged out: an image and a login button under the title.
        <div className="flex flex-col items-center pt-10 text-center">
          <Image
            src="/home/login.png"
            alt="Log in to see your settings"
            width={400}
            height={300}
            priority
            className="h-auto w-full max-w-[400px] object-contain"
          />
          <h2 className="mt-6 text-xl font-bold">Log in to your account to see your details.</h2>
          <button
            type="button"
            onClick={() => openModal('login')}
            className="mt-4 flex h-10 w-[180px] cursor-pointer items-center justify-center rounded-sm bg-[#2bd97c] text-base text-[#032b41] transition-colors hover:bg-[#20ba68]"
          >
            Login
          </button>
        </div>
      ) : (
        <>
          <section className="border-b border-[#e1e7ea] py-6">
            <h2 className="text-lg font-bold">Your Subscription plan</h2>
            <p className="mt-2 text-base font-normal">{plan}</p>
            {plan === 'basic' && (
              <Link
                href="/choose-plan"
                className="mt-4 flex h-10 w-full max-w-[300px] items-center justify-center rounded-sm bg-[#2bd97c] text-base text-[#032b41] transition-colors hover:bg-[#20ba68]"
              >
                Upgrade to Premium
              </Link>
            )}
            {plan !== 'basic' && (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={cancelling}
                  className="mt-4 flex h-10 w-full max-w-[300px] cursor-pointer items-center justify-center rounded-sm border border-[#032b41] text-base text-[#032b41] transition-colors hover:bg-[#f1f6f4] disabled:opacity-60"
                >
                  {cancelling ? 'Cancelling…' : 'Cancel subscription'}
                </button>
                {cancelError && <p className="mt-2 text-sm text-red-600">{cancelError}</p>}
              </>
            )}
          </section>

          <section className="py-6">
            <h2 className="text-lg font-bold">Email</h2>
            <p className="mt-2 text-base font-normal">{user.email ?? 'No email on this account'}</p>
          </section>
        </>
      )}
    </div>
  );
}

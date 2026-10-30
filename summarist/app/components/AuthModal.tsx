'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { FaUser } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { IoClose } from 'react-icons/io5';
import { auth } from '../firebase';

// Create this user once in Firebase Console > Authentication > Users > Add user.
const GUEST_EMAIL = 'guest@gmail.com';
const GUEST_PASSWORD = 'guest123';

type Mode = 'login' | 'register' | 'forgot';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

const titles: Record<Mode, string> = {
  login: 'Log in to Summarist',
  register: 'Sign up for Summarist',
  forgot: 'Reset your password',
};

const submitLabels: Record<Mode, string> = {
  login: 'Login',
  register: 'Sign up',
  forgot: 'Send reset link',
};

const SHORT_PASSWORD = 'Password is too short (at least 6 characters)';

function getErrorMessage(err: unknown): string {
  if (err instanceof FirebaseError) {
    switch (err.code) {
      case 'auth/invalid-email':
      case 'auth/missing-email':
        return 'Invalid email';
      case 'auth/weak-password':
        return SHORT_PASSWORD;
      case 'auth/missing-password':
        return 'Please enter your password';
      // Newer Firebase projects return invalid-credential instead of
      // user-not-found (email enumeration protection).
      case 'auth/user-not-found':
      case 'auth/invalid-credential':
        return 'User not found';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later';
      case 'auth/popup-closed-by-user':
      case 'auth/cancelled-popup-request':
        return '';
    }
  }
  return 'Something went wrong. Please try again';
}

function Divider() {
  return (
    <div className="my-4 flex items-center gap-4 text-sm text-[#394547]">
      <span className="h-px flex-1 bg-[#bac8ce]" />
      <span>or</span>
      <span className="h-px flex-1 bg-[#bac8ce]" />
    </div>
  );
}

const inputClass =
  'h-10 w-full rounded-sm border-2 border-[#bac8ce] px-3 text-sm text-[#032b41] placeholder:text-[#6b757b] focus:border-[#2bd97c] focus:outline-none';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!isOpen) return null;

  const switchMode = (next: Mode) => {
    setMode(next);
    setError('');
    setMessage('');
  };

  const finishAuth = () => {
    onClose();
    router.push('/for-you');
  };

  const run = async (action: () => Promise<void>) => {
    setError('');
    setMessage('');
    setLoading(true);
    try {
      await action();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (mode === 'register' && password.length < 6) {
      setError(SHORT_PASSWORD);
      return;
    }

    void run(async () => {
      const cleanEmail = email.trim();
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, cleanEmail, password);
        finishAuth();
      } else if (mode === 'register') {
        await createUserWithEmailAndPassword(auth, cleanEmail, password);
        finishAuth();
      } else {
        await sendPasswordResetEmail(auth, cleanEmail);
        setMessage('Password reset email sent! Check your inbox.');
      }
    });
  };

  const handleGoogleLogin = () =>
    run(async () => {
      await signInWithPopup(auth, new GoogleAuthProvider());
      finishAuth();
    });

  // Guest = a real account with hardcoded credentials (per the project spec),
  // so user.email exists for the Settings page.
  const handleGuestLogin = () =>
    run(async () => {
      await signInWithEmailAndPassword(auth, GUEST_EMAIL, GUEST_PASSWORD);
      finishAuth();
    });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        className="relative w-full max-w-[400px] overflow-hidden rounded-lg bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 cursor-pointer text-black"
        >
          <IoClose size={28} />
        </button>

        <div className="px-8 pb-6 pt-10">
          <h2 id="auth-title" className="mb-6 text-center text-xl font-bold text-[#032b41]">
            {titles[mode]}
          </h2>

          {error && (
            <p role="alert" className="mb-4 rounded-sm bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}
          {message && (
            <p className="mb-4 rounded-sm bg-green-50 px-3 py-2 text-sm text-green-700">
              {message}
            </p>
          )}

          {mode !== 'forgot' && (
            <>
              <button
                type="button"
                onClick={handleGuestLogin}
                disabled={loading}
                className="relative flex h-10 w-full cursor-pointer items-center justify-center rounded-sm bg-[#3a579d] text-base font-normal text-white hover:bg-[#2f4a86] disabled:opacity-60"
              >
                <FaUser className="absolute left-3 text-xl" aria-hidden="true" />
                Login as a Guest
              </button>

              <Divider />

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="relative flex h-10 w-full cursor-pointer items-center justify-center rounded-sm bg-[#4285f4] text-base font-normal text-white hover:bg-[#3367d6] disabled:opacity-60"
              >
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-sm border border-[#4285f4] bg-white">
                  <FcGoogle className="text-2xl" aria-hidden="true" />
                </span>
                Login with Google
              </button>

              <Divider />
            </>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              autoComplete="email"
              className={inputClass}
            />
            {mode !== 'forgot' && (
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                className={inputClass}
              />
            )}
            <button
              type="submit"
              disabled={loading}
              className="h-10 w-full cursor-pointer rounded-sm bg-[#2bd97c] text-base font-normal text-[#032b41] hover:bg-[#20ba68] disabled:opacity-60"
            >
              {submitLabels[mode]}
            </button>
          </form>

          {mode === 'login' && (
            <button
              type="button"
              onClick={() => switchMode('forgot')}
              className="mx-auto mt-4 block cursor-pointer text-sm text-[#0365f2] hover:underline"
            >
              Forgot your password?
            </button>
          )}
          {mode === 'forgot' && (
            <button
              type="button"
              onClick={() => switchMode('login')}
              className="mx-auto mt-4 block cursor-pointer text-sm text-[#0365f2] hover:underline"
            >
              Back to login
            </button>
          )}
        </div>

        <div className="bg-[#f1f6f4] py-3 text-center">
          {mode === 'register' ? (
            <button
              type="button"
              onClick={() => switchMode('login')}
              className="cursor-pointer text-base text-[#0365f2] hover:underline"
            >
              Already have an account?
            </button>
          ) : (
            <button
              type="button"
              onClick={() => switchMode('register')}
              className="cursor-pointer text-base text-[#0365f2] hover:underline"
            >
              Don’t have an account?
            </button>
          )}
        </div>
      </div>
    </div>
  );
}



'use client';

import React, { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  sendPasswordResetEmail,
  signInAnonymously
} from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'next/navigation';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/for-you');
      } else if (mode === 'register') {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push('/for-you');
      } else if (mode === 'forgot') {
        await sendPasswordResetEmail(auth, email);
        setMessage('Password reset email sent! Check your inbox.');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/for-you');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGuestLogin = async () => {
    setError('');
    try {
      await signInAnonymously(auth);
      router.push('/for-you');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md pt-8 relative shadow-2xl overflow-hidden">
        {/* Modal Inner Container for Padding */}
        <div className="px-8 pb-4">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer"
          >
            ✕
          </button>

          <h2 className="text-2xl font-bold text-center mb-6 text-[#032b41]">
            {mode === 'login' && 'Log in to Summarist'}
            {mode === 'register' && 'Sign up for Summarist'}
            {mode === 'forgot' && 'Reset your password'}
          </h2>

          {error && <div className="bg-red-50 text-red-600 p-3 rounded text-sm mb-4">{error}</div>}
          {message && <div className="bg-green-50 text-green-600 p-3 rounded text-sm mb-4">{message}</div>}

          {mode !== 'forgot' && (
            <div className="space-y-3 mb-6">
              {/* Guest Login Button */}
              <button 
                onClick={handleGuestLogin}
                className="w-full bg-[#3b5998] hover:bg-[#324b81] text-white font-medium py-3 rounded transition text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span className="text-lg">👤</span> Login as a Guest
              </button>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-4 text-slate-400 text-xs uppercase font-medium">or</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              {/* Google Login Button */}
              <button 
                onClick={handleGoogleLogin}
                className="w-full bg-[#4285F4] hover:bg-[#3367d6] text-white font-medium py-3 rounded transition text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span className="bg-white p-1 rounded-sm text-xs flex items-center justify-center w-5 h-5 text-slate-900 font-bold">G</span> Login with Google
              </button>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-4 text-slate-400 text-xs uppercase font-medium">or</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>
            </div>
          )}

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-slate-300 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2bd97c]"
                placeholder="Email Address"
              />
            </div>

            {mode !== 'forgot' && (
              <div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-slate-300 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2bd97c]"
                  placeholder="Password"
                />
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-[#2bd97c] hover:bg-[#20b868] text-slate-900 font-semibold py-3 rounded transition text-sm shadow-sm cursor-pointer"
            >
              {mode === 'login' && 'Login'}
              {mode === 'register' && 'Sign Up'}
              {mode === 'forgot' && 'Send Reset Link'}
            </button>
          </form>

          {/* Center Forgot Password Link */}
          {mode === 'login' && (
            <div className="text-center mt-4">
              <button onClick={() => setMode('forgot')} className="text-[#3b82f6] hover:underline text-sm font-medium cursor-pointer">
                Forgot your password?
              </button>
            </div>
          )}
          {mode === 'forgot' && (
            <div className="text-center mt-4">
              <button onClick={() => setMode('login')} className="text-[#3b82f6] hover:underline text-sm font-medium cursor-pointer">
                Remembered your password? Log in
              </button>
            </div>
          )}
        </div>

        {/* Full-Width Footer Strip for Account Toggle */}
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-200 text-center text-sm mt-6">
          {mode === 'login' && (
            <button onClick={() => setMode('register')} className="text-[#3b82f6] hover:underline font-medium cursor-pointer">
              Don't have an account?
            </button>
          )}
          {mode === 'register' && (
            <button onClick={() => setMode('login')} className="text-[#3b82f6] hover:underline font-medium cursor-pointer">
              Already have an account? Log in
            </button>
          )}
          {mode === 'forgot' && (
            <button onClick={() => setMode('register')} className="text-[#3b82f6] hover:underline font-medium cursor-pointer">
              Don't have an account? Sign up
            </button>
          )}
        </div>
      </div>
    </div>
  );
}



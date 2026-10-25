"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "../firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="animate-pulse text-slate-500">
          Loading settings...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
        <div className="w-48 h-48 bg-slate-100 rounded-full flex items-center justify-center text-6xl">
          👤
        </div>

        <h1 className="text-3xl font-bold text-[#032b41]">
          You're not logged in
        </h1>

        <p className="text-slate-600 max-w-md">
          Log in to view your account information and subscription details.
        </p>

        <Link
          href="/"
          className="bg-[#2bd97c] hover:bg-[#20b868] text-[#032b41] font-semibold px-8 py-3 rounded-lg transition"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-[#032b41] mb-10">
        Settings
      </h1>

      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#032b41] mb-4">
            Account Information
          </h2>

          <div>
            <p className="text-sm text-slate-500 mb-1">Email</p>
            <p className="font-medium text-[#032b41]">
              {user.email || "Guest Account"}
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#032b41] mb-4">
            Subscription
          </h2>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500 mb-1">
                Current Plan
              </p>

              <p className="font-semibold text-[#032b41]">
                Basic
              </p>
            </div>

            <Link
              href="/choose-plan"
              className="bg-[#2bd97c] hover:bg-[#20b868] text-[#032b41] font-semibold px-6 py-3 rounded-lg transition text-center"
            >
              Upgrade
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
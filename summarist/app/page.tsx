'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import AuthModal from './components/AuthModal';

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const openLogin = () => {
    setAuthMode('login');
    setIsAuthOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      {/* HEADER / NAVBAR */}
      <header className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
  <Image
    src="/home/logo.png"
    alt="Summarist Logo"
    width={40}
    height={40}
    className="object-contain"
  />
  <span className="text-2xl font-bold tracking-tight text-[#032b41]">
    Summarist
  </span>
</div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-slate-900 transition">About</a>
          <a href="#" className="hover:text-slate-900 transition">Contact</a>
          <a href="#" className="hover:text-slate-900 transition">Help</a>
        </nav>
        <div>
          <button 
            onClick={openLogin}
            className="bg-[#2bd97c] hover:bg-[#20b868] text-slate-900 font-semibold px-6 py-2.5 rounded-lg transition text-sm shadow-sm"
          >
            Login
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#032b41] leading-tight">
            Gain more knowledge <br />
            <span className="text-[#2bd97c]">in less time</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
            Great summaries for busy people, individuals who barely have time to read, and even people who don’t like to read.
          </p>
          <div>
            <button 
              onClick={openLogin}
              className="bg-[#2bd97c] hover:bg-[#20b868] text-slate-900 font-semibold px-8 py-3.5 rounded-xl transition text-base shadow-md"
            >
              Login
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
  src="/home/landing.png"
  alt="Summarist Landing Illustration"
  width={700}
  height={550}
  priority
  className="w-full max-w-xl object-contain"
/>
        </div>
      </section>

      {/* FEATURES / BENEFITS SECTION */}
      <section className="bg-slate-50 py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#032b41] mb-16">
            Understand books in few minutes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-4">
              <div className="text-3xl">📖</div>
              <h3 className="text-xl font-bold text-[#032b41]">Read or listen</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Save time by getting the core ideas from the best books.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-4">
              <div className="text-3xl">🔍</div>
              <h3 className="text-xl font-bold text-[#032b41]">Find your next read</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Explore book lists and personalized recommendations.
              </p>
            </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-4">
              <div className="text-3xl">🎧</div>
              <h3 className="text-xl font-bold text-[#032b41]">Briefcasts</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gain valuable insights from briefcasts.
              </p>
            </div>
          </div>
        </div>
      </section>

{/* BENEFITS + STATISTICS SECTION */}
<section className="max-w-7xl mx-auto px-6 py-20">
  <div className="space-y-24">

    {/* Row 1 */}
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-4">
        <h3 className="text-5xl font-medium text-gray-500">
          Enhance your knowledge
        </h3>

        <h3 className="text-5xl font-medium text-[#2bd97c]">
          Achieve greater success
        </h3>

        <h3 className="text-5xl font-medium text-gray-500">
          Improve your health
        </h3>

        <h3 className="text-5xl font-medium text-gray-500">
          Develop better parenting skills
        </h3>

        <h3 className="text-5xl font-medium text-gray-500">
          Increase happiness
        </h3>

        <h3 className="text-5xl font-medium text-gray-500">
          Be the best version of yourself!
        </h3>
      </div>

      <div className="bg-[#f1f5f4] p-10">
        <div className="space-y-8 text-xl text-slate-700">

          <p>
            <span className="text-blue-600 font-bold mr-3">93%</span>
            of Summarist members significantly increase reading frequency.
          </p>

          <p>
            <span className="text-blue-600 font-bold mr-3">96%</span>
            of Summarist members establish better habits.
          </p>

          <p>
            <span className="text-blue-600 font-bold mr-3">90%</span>
            have made significant positive change to their lives.
          </p>

        </div>
      </div>
    </div>

    {/* Row 2 */}
    <div className="grid md:grid-cols-2 gap-12 items-center">

      <div className="bg-[#f1f5f4] p-10">
        <div className="space-y-8 text-xl text-slate-700">

          <p>
            <span className="text-blue-600 font-bold mr-3">91%</span>
            of Summarist members report feeling more productive after
            incorporating the service into their daily routine.
          </p>

          <p>
            <span className="text-blue-600 font-bold mr-3">94%</span>
            of Summarist members have noticed an improvement in their
            overall comprehension and retention of information.
          </p>

          <p>
            <span className="text-blue-600 font-bold mr-3">88%</span>
            of Summarist members feel more informed about current events
            and industry trends since using the platform.
          </p>

        </div>
      </div>

      <div className="space-y-4 text-right">

        <h3 className="text-5xl font-medium text-gray-500">
          Expand your learning
        </h3>

        <h3 className="text-5xl font-medium text-[#2bd97c]">
          Accomplish your goals
        </h3>

        <h3 className="text-5xl font-medium text-gray-500">
          Strengthen your vitality
        </h3>

        <h3 className="text-5xl font-medium text-gray-500">
          Become a better caregiver
        </h3>

        <h3 className="text-5xl font-medium text-gray-500">
          Improve your mood
        </h3>

        <h3 className="text-5xl font-medium text-gray-500">
          Maximize your abilities
        </h3>

      </div>
    </div>

  </div>
</section>

      {/* TESTIMONIALS SECTION */}
      <section className="bg-slate-50 py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#032b41] mb-16">
            What our members say
          </h2>
          <div className="max-w-3xl mx-auto flex flex-col gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <p className="text-sm text-slate-600 leading-relaxed italic">
                "This app has been a <span className="font-semibold text-slate-900">game-changer</span> for me! It's saved me so much time and effort in reading and comprehending books. Highly recommend it to all book lovers."
              </p>
              <p className="font-bold text-sm text-[#032b41]">— Hanna M.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <p className="text-sm text-slate-600 leading-relaxed italic">
                "I love this app! It provides <span className="font-semibold text-slate-900">concise and accurate summaries</span> of books in a way that is easy to understand. It's also very user-friendly and intuitive."
              </p>
              <p className="font-bold text-sm text-[#032b41]">— David B.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <p className="text-sm text-slate-600 leading-relaxed italic">
                "This app is a great way to get the main takeaways from a book without having to read the entire thing. The summaries are well-written and informative."
              </p>
              <p className="font-bold text-sm text-[#032b41]">— Nathan S.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <p className="text-sm text-slate-600 leading-relaxed italic">
                "If you're a busy person who loves reading but doesn't have the time to read every book in full, this app is for you!"
              </p>
              <p className="font-bold text-sm text-[#032b41]">— Ryan R.</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BANNER */}
      <section className="bg-[#032b41] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <h3 className="text-3xl md:text-4xl font-bold text-[#2bd97c]">3 Million</h3>
            <p className="text-sm text-slate-300">Downloads on all platforms</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl md:text-4xl font-bold text-[#2bd97c]">4.5 Stars</h3>
            <p className="text-sm text-slate-300">Average ratings on iOS and Google Play</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl md:text-4xl font-bold text-[#2bd97c]">97%</h3>
            <p className="text-sm text-slate-300">Of Summarist members create a better reading habit</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div className="space-y-3">
            <h4 className="font-bold text-[#032b41]">Actions</h4>
            <ul className="space-y-2 text-slate-600">
              <li><a href="#" className="hover:underline">Summarist Magazine</a></li>
              <li><a href="#" className="hover:underline">Cancel Subscription</a></li>
              <li><a href="#" className="hover:underline">Help</a></li>
              <li><a href="#" className="hover:underline">Contact us</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-[#032b41]">Useful Links</h4>
            <ul className="space-y-2 text-slate-600">
              <li><a href="#" className="hover:underline">Pricing</a></li>
              <li><a href="#" className="hover:underline">Summarist Business</a></li>
              <li><a href="#" className="hover:underline">Gift Cards</a></li>
              <li><a href="#" className="hover:underline">Authors & Publishers</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-[#032b41]">Company</h4>
            <ul className="space-y-2 text-slate-600">
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Partners</a></li>
              <li><a href="#" className="hover:underline">Code of Conduct</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-[#032b41]">Other</h4>
            <ul className="space-y-2 text-slate-600">
              <li><a href="#" className="hover:underline">Sitemap</a></li>
              <li><a href="#" className="hover:underline">Legal Notice</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
              <li><a href="#" className="hover:underline">Privacy Policies</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-slate-100 text-center text-xs text-slate-500">
          Copyright © 2026 Summarist.
        </div>
      </footer>

      {/* AUTH MODAL */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialMode={authMode} 
      />
    </div>
  );
}


"use client";

import { useState } from "react";

export default function ChoosePlanPage() {
  const [selectedPlan, setSelectedPlan] = useState<"yearly" | "monthly">("yearly");
  const [openFaq, setOpenFaq] = useState<number | null>(0); // First open by default

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleStartTrial = () => {
    alert(`You selected the ${selectedPlan} plan! Redirecting to payment...`);
  };

  return (
    <div className="min-h-screen bg-white text-[#032b41] flex flex-col justify-between">
      {/* Top Dark Hero Section */}
      <section className="bg-[#032b41] text-white pt-16 pb-24 px-6 rounded-b-[40px] text-center space-y-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            Get unlimited access to many amazing books to read
          </h1>
          <p className="text-slate-300 text-base md:text-lg">
            Turn ordinary moments into amazing learning opportunities
          </p>
        </div>
        <div className="flex justify-center pt-4">
          <div className="w-64 h-48 bg-slate-800/50 rounded-2xl flex items-center justify-center border border-slate-700 shadow-inner text-slate-400 text-sm">
            [Illustration Graphic]
          </div>
        </div>
      </section>

      {/* Feature Icons Section */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="space-y-3 flex flex-col items-center">
          <div className="text-3xl">📄</div>
          <h3 className="font-bold text-sm">Key ideas in few min</h3>
          <p className="text-xs text-slate-500">with many books to read</p>
        </div>
        <div className="space-y-3 flex flex-col items-center">
          <div className="text-3xl">🌱</div>
          <h3 className="font-bold text-sm">3 million people growing</h3>
          <p className="text-xs text-slate-500">with Summarist everyday</p>
        </div>
        <div className="space-y-3 flex flex-col items-center">
          <div className="text-3xl">🤝</div>
          <h3 className="font-bold text-sm">Precise recommendations</h3>
          <p className="text-xs text-slate-500">collections curated by experts</p>
        </div>
      </section>

      {/* Choose Plan Section */}
      <section className="max-w-xl mx-auto px-6 py-8 space-y-6 w-full">
        <h2 className="text-2xl font-bold text-center mb-8">
          Choose the plan that fits you
        </h2>

        {/* Yearly Plan Card */}
        <div 
          onClick={() => setSelectedPlan("yearly")}
          className={`border-2 rounded-xl p-6 cursor-pointer transition flex items-center justify-between ${
            selectedPlan === "yearly" ? "border-[#2bd97c] bg-slate-50/50" : "border-slate-200"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              selectedPlan === "yearly" ? "border-[#2bd97c]" : "border-slate-400"
            }`}>
              {selectedPlan === "yearly" && <div className="w-2.5 h-2.5 bg-[#2bd97c] rounded-full" />}
            </div>
            <div>
              <h4 className="font-bold text-base">Premium Plus Yearly</h4>
              <p className="text-xs text-slate-500">7-day free trial included</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold">$99.99</span>
            <span className="text-xs text-slate-500">/year</span>
          </div>
        </div>

        {/* Monthly Plan Card */}
        <div 
          onClick={() => setSelectedPlan("monthly")}
          className={`border-2 rounded-xl p-6 cursor-pointer transition flex items-center justify-between ${
            selectedPlan === "monthly" ? "border-[#2bd97c] bg-slate-50/50" : "border-slate-200"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              selectedPlan === "monthly" ? "border-[#2bd97c]" : "border-slate-400"
            }`}>
              {selectedPlan === "monthly" && <div className="w-2.5 h-2.5 bg-[#2bd97c] rounded-full" />}
            </div>
            <div>
              <h4 className="font-bold text-base">Premium Monthly</h4>
              <p className="text-xs text-slate-500">No trial included</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold">$9.99</span>
            <span className="text-xs text-slate-500">/month</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center pt-4 space-y-2">
          <button
            onClick={handleStartTrial}
            className="w-full bg-[#2bd97c] hover:bg-[#20b868] text-slate-900 font-bold py-4 rounded-xl transition shadow-md text-base"
          >
            Start your free 7-day trial
          </button>
          <p className="text-[11px] text-slate-500">
            Cancel your trial at any time before it ends, and you won’t be charged.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-6 py-16 space-y-4">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>

        {/* FAQ Item 1 */}
        <div className="border-b border-slate-200 pb-4">
          <button 
            onClick={() => toggleFaq(0)} 
            className="w-full flex items-center justify-between font-bold text-left py-2 text-lg"
          >
            <span>How does the free 7-day trial work?</span>
            <span>{openFaq === 0 ? "▲" : "▼"}</span>
          </button>
          {openFaq === 0 && (
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.
            </p>
          )}
        </div>

        {/* FAQ Item 2 */}
        <div className="border-b border-slate-200 pb-4">
          <button 
            onClick={() => toggleFaq(1)} 
            className="w-full flex items-center justify-between font-bold text-left py-2 text-lg"
          >
            <span>Can I switch subscriptions from monthly to yearly, or yearly to monthly?</span>
            <span>{openFaq === 1 ? "▲" : "▼"}</span>
          </button>
          {openFaq === 1 && (
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Yes, you can easily switch your subscription plan at any time through your account settings.
            </p>
          )}
        </div>

        {/* FAQ Item 3 */}
        <div className="border-b border-slate-200 pb-4">
          <button 
            onClick={() => toggleFaq(2)} 
            className="w-full flex items-center justify-between font-bold text-left py-2 text-lg"
          >
            <span>What's included in the Premium plan?</span>
            <span>{openFaq === 2 ? "▲" : "▼"}</span>
          </button>
          {openFaq === 2 && (
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Unlimited access to all book summaries, audio listening, key ideas, and offline reading capabilities.
            </p>
          )}
        </div>

        {/* FAQ Item 4 */}
        <div className="border-b border-slate-200 pb-4">
          <button 
            onClick={() => toggleFaq(3)} 
            className="w-full flex items-center justify-between font-bold text-left py-2 text-lg"
          >
            <span>Can I cancel during my trial or subscription?</span>
            <span>{openFaq === 3 ? "▲" : "▼"}</span>
          </button>
          {openFaq === 3 && (
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Yes, you can cancel your subscription or trial at any time with just a few clicks in your settings.
            </p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-slate-600">
          <div className="space-y-3">
            <h4 className="font-bold text-[#032b41]">Actions</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Summarist Magazine</a></li>
              <li><a href="#" className="hover:underline">Cancel Subscription</a></li>
              <li><a href="#" className="hover:underline">Help</a></li>
              <li><a href="#" className="hover:underline">Contact us</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-[#032b41]">Useful Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Pricing</a></li>
              <li><a href="#" className="hover:underline">Summarist Business</a></li>
              <li><a href="#" className="hover:underline">Gift Cards</a></li>
              <li><a href="#" className="hover:underline">Authors & Publishers</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-[#032b41]">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Partners</a></li>
              <li><a href="#" className="hover:underline">Code of Conduct</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-[#032b41]">Other</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Sitemap</a></li>
              <li><a href="#" className="hover:underline">Legal Notice</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
              <li><a href="#" className="hover:underline">Privacy Policies</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-slate-200 text-center text-xs text-slate-500">
          Copyright © 2026 Summarist.
        </div>
      </footer>
    </div>
  );
}
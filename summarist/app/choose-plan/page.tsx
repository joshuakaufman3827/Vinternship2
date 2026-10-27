"use client";

import Image from "next/image";
import { useState } from "react";

export default function ChoosePlanPage() {
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      question: "How does the free 7-day trial work?",
      answer:
        "Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.",
    },
    {
      question:
        "Can I switch subscriptions from monthly to yearly, or yearly to monthly?",
      answer:
        "Yes. You can switch your subscription plan at any time from your account settings.",
    },
    {
      question: "What's included in the Premium plan?",
      answer:
        "Premium includes unlimited access to all book summaries, audio versions, and new content added to the platform.",
    },
    {
      question: "Can I cancel during my trial or subscription?",
      answer:
        "Yes. You can cancel your subscription at any time before the next billing period.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f8fa] overflow-x-hidden">
      {/* HERO */}

      <section className="bg-[#032b41] text-white rounded-b-[220px]">
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-56 text-center">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl mx-auto">
            Get unlimited access to many amazing books to read
          </h1>

          <p className="text-xl mt-10">
            Turn ordinary moments into amazing learning opportunities
          </p>

          <div className="mt-10 -mb-56 z-20 relative flex justify-center">
  <div className="overflow-hidden rounded-t-full bg-[#f7f8fa]">
    <Image
      src="/home/pricing-top.png"
      alt="pricing"
      width={430}
      height={360}
      className="block"
    />
  </div>
</div>
        </div>
      </section>

      {/* FEATURES */}

      <section className="max-w-5xl mx-auto px-6 pt-24 pb-16">
        <div className="grid md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-6xl mb-4">📄</div>

            <h3 className="font-bold text-[#032b41] text-xl">
              Key ideas in few min
            </h3>

            <p className="text-[#032b41] text-lg">
              with many books to read
            </p>
          </div>

          <div>
            <div className="text-6xl mb-4">🌱</div>

            <h3 className="font-bold text-[#032b41] text-xl">
              3 million
            </h3>

            <p className="text-[#032b41] text-lg">
              people growing with
              <br />
              Summarist everyday
            </p>
          </div>

          <div>
            <div className="text-6xl mb-4">🤝</div>

            <h3 className="font-bold text-[#032b41] text-xl">
              Precise recommendations
            </h3>

            <p className="text-[#032b41] text-lg">
              collections curated by experts
            </p>
          </div>
        </div>
      </section>

      {/* PLAN SECTION */}

      <section className="max-w-4xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center text-[#032b41] mb-10">
          Choose the plan that fits you
        </h2>

        {/* YEARLY */}

        <div
          onClick={() => setSelectedPlan("yearly")}
          className={`cursor-pointer p-8 border-4 rounded-sm transition ${
            selectedPlan === "yearly"
              ? "border-[#2bd97c]"
              : "border-[#c6d1d4]"
          }`}
        >
          <div className="flex items-start gap-6">
            <div className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center mt-1">
              {selectedPlan === "yearly" && (
                <div className="w-3 h-3 rounded-full bg-black" />
              )}
            </div>

            <div>
              <h3 className="font-bold text-[#032b41] text-3xl">
                Premium Plus Yearly
              </h3>

              <p className="font-bold text-[#032b41] text-5xl mt-2">
                $99.99/year
              </p>

              <p className="text-gray-500 mt-3">
                7-day free trial included
              </p>
            </div>
          </div>
        </div>

        {/* OR */}

        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="mx-6 text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* MONTHLY */}

        <div
          onClick={() => setSelectedPlan("monthly")}
          className={`cursor-pointer p-8 border-4 rounded-sm transition ${
            selectedPlan === "monthly"
              ? "border-[#2bd97c]"
              : "border-[#c6d1d4]"
          }`}
        >
          <div className="flex items-start gap-6">
            <div className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center mt-1">
              {selectedPlan === "monthly" && (
                <div className="w-3 h-3 rounded-full bg-black" />
              )}
            </div>

            <div>
              <h3 className="font-bold text-[#032b41] text-3xl">
                Premium Monthly
              </h3>

              <p className="font-bold text-[#032b41] text-5xl mt-2">
                $9.99/month
              </p>

              <p className="text-gray-500 mt-3">
                No trial included
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="bg-[#2bd97c] hover:bg-[#22c866] text-[#032b41] px-12 py-4 rounded font-medium text-xl">
            Start your free 7-day trial
          </button>

          <p className="text-gray-500 mt-4">
            Cancel your trial at any time before it ends,
            and you won&apos;t be charged.
          </p>
        </div>
      </section>

      {/* FAQ */}

      <section className="max-w-6xl mx-auto px-6 pt-20">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-gray-300 py-8"
          >
            <button
              onClick={() =>
                setOpenFaq(openFaq === index ? -1 : index)
              }
              className="w-full flex justify-between items-center text-left"
            >
              <span className="font-bold text-[#032b41] text-4xl">
                {faq.question}
              </span>

              <span className="text-4xl text-[#032b41]">
                {openFaq === index ? "⌃" : "⌄"}
              </span>
            </button>

            {openFaq === index && (
              <p className="mt-8 text-[#032b41] text-2xl leading-relaxed max-w-6xl">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </section>

      {/* FOOTER */}

      <footer className="bg-[#edf3f2] mt-16 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <h3 className="font-bold text-[#032b41] text-2xl mb-4">
                Actions
              </h3>

              <ul className="space-y-3 text-gray-600">
                <li>Summarist Magazine</li>
                <li>Cancel Subscription</li>
                <li>Help</li>
                <li>Contact us</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-[#032b41] text-2xl mb-4">
                Useful Links
              </h3>

              <ul className="space-y-3 text-gray-600">
                <li>Pricing</li>
                <li>Summarist Business</li>
                <li>Gift Cards</li>
                <li>Authors & Publishers</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-[#032b41] text-2xl mb-4">
                Company
              </h3>

              <ul className="space-y-3 text-gray-600">
                <li>About</li>
                <li>Careers</li>
                <li>Partners</li>
                <li>Code of Conduct</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-[#032b41] text-2xl mb-4">
                Other
              </h3>

              <ul className="space-y-3 text-gray-600">
                <li>Sitemap</li>
                <li>Legal Notice</li>
                <li>Terms of Service</li>
                <li>Privacy Policies</li>
              </ul>
            </div>
          </div>

          <p className="text-center text-[#032b41] font-semibold mt-20">
            Copyright © 2023 Summarist.
          </p>
        </div>
      </footer>
    </div>
  );
}
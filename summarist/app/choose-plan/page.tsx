'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AiFillFileText } from 'react-icons/ai';
import { RiPlantFill } from 'react-icons/ri';
import { FaHandshake } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useAuth } from '../context/AuthContext';
import { useAuthModal } from '../context/AuthModalContext';
import { useSubscription } from '../hooks/useSubscription';
import { startCheckout, type PlanChoice } from '../lib/stripe';

const FAQS = [
  {
    question: 'How does the free 7-day trial work?',
    answer:
      'Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.',
  },
  {
    question: 'Can I switch subscriptions from monthly to yearly, or yearly to monthly?',
    answer:
      'While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.',
  },
  {
    question: "What's included in the Premium plan?",
    answer:
      'Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to a Kindle.',
  },
  {
    question: 'Can I cancel during my trial or subscription?',
    answer:
      "You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day.",
  },
];

const FOOTER = [
  { title: 'Actions', links: ['Summarist Magazine', 'Cancel Subscription', 'Help', 'Contact us'] },
  { title: 'Useful Links', links: ['Pricing', 'Summarist Business', 'Gift Cards', 'Authors & Publishers'] },
  { title: 'Company', links: ['About', 'Careers', 'Partners', 'Code of Conduct'] },
  { title: 'Other', links: ['Sitemap', 'Legal Notice', 'Terms of Service', 'Privacy Policies'] },
];

function PlanCard({
  selected,
  onSelect,
  title,
  price,
  note,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  price: string;
  note: string;
}) {
  return (
    <div
      onClick={onSelect}
      className={`flex cursor-pointer items-start gap-6 rounded-sm border-[3px] bg-[#f1f6f4] p-6 transition ${
        selected ? 'border-[#2bd97c]' : 'border-[#bac8ce]'
      }`}
    >
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#032b41]">
        {selected && <div className="h-3 w-3 rounded-full bg-[#032b41]" />}
      </div>
      <div>
        <h3 className="text-lg font-bold text-[#032b41]">{title}</h3>
        <p className="mt-1 text-2xl font-bold text-[#032b41]">{price}</p>
        <p className="mt-1 text-sm text-[#6b757b]">{note}</p>
      </div>
    </div>
  );
}

export default function ChoosePlanPage() {
  const [selected, setSelected] = useState<PlanChoice>('yearly');
  const [openFaq, setOpenFaq] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const { user, loading } = useAuth();
  const { openModal } = useAuthModal();
  const { isSubscribed } = useSubscription();

  async function handleCheckout() {
    setError('');
    if (!user) {
      openModal('login');
      return;
    }
    try {
      setBusy(true);
      await startCheckout(user.uid, selected);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
      setBusy(false);
    }
  }

  const yearly = selected === 'yearly';

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      {/* HERO */}
      <section className="bg-[#032b41] text-white md:[border-radius:0_0_250px_250px/0_0_200px_200px]">
        <div className="mx-auto max-w-[1070px] px-6 pt-10 text-center">
          <h1 className="mx-auto max-w-[860px] text-3xl font-bold leading-tight md:text-5xl">
            Get unlimited access to many amazing books to read
          </h1>
          <p className="mt-8 text-lg">
            Turn ordinary moments into amazing learning opportunities
          </p>
          <div className="mt-10 flex justify-center">
            <div className="overflow-hidden rounded-t-full bg-white">
              <Image src="/home/pricing-top.png" alt="pricing" width={340} height={285} className="block" priority />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-[873px] px-6 pt-16 pb-14">
        <div className="grid gap-10 text-center md:grid-cols-3 md:gap-0">
          {[
            { icon: <AiFillFileText />, bold: 'Key ideas in few min', text: ' with many books to read' },
            { icon: <RiPlantFill />, bold: '3 million', text: ' people growing with Summarist everyday' },
            { icon: <FaHandshake />, bold: 'Precise recommendations', text: ' collections curated by experts' },
          ].map((f) => (
            <div key={f.bold}>
              <div className="mb-3 flex justify-center text-[56px] text-[#032b41]">{f.icon}</div>
              <p className="mx-auto max-w-[240px] text-base text-[#394547]">
                <strong className="font-bold">{f.bold}</strong>
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PLANS */}
      <section className="mx-auto max-w-[728px] px-6">
        <h2 className="mb-6 text-center text-3xl font-bold text-[#032b41] md:text-[32px]">
          Choose the plan that fits you
        </h2>

        <PlanCard
          selected={yearly}
          onSelect={() => setSelected('yearly')}
          title="Premium Plus Yearly"
          price="$99.99/year"
          note="7-day free trial included"
        />

        <div className="mx-auto my-4 flex w-[240px] items-center">
          <div className="h-px flex-1 bg-[#bac8ce]" />
          <span className="mx-4 text-sm text-[#6b757b]">or</span>
          <div className="h-px flex-1 bg-[#bac8ce]" />
        </div>

        <PlanCard
          selected={!yearly}
          onSelect={() => setSelected('monthly')}
          title="Premium Monthly"
          price="$9.99/month"
          note="No trial included"
        />

        <div className="sticky bottom-0 mt-6 bg-white py-4 text-center">
          {isSubscribed ? (
            <p className="font-bold text-[#032b41]">You already have a Premium plan. 🎉</p>
          ) : (
            <>
              <button
                onClick={handleCheckout}
                disabled={busy || loading}
                className="h-10 w-full max-w-[300px] rounded bg-[#2bd97c] font-medium text-[#032b41] transition hover:bg-[#20ba68] disabled:opacity-60"
              >
                {busy ? 'Redirecting…' : yearly ? 'Start your free 7-day trial' : 'Start your first month'}
              </button>
              {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
              <p className="mt-3 text-xs text-[#6b757b]">
                {yearly
                  ? "Cancel your trial at any time before it ends, and you won't be charged."
                  : '30-day money back guarantee, no questions asked.'}
              </p>
            </>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[1070px] px-6 pt-8">
        {FAQS.map((faq, i) => {
          const open = openFaq === i;
          return (
            <div key={faq.question} className="border-b border-[#bac8ce]">
              <button
                onClick={() => setOpenFaq(open ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 py-7 text-left"
              >
                <span className="text-xl font-medium text-[#032b41] md:text-2xl">{faq.question}</span>
                <span className="shrink-0 text-[#032b41]">{open ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}</span>
              </button>
              {open && <p className="pb-6 text-[#394547]">{faq.answer}</p>}
            </div>
          );
        })}
      </section>

      {/* FOOTER */}
      <footer className="mt-10 bg-[#f1f6f4] py-16">
        <div className="mx-auto max-w-[1070px] px-6">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-[1fr_1fr_1fr_auto]">
            {FOOTER.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 text-lg font-bold text-[#032b41]">{col.title}</h3>
                <ul className="space-y-3 text-sm text-[#394547]">
                  {col.links.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-14 text-center font-medium text-[#032b41]">Copyright &copy; 2023 Summarist.</p>
        </div>
      </footer>
    </div>
  );
}

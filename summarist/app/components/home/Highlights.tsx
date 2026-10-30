'use client';

import { useEffect, useState } from 'react';

// [text before, bold phrase, text after]
type Stat = { value: string; parts: [string, string, string] };

const leftHeadings = [
  'Enhance your knowledge',
  'Achieve greater success',
  'Improve your health',
  'Develop better parenting skills',
  'Increase happiness',
  'Be the best version of yourself!',
];

const rightHeadings = [
  'Expand your learning',
  'Accomplish your goals',
  'Strengthen your vitality',
  'Become a better caregiver',
  'Improve your mood',
  'Maximize your abilities',
];

const leftStats: Stat[] = [
  { value: '93%', parts: ['of Summarist members ', 'significantly increase', ' reading frequency.'] },
  { value: '96%', parts: ['of Summarist members ', 'establish better', ' habits.'] },
  { value: '90%', parts: ['have made ', 'significant positive', ' change to their lives.'] },
];

const rightStats: Stat[] = [
  {
    value: '91%',
    parts: ['of Summarist members ', 'report feeling more productive', ' after incorporating the service into their daily routine.'],
  },
  {
    value: '94%',
    parts: ['of Summarist members have ', 'noticed an improvement', ' in their overall comprehension and retention of information.'],
  },
  {
    value: '88%',
    parts: ['of Summarist members ', 'feel more informed', ' about current events and industry trends since using the platform.'],
  },
];

function HeadingList({
  items,
  active,
  align = 'left',
}: {
  items: string[];
  active: number;
  align?: 'left' | 'right';
}) {
  return (
    <div
      className={`flex w-full flex-col justify-center gap-4 ${align === 'right' ? 'md:items-end' : ''}`}
    >
      {items.map((text, index) => (
        <h3
          key={text}
          className={`text-2xl font-medium transition-colors duration-300 md:text-[32px] ${
            index === active ? 'text-[#2bd97c]' : 'text-[#6b757b]'
          }`}
        >
          {text}
        </h3>
      ))}
    </div>
  );
}

function StatBox({ stats, className = '' }: { stats: Stat[]; className?: string }) {
  return (
    <div
      className={`flex w-full flex-col justify-center gap-6 bg-[#f1f6f4] px-6 py-10 ${className}`}
    >
      {stats.map(({ value, parts: [before, bold, after] }) => (
        <div key={value} className="flex gap-4">
          <div className="mt-1 text-xl font-semibold text-[#0365f2]">{value}</div>
          <div className="text-base font-light text-[#394547] md:text-xl">
            {before}
            {/* <b> inside light (300) text renders at 400, same as the original */}
            <b className="font-normal">{bold}</b>
            {after}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Highlights() {
  const [active, setActive] = useState(0);

  // Both lists share one active index. The 3000ms interval is a guess:
  // watch the professor's page and adjust it to match.
  useEffect(() => {
    const id = setInterval(() => {
      setActive((current) => (current + 1) % leftHeadings.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="pb-10">
      <div className="mx-auto w-full max-w-[1070px] px-6">
        <div className="mb-8 flex flex-col gap-8 md:mb-24 md:flex-row md:gap-20">
          <HeadingList items={leftHeadings} active={active} />
          <StatBox stats={leftStats} />
        </div>
        <div className="flex flex-col gap-8 md:flex-row md:gap-20">
          {/* On phones the headings come first, then the box (order-1). */}
          <StatBox stats={rightStats} className="order-1 md:order-none" />
          <HeadingList items={rightHeadings} active={active} align="right" />
        </div>
      </div>
    </section>
  );
}

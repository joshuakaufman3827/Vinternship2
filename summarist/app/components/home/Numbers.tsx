import type { ReactNode } from 'react';
import { BiCrown, BiLeaf } from 'react-icons/bi';
import { BsStarFill, BsStarHalf } from 'react-icons/bs';

const stars = (
  <>
    {Array.from({ length: 4 }, (_, i) => (
      <BsStarFill key={i} className="h-5 w-5" aria-hidden="true" />
    ))}
    <BsStarHalf className="h-5 w-5" aria-hidden="true" />
  </>
);

const numbers: { icon: ReactNode; value: string; label: string }[] = [
  { icon: <BiCrown className="h-12 w-12" aria-hidden="true" />, value: '3 Million', label: 'Downloads on all platforms' },
  { icon: stars, value: '4.5 Stars', label: 'Average ratings on iOS and Google Play' },
  { icon: <BiLeaf className="h-12 w-12" aria-hidden="true" />, value: '97%', label: 'Of Summarist members create a better reading habit' },
];

export default function Numbers() {
  return (
    <section className="py-10">
      <div className="mx-auto w-full max-w-[1070px] px-6">
        <h2 className="mb-8 text-center text-2xl font-bold text-[#032b41] md:text-[32px]">
          Start growing with Summarist now
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-10">
          {numbers.map(({ icon, value, label }) => (
            <div
              key={value}
              className="flex flex-col items-center rounded-xl bg-[#d7e9ff] p-6 pb-10 text-center"
            >
              <div className="flex h-[60px] items-center gap-1 text-[#0365f2]">{icon}</div>
              <p className="mb-4 text-[32px] font-semibold text-[#032b41] md:text-[40px]">{value}</p>
              <p className="text-sm font-light text-[#394547] md:text-base">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

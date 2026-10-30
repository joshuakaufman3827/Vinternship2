import type { IconType } from 'react-icons';
import { AiFillBulb, AiFillFileText } from 'react-icons/ai';
import { BsFillMicFill } from 'react-icons/bs';

const features: { icon: IconType; title: string; text: string }[] = [
  {
    icon: AiFillFileText,
    title: 'Read or listen',
    text: 'Save time by getting the core ideas from the best books.',
  },
  {
    icon: AiFillBulb,
    title: 'Find your next read',
    text: 'Explore book lists and personalized recommendations.',
  },
  {
    icon: BsFillMicFill,
    title: 'Briefcasts',
    text: 'Gain valuable insights from briefcasts',
  },
];

export default function Features() {
  return (
    <section className="pt-10">
      <div className="mx-auto w-full max-w-[1070px] px-6">
        <h2 className="mb-8 text-center text-2xl font-bold text-[#032b41] md:text-[32px]">
          Understand books in few minutes
        </h2>
        <div className="mb-24 grid grid-cols-1 gap-10 md:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <div className="mb-2 flex justify-center text-[#032b41]">
                <Icon className="h-12 w-12 md:h-[60px] md:w-[60px]" aria-hidden="true" />
              </div>
              <h3 className="mb-4 text-xl font-medium text-[#032b41] md:text-2xl">{title}</h3>
              <p className="text-sm font-light text-[#394547] md:text-lg">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

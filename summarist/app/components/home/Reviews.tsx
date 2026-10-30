import { BsStarFill } from 'react-icons/bs';
import LoginButton from './LoginButton';

// [text before, bold phrase, text after]
const reviews: { name: string; parts: [string, string, string] }[] = [
  {
    name: 'Hanna M.',
    parts: [
      'This app has been a ',
      'game-changer',
      ' for me! It’s saved me so much time and effort in reading and comprehending books. Highly recommend it to all book lovers.',
    ],
  },
  {
    name: 'David B.',
    parts: [
      'I love this app! It provides ',
      'concise and accurate summaries',
      ' of books in a way that is easy to understand. It’s also very user-friendly and intuitive.',
    ],
  },
  {
    name: 'Nathan S.',
    parts: [
      'This app is a great way to get the main takeaways from a book without having to read the entire thing. ',
      'The summaries are well-written and informative.',
      ' Definitely worth downloading.',
    ],
  },
  {
    name: 'Ryan R.',
    parts: [
      'If you’re a busy person who ',
      'loves reading but doesn’t have the time',
      ' to read every book in full, this app is for you! The summaries are thorough and provide a great overview of the book’s content.',
    ],
  },
];

export default function Reviews() {
  return (
    <section className="py-10">
      <div className="mx-auto w-full max-w-[1070px] px-6">
        <h2 className="mb-8 text-center text-2xl font-bold text-[#032b41] md:text-[32px]">
          What our members say
        </h2>
        <div className="mx-auto max-w-[600px]">
          {reviews.map(({ name, parts: [before, bold, after] }) => (
            <article key={name} className="mb-8 rounded-sm bg-[#fff3d7] p-4 font-light">
              <div className="mb-2 flex gap-2 text-[#032b41]">
                <span>{name}</span>
                <span className="flex text-base text-[#0564f1]" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <BsStarFill key={i} aria-hidden="true" />
                  ))}
                </span>
              </div>
              <p className="text-sm leading-[1.4] tracking-[0.3px] text-[#394547] md:text-base">
                {before}
                <b className="font-normal">{bold}</b>
                {after}
              </p>
            </article>
          ))}
        </div>
        <div className="flex justify-center">
          <LoginButton />
        </div>
      </div>
    </section>
  );
}

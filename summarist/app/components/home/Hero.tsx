import Image from 'next/image';
import LoginButton from './LoginButton';

export default function Hero() {
  return (
    <section className="py-10">
      <div className="mx-auto flex w-full max-w-[1070px] items-center px-6">
        <div className="mx-auto flex w-full max-w-[540px] flex-col items-center text-center md:mx-0 md:max-w-none md:items-start md:text-left">
          <h1 className="mb-6 text-2xl font-bold text-[#032b41] md:text-[40px]">
            Gain more knowledge
            <br />
            in less time
          </h1>
          <p className="mb-6 text-xl font-light leading-normal text-[#394547]">
            Great summaries for busy people,
            <br />
            individuals who barely have time to read,
            <br />
            and even people who don’t like to read.
          </p>
          <LoginButton />
        </div>
        {/* The illustration is hidden on phones, as in the professor's CSS. */}
        <div className="hidden w-full justify-end md:flex">
          <Image
            src="/home/landing.png"
            alt="Illustration of a person reading a book summary on a screen"
            width={700}
            height={550}
            priority
            className="h-auto w-full max-w-[400px]"
          />
        </div>
      </div>
    </section>
  );
}

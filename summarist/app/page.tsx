import Features from './components/home/Features';
import Hero from './components/home/Hero';
import HomeFooter from './components/home/HomeFooter';
import HomeHeader from './components/home/HomeHeader';
import Highlights from './components/home/Highlights';
import Numbers from './components/home/Numbers';
import Reviews from './components/home/Reviews';

export default function Home() {
  return (
    <>
      <HomeHeader />
      <main>
        <Hero />
        <Features />
        <Highlights />
        <Reviews />
        <Numbers />
      </main>
      <HomeFooter />
    </>
  );
}


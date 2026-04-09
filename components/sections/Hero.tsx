'use client';

import Image from 'next/image';
import { scrollTo } from '../utils';
import { useLocale } from '@/context/LocaleContext';

const Hero = () => {
  const { getCopy } = useLocale();
  return (
    <section id="hero" className="relative h-screen w-full">
      <Image
        src="/images/hero.webp"
        alt="Hero Background"
        fill
        className="object-cover object-center"
        priority
        sizes="(max-width: 768px) 100vw, 100vw"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative flex flex-col items-center justify-center h-full max-w-5xl mx-auto px-6 text-center text-white">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
          {getCopy('heroTitle')}
        </h1>

        <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed">
          {getCopy('heroSubtitle')}
        </p>

        <button
          onClick={() => scrollTo('courses')}
          className="px-8 py-3 bg-brand-primary rounded-lg hover:opacity-90 font-bold"
        >
          {getCopy('heroButton')}
        </button>
      </div>
    </section>
  );
};

export default Hero;

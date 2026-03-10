'use client';

import Image from 'next/image';
import { scrollTo } from '../utils';

const Hero = () => {
  return (
    <section id="hero" className="relative h-screen w-full">
      {/* Optimized Background Image for different screens */}
      <Image
        src="/images/hero.webp"
        alt="Hero Background"
        fill
        className="object-cover object-center"
        priority
        sizes="(max-width: 768px) 100vw, 100vw" // responsive sizing
      />

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Hero Content */}
      <div className="relative flex flex-col items-center justify-center h-full max-w-5xl mx-auto px-6 text-center text-white">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
          Learn English With Confidence
        </h1>

        <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed">
          Practical English programs designed to help beginners speak confidently in everyday and
          professional situations.
        </p>

        <button
          onClick={() => scrollTo('courses')}
          className="px-8 py-3 bg-brand-primary rounded-lg hover:opacity-90 font-bold"
        >
          Start Learning
        </button>
      </div>
    </section>
  );
};

export default Hero;

'use client';

import { scrollTo } from '../utils';

const Hero = () => {
  return (
    <section className="relative h-screen w-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
        }}
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative flex flex-col items-center justify-center h-full max-w-5xl mx-auto px-6 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Learn English With Confidence</h1>

        <p className="text-lg md:text-xl mb-8">
          Practical English programs designed to help beginners speak confidently in everyday and
          professional situations.
        </p>

        <button
          onClick={() => scrollTo('classes')}
          className="px-8 py-3 bg-brand-primary rounded-lg hover:opacity-90 font-bold"
        >
          Start Learning
        </button>
      </div>
    </section>
  );
};

export default Hero;

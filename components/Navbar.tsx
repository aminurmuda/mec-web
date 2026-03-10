'use client';

import { useState } from 'react';
import { League_Spartan } from 'next/font/google';

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  variable: '--font-league-spartan',
});

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const menu = [
    { name: 'Courses', id: 'courses' },
    { name: 'Registration', id: 'registration' },
    { name: 'Insights', id: 'insights' },
    { name: 'About', id: 'about' },
    { name: 'Testimonials', id: 'testimonials' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);

    if (!el) return;

    // Get navbar height dynamically
    const nav = document.querySelector('nav');
    const navHeight = nav?.offsetHeight || 0;

    // Scroll so section top is just below navbar
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({
      top,
      behavior: 'smooth',
    });

    setOpen(false);
  };

  return (
    <nav className="sticky top-0 bg-brand-bg z-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1
          className={`${leagueSpartan.variable} font-sans font-extrabold text-lg text-brand-primary leading-none lg:w-5`}
        >
          Medeena English Center
        </h1>

        <div className="hidden md:flex gap-8 text-sm font-medium">
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="hover:text-white transition text-brand-primary font-semibold text-lg"
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Burger Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300"
        >
          <div className="space-y-1">
            <span className="block w-5 h-0.5 bg-brand-primary"></span>
            <span className="block w-5 h-0.5 bg-brand-primary"></span>
            <span className="block w-5 h-0.5 bg-brand-primary"></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-brand-bg border-t border-gray-200">
          <div className="flex flex-col px-6 py-4 gap-4">
            {menu.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left text-brand-primary font-semibold text-lg hover:text-white transition"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

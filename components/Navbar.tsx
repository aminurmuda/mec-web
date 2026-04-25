'use client';

import { useState } from 'react';
import { League_Spartan } from 'next/font/google';
import LanguageSwitcher from './LanguageSwitcher';
import { useLocale } from '@/context/LocaleContext';
import NavbarProfile from './NavbarProfile';
import NavbarMobileMenu from './NavbarMobileMenu';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  variable: '--font-league-spartan',
});

const Navbar = () => {
  const { data: session } = useSession();
  const { locale, redirect } = useLocale();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  const isAuthenticated = session?.user?.email !== undefined;

  const menuEn = [
    { name: 'Courses', id: 'courses' },
    { name: 'Registration', id: 'registration' },
    { name: 'Insights', id: 'insights' },
    { name: 'About', id: 'about' },
    { name: 'Testimonials', id: 'testimonials' },
  ];

  const menuId = [
    { name: 'Kelas', id: 'courses' },
    { name: 'Pendaftaran', id: 'registration' },
    { name: 'Insights', id: 'insights' },
    { name: 'Tentang Kami', id: 'about' },
    { name: 'Testimoni', id: 'testimonials' },
  ];

  const menu = locale === 'en' ? menuEn : menuId;

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
        <Link
          href={`/${locale}`}
          className={`${leagueSpartan.variable} font-sans font-extrabold text-lg text-brand-primary leading-none w-5`}
        >
          Medeena English Center
        </Link>
        <div className="flex gap-2">
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
            {isAuthenticated && (
              <button
                onClick={() => redirect('/courses')}
                className="hover:text-white transition text-brand-primary font-semibold text-lg"
              >
                Edit Course
              </button>
            )}
          </div>
          <div className="hidden md:flex items-center justify-center">
            {process.env.NEXT_PUBLIC_SHOW_LANGUAGE_SWITCHER === 'true' && <LanguageSwitcher />}
            <NavbarProfile />
          </div>
        </div>

        {/* Burger Button */}
        <div className="md:hidden flex gap-2">
          {process.env.NEXT_PUBLIC_SHOW_LANGUAGE_SWITCHER === 'true' && <LanguageSwitcher />}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300"
          >
            <div className="space-y-1">
              <span className="block w-5 h-0.5 bg-brand-primary"></span>
              <span className="block w-5 h-0.5 bg-brand-primary"></span>
              <span className="block w-5 h-0.5 bg-brand-primary"></span>
            </div>
          </button>
        </div>
      </div>

      <NavbarMobileMenu
        open={open}
        menu={menu}
        scrollTo={scrollTo}
        session={session}
        handleLogout={handleLogout}
      />
    </nav>
  );
};

export default Navbar;

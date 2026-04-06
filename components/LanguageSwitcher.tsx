'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Language } from './icons/Language';

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = pathname?.split('/')[1] || 'en';

  const toggleLanguage = () => {
    const nextLocale = currentLocale === 'en' ? 'id' : 'en';

    if (!pathname || pathname === '/') {
      router.push(`/${nextLocale}`);
      return;
    }

    const segments = pathname.split('/');
    segments[1] = nextLocale;

    router.push(segments.join('/'));
  };

  return (
    <div
      className="shadow-lg rounded-lg bg-white"
      style={{
        position: 'fixed',
        top: '100px',
        left: '24px',
        zIndex: 50,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <button
        onClick={toggleLanguage}
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-brand-bg font-semibold text-md"
      >
        <Language /> {currentLocale === 'en' ? 'ID' : 'EN'}
      </button>
    </div>
  );
};

export default LanguageSwitcher;

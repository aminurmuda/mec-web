'use client';

import { useRouter, usePathname } from 'next/navigation';

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = pathname?.split('/')[1] || 'en';
  const isEnglish = currentLocale === 'en';

  const toggleLanguage = () => {
    let nextLocale = 'en';

    if (currentLocale === 'en') {
      nextLocale = 'id';
    }

    if (currentLocale === 'id') {
      nextLocale = 'en';
    }

    if (!pathname || pathname === '/') {
      router.push(`/${nextLocale}`);
      return;
    }

    const segments = pathname.split('/');
    segments[1] = nextLocale;

    router.push(segments.join('/'));
  };

  return (
    <div className="flex items-center gap-2 px-3 py-2">
      <button
        onClick={toggleLanguage}
        className={`relative w-14 h-7 flex items-center rounded-full transition-colors ${
          isEnglish ? 'bg-gray-300' : 'bg-blue-500'
        }`}
      >
        <span
          className={`flex items-center justify-center text-xs font-semibold absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
            isEnglish ? 'translate-x-1' : 'translate-x-7'
          }`}
        >
          {isEnglish ? 'EN' : 'ID'}
        </span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;

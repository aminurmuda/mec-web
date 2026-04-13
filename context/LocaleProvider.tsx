'use client';

import { ReactNode } from 'react';
import LocaleContext from './LocaleContext';
import { Locale } from '@/lib/i18n';
import { dictionaries } from '@/lib/dictionaries';
import { useRouter } from 'next/navigation';

type Props = {
  children: ReactNode;
  locale: Locale;
};

const LocaleProvider = ({ children, locale }: Props) => {
  const router = useRouter();
  const getCopy = (key: string) => {
    const value = dictionaries[locale][key];

    if (!value) {
      return key;
    }

    return value;
  };

  const redirect = (path: string) => {
    const hasLocale = /^\/(en|id)(\/|$)/.test(path);

    if (hasLocale) {
      router.push(path);
      return;
    }

    router.push(`/${locale}${path}`);
  };

  return (
    <LocaleContext.Provider value={{ locale, getCopy, redirect }}>
      {children}
    </LocaleContext.Provider>
  );
};

export default LocaleProvider;

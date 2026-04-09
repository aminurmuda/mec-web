'use client';

import { ReactNode } from 'react';
import LocaleContext from './LocaleContext';
import { Locale } from '@/lib/i18n';
import { dictionaries } from '@/lib/dictionaries';

type Props = {
  children: ReactNode;
  locale: Locale;
};

const LocaleProvider = ({ children, locale }: Props) => {
  const getCopy = (key: string) => {
    const value = dictionaries[locale][key];

    if (!value) {
      return key;
    }

    return value;
  };

  return <LocaleContext.Provider value={{ locale, getCopy }}>{children}</LocaleContext.Provider>;
};

export default LocaleProvider;

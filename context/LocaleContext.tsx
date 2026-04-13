'use client';

import { createContext, useContext } from 'react';
import { Locale } from '@/lib/i18n';

type LocaleContextType = {
  locale: Locale;
  getCopy: (key: string) => string;
  redirect: (path: string) => void;
};

const LocaleContext = createContext<LocaleContextType>({
  locale: 'en',
  getCopy: () => '',
  redirect: () => {},
});

export const useLocale = () => useContext(LocaleContext);

export default LocaleContext;

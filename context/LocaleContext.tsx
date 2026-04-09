'use client';

import { createContext, useContext } from 'react';
import { Locale } from '@/lib/i18n';

type LocaleContextType = {
  locale: Locale;
};

const LocaleContext = createContext<LocaleContextType>({
  locale: 'en',
});

export const useLocale = () => useContext(LocaleContext);

export default LocaleContext;

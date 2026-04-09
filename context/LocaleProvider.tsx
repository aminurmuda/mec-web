// src/context/locale/LocaleProvider.tsx
'use client';

import { ReactNode } from 'react';
import LocaleContext from './LocaleContext';
import { Locale } from '@/lib/i18n';

type Props = {
  children: ReactNode;
  locale: Locale;
};

const LocaleProvider = ({ children, locale }: Props) => {
  return <LocaleContext.Provider value={{ locale }}>{children}</LocaleContext.Provider>;
};

export default LocaleProvider;

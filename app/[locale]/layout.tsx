'use client';
import LocaleProvider from '@/context/LocaleProvider';
import { Locale } from '@/lib/i18n';
import { useParams } from 'next/navigation';

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function LocaleLayout({ children }: LocaleLayoutProps) {
  const params = useParams();
  const locale = (params.locale as Locale) || 'en';
  return <LocaleProvider locale={locale}>{children}</LocaleProvider>;
}

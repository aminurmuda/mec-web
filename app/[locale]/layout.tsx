'use client';

import LocaleProvider from '@/context/LocaleProvider';
import { Locale } from '@/lib/i18n';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';

type LocaleLayoutProps = {
  children: React.ReactNode;
};

const LocaleLayout = ({ children }: LocaleLayoutProps) => {
  const params = useParams();
  const locale = (params.locale as Locale) || 'en';

  return (
    <LocaleProvider locale={locale}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main>{children}</main>

        <Footer />
      </div>
    </LocaleProvider>
  );
};

export default LocaleLayout;

import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import FloatingVisitorCounter from '@/components/FloatingVisitorCounter';
import { ToastProvider } from '@/components/Toast/ToastContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Medeena English Center',
  description: 'Online Private English Class',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-800 overflow-x-hidden`}
      >
        <LanguageSwitcher />
        <ToastProvider>{children}</ToastProvider>
        <FloatingVisitorCounter />
      </body>
    </html>
  );
}

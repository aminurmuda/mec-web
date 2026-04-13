import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import FloatingVisitorCounter from '@/components/FloatingVisitorCounter';
import { ToastProvider } from '@/components/Toast/ToastContext';
import Providers from './provider';

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

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-800 overflow-x-hidden lah`}
      >
        <ToastProvider>
          <Providers>{children}</Providers>
        </ToastProvider>
        <FloatingVisitorCounter />
      </body>
    </html>
  );
}

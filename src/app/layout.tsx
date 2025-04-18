// src/app/layout.tsx

import type { Metadata } from 'next';
import './globals.css';
import { Open_Sans } from 'next/font/google';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import SessionWrapper from '@/components/providers/SessionWrapper';

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '600', '700', '800'],
  variable: '--font-open-sans',
});

export const metadata: Metadata = {
  title: 'SW-EAS',
  description: 'Global standard for ethical advertising.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={openSans.variable}>
      <body className="h-screen grid grid-rows-[auto_1fr_auto] antialiased bg-white text-black">
        <SessionWrapper>
          {' '}
          {/* ✅ moved client context to client component */}
          <Header />
          <main>{children}</main>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}

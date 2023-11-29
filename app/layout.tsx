import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { notoSerif, publicSans, roboto } from '@/fonts/fonts';
import { SessionProvider } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/utils/authOptions';
import Navbar from '@/components/navbar/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ShareList',
  description:
    'Share the sounds of life with your family and friends. Use your spotify account to connect with others and show them what you have been listening to lately.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang='en'>
      <body
        className={`
          ${roboto.variable} 
          ${publicSans.variable} 
          ${notoSerif.variable} 
          ${inter.className}
        `}
      >
        <main className='to-99% m-0 flex min-h-screen flex-col bg-gradient-to-tr from-primary from-60% via-green-400 via-60% to-secondary font-publicSans text-light-850'>
          {children}
        </main>
      </body>
    </html>
  );
}

import { Roboto_Mono } from 'next/font/google';
import './globals.css';

import type { Metadata } from 'next';
import Providers from './providers/Providers';
const roboto = Roboto_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chat in Time',
  description: 'Chat Anywhere',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={roboto.className}>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter, Crimson_Text } from 'next/font/google';
import './globals.css';
import { defaultMetadata } from '@/lib/seo/metadata';
import { OrganizationJsonLd } from '@/components/seo/JsonLd';
import { Header, Footer } from '@/components/layout';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const crimsonText = Crimson_Text({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${crimsonText.variable}`}>
      <body className="min-h-screen flex flex-col">
        <OrganizationJsonLd />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

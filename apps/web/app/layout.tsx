import type { Metadata } from 'next';
import { Inter, Crimson_Text } from 'next/font/google';
import './globals.css';
import { defaultMetadata } from '@/lib/seo/metadata';
import { OrganizationJsonLd } from '@/components/seo/JsonLd';
import { Header, Footer, AnnouncementBanner } from '@/components/layout';
import { client } from '@/lib/sanity/client';
import { activeAnnouncementQuery } from '@/lib/sanity/queries';
import type { Announcement } from '@/lib/sanity/types';

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const announcement = await client.fetch<Announcement | null>(activeAnnouncementQuery);

  return (
    <html lang="en" className={`${inter.variable} ${crimsonText.variable}`}>
      <head>
        <link rel="alternate" type="application/rss+xml" title="CADP News & Articles" href="/feed.xml" />
      </head>
      <body className="min-h-screen flex flex-col">
        <OrganizationJsonLd />
        <AnnouncementBanner announcement={announcement} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

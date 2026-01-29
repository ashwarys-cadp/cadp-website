import { Metadata } from 'next';
import {
  Hero,
  ServicesOverview,
  FeaturedGuides,
  LatestArticles,
  UpcomingEvents,
  Newsletter,
  TrustSignals,
} from '@/components/sections';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Centre for Applied Data Protection',
  description:
    'CADP provides expert DPDP Act compliance training, advisory services, and research at KLE Law College, Bengaluru. Build your data protection capability today.',
  path: '/',
  keywords: [
    'DPDP Act compliance',
    'DPDP training',
    'data protection India',
    'DPDP advisory',
    'KLE Law College',
  ],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <FeaturedGuides />
      <LatestArticles />
      <UpcomingEvents />
      <TrustSignals />
      <Newsletter />
    </>
  );
}

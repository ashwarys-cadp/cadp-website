import { Metadata } from 'next';
import {
  Hero,
  ProgrammesOverview,
  FeaturedGuides,
  LatestArticles,
  UpcomingEvents,
  Newsletter,
  TrustSignals,
  AboutCentre,
} from '@/components/sections';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Centre for Applied Data Protection',
  description:
    'CADP provides expert DPDP Act compliance training, legal advisory, and research. Build your data protection capability today.',
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
      <AboutCentre />
      <LatestArticles />
      <FeaturedGuides />
      <UpcomingEvents />
      <ProgrammesOverview />
      <TrustSignals />
      <Newsletter />
    </>
  );
}

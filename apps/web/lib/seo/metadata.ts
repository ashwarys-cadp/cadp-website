import { Metadata } from 'next';

const SITE_NAME = 'CADP - Centre for Applied Data Protection';
const SITE_URL = 'https://cadp.in';
const DEFAULT_OG_IMAGE = '/og-default.jpg';

interface PageMetadataProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  keywords?: string[];
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  keywords,
  noIndex = false,
}: PageMetadataProps): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return {
    title: fullTitle,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors }),
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function generateArticleMetadata({
  title,
  description,
  path,
  image,
  publishedTime,
  modifiedTime,
  authors,
  keywords,
}: Omit<PageMetadataProps, 'type'> & { publishedTime: string }): Metadata {
  return generatePageMetadata({
    title,
    description,
    path,
    image,
    type: 'article',
    publishedTime,
    modifiedTime,
    authors,
    keywords,
  });
}

// Default metadata for the site
export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Centre for Applied Data Protection (CADP) at KLE Law College, Bengaluru - Expert DPDP Act compliance training, advisory services, and research publications.',
  keywords: [
    'DPDP Act',
    'DPDP compliance',
    'data protection India',
    'DPDP training',
    'data protection advisory',
    'digital personal data protection',
    'KLE Law College',
    'Bengaluru',
  ],
  authors: [{ name: 'CADP', url: SITE_URL }],
  creator: 'Centre for Applied Data Protection',
  publisher: 'Centre for Applied Data Protection',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

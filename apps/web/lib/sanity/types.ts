import type { PortableTextBlock } from '@portabletext/types';

export interface SanityImage {
  asset: {
    _ref: string;
    _type: string;
    url?: string;
  };
  alt?: string;
  caption?: string;
}

export interface SanityFile {
  asset: {
    _ref: string;
    _type: string;
    url?: string;
  };
}

export interface Author {
  _id: string;
  name: string;
  role?: string;
  bio?: string;
  image?: SanityImage;
  linkedIn?: string;
  email?: string;
}

export interface Post {
  _type?: 'post';
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  body?: PortableTextBlock[];
  category?: string;
  tags?: string[];
  publishedAt?: string;
  _updatedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  featuredImage?: SanityImage;
  author?: Author;
  parentGuide?: {
    _id: string;
    title: string;
    slug: { current: string };
  };
  relatedPosts?: Post[];
}

export interface WhitePaper {
  _type?: 'whitePaper';
  _id: string;
  title: string;
  slug: { current: string };
  abstract: string;
  topics?: string[];
  publishedAt?: string;
  _updatedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  featuredImage?: SanityImage;
  pdfFile?: SanityFile;
  authors?: Author[];
  relatedGuide?: {
    _id: string;
    title: string;
    slug: { current: string };
  };
}

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription: string;
  description?: PortableTextBlock[];
  icon?: string;
  features?: ServiceFeature[];
  ctaText?: string;
  seoTitle?: string;
  seoDescription?: string;
  order?: number;
  relatedGuide?: {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt?: string;
  };
  relatedArticles?: Post[];
}

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  image?: SanityImage;
  linkedIn?: string;
  email?: string;
  isAdvisoryBoard?: boolean;
  order?: number;
}

export interface Speaker {
  _id?: string;
  name: string;
  title?: string;
  organization?: string;
  bio?: string;
  headshot?: SanityImage;
  linkedIn?: string;
}

export interface EventSession {
  startTime?: string;
  endTime?: string;
  format?: string;
  title: string;
  description?: string;
  room?: string;
  speakers?: Speaker[];
}

export interface AgendaDay {
  label?: string;
  date?: string;
  sessions?: EventSession[];
}

export interface Sponsor {
  name: string;
  tier?: 'knowledge-partner' | 'associate' | 'exhibitor' | 'other';
  url?: string;
  blurb?: string;
  logo?: SanityImage;
}

export interface TicketTier {
  name?: string;
  price?: string;
  includes?: string;
}

export interface EventFaq {
  question?: string;
  answer?: string;
}

export interface EventVenue {
  name?: string;
  address?: string;
  mapUrl?: string;
  directions?: string;
}

export interface EventDownload {
  title?: string;
  url?: string;
}

export interface EventResource {
  title?: string;
  url?: string;
  fileUrl?: string;
}

export interface Event {
  _type?: 'event';
  _id: string;
  title: string;
  slug: { current: string };
  eventType?: 'webinar' | 'workshop' | 'conference';
  theme?: string;
  description: string;
  overview?: PortableTextBlock[];
  date: string;
  endDate?: string;
  location?: string;
  isOnline?: boolean;
  registerInterestUrl?: string;
  registrationUrl?: string;
  registrationDeadline?: string;
  registrationNote?: string;
  ticketTiers?: TicketTier[];
  isFeatured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  featuredImage?: SanityImage;
  speakers?: Speaker[];
  agenda?: AgendaDay[];
  sponsors?: Sponsor[];
  venue?: EventVenue;
  whoShouldAttend?: string[];
  organisedBy?: string;
  faqs?: EventFaq[];
  downloads?: EventDownload[];
  gallery?: SanityImage[];
  recordingsUrl?: string;
  resources?: EventResource[];
}

export interface NewsArticle {
  _type?: 'newsArticle';
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  body?: PortableTextBlock[];
  sourceUrl?: string;
  sourceName?: string;
  category: string;
  tags?: string[];
  publishedAt: string;
  _updatedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  featuredImage?: SanityImage;
}

export interface SiteSettings {
  siteName: string;
  siteDescription?: string;
  logo?: SanityImage;
  defaultOgImage?: SanityImage;
  contactEmail?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  phone?: string;
  socialLinks?: {
    linkedIn?: string;
    twitter?: string;
    youtube?: string;
  };
  footerText?: string;
  homepageFeaturedContent?: HomepageFeaturedContent;
}

export type HomepageFeaturedContent = Post | WhitePaper | Event | NewsArticle;

export interface HomepageHeroItem {
  id: string;
  kind: 'post' | 'whitePaper' | 'event' | 'newsArticle';
  title: string;
  summary: string;
  href: string;
  displayLabel: string;
  displayDate?: string;
  sortDate: string;
  sourceName?: string;
  authorName?: string;
  location?: string;
  isOnline?: boolean;
}

export interface Announcement {
  _id: string;
  message: string;
  link?: string;
  linkText?: string;
  publishedAt: string;
}

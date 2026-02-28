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

export interface Event {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  date: string;
  endDate?: string;
  location?: string;
  isOnline?: boolean;
  registrationUrl?: string;
  isFeatured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  featuredImage?: SanityImage;
  speakers?: TeamMember[];
}

export interface NewsArticle {
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
}

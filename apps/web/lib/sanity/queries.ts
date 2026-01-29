import { groq } from 'next-sanity';

// Guide (Pillar Content) Queries
export const allGuidesQuery = groq`
  *[_type == "guide"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    category,
    publishedAt,
    featuredImage {
      asset->,
      alt
    },
    author->{
      name,
      image
    }
  }
`;

export const guideBySlugQuery = groq`
  *[_type == "guide" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    category,
    publishedAt,
    _updatedAt,
    seoTitle,
    seoDescription,
    featuredImage {
      asset->,
      alt
    },
    author->{
      name,
      role,
      image,
      linkedIn
    },
    relatedGuides[]->{
      _id,
      title,
      slug,
      excerpt,
      featuredImage {
        asset->,
        alt
      }
    },
    relatedArticles[]->{
      _id,
      title,
      slug,
      excerpt,
      category,
      publishedAt,
      featuredImage {
        asset->,
        alt
      }
    }
  }
`;

export const featuredGuidesQuery = groq`
  *[_type == "guide"] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    category,
    publishedAt,
    featuredImage {
      asset->,
      alt
    }
  }
`;

// Blog Post Queries
export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    category,
    tags,
    publishedAt,
    featuredImage {
      asset->,
      alt
    },
    author->{
      name,
      image
    }
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    category,
    tags,
    publishedAt,
    _updatedAt,
    seoTitle,
    seoDescription,
    featuredImage {
      asset->,
      alt
    },
    author->{
      name,
      role,
      image,
      linkedIn
    },
    parentGuide->{
      _id,
      title,
      slug
    },
    relatedPosts[]->{
      _id,
      title,
      slug,
      excerpt,
      category,
      publishedAt,
      featuredImage {
        asset->,
        alt
      }
    }
  }
`;

export const latestPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    excerpt,
    category,
    publishedAt,
    featuredImage {
      asset->,
      alt
    },
    author->{
      name,
      image
    }
  }
`;

export const postsByCategoryQuery = groq`
  *[_type == "post" && category == $category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    category,
    publishedAt,
    featuredImage {
      asset->,
      alt
    },
    author->{
      name,
      image
    }
  }
`;

// White Paper Queries
export const allWhitePapersQuery = groq`
  *[_type == "whitePaper"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    abstract,
    topics,
    publishedAt,
    featuredImage {
      asset->,
      alt
    },
    pdfFile {
      asset->
    },
    authors[]->{
      name,
      image
    }
  }
`;

export const whitePaperBySlugQuery = groq`
  *[_type == "whitePaper" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    abstract,
    topics,
    publishedAt,
    _updatedAt,
    seoTitle,
    seoDescription,
    featuredImage {
      asset->,
      alt
    },
    pdfFile {
      asset->
    },
    authors[]->{
      name,
      role,
      image,
      linkedIn
    },
    relatedGuide->{
      _id,
      title,
      slug
    }
  }
`;

// Service Queries
export const allServicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    shortDescription,
    icon,
    ctaText,
    order
  }
`;

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    shortDescription,
    description,
    icon,
    features,
    ctaText,
    seoTitle,
    seoDescription,
    relatedGuide->{
      _id,
      title,
      slug,
      excerpt
    },
    relatedArticles[]->{
      _id,
      title,
      slug,
      excerpt,
      category,
      publishedAt
    }
  }
`;

// Team Member Queries
export const allTeamMembersQuery = groq`
  *[_type == "teamMember" && isAdvisoryBoard != true] | order(order asc) {
    _id,
    name,
    role,
    bio,
    image,
    linkedIn,
    email
  }
`;

export const advisoryBoardQuery = groq`
  *[_type == "teamMember" && isAdvisoryBoard == true] | order(order asc) {
    _id,
    name,
    role,
    bio,
    image,
    linkedIn
  }
`;

// Event Queries
export const allEventsQuery = groq`
  *[_type == "event"] | order(date desc) {
    _id,
    title,
    slug,
    description,
    date,
    endDate,
    location,
    isOnline,
    registrationUrl,
    isFeatured,
    featuredImage {
      asset->,
      alt
    }
  }
`;

export const upcomingEventsQuery = groq`
  *[_type == "event" && date >= now()] | order(date asc) {
    _id,
    title,
    slug,
    description,
    date,
    endDate,
    location,
    isOnline,
    registrationUrl,
    isFeatured,
    featuredImage {
      asset->,
      alt
    }
  }
`;

export const featuredEventQuery = groq`
  *[_type == "event" && isFeatured == true && date >= now()] | order(date asc) [0] {
    _id,
    title,
    slug,
    description,
    date,
    endDate,
    location,
    isOnline,
    registrationUrl,
    featuredImage {
      asset->,
      alt
    },
    speakers[]->{
      name,
      role,
      image
    }
  }
`;

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    date,
    endDate,
    location,
    isOnline,
    registrationUrl,
    seoTitle,
    seoDescription,
    featuredImage {
      asset->,
      alt
    },
    speakers[]->{
      name,
      role,
      bio,
      image,
      linkedIn
    }
  }
`;

// Site Settings Query
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    siteDescription,
    logo,
    defaultOgImage,
    contactEmail,
    address,
    phone,
    socialLinks,
    footerText
  }
`;

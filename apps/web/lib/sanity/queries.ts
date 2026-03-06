import { groq } from 'next-sanity';

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

// News Article Queries
export const allNewsQuery = groq`
  *[_type == "newsArticle"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    sourceUrl,
    sourceName,
    category,
    tags,
    publishedAt,
    featuredImage {
      asset->,
      alt
    }
  }
`;

export const newsBySlugQuery = groq`
  *[_type == "newsArticle" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    sourceUrl,
    sourceName,
    category,
    tags,
    publishedAt,
    _updatedAt,
    seoTitle,
    seoDescription,
    featuredImage {
      asset->,
      alt
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

// Official Texts — Annotations
export const annotationsByDocumentQuery = groq`
  *[_type == "annotation" && documentId == $documentId] {
    _id,
    term,
    explanation,
    category,
    documentId,
    targetSection
  }
`;

export const allAnnotationsQuery = groq`
  *[_type == "annotation"] {
    _id,
    term,
    explanation,
    category,
    documentId,
    targetSection
  }
`;

// Official Texts — Section Resources
export const resourcesByDocumentQuery = groq`
  *[_type == "sectionResource" && documentId == $documentId] {
    _id,
    title,
    description,
    url,
    type,
    documentId,
    targetSection,
    targetChapter
  }
`;

export const allResourcesQuery = groq`
  *[_type == "sectionResource"] {
    _id,
    title,
    description,
    url,
    type,
    documentId,
    targetSection,
    targetChapter
  }
`;

// Official Texts — Case References
export const casesByDocumentQuery = groq`
  *[_type == "caseReference" && documentId == $documentId] | order(dateDecided desc) {
    _id,
    caseName,
    citation,
    court,
    dateDecided,
    summary,
    url,
    documentId,
    targetSection,
    targetChapter
  }
`;

export const allCasesQuery = groq`
  *[_type == "caseReference"] | order(dateDecided desc) {
    _id,
    caseName,
    citation,
    court,
    dateDecided,
    summary,
    url,
    documentId,
    targetSection,
    targetChapter
  }
`;

// Announcement Banner Query
export const activeAnnouncementQuery = groq`
  *[_type == "announcement" && isActive == true] | order(publishedAt desc)[0] {
    _id,
    message,
    link,
    linkText,
    publishedAt
  }
`;

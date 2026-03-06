interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

// Organization Schema
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Centre for Applied Data Protection (CADP)",
    alternateName: "CADP",
    url: "https://cadp.in",
    logo: "https://cadp.in/logo.png",
    description: "Expert DPDP Act compliance training, legal advisory, and research.",
    parentOrganization: {
      "@type": "EducationalOrganization",
      name: "KLE Law College, Bengaluru",
      url: "https://www.klelawcollege.edu.in",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    sameAs: ["https://linkedin.com/company/cadp-in"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "support inquiries",
      availableLanguage: ["English", "Hindi"],
    },
  };

  return <JsonLd data={data} />;
}

// Article Schema
interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  authorName: string;
  publishedAt: string;
  modifiedAt?: string;
}

export function ArticleJsonLd({ title, description, url, imageUrl, authorName, publishedAt, modifiedAt }: ArticleJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    image: imageUrl,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Centre for Applied Data Protection (CADP)",
      logo: {
        "@type": "ImageObject",
        url: "https://cadp.in/logo.png",
      },
    },
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return <JsonLd data={data} />;
}

// Service Schema
interface ServiceJsonLdProps {
  name: string;
  description: string;
  url: string;
}

export function ServiceJsonLd({ name, description, url }: ServiceJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "Organization",
      name: "Centre for Applied Data Protection (CADP)",
      url: "https://cadp.in",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    serviceType: "Data Protection Compliance",
  };

  return <JsonLd data={data} />;
}

// Event Schema
interface EventJsonLdProps {
  name: string;
  description: string;
  url: string;
  startDate: string;
  endDate?: string;
  location?: string;
  isOnline?: boolean;
  imageUrl?: string;
}

export function EventJsonLd({ name, description, url, startDate, endDate, location, isOnline, imageUrl }: EventJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    description,
    url,
    startDate,
    endDate: endDate || startDate,
    image: imageUrl,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: isOnline ? "https://schema.org/OnlineEventAttendanceMode" : "https://schema.org/OfflineEventAttendanceMode",
    location: isOnline
      ? {
          "@type": "VirtualLocation",
          url,
        }
      : {
          "@type": "Place",
          name: location,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Bengaluru",
            addressCountry: "IN",
          },
        },
    organizer: {
      "@type": "Organization",
      name: "Centre for Applied Data Protection (CADP)",
      url: "https://cadp.in",
    },
  };

  return <JsonLd data={data} />;
}

// Legislation Schema
interface LegislationJsonLdProps {
  title: string;
  shortTitle: string;
  description?: string;
  type: 'act' | 'rules' | 'notification';
  gazetteNumber: string;
  dateEnacted: string;
  url: string;
  parentLegislationUrl?: string;
  parentLegislationName?: string;
}

const legislationTypeMap: Record<string, string> = {
  act: 'Act',
  rules: 'SubordinateLegislation',
  notification: 'SubordinateLegislation',
};

export function LegislationJsonLd({
  title,
  shortTitle,
  description,
  type,
  gazetteNumber,
  dateEnacted,
  url,
  parentLegislationUrl,
  parentLegislationName,
}: LegislationJsonLdProps) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Legislation",
    name: title,
    alternateName: shortTitle,
    ...(description && { description }),
    legislationIdentifier: gazetteNumber,
    legislationDate: dateEnacted,
    legislationType: legislationTypeMap[type] || 'Legislation',
    legislationJurisdiction: {
      "@type": "Country",
      name: "India",
    },
    inLanguage: "en",
    url,
    publisher: {
      "@type": "GovernmentOrganization",
      name: "Government of India",
    },
    about: {
      "@type": "Thing",
      name: "Digital Personal Data Protection",
    },
  };

  if (parentLegislationUrl && parentLegislationName) {
    data.isPartOf = {
      "@type": "Legislation",
      name: parentLegislationName,
      url: parentLegislationUrl,
    };
  }

  return <JsonLd data={data} />;
}

// WebApplication Schema (for interactive reference tools)
interface WebApplicationJsonLdProps {
  name: string;
  description: string;
  url: string;
}

export function WebApplicationJsonLd({ name, description, url }: WebApplicationJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url,
    applicationCategory: "ReferenceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    provider: {
      "@type": "EducationalOrganization",
      name: "Centre for Applied Data Protection (CADP)",
      url: "https://cadp.in",
    },
  };

  return <JsonLd data={data} />;
}

// CollectionPage Schema
interface CollectionPageJsonLdProps {
  name: string;
  description: string;
  url: string;
  items: { name: string; url: string }[];
}

export function CollectionPageJsonLd({ name, description, url, items }: CollectionPageJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    hasPart: items.map((item) => ({
      "@type": "Legislation",
      name: item.name,
      url: item.url,
    })),
    isPartOf: {
      "@type": "WebSite",
      name: "Centre for Applied Data Protection (CADP)",
      url: "https://cadp.in",
    },
  };

  return <JsonLd data={data} />;
}

// Breadcrumb Schema
interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://cadp.in${item.href}`,
    })),
  };

  return <JsonLd data={data} />;
}

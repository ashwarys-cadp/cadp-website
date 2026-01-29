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
    description: "Expert DPDP Act compliance training, legal advisory, and research publications at KLE Law College, Bengaluru.",
    parentOrganization: {
      "@type": "EducationalOrganization",
      name: "KLE Law College, Bengaluru",
      url: "https://klelawcollege.edu.in",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    sameAs: ["https://linkedin.com/company/cadp"],
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

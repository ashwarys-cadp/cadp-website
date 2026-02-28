export { cn } from './cn';

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function isUpcoming(date: string | Date): boolean {
  return new Date(date) >= new Date();
}

export function isPast(date: string | Date): boolean {
  return new Date(date) < new Date();
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    'dpdp-compliance': 'DPDP Compliance',
    training: 'Training',
    advisory: 'Advisory',
    insights: 'Industry Insights',
    'legal-updates': 'Legal Updates',
  };
  return labels[category] || category;
}

export function getNewsCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    'government-orders': 'Government Orders',
    'court-decisions': 'Court Decisions',
    'industry-news': 'Industry News',
    opinion: 'Opinion',
    'cadp-announcements': 'CADP Announcements',
  };
  return labels[category] || category;
}

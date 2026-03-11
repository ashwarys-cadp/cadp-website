import type { LegalDocument } from '@/data/official-texts/types';

export interface SearchResult {
  documentId: string;
  documentTitle: string;
  sectionId: string;
  sectionNumber: string;
  sectionTitle: string;
  sectionPrefix: string;
  snippet: string;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function buildSearchEntries(docs: LegalDocument[]) {
  const entries: {
    documentId: string;
    documentTitle: string;
    sectionId: string;
    sectionNumber: string;
    sectionTitle: string;
    sectionPrefix: string;
    plainText: string;
  }[] = [];

  for (const doc of docs) {
    for (const chapter of doc.chapters) {
      for (const section of chapter.sections) {
        entries.push({
          documentId: doc.id,
          documentTitle: doc.shortTitle,
          sectionId: section.id,
          sectionNumber: section.number,
          sectionTitle: section.title,
          sectionPrefix: doc.sectionPrefix ?? 'Section',
          plainText: stripHtml(section.text),
        });
      }
    }
    for (const schedule of doc.schedules) {
      entries.push({
        documentId: doc.id,
        documentTitle: doc.shortTitle,
        sectionId: schedule.id,
        sectionNumber: schedule.number,
        sectionTitle: schedule.title,
        sectionPrefix: 'Schedule',
        plainText: stripHtml(schedule.text),
      });
    }
  }

  return entries;
}

export function searchEntries(
  entries: ReturnType<typeof buildSearchEntries>,
  query: string,
  scopeDocumentId?: string
): SearchResult[] {
  if (!query.trim()) return [];

  const lowerQuery = query.toLowerCase();
  const words = lowerQuery.split(/\s+/).filter(Boolean);

  const results: SearchResult[] = [];

  for (const entry of entries) {
    if (scopeDocumentId && entry.documentId !== scopeDocumentId) continue;

    const lowerText = entry.plainText.toLowerCase();
    const lowerTitle = entry.sectionTitle.toLowerCase();

    const matches = words.every(
      (word) => lowerText.includes(word) || lowerTitle.includes(word)
    );

    if (!matches) continue;

    // Prefer the full phrase match for snippet context, fall back to first word
    let matchIndex = lowerText.indexOf(lowerQuery);
    if (matchIndex === -1) matchIndex = lowerText.indexOf(words[0]);
    const snippetStart = Math.max(0, matchIndex - 40);
    const snippetEnd = Math.min(entry.plainText.length, matchIndex + query.length + 120);
    const snippet =
      (snippetStart > 0 ? '...' : '') +
      entry.plainText.slice(snippetStart, snippetEnd) +
      (snippetEnd < entry.plainText.length ? '...' : '');

    results.push({
      documentId: entry.documentId,
      documentTitle: entry.documentTitle,
      sectionId: entry.sectionId,
      sectionNumber: entry.sectionNumber,
      sectionTitle: entry.sectionTitle,
      sectionPrefix: entry.sectionPrefix,
      snippet,
    });
  }

  return results;
}

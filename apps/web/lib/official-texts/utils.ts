import type { LegalDocument, TocItem } from '@/data/official-texts/types';

/**
 * Generate a table of contents structure from a LegalDocument.
 */
export function generateToc(doc: LegalDocument): TocItem[] {
  const items: TocItem[] = [];

  for (const chapter of doc.chapters) {
    const chapterItem: TocItem = {
      id: chapter.id,
      number: chapter.number,
      title: chapter.title,
      level: 'chapter',
      children: chapter.sections.map((section) => ({
        id: section.id,
        number: section.number,
        title: section.title,
        level: 'section' as const,
      })),
    };
    items.push(chapterItem);
  }

  for (const schedule of doc.schedules) {
    items.push({
      id: schedule.id,
      number: schedule.number,
      title: schedule.title,
      level: 'schedule',
    });
  }

  return items;
}

/**
 * Get all document IDs from local JSON files.
 */
export function getDocumentIds(): string[] {
  return ['dpdp-act-2023', 'dpdp-rules-2025', 'dpdp-notification-commencement-2025', 'dpdp-notification-dpb-2025'];
}

/**
 * Load a legal document by ID.
 */
export async function loadDocument(
  id: string
): Promise<LegalDocument | null> {
  try {
    const data = await import(`@/data/official-texts/${id}.json`);
    return data.default as LegalDocument;
  } catch {
    return null;
  }
}

/**
 * Load all legal documents.
 */
export async function loadAllDocuments(): Promise<LegalDocument[]> {
  const ids = getDocumentIds();
  const docs = await Promise.all(ids.map(loadDocument));
  return docs.filter((d): d is LegalDocument => d !== null);
}

/**
 * Count total sections in a document.
 */
export function countSections(doc: LegalDocument): number {
  return doc.chapters.reduce((acc, ch) => acc + ch.sections.length, 0);
}

/**
 * Format a section label from its number and the document's sectionPrefix.
 * e.g. ("7", "Section") → "Section 7", ("12", "Rule") → "Rule 12", ("1", "") → "1"
 */
export function formatSectionLabel(number: string, prefix?: string): string {
  return prefix ? `${prefix} ${number}` : number;
}

/**
 * Build a lookup map from section IDs to their display label,
 * using each document's sectionPrefix as the source of truth.
 */
export function buildSectionLabelMap(docs: LegalDocument[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const doc of docs) {
    const prefix = doc.sectionPrefix ?? '';
    for (const chapter of doc.chapters) {
      if (chapter.number) {
        map.set(chapter.id, `Chapter ${chapter.number}`);
      }
      for (const section of chapter.sections) {
        map.set(section.id, formatSectionLabel(section.number, prefix));
      }
    }
    for (const schedule of doc.schedules) {
      map.set(schedule.id, `Schedule ${schedule.number}`);
    }
  }
  return map;
}

import type {
  TermDefinition,
  Annotation,
  MergedTerm,
} from '@/data/official-texts/types';

/**
 * Merge definitions and annotations into a single list sorted by term length
 * descending (longer terms match first to avoid partial matches).
 */
export function mergeTerms(
  definitions: TermDefinition[],
  annotations: Annotation[]
): MergedTerm[] {
  const merged: MergedTerm[] = [];

  for (const def of definitions) {
    merged.push({
      term: def.term,
      kind: 'definition',
      data: def,
      targetSection: null,
    });
  }

  for (const ann of annotations) {
    merged.push({
      term: ann.term,
      kind: 'annotation',
      data: ann,
      targetSection: ann.targetSection,
    });
  }

  merged.sort((a, b) => b.term.length - a.term.length);

  return merged;
}

/**
 * Build a regex that matches any of the given terms on word boundaries,
 * case-insensitively. Returns null if no terms.
 */
export function buildTermRegex(terms: MergedTerm[]): RegExp | null {
  if (terms.length === 0) return null;

  const escaped = terms.map((t) =>
    t.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );
  return new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi');
}

/**
 * Find the first MergedTerm that matches a given text string (case-insensitive).
 */
export function findTermByText(
  text: string,
  terms: MergedTerm[]
): MergedTerm | undefined {
  const lower = text.toLowerCase();
  return terms.find((t) => t.term.toLowerCase() === lower);
}

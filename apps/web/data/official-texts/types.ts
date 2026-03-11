// apps/web/data/official-texts/types.ts

export interface Corrigendum {
  id: string;
  gazetteNumber: string;
  date: string;
  description: string;
  affectedSections: string[];
}

export interface SectionAmendment {
  corrigendumId: string;
  summary: string;
}

export interface LegalDocument {
  id: string;
  title: string;
  shortTitle: string;
  type: "act" | "rules" | "notification";
  gazetteNumber: string;
  dateEnacted: string;
  dateEffective: string;
  sectionPrefix?: string;
  preamble?: string;
  chapters: Chapter[];
  schedules: Schedule[];
  definitions: TermDefinition[];
  corrigenda: Corrigendum[];
}

export interface Chapter {
  id: string;
  number: string;
  title: string;
  sections: Section[];
}

export interface Section {
  id: string;
  number: string;
  title: string;
  text: string;
  effectiveDate?: string;
  tags: string[];
  amendments?: SectionAmendment[];
}

export interface Schedule {
  id: string;
  number: string;
  title: string;
  text: string;
  tags: string[];
  amendments?: SectionAmendment[];
}

export interface TermDefinition {
  term: string;
  clause: string;
  legalDefinition: string;
  plainLanguage?: string;
  sourceSection: string;
  relatedSections: string[];
}

// --- Sanity CMS types (fetched at build time) ---

export interface Annotation {
  _id: string;
  term: string;
  explanation: string;
  category: "concept" | "procedure" | "threshold" | "reference";
  documentId: string;
  targetSection: string | null;
}

export interface SectionResource {
  _id: string;
  title: string;
  description: string;
  url: string;
  type: "cadp-article" | "cadp-guide" | "external";
  documentId: string;
  targetSection: string | null;
  targetChapter: string | null;
}

export interface CaseReference {
  _id: string;
  caseName: string;
  citation: string;
  court: string;
  dateDecided: string;
  summary: string;
  url: string;
  documentId: string;
  targetSection: string | null;
  targetChapter: string | null;
}

// --- Side Panel discriminated union ---

export type PanelMode =
  | { type: "definition"; term: TermDefinition; sectionLabelMap: Map<string, string> }
  | { type: "annotation"; annotation: Annotation }
  | { type: "resources"; sectionId: string; sectionLabel: string; resources: SectionResource[] }
  | { type: "caselaw"; sectionId: string; sectionLabel: string; cases: CaseReference[] }
  | { type: "amendments"; sectionId: string; sectionLabel: string; amendments: SectionAmendment[]; corrigenda: Corrigendum[] };

// --- Merged term for detection ---

export interface MergedTerm {
  term: string;
  kind: "definition" | "annotation";
  data: TermDefinition | Annotation;
  targetSection: string | null;
}

// --- TOC item ---

export interface TocItem {
  id: string;
  number: string;
  title: string;
  level: "chapter" | "section" | "schedule";
  children?: TocItem[];
}

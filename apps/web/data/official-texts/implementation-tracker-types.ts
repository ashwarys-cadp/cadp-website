// apps/web/data/official-texts/implementation-tracker-types.ts

export interface ImplementationSource {
  document: string; // official-texts document ID, e.g. "dpdp-act-2023"
  sectionId: string; // e.g. "section-18"
  label: string; // e.g. "Section 18(1)"
}

export interface ImplementationDetail {
  instrument: string; // e.g. "G.S.R. 844(E)"
  date: string; // ISO date
  description: string;
  documentId?: string; // links to /resources/official-texts/{documentId}
}

export interface TrackerItem {
  id: string;
  requirement: string;
  source: ImplementationSource;
  responsibleBody: string;
  status: "notified" | "pending";
  implementation?: ImplementationDetail;
}

export type CategoryStatus = "complete" | "partial" | "pending";

export interface TrackerCategory {
  id: string;
  name: string;
  status: CategoryStatus;
  items: TrackerItem[];
}

export interface ImplementationTracker {
  lastUpdated: string; // ISO date
  categories: TrackerCategory[];
}

'use client';

import { useState, useCallback, useEffect } from 'react';
import type {
  LegalDocument,
  Annotation,
  SectionResource,
  CaseReference,
  PanelMode,
  MergedTerm,
} from '@/data/official-texts/types';
import { mergeTerms } from '@/lib/official-texts/terms';
import { generateToc } from '@/lib/official-texts/utils';
import { TableOfContents } from './TableOfContents';
import { SidePanel } from './SidePanel';
import { SectionHeading } from './SectionHeading';
import { SectionRenderer } from './SectionRenderer';
import { DocumentSearch } from './DocumentSearch';

interface DocumentReaderProps {
  document: LegalDocument;
  allDocuments: LegalDocument[];
  annotations: Annotation[];
  resources: SectionResource[];
  cases: CaseReference[];
}

export function DocumentReader({
  document: doc,
  allDocuments,
  annotations,
  resources,
  cases,
}: DocumentReaderProps) {
  const [panelMode, setPanelMode] = useState<PanelMode | null>(null);

  const toc = generateToc(doc);
  const allDefinitions = allDocuments.flatMap((d) => d.definitions);
  const mergedTerms = mergeTerms(allDefinitions, annotations);

  // Scroll to hash on mount
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    }
  }, []);

  function getResourcesForSection(sectionId: string, chapterId?: string): SectionResource[] {
    return resources.filter(
      (r) => r.targetSection === sectionId || r.targetChapter === chapterId
    );
  }

  function getCasesForSection(sectionId: string, chapterId?: string): CaseReference[] {
    return cases.filter(
      (c) => c.targetSection === sectionId || c.targetChapter === chapterId
    );
  }

  const handleTermClick = useCallback(
    (term: MergedTerm) => {
      if (term.kind === 'definition') {
        setPanelMode({
          type: 'definition',
          term: term.data as LegalDocument['definitions'][0],
        });
      } else {
        setPanelMode({
          type: 'annotation',
          annotation: term.data as Annotation,
        });
      }
    },
    []
  );

  function handleResourcesClick(sectionId: string, chapterId?: string) {
    const sectionResources = getResourcesForSection(sectionId, chapterId);
    setPanelMode({ type: 'resources', sectionId, resources: sectionResources });
  }

  function handleCasesClick(sectionId: string, chapterId?: string) {
    const sectionCases = getCasesForSection(sectionId, chapterId);
    setPanelMode({ type: 'caselaw', sectionId, cases: sectionCases });
  }

  function handleNavigateToSection(sectionId: string, documentId?: string) {
    if (documentId && documentId !== doc.id) {
      window.location.href = `/resources/official-texts/${documentId}#${sectionId}`;
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${sectionId}`);
    }
  }

  return (
    <div className="flex gap-0 xl:gap-8 relative">
      {/* Left: Sticky TOC */}
      <aside className="hidden xl:block w-[220px] shrink-0 border-r border-neutral-200">
        <div className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto pr-4">
          <TableOfContents items={toc} />
        </div>
      </aside>

      {/* Center: Main content */}
      <main className="flex-1 min-w-0">
        {/* Search */}
        <div className="sticky top-0 z-20 bg-white py-4 -mx-1 px-1 mb-6">
          <DocumentSearch
            currentDocument={doc}
            allDocuments={allDocuments}
            onNavigateToSection={handleNavigateToSection}
          />
        </div>

        {/* Preamble */}
        {doc.preamble && (
          <div className="mb-12 p-6 border-2 border-neutral-200 bg-neutral-50">
            <div className="text-xs uppercase tracking-[0.2em] text-accent-700 font-semibold mb-3">
              Preamble
            </div>
            <p className="font-serif text-neutral-700 leading-relaxed italic">
              {doc.preamble}
            </p>
          </div>
        )}

        {/* Chapters & Sections */}
        {doc.chapters.map((chapter) => (
          <div key={chapter.id} className="mb-16">
            {/* Chapter heading */}
            {chapter.number && (
              <div className="mb-8">
                <SectionHeading
                  id={chapter.id}
                  number={chapter.number}
                  title={chapter.title}
                  level="chapter"
                  resourceCount={
                    resources.filter((r) => r.targetChapter === chapter.id).length
                  }
                  caseCount={
                    cases.filter((c) => c.targetChapter === chapter.id).length
                  }
                  onResourcesClick={() =>
                    handleResourcesClick(chapter.id, chapter.id)
                  }
                  onCasesClick={() =>
                    handleCasesClick(chapter.id, chapter.id)
                  }
                />
              </div>
            )}

            {/* Sections */}
            {chapter.sections.map((section) => {
              const sectionResources = getResourcesForSection(
                section.id,
                chapter.id
              );
              const sectionCases = getCasesForSection(
                section.id,
                chapter.id
              );

              return (
                <div
                  key={section.id}
                  className="mb-10 pb-10 border-b border-neutral-200 last:border-b-0"
                >
                  <div className="mb-4">
                    <SectionHeading
                      id={section.id}
                      number={section.number}
                      title={section.title}
                      level="section"
                      resourceCount={sectionResources.length}
                      caseCount={sectionCases.length}
                      onResourcesClick={() =>
                        handleResourcesClick(section.id, chapter.id)
                      }
                      onCasesClick={() =>
                        handleCasesClick(section.id, chapter.id)
                      }
                    />
                  </div>
                  <SectionRenderer
                    html={section.text}
                    sectionId={section.id}
                    terms={mergedTerms}
                    onTermClick={handleTermClick}
                  />
                </div>
              );
            })}
          </div>
        ))}

        {/* Schedules */}
        {doc.schedules.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <div className="text-xs uppercase tracking-[0.25em] text-accent-700 font-semibold mb-2">
                  Appendices
                </div>
                <div className="h-px w-24 bg-accent-600 mx-auto"></div>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-neutral-950">
                Schedules
              </h2>
            </div>

            {doc.schedules.map((schedule) => {
              const scheduleResources = resources.filter(
                (r) => r.targetSection === schedule.id
              );
              const scheduleCases = cases.filter(
                (c) => c.targetSection === schedule.id
              );

              return (
                <div
                  key={schedule.id}
                  className="mb-10 pb-10 border-b border-neutral-200 last:border-b-0"
                >
                  <div className="mb-4">
                    <SectionHeading
                      id={schedule.id}
                      number={schedule.number}
                      title={schedule.title}
                      level="schedule"
                      resourceCount={scheduleResources.length}
                      caseCount={scheduleCases.length}
                      onResourcesClick={() =>
                        handleResourcesClick(schedule.id)
                      }
                      onCasesClick={() =>
                        handleCasesClick(schedule.id)
                      }
                    />
                  </div>
                  <SectionRenderer
                    html={schedule.text}
                    sectionId={schedule.id}
                    terms={mergedTerms}
                    onTermClick={handleTermClick}
                  />
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Right: Side Panel */}
      <SidePanel
        mode={panelMode}
        onClose={() => setPanelMode(null)}
        onNavigateToSection={handleNavigateToSection}
      />
    </div>
  );
}

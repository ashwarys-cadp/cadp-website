'use client';

import { useState } from 'react';
import { ChevronDown, Link2, Scale, ExternalLink, FileText, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SectionResource, CaseReference } from '@/data/official-texts/types';
import { formatDate } from '@/lib/utils';

const resourceTypeIcons: Record<string, typeof FileText> = {
  'cadp-article': FileText,
  'cadp-guide': BookOpen,
  external: ExternalLink,
};

const resourceTypeLabels: Record<string, string> = {
  'cadp-article': 'CADP Article',
  'cadp-guide': 'CADP Guide',
  external: 'External',
};

interface SectionReferencesProps {
  resources: SectionResource[];
  cases: CaseReference[];
  onResourcesClick: () => void;
  onCasesClick: () => void;
}

export function SectionReferences({
  resources,
  cases,
  onResourcesClick,
  onCasesClick,
}: SectionReferencesProps) {
  const [expanded, setExpanded] = useState(false);
  const total = resources.length + cases.length;
  if (total === 0) return null;

  return (
    <div className="mt-6 border-2 border-neutral-200 bg-neutral-50">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-neutral-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          {resources.length > 0 && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-800 font-serif">
              <Link2 className="w-3.5 h-3.5" strokeWidth={2} />
              {resources.length} Resource{resources.length > 1 ? 's' : ''}
            </span>
          )}
          {cases.length > 0 && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-800 font-serif">
              <Scale className="w-3.5 h-3.5" strokeWidth={2} />
              {cases.length} Case{cases.length > 1 ? 's' : ''}
            </span>
          )}
        </div>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-neutral-500 transition-transform',
            expanded && 'rotate-180'
          )}
        />
      </button>

      {expanded && (
        <div className="border-t border-neutral-200 px-4 py-4 space-y-3">
          {resources.map((resource) => {
            const Icon = resourceTypeIcons[resource.type];
            return (
              <div
                key={resource._id}
                className="flex items-start gap-3 group/ref cursor-pointer"
                onClick={onResourcesClick}
              >
                <div className="w-8 h-8 border border-accent-300 bg-accent-50 shrink-0 flex items-center justify-center mt-0.5">
                  <Icon className="w-4 h-4 text-accent-700" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-serif font-semibold text-neutral-900 group-hover/ref:text-primary-700 transition-colors leading-snug">
                    {resource.title}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[0.625rem] uppercase tracking-[0.15em] text-neutral-500 font-semibold">
                      {resourceTypeLabels[resource.type]}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {resources.length > 0 && cases.length > 0 && (
            <div className="h-px bg-neutral-200 my-2" />
          )}

          {cases.map((caseRef) => (
            <div
              key={caseRef._id}
              className="flex items-start gap-3 group/ref cursor-pointer"
              onClick={onCasesClick}
            >
              <div className="w-8 h-8 border border-primary-300 bg-primary-50 shrink-0 flex items-center justify-center mt-0.5">
                <Scale className="w-4 h-4 text-primary-700" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-serif font-semibold text-neutral-900 italic group-hover/ref:text-primary-700 transition-colors leading-snug">
                  {caseRef.caseName}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[0.625rem] uppercase tracking-[0.15em] text-primary-600 font-semibold">
                    {caseRef.court}
                  </span>
                  {caseRef.dateDecided && (
                    <span className="text-[0.625rem] text-neutral-500 font-serif">
                      {formatDate(caseRef.dateDecided)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

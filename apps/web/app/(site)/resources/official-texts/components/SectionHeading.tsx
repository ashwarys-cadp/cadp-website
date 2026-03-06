'use client';

import { Link2, Scale } from 'lucide-react';
import { CopyLinkButton } from './CopyLinkButton';

interface SectionHeadingProps {
  id: string;
  number: string;
  title: string;
  level: 'chapter' | 'section' | 'schedule';
  resourceCount: number;
  caseCount: number;
  onResourcesClick: () => void;
  onCasesClick: () => void;
}

export function SectionHeading({
  id,
  number,
  title,
  level,
  resourceCount,
  caseCount,
  onResourcesClick,
  onCasesClick,
}: SectionHeadingProps) {
  const isChapter = level === 'chapter';
  const isSchedule = level === 'schedule';
  const Tag = isChapter ? 'h2' : 'h3';
  const prefix = isChapter
    ? `Chapter ${number}`
    : isSchedule
      ? `${number} Schedule`
      : `Section ${number}`;

  return (
    <div id={id} className="group flex items-start gap-3 scroll-mt-8">
      <Tag
        className={
          isChapter
            ? 'text-2xl md:text-3xl font-serif font-bold text-neutral-950'
            : 'text-lg md:text-xl font-serif font-semibold text-neutral-900'
        }
      >
        <span className="text-primary-700">{prefix}.</span> {title}
      </Tag>

      <div className="flex items-center gap-1.5 mt-1 shrink-0">
        <CopyLinkButton sectionId={id} />

        {resourceCount > 0 && (
          <button
            onClick={onResourcesClick}
            className="flex items-center gap-1 px-2 py-1 text-accent-700 hover:text-accent-900 hover:bg-accent-50 transition-colors"
            title={`${resourceCount} related resource${resourceCount > 1 ? 's' : ''}`}
          >
            <Link2 className="w-3.5 h-3.5" strokeWidth={2} />
            <span className="text-xs font-semibold">{resourceCount}</span>
          </button>
        )}

        {caseCount > 0 && (
          <button
            onClick={onCasesClick}
            className="flex items-center gap-1 px-2 py-1 text-primary-600 hover:text-primary-800 hover:bg-primary-50 transition-colors"
            title={`${caseCount} related case${caseCount > 1 ? 's' : ''}`}
          >
            <Scale className="w-3.5 h-3.5" strokeWidth={2} />
            <span className="text-xs font-semibold">{caseCount}</span>
          </button>
        )}
      </div>
    </div>
  );
}

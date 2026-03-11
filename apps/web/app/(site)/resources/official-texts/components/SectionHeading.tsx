'use client';

import { CopyLinkButton } from './CopyLinkButton';

interface SectionHeadingProps {
  id: string;
  number: string;
  title: string;
  level: 'chapter' | 'section' | 'schedule';
  sectionPrefix?: string;
  resourceCount: number;
  caseCount: number;
  onResourcesClick: () => void;
  onCasesClick: () => void;
  amendmentCount: number;
  onAmendmentsClick: () => void;
}

export function SectionHeading({
  id,
  number,
  title,
  level,
  sectionPrefix,
  resourceCount,
  caseCount,
  onResourcesClick,
  onCasesClick,
  amendmentCount,
  onAmendmentsClick,
}: SectionHeadingProps) {
  const isChapter = level === 'chapter';
  const isSchedule = level === 'schedule';
  const Tag = isChapter ? 'h2' : 'h3';
  const prefix = isChapter
    ? `Chapter ${number}`
    : isSchedule
      ? `Schedule ${number}`
      : sectionPrefix ? `${sectionPrefix} ${number}` : number;

  return (
    <div id={id} className="scroll-mt-24">
      <div className="flex items-center gap-2 flex-wrap -ml-7">
        <CopyLinkButton sectionId={id} />

        <Tag
          className={
            isChapter
              ? 'text-2xl md:text-3xl font-serif font-bold text-neutral-950'
              : 'text-lg md:text-xl font-serif font-semibold text-neutral-900'
          }
        >
          <span className="text-primary-700">{prefix}.</span> {title}
        </Tag>

        {(resourceCount > 0 || caseCount > 0 || amendmentCount > 0) && (
          <span className="text-neutral-300 select-none">|</span>
        )}

        {resourceCount > 0 && (
          <button
            onClick={onResourcesClick}
            className="text-sm font-serif font-semibold text-accent-700 hover:text-accent-900 hover:underline transition-colors cursor-pointer"
          >
            [{resourceCount} Resource{resourceCount > 1 ? 's' : ''}]
          </button>
        )}

        {caseCount > 0 && (
          <button
            onClick={onCasesClick}
            className="text-sm font-serif font-semibold text-primary-600 hover:text-primary-800 hover:underline transition-colors cursor-pointer"
          >
            [{caseCount} Case{caseCount > 1 ? 's' : ''}]
          </button>
        )}

        {amendmentCount > 0 && (
          <button
            onClick={onAmendmentsClick}
            className="text-sm font-serif font-semibold text-neutral-500 hover:text-neutral-700 hover:underline transition-colors cursor-pointer"
          >
            [{amendmentCount} Correction{amendmentCount > 1 ? 's' : ''}]
          </button>
        )}
      </div>
    </div>
  );
}

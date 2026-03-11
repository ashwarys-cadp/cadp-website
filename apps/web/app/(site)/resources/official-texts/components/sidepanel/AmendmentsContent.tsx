import { History } from 'lucide-react';
import type { SectionAmendment, Corrigendum } from '@/data/official-texts/types';
import { formatDate } from '@/lib/utils';

export function AmendmentsContent({
  sectionLabel,
  amendments,
  corrigenda,
}: {
  sectionLabel: string;
  amendments: SectionAmendment[];
  corrigenda: Corrigendum[];
}) {
  const sorted = [...amendments].sort((a, b) => {
    const dateA = corrigenda.find((c) => c.id === a.corrigendumId)?.date ?? '';
    const dateB = corrigenda.find((c) => c.id === b.corrigendumId)?.date ?? '';
    return dateB.localeCompare(dateA);
  });

  return (
    <div>
      <div className="text-xs uppercase tracking-[0.2em] text-neutral-600 font-semibold mb-3">
        Corrections Applied
      </div>
      <div className="text-sm text-neutral-500 font-serif mb-6">
        {sectionLabel}
      </div>
      <div className="space-y-4">
        {sorted.map((amendment, index) => {
          const corrigendum = corrigenda.find(
            (c) => c.id === amendment.corrigendumId
          );
          return (
            <div
              key={`${amendment.corrigendumId}-${index}`}
              className="border-2 border-neutral-200 p-4 hover:border-neutral-400 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <History className="w-4 h-4 text-neutral-500" strokeWidth={1.5} />
                {corrigendum && (
                  <span className="text-[0.6875rem] uppercase tracking-[0.15em] text-neutral-500 font-semibold">
                    {corrigendum.gazetteNumber}
                  </span>
                )}
              </div>
              {corrigendum && (
                <div className="text-sm text-neutral-500 font-serif mb-2">
                  {formatDate(corrigendum.date)}
                </div>
              )}
              <p className="text-sm text-neutral-700 font-serif leading-relaxed italic">
                {amendment.summary}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

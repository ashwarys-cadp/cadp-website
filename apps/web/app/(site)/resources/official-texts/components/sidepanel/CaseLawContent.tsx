import { Scale, ExternalLink } from 'lucide-react';
import type { CaseReference } from '@/data/official-texts/types';
import { formatDate } from '@/lib/utils';

export function CaseLawContent({ sectionId, cases }: { sectionId: string; cases: CaseReference[] }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.2em] text-primary-600 font-semibold mb-3">Case Law</div>
      <div className="text-sm text-neutral-500 font-serif mb-6">
        {sectionId.replace('section-', 'Section ').replace('rule-', 'Rule ').replace('chapter-', 'Chapter ')}
      </div>
      <div className="space-y-4">
        {cases.map((caseRef) => (
          <div key={caseRef._id} className="border-2 border-neutral-200 p-4 hover:border-primary-600 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Scale className="w-4 h-4 text-primary-600" strokeWidth={1.5} />
              <span className="text-[0.6875rem] uppercase tracking-[0.15em] text-primary-600 font-semibold">
                {caseRef.court}
              </span>
            </div>
            <h4 className="font-serif font-semibold text-neutral-950 mb-1 italic">{caseRef.caseName}</h4>
            {caseRef.citation && <div className="text-sm text-neutral-500 font-serif mb-1">{caseRef.citation}</div>}
            {caseRef.dateDecided && <div className="text-sm text-neutral-500 font-serif mb-3">{formatDate(caseRef.dateDecided)}</div>}
            <p className="text-sm text-neutral-600 font-serif leading-relaxed mb-3">{caseRef.summary}</p>
            {caseRef.url && (
              <a
                href={caseRef.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-700 hover:text-primary-900 font-semibold font-serif inline-flex items-center gap-1"
              >
                View judgment <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

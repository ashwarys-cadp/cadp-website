import type { TermDefinition } from '@/data/official-texts/types';
import { formatSectionId } from '@/lib/official-texts/utils';

interface DefinitionContentProps {
  term: TermDefinition;
  onNavigateToSection: (sectionId: string, documentId?: string) => void;
}

export function DefinitionContent({ term, onNavigateToSection }: DefinitionContentProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div className="text-xs uppercase tracking-[0.2em] text-accent-700 font-semibold">
          Defined Term
        </div>
        {term.sourceSection.startsWith('section-') && (
          <span className="text-[0.625rem] uppercase tracking-[0.15em] font-semibold px-1.5 py-0.5 border border-primary-300 text-primary-700 bg-primary-50">
            DPDP Act 2023
          </span>
        )}
        {term.sourceSection.startsWith('rule-') && (
          <span className="text-[0.625rem] uppercase tracking-[0.15em] font-semibold px-1.5 py-0.5 border border-accent-300 text-accent-700 bg-accent-50">
            DPDP Rules 2025
          </span>
        )}
      </div>
      <h3 className="text-xl font-serif font-semibold text-neutral-950 mb-6">{term.term}</h3>

      <div className="mb-6">
        <div className="text-xs uppercase tracking-[0.15em] text-neutral-500 font-semibold mb-2">Legal Definition</div>
        <blockquote className="text-neutral-700 font-serif leading-relaxed border-l-2 border-accent-600 pl-4 italic">
          &ldquo;{term.legalDefinition}&rdquo;
        </blockquote>
        <div className="text-sm text-neutral-500 font-serif mt-2">
          &mdash; {formatSectionId(term.sourceSection)}({term.clause})
        </div>
      </div>

      {term.plainLanguage && (
        <div className="mb-6">
          <div className="text-xs uppercase tracking-[0.15em] text-neutral-500 font-semibold mb-2">Plain Language</div>
          <p className="text-neutral-700 font-serif leading-relaxed">{term.plainLanguage}</p>
        </div>
      )}

      {term.relatedSections.length > 0 && (
        <div>
          <div className="h-px bg-neutral-200 my-6"></div>
          <div className="text-xs uppercase tracking-[0.15em] text-neutral-500 font-semibold mb-3">Appears in</div>
          <ul className="space-y-1">
            {term.relatedSections.map((sectionId) => (
              <li key={sectionId}>
                <button
                  onClick={() => {
                    const docId = sectionId.startsWith('rule-')
                      ? 'dpdp-rules-2025'
                      : 'dpdp-act-2023';
                    onNavigateToSection(sectionId, docId);
                  }}
                  className="text-primary-700 hover:text-primary-900 font-serif text-sm hover:underline transition-colors"
                >
                  {formatSectionId(sectionId)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

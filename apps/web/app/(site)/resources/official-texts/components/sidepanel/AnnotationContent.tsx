import type { Annotation } from '@/data/official-texts/types';

const categoryLabels: Record<string, string> = {
  concept: 'Concept',
  procedure: 'Procedure',
  threshold: 'Threshold',
  reference: 'Reference',
};

export function AnnotationContent({ annotation }: { annotation: Annotation }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className="text-xs uppercase tracking-[0.2em] text-primary-600 font-semibold">Annotation</div>
        <span className="text-[0.6875rem] uppercase tracking-[0.15em] text-neutral-600 font-semibold bg-neutral-100 px-2 py-0.5 border border-neutral-300">
          {categoryLabels[annotation.category] || annotation.category}
        </span>
      </div>
      <h3 className="text-xl font-serif font-semibold text-neutral-950 mb-6">{annotation.term}</h3>
      <div>
        <div className="text-xs uppercase tracking-[0.15em] text-neutral-500 font-semibold mb-2">Explanation</div>
        <p className="text-neutral-700 font-serif leading-relaxed">{annotation.explanation}</p>
      </div>
    </div>
  );
}

import { FileText, BookOpen, ExternalLink } from 'lucide-react';
import type { SectionResource } from '@/data/official-texts/types';

const typeIcons = {
  'cadp-article': FileText,
  'cadp-guide': BookOpen,
  external: ExternalLink,
};

const typeLabels = {
  'cadp-article': 'CADP Article',
  'cadp-guide': 'CADP Guide',
  external: 'External',
};

export function ResourcesContent({ sectionLabel, resources }: { sectionLabel: string; resources: SectionResource[] }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.2em] text-accent-700 font-semibold mb-3">Related Resources</div>
      <div className="text-sm text-neutral-500 font-serif mb-6">
        {sectionLabel}
      </div>
      <div className="space-y-4">
        {resources.map((resource) => {
          const Icon = typeIcons[resource.type];
          return (
            <div key={resource._id} className="border-2 border-neutral-200 p-4 hover:border-accent-600 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-neutral-500" strokeWidth={1.5} />
                <span className="text-[0.6875rem] uppercase tracking-[0.15em] text-neutral-500 font-semibold">
                  {typeLabels[resource.type]}
                </span>
              </div>
              <h4 className="font-serif font-semibold text-neutral-950 mb-1">{resource.title}</h4>
              {resource.description && (
                <p className="text-sm text-neutral-600 font-serif leading-relaxed mb-3">{resource.description}</p>
              )}
              <a
                href={resource.url}
                target={resource.type === 'external' ? '_blank' : undefined}
                rel={resource.type === 'external' ? 'noopener noreferrer' : undefined}
                className="text-sm text-primary-700 hover:text-primary-900 font-semibold font-serif inline-flex items-center gap-1"
              >
                Open resource <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

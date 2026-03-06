'use client';

import { cn } from '@/lib/utils';

interface DefinedTermProps {
  children: React.ReactNode;
  kind: 'definition' | 'annotation';
  onClick: () => void;
}

export function DefinedTerm({ children, kind, onClick }: DefinedTermProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'cursor-pointer border-b border-dotted transition-colors',
        kind === 'definition'
          ? 'border-accent-600 hover:bg-accent-50'
          : 'border-primary-400 hover:bg-primary-50'
      )}
    >
      {children}
    </button>
  );
}

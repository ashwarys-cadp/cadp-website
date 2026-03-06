'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PanelMode } from '@/data/official-texts/types';
import { DefinitionContent } from './sidepanel/DefinitionContent';
import { AnnotationContent } from './sidepanel/AnnotationContent';
import { ResourcesContent } from './sidepanel/ResourcesContent';
import { CaseLawContent } from './sidepanel/CaseLawContent';

interface SidePanelProps {
  mode: PanelMode | null;
  onClose: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

function PanelContent({
  mode,
  onNavigateToSection,
}: {
  mode: PanelMode;
  onNavigateToSection: (sectionId: string) => void;
}) {
  switch (mode.type) {
    case 'definition':
      return <DefinitionContent term={mode.term} onNavigateToSection={onNavigateToSection} />;
    case 'annotation':
      return <AnnotationContent annotation={mode.annotation} />;
    case 'resources':
      return <ResourcesContent sectionId={mode.sectionId} resources={mode.resources} />;
    case 'caselaw':
      return <CaseLawContent sectionId={mode.sectionId} cases={mode.cases} />;
    default:
      return null;
  }
}

export function SidePanel({ mode, onClose, onNavigateToSection }: SidePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (mode) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [mode, onClose]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (mode) {
      const timer = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);
      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [mode, onClose]);

  return (
    <div
      ref={panelRef}
      className={cn(
        'fixed top-0 right-0 h-full w-full sm:w-[360px] bg-white border-l-2 border-neutral-300 shadow-xl z-40',
        'transform transition-transform duration-300 ease-in-out',
        'overflow-y-auto',
        mode ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      {mode && (
        <>
          <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-end z-10">
            <button
              onClick={onClose}
              className="w-8 h-8 border-2 border-neutral-300 hover:border-neutral-500 flex items-center justify-center transition-colors"
              aria-label="Close panel"
            >
              <X className="w-4 h-4 text-neutral-600" />
            </button>
          </div>
          <div className="px-6 py-6">
            <PanelContent mode={mode} onNavigateToSection={onNavigateToSection} />
          </div>
        </>
      )}
    </div>
  );
}

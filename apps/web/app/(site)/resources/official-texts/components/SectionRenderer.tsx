'use client';

import { useRef, useEffect, useCallback } from 'react';
import type { MergedTerm } from '@/data/official-texts/types';
import { buildTermRegex, findTermByText } from '@/lib/official-texts/terms';

interface SectionRendererProps {
  html: string;
  sectionId: string;
  terms: MergedTerm[];
  onTermClick: (term: MergedTerm) => void;
}

export function SectionRenderer({
  html,
  sectionId,
  terms,
  onTermClick,
}: SectionRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const matchedTermsRef = useRef<Set<string>>(new Set());

  const processTextNode = useCallback(
    (node: Text, regex: RegExp) => {
      const text = node.textContent;
      if (!text) return;

      const parts: (string | { match: string; term: MergedTerm })[] = [];
      let lastIndex = 0;

      regex.lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = regex.exec(text)) !== null) {
        const matchedText = match[0];
        const term = findTermByText(matchedText, terms);
        if (!term) continue;

        const termKey = term.term.toLowerCase();
        if (matchedTermsRef.current.has(termKey)) continue;

        if (term.targetSection && term.targetSection !== sectionId) continue;

        matchedTermsRef.current.add(termKey);

        if (match.index > lastIndex) {
          parts.push(text.slice(lastIndex, match.index));
        }
        parts.push({ match: matchedText, term });
        lastIndex = regex.lastIndex;
      }

      if (parts.length === 0) return;
      if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
      }

      const fragment = document.createDocumentFragment();
      for (const part of parts) {
        if (typeof part === 'string') {
          fragment.appendChild(document.createTextNode(part));
        } else {
          const span = document.createElement('span');
          span.textContent = part.match;
          span.className =
            part.term.kind === 'definition'
              ? 'cursor-pointer border-b border-dotted border-accent-600 hover:bg-accent-50 transition-colors'
              : 'cursor-pointer border-b border-dotted border-primary-400 hover:bg-primary-50 transition-colors';
          const termData = part.term;
          span.addEventListener('click', () => onTermClick(termData));
          fragment.appendChild(span);
        }
      }

      node.parentNode?.replaceChild(fragment, node);
    },
    [terms, sectionId, onTermClick]
  );

  useEffect(() => {
    if (!containerRef.current || terms.length === 0) return;

    const regex = buildTermRegex(terms);
    if (!regex) return;

    matchedTermsRef.current = new Set();

    const walker = document.createTreeWalker(
      containerRef.current,
      NodeFilter.SHOW_TEXT,
      null
    );

    const textNodes: Text[] = [];
    let node: Text | null;
    while ((node = walker.nextNode() as Text | null)) {
      textNodes.push(node);
    }

    for (const textNode of textNodes) {
      processTextNode(textNode, new RegExp(regex.source, regex.flags));
    }
  }, [html, terms, processTextNode]);

  return (
    <div
      ref={containerRef}
      className="prose-legal font-serif text-neutral-800 leading-relaxed"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

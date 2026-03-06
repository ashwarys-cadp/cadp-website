'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LegalDocument } from '@/data/official-texts/types';
import {
  buildSearchEntries,
  searchEntries,
  type SearchResult,
} from '@/lib/official-texts/search';

interface DocumentSearchProps {
  currentDocument: LegalDocument;
  allDocuments: LegalDocument[];
  onNavigateToSection: (sectionId: string) => void;
}

export function DocumentSearch({
  currentDocument,
  allDocuments,
  onNavigateToSection,
}: DocumentSearchProps) {
  const [query, setQuery] = useState('');
  const [isCrossCorpus, setIsCrossCorpus] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const entries = useMemo(
    () => buildSearchEntries(isCrossCorpus ? allDocuments : [currentDocument]),
    [isCrossCorpus, allDocuments, currentDocument]
  );

  const results = useMemo(
    () =>
      searchEntries(
        entries,
        query,
        isCrossCorpus ? undefined : currentDocument.id
      ),
    [entries, query, isCrossCorpus, currentDocument.id]
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(e.target as Node) &&
        e.target !== inputRef.current
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleSelect(result: SearchResult) {
    onNavigateToSection(result.sectionId);
    setIsOpen(false);
    setQuery('');
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
      inputRef.current?.blur();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleSelect(results[selectedIndex]);
    }
  }

  function highlightSnippet(snippet: string) {
    if (!query.trim()) return snippet;
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    const regex = new RegExp(
      `(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
      'gi'
    );
    return snippet.replace(regex, '<mark class="bg-accent-200 px-0.5">$1</mark>');
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setSelectedIndex(0);
            }}
            onFocus={() => query && setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search this document..."
            className="w-full pl-10 pr-8 py-2.5 border-2 border-neutral-300 bg-white font-serif text-sm focus:border-primary-600 focus:outline-none transition-colors"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          onClick={() => setIsCrossCorpus((v) => !v)}
          className={cn(
            'flex items-center gap-1.5 px-3 py-2.5 border-2 text-sm font-semibold font-serif transition-colors shrink-0',
            isCrossCorpus
              ? 'border-primary-600 bg-primary-50 text-primary-700'
              : 'border-neutral-300 text-neutral-500 hover:border-neutral-400'
          )}
          title={isCrossCorpus ? 'Searching all documents' : 'Search all documents'}
        >
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">All</span>
        </button>
      </div>

      {isOpen && query && results.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-neutral-300 shadow-lg z-30 max-h-[400px] overflow-y-auto"
        >
          {results.slice(0, 20).map((result, index) => (
            <button
              key={`${result.documentId}-${result.sectionId}`}
              onClick={() => handleSelect(result)}
              className={cn(
                'w-full text-left px-4 py-3 border-b border-neutral-100 hover:bg-neutral-50 transition-colors',
                index === selectedIndex && 'bg-primary-50'
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-primary-700 font-serif">
                  {result.sectionId.includes('section')
                    ? `Section ${result.sectionNumber}`
                    : result.sectionId.includes('rule')
                      ? `Rule ${result.sectionNumber}`
                      : `Schedule ${result.sectionNumber}`}
                </span>
                <span className="text-sm text-neutral-500 font-serif">
                  {result.sectionTitle}
                </span>
                {isCrossCorpus && (
                  <span className="ml-auto text-[0.6875rem] uppercase tracking-[0.15em] text-neutral-500 font-semibold bg-neutral-100 px-2 py-0.5 border border-neutral-200">
                    {result.documentTitle}
                  </span>
                )}
              </div>
              <p
                className="text-sm text-neutral-600 font-serif line-clamp-2"
                dangerouslySetInnerHTML={{
                  __html: highlightSnippet(result.snippet),
                }}
              />
            </button>
          ))}
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-neutral-300 shadow-lg z-30 p-6 text-center">
          <p className="text-neutral-500 font-serif text-sm">
            No results found for &ldquo;{query}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}

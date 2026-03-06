'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TocItem } from '@/data/official-texts/types';

interface TableOfContentsProps {
  items: TocItem[];
  documentTitle?: string;
}

export function TableOfContents({ items, documentTitle }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [showTitle, setShowTitle] = useState(false);
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    () => new Set(items.map((i) => i.id))
  );

  useEffect(() => {
    function handleScroll() {
      setShowTitle(window.scrollY > 100);
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionElements: Element[] = [];
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) sectionElements.push(el);
      if (item.children) {
        for (const child of item.children) {
          const childEl = document.getElementById(child.id);
          if (childEl) sectionElements.push(childEl);
        }
      }
    }

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );

    for (const el of sectionElements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  function toggleChapter(chapterId: string) {
    setExpandedChapters((prev) => {
      const next = new Set(prev);
      if (next.has(chapterId)) {
        next.delete(chapterId);
      } else {
        next.add(chapterId);
      }
      return next;
    });
  }

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${id}`);
    }
  }

  return (
    <nav className="text-sm" aria-label="Table of contents">
      {documentTitle && showTitle && (
        <div className="text-sm font-serif font-bold text-neutral-900 mb-3 leading-snug">
          {documentTitle}
        </div>
      )}
      <div className="text-xs uppercase tracking-[0.2em] text-accent-700 font-semibold mb-4">
        Contents
      </div>
      <ul className="space-y-1">
        {items.map((item) => {
          const isExpanded = expandedChapters.has(item.id);
          const hasChildren = item.children && item.children.length > 0;

          return (
            <li key={item.id}>
              <div className="flex items-center">
                {hasChildren && (
                  <button
                    onClick={() => toggleChapter(item.id)}
                    className="w-5 h-5 flex items-center justify-center mr-1 text-neutral-400 hover:text-neutral-700"
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                  >
                    <ChevronDown
                      className={cn(
                        'w-3.5 h-3.5 transition-transform',
                        !isExpanded && '-rotate-90'
                      )}
                    />
                  </button>
                )}
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    'text-left py-1.5 font-serif transition-colors flex-1 truncate',
                    item.level === 'chapter'
                      ? 'font-semibold text-neutral-800'
                      : 'text-neutral-600',
                    activeId === item.id && 'text-primary-700 font-semibold',
                    !hasChildren && 'ml-6'
                  )}
                  title={
                    item.number
                      ? `${item.level === 'schedule' ? 'Schedule' : item.level === 'chapter' ? 'Chapter' : ''} ${item.number}: ${item.title}`
                      : item.title
                  }
                >
                  {item.number && (
                    <span className="text-neutral-400 mr-1.5">
                      {item.level === 'schedule'
                        ? `Sch ${item.number}`
                        : item.level === 'chapter'
                          ? `Ch ${item.number}`
                          : `${item.number}.`}
                    </span>
                  )}
                  {item.title}
                </button>
              </div>

              {hasChildren && isExpanded && (
                <ul className="ml-6 space-y-0.5 mt-0.5">
                  {item.children!.map((child) => (
                    <li key={child.id}>
                      <button
                        onClick={() => scrollToSection(child.id)}
                        className={cn(
                          'text-left py-1 font-serif text-neutral-500 hover:text-neutral-800 transition-colors truncate w-full',
                          activeId === child.id && 'text-primary-700 font-semibold'
                        )}
                        title={`${child.number}. ${child.title}`}
                      >
                        <span className="text-neutral-400 mr-1.5">{child.number}.</span>
                        {child.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

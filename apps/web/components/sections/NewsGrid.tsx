'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn, getNewsCategoryLabel, formatDateShort } from '@/lib/utils';
import type { NewsArticle } from '@/lib/sanity';

const ITEMS_PER_PAGE = 10;

const categories = [
  { value: 'all', label: 'All' },
  { value: 'government-orders', label: 'Government Orders' },
  { value: 'court-decisions', label: 'Court Decisions' },
  { value: 'industry-news', label: 'Industry News' },
  { value: 'opinion', label: 'Opinion' },
  { value: 'cadp-announcements', label: 'CADP Announcements' },
];

const categoryAccentColor: Record<string, string> = {
  'government-orders': 'border-l-primary-800',
  'court-decisions': 'border-l-accent-700',
  'industry-news': 'border-l-neutral-600',
  opinion: 'border-l-primary-600',
  'cadp-announcements': 'border-l-accent-600',
};

interface NewsGridProps {
  news: NewsArticle[];
}

export function NewsGrid({ news }: NewsGridProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filtered =
    activeCategory === 'all'
      ? news
      : news.filter((item) => item.category === activeCategory);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function handleCategoryChange(category: string) {
    setActiveCategory(category);
    setVisibleCount(ITEMS_PER_PAGE);
  }

  return (
    <>
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.value;
          const count =
            cat.value === 'all'
              ? news.length
              : news.filter((n) => n.category === cat.value).length;

          return (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={cn(
                'px-4 py-2 text-[0.8125rem] font-serif font-medium border-2 transition-all',
                isActive
                  ? 'bg-primary-950 text-white border-primary-950'
                  : 'bg-white text-neutral-700 border-neutral-300 hover:border-primary-700 hover:text-primary-900'
              )}
            >
              {cat.label}
              <span
                className={cn(
                  'ml-2 text-[0.6875rem]',
                  isActive ? 'text-primary-200' : 'text-neutral-400'
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* News cards grid */}
      {visible.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-neutral-500 font-serif text-lg">
            No news articles in this category yet.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {visible.map((item) => (
            <Link
              key={item._id}
              href={`/news/${item.slug.current}/`}
              className="group block"
            >
              <article
                className={cn(
                  'bg-white border-2 border-neutral-200 border-l-4 p-6',
                  'hover:border-neutral-300 hover:shadow-md transition-all duration-200',
                  categoryAccentColor[item.category] || 'border-l-primary-600'
                )}
              >
                {/* Meta line: category + date */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[0.6875rem] uppercase tracking-[0.15em] font-semibold text-primary-800 bg-primary-50 px-2 py-0.5 border border-primary-200">
                    {getNewsCategoryLabel(item.category)}
                  </span>
                  <span className="text-xs text-neutral-500 font-serif">
                    {formatDateShort(item.publishedAt)}
                  </span>
                </div>

                {/* Headline */}
                <h2 className="text-lg font-serif font-semibold text-neutral-950 leading-snug mb-2 group-hover:text-primary-900 transition-colors line-clamp-2">
                  {item.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-neutral-600 font-serif leading-relaxed line-clamp-2 mb-4">
                  {item.excerpt}
                </p>

                {/* Footer: source + read more */}
                <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                  {item.sourceName ? (
                    <span className="text-xs text-neutral-400 font-serif italic">
                      via {item.sourceName}
                    </span>
                  ) : (
                    <span className="text-xs text-accent-600 font-serif font-semibold">
                      CADP Original
                    </span>
                  )}
                  <span className="text-sm font-semibold text-primary-700 group-hover:text-primary-900 transition-colors font-serif inline-flex items-center gap-1.5">
                    Read
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      &rarr;
                    </span>
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="text-center mt-10">
          <button
            onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
            className="px-8 py-3 text-[0.9375rem] font-serif font-semibold text-primary-900 border-2 border-primary-950 hover:bg-primary-950 hover:text-white transition-all"
          >
            Load More News
          </button>
        </div>
      )}
    </>
  );
}

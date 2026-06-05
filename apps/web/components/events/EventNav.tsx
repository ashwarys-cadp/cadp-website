'use client';

import { useEffect, useState } from 'react';

export interface EventNavItem {
  id: string;
  label: string;
}

export function EventNav({ items }: { items: EventNavItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry nearest the top of the viewport that is intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <div className="sticky top-24 z-40 bg-white/95 backdrop-blur-sm border-y border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-center items-center gap-7 overflow-x-auto no-scrollbar -mb-px">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative shrink-0 py-4 text-[0.6875rem] uppercase tracking-[0.18em] font-semibold font-serif transition-colors ${
                  isActive
                    ? 'text-primary-900'
                    : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 right-0 bottom-0 h-0.5 transition-colors ${
                    isActive ? 'bg-accent-600' : 'bg-transparent'
                  }`}
                />
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

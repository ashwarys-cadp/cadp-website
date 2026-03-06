'use client';

import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import type { Announcement } from '@/lib/sanity/types';

const STORAGE_KEY = 'announcement-dismissed-at';

export function AnnouncementBanner({ announcement }: { announcement: Announcement | null }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!announcement) return;

    const dismissedAt = localStorage.getItem(STORAGE_KEY);
    if (!dismissedAt || dismissedAt < announcement.publishedAt) {
      setVisible(true);
    }
  }, [announcement]);

  if (!announcement || (!visible && !dismissed)) return null;

  function handleDismiss() {
    setDismissed(true);
    const el = bannerRef.current;
    if (el) {
      el.style.maxHeight = el.scrollHeight + 'px';
      requestAnimationFrame(() => {
        el.style.maxHeight = '0px';
        el.style.opacity = '0';
      });
      el.addEventListener('transitionend', () => {
        localStorage.setItem(STORAGE_KEY, announcement!.publishedAt);
        setVisible(false);
        setDismissed(false);
      }, { once: true });
    } else {
      localStorage.setItem(STORAGE_KEY, announcement!.publishedAt);
      setVisible(false);
    }
  }

  return (
    <div
      ref={bannerRef}
      className="overflow-hidden transition-all duration-500 ease-in-out"
      style={{ maxHeight: visible && !dismissed ? 80 : 0 }}
    >
      <div className="relative bg-primary-950 border-b border-accent-600/40">
        {/* Thin gold accent line */}
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent-400 to-transparent" />

        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between gap-6 py-2.5">
            {/* Ornament + Message */}
            <p className="flex-1 text-center text-sm text-neutral-200 font-serif tracking-wide">
              <span className="text-accent-400 text-xs mr-2.5 relative -top-px">&#9670;</span>
              {announcement.message}
              {announcement.link && (
                <a
                  href={announcement.link}
                  className="
                    inline-flex items-center ml-3
                    text-accent-300 font-semibold
                    border-b border-accent-500/50
                    hover:text-white hover:border-white/60
                    transition-colors duration-200
                  "
                >
                  {announcement.linkText || 'Learn more'}
                  <svg className="ml-1 w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                </a>
              )}
              <span className="text-accent-400 text-xs ml-2.5 relative -top-px">&#9670;</span>
            </p>

            {/* Dismiss */}
            <button
              onClick={handleDismiss}
              className="
                shrink-0 p-1
                text-neutral-400
                hover:text-white hover:bg-white/10
                rounded transition-colors duration-200
              "
              aria-label="Dismiss announcement"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

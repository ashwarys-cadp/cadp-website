'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Container } from '@/components/ui';
import type { Announcement } from '@/lib/sanity/types';

const STORAGE_KEY = 'announcement-dismissed-at';

export function AnnouncementBanner({ announcement }: { announcement: Announcement | null }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!announcement) return;

    const dismissedAt = localStorage.getItem(STORAGE_KEY);
    if (!dismissedAt || dismissedAt < announcement.publishedAt) {
      setVisible(true);
    }
  }, [announcement]);

  if (!announcement || !visible) return null;

  function handleDismiss() {
    localStorage.setItem(STORAGE_KEY, announcement!.publishedAt);
    setVisible(false);
  }

  return (
    <div className="bg-primary-950 text-white">
      <Container size="wide">
        <div className="flex items-center justify-between gap-4 py-2.5 text-sm">
          <p className="flex-1 text-center font-serif">
            {announcement.message}
            {announcement.link && (
              <a
                href={announcement.link}
                className="ml-2 font-semibold text-accent-400 underline underline-offset-2 hover:text-accent-300 transition-colors"
              >
                {announcement.linkText || 'Learn more'}
              </a>
            )}
          </p>
          <button
            onClick={handleDismiss}
            className="shrink-0 p-1 hover:bg-white/10 rounded transition-colors"
            aria-label="Dismiss announcement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </Container>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { formatDate, formatDateShort } from '@/lib/utils';
import type { AgendaDay, Speaker } from '@/lib/sanity';

const SESSION_FORMAT_LABELS: Record<string, string> = {
  inauguration: 'Inauguration',
  keynote: 'Keynote',
  panel: 'Panel',
  workshop: 'Workshop',
  discussion: 'Discussion',
  networking: 'Networking',
  break: 'Break',
  valedictory: 'Valedictory',
  other: 'Session',
};

// Ceremonial / headline formats get the navy accent; everything else gold.
const NAVY_FORMATS = new Set(['keynote', 'inauguration', 'valedictory']);

function accentFor(format?: string) {
  if (format && NAVY_FORMATS.has(format)) {
    return { border: 'border-l-primary-900', chip: 'text-primary-900 bg-primary-50 border-primary-200' };
  }
  return { border: 'border-l-accent-600', chip: 'text-accent-800 bg-accent-50 border-accent-200' };
}

function formatTime(t?: string) {
  if (!t) return '';
  const [hRaw, mRaw] = t.split(':');
  const h = Number(hRaw);
  if (Number.isNaN(h)) return t;
  const period = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${(mRaw ?? '00').padStart(2, '0')} ${period}`;
}

const speakerSubtitle = (s: Speaker) => [s.title, s.organization].filter(Boolean).join(', ');

export function EventAgenda({
  days,
  align = 'center',
}: {
  days: AgendaDay[];
  align?: 'left' | 'center';
}) {
  const [active, setActive] = useState(0);
  const day = days[active] ?? days[0];
  const isLeftAligned = align === 'left';

  return (
    <div className={`max-w-4xl ${isLeftAligned ? '' : 'mx-auto'}`}>
      {/* Day switcher */}
      {days.length > 1 && (
        <div className={`flex ${isLeftAligned ? 'justify-start' : 'justify-center'} mb-12`}>
          <div className="inline-flex border-2 border-neutral-300 bg-white">
            {days.map((d, i) => {
              const isActive = i === active;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`px-5 sm:px-7 py-3 text-sm font-serif font-semibold transition-colors ${
                    i > 0 ? 'border-l-2 border-neutral-300' : ''
                  } ${
                    isActive
                      ? 'bg-primary-900 text-white'
                      : 'bg-white text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  {(d.label || `Day ${i + 1}`)}
                  {d.date && (
                    <span className={isActive ? 'text-neutral-300' : 'text-neutral-400'}>
                      {' · '}
                      {formatDateShort(d.date)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {days.length === 1 && day?.date && (
        <p
          className={`text-sm uppercase tracking-[0.18em] text-accent-700 font-semibold mb-10 ${
            isLeftAligned ? 'text-left' : 'text-center'
          }`}
        >
          {formatDate(day.date)}
        </p>
      )}

      {/* Timeline */}
      <div className="space-y-4">
        {(day?.sessions || []).map((session, si) => {
          const isBreak = session.format === 'break';
          const time = formatTime(session.startTime);

          if (isBreak) {
            return (
              <div
                key={si}
                className="grid grid-cols-[64px_1fr] sm:grid-cols-[92px_1fr] gap-3 sm:gap-6 items-center"
              >
                <div className="tnum text-right text-xs sm:text-sm text-neutral-500 font-serif">
                  {time}
                </div>
                <div className="px-5 py-3.5 bg-neutral-100 border border-neutral-200">
                  <span className="font-serif font-semibold text-neutral-700">{session.title}</span>
                  {session.description && (
                    <span className="text-neutral-500 font-serif"> — {session.description}</span>
                  )}
                </div>
              </div>
            );
          }

          const accent = accentFor(session.format);
          return (
            <div
              key={si}
              className="grid grid-cols-[64px_1fr] sm:grid-cols-[92px_1fr] gap-3 sm:gap-6"
            >
              <div className="tnum text-right text-xs sm:text-sm text-primary-900 font-semibold font-serif pt-5">
                {time}
              </div>
              <div className={`bg-white border-2 border-neutral-200 border-l-4 ${accent.border} shadow-sm p-5 sm:p-6`}>
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  {session.format && session.format !== 'other' && (
                    <span className={`text-[0.5625rem] uppercase tracking-[0.18em] font-semibold px-2 py-0.5 border ${accent.chip}`}>
                      {SESSION_FORMAT_LABELS[session.format] || session.format}
                    </span>
                  )}
                  {session.room && (
                    <span className="text-xs text-neutral-500 font-serif">{session.room}</span>
                  )}
                </div>
                <h4 className="text-lg font-serif font-semibold text-neutral-950 leading-snug">
                  {session.title}
                </h4>
                {session.description && (
                  <p className="text-sm text-neutral-600 font-serif mt-2 leading-relaxed">
                    {session.description}
                  </p>
                )}
                {session.speakers && session.speakers.length > 0 && (
                  <p className="text-sm text-primary-800 font-serif italic mt-3">
                    {session.speakers
                      .map((s) => {
                        const sub = speakerSubtitle(s);
                        return sub ? `${s.name} (${sub})` : s.name;
                      })
                      .join(', ')}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Link as LinkIcon, Check } from 'lucide-react';

export function CopyLinkButton({ sectionId }: { sectionId: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="p-1 text-neutral-300 hover:text-neutral-700 transition-colors"
      title="Copy link to section"
      aria-label="Copy link to section"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-green-600" />
      ) : (
        <LinkIcon className="w-3.5 h-3.5" />
      )}
    </button>
  );
}

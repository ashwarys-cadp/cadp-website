import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbJsonLd } from './JsonLd';

export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const allItems = [{ name: 'Home', href: '/' }, ...items];

  return (
    <>
      <BreadcrumbJsonLd items={allItems} />
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center text-sm text-neutral-500 ${className}`}
      >
        <ol className="flex items-center flex-wrap gap-1">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;

            return (
              <li key={item.href} className="flex items-center">
                {index > 0 && (
                  <ChevronRight
                    className="w-4 h-4 mx-1 text-neutral-400"
                    aria-hidden="true"
                  />
                )}
                {isLast ? (
                  <span
                    className="text-neutral-900 font-medium"
                    aria-current="page"
                  >
                    {index === 0 ? (
                      <Home className="w-4 h-4" aria-label="Home" />
                    ) : (
                      item.name
                    )}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {index === 0 ? (
                      <Home className="w-4 h-4" aria-label="Home" />
                    ) : (
                      item.name
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

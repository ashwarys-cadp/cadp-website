'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Container } from '@/components/ui';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  {
    name: 'Services',
    href: '/services',
    children: [
      { name: 'DPDP Training', href: '/services/dpdp-training' },
      { name: 'Compliance Advisory', href: '/services/compliance-advisory' },
      { name: 'Research & Publications', href: '/services/research-publications' },
    ],
  },
  {
    name: 'Resources',
    href: '/resources',
    children: [
      { name: 'Guides', href: '/resources/guides' },
      { name: 'Articles', href: '/resources/articles' },
      { name: 'White Papers', href: '/resources/white-papers' },
    ],
  },
  { name: 'Events', href: '/events' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-neutral-300">
      <Container size="wide">
        <nav className="flex items-center justify-between h-18 lg:h-22">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-800 border-2 border-primary-900 flex items-center justify-center">
              <span className="text-white font-bold text-xl" style={{fontFamily: 'var(--font-heading)'}}>C</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-semibold text-lg text-neutral-900" style={{fontFamily: 'var(--font-heading)'}}>CADP</div>
              <div className="text-xs text-neutral-600 -mt-0.5 tracking-wide">
                Centre for Applied Data Protection
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'px-4 py-2 text-sm font-medium transition-colors',
                    'text-neutral-700 hover:text-primary-800 hover:bg-neutral-50',
                    'border-b-2 border-transparent hover:border-primary-700'
                  )}
                >
                  {item.name}
                </Link>
                {item.children && openDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="bg-white shadow-lg border-2 border-neutral-300 py-1 min-w-[220px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-3 text-sm text-neutral-700 hover:text-primary-800 hover:bg-neutral-50 border-l-4 border-transparent hover:border-primary-700"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-2.5 bg-primary-800 text-white text-sm font-medium border border-primary-900 hover:bg-primary-900 transition-all uppercase tracking-wide"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-neutral-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t-2 border-neutral-300">
            <div className="flex flex-col gap-0.5">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-base font-medium text-neutral-900 hover:bg-neutral-50 border-l-4 border-transparent hover:border-primary-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="pl-4 bg-neutral-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-neutral-700 hover:bg-white border-l-4 border-transparent hover:border-primary-600"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 px-4">
                <Link
                  href="/contact"
                  className="block w-full text-center px-6 py-3 bg-primary-800 text-white text-sm font-medium border border-primary-900 hover:bg-primary-900 transition-all uppercase tracking-wide"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

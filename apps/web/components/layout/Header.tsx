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
    name: 'Programs & Initiatives',
    href: '/programs-and-initiatives',
    children: [
      { name: 'DPDP Training', href: '/programs-and-initiatives/dpdp-training' },
      { name: 'Compliance Advisory', href: '/programs-and-initiatives/compliance-advisory' },
      { name: 'Research & Publications', href: '/programs-and-initiatives/research-publications' },
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
    <header className="sticky top-0 z-50 bg-white border-b-4 border-primary-950 shadow-sm">
      <div className="h-1 bg-gradient-to-r from-primary-900 via-accent-600 to-primary-900"></div>
      <Container size="wide">
        <nav className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-14 h-14 bg-primary-950 border-2 border-primary-950 flex items-center justify-center relative group-hover:bg-primary-900 transition-colors">
              <span className="text-accent-500 font-bold text-2xl" style={{fontFamily: 'var(--font-heading)'}}>C</span>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent-600 border border-white"></div>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-xl text-neutral-950 tracking-tight" style={{fontFamily: 'var(--font-heading)'}}>CADP</div>
              <div className="text-[0.6875rem] text-neutral-600 -mt-1 tracking-[0.03em] uppercase font-semibold">
                Centre for Applied Data Protection
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
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
                    'px-4 py-2.5 text-[0.9375rem] font-serif font-medium transition-all',
                    'text-neutral-800 hover:text-primary-900 hover:bg-primary-50',
                    'border-b-3 border-transparent hover:border-accent-600'
                  )}
                >
                  {item.name}
                </Link>
                {item.children && openDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="bg-white shadow-xl border-2 border-primary-950 py-2 min-w-64">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-5 py-3 text-[0.9375rem] font-serif text-neutral-700 hover:text-primary-900 hover:bg-primary-50 border-l-4 border-transparent hover:border-accent-600 transition-all"
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
              className="inline-flex items-center px-7 py-2.5 bg-primary-950 text-white text-[0.9375rem] font-serif font-semibold border-2 border-primary-950 hover:bg-primary-900 hover:border-primary-800 transition-all shadow-sm"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-primary-50 border-2 border-neutral-300 hover:border-primary-700 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-neutral-800" />
            ) : (
              <Menu className="w-6 h-6 text-neutral-800" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-6 border-t-2 border-primary-950 bg-neutral-50">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-5 py-3 text-base font-serif font-medium text-neutral-900 hover:bg-white border-l-4 border-transparent hover:border-accent-600 transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="pl-4 bg-white border-l-2 border-neutral-300 ml-5">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-5 py-2.5 text-[0.9375rem] font-serif text-neutral-700 hover:bg-primary-50 border-l-4 border-transparent hover:border-primary-700 transition-all"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-6 px-5">
                <Link
                  href="/contact"
                  className="block w-full text-center px-7 py-3 bg-primary-950 text-white text-[0.9375rem] font-serif font-semibold border-2 border-primary-950 hover:bg-primary-900 transition-all shadow-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

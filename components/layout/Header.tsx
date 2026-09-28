'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Heart,
  Menu,
  User,
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { MobileDrawer } from './MobileDrawer';

export function Header() {
  const pathname = usePathname();
  const { savedIds, user } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  const navLinks = [
    { label: 'Buy', href: '/buy' },
    { label: 'Rent', href: '/rent' },
    { label: 'Sell', href: '/sell' },
    { label: 'Mortgage', href: '/mortgage' },
    { label: 'Agents', href: '/agents' }
  ];

  const isLinkActive = (href: string) => {
    const [path] = href.split('?');
    if (path === '/' && pathname !== '/') return false;
    return pathname === path || (path !== '/' && pathname.startsWith(path));
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 rounded"
          >
            <span className="text-amber-800">Nestora</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors hover:text-slate-900 relative py-1 ${
                    active ? 'text-slate-900 font-semibold' : ''
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/saved"
              aria-label="View saved homes"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors py-2 px-2.5 rounded-lg hover:bg-slate-100"
            >
              <Heart
                className={`w-4 h-4 ${
                  savedIds.length > 0 ? 'fill-amber-700 text-amber-700' : 'text-slate-600'
                }`}
              />
              <span className="hidden sm:inline">Saved</span>
              {savedIds.length > 0 && (
                <span className="text-xs font-semibold tabular-nums text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded">
                  {savedIds.length}
                </span>
              )}
            </Link>

            {user?.loggedIn ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm font-medium text-slate-900 py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <User className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden sm:inline truncate max-w-[120px]">{user.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-xs sm:text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 transition-colors py-2 px-3 sm:px-4 rounded-lg shadow-sm"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Hamburger Button */}
            <button
              type="button"
              onClick={handleOpen}
              className="md:hidden p-2 text-slate-700 hover:text-slate-950 active:bg-slate-100 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              aria-label="Open navigation menu"
              aria-expanded={isOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Redesigned Premium Mobile Navigation Drawer */}
      <MobileDrawer isOpen={isOpen} onClose={handleClose} />
    </>
  );
}

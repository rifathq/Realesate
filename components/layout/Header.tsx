'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Heart,
  Menu,
  User,
  X,
  Home,
  Bookmark,
  Calculator,
  Building,
  Building2,
  UserCheck,
  Calendar,
  Signpost,
  Search,
  KeyRound,
  Binoculars,
  Tag,
  ClipboardList,
  Gem,
  Briefcase,
  Settings,
} from 'lucide-react';
import { useApp } from '@/lib/store';

export function Header() {
  const pathname = usePathname();
  const { savedIds, user } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

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

  const mobileMenuItems = [
    { id: 'feed', label: 'Feed', href: '/feed', icon: Home },
    { id: 'favorites', label: 'Favorites', href: '/saved', icon: Heart, badge: savedIds.length },
    { id: 'saved-searches', label: 'Saved searches', href: '/saved-searches', icon: Bookmark },
    { id: 'mortgage', label: 'Mortgage', href: '/mortgage', icon: Calculator },
    { id: 'my-homes', label: 'My homes', href: '/my-homes', icon: Building },
    { id: 'renter-dashboard', label: 'Renter dashboard', href: '/renter-dashboard', icon: Building2 },
    { id: 'my-agent', label: 'My agent', href: '/my-agent', icon: UserCheck },
    { id: 'appointments', label: 'Appointments', href: '/appointments', icon: Calendar },
    { id: 'open-house', label: 'Open house', href: '/open-houses', icon: Signpost },
    { id: 'search-sale', label: 'Search for sale', href: '/search?mode=buy', icon: Search },
    { id: 'search-rentals', label: 'Search rentals', href: '/search?mode=rent', icon: KeyRound },
    { id: 'early-access', label: 'Early Access', href: '/early-access', icon: Binoculars },
    { id: 'sell-my-home', label: 'Sell my home', href: '/sell', icon: Tag },
    { id: 'list-for-rent', label: 'List for rent', href: '/list-for-rent', icon: ClipboardList },
    { id: 'premier', label: 'Premier', href: '/premier', icon: Gem },
    { id: 'be-an-agent', label: 'Be an agent', href: '/careers/agent', icon: Briefcase },
    { id: 'settings', label: 'Settings', href: '/settings/notifications', icon: Settings },
  ];

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
              onClick={() => setIsOpen(true)}
              className="md:hidden p-2 text-slate-700 hover:text-slate-950 active:bg-slate-100 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              aria-label="Open navigation menu"
              aria-expanded={isOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Dark backdrop overlay behind it */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
          aria-hidden="true"
        />
      )}

      {/* Fixed full-height slide-over drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-[340px] bg-white z-50 shadow-2xl transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-lg font-bold tracking-tight text-slate-900"
          >
            <span className="text-amber-800">Nestora</span>
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Status Bar inside drawer */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 shrink-0">
          {user?.loggedIn ? (
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 text-xs text-slate-700 hover:text-slate-900"
            >
              <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                {user.name.charAt(0)}
              </div>
              <div className="truncate">
                <p className="font-semibold text-slate-900 truncate">{user.name}</p>
                <p className="text-[11px] text-slate-500">View Client Portal</p>
              </div>
            </Link>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Sign in to save searches</span>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:text-amber-800 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs hover:bg-slate-50 transition-colors"
              >
                <span>Sign In</span>
              </Link>
            </div>
          )}
        </div>

        {/* Full Vertical List with Lucide Icons */}
        <nav className="flex-1 overflow-y-auto py-2 divide-y divide-slate-100">
          <div className="py-1">
            {mobileMenuItems.map((item) => {
              const Icon = item.icon;
              const active = isLinkActive(item.href);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-5 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? 'text-amber-900 bg-amber-50/70 border-r-4 border-amber-800 font-semibold'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50 active:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        active ? 'text-amber-800' : 'text-slate-500'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {typeof item.badge === 'number' && item.badge > 0 && (
                    <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-slate-900 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Drawer Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 shrink-0">
          <p className="font-semibold text-slate-700">Nestora Real Estate</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Find a place that feels like home.</p>
        </div>
      </div>
    </>
  );
}

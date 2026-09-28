'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  X,
  ChevronDown,
  ChevronRight,
  Home,
  Heart,
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
  Bell,
  LogIn,
  Sparkles,
  LucideIcon
} from 'lucide-react';
import { useApp } from '@/lib/store';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavLinkItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
  isPremier?: boolean;
  subItems?: { label: string; href: string }[];
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const pathname = usePathname();
  const { savedIds, user } = useApp();

  // Accordion state for Early Access
  const [earlyAccessOpen, setEarlyAccessOpen] = useState(false);

  // Close drawer ONLY on actual route navigation
  const prevPathnameRef = React.useRef(pathname);
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      if (isOpen) {
        onClose();
      }
    }
  }, [pathname, isOpen, onClose]);

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

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Helper to determine if an item is active
  const isItemActive = (href: string) => {
    const [pathPart] = href.split('?');
    if (pathPart === '/' && pathname !== '/') return false;
    return pathname === pathPart || (pathPart !== '/' && pathname.startsWith(pathPart));
  };

  const PRIMARY_ITEMS: NavLinkItem[] = [
    { id: 'feed', label: 'Feed', href: '/feed', icon: Home },
    { id: 'favorites', label: 'Favorites', href: '/saved', icon: Heart, badge: savedIds?.length || 0 },
    { id: 'saved-searches', label: 'Saved searches', href: '/saved-searches', icon: Bookmark }
  ];

  const ACTIVITY_ITEMS: NavLinkItem[] = [
    { id: 'mortgage', label: 'Mortgage Calculator', href: '/mortgage', icon: Calculator },
    { id: 'my-homes', label: 'My homes', href: '/my-homes', icon: Building },
    { id: 'renter-dashboard', label: 'Renter dashboard', href: '/renter-dashboard', icon: Building2 },
    { id: 'my-agent', label: 'My agent', href: '/my-agent', icon: UserCheck },
    { id: 'appointments', label: 'Appointments', href: '/appointments', icon: Calendar },
    { id: 'open-houses', label: 'Open house schedule', href: '/open-houses', icon: Signpost }
  ];

  const EXPLORE_ITEMS: NavLinkItem[] = [
    { id: 'search-sale', label: 'Search for sale', href: '/search?mode=buy', icon: Search },
    { id: 'search-rentals', label: 'Search rentals', href: '/search?mode=rent', icon: KeyRound },
    {
      id: 'early-access',
      label: 'Early Access',
      href: '/early-access',
      icon: Binoculars,
      subItems: [
        { label: 'Exclusive Drops', href: '/early-access?tab=exclusive-drops' },
        { label: 'Pre-market Listings', href: '/early-access?tab=pre-market' },
        { label: 'VIP Open Houses', href: '/early-access?tab=vip-open-houses' }
      ]
    },
    { id: 'sell-my-home', label: 'Sell my home', href: '/sell', icon: Tag },
    { id: 'list-for-rent', label: 'List for rent', href: '/list-for-rent', icon: ClipboardList },
    { id: 'premier', label: 'Nestora Premier', href: '/premier', icon: Gem, isPremier: true },
    { id: 'be-an-agent', label: 'Be an agent', href: '/careers/agent', icon: Briefcase },
    { id: 'notification-settings', label: 'Notification settings', href: '/settings/notifications', icon: Bell }
  ];

  const renderNavRow = (item: NavLinkItem) => {
    const Icon = item.icon;
    const active = isItemActive(item.href);
    const hasSubItems = Boolean(item.subItems && item.subItems.length > 0);

    if (hasSubItems) {
      return (
        <div key={item.id} className="flex flex-col">
          <button
            type="button"
            onClick={() => setEarlyAccessOpen(!earlyAccessOpen)}
            className={`group w-full flex items-center justify-between min-h-[44px] py-2 px-3 rounded-xl text-left transition-all ${
              active
                ? 'bg-stone-100/90 text-slate-950 font-semibold shadow-2xs'
                : 'text-slate-800 font-medium hover:bg-stone-100/80 active:bg-stone-200/60'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <Icon
                className={`w-5 h-5 shrink-0 transition-colors ${
                  active ? 'text-slate-900' : 'text-stone-400 group-hover:text-slate-800'
                }`}
              />
              <span className="text-[14px] truncate">{item.label}</span>
              <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100/80 rounded-md">
                VIP
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-stone-400 transition-transform duration-200 shrink-0 ${
                earlyAccessOpen ? 'rotate-180 text-slate-900' : 'group-hover:text-slate-700'
              }`}
            />
          </button>

          {earlyAccessOpen && (
            <div className="ml-8 mr-2 pl-3 py-1 space-y-0.5 border-l border-stone-200">
              {item.subItems!.map((sub) => {
                const subActive = pathname === sub.href.split('?')[0];
                return (
                  <Link
                    key={sub.label}
                    href={sub.href}
                    onClick={onClose}
                    className={`block py-1.5 px-2.5 rounded-lg text-[13px] font-medium transition-colors ${
                      subActive
                        ? 'text-slate-900 bg-stone-100/70 font-semibold'
                        : 'text-stone-600 hover:text-slate-950 hover:bg-stone-100/50'
                    }`}
                  >
                    {sub.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.id}
        href={item.href}
        onClick={onClose}
        className={`group flex items-center justify-between min-h-[44px] py-2 px-3 rounded-xl transition-all ${
          active
            ? 'bg-stone-100/90 text-slate-950 font-semibold shadow-2xs'
            : 'text-slate-800 font-medium hover:bg-stone-100/80 active:bg-stone-200/60'
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <Icon
            className={`w-5 h-5 shrink-0 transition-colors ${
              active ? 'text-slate-900' : 'text-stone-400 group-hover:text-slate-800'
            }`}
          />
          <span className="text-[14px] truncate">{item.label}</span>
        </div>

        {typeof item.badge === 'number' && item.badge > 0 && (
          <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-slate-900 text-white text-[11px] font-semibold flex items-center justify-center leading-none shadow-2xs">
            {item.badge}
          </span>
        )}

        {item.isPremier && (
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
        )}
      </Link>
    );
  };

  return (
    <div
      className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Drawer"
    >
      {/* Refined Translucent Dimmed Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-slate-950/40 backdrop-blur-[2px] transition-opacity duration-300 ease-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <aside
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-0 right-0 z-10 w-[85%] max-w-[340px] sm:max-w-[360px] h-full bg-[#FCFCFA] text-slate-900 rounded-l-2xl sm:rounded-l-3xl shadow-[-12px_0_36px_rgba(15,23,42,0.12)] flex flex-col transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* 1. Header: Logo on left, subtle round close button on right */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-stone-200/70 shrink-0 bg-white/90 backdrop-blur-xs">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2 group focus-visible:outline-none"
          >
            <span className="font-serif text-[22px] font-bold tracking-tight text-slate-900 group-hover:text-slate-700 transition-colors">
              Nestora
            </span>
          </Link>

          <button
            onClick={onClose}
            type="button"
            aria-label="Close navigation menu"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-stone-100/90 text-stone-500 hover:text-slate-900 hover:bg-stone-200/80 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2. User profile area: Compact premium profile block */}
        <div className="px-5 sm:px-6 py-3.5 bg-[#F7F5F0] border-b border-stone-200/70 shrink-0">
          {user?.loggedIn ? (
            <Link
              href="/dashboard"
              onClick={onClose}
              className="flex items-center justify-between group p-1 -m-1 rounded-xl hover:bg-stone-200/50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-full bg-[#EAE6DF] border border-stone-300/60 text-slate-800 flex items-center justify-center font-serif text-base font-semibold shadow-2xs shrink-0">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
                </div>
                <div className="truncate">
                  <p className="font-medium text-[14px] text-slate-900 truncate leading-snug group-hover:text-slate-950">
                    {user.name || 'Alexandra Miller'}
                  </p>
                  <p className="text-[12px] text-stone-500 font-normal">
                    View Client Portal
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
            </Link>
          ) : (
            <div className="flex items-center justify-between w-full">
              <div className="truncate pr-2">
                <p className="font-medium text-[13px] text-slate-900">Welcome to Nestora</p>
                <p className="text-[11px] text-stone-500">Sign in to save searches</p>
              </div>
              <Link
                href="/login"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-slate-900 px-3 py-1.5 rounded-lg shadow-2xs hover:bg-slate-800 active:scale-95 transition-all shrink-0"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            </div>
          )}
        </div>

        {/* 3. Navigation hierarchy: Scrollable area with clean section groupings */}
        <nav className="flex-1 overflow-y-auto px-3.5 py-2.5 space-y-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {/* PRIMARY SECTION */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-stone-400 px-3 pb-1">
              Primary
            </p>
            <div className="space-y-0.5">
              {PRIMARY_ITEMS.map(renderNavRow)}
            </div>
          </div>

          {/* MY ACTIVITY SECTION */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-stone-400 px-3 pb-1">
              My Activity
            </p>
            <div className="space-y-0.5">
              {ACTIVITY_ITEMS.map(renderNavRow)}
            </div>
          </div>

          {/* EXPLORE SECTION */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-stone-400 px-3 pb-1">
              Explore
            </p>
            <div className="space-y-0.5">
              {EXPLORE_ITEMS.map(renderNavRow)}
            </div>
          </div>
        </nav>

        {/* 4. Footer: Refined compact brand footer */}
        <div className="px-5 sm:px-6 py-4 bg-[#F7F5F0] border-t border-stone-200/70 shrink-0 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif font-bold text-sm tracking-tight text-slate-900">
              Nestora
            </span>
            <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">
              Real Estate
            </span>
          </div>
          <p className="text-[12px] text-stone-500 mt-0.5 italic">
            &ldquo;Find a place that feels like home.&rdquo;
          </p>
          <p className="text-[10px] text-stone-400 mt-2 font-normal">
            &copy; 2026 Nestora &middot; All rights reserved
          </p>
        </div>
      </aside>
    </div>
  );
}

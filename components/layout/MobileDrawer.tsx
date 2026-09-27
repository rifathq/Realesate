'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, ChevronDown, User, LogIn, Sparkles } from 'lucide-react';
import { SECTION_A_ITEMS, SECTION_B_ITEMS, NavItem } from './navItems';
import { useApp } from '@/lib/store';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const pathname = usePathname();
  const { savedIds, user } = useApp();

  // Accordion state for Early Access
  const [earlyAccessOpen, setEarlyAccessOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

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

  return (
    <div
      className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Drawer"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <aside
        className={`fixed top-0 right-0 z-10 w-[85%] max-w-[360px] h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Top bar with close button & brand identity */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-1.5 text-base font-bold tracking-tight text-slate-900 focus-visible:outline-none"
          >
            <span className="text-amber-800 font-extrabold text-lg">Nestora</span>
          </Link>

          <button
            onClick={onClose}
            type="button"
            aria-label="Close navigation menu"
            className="p-2 -mr-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Account Bar */}
        <div className="px-6 py-3 bg-[#FBFBF9] border-b border-gray-100 flex items-center justify-between">
          {user ? (
            <Link
              href="/dashboard"
              onClick={onClose}
              className="flex items-center gap-2.5 text-xs text-slate-700 hover:text-slate-900 group"
            >
              <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                {user.name.charAt(0)}
              </div>
              <div className="truncate">
                <p className="font-semibold text-slate-900 truncate group-hover:underline">{user.name}</p>
                <p className="text-[11px] text-slate-500">View Client Portal</p>
              </div>
            </Link>
          ) : (
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-slate-500">Sign in to save searches</span>
              <Link
                href="/login"
                onClick={onClose}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:text-amber-800 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs hover:bg-slate-50 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In</span>
              </Link>
            </div>
          )}
        </div>

        {/* Scrollable Navigation List */}
        <nav className="flex-1 overflow-y-auto py-2 divide-y-0 text-[15px]">
          {/* SECTION A: Account & Personal Tools */}
          <div className="py-1">
            {SECTION_A_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isItemActive(item.href);
              const badgeValue = item.id === 'favorites' ? savedIds.length : item.badge;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between py-3 px-6 gap-4 transition-colors font-medium ${
                    active
                      ? 'text-amber-900 bg-amber-50/70 border-r-4 border-amber-800 font-semibold'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50 active:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-amber-800' : 'text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {typeof badgeValue === 'number' && badgeValue > 0 && (
                    <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-slate-900 rounded-full">
                      {badgeValue}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Clean Divider */}
          <div className="border-t border-gray-200 my-2 mx-6" role="separator" />

          {/* SECTION B: Discovery & Services */}
          <div className="py-1">
            {SECTION_B_ITEMS.map((item) => {
              const Icon = item.icon;
              const isAccordion = Boolean(item.subItems && item.subItems.length > 0);
              const active = isItemActive(item.href);

              if (isAccordion) {
                return (
                  <div key={item.id} className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => setEarlyAccessOpen(!earlyAccessOpen)}
                      className={`flex items-center justify-between w-full py-3 px-6 gap-4 text-left transition-colors font-medium ${
                        active
                          ? 'text-amber-900 bg-amber-50/70'
                          : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50 active:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-amber-800' : 'text-slate-500'}`} />
                        <span className="truncate">{item.label}</span>
                        <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 rounded">
                          VIP
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                          earlyAccessOpen ? 'rotate-180 text-slate-800' : ''
                        }`}
                      />
                    </button>

                    {/* Accordion Sub-links */}
                    {earlyAccessOpen && (
                      <div className="bg-slate-50/80 pl-14 pr-6 py-1.5 space-y-1 border-y border-slate-100">
                        {item.subItems!.map((sub) => {
                          const subActive = isItemActive(sub.href);
                          return (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              onClick={onClose}
                              className={`block py-2 text-xs font-medium transition-colors ${
                                subActive
                                  ? 'text-amber-900 font-bold'
                                  : 'text-slate-600 hover:text-slate-900'
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
                  className={`flex items-center justify-between py-3 px-6 gap-4 transition-colors font-medium ${
                    active
                      ? 'text-amber-900 bg-amber-50/70 border-r-4 border-amber-800 font-semibold'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50 active:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-amber-800' : 'text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.id === 'nestora-premier' && (
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer info inside Drawer */}
        <div className="p-6 bg-[#FBFBF9] border-t border-gray-100 text-xs text-slate-500">
          <p className="font-semibold text-slate-700">Nestora Real Estate</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Find a place that feels like home.</p>
        </div>
      </aside>
    </div>
  );
}

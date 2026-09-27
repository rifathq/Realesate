import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand info */}
          <div className="col-span-2">
            <span className="text-lg font-bold tracking-tight text-slate-900 block mb-2">
              Nestora
            </span>
            <p className="text-slate-500 max-w-sm mb-4 leading-relaxed">
              Find a place that feels like home. A modern, transparent real-estate marketplace built for buyers, sellers, renters, and local advisors.
            </p>
            <div className="text-xs text-slate-400">
              Equal Housing Opportunity · Member MLS & NAR
            </div>
          </div>

          {/* Column 1: Discover */}
          <div>
            <div className="font-semibold text-slate-900 mb-3 text-xs tracking-wider uppercase">
              Discover
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/buy" className="hover:text-slate-900 transition-colors">
                  Homes for Sale
                </Link>
              </li>
              <li>
                <Link href="/rent" className="hover:text-slate-900 transition-colors">
                  Rental Residences
                </Link>
              </li>
              <li>
                <Link href="/search?status=New" className="hover:text-slate-900 transition-colors">
                  New Listings
                </Link>
              </li>
              <li>
                <Link href="/search?status=Open+House" className="hover:text-slate-900 transition-colors">
                  Open Houses
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Services */}
          <div>
            <div className="font-semibold text-slate-900 mb-3 text-xs tracking-wider uppercase">
              Services
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/sell" className="hover:text-slate-900 transition-colors">
                  Sell Your Home
                </Link>
              </li>
              <li>
                <Link href="/sell#valuation" className="hover:text-slate-900 transition-colors">
                  Free Home Valuation
                </Link>
              </li>
              <li>
                <Link href="/mortgage" className="hover:text-slate-900 transition-colors">
                  Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link href="/agents" className="hover:text-slate-900 transition-colors">
                  Find an Advisor
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Account */}
          <div>
            <div className="font-semibold text-slate-900 mb-3 text-xs tracking-wider uppercase">
              Account
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/saved" className="hover:text-slate-900 transition-colors">
                  Saved Properties
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-slate-900 transition-colors">
                  Client Dashboard
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-slate-900 transition-colors">
                  Sign In / Register
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Nestora Real Estate Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Brokerage Disclosures</span>
            <span>Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

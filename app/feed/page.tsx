'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PropertyCard } from '@/components/property/PropertyCard';
import { PROPERTIES } from '@/lib/data';
import { useApp } from '@/lib/store';
import {
  Sparkles,
  TrendingDown,
  Clock,
  Flame,
  ArrowRight,
  Filter,
  CheckCircle2
} from 'lucide-react';

export default function FeedPage() {
  const { savedIds, showToast } = useApp();
  const [feedFilter, setFeedFilter] = useState<'all' | 'new' | 'price-drops' | 'open-houses'>('all');

  const filteredFeed = PROPERTIES.filter((property) => {
    if (feedFilter === 'new') return property.status.toLowerCase().includes('new');
    if (feedFilter === 'price-drops') return property.status.toLowerCase().includes('price');
    if (feedFilter === 'open-houses') return Boolean(property.openHouseDate);
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9]">
      <Header />

      <main className="flex-1 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Personalized Real Estate Feed</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Your Market Activity Feed
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Real-time updates, price changes, and new drops tailored to your saved searches and locations.
              </p>
            </div>

            {/* Quick Feed Toggles */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto overflow-x-auto max-w-full">
              <button
                type="button"
                onClick={() => setFeedFilter('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  feedFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Updates
              </button>
              <button
                type="button"
                onClick={() => setFeedFilter('new')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  feedFilter === 'new'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Just Listed
              </button>
              <button
                type="button"
                onClick={() => setFeedFilter('price-drops')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  feedFilter === 'price-drops'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Price Reductions
              </button>
              <button
                type="button"
                onClick={() => setFeedFilter('open-houses')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  feedFilter === 'open-houses'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Open Houses
              </button>
            </div>
          </div>

          {/* Activity Highlights Banner */}
          <div className="my-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200/90 flex items-center gap-3 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Fastest Moving Market</span>
                <span className="text-sm font-bold text-slate-900">Seattle · 8 Days on Market</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/90 flex items-center gap-3 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Average Reduction</span>
                <span className="text-sm font-bold text-slate-900">$35,000 below list</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/90 flex items-center gap-3 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Feed Status</span>
                <span className="text-sm font-bold text-slate-900">Updated 6 mins ago</span>
              </div>
            </div>
          </div>

          {/* Grid of Feed Properties */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFeed.map((property) => (
              <div key={property.id} className="flex flex-col">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

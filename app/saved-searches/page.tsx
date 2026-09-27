'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useApp } from '@/lib/store';
import {
  Bookmark,
  Search,
  Bell,
  Trash2,
  ExternalLink,
  Plus,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export default function SavedSearchesPage() {
  const { savedSearches, removeSavedSearch, saveSearch, showToast } = useApp();
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('Denver, CO');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    saveSearch(newTitle.trim(), { location: newLocation, beds: 2 });
    setNewTitle('');
    setIsCreating(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9]">
      <Header />

      <main className="flex-1 py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
                Automated Alerts
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Saved Searches
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Get notified immediately when new properties matching your exact specifications enter the market.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsCreating(!isCreating)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white py-2.5 px-4 rounded-lg transition-colors self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>{isCreating ? 'Cancel' : 'Create New Search'}</span>
            </button>
          </div>

          {/* New Search Creator Inline */}
          {isCreating && (
            <form
              onSubmit={handleCreateSearch}
              className="mt-6 p-6 bg-white rounded-2xl border border-slate-200 shadow-xs animate-in fade-in duration-200"
            >
              <h3 className="font-bold text-slate-900 text-sm mb-4">Set Up New Search Alert</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Search Label</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Modern Condos in Denver under $1M"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Market</label>
                  <select
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  >
                    <option value="Seattle, WA">Seattle, WA</option>
                    <option value="Austin, TX">Austin, TX</option>
                    <option value="Denver, CO">Denver, CO</option>
                    <option value="San Francisco, CA">San Francisco, CA</option>
                    <option value="Chicago, IL">Chicago, IL</option>
                    <option value="Portland, OR">Portland, OR</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors"
                >
                  Save Alert
                </button>
              </div>
            </form>
          )}

          {/* Saved Searches List */}
          <div className="pt-8 space-y-4">
            {savedSearches.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-xs">
                <Bookmark className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 text-base mb-1">No Saved Searches Yet</h3>
                <p className="text-xs text-slate-500 mb-6">
                  Save your custom filter configurations while searching to receive instant alerts when new listings match.
                </p>
                <Link
                  href="/search"
                  className="inline-flex items-center gap-2 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Explore Search Tool</span>
                </Link>
              </div>
            ) : (
              savedSearches.map((search) => (
                <div
                  key={search.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-300 transition-colors"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Bookmark className="w-4 h-4 text-amber-800 shrink-0" />
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                        {search.title}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                        <Bell className="w-3 h-3" />
                        <span>{search.alertFrequency}</span>
                      </span>
                    </div>

                    <p className="text-xs text-slate-500">
                      Filters:{' '}
                      <span className="text-slate-700 font-medium">
                        {search.filters.location || 'Any location'} · {search.filters.beds || 'Any'} beds ·{' '}
                        {search.filters.propertyTypes ? search.filters.propertyTypes.join(', ') : 'All types'}
                      </span>
                      <span className="mx-2 text-slate-300">·</span>
                      Created on {search.dateCreated}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    <Link
                      href={`/search?location=${encodeURIComponent(
                        search.filters.location || ''
                      )}&mode=buy`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-lg transition-colors"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>View Results</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => removeSavedSearch(search.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 transition-colors rounded-lg hover:bg-rose-50"
                      title="Delete saved search"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

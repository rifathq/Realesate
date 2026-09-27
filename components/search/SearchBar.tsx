'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import { ListingType } from '@/lib/types';

interface SearchBarProps {
  initialMode?: ListingType;
  initialLocation?: string;
  variant?: 'hero' | 'compact';
  onFilterClick?: () => void;
  activeFilterCount?: number;
}

export function SearchBar({
  initialMode = 'buy',
  initialLocation = '',
  variant = 'hero',
  onFilterClick,
  activeFilterCount = 0
}: SearchBarProps) {
  const router = useRouter();
  const [mode, setMode] = useState<ListingType>(initialMode);
  const [location, setLocation] = useState(initialLocation);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  const popularLocations = [
    { name: 'Seattle, WA', type: 'City' },
    { name: 'Queen Anne, Seattle', type: 'Neighborhood' },
    { name: 'Austin, TX', type: 'City' },
    { name: 'Westlake Hills, Austin', type: 'Neighborhood' },
    { name: 'Denver, CO', type: 'City' },
    { name: 'Highlands, Denver', type: 'Neighborhood' }
  ];

  const filteredSuggestions = popularLocations.filter((loc) =>
    loc.name.toLowerCase().includes(location.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    query.set('mode', mode);
    if (location.trim()) {
      query.set('location', location.trim());
    }
    router.push(`/search?${query.toString()}`);
  };

  const handleSelectSuggestion = (locName: string) => {
    setLocation(locName);
    setSuggestionsOpen(false);
    const query = new URLSearchParams();
    query.set('mode', mode);
    query.set('location', locName);
    router.push(`/search?${query.toString()}`);
  };

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
        {/* Mode Toggle */}
        <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 shrink-0">
          <button
            type="button"
            onClick={() => setMode('buy')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              mode === 'buy'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Buy
          </button>
          <button
            type="button"
            onClick={() => setMode('rent')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              mode === 'rent'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Rent
          </button>
        </div>

        {/* Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Address, neighborhood, city, or ZIP"
            className="w-full pl-9 pr-4 py-1.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          />
        </div>

        {onFilterClick && (
          <button
            type="button"
            onClick={onFilterClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors shrink-0 ${
              activeFilterCount > 0
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-white text-slate-900 text-[10px] flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>
        )}

        <button
          type="submit"
          className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors shrink-0"
        >
          Search
        </button>
      </form>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Mode switch */}
      <div className="flex gap-1 mb-2.5">
        <button
          type="button"
          onClick={() => setMode('buy')}
          className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-t-lg transition-colors ${
            mode === 'buy'
              ? 'bg-white text-slate-900 border-t border-x border-slate-200'
              : 'bg-slate-200/60 text-slate-600 hover:text-slate-900'
          }`}
        >
          Buy
        </button>
        <button
          type="button"
          onClick={() => setMode('rent')}
          className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-t-lg transition-colors ${
            mode === 'rent'
              ? 'bg-white text-slate-900 border-t border-x border-slate-200'
              : 'bg-slate-200/60 text-slate-600 hover:text-slate-900'
          }`}
        >
          Rent
        </button>
      </div>

      {/* Main Bar Card */}
      <div className="relative bg-white rounded-xl shadow-lg border border-slate-200/90 p-2 sm:p-2.5">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setSuggestionsOpen(true);
              }}
              onFocus={() => setSuggestionsOpen(true)}
              placeholder="Enter City, Neighborhood, Address, or ZIP..."
              className="w-full pl-10 pr-4 py-3 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
            />

            {/* Suggestions dropdown */}
            {suggestionsOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setSuggestionsOpen(false)}
                />
                <div className="absolute left-0 right-0 top-full mt-2 z-30 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden divide-y divide-slate-100 max-h-64 overflow-y-auto">
                  <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Popular Markets
                  </div>
                  {filteredSuggestions.map((sug) => (
                    <button
                      key={sug.name}
                      type="button"
                      onClick={() => handleSelectSuggestion(sug.name)}
                      className="w-full px-3.5 py-2.5 text-left text-sm flex items-center justify-between hover:bg-slate-50 text-slate-800 transition-colors"
                    >
                      <span className="font-medium">{sug.name}</span>
                      <span className="text-xs text-slate-400">{sug.type}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white font-medium text-sm sm:text-base py-3 px-6 rounded-lg transition-all shadow-sm shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>Search Homes</span>
          </button>
        </form>
      </div>
    </div>
  );
}

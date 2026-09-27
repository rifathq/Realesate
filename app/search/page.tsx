'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { SearchBar } from '@/components/search/SearchBar';
import { PropertyCard } from '@/components/property/PropertyCard';
import { InteractiveMap } from '@/components/property/InteractiveMap';
import { FilterDrawer } from '@/components/search/FilterDrawer';
import { PROPERTIES } from '@/lib/data';
import { FilterState, ListingType, Property } from '@/lib/types';
import { useApp } from '@/lib/store';
import { SlidersHorizontal, Map, List, Bell, ArrowUpDown } from 'lucide-react';

function SearchWorkspace() {
  const searchParams = useSearchParams();
  const initialMode = (searchParams.get('mode') as ListingType) || 'buy';
  const initialLocation = searchParams.get('location') || '';
  const initialStatus = searchParams.get('status') || '';

  const { saveSearch } = useApp();

  const [filters, setFilters] = useState<FilterState>({
    mode: initialMode,
    location: initialLocation,
    priceMin: '',
    priceMax: '',
    beds: 'any',
    baths: 'any',
    propertyTypes: [],
    sqftMin: '',
    sqftMax: '',
    yearBuiltMin: '',
    amenities: [],
    status: initialStatus ? [initialStatus] : [],
    sortBy: 'recommended'
  });

  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  // Filter properties
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((p) => {
      // mode
      if (p.listingType !== filters.mode) return false;

      // location text
      if (filters.location) {
        const query = filters.location.toLowerCase();
        const inCity = p.city.toLowerCase().includes(query);
        const inNeighborhood = p.neighborhood.toLowerCase().includes(query);
        const inAddress = p.address.toLowerCase().includes(query);
        const inZip = p.zip.includes(query);
        if (!inCity && !inNeighborhood && !inAddress && !inZip) return false;
      }

      // price
      if (filters.priceMin !== '' && p.price < Number(filters.priceMin)) return false;
      if (filters.priceMax !== '' && p.price > Number(filters.priceMax)) return false;

      // beds
      if (filters.beds !== 'any' && p.beds < Number(filters.beds)) return false;

      // baths
      if (filters.baths !== 'any' && p.baths < Number(filters.baths)) return false;

      // property type
      if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(p.propertyType)) {
        return false;
      }

      // sqft
      if (filters.sqftMin !== '' && p.sqft < Number(filters.sqftMin)) return false;
      if (filters.sqftMax !== '' && p.sqft > Number(filters.sqftMax)) return false;

      // amenities
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every((a) => p.amenities.includes(a));
        if (!hasAllAmenities) return false;
      }

      // status
      if (filters.status.length > 0 && !filters.status.includes(p.status)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'sqft-desc') return b.sqft - a.sqft;
      if (filters.sortBy === 'newest') return new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime();
      return 0; // recommended
    });
  }, [filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.priceMin !== '' || filters.priceMax !== '') count++;
    if (filters.beds !== 'any') count++;
    if (filters.baths !== 'any') count++;
    if (filters.propertyTypes.length > 0) count += filters.propertyTypes.length;
    if (filters.sqftMin !== '' || filters.sqftMax !== '') count++;
    if (filters.amenities.length > 0) count += filters.amenities.length;
    return count;
  }, [filters]);

  const handleResetFilters = () => {
    setFilters({
      mode: filters.mode,
      location: '',
      priceMin: '',
      priceMax: '',
      beds: 'any',
      baths: 'any',
      propertyTypes: [],
      sqftMin: '',
      sqftMax: '',
      yearBuiltMin: '',
      amenities: [],
      status: [],
      sortBy: 'recommended'
    });
  };

  const handleSaveSearchPrompt = () => {
    const title = `${filters.location || 'All Markets'} · ${
      filters.mode === 'buy' ? 'For Sale' : 'For Rent'
    }`;
    saveSearch(title, filters);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9]">
      <Header />

      {/* Top Search & Filter Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex-1 max-w-2xl">
            <SearchBar
              variant="compact"
              initialMode={filters.mode}
              initialLocation={filters.location}
              onFilterClick={() => setFilterDrawerOpen(true)}
              activeFilterCount={activeFilterCount}
            />
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span>Sort:</span>
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })
                }
                className="bg-transparent text-slate-900 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="sqft-desc">Largest Sqft</option>
              </select>
            </div>

            {/* Save Search Button */}
            <button
              type="button"
              onClick={handleSaveSearchPrompt}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Bell className="w-3.5 h-3.5 text-slate-500" />
              <span>Save Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Split Layout: List + Map */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Column: Properties List */}
        <div
          className={`w-full lg:w-[58%] xl:w-[52%] overflow-y-auto p-4 sm:p-6 lg:h-[calc(100vh-116px)] ${
            mobileView === 'map' ? 'hidden lg:block' : 'block'
          }`}
        >
          {/* Header Summary */}
          <div className="flex items-baseline justify-between mb-4 pb-2 border-b border-slate-200/70">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                {filters.location ? `${filters.location} Real Estate` : 'All Available Listings'}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Showing {filteredProperties.length}{' '}
                {filteredProperties.length === 1 ? 'property' : 'properties'} for{' '}
                {filters.mode === 'buy' ? 'sale' : 'rent'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setFilterDrawerOpen(true)}
              className="lg:hidden text-xs font-semibold flex items-center gap-1 text-slate-700 bg-white border border-slate-200 px-2.5 py-1.5 rounded-md"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>
          </div>

          {/* Properties Grid */}
          {filteredProperties.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white rounded-xl border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-1">No matching properties found</h3>
              <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
                Try widening your price range, clearing specific filters, or searching for a different city or neighborhood.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-semibold bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {filteredProperties.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  isHovered={hoveredPropertyId === prop.id}
                  onHover={(id) => setHoveredPropertyId(id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Interactive Map */}
        <div
          className={`w-full lg:w-[42%] xl:w-[48%] p-3 sm:p-4 lg:h-[calc(100vh-116px)] ${
            mobileView === 'list' ? 'hidden lg:block' : 'block'
          }`}
        >
          <InteractiveMap
            properties={filteredProperties}
            hoveredId={hoveredPropertyId}
            selectedId={selectedPropertyId}
            onSelectProperty={(id) => setSelectedPropertyId(id)}
            onHoverProperty={(id) => setHoveredPropertyId(id)}
          />
        </div>
      </div>

      {/* Mobile Sticky List / Map Toggle */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-30 shadow-xl">
        <div className="flex bg-slate-900 text-white rounded-full p-1 border border-slate-800 shadow-2xl">
          <button
            type="button"
            onClick={() => setMobileView('list')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
              mobileView === 'list' ? 'bg-white text-slate-900' : 'text-slate-300 hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>List</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileView('map')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
              mobileView === 'map' ? 'bg-white text-slate-900' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Map</span>
          </button>
        </div>
      </div>

      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        filters={filters}
        onChange={(newFilters) => setFilters(newFilters)}
        onReset={handleResetFilters}
        totalMatching={filteredProperties.length}
      />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading search workspace...</div>}>
      <SearchWorkspace />
    </Suspense>
  );
}

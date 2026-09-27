'use client';

import React from 'react';
import { X, Check } from 'lucide-react';
import { FilterState, PropertyType } from '@/lib/types';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  totalMatching: number;
}

export function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onChange,
  onReset,
  totalMatching
}: FilterDrawerProps) {
  if (!isOpen) return null;

  const propertyTypeOptions: { label: string; value: PropertyType }[] = [
    { label: 'Single-Family Home', value: 'single-family' },
    { label: 'Condominium', value: 'condo' },
    { label: 'Townhouse', value: 'townhouse' },
    { label: 'Multi-Family', value: 'multi-family' }
  ];

  const amenityOptions = [
    'Central A/C',
    'Garage Parking',
    'Hardwood Floors',
    'Fireplace',
    'Pool',
    'Water View',
    'Mountain View',
    'Rooftop Deck',
    'In-Unit Laundry',
    'Pet Friendly'
  ];

  const togglePropertyType = (type: PropertyType) => {
    const exists = filters.propertyTypes.includes(type);
    const updated = exists
      ? filters.propertyTypes.filter((t) => t !== type)
      : [...filters.propertyTypes, type];
    onChange({ ...filters, propertyTypes: updated });
  };

  const toggleAmenity = (amenity: string) => {
    const exists = filters.amenities.includes(amenity);
    const updated = exists
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    onChange({ ...filters, amenities: updated });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-slate-900">Search Filters</h2>
            <button
              type="button"
              onClick={onReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 underline"
            >
              Reset All
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Filters Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 divide-y divide-slate-100 text-sm">
          {/* Listing Mode */}
          <div className="pt-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Listing Mode
            </label>
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => onChange({ ...filters, mode: 'buy' })}
                className={`py-2 text-xs font-semibold rounded-md transition-colors ${
                  filters.mode === 'buy'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                For Sale
              </button>
              <button
                type="button"
                onClick={() => onChange({ ...filters, mode: 'rent' })}
                className={`py-2 text-xs font-semibold rounded-md transition-colors ${
                  filters.mode === 'rent'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                For Rent
              </button>
            </div>
          </div>

          {/* Price Range */}
          <div className="pt-6">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Price Range
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-xs text-slate-400 mb-1 block">Minimum</span>
                <input
                  type="number"
                  placeholder="No Min"
                  value={filters.priceMin}
                  onChange={(e) =>
                    onChange({
                      ...filters,
                      priceMin: e.target.value ? Number(e.target.value) : ''
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
              <div>
                <span className="text-xs text-slate-400 mb-1 block">Maximum</span>
                <input
                  type="number"
                  placeholder="No Max"
                  value={filters.priceMax}
                  onChange={(e) =>
                    onChange({
                      ...filters,
                      priceMax: e.target.value ? Number(e.target.value) : ''
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className="pt-6">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Bedrooms
            </label>
            <div className="flex gap-1.5 flex-wrap">
              {(['any', 1, 2, 3, 4, 5] as const).map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => onChange({ ...filters, beds: b })}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                    filters.beds === b
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {b === 'any' ? 'Any' : `${b}+`}
                </button>
              ))}
            </div>

            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mt-4 mb-2">
              Bathrooms
            </label>
            <div className="flex gap-1.5 flex-wrap">
              {(['any', 1, 2, 3, 4] as const).map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => onChange({ ...filters, baths: b })}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                    filters.baths === b
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {b === 'any' ? 'Any' : `${b}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Property Types */}
          <div className="pt-6">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
              Property Type
            </label>
            <div className="space-y-2.5">
              {propertyTypeOptions.map((opt) => {
                const checked = filters.propertyTypes.includes(opt.value);
                return (
                  <label
                    key={opt.value}
                    className="flex items-center gap-3 cursor-pointer text-slate-800 hover:text-slate-950"
                  >
                    <div
                      onClick={() => togglePropertyType(opt.value)}
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        checked
                          ? 'bg-slate-900 border-slate-900 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {checked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Square Footage */}
          <div className="pt-6">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Square Footage (sqft)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="number"
                  placeholder="Min Sqft"
                  value={filters.sqftMin}
                  onChange={(e) =>
                    onChange({
                      ...filters,
                      sqftMin: e.target.value ? Number(e.target.value) : ''
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Max Sqft"
                  value={filters.sqftMax}
                  onChange={(e) =>
                    onChange({
                      ...filters,
                      sqftMax: e.target.value ? Number(e.target.value) : ''
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="pt-6">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
              Features & Amenities
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {amenityOptions.map((amenity) => {
                const checked = filters.amenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-xs text-left transition-colors ${
                      checked
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Check
                      className={`w-3.5 h-3.5 shrink-0 ${
                        checked ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    <span className="truncate">{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onReset}
            className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg transition-colors"
          >
            Clear All
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors text-center shadow-xs"
          >
            Show {totalMatching} {totalMatching === 1 ? 'Home' : 'Homes'}
          </button>
        </div>
      </div>
    </div>
  );
}

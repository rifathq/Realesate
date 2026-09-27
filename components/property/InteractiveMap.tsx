'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Minus, Maximize2, Compass, X } from 'lucide-react';
import { Property } from '@/lib/types';

interface InteractiveMapProps {
  properties: Property[];
  hoveredId: string | null;
  selectedId: string | null;
  onSelectProperty: (id: string | null) => void;
  onHoverProperty: (id: string | null) => void;
}

export function InteractiveMap({
  properties,
  hoveredId,
  selectedId,
  onSelectProperty,
  onHoverProperty
}: InteractiveMapProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mapTone, setMapTone] = useState<'light' | 'terrain'>('light');

  // Format price for markers: e.g. 1,895,000 -> $1.9M, 4600 -> $4.6K
  const formatMarkerPrice = (prop: Property) => {
    if (prop.listingType === 'rent') {
      return `$${(prop.price / 1000).toFixed(1)}k/mo`;
    }
    if (prop.price >= 1000000) {
      return `$${(prop.price / 1000000).toFixed(2).replace(/\.00$/, '')}M`;
    }
    return `$${Math.round(prop.price / 1000)}K`;
  };

  // Compute bounding box coordinates normalized to 0-100%
  const lats = properties.map((p) => p.coordinates.lat);
  const lngs = properties.map((p) => p.coordinates.lng);
  const minLat = Math.min(...lats, 30.0);
  const maxLat = Math.max(...lats, 48.0);
  const minLng = Math.min(...lngs, -123.0);
  const maxLng = Math.max(...lngs, -97.0);

  const getPosition = (prop: Property, index: number) => {
    // Generate well-distributed, realistic layout on map canvas
    const xPositions = [28, 68, 48, 22, 74, 52, 34, 78];
    const yPositions = [32, 62, 42, 28, 70, 46, 26, 66];
    const x = xPositions[index % xPositions.length];
    const y = yPositions[index % yPositions.length];
    return { left: `${x}%`, top: `${y}%` };
  };

  const selectedProperty = properties.find((p) => p.id === selectedId);

  return (
    <div className="relative w-full h-full min-h-[420px] bg-[#E9EBE8] rounded-xl overflow-hidden border border-slate-200 select-none shadow-inner">
      {/* Background Cartography Canvas */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-85"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D1D5DB" strokeWidth="0.5" strokeOpacity="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={mapTone === 'light' ? '#EBF0EC' : '#DFE5DE'} />
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Water bodies */}
        <path
          d="M 0 0 C 80 40 120 180 90 320 C 60 460 140 600 80 800 L 0 800 Z"
          fill="#C4D7E5"
          opacity="0.85"
        />
        <path
          d="M 600 0 C 650 120 720 280 690 420 C 660 560 760 700 800 800 L 1000 800 L 1000 0 Z"
          fill="#C4D7E5"
          opacity="0.65"
        />

        {/* Park & Forest Areas */}
        <path
          d="M 220 120 C 300 130 340 220 300 280 C 260 320 200 290 190 220 Z"
          fill="#D6E6D2"
        />
        <path
          d="M 520 400 C 600 420 640 500 580 560 C 520 600 480 540 470 480 Z"
          fill="#D6E6D2"
        />

        {/* Highway Arteries */}
        <path
          d="M 0 240 Q 300 260 600 230 T 1200 290"
          stroke="#FCD34D"
          strokeWidth="4"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M 380 0 Q 360 400 420 800"
          stroke="#FFFFFF"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 400 0 Q 420 300 680 800"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          fill="none"
        />
        <path
          d="M 120 420 Q 500 440 900 390"
          stroke="#FFFFFF"
          strokeWidth="3"
          fill="none"
        />
      </svg>

      {/* Neighborhood Watermark Labels */}
      <div className="absolute top-8 left-28 text-xs font-semibold uppercase tracking-widest text-slate-400/80 pointer-events-none">
        Queen Anne · Magnolia
      </div>
      <div className="absolute bottom-16 right-36 text-xs font-semibold uppercase tracking-widest text-slate-400/80 pointer-events-none">
        Barton Springs · Westlake
      </div>
      <div className="absolute top-1/2 left-1/3 text-xs font-semibold uppercase tracking-widest text-slate-400/80 pointer-events-none">
        Metro Central Corridor
      </div>

      {/* Map Control Buttons */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 bg-white/95 backdrop-blur-xs rounded-lg shadow-sm border border-slate-200 p-1">
        <button
          type="button"
          onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.8))}
          className="p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded transition-colors"
          title="Zoom In"
          aria-label="Zoom in"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
          className="p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded transition-colors"
          title="Zoom Out"
          aria-label="Zoom out"
        >
          <Minus className="w-4 h-4" />
        </button>
        <div className="w-full h-px bg-slate-200" />
        <button
          type="button"
          onClick={() => setMapTone(mapTone === 'light' ? 'terrain' : 'light')}
          className="p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded transition-colors"
          title="Toggle Terrain"
          aria-label="Toggle terrain"
        >
          <Compass className="w-4 h-4" />
        </button>
      </div>

      {/* Synchronized Price Markers */}
      <div
        className="absolute inset-0 transition-transform duration-300"
        style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
      >
        {properties.map((prop, idx) => {
          const isHovered = hoveredId === prop.id;
          const isSelected = selectedId === prop.id;
          const pos = getPosition(prop, idx);

          return (
            <div
              key={prop.id}
              style={{ left: pos.left, top: pos.top }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <button
                type="button"
                onClick={() => onSelectProperty(isSelected ? null : prop.id)}
                onMouseEnter={() => onHoverProperty(prop.id)}
                onMouseLeave={() => onHoverProperty(null)}
                className={`group px-2.5 py-1 rounded-full text-xs font-bold tabular-nums shadow-md transition-all duration-150 flex items-center gap-1 cursor-pointer focus:outline-none ${
                  isSelected || isHovered
                    ? 'bg-slate-950 text-white ring-2 ring-white scale-110 z-30'
                    : 'bg-white text-slate-900 border border-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <span>{formatMarkerPrice(prop)}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Selected Property Preview Drawer / Card on Map */}
      {selectedProperty && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-80 z-30 bg-white rounded-xl shadow-xl border border-slate-200/90 overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="relative aspect-[16/9] w-full bg-slate-100">
            <Image
              src={selectedProperty.images[0] || '/images/hero_modern_residence_1790542231529.jpg'}
              alt={selectedProperty.title}
              fill
              referrerPolicy="no-referrer"
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => onSelectProperty(null)}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-slate-700 hover:bg-white transition-colors"
              aria-label="Close preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-3.5">
            <div className="flex items-baseline justify-between gap-2 mb-1">
              <span className="text-lg font-bold text-slate-900 tabular-nums">
                {selectedProperty.listingType === 'rent'
                  ? `$${selectedProperty.price.toLocaleString()}/mo`
                  : `$${selectedProperty.price.toLocaleString()}`}
              </span>
              <span className="text-xs text-slate-500 capitalize">
                {selectedProperty.propertyType.replace('-', ' ')}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-2">
              <span>{selectedProperty.beds} beds</span>
              <span>·</span>
              <span>{selectedProperty.baths} baths</span>
              <span>·</span>
              <span>{selectedProperty.sqft.toLocaleString()} sqft</span>
            </div>
            <p className="text-xs text-slate-500 truncate mb-3">
              {selectedProperty.address}, {selectedProperty.city}
            </p>
            <Link
              href={`/property/${selectedProperty.slug}`}
              className="block w-full text-center text-xs font-semibold py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors"
            >
              View Full Details
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

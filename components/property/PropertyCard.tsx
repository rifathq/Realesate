'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Camera } from 'lucide-react';
import { Property } from '@/lib/types';
import { useApp } from '@/lib/store';

interface PropertyCardProps {
  property: Property;
  isHovered?: boolean;
  onHover?: (id: string | null) => void;
  compact?: boolean;
}

export function PropertyCard({
  property,
  isHovered = false,
  onHover,
  compact = false
}: PropertyCardProps) {
  const { isSaved, toggleSave } = useApp();
  const saved = isSaved(property.id);

  const formattedPrice =
    property.listingType === 'rent'
      ? `$${property.price.toLocaleString()}/mo`
      : `$${property.price.toLocaleString()}`;

  const imageSrc = property.images[0] || '/images/hero_modern_residence_1790542231529.jpg';

  return (
    <div
      onMouseEnter={() => onHover && onHover(property.id)}
      onMouseLeave={() => onHover && onHover(null)}
      className={`group bg-white rounded-xl overflow-hidden border transition-all duration-200 flex flex-col ${
        isHovered
          ? 'border-slate-900 shadow-md ring-1 ring-slate-900'
          : 'border-slate-200/90 hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      {/* Photo Frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <Link href={`/property/${property.slug}`} className="block w-full h-full">
          <Image
            src={imageSrc}
            alt={property.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            referrerPolicy="no-referrer"
            className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
          />
        </Link>

        {/* Quiet status tag */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 pointer-events-none">
          {property.status && (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-900 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded shadow-xs">
              {property.status}
            </span>
          )}
        </div>

        {/* Save button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSave(property.id);
          }}
          aria-label={saved ? 'Remove from saved' : 'Save property'}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs hover:bg-white text-slate-700 hover:text-slate-900 transition-colors shadow-xs"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              saved ? 'fill-amber-700 text-amber-700' : 'text-slate-700'
            }`}
          />
        </button>

        {/* Photo count indicator */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-[11px] text-white bg-slate-900/75 backdrop-blur-xs px-2 py-0.5 rounded">
          <Camera className="w-3 h-3" />
          <span className="tabular-nums">{property.images.length}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Price & Primary Details */}
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <span className="text-xl font-bold tracking-tight text-slate-900 tabular-nums">
              {formattedPrice}
            </span>
            <span className="text-xs text-slate-500 capitalize">
              {property.propertyType.replace('-', ' ')}
            </span>
          </div>

          {/* Unboxed Metadata Discipline */}
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 mb-2">
            <span className="font-medium text-slate-900">{property.beds}</span> beds
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="font-medium text-slate-900">{property.baths}</span> baths
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="font-medium text-slate-900 tabular-nums">
              {property.sqft.toLocaleString()}
            </span> sqft
          </div>

          {/* Address & Neighborhood */}
          <Link
            href={`/property/${property.slug}`}
            className="text-xs text-slate-500 hover:text-slate-900 transition-colors line-clamp-1"
          >
            {property.address}, {property.neighborhood}, {property.city}
          </Link>
        </div>

        {/* Open house or recent note if present */}
        {property.openHouseDate && !compact && (
          <div className="mt-3 pt-2.5 border-t border-slate-100 text-xs text-slate-600 flex items-center justify-between">
            <span className="font-medium text-amber-900">Open House</span>
            <span className="text-slate-500 truncate text-[11px]">{property.openHouseDate}</span>
          </div>
        )}
      </div>
    </div>
  );
}

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
  Signpost,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Navigation,
  Share2
} from 'lucide-react';

export default function OpenHousesPage() {
  const { showToast } = useApp();
  const [selectedDay, setSelectedDay] = useState<'all' | 'sat' | 'sun'>('all');
  const [rsvpdIds, setRsvpdIds] = useState<string[]>([]);

  const openHouseProperties = PROPERTIES.filter((p) => {
    if (!p.openHouseDate) return false;
    if (selectedDay === 'sat') return p.openHouseDate.includes('Sat');
    if (selectedDay === 'sun') return p.openHouseDate.includes('Sun');
    return true;
  });

  const toggleRSVP = (id: string, title: string) => {
    setRsvpdIds((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      showToast(exists ? 'RSVP removed' : `RSVP confirmed for ${title}`);
      return updated;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9]">
      <Header />

      <main className="flex-1 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
                Weekend Touring Guide
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Open House Schedule
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Explore walk-in public open houses scheduled for this upcoming weekend.
              </p>
            </div>

            {/* Day Filter Segmented Controls */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setSelectedDay('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  selectedDay === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Entire Weekend ({PROPERTIES.filter((p) => Boolean(p.openHouseDate)).length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedDay('sat')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  selectedDay === 'sat'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Saturday Only
              </button>
              <button
                type="button"
                onClick={() => setSelectedDay('sun')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  selectedDay === 'sun'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sunday Only
              </button>
            </div>
          </div>

          {/* Properties Grid with Open House RSVP Bar */}
          <div className="pt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {openHouseProperties.map((property) => {
                const isRsvpd = rsvpdIds.includes(property.id);

                return (
                  <div
                    key={property.id}
                    className="flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-colors"
                  >
                    {/* Open House Banner Header */}
                    <div className="px-4 py-2.5 bg-amber-50/80 border-b border-amber-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-amber-950 font-bold">
                        <Calendar className="w-3.5 h-3.5 text-amber-800" />
                        <span>{property.openHouseDate}</span>
                      </div>
                      <span className="text-[11px] font-medium text-amber-800">Walk-ins Welcome</span>
                    </div>

                    <PropertyCard property={property} />

                    {/* RSVP and Directions Actions */}
                    <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => toggleRSVP(property.id, property.title)}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                          isRsvpd
                            ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                            : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                      >
                        {isRsvpd ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>RSVP Confirmed</span>
                          </>
                        ) : (
                          <span>RSVP to Open House</span>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          showToast(`Directions to ${property.address} sent to maps`)
                        }
                        className="p-2 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
                        title="Get Directions"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

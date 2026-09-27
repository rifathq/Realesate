'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useApp } from '@/lib/store';
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  CheckCircle2,
  XCircle,
  Plus,
  CalendarPlus,
  AlertCircle
} from 'lucide-react';

export default function AppointmentsPage() {
  const { scheduledTours, cancelTour, showToast } = useApp();

  const handleSyncCalendar = (title: string) => {
    showToast(`Calendar invitation (.ics) created for "${title}"`);
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
                Tour Calendar & Consultations
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Appointments & Tours
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Review your confirmed private in-person walkthroughs and live video tours.
              </p>
            </div>

            <Link
              href="/search"
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white py-2.5 px-4 rounded-lg transition-colors self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule New Tour</span>
            </Link>
          </div>

          <div className="pt-8 space-y-6">
            {scheduledTours.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-xs">
                <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 text-base mb-1">No Appointments Scheduled</h3>
                <p className="text-xs text-slate-500 mb-6">
                  Browse residences on Nestora and click &quot;Schedule a Tour&quot; to book a private walkthrough with an advisor.
                </p>
                <Link
                  href="/search"
                  className="inline-flex items-center gap-2 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <span>Explore Available Homes</span>
                </Link>
              </div>
            ) : (
              scheduledTours.map((tour) => (
                <div
                  key={tour.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:border-slate-300 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{tour.status}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                        {tour.tourType === 'Live Video Tour' ? (
                          <Video className="w-3 h-3 text-blue-600" />
                        ) : (
                          <MapPin className="w-3 h-3 text-slate-600" />
                        )}
                        <span>{tour.tourType}</span>
                      </span>

                      <span className="text-xs text-slate-400">Advisor: {tour.agentName}</span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                      {tour.propertyTitle}
                    </h3>

                    <div className="flex items-center gap-4 text-xs text-slate-600 flex-wrap">
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        {tour.date}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        {tour.timeSlot}
                      </span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {tour.propertyAddress}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleSyncCalendar(tour.propertyTitle)}
                      className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors"
                    >
                      <CalendarPlus className="w-3.5 h-3.5" />
                      <span>Add to Calendar</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => cancelTour(tour.id)}
                      className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-2 rounded-lg transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Cancel</span>
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

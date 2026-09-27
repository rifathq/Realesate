'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useApp } from '@/lib/store';
import {
  Binoculars,
  Sparkles,
  Lock,
  Eye,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

function EarlyAccessContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const activeTab = selectedTab ?? tabParam ?? 'exclusive-drops';
  const setActiveTab = (tab: string) => setSelectedTab(tab);
  const { showToast } = useApp();

  const [emailSub, setEmailSub] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSub.trim()) return;
    setSubSuccess(true);
    showToast('Early Access membership confirmed');
  };

  const exclusiveDrops = [
    {
      id: 'drop-1',
      title: 'The Glass Pavilion at West Sound',
      location: 'Magnolia, Seattle, WA',
      price: '$3,850,000',
      specs: '4 Beds · 4.5 Baths · 4,400 Sq Ft',
      dropDate: 'Thursday at 9:00 AM PST',
      badge: 'Public Launch in 48 Hours',
      image: '/images/hero_modern_residence.jpg'
    },
    {
      id: 'drop-2',
      title: 'Highland Modern Villa with Courtyard Pool',
      location: 'Bouldin Creek, Austin, TX',
      price: '$2,750,000',
      specs: '3 Beds · 3.5 Baths · 3,120 Sq Ft',
      dropDate: 'Friday at 12:00 PM CST',
      badge: 'VIP Only Drop',
      image: '/images/luxury_interior_living.jpg'
    }
  ];

  const premarketListings = [
    {
      id: 'pre-1',
      title: 'Architectural Mid-Century Restored Residence',
      location: 'Capitol Hill, Seattle, WA',
      price: '$1,980,000',
      specs: '3 Beds · 2 Baths · 2,200 Sq Ft',
      status: 'Off-Market Pocket Listing',
      agent: 'Elena Vance'
    },
    {
      id: 'pre-2',
      title: 'Penthouse Loft with Private Rooftop Garden',
      location: 'RiNo Arts District, Denver, CO',
      price: '$1,350,000',
      specs: '2 Beds · 2.5 Baths · 1,850 Sq Ft',
      status: 'Coming Soon to MLS in Nov',
      agent: 'David Chen'
    }
  ];

  const vipOpenHouses = [
    {
      id: 'vip-1',
      title: 'Private Champagne Preview & Architecture Tour',
      property: '742 Evergreen Ridge Way, Seattle, WA',
      date: 'Friday, Oct 2 · 5:30 PM - 7:30 PM',
      capacity: 'Strictly RSVP · 12 Spots Remaining',
      host: 'Elena Vance & Managing Architect'
    },
    {
      id: 'vip-2',
      title: 'Architectural Salon & Twilight Terrace Walkthrough',
      property: '1840 South Congress Ave, Austin, TX',
      date: 'Saturday, Oct 3 · 6:00 PM - 8:00 PM',
      capacity: 'Strictly RSVP · 8 Spots Remaining',
      host: 'Marcus Vance'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9]">
      <Header />

      <main className="flex-1 py-10 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-amber-300 text-xs font-semibold mb-3">
              <Binoculars className="w-3.5 h-3.5" />
              <span>Nestora Insider Tier</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-3">
              Early Access & Private Drops
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Preview architecturally significant properties up to 72 hours before public MLS syndication.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1.5 bg-slate-100 rounded-xl gap-1 max-w-full overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('exclusive-drops')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                  activeTab === 'exclusive-drops'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Exclusive Drops
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('pre-market')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                  activeTab === 'pre-market'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pre-market Listings
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('vip-open-houses')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                  activeTab === 'vip-open-houses'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                VIP Open Houses
              </button>
            </div>
          </div>

          {/* Tab 1: Exclusive Drops */}
          {activeTab === 'exclusive-drops' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {exclusiveDrops.map((drop) => (
                <div
                  key={drop.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all flex flex-col"
                >
                  <div className="relative aspect-16/10 w-full bg-slate-100">
                    <Image
                      src={drop.image}
                      alt={drop.title}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/90 text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>{drop.badge}</span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1">{drop.location}</div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{drop.title}</h3>
                      <div className="text-xl font-extrabold text-slate-900 mb-2">{drop.price}</div>
                      <div className="text-xs text-slate-600">{drop.specs}</div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-amber-800 font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Drops {drop.dropDate}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => showToast('Priority drop alert enabled')}
                        className="text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-lg transition-colors"
                      >
                        Set Priority Alert
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Pre-market Listings */}
          {activeTab === 'pre-market' && (
            <div className="space-y-4">
              {premarketListings.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-amber-800" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                        {listing.status}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {listing.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {listing.location} · {listing.specs}
                    </p>
                    <div className="text-lg font-extrabold text-slate-900">{listing.price}</div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => showToast(`Requested confidential broker package from ${listing.agent}`)}
                      className="px-4 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      Request Confidential Packet
                    </button>
                    <Link
                      href="/my-agent"
                      className="px-4 py-2.5 bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg hover:bg-slate-200 text-center transition-colors"
                    >
                      Ask Advisor
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: VIP Open Houses */}
          {activeTab === 'vip-open-houses' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vipOpenHouses.map((vip) => (
                <div
                  key={vip.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/80">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                      <span>Private Invitation Only</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{vip.title}</h3>
                    <p className="text-xs text-slate-600 font-medium">{vip.property}</p>
                    <div className="text-xs text-slate-500">
                      Date & Time: <span className="font-semibold text-slate-900">{vip.date}</span>
                    </div>
                    <div className="text-xs text-slate-500">
                      Host: <span className="font-semibold text-slate-900">{vip.host}</span>
                    </div>
                    <div className="text-[11px] text-amber-800 font-medium">{vip.capacity}</div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => showToast('VIP Pass RSVP confirmed')}
                      className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Claim VIP Walkthrough Pass</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Membership Access Card */}
          <div className="mt-16 bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xl">
            <h2 className="text-xl sm:text-3xl font-extrabold mb-3">
              Join Nestora Early Access
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto mb-6">
              Get immediate alerts when pre-market residences matching your target ZIP codes are submitted to our broker desk.
            </p>

            {subSuccess ? (
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-4 py-2.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4" />
                <span>You are on the VIP Early Access list!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={emailSub}
                  onChange={(e) => setEmailSub(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors whitespace-nowrap"
                >
                  Request Pass
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function EarlyAccessPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading Early Access...</div>}>
      <EarlyAccessContent />
    </Suspense>
  );
}

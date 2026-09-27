'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useApp } from '@/lib/store';
import {
  TrendingUp,
  CheckCircle2,
  DollarSign,
  Camera,
  Layers,
  Award,
  ArrowRight,
  ShieldCheck,
  Search
} from 'lucide-react';

export default function SellPage() {
  const { showToast } = useApp();

  // Valuation Tool State
  const [address, setAddress] = useState('');
  const [beds, setBeds] = useState('3');
  const [baths, setBaths] = useState('2.5');
  const [sqft, setSqft] = useState('2400');
  const [condition, setCondition] = useState<'move-in' | 'updated' | 'needs-work'>('updated');
  const [valuationResult, setValuationResult] = useState<{
    low: number;
    high: number;
    mid: number;
    marketTemp: string;
    avgDaysOnMarket: number;
  } | null>(null);

  // Consultation Form State
  const [consultationSubmitted, setConsultationSubmitted] = useState(false);
  const [sellerName, setSellerName] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [sellerEmail, setSellerEmail] = useState('');

  const handleCalculateValue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      showToast('Please enter your property address');
      return;
    }

    const baseSqft = Number(sqft) || 2200;
    const rate = condition === 'move-in' ? 560 : condition === 'updated' ? 510 : 440;
    const mid = baseSqft * rate;
    const low = Math.round(mid * 0.95);
    const high = Math.round(mid * 1.06);

    setValuationResult({
      low,
      high,
      mid,
      marketTemp: 'Seller Favored · High Demand',
      avgDaysOnMarket: 14
    });

    showToast('Valuation estimate generated');
  };

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultationSubmitted(true);
    showToast('Valuation consultation request received');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9]">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2 block">
              Sell With Nestora
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-4 text-balance">
              Sell your home for more, while paying half the listing fee.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Full-service representation by licensed top-producing advisors, HDR architectural media, and 1.5% listing commission that saves thousands.
            </p>

            {/* Address Valuation Entry Card */}
            <div id="valuation" className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 text-left max-w-3xl mx-auto">
              <h2 className="text-lg font-bold text-slate-900 mb-1">Instant Home Valuation Estimate</h2>
              <p className="text-xs text-slate-500 mb-6">
                Enter your property details below to see an immediate automated valuation range based on local comps.
              </p>

              <form onSubmit={handleCalculateValue} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">Property Street Address</label>
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 742 Evergreen Ridge Way, Seattle, WA"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Bedrooms</label>
                    <select
                      value={beds}
                      onChange={(e) => setBeds(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium"
                    >
                      <option value="1">1 Bed</option>
                      <option value="2">2 Beds</option>
                      <option value="3">3 Beds</option>
                      <option value="4">4 Beds</option>
                      <option value="5">5+ Beds</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Bathrooms</label>
                    <select
                      value={baths}
                      onChange={(e) => setBaths(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium"
                    >
                      <option value="1">1 Bath</option>
                      <option value="1.5">1.5 Baths</option>
                      <option value="2">2 Baths</option>
                      <option value="2.5">2.5 Baths</option>
                      <option value="3">3+ Baths</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Square Footage</label>
                    <input
                      type="number"
                      value={sqft}
                      onChange={(e) => setSqft(e.target.value)}
                      placeholder="Sqft"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Condition</label>
                    <select
                      value={condition}
                      onChange={(e) => setCondition(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium"
                    >
                      <option value="move-in">Turnkey Luxury</option>
                      <option value="updated">Recently Updated</option>
                      <option value="needs-work">Original / Needs Work</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm py-3 px-6 rounded-lg transition-colors shadow-xs"
                >
                  Calculate My Home Value
                </button>
              </form>

              {/* Valuation Result */}
              {valuationResult && (
                <div className="mt-6 pt-6 border-t border-slate-200 animate-in fade-in duration-200">
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1 font-semibold">
                      Estimated Market Valuation
                    </div>
                    <div className="text-3xl font-extrabold text-slate-900 tabular-nums mb-2">
                      ${valuationResult.low.toLocaleString()} – ${valuationResult.high.toLocaleString()}
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-slate-600 mb-4">
                      <div>
                        Midpoint Estimate:{' '}
                        <span className="font-bold text-slate-900">
                          ${valuationResult.mid.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        Market Climate:{' '}
                        <span className="font-bold text-emerald-800">
                          {valuationResult.marketTemp}
                        </span>
                      </div>
                      <div>
                        Avg Days on Market:{' '}
                        <span className="font-bold text-slate-900">
                          {valuationResult.avgDaysOnMarket} days
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-amber-50 text-amber-900 rounded-lg text-xs border border-amber-200">
                      Estimated savings with Nestora 1.5% fee vs 3% traditional:{' '}
                      <span className="font-bold text-amber-950">
                        ${Math.round(valuationResult.mid * 0.015).toLocaleString()} back in your pocket.
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Transparent Fee Comparison */}
        <section className="py-16 md:py-20 bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1 block">
                The Nestora Advantage
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Transparent Economics. Uncompromising Quality.
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                We believe exceptional real estate service shouldn’t come with inflated commissions.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-700">
                  <tr>
                    <th className="py-4 px-6 border-b border-slate-200">Service Included</th>
                    <th className="py-4 px-6 border-b border-slate-200 text-amber-900 bg-amber-50/50">
                      Nestora Concierge
                    </th>
                    <th className="py-4 px-6 border-b border-slate-200 text-slate-500">
                      Traditional Brokerage
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 text-xs sm:text-sm">
                  <tr>
                    <td className="py-3.5 px-6 font-medium">Listing Commission Fee</td>
                    <td className="py-3.5 px-6 font-bold text-amber-900 bg-amber-50/30">1.5%</td>
                    <td className="py-3.5 px-6 text-slate-500">2.5% – 3.0%</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-6 font-medium">Professional Architectural Photography</td>
                    <td className="py-3.5 px-6 text-emerald-800 font-semibold bg-amber-50/30">✓ Included</td>
                    <td className="py-3.5 px-6 text-slate-500">Varies by agent</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-6 font-medium">3D Interactive Virtual Twin Scan</td>
                    <td className="py-3.5 px-6 text-emerald-800 font-semibold bg-amber-50/30">✓ Included</td>
                    <td className="py-3.5 px-6 text-slate-500">Additional fee or omitted</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-6 font-medium">Targeted Social & Search Campaigns</td>
                    <td className="py-3.5 px-6 text-emerald-800 font-semibold bg-amber-50/30">✓ Included</td>
                    <td className="py-3.5 px-6 text-slate-500">Basic MLS syndication</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-6 font-medium">Dedicated Lead Broker Negotiation</td>
                    <td className="py-3.5 px-6 text-emerald-800 font-semibold bg-amber-50/30">✓ Included</td>
                    <td className="py-3.5 px-6 text-slate-500">✓ Included</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Schedule In-Home Consultation Form */}
        <section className="py-16 md:py-20 border-b border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
                  Personalized Pricing Review
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  Request a Free Valuation Consultation
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Meet with a Nestora local principal broker to inspect property upgrades, review recent off-market comps, and discuss ideal timing.
                </p>
              </div>

              {consultationSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <h3 className="font-bold text-emerald-950 text-base mb-1">
                    Consultation Request Submitted
                  </h3>
                  <p className="text-xs text-emerald-800 mb-4 max-w-md mx-auto">
                    Thank you, {sellerName}. A senior Nestora broker will contact you shortly at {sellerPhone || sellerEmail} to confirm your appointment.
                  </p>
                  <button
                    type="button"
                    onClick={() => setConsultationSubmitted(false)}
                    className="text-xs font-semibold px-4 py-2 bg-white text-emerald-900 border border-emerald-300 rounded-lg hover:bg-emerald-100 transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleConsultationSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={sellerName}
                      onChange={(e) => setSellerName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={sellerPhone}
                        onChange={(e) => setSellerPhone(e.target.value)}
                        placeholder="(206) 555-0192"
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={sellerEmail}
                        onChange={(e) => setSellerEmail(e.target.value)}
                        placeholder="jane@example.com"
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Ideal Selling Timeline
                    </label>
                    <select className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium">
                      <option>As soon as possible (1–30 days)</option>
                      <option>Within 1–3 months</option>
                      <option>Within 3–6 months</option>
                      <option>Just curious about home value</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm py-3 px-4 rounded-xl transition-colors shadow-xs"
                  >
                    Schedule Free Valuation Consultation
                  </button>

                  <p className="text-[11px] text-slate-400 text-center">
                    Zero obligation · Confidential pricing assessment · Trusted licensed advisors
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

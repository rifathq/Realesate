'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useApp } from '@/lib/store';
import {
  Home,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  Plus,
  ArrowUpRight,
  Sparkles,
  PieChart,
  Calendar,
  Layers,
  MapPin
} from 'lucide-react';

export default function MyHomesPage() {
  const { showToast } = useApp();
  const [claimAddress, setClaimAddress] = useState('');
  const [isClaiming, setIsClaiming] = useState(false);

  const homeDetails = {
    address: '2840 4th Ave W, Seattle, WA 98119',
    neighborhood: 'Queen Anne',
    beds: 4,
    baths: 3.5,
    sqft: 2840,
    yearBuilt: 2018,
    purchasePrice: 1420000,
    purchaseDate: 'June 2021',
    estimatedValue: 1695000,
    valueChange1Yr: '+4.8%',
    estimatedEquity: 745000,
    loanBalance: 950000,
    monthlyPayment: 5420
  };

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimAddress.trim()) return;
    showToast(`Ownership claim verification sent for ${claimAddress}`);
    setClaimAddress('');
    setIsClaiming(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9]">
      <Header />

      <main className="flex-1 py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
                Owner Dashboard
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                My Homes & Equity
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Track your property value, accrued equity, neighborhood comps, and refinance potential.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsClaiming(!isClaiming)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white py-2.5 px-4 rounded-lg transition-colors self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Claim Another Home</span>
            </button>
          </div>

          {/* Claim Modal / Form */}
          {isClaiming && (
            <form
              onSubmit={handleClaim}
              className="mt-6 p-6 bg-white rounded-2xl border border-slate-200 shadow-xs animate-in fade-in duration-200"
            >
              <h3 className="font-bold text-slate-900 text-sm mb-1">Claim a Property</h3>
              <p className="text-xs text-slate-500 mb-4">
                Verify ownership of your residence to unlock private tax assessment insights and customized seller reports.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  required
                  placeholder="Enter complete street address (e.g., 1204 Pine St, Seattle, WA)"
                  value={claimAddress}
                  onChange={(e) => setClaimAddress(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                >
                  Verify Ownership
                </button>
              </div>
            </form>
          )}

          {/* Primary Claimed Residence Card */}
          <div className="pt-8">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              {/* Top Banner with Image & Specs */}
              <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-100 relative shrink-0">
                    <Image
                      src="/images/hero_modern_residence.jpg"
                      alt={homeDetails.address}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 mb-1.5">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified Owner</span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      {homeDetails.address}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {homeDetails.beds} Beds · {homeDetails.baths} Baths · {homeDetails.sqft.toLocaleString()} Sq Ft · Built {homeDetails.yearBuilt}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 self-start md:self-auto">
                  <Link
                    href="/sell"
                    className="text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 px-4 py-2.5 rounded-lg transition-colors"
                  >
                    View Valuation Report
                  </Link>
                  <Link
                    href="/mortgage"
                    className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2.5 rounded-lg transition-colors"
                  >
                    Refinance Options
                  </Link>
                </div>
              </div>

              {/* Financial Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-slate-50/50">
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Estimated Market Value</span>
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900">
                    ${homeDetails.estimatedValue.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                    {homeDetails.valueChange1Yr} in past 12 mos
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Estimated Equity</span>
                    <PieChart className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900">
                    ${homeDetails.estimatedEquity.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    44% of total home value
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Remaining Principal</span>
                    <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900">
                    ${homeDetails.loanBalance.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    At 4.75% fixed rate
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Est. Monthly Payment</span>
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900">
                    ${homeDetails.monthlyPayment.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Includes P&I, taxes, and ins.
                  </div>
                </div>
              </div>

              {/* Neighborhood Insights & Comparable Sales */}
              <div className="p-6 sm:p-8 bg-white border-t border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm mb-4">
                  Recent Nearby Comparable Sales in Queen Anne
                </h3>
                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-slate-800 block">2910 5th Ave W</span>
                      <span className="text-[11px] text-slate-500">4 beds · 3 baths · 2,650 sq ft · Sold 14 days ago</span>
                    </div>
                    <span className="font-extrabold text-slate-900">$1,725,000</span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-slate-800 block">715 West Garfield St</span>
                      <span className="text-[11px] text-slate-500">3 beds · 2.5 baths · 2,400 sq ft · Sold 28 days ago</span>
                    </div>
                    <span className="font-extrabold text-slate-900">$1,610,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

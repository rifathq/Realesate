'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useApp } from '@/lib/store';
import {
  ClipboardList,
  ShieldCheck,
  Building,
  KeyRound,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Users,
  Search,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function ListForRentPage() {
  const { showToast } = useApp();

  // Form states
  const [address, setAddress] = useState('');
  const [propertyType, setPropertyType] = useState('single_family');
  const [beds, setBeds] = useState('3');
  const [baths, setBaths] = useState('2');
  const [sqft, setSqft] = useState('1850');
  const [tier, setTier] = useState<'standard' | 'managed'>('standard');
  const [monthlyRent, setMonthlyRent] = useState(3400);
  const [submitted, setSubmitted] = useState(false);

  const calculateEstimate = () => {
    const base = Number(beds) * 850 + Number(baths) * 400 + (Number(sqft) || 1000) * 0.8;
    return Math.round(base / 50) * 50;
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      showToast('Please enter a property address');
      return;
    }
    const est = calculateEstimate();
    setMonthlyRent(est);
    showToast(`Rent estimated at $${est.toLocaleString()}/month`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your rental listing application has been submitted to our leasing desk.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9]">
      <Header />

      <main className="flex-1 py-10 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-amber-300 text-xs font-semibold mb-4">
              <ClipboardList className="w-3.5 h-3.5" />
              <span>Nestora Landlord & Leasing Hub</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
              List Your Home for Rent
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Reach thousands of qualified, pre-screened tenants across high-demand urban and suburban markets with zero upfront fees.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left column: Rental Valuation & Submission Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 mb-1">
                Property Details & Rent Estimator
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Tell us about your home to compute real-time rental yield and syndication reach.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Listing Application Received!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Our leasing director is conducting comparable market analysis for <span className="font-semibold text-slate-800">{address}</span>. We will follow up via email within 2 business hours.
                  </p>
                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-lg transition-colors"
                    >
                      List Another Property
                    </button>
                    <Link
                      href="/renter-dashboard"
                      className="text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 px-4 py-2.5 rounded-lg transition-colors"
                    >
                      Go to Dashboard
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Property Address
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. 1420 5th Ave, Seattle, WA"
                        required
                        className="w-full pl-3.5 pr-24 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                      <button
                        type="button"
                        onClick={handleCalculate}
                        className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-slate-900 text-white text-xs font-medium rounded hover:bg-slate-800 transition-colors"
                      >
                        Estimate
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Bedrooms</label>
                      <select
                        value={beds}
                        onChange={(e) => setBeds(e.target.value)}
                        className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      >
                        <option value="1">1 Bed</option>
                        <option value="2">2 Beds</option>
                        <option value="3">3 Beds</option>
                        <option value="4">4 Beds</option>
                        <option value="5">5+ Beds</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Bathrooms</label>
                      <select
                        value={baths}
                        onChange={(e) => setBaths(e.target.value)}
                        className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      >
                        <option value="1">1 Bath</option>
                        <option value="1.5">1.5 Baths</option>
                        <option value="2">2 Baths</option>
                        <option value="2.5">2.5 Baths</option>
                        <option value="3">3+ Baths</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Square Feet</label>
                      <input
                        type="number"
                        value={sqft}
                        onChange={(e) => setSqft(e.target.value)}
                        className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                  </div>

                  {/* Rent Yield Card */}
                  <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-amber-900/80 font-medium">Estimated Monthly Rent</div>
                      <div className="text-2xl font-extrabold text-amber-950">
                        ${monthlyRent.toLocaleString()}<span className="text-xs font-normal text-slate-500"> /mo</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                        <TrendingUp className="w-3 h-3" /> 98.4% Occupancy Rate
                      </span>
                    </div>
                  </div>

                  {/* Service Plan Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Select Listing Tier
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div
                        onClick={() => setTier('standard')}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          tier === 'standard'
                            ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-slate-900">Self-Managed MLS</span>
                          <span className="text-[11px] font-medium text-slate-500">Free syndication</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Direct inquiries, standard background checks, and digital lease templates.
                        </p>
                      </div>

                      <div
                        onClick={() => setTier('managed')}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          tier === 'managed'
                            ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-slate-900">Nestora Full-Service</span>
                          <span className="text-[11px] font-bold text-amber-700">6% monthly</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Pro photography, agent-guided showings, 24/7 maintenance dispatch, and rent guarantee.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Submit Rental Listing</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-[11px] text-slate-400 text-center mt-2">
                      No commitment required. A verified regional broker will contact you to confirm details.
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Right column: Value Props & Why Nestora */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <h3 className="font-bold text-slate-900 text-sm mb-4">
                  Why Landlords Choose Nestora
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Triple-Screened Tenants</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        TransUnion credit reports, criminal background scans, eviction records, and automated employer income verification.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">30-Day Fill Guarantee</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        If your property isn&apos;t leased to a qualified tenant within 30 days of listing, we cover two weeks of rent.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Direct ACH Rent Deposits</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Automated payments deposited directly into your bank on the 1st of every month with zero merchant transaction surcharges.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              <div className="bg-slate-900 text-white rounded-2xl p-6">
                <div className="text-xs font-semibold text-amber-400 mb-1 uppercase tracking-wider">
                  Nestora Leasing Network
                </div>
                <div className="text-2xl font-extrabold mb-4">
                  Over 14,000+ Active Renters
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Avg Days on Market</span>
                    <span className="font-bold text-base text-white">9 Days</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">On-Time Payment</span>
                    <span className="font-bold text-base text-white">99.2%</span>
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

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useApp } from '@/lib/store';
import { PROPERTIES } from '@/lib/data';
import { PropertyCard } from '@/components/property/PropertyCard';
import {
  Building2,
  FileText,
  KeyRound,
  CheckCircle2,
  Clock,
  Wrench,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Plus
} from 'lucide-react';

export default function RenterDashboardPage() {
  const { showToast } = useApp();
  const [maintenanceOpen, setMaintenanceOpen] = useState(false);
  const [issueTitle, setIssueTitle] = useState('');

  const rentalProperties = PROPERTIES.filter((p) => p.listingType === 'rent');

  const handleMaintenanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueTitle.trim()) return;
    showToast(`Maintenance ticket created: "${issueTitle.trim()}"`);
    setIssueTitle('');
    setMaintenanceOpen(false);
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
                Tenant Portal
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Renter Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Manage your active leases, submitted tenant screening applications, and maintenance dispatches.
              </p>
            </div>

            <Link
              href="/search?mode=rent"
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white py-2.5 px-4 rounded-lg transition-colors self-start sm:self-auto"
            >
              <KeyRound className="w-4 h-4" />
              <span>Browse Rentals</span>
            </Link>
          </div>

          <div className="pt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Active Lease & Applications */}
            <div className="lg:col-span-2 space-y-6">
              {/* Active Lease Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      Active Lease
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">Expires: May 31, 2027</span>
                </div>

                <div className="py-5">
                  <h3 className="text-lg font-bold text-slate-900">
                    The Modernist at Belltown · Residence 14B
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    820 Bell St, Seattle, WA 98121 · 2 Beds · 2 Baths
                  </p>

                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Monthly Rent</span>
                      <span className="font-bold text-slate-900 text-base">$3,650 /mo</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Next Due Date</span>
                      <span className="font-bold text-slate-900 text-base">Nov 1, 2026</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Auto-Pay</span>
                      <span className="font-bold text-emerald-700 text-base">Enabled (ACH)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setMaintenanceOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-lg transition-colors"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Request Maintenance</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast('Lease Agreement PDF downloaded')}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3.5 py-2 rounded-lg transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Digital Lease</span>
                  </button>
                </div>
              </div>

              {/* Maintenance Ticket Modal */}
              {maintenanceOpen && (
                <form
                  onSubmit={handleMaintenanceSubmit}
                  className="p-6 bg-white rounded-2xl border border-amber-200 shadow-sm animate-in fade-in duration-150"
                >
                  <h4 className="font-bold text-slate-900 text-sm mb-1">New Maintenance Dispatch</h4>
                  <p className="text-xs text-slate-500 mb-4">
                    Describe the issue. Your building superintendent will be notified immediately.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Master bathroom sink drain draining slowly"
                      value={issueTitle}
                      onChange={(e) => setIssueTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setMaintenanceOpen(false)}
                        className="px-3 py-1.5 text-xs font-medium text-slate-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
                      >
                        Submit Request
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Submitted Applications Tracker */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                <h3 className="font-bold text-slate-900 text-base mb-4">
                  Rental Applications Status
                </h3>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">
                          1420 5th Ave, Seattle
                        </h4>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3" /> Approved
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        TransUnion Background Verified · Security Deposit Received
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => showToast('Rental lease documents sent for electronic signature')}
                      className="text-xs font-semibold text-amber-800 hover:text-amber-900 self-start sm:self-auto"
                    >
                      Sign Documents &rarr;
                    </button>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">
                          910 Pine St, Capitol Hill
                        </h4>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                          <Clock className="w-3 h-3" /> Under Review
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Application submitted Sept 24 · Landlord reviewing income proof
                      </p>
                    </div>

                    <span className="text-xs text-slate-400">Est. decision in 24 hrs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Quick Rental Search & Tools */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <h3 className="font-bold text-slate-900 text-sm mb-4">
                  Renters Insurance & Perks
                </h3>
                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>$100,000 Personal Liability Policy Active</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Experian RentBureau Credit Reporting Active</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href="/list-for-rent"
                    className="block text-center text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 py-2.5 rounded-lg transition-colors"
                  >
                    Have a Property? List for Rent
                  </Link>
                </div>
              </div>

              {/* Recommended Rentals */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
                  Featured Available Rentals
                </h4>
                <div className="space-y-4">
                  {rentalProperties.slice(0, 2).map((property) => (
                    <div key={property.id} className="scale-95 origin-top">
                      <PropertyCard property={property} />
                    </div>
                  ))}
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

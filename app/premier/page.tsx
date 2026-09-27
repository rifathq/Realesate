'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useApp } from '@/lib/store';
import {
  Gem,
  Award,
  Sparkles,
  Camera,
  Users,
  Shield,
  Key,
  Compass,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Crown
} from 'lucide-react';

export default function PremierPage() {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');
  const [clientType, setClientType] = useState<'buyer' | 'seller'>('seller');
  const [requested, setRequested] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setRequested(true);
    showToast('Your Nestora Premier consultation request has been submitted.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9]">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-slate-950 text-white py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <Image
              src="/images/hero_modern_residence.jpg"
              alt="Nestora Premier Luxury Architecture"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
          </div>

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-6">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>The Luxury & Architectural Advisory</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              Nestora Premier
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed mb-10">
              A bespoke real-estate advisory for properties of distinction, architecturally significant residences, and private off-market collections.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#consultation"
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition-colors flex items-center gap-2 shadow-lg shadow-amber-400/20"
              >
                <span>Request Private Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/search?mode=buy"
                className="bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 font-semibold px-6 py-3 rounded-xl text-xs sm:text-sm transition-colors"
              >
                Browse Curated Portfolio
              </Link>
            </div>
          </div>
        </section>

        {/* Core Pillars */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800 block mb-2">
                Uncompromising Standards
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Designed for Discerning Buyers & Sellers
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-800 flex items-center justify-center mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Top 1% Principal Advisors
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Every Premier client is partnered with a vetted Managing Principal with over a decade of high-value transactional tenure and discretion.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center mb-6">
                  <Camera className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Editorial-Grade Media
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Architectural photography, FAA-licensed twilight aerial cinematography, 3D LiDAR space capture, and targeted global syndication.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-800 flex items-center justify-center mb-6">
                  <Key className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Private Off-Market Network
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Confidential pocket listings and discreet direct introductions connecting pre-qualified buyers before properties ever hit the MLS.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Capture Section */}
        <section id="consultation" className="py-16 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
              <div className="max-w-xl mx-auto text-center">
                <div className="w-10 h-10 rounded-full bg-amber-400/10 text-amber-400 flex items-center justify-center mx-auto mb-4">
                  <Gem className="w-5 h-5" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
                  Initiate a Confidential Discussion
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mb-8">
                  Whether selling an architectural landmark or seeking an exclusive private property, our Premier Advisory handles every inquiry with strict confidentiality.
                </p>

                {requested ? (
                  <div className="py-8 bg-slate-900/60 rounded-2xl border border-emerald-500/30 p-6 text-center">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-white mb-1">
                      Consultation Request Confirmed
                    </h3>
                    <p className="text-xs text-slate-300 max-w-sm mx-auto">
                      A Managing Principal will reach out to <span className="font-semibold text-white">{email}</span> within 2 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    <div className="flex gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800">
                      <button
                        type="button"
                        onClick={() => setClientType('seller')}
                        className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
                          clientType === 'seller' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        I Am Selling a Property
                      </button>
                      <button
                        type="button"
                        onClick={() => setClientType('buyer')}
                        className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
                          clientType === 'buyer' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        I Am Seeking a Residence
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className="flex-1 px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-500"
                      />
                      <button
                        type="submit"
                        className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-colors whitespace-nowrap"
                      >
                        Request Advisory
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-500 text-center pt-2">
                      Non-disclosure agreements executed upon initial intake. Strict privacy guaranteed.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

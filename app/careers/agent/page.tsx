'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useApp } from '@/lib/store';
import {
  Briefcase,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Shield,
  Laptop,
  Coins,
  Send
} from 'lucide-react';

export default function AgentCareerPage() {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    market: 'Seattle, WA',
    experience: '3-5 years',
    licenseNumber: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your agent partnership application has been received!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9]">
      <Header />

      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 text-amber-300 text-xs font-semibold mb-4">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Nestora Partner Network</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
              Build Your Practice with Nestora
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Join an elite network of modern real-estate professionals powered by verified buyer leads, industry-leading splits, and proprietary AI pricing tools.
            </p>
          </div>

          {/* Value Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-4">
                <Coins className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">
                90/10 Tiered Commission Splits
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Keep what you earn with transparent fee caps and no hidden desk fees, franchise taxes, or technology dues.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">
                Pre-Screened Live Inquiries
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Connect directly with qualified buyers actively scheduling walkthroughs through the Nestora marketplace.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">
                Full Concierge Marketing
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Automated social campaigns, luxury listing kits, and dedicated transaction coordinators handling paperwork from offer to close.
              </p>
            </div>
          </div>

          {/* Form & Application */}
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-slate-900">
                Partner Inquiry Form
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Strictly confidential. A regional Managing Director will reach out for a 15-minute briefing.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Application Submitted</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you for your interest in joining Nestora. We will review your credentials and contact you within 24 business hours.
                </p>
                <div className="pt-4">
                  <Link
                    href="/"
                    className="inline-flex text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 px-5 py-2.5 rounded-lg transition-colors"
                  >
                    Return to Homepage
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Marcus Vance"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="marcus@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(206) 555-0192"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Market</label>
                    <select
                      value={formData.market}
                      onChange={(e) => setFormData({ ...formData, market: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value="Seattle, WA">Seattle, WA</option>
                      <option value="Austin, TX">Austin, TX</option>
                      <option value="Denver, CO">Denver, CO</option>
                      <option value="San Francisco, CA">San Francisco, CA</option>
                      <option value="Chicago, IL">Chicago, IL</option>
                      <option value="Portland, OR">Portland, OR</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Experience Level</label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value="1-2 years">1-2 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5-10 years">5-10 years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Real Estate License #</label>
                  <input
                    type="text"
                    required
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    placeholder="e.g. WA-BR-92841"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Partner Application</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

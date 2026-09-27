'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PropertyCard } from '@/components/property/PropertyCard';
import { AGENTS, PROPERTIES } from '@/lib/data';
import { useApp } from '@/lib/store';
import {
  Star,
  Award,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Send
} from 'lucide-react';

export default function AgentProfilePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const agent = AGENTS.find((a) => a.slug === resolvedParams.slug);

  if (!agent) {
    notFound();
  }

  const { showToast } = useApp();
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [message, setMessage] = useState('');

  const agentProperties = PROPERTIES.filter((p) => p.agentId === agent.id);

  const testimonials = [
    {
      author: 'David & Sarah Lindqvist',
      type: 'Buyer in Queen Anne',
      text: `${agent.name} was calm, detail-oriented, and profoundly knowledgeable about construction and historical foundations. We secured our dream home against four competing offers with zero drama.`,
      rating: 5
    },
    {
      author: 'Marcus & Jessica Vance',
      type: 'Seller in Westlake Hills',
      text: `Listing with Nestora and ${agent.name} saved us over $26,000 in broker commissions while setting a neighborhood price record in 11 days. The architectural media presentation was extraordinary.`,
      rating: 5
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    showToast(`Inquiry sent to ${agent.name}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9]">
      <Header />

      <main className="flex-1">
        {/* Profile Header */}
        <section className="bg-white border-b border-slate-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-slate-100 shrink-0 border-2 border-slate-200 shadow-sm">
                  <Image
                    src={agent.image}
                    alt={agent.name}
                    fill
                    referrerPolicy="no-referrer"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                      {agent.name}
                    </h1>
                    <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                      {agent.license}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{agent.title}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1 text-amber-700 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {agent.rating} ({agent.reviewsCount} verified reviews)
                    </span>
                    <span>·</span>
                    <span>Languages: {agent.languages.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Direct Quick Contact Buttons */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <a
                  href={`tel:${agent.phone}`}
                  className="flex-1 md:flex-none text-center text-xs font-semibold py-2.5 px-4 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 transition-colors"
                >
                  {agent.phone}
                </a>
                <a
                  href="#contact-form"
                  className="flex-1 md:flex-none text-center text-xs font-semibold py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors"
                >
                  Message {agent.name.split(' ')[0]}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Content Layout */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left Column */}
              <div className="lg:col-span-8 space-y-10">
                {/* Stats Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-xs">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Career Sales</span>
                    <span className="text-lg font-bold text-slate-900 tabular-nums">
                      {agent.closedSalesVolume}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Experience</span>
                    <span className="text-lg font-bold text-slate-900 tabular-nums">
                      {agent.experienceYears} Years
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Active Listings</span>
                    <span className="text-lg font-bold text-slate-900 tabular-nums">
                      {agent.activeListingsCount} Properties
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Client Rating</span>
                    <span className="text-lg font-bold text-slate-900 tabular-nums">
                      {agent.rating} / 5.0
                    </span>
                  </div>
                </div>

                {/* Biography */}
                <div>
                  <h2 className="text-lg font-bold text-slate-900 mb-3">About {agent.name}</h2>
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line mb-4">
                    {agent.bio}
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Prior to joining Nestora, {agent.name} advised regional architectural firms and institutional private clients. Specializing in high-performance homes and neighborhood valuation intelligence, every transaction is handled with rigorous analytical underwriting and utmost discretion.
                  </p>
                </div>

                {/* Specialties & Areas */}
                <div className="pt-6 border-t border-slate-200">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">Service Focus & Neighborhoods</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <span className="text-slate-400 uppercase tracking-wider block mb-2 font-semibold text-[11px]">
                        Primary Specialties
                      </span>
                      <ul className="space-y-1 text-slate-800 font-medium">
                        {agent.specialties.map((s) => (
                          <li key={s} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <span className="text-slate-400 uppercase tracking-wider block mb-2 font-semibold text-[11px]">
                        Service Markets
                      </span>
                      <ul className="space-y-1 text-slate-800 font-medium">
                        {agent.serviceAreas.map((a) => (
                          <li key={a} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Client Testimonials */}
                <div className="pt-6 border-t border-slate-200">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">Client Endorsements</h2>
                  <div className="space-y-4">
                    {testimonials.map((test, i) => (
                      <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 text-xs">
                        <div className="flex items-center gap-1 text-amber-500 mb-2">
                          {[...Array(test.rating)].map((_, idx) => (
                            <Star key={idx} className="w-3.5 h-3.5 fill-amber-500" />
                          ))}
                        </div>
                        <p className="text-slate-700 text-sm italic mb-3 leading-relaxed">
                          &ldquo;{test.text}&rdquo;
                        </p>
                        <div className="flex items-center justify-between text-slate-500">
                          <span className="font-semibold text-slate-900">{test.author}</span>
                          <span>{test.type}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Listings Represented */}
                {agentProperties.length > 0 && (
                  <div className="pt-6 border-t border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">
                      Active Listings Represented by {agent.name}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {agentProperties.map((p) => (
                        <PropertyCard key={p.id} property={p} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Contact Message Form */}
              <div id="contact-form" className="lg:col-span-4">
                <div className="sticky top-20 bg-white rounded-2xl border border-slate-200 shadow-md p-6">
                  <h3 className="font-bold text-slate-900 text-base mb-1">
                    Connect with {agent.name}
                  </h3>
                  <p className="text-xs text-slate-500 mb-6">
                    Inquire about represented homes, neighborhood market analysis, or list your property.
                  </p>

                  {contactSubmitted ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                      <h4 className="font-bold text-emerald-950 text-sm mb-1">Message Sent</h4>
                      <p className="text-xs text-emerald-800 mb-3">
                        Thank you, {userName}. {agent.name} will respond to you directly via {userEmail || userPhone}.
                      </p>
                      <button
                        type="button"
                        onClick={() => setContactSubmitted(false)}
                        className="text-xs font-semibold px-3 py-1.5 bg-white text-emerald-900 border border-emerald-300 rounded-lg hover:bg-emerald-100 transition-colors"
                      >
                        Send Another Note
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-3.5 text-xs">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="Your Name"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          placeholder="your.email@example.com"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Phone (Optional)</label>
                        <input
                          type="tel"
                          value={userPhone}
                          onChange={(e) => setUserPhone(e.target.value)}
                          placeholder="(555) 000-0000"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">How can {agent.name.split(' ')[0]} help?</label>
                        <textarea
                          rows={4}
                          required
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="I am interested in scheduling a private tour or discussing current pricing trends..."
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm py-2.5 px-4 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </button>

                      <p className="text-[11px] text-slate-400 text-center">
                        Direct broker transmission · Protected by Nestora Client Privacy
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

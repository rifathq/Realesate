'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AGENTS } from '@/lib/data';
import { Search, Star, Award, Phone, Mail, ArrowRight } from 'lucide-react';

export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');

  const specialties = [
    'all',
    'Modern Architecture',
    'Luxury Condominiums',
    'Architectural Estates',
    'Historic Homes',
    'First-Time Buyers'
  ];

  const filteredAgents = useMemo(() => {
    return AGENTS.filter((agent) => {
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesName = agent.name.toLowerCase().includes(query);
        const matchesArea = agent.serviceAreas.some((a) => a.toLowerCase().includes(query));
        if (!matchesName && !matchesArea) return false;
      }
      if (selectedSpecialty !== 'all') {
        if (!agent.specialties.includes(selectedSpecialty)) return false;
      }
      return true;
    });
  }, [searchTerm, selectedSpecialty]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9]">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="pt-12 pb-14 border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2 block">
              Advisor Directory
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-3 text-balance">
              Find an Expert Local Real Estate Advisor
            </h1>
            <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              Nestora advisors average over 10 years of experience in their local markets, offering unmatched pricing precision and discreet representation.
            </p>
          </div>
        </section>

        {/* Directory Controls */}
        <section className="py-8 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              {/* Search input */}
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by advisor name or city..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              {/* Specialty tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {specialties.map((spec) => (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => setSelectedSpecialty(spec)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      selectedSpecialty === spec
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {spec === 'all' ? 'All Specialties' : spec}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Agents Grid */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden bg-slate-100 shrink-0 border-2 border-slate-200">
                        <Image
                          src={agent.image}
                          alt={agent.name}
                          fill
                          sizes="80px"
                          referrerPolicy="no-referrer"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-slate-900">{agent.name}</h2>
                        <p className="text-xs text-slate-500 leading-snug">{agent.title}</p>
                        <div className="flex items-center gap-1.5 text-xs text-amber-700 font-semibold mt-1">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span>{agent.rating}</span>
                          <span className="text-slate-400">({agent.reviewsCount} reviews)</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs py-3 border-y border-slate-100 mb-4">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Closed Volume</span>
                        <span className="font-bold text-slate-900 tabular-nums">
                          {agent.closedSalesVolume}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Experience</span>
                        <span className="font-bold text-slate-900 tabular-nums">
                          {agent.experienceYears} Years
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                      {agent.bio}
                    </p>

                    <div className="mb-4">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Areas Served
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {agent.serviceAreas.map((area) => (
                          <span
                            key={area}
                            className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">{agent.activeListingsCount} Active Listings</span>
                    <Link
                      href={`/agents/${agent.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-lg transition-colors"
                    >
                      <span>View Profile</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SearchBar } from '@/components/search/SearchBar';
import { PropertyCard } from '@/components/property/PropertyCard';
import { PROPERTIES, POPULAR_NEIGHBORHOODS, AGENTS } from '@/lib/data';
import { ArrowRight, ShieldCheck, TrendingUp, Sparkles, Building2 } from 'lucide-react';

export default function HomePage() {
  const featuredProperties = PROPERTIES.slice(0, 3);
  const rentalSpotlights = PROPERTIES.filter((p) => p.listingType === 'rent').slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9]">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden border-b border-slate-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-3 block">
                Modern Real Estate Marketplace
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-4 text-balance">
                Find a place that feels like home.
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Discover architectural residences, curated rentals, and verified neighborhood data with expert advisors by your side.
              </p>
            </div>

            {/* Prominent Search Bar */}
            <div className="mb-12">
              <SearchBar initialMode="buy" />
            </div>

            {/* Architectural Hero Banner */}
            <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <Image
                src="/images/hero_modern_residence_1790542231529.jpg"
                alt="Modern residential architectural home at twilight"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                referrerPolicy="no-referrer"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-white">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-300 block mb-1">
                    Featured Collection
                  </span>
                  <p className="text-lg sm:text-2xl font-bold tracking-tight">
                    Pacific Northwest Modern & Sound View Residences
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Queen Anne · Westlake Hills · Cherry Creek · East Austin
                  </p>
                </div>
                <Link
                  href="/search?mode=buy"
                  className="bg-white text-slate-950 hover:bg-slate-100 font-semibold text-xs sm:text-sm py-2.5 px-5 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm shrink-0"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Properties Section */}
        <section className="py-16 md:py-20 border-b border-slate-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1 block">
                  Curated Listings
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Featured Homes for Sale
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Hand-selected architectural properties with verified ownership and price clarity.
                </p>
              </div>
              <Link
                href="/buy"
                className="text-sm font-semibold text-slate-900 hover:text-amber-800 transition-colors flex items-center gap-1.5 shrink-0"
              >
                <span>View all homes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>

        {/* Neighborhood Market Intelligence */}
        <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1 block">
                Market Intelligence
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Explore Popular Neighborhoods
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Real-time price trends, inventory volume, and walkability scores to help you choose the right community.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {POPULAR_NEIGHBORHOODS.map((hood) => (
                <Link
                  key={hood.neighborhood}
                  href={`/search?location=${encodeURIComponent(hood.neighborhood)}`}
                  className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex flex-col"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={hood.image}
                      alt={hood.neighborhood}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      referrerPolicy="no-referrer"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <div className="text-xs text-slate-300">{hood.city}</div>
                      <div className="font-bold text-base">{hood.neighborhood}</div>
                    </div>
                  </div>
                  <div className="p-3.5 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-slate-500">Median Price</div>
                      <div className="font-semibold text-slate-900 tabular-nums">{hood.avgPrice}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-700 font-semibold">{hood.growth}</div>
                      <div className="text-slate-400">{hood.count}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Dual Value Journey: Seller & Mortgage Discovery */}
        <section className="py-16 md:py-20 border-b border-slate-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Seller Module */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Sell With Nestora</span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-3">
                    Keep more of your home equity with 1.5% listing fee.
                  </h3>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    Full-service representation including professional photography, 3D architectural scan, targeted digital marketing, and dedicated lead broker support.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-slate-100 text-xs text-slate-600">
                    <div>
                      <div className="text-slate-400">Traditional Broker Fee</div>
                      <div className="text-base font-semibold text-slate-800 line-through">3.0%</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Nestora Listing Fee</div>
                      <div className="text-base font-bold text-amber-800">1.5%</div>
                    </div>
                  </div>
                </div>

                <Link
                  href="/sell"
                  className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm py-3 px-5 rounded-lg transition-colors"
                >
                  <span>Get Free Home Valuation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Mortgage Module */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
                    <Building2 className="w-4 h-4" />
                    <span>Mortgage Discovery</span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-3">
                    Calculate monthly payments with real-time interest rates.
                  </h3>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    Know your exact monthly obligation including principal, property taxes, homeowners insurance, and HOA dues before you make an offer.
                  </p>
                  <div className="grid grid-cols-3 gap-3 mb-6 pt-4 border-t border-slate-100 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-lg">
                      <div className="text-slate-400">30-Yr Fixed</div>
                      <div className="text-base font-bold text-slate-900 tabular-nums">5.85%</div>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg">
                      <div className="text-slate-400">15-Yr Fixed</div>
                      <div className="text-base font-bold text-slate-900 tabular-nums">5.15%</div>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg">
                      <div className="text-slate-400">5/1 ARM</div>
                      <div className="text-base font-bold text-slate-900 tabular-nums">5.40%</div>
                    </div>
                  </div>
                </div>

                <Link
                  href="/mortgage"
                  className="inline-flex items-center justify-center gap-2 border border-slate-300 hover:bg-slate-50 text-slate-900 font-medium text-sm py-3 px-5 rounded-lg transition-colors"
                >
                  <span>Explore Mortgage Calculator</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Local Real Estate Advisors */}
        <section className="py-16 md:py-20 border-b border-slate-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1 block">
                  Local Specialists
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Partner with Top-Tier Local Advisors
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Experienced brokers who average 12+ years in your target market.
                </p>
              </div>
              <Link
                href="/agents"
                className="text-sm font-semibold text-slate-900 hover:text-amber-800 transition-colors flex items-center gap-1.5 shrink-0"
              >
                <span>View all advisors</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {AGENTS.map((agent) => (
                <div
                  key={agent.id}
                  className="bg-white rounded-xl border border-slate-200/90 p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-xs transition-all"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                        <Image
                          src={agent.image}
                          alt={agent.name}
                          fill
                          sizes="64px"
                          referrerPolicy="no-referrer"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">{agent.name}</h3>
                        <p className="text-xs text-slate-500 leading-snug">{agent.title}</p>
                        <div className="flex items-center gap-1 text-xs text-slate-600 mt-1 font-semibold">
                          <span className="text-amber-600">★ {agent.rating}</span>
                          <span className="text-slate-300">·</span>
                          <span>{agent.reviewsCount} reviews</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                      {agent.bio}
                    </p>
                    <div className="text-xs text-slate-500 mb-4 flex flex-wrap gap-1">
                      {agent.serviceAreas.slice(0, 3).map((area) => (
                        <span key={area} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/agents/${agent.slug}`}
                    className="text-center text-xs font-semibold py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-800 transition-colors"
                  >
                    View Profile & Listings
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Conversion CTA */}
        <section className="py-16 md:py-20 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4 text-balance">
              Ready to find a place that feels like home?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mb-8 max-w-xl mx-auto leading-relaxed">
              Explore hundreds of verified residences, save your favorite properties, and connect directly with local neighborhood experts.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/search?mode=buy"
                className="w-full sm:w-auto bg-white text-slate-950 hover:bg-slate-100 font-semibold text-sm py-3 px-6 rounded-lg transition-colors"
              >
                Search Homes for Sale
              </Link>
              <Link
                href="/search?mode=rent"
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold text-sm py-3 px-6 rounded-lg transition-colors"
              >
                Explore Rental Homes
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

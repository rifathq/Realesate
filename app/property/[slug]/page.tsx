'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PropertyCard } from '@/components/property/PropertyCard';
import { PROPERTIES, AGENTS } from '@/lib/data';
import { useApp } from '@/lib/store';
import {
  Heart,
  Share2,
  Calendar,
  Video,
  CheckCircle2,
  MapPin,
  ChevronLeft,
  ChevronRight,
  X,
  Compass,
  GraduationCap,
  Calculator,
  Shield,
  Clock
} from 'lucide-react';

export default function PropertyDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const property = PROPERTIES.find((p) => p.slug === resolvedParams.slug);

  if (!property) {
    notFound();
  }

  const { isSaved, toggleSave, bookTour, showToast } = useApp();
  const saved = isSaved(property.id);

  const agent = AGENTS.find((a) => a.id === property.agentId) || AGENTS[0];

  // Gallery modal state
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Tour booking state
  const [tourType, setTourType] = useState<'In-person' | 'Live Video Tour'>('In-person');
  const [selectedDate, setSelectedDate] = useState('Sat, Oct 3');
  const [selectedTime, setSelectedTime] = useState('2:00 PM');
  const [tourBooked, setTourBooked] = useState(false);

  // Mortgage slider state for interactive monthly payment breakdown
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.2);

  const downPaymentAmount = (property.price * downPaymentPercent) / 100;
  const loanAmount = property.price - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = 360; // 30-year
  const monthlyPrincipalAndInterest =
    property.listingType === 'buy'
      ? Math.round(
          (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
            (Math.pow(1 + monthlyRate, numPayments) - 1)
        )
      : 0;

  const monthlyPropertyTaxes = Math.round((property.features.propertyTaxesAnnual || 0) / 12);
  const monthlyInsurance = Math.round((property.features.homeownersInsuranceAnnual || 0) / 12);
  const monthlyHOA = property.features.hoaFeeMonthly || 0;
  const totalMonthlyPayment =
    property.listingType === 'buy'
      ? monthlyPrincipalAndInterest + monthlyPropertyTaxes + monthlyInsurance + monthlyHOA
      : property.price;

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Property link copied to clipboard');
    }
  };

  const handleBookTourSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookTour({
      propertyId: property.id,
      propertyTitle: property.title,
      propertyAddress: `${property.address}, ${property.city}, ${property.state}`,
      tourType,
      date: selectedDate,
      timeSlot: selectedTime,
      agentName: agent.name
    });
    setTourBooked(true);
  };

  const similarProperties = PROPERTIES.filter(
    (p) => p.id !== property.id && p.city === property.city
  ).slice(0, 3);

  const dateOptions = ['Fri, Oct 2', 'Sat, Oct 3', 'Sun, Oct 4', 'Mon, Oct 5'];
  const timeOptions = ['10:00 AM', '1:00 PM', '2:30 PM', '4:30 PM'];

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9]">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb & Quick Actions Bar */}
        <div className="border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Link href="/" className="hover:text-slate-900 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                href={`/search?mode=${property.listingType}&location=${encodeURIComponent(property.city)}`}
                className="hover:text-slate-900 transition-colors"
              >
                {property.city}
              </Link>
              <span>/</span>
              <span className="text-slate-900 font-medium truncate max-w-[200px] sm:max-w-xs">
                {property.address}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
              <button
                type="button"
                onClick={() => toggleSave(property.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    saved ? 'fill-amber-700 text-amber-700' : 'text-slate-700'
                  }`}
                />
                <span>{saved ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Editorial Photo Gallery Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
          <div className="relative grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] bg-slate-200">
            {/* Primary Hero Photo */}
            <div
              onClick={() => {
                setActivePhotoIndex(0);
                setGalleryOpen(true);
              }}
              className="md:col-span-2 md:row-span-2 relative cursor-pointer group overflow-hidden bg-slate-100"
            >
              <Image
                src={property.images[0] || '/images/hero_modern_residence_1790542231529.jpg'}
                alt={property.title}
                fill
                priority
                referrerPolicy="no-referrer"
                className="object-cover group-hover:scale-102 transition-transform duration-300"
              />
            </div>

            {/* Secondary Photos */}
            {property.images.slice(1, 4).map((img, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setActivePhotoIndex(idx + 1);
                  setGalleryOpen(true);
                }}
                className="hidden md:block relative cursor-pointer group overflow-hidden bg-slate-100"
              >
                <Image
                  src={img}
                  alt={`${property.title} interior ${idx + 1}`}
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover group-hover:scale-102 transition-transform duration-300"
                />
              </div>
            ))}

            {/* View All Photos Trigger */}
            <div
              onClick={() => {
                setActivePhotoIndex(0);
                setGalleryOpen(true);
              }}
              className="hidden md:flex relative cursor-pointer group overflow-hidden bg-slate-900/60 items-center justify-center text-white"
            >
              <Image
                src={property.images[0] || '/images/hero_modern_residence_1790542231529.jpg'}
                alt="View gallery"
                fill
                referrerPolicy="no-referrer"
                className="object-cover opacity-40 group-hover:scale-102 transition-transform duration-300"
              />
              <span className="relative z-10 font-semibold text-sm bg-slate-950/75 px-3 py-1.5 rounded-lg border border-white/20">
                View All {property.images.length} Photos
              </span>
            </div>

            {/* Mobile View all photos floating pill */}
            <button
              type="button"
              onClick={() => setGalleryOpen(true)}
              className="md:hidden absolute bottom-3 right-3 z-10 bg-slate-950/80 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm"
            >
              View {property.images.length} Photos
            </button>
          </div>
        </div>

        {/* Content & Booking Split */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Decision-Driven Information */}
            <div className="lg:col-span-8 space-y-10">
              {/* Primary Header & Pricing */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900 bg-white border border-slate-200 px-2 py-0.5 rounded">
                    {property.status}
                  </span>
                  <span className="text-xs text-slate-500">
                    MLS #NS-{property.id.toUpperCase()} · Listed {property.listedDate}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-4">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 tabular-nums">
                      {property.listingType === 'rent'
                        ? `$${property.price.toLocaleString()}/mo`
                        : `$${property.price.toLocaleString()}`}
                    </h1>
                    {property.listingType === 'buy' && (
                      <p className="text-xs text-slate-500 mt-0.5">
                        Est. <span className="font-semibold text-slate-800">${totalMonthlyPayment.toLocaleString()}/month</span> payment
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-700 bg-slate-100/80 px-3.5 py-2 rounded-lg">
                    <span className="font-bold text-slate-900">{property.beds}</span> Beds
                    <span className="text-slate-300">·</span>
                    <span className="font-bold text-slate-900">{property.baths}</span> Baths
                    <span className="text-slate-300">·</span>
                    <span className="font-bold text-slate-900 tabular-nums">{property.sqft.toLocaleString()}</span> Sqft
                    {property.lotSizeSqft && (
                      <>
                        <span className="text-slate-300">·</span>
                        <span>{(property.lotSizeSqft / 43560).toFixed(2)} Acres</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>
                    {property.address}, {property.neighborhood}, {property.city}, {property.state} {property.zip}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="pt-6 border-t border-slate-200">
                <h2 className="text-lg font-bold text-slate-900 mb-3">About This Home</h2>
                <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Key Facts Grid */}
              <div className="pt-6 border-t border-slate-200">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Key Property Facts</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-400 block mb-1">Property Type</span>
                    <span className="font-bold text-slate-900 capitalize">
                      {property.propertyType.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-400 block mb-1">Year Built</span>
                    <span className="font-bold text-slate-900 tabular-nums">{property.yearBuilt}</span>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-400 block mb-1">Price Per Sqft</span>
                    <span className="font-bold text-slate-900 tabular-nums">
                      ${property.pricePerSqft}/sqft
                    </span>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-400 block mb-1">Monthly HOA</span>
                    <span className="font-bold text-slate-900 tabular-nums">
                      {property.features.hoaFeeMonthly ? `$${property.features.hoaFeeMonthly}` : 'None'}
                    </span>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-400 block mb-1">Annual Taxes</span>
                    <span className="font-bold text-slate-900 tabular-nums">
                      ${property.features.propertyTaxesAnnual.toLocaleString()}/yr
                    </span>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-400 block mb-1">Parking</span>
                    <span className="font-bold text-slate-900 truncate">
                      {property.features.parking}
                    </span>
                  </div>
                </div>
              </div>

              {/* Interior & Exterior Features */}
              <div className="pt-6 border-t border-slate-200">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Features & Architectural Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
                  <div>
                    <h3 className="font-semibold text-slate-900 uppercase tracking-wider mb-2">
                      Interior Appointments
                    </h3>
                    <ul className="space-y-1.5 list-disc pl-4 text-slate-600">
                      {property.features.interior.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 uppercase tracking-wider mb-2">
                      Exterior & Grounds
                    </h3>
                    <ul className="space-y-1.5 list-disc pl-4 text-slate-600">
                      {property.features.exterior.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Interactive Monthly Payment Breakdown */}
              {property.listingType === 'buy' && (
                <div className="pt-6 border-t border-slate-200 bg-white p-6 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">Monthly Payment Estimate</h2>
                      <p className="text-xs text-slate-500">
                        Customize your down payment and loan rate to estimate monthly obligations.
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
                        ${totalMonthlyPayment.toLocaleString()}/mo
                      </div>
                    </div>
                  </div>

                  {/* Sliders */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6 text-xs">
                    <div>
                      <div className="flex justify-between font-semibold text-slate-700 mb-1">
                        <span>Down Payment</span>
                        <span>
                          {downPaymentPercent}% (${downPaymentAmount.toLocaleString()})
                        </span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="50"
                        step="5"
                        value={downPaymentPercent}
                        onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                        className="w-full cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between font-semibold text-slate-700 mb-1">
                        <span>Interest Rate</span>
                        <span>{interestRate}% (30-Yr Fixed)</span>
                      </div>
                      <input
                        type="range"
                        min="4.5"
                        max="8.5"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Breakdown Bar & Items */}
                  <div className="space-y-2 pt-2 text-xs">
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-600">Principal & Interest</span>
                      <span className="font-semibold text-slate-900 tabular-nums">
                        ${monthlyPrincipalAndInterest.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-600">Property Taxes</span>
                      <span className="font-semibold text-slate-900 tabular-nums">
                        ${monthlyPropertyTaxes.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-600">Homeowners Insurance</span>
                      <span className="font-semibold text-slate-900 tabular-nums">
                        ${monthlyInsurance.toLocaleString()}
                      </span>
                    </div>
                    {monthlyHOA > 0 && (
                      <div className="flex items-center justify-between py-1.5">
                        <span className="text-slate-600">HOA Dues</span>
                        <span className="font-semibold text-slate-900 tabular-nums">
                          ${monthlyHOA.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Schools & Neighborhood Walkability */}
              <div className="pt-6 border-t border-slate-200">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Schools & Neighborhood Scores</h2>

                {/* Scores */}
                <div className="grid grid-cols-3 gap-3 mb-6 text-center text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <div className="text-2xl font-bold text-slate-900">{property.scores.walk}</div>
                    <div className="text-slate-500 font-medium mt-0.5">Walk Score</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <div className="text-2xl font-bold text-slate-900">{property.scores.transit}</div>
                    <div className="text-slate-500 font-medium mt-0.5">Transit Score</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <div className="text-2xl font-bold text-slate-900">{property.scores.bike}</div>
                    <div className="text-slate-500 font-medium mt-0.5">Bike Score</div>
                  </div>
                </div>

                {/* Assigned Schools */}
                <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 text-xs">
                  {property.schools.map((school) => (
                    <div key={school.name} className="p-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 font-bold flex items-center justify-center shrink-0">
                          {school.rating}/10
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{school.name}</div>
                          <div className="text-slate-400">{school.type} School</div>
                        </div>
                      </div>
                      <div className="text-slate-500">{school.distance}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Lead Agent & Tour Booking Card */}
            <div className="lg:col-span-4">
              <div className="sticky top-20 bg-white rounded-2xl border border-slate-200 shadow-md p-6">
                <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      fill
                      referrerPolicy="no-referrer"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{agent.name}</h3>
                    <p className="text-xs text-slate-500">{agent.title}</p>
                    <div className="text-[11px] text-amber-700 font-semibold mt-0.5">
                      ★ {agent.rating} ({agent.reviewsCount} reviews)
                    </div>
                  </div>
                </div>

                {tourBooked ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <h4 className="font-bold text-emerald-950 text-sm mb-1">Tour Confirmed!</h4>
                    <p className="text-xs text-emerald-800 mb-3">
                      {agent.name} will meet you for a {tourType.toLowerCase()} on{' '}
                      <span className="font-semibold">{selectedDate}</span> at{' '}
                      <span className="font-semibold">{selectedTime}</span>.
                    </p>
                    <Link
                      href="/dashboard"
                      className="block text-xs font-semibold py-2 px-3 bg-white text-emerald-900 border border-emerald-300 rounded-lg hover:bg-emerald-100 transition-colors"
                    >
                      View in Dashboard
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleBookTourSubmit} className="space-y-4 text-xs">
                    {/* Tour Type Segmented Switch */}
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1.5">Select Tour Format</label>
                      <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-lg">
                        <button
                          type="button"
                          onClick={() => setTourType('In-person')}
                          className={`py-2 rounded-md font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                            tourType === 'In-person'
                              ? 'bg-white text-slate-900 shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>In-Person</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setTourType('Live Video Tour')}
                          className={`py-2 rounded-md font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                            tourType === 'Live Video Tour'
                              ? 'bg-white text-slate-900 shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Video Tour</span>
                        </button>
                      </div>
                    </div>

                    {/* Date Selector */}
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1.5">Choose Date</label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {dateOptions.map((date) => (
                          <button
                            key={date}
                            type="button"
                            onClick={() => setSelectedDate(date)}
                            className={`py-2 px-2 text-center rounded-lg border font-medium transition-colors ${
                              selectedDate === date
                                ? 'bg-slate-900 text-white border-slate-900'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {date}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Slot */}
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1.5">Preferred Time</label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {timeOptions.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`py-2 px-2 text-center rounded-lg border font-medium transition-colors ${
                              selectedTime === time
                                ? 'bg-slate-900 text-white border-slate-900'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit CTA */}
                    <button
                      type="submit"
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm py-3 px-4 rounded-xl shadow-xs transition-colors mt-2"
                    >
                      Schedule Tour
                    </button>

                    <p className="text-[11px] text-slate-400 text-center">
                      Free consultation · No commitment · Verified broker response
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <section className="py-12 bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-6">
                Similar Homes in {property.city}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarProperties.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Lightbox Photo Gallery Modal */}
      {galleryOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between text-white text-sm">
            <span className="font-semibold">
              {activePhotoIndex + 1} / {property.images.length}
            </span>
            <button
              type="button"
              onClick={() => setGalleryOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
              aria-label="Close photo gallery"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-4">
            <div className="relative w-full max-w-5xl h-full max-h-[75vh]">
              <Image
                src={property.images[activePhotoIndex]}
                alt={`${property.title} high resolution photo ${activePhotoIndex + 1}`}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                referrerPolicy="no-referrer"
                className="object-contain"
              />
            </div>

            {/* Prev & Next Controls */}
            {property.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActivePhotoIndex((prev) =>
                      prev === 0 ? property.images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-2 sm:left-6 p-3 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActivePhotoIndex((prev) =>
                      prev === property.images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-2 sm:right-6 p-3 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActivePhotoIndex(idx)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  idx === activePhotoIndex ? 'border-white scale-105' : 'border-transparent opacity-60'
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

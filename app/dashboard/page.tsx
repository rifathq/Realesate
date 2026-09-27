'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PropertyCard } from '@/components/property/PropertyCard';
import { useApp } from '@/lib/store';
import {
  Heart,
  Bell,
  Calendar,
  Settings,
  Trash2,
  Clock,
  CheckCircle2,
  XCircle,
  LogOut,
  User,
  ArrowRight
} from 'lucide-react';

export default function DashboardPage() {
  const {
    user,
    logout,
    savedProperties,
    savedSearches,
    removeSavedSearch,
    scheduledTours,
    cancelTour,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'saved' | 'searches' | 'tours' | 'settings'>('saved');

  // Account form state
  const [profileName, setProfileName] = useState(user?.name || 'Alexandra Miller');
  const [profileEmail, setProfileEmail] = useState(user?.email || 'alex.miller@example.com');
  const [emailAlertsEnabled, setEmailAlertsEnabled] = useState(true);
  const [smsAlertsEnabled, setSmsAlertsEnabled] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Profile and notification preferences updated');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9]">
      <Header />

      <main className="flex-1 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* User Welcome Banner */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-lg">
                {user?.name ? user.name.charAt(0) : 'U'}
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  Welcome back, {user?.name || 'Client'}
                </h1>
                <p className="text-xs text-slate-500">
                  {user?.email || 'alex.miller@example.com'} · Client Member since 2026
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/buy"
                className="text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white py-2 px-3.5 rounded-lg transition-colors"
              >
                Browse Homes
              </Link>
              <button
                type="button"
                onClick={logout}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-8 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('saved')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'saved'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Saved Homes ({savedProperties.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('searches')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'searches'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Saved Searches ({savedSearches.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('tours')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'tours'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Scheduled Tours ({scheduledTours.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Account Settings</span>
            </button>
          </div>

          {/* Tab 1: Saved Homes */}
          {activeTab === 'saved' && (
            <div>
              {savedProperties.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
                  <Heart className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-900 text-base mb-1">No Saved Properties</h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Explore available homes and click the heart icon on any card to save it.
                  </p>
                  <Link
                    href="/buy"
                    className="inline-block bg-slate-900 text-white text-xs font-semibold py-2 px-4 rounded-lg"
                  >
                    Explore Homes for Sale
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedProperties.map((p) => (
                    <PropertyCard key={p.id} property={p} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Saved Searches */}
          {activeTab === 'searches' && (
            <div className="space-y-4 max-w-3xl">
              {savedSearches.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                  <Bell className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-900 text-base mb-1">No Saved Searches</h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Use our search filters and click &ldquo;Save Search&rdquo; to receive instant alerts when new listings hit the MLS.
                  </p>
                  <Link
                    href="/search"
                    className="inline-block bg-slate-900 text-white text-xs font-semibold py-2 px-4 rounded-lg"
                  >
                    Go to Search Workspace
                  </Link>
                </div>
              ) : (
                savedSearches.map((search) => (
                  <div
                    key={search.id}
                    className="bg-white rounded-xl border border-slate-200 p-5 flex items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{search.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Created on {search.dateCreated} · Alert cadence:{' '}
                        <span className="font-semibold text-slate-700">{search.alertFrequency}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/search?location=${encodeURIComponent(search.filters.location || '')}`}
                        className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 py-1.5 px-3 rounded-lg transition-colors"
                      >
                        Run Search
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeSavedSearch(search.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Delete saved search"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 3: Scheduled Tours */}
          {activeTab === 'tours' && (
            <div className="space-y-4 max-w-3xl">
              {scheduledTours.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                  <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-900 text-base mb-1">No Tours Scheduled</h3>
                  <p className="text-xs text-slate-500 mb-4">
                    View any property and select a tour time to schedule an in-person or live video tour with a licensed broker.
                  </p>
                  <Link
                    href="/buy"
                    className="inline-block bg-slate-900 text-white text-xs font-semibold py-2 px-4 rounded-lg"
                  >
                    Browse Homes
                  </Link>
                </div>
              ) : (
                scheduledTours.map((tour) => (
                  <div
                    key={tour.id}
                    className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            tour.status === 'Confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {tour.status}
                        </span>
                        <span className="text-xs font-semibold text-slate-700">
                          {tour.tourType}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm">{tour.propertyTitle}</h3>
                      <p className="text-xs text-slate-500">{tour.propertyAddress}</p>
                      <div className="text-xs text-slate-600 mt-2 flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>
                          {tour.date} at {tour.timeSlot} · Broker: {tour.agentName}
                        </span>
                      </div>
                    </div>

                    {tour.status !== 'Cancelled' && (
                      <button
                        type="button"
                        onClick={() => cancelTour(tour.id)}
                        className="text-xs font-medium text-slate-500 hover:text-rose-600 border border-slate-200 hover:border-rose-200 px-3 py-1.5 rounded-lg transition-colors self-start sm:self-auto"
                      >
                        Cancel Tour
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 4: Account Settings */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 mb-1">Client Profile & Preferences</h2>
              <p className="text-xs text-slate-500 mb-6">
                Manage your contact details, tour notification preferences, and search alert delivery.
              </p>

              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <h3 className="font-bold text-slate-900 text-sm">Notification Channels</h3>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailAlertsEnabled}
                      onChange={(e) => setEmailAlertsEnabled(e.target.checked)}
                      className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                    />
                    <span className="text-slate-700 font-medium">
                      Email notifications for new price drops and saved search listings
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={smsAlertsEnabled}
                      onChange={(e) => setSmsAlertsEnabled(e.target.checked)}
                      className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                    />
                    <span className="text-slate-700 font-medium">
                      SMS reminders 2 hours before scheduled in-person property tours
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm py-2.5 px-5 rounded-lg transition-colors shadow-xs mt-4"
                >
                  Save Account Changes
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

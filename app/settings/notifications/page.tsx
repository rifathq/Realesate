'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useApp } from '@/lib/store';
import {
  Bell,
  Mail,
  Smartphone,
  Shield,
  Clock,
  Sparkles,
  CheckCircle2,
  Sliders,
  DollarSign
} from 'lucide-react';

export default function NotificationSettingsPage() {
  const { showToast } = useApp();

  const [settings, setSettings] = useState({
    priceDrops: true,
    newHomesMatching: true,
    openHouseReminders: true,
    marketTrends: false,
    agentMessages: true,
    smsAlerts: true,
    emailAlerts: true,
    pushAlerts: true,
    frequency: 'instant' as 'instant' | 'daily' | 'weekly'
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      showToast('Notification preference updated');
      return updated;
    });
  };

  const handleSave = () => {
    showToast('All alert preferences successfully saved');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9]">
      <Header />

      <main className="flex-1 py-10 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
              Account Preferences
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Notification Settings
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Configure how and when Nestora delivers price updates, new listings, and tour confirmations.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-xs">
            {/* Delivery Channels */}
            <div className="p-6">
              <h2 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-slate-700" />
                <span>Delivery Channels</span>
              </h2>
              <p className="text-xs text-slate-500 mb-4">
                Choose the methods used to contact you.
              </p>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
                  <div>
                    <span className="text-xs font-semibold text-slate-800 block">Push Notifications</span>
                    <span className="text-[11px] text-slate-500">Real-time alerts directly in your browser or mobile device</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.pushAlerts}
                    onChange={() => toggle('pushAlerts')}
                    className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
                  <div>
                    <span className="text-xs font-semibold text-slate-800 block">Email Digests & Reports</span>
                    <span className="text-[11px] text-slate-500">Sent to your registered email address</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.emailAlerts}
                    onChange={() => toggle('emailAlerts')}
                    className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
                  <div>
                    <span className="text-xs font-semibold text-slate-800 block">SMS Text Messages</span>
                    <span className="text-[11px] text-slate-500">Direct notifications for urgent price drops and tour bookings</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.smsAlerts}
                    onChange={() => toggle('smsAlerts')}
                    className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900"
                  />
                </label>
              </div>
            </div>

            {/* Alert Categories */}
            <div className="p-6">
              <h2 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Bell className="w-4 h-4 text-slate-700" />
                <span>Listing & Activity Alerts</span>
              </h2>
              <p className="text-xs text-slate-500 mb-4">
                Select the triggers that initiate notifications.
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-xs font-semibold text-slate-800 block">Price Drops & Reductions</span>
                    <span className="text-[11px] text-slate-500">Alerts when a saved property lowers its asking price</span>
                  </div>
                  <button
                    onClick={() => toggle('priceDrops')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.priceDrops ? 'bg-slate-900' : 'bg-slate-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.priceDrops ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-xs font-semibold text-slate-800 block">New Search Matches</span>
                    <span className="text-[11px] text-slate-500">New listings that match your criteria in Denver, Seattle, etc.</span>
                  </div>
                  <button
                    onClick={() => toggle('newHomesMatching')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.newHomesMatching ? 'bg-slate-900' : 'bg-slate-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.newHomesMatching ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-xs font-semibold text-slate-800 block">Open House Reminders</span>
                    <span className="text-[11px] text-slate-500">Weekend reminders 2 hours before scheduled open houses start</span>
                  </div>
                  <button
                    onClick={() => toggle('openHouseReminders')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.openHouseReminders ? 'bg-slate-900' : 'bg-slate-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.openHouseReminders ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-xs font-semibold text-slate-800 block">Advisor Messages & Responses</span>
                    <span className="text-[11px] text-slate-500">Replies from Elena Vance and your touring specialists</span>
                  </div>
                  <button
                    onClick={() => toggle('agentMessages')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.agentMessages ? 'bg-slate-900' : 'bg-slate-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.agentMessages ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Email Cadence */}
            <div className="p-6">
              <h2 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-700" />
                <span>Digest Frequency</span>
              </h2>
              <p className="text-xs text-slate-500 mb-4">
                Choose how often you would like summary emails.
              </p>

              <div className="grid grid-cols-3 gap-3">
                {(['instant', 'daily', 'weekly'] as const).map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => {
                      setSettings((prev) => ({ ...prev, frequency: freq }));
                      showToast(`Digest frequency set to ${freq}`);
                    }}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold capitalize transition-all ${
                      settings.frequency === freq
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4 rounded-b-2xl">
              <Link
                href="/dashboard"
                className="text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                Back to Dashboard
              </Link>
              <button
                type="button"
                onClick={handleSave}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

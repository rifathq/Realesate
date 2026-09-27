'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useApp } from '@/lib/store';
import { AGENTS } from '@/lib/data';
import {
  UserCheck,
  Phone,
  Mail,
  Calendar,
  Send,
  Star,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function MyAgentPage() {
  const { showToast } = useApp();
  const agent = AGENTS[0]; // Elena Vance

  const [messages, setMessages] = useState([
    {
      sender: 'agent',
      text: "Hi Alexandra! I've been monitoring new listings in Queen Anne and Capitol Hill for you. There's an incredible timber residence that just came on the market.",
      time: '10:14 AM'
    },
    {
      sender: 'user',
      text: 'Thanks Elena! I saw the Evergreen Ridge property. Is the seller open to reviewing offers before the weekend?',
      time: '10:22 AM'
    },
    {
      sender: 'agent',
      text: "I just spoke with the listing broker. They are reviewing offers as they arrive, but there's an open house scheduled for Saturday. I've reserved a private 2:00 PM walkthrough slot for you.",
      time: '10:28 AM'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      sender: 'user',
      text: inputText.trim(),
      time: 'Just now'
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: "I've noted that! I'm pulling up the disclosures right now and will message you the details.",
          time: 'Just now'
        }
      ]);
      showToast('Elena Vance replied');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9]">
      <Header />

      <main className="flex-1 py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="pb-6 border-b border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
              Dedicated Advisory
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              My Real Estate Advisor
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Direct access to your dedicated Nestora advisor for private showings, contract negotiations, and valuation insights.
            </p>
          </div>

          <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 4 Cols: Agent Card & Contact Info */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 relative shrink-0">
                  <Image
                    src={agent.image}
                    alt={agent.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded mb-1">
                    <UserCheck className="w-3 h-3" />
                    <span>Your Advisor</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg leading-tight">{agent.name}</h3>
                  <p className="text-xs text-slate-500">{agent.title}</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center justify-between text-slate-600 py-1">
                  <span>Rating</span>
                  <span className="font-bold text-slate-900 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    {agent.rating} ({agent.reviewsCount} verified reviews)
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600 py-1">
                  <span>Specialties</span>
                  <span className="font-bold text-slate-900">{agent.specialties[0]}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 py-1">
                  <span>Direct Phone</span>
                  <a href={`tel:${agent.phone}`} className="font-semibold text-amber-800 hover:underline">
                    {agent.phone}
                  </a>
                </div>
                <div className="flex items-center justify-between text-slate-600 py-1">
                  <span>Email</span>
                  <a href={`mailto:${agent.email}`} className="font-semibold text-amber-800 hover:underline">
                    {agent.email}
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex flex-col gap-2.5">
                <Link
                  href="/appointments"
                  className="w-full text-center py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Schedule Private Walkthrough</span>
                </Link>

                <button
                  type="button"
                  onClick={() => showToast('Callback requested from Elena Vance')}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Request Instant Callback</span>
                </button>
              </div>
            </div>

            {/* Right 8 Cols: Live Chat Interface */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[520px]">
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full overflow-hidden relative">
                      <Image
                        src={agent.image}
                        alt={agent.name}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                      Messaging with {agent.name}
                    </h4>
                    <p className="text-[11px] text-emerald-600 font-medium">Online · Typically replies in under 5 minutes</p>
                  </div>
                </div>

                <Link
                  href={`/agents/${agent.slug}`}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  View Profile
                </Link>
              </div>

              {/* Chat Message History */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${
                      m.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-md px-4 py-2.5 rounded-2xl text-xs sm:text-sm ${
                        m.sender === 'user'
                          ? 'bg-slate-900 text-white rounded-br-none'
                          : 'bg-slate-100 text-slate-900 rounded-bl-none'
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</span>
                  </div>
                ))}
              </div>

              {/* Chat Input Box */}
              <form onSubmit={handleSendMessage} className="p-3 sm:p-4 border-t border-slate-100 flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Ask ${agent.name.split(' ')[0]} about tour times, offers, or comps...`}
                  className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

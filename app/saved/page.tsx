'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PropertyCard } from '@/components/property/PropertyCard';
import { useApp } from '@/lib/store';
import {
  Heart,
  Scale,
  X,
  ArrowRight,
  Building,
  Check,
  MessageSquare,
  Plus,
  Trash2,
  Trash
} from 'lucide-react';

export default function SavedPage() {
  const { savedProperties, toggleSave, propertyComments, addComment, removeComment } = useApp();
  const [filterMode, setFilterMode] = useState<'all' | 'buy' | 'rent'>('all');
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [activeNotesId, setActiveNotesId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState('');

  const filteredSaved = savedProperties.filter((p) => {
    if (filterMode === 'all') return true;
    return p.listingType === filterMode;
  });

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        return [prev[1], prev[2], id];
      }
      return [...prev, id];
    });
  };

  const handleAddNote = (propertyId: string) => {
    if (!newCommentText.trim()) return;
    addComment(propertyId, newCommentText.trim());
    setNewCommentText('');
  };

  const comparedProperties = savedProperties.filter((p) => compareIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9]">
      <Header />

      <main className="flex-1 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
                Your Collection
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Favorites & Comments
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {savedProperties.length} {savedProperties.length === 1 ? 'residence' : 'residences'} saved with private notes and tour comparison.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  filterMode === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({savedProperties.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('buy')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  filterMode === 'buy'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                For Sale
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('rent')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  filterMode === 'rent'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Rentals
              </button>
            </div>
          </div>

          {/* Empty State */}
          {savedProperties.length === 0 ? (
            <div className="text-center py-20 px-4 bg-white rounded-2xl border border-slate-200 shadow-xs my-8 max-w-xl mx-auto">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Heart className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">No Saved Properties Yet</h2>
              <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-md mx-auto">
                Explore homes for sale or rent and click the heart icon on any card to save it here with your private notes.
              </p>
              <div className="flex items-center justify-center gap-3">
                <Link
                  href="/search?mode=buy"
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 px-4 rounded-lg transition-colors"
                >
                  Search Homes for Sale
                </Link>
                <Link
                  href="/search?mode=rent"
                  className="border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold py-2.5 px-4 rounded-lg transition-colors"
                >
                  Explore Rentals
                </Link>
              </div>
            </div>
          ) : (
            <div className="pt-8 space-y-12">
              {/* Properties Grid */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-slate-500">
                    Compare up to 3 homes or add private notes to each residence:
                  </span>
                  {compareIds.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setCompareIds([])}
                      className="text-xs font-medium text-slate-600 hover:text-slate-900 underline"
                    >
                      Clear Comparison ({compareIds.length})
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSaved.map((prop) => {
                    const isCompared = compareIds.includes(prop.id);
                    const comments = propertyComments[prop.id] || [];
                    const isNotesOpen = activeNotesId === prop.id;

                    return (
                      <div key={prop.id} className="relative flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                        <PropertyCard property={prop} />

                        {/* Actions bar underneath card */}
                        <div className="px-4 py-3 bg-white border-t border-slate-100 flex items-center justify-between text-xs">
                          <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                            <input
                              type="checkbox"
                              checked={isCompared}
                              onChange={() => toggleCompare(prop.id)}
                              className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                            />
                            <span>Compare</span>
                          </label>

                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setActiveNotesId(isNotesOpen ? null : prop.id)}
                              className={`flex items-center gap-1 font-medium transition-colors ${
                                comments.length > 0 || isNotesOpen
                                  ? 'text-amber-800 font-semibold'
                                  : 'text-slate-500 hover:text-slate-900'
                              }`}
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>Notes ({comments.length})</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => toggleSave(prop.id)}
                              className="text-slate-400 hover:text-rose-600 transition-colors"
                            >
                              Unlike
                            </button>
                          </div>
                        </div>

                        {/* Collapsible Private Notes Drawer */}
                        {isNotesOpen && (
                          <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 text-xs space-y-2">
                            <div className="font-semibold text-slate-800 text-[11px] uppercase tracking-wider">
                              Private Notes
                            </div>

                            {comments.length === 0 ? (
                              <p className="text-[11px] text-slate-400 italic">No notes added yet.</p>
                            ) : (
                              <ul className="space-y-1.5">
                                {comments.map((comment, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start justify-between gap-2 p-2 bg-white rounded-lg border border-slate-200 text-slate-700 text-[11px]"
                                  >
                                    <span className="flex-1">{comment}</span>
                                    <button
                                      type="button"
                                      onClick={() => removeComment(prop.id, index)}
                                      className="text-slate-400 hover:text-rose-600 transition-colors"
                                      title="Delete note"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {/* Add Note Input */}
                            <div className="flex gap-1.5 pt-1">
                              <input
                                type="text"
                                value={activeNotesId === prop.id ? newCommentText : ''}
                                onChange={(e) => setNewCommentText(e.target.value)}
                                placeholder="Add private remark..."
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddNote(prop.id);
                                  }
                                }}
                                className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
                              />
                              <button
                                type="button"
                                onClick={() => handleAddNote(prop.id)}
                                className="p-1.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Side-by-Side Comparison Matrix */}
              {comparedProperties.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8">
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <Scale className="w-5 h-5 text-amber-800" />
                      <h2 className="text-lg font-bold text-slate-900">Side-by-Side Comparison</h2>
                    </div>
                    <span className="text-xs text-slate-500">
                      Comparing {comparedProperties.length} {comparedProperties.length === 1 ? 'home' : 'homes'}
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="py-3 px-4 text-slate-400 font-semibold uppercase text-[11px] w-1/4">
                            Specification
                          </th>
                          {comparedProperties.map((p) => (
                            <th key={p.id} className="py-3 px-4 font-bold text-slate-900 text-sm">
                              {p.address}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr>
                          <td className="py-3 px-4 font-medium text-slate-500">Price</td>
                          {comparedProperties.map((p) => (
                            <td key={p.id} className="py-3 px-4 font-bold text-slate-900">
                              ${p.price.toLocaleString()}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium text-slate-500">Beds / Baths</td>
                          {comparedProperties.map((p) => (
                            <td key={p.id} className="py-3 px-4 text-slate-700">
                              {p.beds} beds · {p.baths} baths
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium text-slate-500">Square Footage</td>
                          {comparedProperties.map((p) => (
                            <td key={p.id} className="py-3 px-4 text-slate-700">
                              {p.sqft.toLocaleString()} sq ft (${Math.round(p.price / p.sqft)}/sqft)
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium text-slate-500">Neighborhood</td>
                          {comparedProperties.map((p) => (
                            <td key={p.id} className="py-3 px-4 text-slate-700">
                              {p.neighborhood}, {p.city}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium text-slate-500">Year Built</td>
                          {comparedProperties.map((p) => (
                            <td key={p.id} className="py-3 px-4 text-slate-700">
                              {p.yearBuilt}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium text-slate-500">Annual Taxes / HOA</td>
                          {comparedProperties.map((p) => (
                            <td key={p.id} className="py-3 px-4 text-slate-700">
                              ${p.features.propertyTaxesAnnual?.toLocaleString() || 0}/yr · ${p.features.hoaFeeMonthly || 0}/mo HOA
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium text-slate-500">Action</td>
                          {comparedProperties.map((p) => (
                            <td key={p.id} className="py-3 px-4">
                              <Link
                                href={`/property/${p.slug}`}
                                className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 hover:text-amber-900"
                              >
                                <span>View Home Details</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

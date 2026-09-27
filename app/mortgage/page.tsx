'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useApp } from '@/lib/store';
import {
  Calculator,
  Percent,
  DollarSign,
  Calendar,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  TrendingDown
} from 'lucide-react';

export default function MortgagePage() {
  const { showToast } = useApp();

  // Mortgage Calculator Inputs
  const [homePrice, setHomePrice] = useState<number>(1250000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(6.15);
  const [annualPropertyTax, setAnnualPropertyTax] = useState<number>(12500);
  const [annualInsurance, setAnnualInsurance] = useState<number>(1800);
  const [monthlyHOA, setMonthlyHOA] = useState<number>(150);

  // Pre-approval form state
  const [preAppSubmitted, setPreAppSubmitted] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [creditScoreRange, setCreditScoreRange] = useState('740+ (Excellent)');

  // Mathematical Calculations
  const downPaymentAmount = Math.round((homePrice * downPaymentPercent) / 100);
  const loanPrincipal = Math.max(0, homePrice - downPaymentAmount);

  const monthlyInterestRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;

  const monthlyPrincipalInterest =
    loanPrincipal > 0 && monthlyInterestRate > 0
      ? Math.round(
          (loanPrincipal *
            (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths))) /
            (Math.pow(1 + monthlyInterestRate, totalMonths) - 1)
        )
      : 0;

  const monthlyPropertyTaxes = Math.round(annualPropertyTax / 12);
  const monthlyHomeInsurance = Math.round(annualInsurance / 12);
  // PMI applies if down payment is less than 20%
  const monthlyPMI = downPaymentPercent < 20 ? Math.round((loanPrincipal * 0.007) / 12) : 0;

  const totalMonthlyPayment =
    monthlyPrincipalInterest +
    monthlyPropertyTaxes +
    monthlyHomeInsurance +
    monthlyHOA +
    monthlyPMI;

  const totalLoanRepayment = monthlyPrincipalInterest * totalMonths;
  const totalInterestPaid = Math.max(0, totalLoanRepayment - loanPrincipal);

  // Proportions for visual breakdown bar
  const pniPercent = totalMonthlyPayment > 0 ? (monthlyPrincipalInterest / totalMonthlyPayment) * 100 : 0;
  const taxesPercent = totalMonthlyPayment > 0 ? (monthlyPropertyTaxes / totalMonthlyPayment) * 100 : 0;
  const insPercent = totalMonthlyPayment > 0 ? (monthlyHomeInsurance / totalMonthlyPayment) * 100 : 0;
  const hoaPercent = totalMonthlyPayment > 0 ? (monthlyHOA / totalMonthlyPayment) * 100 : 0;
  const pmiPercent = totalMonthlyPayment > 0 ? (monthlyPMI / totalMonthlyPayment) * 100 : 0;

  const handlePreApprovalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPreAppSubmitted(true);
    showToast('Pre-approval inquiry transmitted to lending partner');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9]">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-12 pb-14 border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2 block">
              Financing & Economics
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-3 text-balance">
              Mortgage Calculator & Payment Estimator
            </h1>
            <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              Calculate your exact monthly payments, test different down payments, and compare current fixed and adjustable loan rates.
            </p>
          </div>
        </section>

        {/* Interactive Calculator Workspace */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Inputs Column */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 text-xs">
                <h2 className="text-lg font-bold text-slate-900 mb-2">Loan Parameters</h2>

                {/* Home Price */}
                <div>
                  <div className="flex justify-between items-center mb-1.5 font-semibold text-slate-700">
                    <label>Target Home Purchase Price</label>
                    <span className="text-sm font-bold text-slate-900 tabular-nums">
                      ${homePrice.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="150000"
                    max="4500000"
                    step="25000"
                    value={homePrice}
                    onChange={(e) => {
                      const newPrice = Number(e.target.value);
                      setHomePrice(newPrice);
                      setAnnualPropertyTax(Math.round(newPrice * 0.01));
                    }}
                    className="w-full cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>$150K</span>
                    <span>$2.25M</span>
                    <span>$4.5M</span>
                  </div>
                </div>

                {/* Down Payment */}
                <div>
                  <div className="flex justify-between items-center mb-1.5 font-semibold text-slate-700">
                    <label>Down Payment ({downPaymentPercent}%)</label>
                    <span className="text-sm font-bold text-slate-900 tabular-nums">
                      ${downPaymentAmount.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="50"
                    step="1"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>3% (Min FHA)</span>
                    <span>20% (No PMI)</span>
                    <span>50%</span>
                  </div>
                </div>

                {/* Loan Term & Rate */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">Loan Term</label>
                    <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg">
                      {[30, 20, 15].map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => setLoanTermYears(term)}
                          className={`py-1.5 rounded-md font-semibold text-xs transition-colors ${
                            loanTermYears === term
                              ? 'bg-white text-slate-900 shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {term} Yr
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5 font-semibold text-slate-700">
                      <label>Interest Rate</label>
                      <span className="font-bold text-slate-900">{interestRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="4.0"
                      max="9.0"
                      step="0.05"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full cursor-pointer mt-2"
                    />
                  </div>
                </div>

                {/* Taxes, Insurance, and HOA */}
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <h3 className="font-bold text-slate-900 text-sm">Taxes, Insurance & Dues</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-600 mb-1">Annual Property Taxes</label>
                      <input
                        type="number"
                        value={annualPropertyTax}
                        onChange={(e) => setAnnualPropertyTax(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1">Homeowners Insurance</label>
                      <input
                        type="number"
                        value={annualInsurance}
                        onChange={(e) => setAnnualInsurance(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1">Monthly HOA Dues</label>
                      <input
                        type="number"
                        value={monthlyHOA}
                        onChange={(e) => setMonthlyHOA(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly Payment Summary Column */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Estimated Monthly Payment
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums mb-4">
                    ${totalMonthlyPayment.toLocaleString()}/mo
                  </div>

                  {/* Multi-segmented Visual Bar */}
                  <div className="h-3 w-full rounded-full overflow-hidden flex bg-slate-100 mb-6">
                    <div
                      style={{ width: `${pniPercent}%` }}
                      className="bg-slate-900"
                      title="Principal & Interest"
                    />
                    <div
                      style={{ width: `${taxesPercent}%` }}
                      className="bg-amber-600"
                      title="Property Taxes"
                    />
                    <div
                      style={{ width: `${insPercent}%` }}
                      className="bg-emerald-600"
                      title="Home Insurance"
                    />
                    <div
                      style={{ width: `${hoaPercent}%` }}
                      className="bg-indigo-500"
                      title="HOA Dues"
                    />
                    <div
                      style={{ width: `${pmiPercent}%` }}
                      className="bg-rose-500"
                      title="PMI"
                    />
                  </div>

                  {/* Detailed Line Items */}
                  <div className="space-y-3 text-xs divide-y divide-slate-100">
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                        <span className="text-slate-600 font-medium">Principal & Interest</span>
                      </div>
                      <span className="font-bold text-slate-900 tabular-nums">
                        ${monthlyPrincipalInterest.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                        <span className="text-slate-600 font-medium">Property Taxes</span>
                      </div>
                      <span className="font-bold text-slate-900 tabular-nums">
                        ${monthlyPropertyTaxes.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                        <span className="text-slate-600 font-medium">Homeowners Insurance</span>
                      </div>
                      <span className="font-bold text-slate-900 tabular-nums">
                        ${monthlyHomeInsurance.toLocaleString()}
                      </span>
                    </div>

                    {monthlyHOA > 0 && (
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                          <span className="text-slate-600 font-medium">HOA Dues</span>
                        </div>
                        <span className="font-bold text-slate-900 tabular-nums">
                          ${monthlyHOA.toLocaleString()}
                        </span>
                      </div>
                    )}

                    {monthlyPMI > 0 && (
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                          <span className="text-slate-600 font-medium">PMI (Under 20% Down)</span>
                        </div>
                        <span className="font-bold text-slate-900 tabular-nums">
                          ${monthlyPMI.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Lifetime amortization totals */}
                  <div className="mt-6 pt-4 border-t border-slate-200 grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl">
                    <div>
                      <span className="text-slate-400 block mb-0.5">Loan Amount</span>
                      <span className="font-bold text-slate-900 tabular-nums">
                        ${loanPrincipal.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-0.5">Total Interest Paid</span>
                      <span className="font-bold text-slate-900 tabular-nums">
                        ${totalInterestPaid.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href="#preapproval"
                  className="block w-full text-center mt-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm py-3 px-4 rounded-xl transition-colors shadow-xs"
                >
                  Get Pre-Approved for ${homePrice.toLocaleString()}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Current National Benchmark Rates */}
        <section className="py-12 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
                Market Benchmarks
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Today&apos;s Featured Mortgage Rates
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-slate-500 block mb-1">30-Year Fixed</span>
                <span className="text-2xl font-bold text-slate-900 tabular-nums">6.15%</span>
                <span className="text-[11px] text-slate-400 block mt-1">APR 6.24% · 0.4 pts</span>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-slate-500 block mb-1">15-Year Fixed</span>
                <span className="text-2xl font-bold text-slate-900 tabular-nums">5.42%</span>
                <span className="text-[11px] text-slate-400 block mt-1">APR 5.58% · 0.3 pts</span>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-slate-500 block mb-1">5/1 ARM Adjustable</span>
                <span className="text-2xl font-bold text-slate-900 tabular-nums">5.65%</span>
                <span className="text-[11px] text-slate-400 block mt-1">APR 6.30% · 0.2 pts</span>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-slate-500 block mb-1">30-Year Jumbo</span>
                <span className="text-2xl font-bold text-slate-900 tabular-nums">6.35%</span>
                <span className="text-[11px] text-slate-400 block mt-1">APR 6.45% · 0.5 pts</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pre-Approval Intake Form */}
        <section id="preapproval" className="py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
                Fast & Secure Pre-Approval
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">
                Get Pre-Approved with Nestora Lending Partners
              </h2>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Strengthen your home offer with a verified pre-approval letter delivered in as little as 24 hours. No hard impact on your credit score.
              </p>

              {preAppSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <h3 className="font-bold text-emerald-950 text-base mb-1">
                    Pre-Approval Profile Received
                  </h3>
                  <p className="text-xs text-emerald-800 mb-4 max-w-md mx-auto">
                    Thank you, {buyerName}. A senior loan advisor has received your target price of ${homePrice.toLocaleString()} and will contact you at {buyerEmail} with custom loan options.
                  </p>
                  <button
                    type="button"
                    onClick={() => setPreAppSubmitted(false)}
                    className="text-xs font-semibold px-4 py-2 bg-white text-emerald-900 border border-emerald-300 rounded-lg hover:bg-emerald-100 transition-colors"
                  >
                    Adjust Loan Profile
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePreApprovalSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="Alexander Hamilton"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        placeholder="alexander@example.com"
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Credit Score Estimate</label>
                      <select
                        value={creditScoreRange}
                        onChange={(e) => setCreditScoreRange(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900"
                      >
                        <option>740+ (Excellent)</option>
                        <option>700 - 739 (Very Good)</option>
                        <option>660 - 699 (Good)</option>
                        <option>620 - 659 (Fair)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm py-3 px-4 rounded-xl transition-colors shadow-xs"
                  >
                    Request Pre-Approval Letter
                  </button>

                  <p className="text-[11px] text-slate-400 text-center">
                    Soft inquiry only · NMLS #914820 · Licensed equal housing lender partner
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

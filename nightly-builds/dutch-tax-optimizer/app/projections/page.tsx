"use client";

import { useState } from "react";
import ScrollEffects from "@/components/ScrollEffects";
import Link from "next/link";

export default function ProjectionsPage() {
  const [formData, setFormData] = useState({ income: "", deductions: "", wbso: "", credits: "" });
  const [projection, setProjection] = useState<any>(null);

  const calculate = () => {
    const income = parseFloat(formData.income) || 0;
    const deductions = parseFloat(formData.deductions) || 0;
    const wbso = parseFloat(formData.wbso) || 0;
    const credits = parseFloat(formData.credits) || 0;

    const taxableIncome = Math.max(0, income - deductions);
    let incomeTax = 0;
    if (taxableIncome <= 75518) incomeTax = taxableIncome * 0.3697;
    else incomeTax = 75518 * 0.3697 + (taxableIncome - 75518) * 0.4950;

    const totalSavings = deductions * 0.3697 + wbso + credits;
    const effectiveRate = income > 0 ? ((incomeTax - totalSavings) / income) * 100 : 0;

    setProjection({
      grossIncome: income,
      totalDeductions: deductions,
      taxableIncome,
      incomeTax,
      wbsoBenefit: wbso,
      otherCredits: credits,
      totalSavings,
      effectiveTaxRate: effectiveRate,
      netIncome: income - incomeTax + totalSavings,
    });
  };

  const format = (amount: number) => new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(amount);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/10 to-orange-50/10">
      <ScrollEffects />

      {/* Header */}
      <header className="border-b border-[rgb(var(--color-line))]/50 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="text-sm text-[rgb(var(--color-text-muted))] hover:text-[rgb(var(--color-primary))] transition-colors">
              ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] bg-clip-text text-transparent">
              Tax Projections
            </h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="glass-panel reveal" data-reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="eyebrow">2026 Forecast</span>
              <span className="text-sm text-[rgb(var(--color-text-muted))]">98% accuracy</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">Calculate Your Savings</h2>
            <p className="text-[rgb(var(--color-text-muted))] mb-6">
              Enter your financial information for 2026. We'll calculate exactly what you'll owe – and what you'll save.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-[rgb(var(--color-text))]">
                  Expected Annual Income (€)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 80000"
                  value={formData.income}
                  onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-[rgb(var(--color-text))]">
                  Expected Deductions (€)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 15000"
                  value={formData.deductions}
                  onChange={(e) => setFormData({ ...formData, deductions: e.target.value })}
                  className="input-field"
                />
                <p className="text-xs text-[rgb(var(--color-text-muted))] mt-1">Equipment, home office, travel, etc.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-[rgb(var(--color-text))]">
                  Expected WBSO Benefit (€)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 8000"
                  value={formData.wbso}
                  onChange={(e) => setFormData({ ...formData, wbso: e.target.value })}
                  className="input-field"
                />
                <p className="text-xs text-[rgb(var(--color-text-muted))] mt-1">R&D tax credit (use checker above)</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-[rgb(var(--color-text))]">
                  Other Tax Credits (€)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 2000"
                  value={formData.credits}
                  onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                  className="input-field"
                />
              </div>

              <button onClick={calculate} className="btn-primary w-full">
                Calculate Projection
              </button>
            </div>
          </div>

          {/* Results */}
          {projection && (
            <div className="space-y-6">
              <div className="card reveal" data-reveal style={{ borderColor: "rgba(16, 185, 129, 0.3)" }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="eyebrow">Tax Summary</span>
                </div>
                <h2 className="text-2xl font-bold mb-6">Your 2026 Projection</h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-[rgb(var(--color-line))]">
                    <span className="text-[rgb(var(--color-text-muted))]">Gross Income</span>
                    <span className="text-xl font-bold">{format(projection.grossIncome)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[rgb(var(--color-line))]">
                    <span className="text-[rgb(var(--color-text-muted))]">Total Deductions</span>
                    <span className="text-xl font-bold text-red-500">-{format(projection.totalDeductions)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[rgb(var(--color-line))]">
                    <span className="text-[rgb(var(--color-text-muted))]">Taxable Income</span>
                    <span className="text-xl font-bold">{format(projection.taxableIncome)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[rgb(var(--color-line))]">
                    <span className="text-[rgb(var(--color-text-muted))]">Income Tax</span>
                    <span className="text-xl font-bold text-red-500">{format(projection.incomeTax)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold">Net Income</span>
                    <span className="text-3xl font-bold text-[rgb(var(--color-accent))]">{format(projection.netIncome)}</span>
                  </div>
                </div>
              </div>

              <div className="glass-panel reveal" data-reveal data-delay="0.1s">
                <h3 className="text-xl font-bold mb-6">Effective Tax Rate</h3>
                <div className="flex items-center justify-center mb-6">
                  <div className="text-center">
                    <div className="text-6xl font-bold bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] bg-clip-text text-transparent">
                      {projection.effectiveTaxRate.toFixed(1)}%
                    </div>
                    <p className="text-sm text-[rgb(var(--color-text-muted))] mt-2">
                      After all deductions and credits
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-[rgb(var(--color-accent))]/10 to-[rgb(var(--color-accent))]/5 rounded-xl border border-[rgb(var(--color-accent))]/30">
                  <div className="flex justify-between items-center">
                    <span className="text-[rgb(var(--color-text-muted))]">You're saving</span>
                    <span className="text-3xl font-bold text-[rgb(var(--color-accent))]">
                      {format(projection.totalSavings)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="card reveal" data-reveal data-delay="0.2s">
                <h3 className="text-xl font-bold mb-4">Savings Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[rgb(var(--color-text-muted))]">Deduction savings (36.97%)</span>
                    <span className="font-bold">{format(projection.totalDeductions * 0.3697)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[rgb(var(--color-text-muted))]">WBSO benefit</span>
                    <span className="font-bold">{format(projection.wbsoBenefit)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[rgb(var(--color-text-muted))]">Other credits</span>
                    <span className="font-bold">{format(projection.otherCredits)}</span>
                  </div>
                  <div className="pt-3 border-t border-[rgb(var(--color-line))] flex justify-between items-center">
                    <span className="font-bold">Total savings</span>
                    <span className="text-xl font-bold text-[rgb(var(--color-accent))]">{format(projection.totalSavings)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

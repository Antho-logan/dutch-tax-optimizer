"use client";

import { useState } from "react";
import ParticleField from "@/components/ParticleField";
import ScrollEffects from "@/components/ScrollEffects";

type CalculationResult = {
  income: number;
  deductions: number;
  taxableIncome: number;
  estimatedTax: number;
  estimatedSavings: number;
  netIncome: number;
  effectiveRate: number;
};

const presets = [
  { label: "Starter freelance", income: 62000, deductions: 7500, note: "Most common" },
  { label: "Growing studio", income: 98000, deductions: 16500, note: "Best savings" },
  { label: "R&D heavy", income: 125000, deductions: 32000, note: "High WBSO" },
];

const trustMetrics = [
  { label: "Avg. savings", value: "EUR 8,540", detail: "based on 2025 filings" },
  { label: "Accuracy", value: "98%", detail: "verified by accountants" },
  { label: "Fast setup", value: "6 min", detail: "to first estimate" },
];

const testimonials = [
  {
    quote: "The calculator made my 2026 plan crystal clear in minutes.",
    author: "Sophie Vermeer",
    role: "Product designer, Amsterdam",
  },
  {
    quote: "Finally a dashboard that feels like it was built for freelancers.",
    author: "Liam de Boer",
    role: "Software consultant, Utrecht",
  },
];

export default function DashboardPage() {
  const [formData, setFormData] = useState({ income: "", deductions: "" });
  const [result, setResult] = useState<CalculationResult | null>(null);

  const format = (amount: number) =>
    new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(amount);

  const calculate = () => {
    const income = Number.parseFloat(formData.income) || 0;
    const deductions = Number.parseFloat(formData.deductions) || 0;
    const taxableIncome = Math.max(0, income - deductions);
    const baseRate = 0.3697;
    const upperRate = 0.495;
    const bracket = 75518;

    const estimatedTax =
      taxableIncome <= bracket
        ? taxableIncome * baseRate
        : bracket * baseRate + (taxableIncome - bracket) * upperRate;
    const estimatedSavings = deductions * baseRate;
    const netIncome = income - estimatedTax + estimatedSavings;
    const effectiveRate = income > 0 ? ((estimatedTax - estimatedSavings) / income) * 100 : 0;

    setResult({
      income,
      deductions,
      taxableIncome,
      estimatedTax,
      estimatedSavings,
      netIncome,
      effectiveRate,
    });
  };

  const deductionCoverage = result && result.income > 0
    ? Math.min(100, Math.round((result.deductions / result.income) * 100))
    : 0;

  return (
    <>
      <ScrollEffects />

      <div className="hero-gradient parallax-layer fixed inset-0 -z-10" data-parallax data-speed="0.12" />
      <div className="hero-rings parallax-layer fixed inset-0 -z-10" data-parallax data-speed="0.18" />
      <div className="fixed inset-0 pointer-events-none -z-10">
        <ParticleField count={25} />
      </div>

      <div className="relative z-10 p-6 ml-0 lg:ml-72 transition-all duration-300 max-w-6xl">
        <div className="mb-10 reveal" data-reveal>
          <span className="eyebrow">Tax calculator</span>
          <h1 className="section-title mt-4">Estimate your 2026 savings in minutes.</h1>
          <p className="text-lg text-[rgb(var(--color-text-muted))] mt-4 max-w-3xl">
            Enter income and deductions to see a premium-grade forecast. We mirror Dutch tax brackets and translate
            them into a clear savings story.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {trustMetrics.map((metric, index) => (
            <div
              key={metric.label}
              className="glass-panel reveal transition-all duration-300 hover:-translate-y-1"
              data-reveal
              data-delay={`${index * 0.1}s`}
            >
              <div className="text-2xl font-bold text-[rgb(var(--color-primary))]">{metric.value}</div>
              <div className="text-sm font-semibold text-[rgb(var(--color-text))] mt-2">{metric.label}</div>
              <div className="text-xs text-[rgb(var(--color-text-muted))] mt-1">{metric.detail}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-8">
          <div className="space-y-6">
            <div className="glass-panel reveal" data-reveal>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="eyebrow">Inputs</span>
                  <h2 className="text-2xl font-bold mt-2">Tax calculation interface</h2>
                </div>
                <span className="text-xs text-[rgb(var(--color-text-muted))]">2026 estimate</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[rgb(var(--color-text))]">
                    Annual income (EUR)
                  </label>
                  <input
                    type="number"
                    placeholder="85000"
                    value={formData.income}
                    onChange={(event) => setFormData({ ...formData, income: event.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[rgb(var(--color-text))]">
                    Total deductions (EUR)
                  </label>
                  <input
                    type="number"
                    placeholder="14000"
                    value={formData.deductions}
                    onChange={(event) => setFormData({ ...formData, deductions: event.target.value })}
                    className="input-field"
                  />
                  <p className="text-xs text-[rgb(var(--color-text-muted))] mt-2">
                    Home office, equipment, travel, education, and WBSO.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--color-text-muted))] mb-3">
                  Quick presets
                </div>
                <div className="flex flex-wrap gap-3">
                  {presets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() =>
                        setFormData({
                          income: preset.income.toString(),
                          deductions: preset.deductions.toString(),
                        })
                      }
                      className="rounded-full border border-[rgb(var(--color-line))] px-5 py-2.5 text-sm font-semibold text-[rgb(var(--color-text))] bg-white/60 hover:bg-white/90 hover:-translate-y-0.5 transition-all"
                    >
                      <span className="block text-[rgb(var(--color-primary))]">{preset.label}</span>
                      <span className="block text-xs text-[rgb(var(--color-text-muted))]">{preset.note}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={calculate} className="btn-primary w-full mt-8">
                Calculate savings
              </button>
              <p className="text-xs text-[rgb(var(--color-text-muted))] mt-4">
                Estimates apply 2026 income tax brackets and average deduction rates.
              </p>
            </div>

            <div className="card reveal" data-reveal>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="eyebrow">Optimization</span>
                  <h3 className="text-2xl font-bold mt-2">AI optimization checklist</h3>
                </div>
                <span className="text-xs text-[rgb(var(--color-accent))] font-semibold">3 actions</span>
              </div>
              <div className="space-y-4">
                {[
                  "Review top 5 deduction categories this quarter",
                  "Sync bank feed for auto-tagging receipts",
                  "Run WBSO eligibility update before April",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-[rgb(var(--bg-soft))] border border-[rgb(var(--color-line))] hover:border-[rgb(var(--color-primary))]/40 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-[rgb(var(--color-primary))]/10 flex items-center justify-center text-sm font-bold text-[rgb(var(--color-primary))]">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-[rgb(var(--color-text))]">{item}</div>
                      <div className="text-xs text-[rgb(var(--color-text-muted))] mt-1">Takes less than 5 minutes.</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-panel reveal" data-reveal>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="eyebrow">Results</span>
                  <h2 className="text-2xl font-bold mt-2">Savings summary</h2>
                </div>
                <span className="text-xs text-[rgb(var(--color-text-muted))]">Instant preview</span>
              </div>

              {!result && (
                <div className="border border-dashed border-[rgb(var(--color-line))] rounded-2xl p-6 text-center text-[rgb(var(--color-text-muted))]">
                  Run the calculation to see your projected savings, effective tax rate, and net income.
                </div>
              )}

              {result && (
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-[rgb(var(--color-accent))]/10 to-[rgb(var(--color-accent))]/5 border border-[rgb(var(--color-accent))]/30">
                    <div className="text-sm text-[rgb(var(--color-text-muted))]">Estimated savings</div>
                    <div className="text-3xl font-bold text-[rgb(var(--color-accent))] mt-2">
                      {format(result.estimatedSavings)}
                    </div>
                    <div className="text-xs text-[rgb(var(--color-text-muted))] mt-2">
                      Based on deductions and average brackets.
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-[rgb(var(--color-line))] pb-3">
                      <span className="text-[rgb(var(--color-text-muted))]">Taxable income</span>
                      <span className="font-semibold">{format(result.taxableIncome)}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[rgb(var(--color-line))] pb-3">
                      <span className="text-[rgb(var(--color-text-muted))]">Estimated tax</span>
                      <span className="font-semibold text-red-500">{format(result.estimatedTax)}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[rgb(var(--color-line))] pb-3">
                      <span className="text-[rgb(var(--color-text-muted))]">Effective rate</span>
                      <span className="font-semibold">{result.effectiveRate.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Net income</span>
                      <span className="text-2xl font-bold text-[rgb(var(--color-primary))]">
                        {format(result.netIncome)}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex justify-between text-xs text-[rgb(var(--color-text-muted))] mb-2">
                      <span>Deduction coverage</span>
                      <span>{deductionCoverage}% of income</span>
                    </div>
                    <div className="h-2 rounded-full bg-[rgb(var(--bg-soft))] overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))]"
                        style={{ width: `${deductionCoverage}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="card reveal" data-reveal>
              <span className="eyebrow">Social proof</span>
              <h3 className="text-2xl font-bold mt-2">Loved by Dutch freelancers</h3>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-2xl bg-[rgb(var(--bg-soft))] border border-[rgb(var(--color-line))]">
                  <div className="text-xl font-bold text-[rgb(var(--color-primary))]">4.9</div>
                  <div className="text-xs text-[rgb(var(--color-text-muted))] mt-1">Average rating</div>
                </div>
                <div className="p-4 rounded-2xl bg-[rgb(var(--bg-soft))] border border-[rgb(var(--color-line))]">
                  <div className="text-xl font-bold text-[rgb(var(--color-primary))]">500+</div>
                  <div className="text-xs text-[rgb(var(--color-text-muted))] mt-1">Active users</div>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {testimonials.map((item) => (
                  <div key={item.author} className="p-4 rounded-2xl bg-white/70 border border-[rgb(var(--color-line))]">
                    <p className="text-sm text-[rgb(var(--color-text))]">"{item.quote}"</p>
                    <div className="text-xs text-[rgb(var(--color-text-muted))] mt-2">
                      {item.author} - {item.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel reveal" data-reveal>
              <span className="eyebrow">Next steps</span>
              <h3 className="text-2xl font-bold mt-2">Turn insight into action</h3>
              <p className="text-sm text-[rgb(var(--color-text-muted))] mt-3">
                Connect receipts, schedule a quarterly review, and export an audit-ready report with one click.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button className="btn-primary">Sync receipts</button>
                <button className="btn-ghost">Schedule review</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import ParticleField from "@/components/ParticleField";
import ScrollEffects from "@/components/ScrollEffects";

// Animated counter component
function AnimatedCounter({ value, duration = 1000, prefix = "", suffix = "" }: { value: number; duration?: number; prefix?: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const steps = 30;
    const stepDuration = duration / steps;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(current);
      }
    }, stepDuration);
    return () => clearInterval(timer);
  }, [isVisible, value, duration]);

  return (
    <div ref={ref} className="tabular-nums">
      {prefix}{displayValue.toLocaleString("nl-NL", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}{suffix}
    </div>
  );
}

export default function ProjectionsPage() {
  const [formData, setFormData] = useState({ income: "", deductions: "", wbso: "", credits: "" });
  const [projection, setProjection] = useState<any>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculate = () => {
    const income = parseFloat(formData.income) || 0;
    const deductions = parseFloat(formData.deductions) || 0;
    const wbso = parseFloat(formData.wbso) || 0;
    const credits = parseFloat(formData.credits) || 0;

    const taxableIncome = Math.max(0, income - deductions);
    let incomeTax = 0;
    let taxBracket = "First Bracket (36.97%)";
    if (taxableIncome > 75518) {
      incomeTax = 75518 * 0.3697 + (taxableIncome - 75518) * 0.4950;
      taxBracket = "Second Bracket (49.50%)";
    } else {
      incomeTax = taxableIncome * 0.3697;
    }

    const totalSavings = deductions * 0.3697 + wbso + credits;
    const effectiveRate = income > 0 ? ((incomeTax - totalSavings) / income) * 100 : 0;
    const originalTax = income > 0 ? (incomeTax / income) * 100 : 0;

    setProjection({
      grossIncome: income,
      totalDeductions: deductions,
      taxableIncome,
      incomeTax,
      wbsoBenefit: wbso,
      otherCredits: credits,
      totalSavings,
      effectiveTaxRate: effectiveRate,
      originalTaxRate: originalTax,
      taxBracket,
      netIncome: income - incomeTax + totalSavings,
    });
    setHasCalculated(true);
  };

  const format = (amount: number) => new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(amount);

  return (
    <>
      <ScrollEffects />

      {/* Animated Backgrounds */}
      <div className="hero-gradient parallax-layer fixed inset-0 -z-10" data-parallax data-speed="0.12" />
      <div className="hero-rings parallax-layer fixed inset-0 -z-10" data-parallax data-speed="0.18" />
      <div className="fixed inset-0 pointer-events-none -z-10">
        <ParticleField count={25} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6 ml-0 lg:ml-72 transition-all duration-300 max-w-6xl">
        {/* Page Header */}
        <div className="mb-8 reveal" data-reveal>
          <div className="flex items-center gap-3 mb-2">
            <span className="eyebrow">Tax Projections</span>
            <span className="text-sm text-[rgb(var(--color-text-muted))]">2026 Forecast</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">Calculate Your Savings</h1>
          <p className="text-lg text-[rgb(var(--color-text-muted))]">
            Enter your financial information for 2026. We'll calculate exactly what you'll owe – and what you'll save.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="glass-panel reveal" data-reveal>
            <div className="space-y-5">
              <div className="group">
                <label className="block text-sm font-semibold mb-2 text-[rgb(var(--color-text))] transition-colors group-hover:text-[rgb(var(--color-primary))]">
                  Expected Annual Income (€)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="e.g., 80000"
                    value={formData.income}
                    onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                    className="input-field transition-all duration-300 hover:shadow-lg hover:shadow-[rgb(var(--color-primary))]/10 focus:shadow-xl focus:shadow-[rgb(var(--color-primary))]/20"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[rgb(var(--color-text-muted))] pointer-events-none">EUR</div>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold mb-2 text-[rgb(var(--color-text))] transition-colors group-hover:text-[rgb(var(--color-primary))]">
                  Expected Deductions (€)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="e.g., 15000"
                    value={formData.deductions}
                    onChange={(e) => setFormData({ ...formData, deductions: e.target.value })}
                    className="input-field transition-all duration-300 hover:shadow-lg hover:shadow-[rgb(var(--color-primary))]/10 focus:shadow-xl focus:shadow-[rgb(var(--color-primary))]/20"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[rgb(var(--color-text-muted))] pointer-events-none">EUR</div>
                </div>
                <p className="text-xs text-[rgb(var(--color-text-muted))] mt-1 flex items-center gap-1">
                  <span>💡</span> Equipment, home office, travel, etc.
                </p>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold mb-2 text-[rgb(var(--color-text))] transition-colors group-hover:text-[rgb(var(--color-primary))]">
                  Expected WBSO Benefit (€)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="e.g., 8000"
                    value={formData.wbso}
                    onChange={(e) => setFormData({ ...formData, wbso: e.target.value })}
                    className="input-field transition-all duration-300 hover:shadow-lg hover:shadow-[rgb(var(--color-primary))]/10 focus:shadow-xl focus:shadow-[rgb(var(--color-primary))]/20"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[rgb(var(--color-text-muted))] pointer-events-none">EUR</div>
                </div>
                <p className="text-xs text-[rgb(var(--color-text-muted))] mt-1 flex items-center gap-1">
                  <span>🚀</span> R&D tax credit (use checker above)
                </p>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold mb-2 text-[rgb(var(--color-text))] transition-colors group-hover:text-[rgb(var(--color-primary))]">
                  Other Tax Credits (€)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="e.g., 2000"
                    value={formData.credits}
                    onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                    className="input-field transition-all duration-300 hover:shadow-lg hover:shadow-[rgb(var(--color-primary))]/10 focus:shadow-xl focus:shadow-[rgb(var(--color-primary))]/20"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[rgb(var(--color-text-muted))] pointer-events-none">EUR</div>
                </div>
              </div>

              <button
                onClick={calculate}
                className="btn-primary w-full transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
              >
                <span className="flex items-center justify-center gap-2">
                  Calculate Projection
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          {/* Empty State */}
          {!hasCalculated && (
            <div className="glass-panel reveal flex items-center justify-center min-h-[400px]" data-reveal>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[rgb(var(--color-primary))]/20 to-[rgb(var(--color-secondary))]/20 flex items-center justify-center">
                  <svg className="w-10 h-10 text-[rgb(var(--color-primary))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Ready to Calculate</h3>
                <p className="text-[rgb(var(--color-text-muted))]">Enter your financial details to see your 2026 tax projection</p>
              </div>
            </div>
          )}

          {/* Results */}
          {hasCalculated && projection && (
            <div className="space-y-6">
              <div className="card reveal" data-reveal style={{ borderColor: "rgba(16, 185, 129, 0.3)" }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="eyebrow">Tax Summary</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-[rgb(var(--color-accent))]/20 text-[rgb(var(--color-accent))]">2026</span>
                </div>
                <h2 className="text-2xl font-bold mb-6">Your 2026 Projection</h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-[rgb(var(--color-line))]">
                    <span className="text-[rgb(var(--color-text-muted))]">Gross Income</span>
                    <span className="text-xl font-bold">
                      <AnimatedCounter value={projection.grossIncome} prefix="€" />
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[rgb(var(--color-line))]">
                    <span className="text-[rgb(var(--color-text-muted))]">Total Deductions</span>
                    <span className="text-xl font-bold text-red-500">-<AnimatedCounter value={projection.totalDeductions} prefix="€" /></span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[rgb(var(--color-line))]">
                    <span className="text-[rgb(var(--color-text-muted))]">Taxable Income</span>
                    <span className="text-xl font-bold">
                      <AnimatedCounter value={projection.taxableIncome} prefix="€" />
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[rgb(var(--color-line))]">
                    <span className="text-[rgb(var(--color-text-muted))]">Income Tax</span>
                    <span className="text-xl font-bold text-red-500">
                      <AnimatedCounter value={projection.incomeTax} prefix="€" />
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold">Net Income</span>
                    <span className="text-3xl font-bold text-[rgb(var(--color-accent))]">
                      <AnimatedCounter value={projection.netIncome} prefix="€" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="glass-panel reveal" data-reveal data-delay="0.1s">
                <h3 className="text-xl font-bold mb-6">Effective Tax Rate</h3>

                {/* Visual Comparison */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[rgb(var(--color-text-muted))]">Before deductions</span>
                    <span className="font-bold">{projection.originalTaxRate.toFixed(1)}%</span>
                  </div>
                  <div className="h-3 bg-gray-800 rounded-full overflow-hidden mb-4">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(projection.originalTaxRate, 50)}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[rgb(var(--color-text-muted))]">After deductions</span>
                    <span className="font-bold text-[rgb(var(--color-accent))]">
                      <AnimatedCounter value={projection.effectiveTaxRate} suffix="%" duration={800} />
                    </span>
                  </div>
                  <div className="h-3 bg-gray-800 rounded-full overflow-hidden mb-4">
                    <div
                      className="h-full bg-gradient-to-r from-[rgb(var(--color-accent))] to-emerald-400 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(projection.effectiveTaxRate, 50)}%` }}
                    />
                  </div>

                  <div className="text-center py-3 px-4 bg-gradient-to-r from-[rgb(var(--color-accent))]/10 to-emerald-500/10 rounded-xl border border-[rgb(var(--color-accent))]/20">
                    <div className="text-sm text-[rgb(var(--color-text-muted))] mb-1">You're saving</div>
                    <div className="text-3xl font-bold text-[rgb(var(--color-accent))]">
                      <AnimatedCounter value={projection.totalSavings} prefix="€" duration={1000} />
                    </div>
                  </div>
                </div>

                {/* Tax Bracket Info */}
                <div className="p-4 bg-gradient-to-br from-[rgb(var(--color-primary))]/10 to-[rgb(var(--color-secondary))]/10 rounded-xl border border-[rgb(var(--color-primary))]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold">Tax Bracket</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[rgb(var(--color-primary))]/20 text-[rgb(var(--color-primary))]">
                      {projection.taxableIncome > 75518 ? "Second" : "First"}
                    </span>
                  </div>
                  <p className="text-xs text-[rgb(var(--color-text-muted))]">{projection.taxBracket}</p>
                  <p className="text-xs text-[rgb(var(--color-text-muted))] mt-1">
                    Threshold: €75,518
                  </p>
                </div>
              </div>

              <div className="card reveal" data-reveal data-delay="0.2s">
                <h3 className="text-xl font-bold mb-4">Savings Breakdown</h3>
                <div className="space-y-4">
                  {/* Deduction Savings */}
                  <div className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[rgb(var(--color-text-muted))]">Deduction savings</span>
                      <span className="text-xs text-[rgb(var(--color-text-muted))]">36.97%</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-[rgb(var(--color-line))]">
                      <span className="font-semibold text-[rgb(var(--color-primary))]">
                        <AnimatedCounter value={projection.totalDeductions * 0.3697} prefix="€" />
                      </span>
                      <div className="text-right">
                        <div className="text-xs text-[rgb(var(--color-text-muted))]">
                          on {projection.totalDeductions.toLocaleString()} deductions
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* WBSO Benefit */}
                  <div className="group">
                    <div className="flex justify-between items-center pb-3 border-b border-[rgb(var(--color-line))]">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">🚀</span>
                        <span className="text-[rgb(var(--color-text-muted))]">WBSO benefit</span>
                      </div>
                      <span className="font-bold text-[rgb(var(--color-accent))]">
                        <AnimatedCounter value={projection.wbsoBenefit} prefix="€" />
                      </span>
                    </div>
                  </div>

                  {/* Other Credits */}
                  <div className="group">
                    <div className="flex justify-between items-center pb-3 border-b border-[rgb(var(--color-line))]">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">💎</span>
                        <span className="text-[rgb(var(--color-text-muted))]">Other credits</span>
                      </div>
                      <span className="font-bold">
                        <AnimatedCounter value={projection.otherCredits} prefix="€" />
                      </span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="pt-3 border-t border-[rgb(var(--color-line))]">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Total savings</span>
                      <span className="text-2xl font-bold text-[rgb(var(--color-accent))]">
                        <AnimatedCounter value={projection.totalSavings} prefix="€" />
                      </span>
                    </div>
                    <p className="text-xs text-[rgb(var(--color-text-muted))] mt-2">
                      🎉 You've reduced your tax burden by {((projection.totalSavings / projection.incomeTax) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

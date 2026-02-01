"use client";

import { useState } from "react";
import ParticleField from "@/components/ParticleField";
import ScrollEffects from "@/components/ScrollEffects";

export default function BVVsZZPPage() {
  const [income, setIncome] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const annualIncome = parseFloat(income) || 0;

    // ZZP Calculation (2026)
    const zelfstandigenAftrek2026 = 1200; // Reduced from €2,470 in 2025
    const taxableIncomeZZP = Math.max(0, annualIncome - zelfstandigenAftrek2026);
    let incomeTaxZZP = 0;
    if (taxableIncomeZZP > 75518) {
      incomeTaxZZP = 75518 * 0.3697 + (taxableIncomeZZP - 75518) * 0.4950;
    } else {
      incomeTaxZZP = taxableIncomeZZP * 0.3697;
    }

    // BV Calculation (2026)
    // Corporate tax: 19% on first €200K, 25.5% above that
    let corporateTax = 0;
    if (annualIncome > 200000) {
      corporateTax = 200000 * 0.19 + (annualIncome - 200000) * 0.255;
    } else {
      corporateTax = annualIncome * 0.19;
    }

    const profitAfterTax = annualIncome - corporateTax;

    // Dividend tax (assume distributing all profit as salary+dividend mix)
    // For simplicity: assume 50% salary (subject to income tax) + 50% dividend (15% dividend tax)
    const salary portion = profitAfterTax * 0.5;
    const dividendPortion = profitAfterTax * 0.5;
    const dividendTax = dividendPortion * 0.15;

    // Income tax on salary portion (after €2,000 monthly deduction approximate)
    const salaryYearly = salaryPortion;
    let incomeTaxOnSalary = 0;
    if (salaryYearly > 75518) {
      incomeTaxOnSalary = 75518 * 0.3697 + (salaryYearly - 75518) * 0.4950;
    } else {
      incomeTaxOnSalary = salaryYearly * 0.3697;
    }

    const totalTaxBV = corporateTax + dividendTax + incomeTaxOnSalary;
    const netIncomeBV = annualIncome - totalTaxBV;
    const netIncomeZZP = annualIncome - incomeTaxZZP;

    const breakevenIncome = 60000; // Approximate breakeven point
    const recommendation = annualIncome > breakevenIncome ? "BV" : "ZZP";

    setResult({
      annualIncome,
      zzp: {
        taxableIncome: taxableIncomeZZP,
        incomeTax: incomeTaxZZP,
        netIncome: netIncomeZZP,
        effectiveRate: (incomeTaxZZP / annualIncome) * 100,
      },
      bv: {
        corporateTax,
        profitAfterTax,
        dividendPortion,
        dividendTax,
        salaryYearly,
        incomeTaxOnSalary,
        totalTax: totalTaxBV,
        netIncome: netIncomeBV,
        effectiveRate: (totalTaxBV / annualIncome) * 100,
      },
      recommendation,
      breakeven: breakevenIncome,
      difference: Math.abs(netIncomeBV - netIncomeZZP),
      winner: netIncomeBV > netIncomeZZP ? "BV" : "ZZP",
    });
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
            <span className="eyebrow">Structure Comparison</span>
            <span className="text-sm text-[rgb(var(--color-text-muted))]">2026 Rules</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">ZZP vs BV Calculator</h1>
          <p className="text-lg text-[rgb(var(--color-text-muted))]">
            Compare tax structures side-by-side. Make the right choice for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input */}
          <div className="glass-panel reveal" data-reveal>
            <h3 className="text-xl font-bold mb-6">Your Income</h3>
            <div className="space-y-5">
              <div className="group">
                <label className="block text-sm font-semibold mb-2 text-[rgb(var(--color-text))]">
                  Expected Annual Revenue (€)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 80000"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  className="input-field w-full transition-all duration-300 hover:shadow-lg hover:shadow-[rgb(var(--color-primary))]/10"
                />
                <p className="text-xs text-[rgb(var(--color-text-muted))] mt-2">
                  💡 Breakeven point: ~€60,000
                </p>
              </div>

              <button
                onClick={calculate}
                className="btn-primary w-full transition-all duration-300 hover:scale-[1.02]"
              >
                Compare Structures
              </button>
            </div>
          </div>

          {/* Results */}
          {result && (
            <>
              {/* Recommendation Card */}
              <div className="lg:col-span-2 glass-panel reveal" data-reveal data-delay="0.1s">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">Recommendation</h3>
                  <span className={`px-4 py-2 rounded-full text-lg font-bold ${
                    result.winner === "BV" 
                      ? "bg-blue-500/20 text-blue-400" 
                      : "bg-emerald-500/20 text-emerald-400"
                  }`}>
                    {result.winner === "BV" ? "🏢 BV Structure" : "👤 ZZP Structure"}
                  </span>
                </div>

                <div className="p-6 bg-gradient-to-br from-[rgb(var(--color-accent))]/10 to-blue-500/10 rounded-xl border border-[rgb(var(--color-accent))]/20 mb-6">
                  <p className="text-lg mb-2">
                    <span className="font-bold">{result.winner} saves you </span>
                    <span className="text-2xl font-bold text-[rgb(var(--color-accent))]">{format(result.difference)}</span>
                    <span className="font-bold"> per year</span>
                  </p>
                  <p className="text-sm text-[rgb(var(--color-text-muted))]">
                    Based on €{result.annualIncome.toLocaleString()} annual revenue under 2026 tax rules
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* ZZP Card */}
                  <div className={`p-4 rounded-xl border-2 transition-all ${
                    result.winner === "ZZP" 
                      ? "border-emerald-500/50 bg-emerald-500/10" 
                      : "border-gray-700/50 bg-gray-800/30"
                  }`}>
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      👤 ZZP
                      {result.winner === "ZZP" && (
                        <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/30 text-emerald-400">Winner</span>
                      )}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[rgb(var(--color-text-muted))]">Taxable Income</span>
                        <span className="font-semibold">{format(result.zzp.taxableIncome)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[rgb(var(--color-text-muted))]">Income Tax</span>
                        <span className="font-semibold text-red-400">{format(result.zzp.incomeTax)}</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-700 pt-2">
                        <span className="font-semibold">Net Income</span>
                        <span className={`font-bold ${result.winner === "ZZP" ? "text-emerald-400" : ""}`}>
                          {format(result.zzp.netIncome)}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-[rgb(var(--color-text-muted))]">Effective Rate</span>
                        <span>{result.zzp.effectiveRate.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>

                  {/* BV Card */}
                  <div className={`p-4 rounded-xl border-2 transition-all ${
                    result.winner === "BV" 
                      ? "border-blue-500/50 bg-blue-500/10" 
                      : "border-gray-700/50 bg-gray-800/30"
                  }`}>
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      🏢 BV
                      {result.winner === "BV" && (
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-500/30 text-blue-400">Winner</span>
                      )}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[rgb(var(--color-text-muted))]">Corporate Tax</span>
                        <span className="font-semibold">{format(result.bv.corporateTax)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[rgb(var(--color-text-muted))]">Dividend Tax</span>
                        <span className="font-semibold text-red-400">{format(result.bv.dividendTax)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[rgb(var(--color-text-muted))]">Income Tax (Salary)</span>
                        <span className="font-semibold text-red-400">{format(result.bv.incomeTaxOnSalary)}</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-700 pt-2">
                        <span className="font-semibold">Total Tax</span>
                        <span className="font-semibold text-red-400">{format(result.bv.totalTax)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Net Income</span>
                        <span className={`font-bold ${result.winner === "BV" ? "text-blue-400" : ""}`}>
                          {format(result.bv.netIncome)}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-[rgb(var(--color-text-muted))]">Effective Rate</span>
                        <span>{result.bv.effectiveRate.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="glass-panel reveal" data-reveal data-delay="0.2s">
            <h4 className="font-bold mb-3 flex items-center gap-2">
              👤 ZZP (Zelfstandige zonder Personeel)
            </h4>
            <ul className="space-y-2 text-sm text-[rgb(var(--color-text-muted))]">
              <li>✅ Simple setup and administration</li>
              <li>✅ Full control over income</li>
              <li>✅ Zelfstandigenaftrek: €1,200 (2026)</li>
              <li>❌ Higher income tax rates</li>
              <li>❌ Personal liability for business debts</li>
            </ul>
          </div>

          <div className="glass-panel reveal" data-reveal data-delay="0.3s">
            <h4 className="font-bold mb-3 flex items-center gap-2">
              🏢 BV (Besloten Vennootschap)
            </h4>
            <ul className="space-y-2 text-sm text-[rgb(var(--color-text-muted))]">
              <li>✅ Limited liability protection</li>
              <li>✅ Lower corporate tax: 19% up to €200K</li>
              <li>✅ Tax flexibility (salary + dividend mix)</li>
              <li>❌ Higher administrative costs</li>
              <li>❌ Notarial deed required (~€500-€1,000)</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

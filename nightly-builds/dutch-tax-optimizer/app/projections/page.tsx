"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/20 to-orange-50/20">
      <header className="border-b border-[rgb(var(--color-line))]/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <Link href="/" className="text-[rgb(var(--color-text-muted))] hover:text-[rgb(var(--color-primary))]">← Back</Link>
          <h1 className="text-5xl font-bold mt-4 text-gradient">Tax Projections</h1>
          <p className="mt-2 text-[rgb(var(--color-text-muted))] text-lg">Calculate your potential tax savings and plan ahead</p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Income & Deductions</CardTitle>
              <CardDescription>Enter your financial information for 2026</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="Expected Annual Income (€)" type="number" placeholder="e.g., 80000" value={formData.income} onChange={e => setFormData({ ...formData, income: e.target.value })} />
              <Input label="Expected Deductions (€)" type="number" placeholder="e.g., 15000" value={formData.deductions} onChange={e => setFormData({ ...formData, deductions: e.target.value })} />
              <Input label="Expected WBSO Benefit (€)" type="number" placeholder="e.g., 8000" value={formData.wbso} onChange={e => setFormData({ ...formData, wbso: e.target.value })} />
              <Input label="Other Tax Credits (€)" type="number" placeholder="e.g., 2000" value={formData.credits} onChange={e => setFormData({ ...formData, credits: e.target.value })} />
              <Button onClick={calculate} className="w-full" size="lg">Calculate Projection</Button>
            </CardContent>
          </Card>

          {projection && (
            <div className="space-y-6">
              <Card className="border-2 border-[rgb(var(--color-accent))]">
                <CardHeader>
                  <CardTitle>Tax Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-[rgb(var(--color-text-muted))]">Gross Income</span>
                    <span className="text-xl font-bold">{format(projection.grossIncome)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-[rgb(var(--color-text-muted))]">Total Deductions</span>
                    <span className="text-xl font-bold text-red-500">-{format(projection.totalDeductions)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-[rgb(var(--color-text-muted))]">Taxable Income</span>
                    <span className="text-xl font-bold">{format(projection.taxableIncome)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-[rgb(var(--color-text-muted))]">Income Tax</span>
                    <span className="text-xl font-bold text-red-500">{format(projection.incomeTax)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold">Net Income</span>
                    <span className="text-3xl font-bold text-[rgb(var(--color-accent))]">{format(projection.netIncome)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Effective Tax Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-6xl font-bold text-[rgb(var(--color-primary))]">{projection.effectiveTaxRate.toFixed(1)}%</p>
                      <p className="text-sm text-[rgb(var(--color-text-muted))] mt-2">After all deductions and credits</p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-[rgb(var(--color-accent))]/10 to-[rgb(var(--color-accent))]/5 rounded-xl border border-[rgb(var(--color-accent))]/30">
                    <div className="flex justify-between items-center">
                      <span className="text-[rgb(var(--color-text-muted))]">You saved</span>
                      <span className="text-2xl font-bold text-[rgb(var(--color-accent))]">{format(projection.totalSavings)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </main>
  );
}

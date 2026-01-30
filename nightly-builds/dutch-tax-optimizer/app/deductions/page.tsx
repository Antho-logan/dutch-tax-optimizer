"use client";

import { useState } from "react";
import ScrollEffects from "@/components/ScrollEffects";
import Link from "next/link";

const deductions = [
  { id: 1, title: "Home Office Deduction", category: "Workspace", amount: "€0.19/kWh", desc: "Deduct energy costs for your home workspace", popular: true },
  { id: 2, title: "Equipment & Tools", category: "Equipment", amount: "Up to 100%", desc: "Computers, software, office furniture", popular: true },
  { id: 3, title: "Phone & Internet", category: "Communication", amount: "Business %", desc: "Deduct business portion of costs", popular: true },
  { id: 4, title: "Travel Expenses", category: "Travel", amount: "€0.21/km", desc: "Mileage allowance for business travel", popular: false },
  { id: 5, title: "Professional Development", category: "Education", amount: "100%", desc: "Courses, workshops, books", popular: false },
  { id: 6, title: "Health Insurance", category: "Insurance", amount: "Partial", desc: "Partial deduction possible", popular: false },
  { id: 7, title: "Business Meals", category: "Entertainment", amount: "Up to 80%", desc: "Meals with clients or partners", popular: false },
  { id: 8, title: "Marketing & Advertising", category: "Marketing", amount: "100%", desc: "Website, ads, promotional materials", popular: false },
];

export default function DeductionsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = deductions.filter(d => {
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase()) || d.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "all" || d.category.toLowerCase() === category;
    return matchSearch && matchCat;
  });

  const categories = ["all", ...new Set(deductions.map(d => d.category.toLowerCase()))];

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/10 to-indigo-50/10">
      <ScrollEffects />

      {/* Header */}
      <header className="border-b border-[rgb(var(--color-line))]/50 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="text-sm text-[rgb(var(--color-text-muted))] hover:text-[rgb(var(--color-primary))] transition-colors">
              ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] bg-clip-text text-transparent">
              Deductions Finder
            </h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Search Card */}
        <div className="glass-panel mb-8 reveal" data-reveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="eyebrow">Smart Search</span>
            <span className="text-sm text-[rgb(var(--color-text-muted))]">89 deductions found</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">Find Your Deductions</h2>
          <p className="text-[rgb(var(--color-text-muted))] mb-6">
            Search for deductions relevant to your business. We know Dutch tax law inside out.
          </p>

          <input
            type="text"
            placeholder="Search deductions... (e.g., home office, equipment, travel)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field mb-6"
          />

          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`
                  px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300
                  ${category === cat
                    ? "bg-[rgb(var(--color-primary))] text-white shadow-lg"
                    : "bg-[rgb(var(--bg-soft))] text-[rgb(var(--color-text-muted))] hover:bg-[rgb(var(--color-primary))]/10"}
                `}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 reveal" data-reveal>
          <p className="text-[rgb(var(--color-text-muted))]">
            Found <span className="font-bold text-[rgb(var(--color-primary))]">{filtered.length}</span> deduction{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Deduction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((d, index) => (
            <div
              key={d.id}
              className="feature-card reveal"
              data-reveal
              data-delay={`${index * 0.05}s`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  {d.popular && <span className="eyebrow block mb-2">Popular</span>}
                  <h3 className="text-xl font-bold">{d.title}</h3>
                  <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))] mt-2">
                    {d.category}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[rgb(var(--color-accent))]">{d.amount}</div>
                </div>
              </div>
              <p className="text-[rgb(var(--color-text-muted))] leading-relaxed mb-4">{d.desc}</p>
              <div className="flex items-center justify-between pt-4 border-t border-[rgb(var(--color-line))]">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[rgb(var(--color-accent))]/10 text-[rgb(var(--color-accent))]">
                  Eligible
                </span>
                <button className="text-sm font-semibold text-[rgb(var(--color-primary))] hover:underline">
                  Learn more →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

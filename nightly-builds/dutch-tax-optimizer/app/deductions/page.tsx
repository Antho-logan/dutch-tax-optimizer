"use client";

import { useState } from "react";
import ParticleField from "@/components/ParticleField";
import ScrollEffects from "@/components/ScrollEffects";

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
            <span className="eyebrow">Deduction Finder</span>
            <span className="text-sm text-[rgb(var(--color-text-muted))]">89 deductions available</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">Find Your Deductions</h1>
          <p className="text-lg text-[rgb(var(--color-text-muted))]">
            Search for deductions relevant to your business. We know Dutch tax law inside out.
          </p>
        </div>

        {/* Search Card */}
        <div className="glass-panel mb-8 reveal" data-reveal>
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
    </>
  );
}

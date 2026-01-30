"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { Input } from "@/components/Input";
import { Badge } from "@/components/Badge";
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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/20 to-indigo-50/20">
      <header className="border-b border-[rgb(var(--color-line))]/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <Link href="/" className="text-[rgb(var(--color-text-muted))] hover:text-[rgb(var(--color-primary))]">← Back</Link>
          <h1 className="text-5xl font-bold mt-4 text-gradient">Deductions Finder</h1>
          <p className="mt-2 text-[rgb(var(--color-text-muted))] text-lg">Discover all eligible Dutch tax deductions</p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-6xl">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search Deductions</CardTitle>
            <CardDescription>Find deductions relevant to your business</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Search deductions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-4"
            />
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-semibold transition-all
                    ${category === cat
                      ? "bg-[rgb(var(--color-primary))] text-white"
                      : "bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text-muted))] hover:bg-[rgb(var(--color-primary))]/10"}
                  `}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mb-4">
          <p className="text-[rgb(var(--color-text-muted))]">Found {filtered.length} deduction{filtered.length !== 1 ? "s" : ""}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(d => (
            <Card key={d.id} hover>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl">{d.title}</CardTitle>
                  {d.popular && <Badge>Popular</Badge>}
                </div>
                <Badge variant="outline" className="w-fit mb-3">{d.category}</Badge>
                <CardDescription className="text-base">{d.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[rgb(var(--color-text-muted))]">Deduction Amount</p>
                    <p className="text-2xl font-bold text-[rgb(var(--color-accent))]">{d.amount}</p>
                  </div>
                  <Badge variant="success">Eligible</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </main>
  );
}

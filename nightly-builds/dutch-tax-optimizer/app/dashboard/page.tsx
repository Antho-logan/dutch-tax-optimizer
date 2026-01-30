"use client";

import { useState } from "react";
import ParticleField from "@/components/ParticleField";
import ScrollEffects from "@/components/ScrollEffects";
import Link from "next/link";

export default function DashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isLoggedIn) {
    return (
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ScrollEffects />

        {/* Animated Background */}
        <div className="hero-gradient parallax-layer" data-parallax data-speed="0.12" />
        <div className="hero-rings parallax-layer" data-parallax data-speed="0.18" />
        <div className="absolute inset-0">
          <ParticleField count={25} />
        </div>

        {/* Login Card */}
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <div className="glass-panel reveal" data-reveal>
              <div className="text-center mb-8">
                <Link href="/" className="text-sm text-[rgb(var(--color-text-muted))] hover:text-[rgb(var(--color-primary))] transition-colors">
                  ← Back to home
                </Link>
                <h1 className="text-4xl font-bold mt-6 bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] bg-clip-text text-transparent">
                  Welcome Back
                </h1>
                <p className="text-[rgb(var(--color-text-muted))] mt-2">
                  Sign in to access your tax dashboard
                </p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[rgb(var(--color-text))]">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-[rgb(var(--color-text))]">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button type="submit" className="btn-primary w-full mt-6">
                  Sign In
                </button>

                <div className="text-center mt-6 text-sm text-[rgb(var(--color-text-muted))]">
                  Don't have an account?{" "}
                  <a href="#" className="text-[rgb(var(--color-primary))] font-semibold hover:underline">
                    Sign up free
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Dashboard Content
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/10 to-purple-50/10">
      <ScrollEffects />

      {/* Header */}
      <header className="border-b border-[rgb(var(--color-line))]/50 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] bg-clip-text text-transparent">
                Dutch Tax Optimizer
              </h1>
              <span className="text-xs uppercase tracking-wider text-[rgb(var(--color-text-muted))]">
                Dashboard
              </span>
            </div>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="text-sm text-[rgb(var(--color-text-muted))] hover:text-[rgb(var(--color-primary))] transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Savings", value: "€8,547", change: "+12%", icon: "💰" },
            { label: "Receipts Scanned", value: "247", change: "+23", icon: "📸" },
            { label: "Deductions Found", value: "89", change: "+8", icon: "🔍" },
            { label: "WBSO Status", value: "Approved", change: "Active", icon: "✅" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="card reveal"
              data-reveal
              data-delay={`${index * 0.1}s`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{stat.icon}</div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))]">
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-[rgb(var(--color-text-muted))]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 reveal" data-reveal>Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Scan Receipts", desc: "Upload and extract data", href: "/scan-receipts", icon: "📸", color: "from-orange-500 to-red-500" },
              { title: "Find Deductions", desc: "Discover tax savings", href: "/deductions", icon: "🔍", color: "from-purple-500 to-indigo-500" },
              { title: "WBSO Checker", desc: "Check eligibility", href: "/wbso-checker", icon: "🚀", color: "from-emerald-500 to-teal-500" },
              { title: "Tax Projection", desc: "Calculate savings", href: "/projections", icon: "📊", color: "from-amber-500 to-orange-500" },
            ].map((action, index) => (
              <Link
                key={action.title}
                href={action.href}
                className="feature-card reveal"
                data-reveal
                data-delay={`${index * 0.1}s`}
              >
                <div className={`text-4xl mb-4 bg-gradient-to-br ${action.color} w-16 h-16 rounded-2xl flex items-center justify-center`}>
                  {action.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{action.title}</h3>
                <p className="text-sm text-[rgb(var(--color-text-muted))]">{action.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card reveal" data-reveal>
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: "Receipt scanned", item: "Staples Amsterdam - €47.50", time: "2 hours ago", icon: "📸" },
              { action: "Deduction found", item: "Home Office - €1,234", time: "5 hours ago", icon: "✅" },
              { action: "WBSO updated", item: "Status: Approved", time: "Yesterday", icon: "🚀" },
              { action: "Projection saved", item: "2026 Tax Forecast", time: "2 days ago", icon: "📊" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-[rgb(var(--bg-soft))] rounded-xl hover:bg-[rgb(var(--color-bg))]/50 transition-colors">
                <div className="text-2xl">{activity.icon}</div>
                <div className="flex-1">
                  <div className="font-semibold">{activity.action}</div>
                  <div className="text-sm text-[rgb(var(--color-text-muted))]">{activity.item}</div>
                </div>
                <div className="text-xs text-[rgb(var(--color-text-muted))]">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

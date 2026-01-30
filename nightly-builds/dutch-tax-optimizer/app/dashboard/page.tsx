"use client";

import ParticleField from "@/components/ParticleField";
import ScrollEffects from "@/components/ScrollEffects";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <main className="relative min-h-screen">
      <ScrollEffects />

      {/* Animated Backgrounds (Like Landing Page) */}
      <div className="hero-gradient parallax-layer fixed inset-0" data-parallax data-speed="0.12" />
      <div className="hero-rings parallax-layer fixed inset-0" data-parallax data-speed="0.18" />
      <div className="fixed inset-0 pointer-events-none">
        <ParticleField count={25} />
      </div>

      {/* Premium Header with Glassmorphism */}
      <header className="relative z-50 border-b border-[rgb(var(--color-line))]/50 bg-white/70 backdrop-blur-md sticky top-0">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-[rgb(var(--color-text-muted))] hover:text-[rgb(var(--color-primary))] transition-colors">
                ← Home
              </Link>
              <div className="w-px h-6 bg-[rgb(var(--color-line))]" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] bg-clip-text text-transparent">
                Dutch Tax Optimizer
              </h1>
              <span className="text-xs uppercase tracking-wider text-[rgb(var(--color-text-muted)]">
                Dashboard
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 rounded-full hover:bg-[rgb(var(--color-primary))]/10 transition-colors">
                <span className="text-xl">🔔</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-[rgb(var(--color-primary))] rounded-full"></span>
              </button>

              {/* Profile Button */}
              <div className="relative">
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] text-white font-semibold text-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">
                    👤
                  </div>
                  <span>Account</span>
                  <svg className={`w-4 h-4 transition-transform ${showProfile ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Profile Dropdown */}
                {showProfile && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-[rgb(var(--color-line))] bg-white shadow-2xl overflow-hidden">
                    <div className="p-4 bg-gradient-to-r from-[rgb(var(--color-primary))]/10 to-[rgb(var(--color-secondary))]/10 border-b border-[rgb(var(--color-line))]">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] flex items-center justify-center text-white text-xl">
                          👤
                        </div>
                        <div>
                          <div className="font-bold text-[rgb(var(--color-text))]">Freelancer User</div>
                          <div className="text-sm text-[rgb(var(--color-text-muted))]">freelancer@example.com</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <Link href="/dashboard" className="block px-4 py-3 rounded-xl hover:bg-[rgb(var(--color-bg-soft))] transition-colors text-sm font-semibold text-[rgb(var(--color-text))]">
                        Dashboard
                      </Link>
                      <Link href="/settings" className="block px-4 py-3 rounded-xl hover:bg-[rgb(var(--color-bg-soft))] transition-colors text-sm font-semibold text-[rgb(var(--color-text))]">
                        Settings
                      </Link>
                      <Link href="/billing" className="block px-4 py-3 rounded-xl hover:bg-[rgb(var(--color-bg-soft))] transition-colors text-sm font-semibold text-[rgb(var(--color-text))]">
                        Billing
                      </Link>
                      <div className="border-t border-[rgb(var(--color-line))] my-2"></div>
                      <Link href="/" className="block px-4 py-3 rounded-xl hover:bg-red-50 transition-colors text-sm font-semibold text-red-600">
                        Sign Out
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
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
        <div className="glass-panel reveal" data-reveal>
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

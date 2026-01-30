"use client";

import ParticleField from "@/components/ParticleField";
import ScrollEffects from "@/components/ScrollEffects";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const [showProfile, setShowProfile] = useState(false);

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
      <div className="relative z-10 p-6 ml-0 lg:ml-72 transition-all duration-300">
        {/* Page Header */}
        <div className="mb-8 reveal" data-reveal>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] bg-clip-text text-transparent">
            Welcome back, Antho
          </h1>
          <p className="text-lg text-[rgb(var(--color-text-muted))]">
            Here's what's happening with your taxes this week.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Savings", value: "€8,547", change: "+12%", icon: "💰", trend: "up" },
            { label: "Receipts Scanned", value: "247", change: "+23", icon: "📸", trend: "up" },
            { label: "Deductions Found", value: "89", change: "+8", icon: "🔍", trend: "up" },
            { label: "WBSO Status", value: "Approved", change: "Active", icon: "✅", trend: "neutral" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="card reveal hover:scale-105 transition-transform duration-300"
              data-reveal
              data-delay={`${index * 0.1}s`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{stat.icon}</div>
                <span className={`
                  text-xs font-semibold px-3 py-1 rounded-full
                  ${stat.trend === "up" ? "bg-[rgb(var(--color-accent))]/10 text-[rgb(var(--color-accent))]" : "bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))]"}
                `}>
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
                className="feature-card reveal hover:scale-105 transition-transform duration-300"
                data-reveal
                data-delay={`${index * 0.1}s`}
              >
                <div className={`text-4xl mb-4 bg-gradient-to-br ${action.color} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg`}>
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Activity</h2>
            <button className="text-sm text-[rgb(var(--color-primary))] hover:underline font-semibold">
              View all →
            </button>
          </div>
          <div className="space-y-4">
            {[
              { action: "Receipt scanned", item: "Staples Amsterdam - €47.50", time: "2 hours ago", icon: "📸", amount: "+€47.50" },
              { action: "Deduction found", item: "Home Office - €1,234", time: "5 hours ago", icon: "✅", amount: "€456 savings" },
              { action: "WBSO updated", item: "Status: Approved", time: "Yesterday", icon: "🚀", amount: "€18,828" },
              { action: "Projection saved", item: "2026 Tax Forecast", time: "2 days ago", icon: "📊", amount: "€8,547" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-[rgb(var(--bg-soft))] rounded-xl hover:bg-[rgb(var(--color-bg))]/50 transition-all hover:scale-[1.02]">
                <div className="text-2xl">{activity.icon}</div>
                <div className="flex-1">
                  <div className="font-semibold">{activity.action}</div>
                  <div className="text-sm text-[rgb(var(--color-text-muted))]">{activity.item}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[rgb(var(--color-text-muted))]">{activity.time}</div>
                  <div className="text-sm font-bold text-[rgb(var(--color-accent))]">{activity.amount}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Savings Progress Card */}
        <div className="mt-8 card reveal" data-reveal style={{
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(20, 184, 166, 0.1))",
          borderColor: "rgba(16, 185, 129, 0.3)",
        }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold">You're on track!</h3>
              <p className="text-sm text-[rgb(var(--color-text-muted))]">Keep uploading receipts to maximize savings</p>
            </div>
            <div className="text-4xl">🎯</div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[rgb(var(--color-text-muted))]">Annual goal</span>
                <span className="font-bold">€8,547 / €10,000</span>
              </div>
              <div className="h-3 bg-[rgb(var(--bg-soft))] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[rgb(var(--color-accent))] to-[rgb(var(--color-primary))] rounded-full transition-all duration-500"
                  style={{ width: "85%" }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-[rgb(var(--color-text-muted))]">
              <span>💡</span>
              <span>Upload your business lunch receipts to reach €10K</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

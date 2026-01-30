"use client";

import { useState } from "react";
import Link from "next/link";
import ParticleField from "@/components/ParticleField";
import ScrollEffects from "@/components/ScrollEffects";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backUrl?: string;
}

export default function PageHeader({ title, subtitle, showBackButton = true, backUrl = "/dashboard" }: PageHeaderProps) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <ScrollEffects />

      {/* Animated Backgrounds */}
      <div className="hero-gradient parallax-layer fixed inset-0 -z-10" data-parallax data-speed="0.12" />
      <div className="hero-rings parallax-layer fixed inset-0 -z-10" data-parallax data-speed="0.18" />
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <ParticleField count={25} />
      </div>

      {/* Premium Header */}
      <header className="relative z-50 border-b border-[rgb(var(--color-line))]/30 bg-white/60 backdrop-blur-xl sticky top-0 shadow-sm">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {showBackButton && (
                <>
                  <Link href={backUrl} className="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--color-text-muted))] hover:text-[rgb(var(--color-primary))] transition-colors">
                    ← Back
                  </Link>
                  <div className="w-px h-8 bg-[rgb(var(--color-line))]"></div>
                </>
              )}
              <div>
                <span className="eyebrow block text-xs">{subtitle || "Dashboard"}</span>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[rgb(var(--color-text))]">
                  {title}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button className="relative p-2.5 rounded-xl hover:bg-[rgb(var(--color-bg-soft))] transition-colors group">
                <span className="text-xl group-hover:scale-110 transition-transform">🔔</span>
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[rgb(var(--color-primary))] rounded-full border-2 border-white"></span>
              </button>

              {/* Profile Button */}
              <div className="relative">
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] text-white font-semibold text-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                    <span className="text-lg">👤</span>
                  </div>
                  <span className="hidden sm:inline">Account</span>
                  <svg className={`w-4 h-4 transition-transform duration-300 ${showProfile ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Profile Dropdown */}
                {showProfile && (
                  <div className="absolute right-0 mt-3 w-72 rounded-2xl border border-[rgb(var(--color-line))] bg-white shadow-2xl overflow-hidden animate-fadeIn">
                    <div className="p-5 bg-gradient-to-r from-[rgb(var(--color-primary))]/10 to-[rgb(var(--color-secondary))]/10 border-b border-[rgb(var(--color-line))]">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] flex items-center justify-center text-white text-2xl shadow-lg">
                          👤
                        </div>
                        <div>
                          <div className="font-bold text-lg text-[rgb(var(--color-text))]">Freelancer User</div>
                          <div className="text-sm text-[rgb(var(--color-text-muted))]">freelancer@example.com</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[rgb(var(--color-bg-soft))] transition-colors font-semibold text-sm text-[rgb(var(--color-text))]">
                        <span>📊</span>
                        Dashboard
                      </Link>
                      <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[rgb(var(--color-bg-soft))] transition-colors font-semibold text-sm text-[rgb(var(--color-text))]">
                        <span>⚙️</span>
                        Settings
                      </Link>
                      <div className="border-t border-[rgb(var(--color-line))] my-2"></div>
                      <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors font-semibold text-sm text-red-600">
                        <span>🚪</span>
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
    </>
  );
}

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
      <header className="relative z-50 border-b border-[rgb(var(--color-line))]/50 bg-white/70 backdrop-blur-md sticky top-0">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {showBackButton && (
                <>
                  <Link href={backUrl} className="text-sm text-[rgb(var(--color-text-muted))] hover:text-[rgb(var(--color-primary))] transition-colors">
                    ← Back
                  </Link>
                  <div className="w-px h-6 bg-[rgb(var(--color-line))]" />
                </>
              )}
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] bg-clip-text text-transparent">
                {title}
              </h1>
              {subtitle && (
                <span className="text-xs uppercase tracking-wider text-[rgb(var(--color-text-muted))]">
                  {subtitle}
                </span>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-full hover:bg-[rgb(var(--color-primary))]/10 transition-colors">
                <span className="text-xl">🔔</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-[rgb(var(--color-primary))] rounded-full"></span>
              </button>

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
    </>
  );
}

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

      {/* Minimal Header - Landing Page Style */}
      <header className="relative z-50 border-b border-[rgb(var(--color-line))]/30 bg-white/60 backdrop-blur-md sticky top-0">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {showBackButton && (
                <Link href={backUrl} className="text-sm text-[rgb(var(--color-text-muted))] hover:text-[rgb(var(--color-primary))] transition-colors font-medium">
                  ← Back
                </Link>
              )}
              <div>
                <p className="eyebrow mb-1">{subtitle || "Dashboard"}</p>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[rgb(var(--color-text))]">
                  {title}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Profile - Minimal Style */}
              <button className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] text-white font-semibold text-sm hover:shadow-lg transition-all duration-300">
                <span className="text-base">👤</span>
                <span className="hidden sm:inline">Account</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

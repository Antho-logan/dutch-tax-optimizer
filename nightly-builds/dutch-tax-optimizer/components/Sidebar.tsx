"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const iconClass = "w-5 h-5";

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    badge: null,
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    href: "/history",
    label: "History & Reports",
    badge: "12",
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6M9 17h6" />
      </svg>
    ),
  },
  {
    href: "/profile",
    label: "Profile",
    badge: null,
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M4 20c1.6-3.5 4.6-5.5 8-5.5s6.4 2 8 5.5" />
      </svg>
    ),
  },
  {
    href: "/scan-receipts",
    label: "Scan Receipts",
    badge: "3",
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7h4l2-2h4l2 2h4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    href: "/deductions",
    label: "Deductions",
    badge: "89",
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12V7a2 2 0 0 1 2-2h5l9 9-7 7-9-9z" />
        <circle cx="7" cy="7" r="1.5" />
      </svg>
    ),
  },
  {
    href: "/wbso-checker",
    label: "WBSO Checker",
    badge: null,
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M8.5 12.5l2.5 2.5 4.5-5" />
      </svg>
    ),
  },
  {
    href: "/projections",
    label: "Tax Projections",
    badge: null,
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19h16" />
        <path d="M6 15l4-4 3 3 5-6" />
        <circle cx="6" cy="15" r="1" />
        <circle cx="10" cy="11" r="1" />
        <circle cx="13" cy="14" r="1" />
        <circle cx="18" cy="8" r="1" />
      </svg>
    ),
  },
];

const savingsData = [6500, 7200, 7800, 8100, 8347, 8547];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  // Calculate days until tax deadline (May 1, 2026)
  const today = new Date();
  const taxDeadline = new Date(2026, 4, 1); // May 1, 2026
  const daysUntilDeadline = Math.max(0, Math.ceil((taxDeadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  // Calculate sparkline SVG path
  const maxSavings = Math.max(...savingsData);
  const minSavings = Math.min(...savingsData);
  const sparklinePoints = savingsData.map((val, i) => {
    const x = (i / (savingsData.length - 1)) * 100;
    const y = 100 - ((val - minSavings) / (maxSavings - minSavings)) * 100;
    return `${x},${y}`;
  }).join(" ");

  return (
    <>
      {/* Mobile Overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-full bg-white/95 backdrop-blur-xl border-r border-[rgb(var(--color-line))]/50
          transition-all duration-300 ease-out z-50
          ${collapsed ? "w-16" : "w-72"}
          ${collapsed ? "lg:w-16" : "lg:w-72"}
        `}
      >
        {/* Header */}
        <div className="h-16 border-b border-[rgb(var(--color-line))]/50 flex items-center justify-between px-4">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] text-white text-xs font-bold flex items-center justify-center">
                NL
              </div>
              <div>
                <div className="font-bold text-sm bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] bg-clip-text text-transparent">
                  Dutch Tax
                </div>
                <div className="text-xs text-[rgb(var(--color-text-muted))]">Optimizer</div>
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-[rgb(var(--color-primary))]/10 transition-colors"
          >
            <svg className={`w-5 h-5 transition-transform ${collapsed ? "" : "rotate-180"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto h-[calc(100%-4rem)] p-4 space-y-6">
          {/* User Profile */}
          {!collapsed && (
            <div className="glass-panel p-4 reveal" data-reveal>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] flex items-center justify-center text-white text-xl font-bold">
                  A
                </div>
                <div>
                  <div className="font-bold text-[rgb(var(--color-text))]">Antho Polon</div>
                  <div className="text-xs text-[rgb(var(--color-text-muted))]">Freelancer</div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[rgb(var(--bg-soft))] rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-[rgb(var(--color-accent))]">EUR 8.5K</div>
                  <div className="text-xs text-[rgb(var(--color-text-muted))]">Saved this year</div>
                </div>
                <div className="bg-[rgb(var(--bg-soft))] rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-[rgb(var(--color-primary))]">247</div>
                  <div className="text-xs text-[rgb(var(--color-text-muted))]">Receipts</div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative
                    ${isActive
                      ? "bg-gradient-to-r from-[rgb(var(--color-primary))]/10 to-[rgb(var(--color-secondary))]/10 text-[rgb(var(--color-primary))] font-semibold"
                      : "text-[rgb(var(--color-text-muted))] hover:bg-[rgb(var(--color-bg-soft))] hover:text-[rgb(var(--color-text))]"}
                    ${collapsed ? "justify-center" : ""}
                  `}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))]">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  {isActive && !collapsed && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[rgb(var(--color-primary))] rounded-r-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Savings Trend Graph */}
          {!collapsed && (
            <div className="glass-panel p-4 reveal" data-reveal>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-[rgb(var(--color-text))]">Savings Trend</span>
                <span className="text-xs text-[rgb(var(--color-accent))] font-bold">+31%</span>
              </div>
              <svg viewBox="0 0 100 50" className="w-full h-12">
                <defs>
                  <linearGradient id="sparklineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgb(var(--color-accent))" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="rgb(var(--color-accent))" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d={`M0,50 L${sparklinePoints} L100,50 Z`}
                  fill="url(#sparklineGradient)"
                />
                <polyline
                  points={sparklinePoints}
                  fill="none"
                  stroke="rgb(var(--color-accent))"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="100"
                  cy={sparklinePoints.split(" ").pop()?.split(",")[1]}
                  r="3"
                  fill="rgb(var(--color-accent))"
                />
              </svg>
              <div className="flex justify-between text-xs text-[rgb(var(--color-text-muted))] mt-2">
                <span>Jul</span>
                <span>Dec</span>
              </div>
            </div>
          )}

          {/* Tax Deadline Countdown */}
          {!collapsed && (
            <div className="card p-4 reveal" data-reveal>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[rgb(var(--color-primary))]/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[rgb(var(--color-primary))]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-[rgb(var(--color-text-muted))]">Tax deadline in</div>
                  <div className="text-2xl font-bold text-[rgb(var(--color-primary))]">
                    {daysUntilDeadline} days
                  </div>
                </div>
              </div>
              <div className="mt-3 h-2 bg-[rgb(var(--bg-soft))] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] rounded-full transition-all duration-500"
                  style={{ width: `${((365 - daysUntilDeadline) / 365) * 100}%` }}
                />
              </div>
              <div className="text-xs text-[rgb(var(--color-text-muted))] mt-1">
                May 1, 2026
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="space-y-2">
            <button
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed border-[rgb(var(--color-line))]/50
                text-[rgb(var(--color-text-muted))] hover:border-[rgb(var(--color-primary))]/50 hover:bg-[rgb(var(--color-primary))]/5
                transition-all duration-200
                ${collapsed ? "justify-center" : ""}
              `}
            >
              <span className="w-9 h-9 rounded-full bg-[rgb(var(--color-primary))]/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-[rgb(var(--color-primary))]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
              {!collapsed && <span className="text-sm font-semibold">Upload Receipt</span>}
            </button>

            <Link
              href="/profile"
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl
                text-[rgb(var(--color-text-muted))] hover:bg-[rgb(var(--color-bg-soft))] hover:text-[rgb(var(--color-text))]
                transition-all duration-200
                ${collapsed ? "justify-center" : ""}
              `}
            >
              <span className="w-9 h-9 rounded-full bg-[rgb(var(--color-primary))]/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-[rgb(var(--color-primary))]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                  <circle cx="9" cy="6" r="1.5" />
                  <circle cx="15" cy="12" r="1.5" />
                  <circle cx="7" cy="18" r="1.5" />
                </svg>
              </span>
              {!collapsed && <span className="text-sm font-semibold">Profile & Settings</span>}
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Margin (when sidebar is open) */}
      <div className={`${collapsed ? "lg:ml-16" : "lg:ml-72"} transition-all duration-300`} />
    </>
  );
}

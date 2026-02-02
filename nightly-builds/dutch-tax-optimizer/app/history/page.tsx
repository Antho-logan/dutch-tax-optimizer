import ParticleField from "@/components/ParticleField";
import ScrollEffects from "@/components/ScrollEffects";

const history = [
  {
    id: "Q1 Forecast",
    date: "Jan 12, 2026",
    income: 92000,
    deductions: 15800,
    savings: 5840,
    status: "Exported",
  },
  {
    id: "Q4 Snapshot",
    date: "Dec 18, 2025",
    income: 88000,
    deductions: 14250,
    savings: 5268,
    status: "Ready",
  },
  {
    id: "Mid-year Review",
    date: "Jul 04, 2025",
    income: 76000,
    deductions: 12600,
    savings: 4667,
    status: "Archived",
  },
  {
    id: "Annual Filing",
    date: "Apr 22, 2025",
    income: 104000,
    deductions: 19800,
    savings: 7325,
    status: "Exported",
  },
];

const reportHighlights = [
  { label: "Reports generated", value: "18" },
  { label: "Total savings tracked", value: "EUR 42,780" },
  { label: "Audit readiness", value: "100%" },
];

const testimonials = [
  {
    quote: "Exports look clean and accountant-ready without extra edits.",
    author: "Iris van Leeuwen",
    role: "Finance advisor",
  },
  {
    quote: "Historical views help me plan cash flow with confidence.",
    author: "Milan Janssen",
    role: "Creative director",
  },
];

export default function HistoryPage() {
  const format = (amount: number) =>
    new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <>
      <ScrollEffects />

      <div className="hero-gradient parallax-layer fixed inset-0 -z-10" data-parallax data-speed="0.12" />
      <div className="hero-rings parallax-layer fixed inset-0 -z-10" data-parallax data-speed="0.18" />
      <div className="fixed inset-0 pointer-events-none -z-10">
        <ParticleField count={20} />
      </div>

      <div className="relative z-10 p-6 ml-0 lg:ml-72 transition-all duration-300 max-w-6xl">
        <div className="mb-10 reveal" data-reveal>
          <span className="eyebrow">History</span>
          <h1 className="section-title mt-4">Past calculations and reports.</h1>
          <p className="text-lg text-[rgb(var(--color-text-muted))] mt-4 max-w-3xl">
            Track every estimate, export clean PDFs, and keep a full audit trail in one premium workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {reportHighlights.map((item, index) => (
            <div
              key={item.label}
              className="glass-panel reveal transition-all duration-300 hover:-translate-y-1"
              data-reveal
              data-delay={`${index * 0.1}s`}
            >
              <div className="text-2xl font-bold text-[rgb(var(--color-primary))]">{item.value}</div>
              <div className="text-sm font-semibold text-[rgb(var(--color-text))] mt-2">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-8">
          <div className="space-y-6">
            <div className="glass-panel reveal" data-reveal>
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <div>
                  <span className="eyebrow">Reports</span>
                  <h2 className="text-2xl font-bold mt-2">Calculation history</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className="btn-primary">Export PDF</button>
                  <button className="btn-ghost">Export CSV</button>
                </div>
              </div>

              <div className="space-y-3">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-2xl bg-white/70 border border-[rgb(var(--color-line))] hover:-translate-y-0.5 hover:shadow-lg transition-all"
                  >
                    <div>
                      <div className="font-semibold text-[rgb(var(--color-text))]">{item.id}</div>
                      <div className="text-xs text-[rgb(var(--color-text-muted))] mt-1">{item.date}</div>
                    </div>
                    <div className="flex flex-wrap gap-6 text-sm">
                      <div>
                        <div className="text-xs text-[rgb(var(--color-text-muted))]">Income</div>
                        <div className="font-semibold">{format(item.income)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-[rgb(var(--color-text-muted))]">Deductions</div>
                        <div className="font-semibold text-[rgb(var(--color-primary))]">{format(item.deductions)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-[rgb(var(--color-text-muted))]">Savings</div>
                        <div className="font-semibold text-[rgb(var(--color-accent))]">{format(item.savings)}</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))]">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card reveal" data-reveal>
              <span className="eyebrow">Audit trail</span>
              <h3 className="text-2xl font-bold mt-2">Report readiness timeline</h3>
              <div className="space-y-4 mt-6">
                {[
                  "Receipts reconciled and categorized",
                  "Deductions verified against Dutch rules",
                  "Exports signed and stored in vault",
                ].map((step, index) => (
                  <div key={step} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[rgb(var(--color-accent))]/10 flex items-center justify-center text-sm font-bold text-[rgb(var(--color-accent))]">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-[rgb(var(--color-text))]">{step}</div>
                      <div className="text-xs text-[rgb(var(--color-text-muted))] mt-1">Updated within 24 hours.</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-panel reveal" data-reveal>
              <span className="eyebrow">Exports</span>
              <h3 className="text-2xl font-bold mt-2">Report center</h3>
              <p className="text-sm text-[rgb(var(--color-text-muted))] mt-3">
                Keep your accountant up to speed with monthly, quarterly, or annual exports.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  { label: "Monthly summary", detail: "PDF with receipts and totals" },
                  { label: "Quarterly VAT pack", detail: "CSV + PDF reconciliation" },
                  { label: "Annual filing", detail: "Full audit log" },
                ].map((item) => (
                  <div key={item.label} className="p-4 rounded-2xl bg-white/70 border border-[rgb(var(--color-line))]">
                    <div className="font-semibold text-[rgb(var(--color-text))]">{item.label}</div>
                    <div className="text-xs text-[rgb(var(--color-text-muted))] mt-1">{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card reveal" data-reveal>
              <span className="eyebrow">Social proof</span>
              <h3 className="text-2xl font-bold mt-2">Built for real filings</h3>
              <div className="mt-6 space-y-4">
                {testimonials.map((item) => (
                  <div key={item.author} className="p-4 rounded-2xl bg-[rgb(var(--bg-soft))] border border-[rgb(var(--color-line))]">
                    <p className="text-sm text-[rgb(var(--color-text))]">"{item.quote}"</p>
                    <div className="text-xs text-[rgb(var(--color-text-muted))] mt-2">
                      {item.author} - {item.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

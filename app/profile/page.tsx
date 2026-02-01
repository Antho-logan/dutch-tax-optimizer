import ParticleField from "@/components/ParticleField";
import ScrollEffects from "@/components/ScrollEffects";

const preferences = [
  {
    id: "digest",
    title: "Weekly savings digest",
    description: "Summary every Monday at 09:00.",
    enabled: true,
  },
  {
    id: "alerts",
    title: "Deduction alerts",
    description: "Notify when new categories are detected.",
    enabled: true,
  },
  {
    id: "forecast",
    title: "Quarterly forecast refresh",
    description: "Auto-update projections every 90 days.",
    enabled: false,
  },
  {
    id: "sharing",
    title: "Accountant sharing",
    description: "Share reports with your advisor.",
    enabled: true,
  },
];

const testimonials = [
  {
    quote: "Premium polish with workflows that respect my time.",
    author: "Noor Hendriks",
    role: "Freelance strategist",
  },
  {
    quote: "The profile controls make collaboration with my accountant easy.",
    author: "Joris van Dijk",
    role: "Independent developer",
  },
];

export default function ProfilePage() {
  return (
    <>
      <ScrollEffects />

      <div className="hero-gradient parallax-layer fixed inset-0 -z-10" data-parallax data-speed="0.12" />
      <div className="hero-rings parallax-layer fixed inset-0 -z-10" data-parallax data-speed="0.18" />
      <div className="fixed inset-0 pointer-events-none -z-10">
        <ParticleField count={22} />
      </div>

      <div className="relative z-10 p-6 ml-0 lg:ml-72 transition-all duration-300 max-w-6xl">
        <div className="mb-10 reveal" data-reveal>
          <span className="eyebrow">Profile</span>
          <h1 className="section-title mt-4">Account details and preferences.</h1>
          <p className="text-lg text-[rgb(var(--color-text-muted))] mt-4 max-w-3xl">
            Keep your tax workspace up to date. Manage billing, notification preferences, and how reports are shared.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-8">
          <div className="space-y-6">
            <div className="glass-panel reveal" data-reveal>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="eyebrow">Account</span>
                  <h2 className="text-2xl font-bold mt-2">Primary details</h2>
                </div>
                <span className="text-xs text-[rgb(var(--color-text-muted))]">Last updated today</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[rgb(var(--color-text))]">
                    Full name
                  </label>
                  <input
                    type="text"
                    defaultValue="Antho Polon"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[rgb(var(--color-text))]">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="antho@studio.nl"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[rgb(var(--color-text))]">
                    Business type
                  </label>
                  <select className="input-field">
                    <option>Freelance</option>
                    <option>BV</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[rgb(var(--color-text))]">
                    VAT ID
                  </label>
                  <input
                    type="text"
                    defaultValue="NL001234567B01"
                    className="input-field"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold mb-2 text-[rgb(var(--color-text))]">
                    Invoice address
                  </label>
                  <input
                    type="text"
                    defaultValue="Keizersgracht 123, Amsterdam"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button className="btn-primary">Save changes</button>
                <button className="btn-ghost">Reset</button>
              </div>
            </div>

            <div className="card reveal" data-reveal>
              <span className="eyebrow">Security</span>
              <h3 className="text-2xl font-bold mt-2">Protect your workspace</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-2xl bg-[rgb(var(--bg-soft))] border border-[rgb(var(--color-line))]">
                  <div className="text-sm font-semibold text-[rgb(var(--color-text))]">Multi-factor auth</div>
                  <div className="text-xs text-[rgb(var(--color-text-muted))] mt-1">Enabled for all devices</div>
                </div>
                <div className="p-4 rounded-2xl bg-[rgb(var(--bg-soft))] border border-[rgb(var(--color-line))]">
                  <div className="text-sm font-semibold text-[rgb(var(--color-text))]">Login alerts</div>
                  <div className="text-xs text-[rgb(var(--color-text-muted))] mt-1">Email and SMS</div>
                </div>
              </div>
              <div className="mt-6 p-4 rounded-2xl border border-dashed border-[rgb(var(--color-line))] text-sm text-[rgb(var(--color-text-muted))]">
                Last security review: Jan 30, 2026. Next review scheduled in 60 days.
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-panel reveal" data-reveal>
              <span className="eyebrow">Preferences</span>
              <h3 className="text-2xl font-bold mt-2">Notifications and sharing</h3>
              <div className="space-y-4 mt-6">
                {preferences.map((pref) => (
                  <label
                    key={pref.id}
                    className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white/70 border border-[rgb(var(--color-line))] hover:border-[rgb(var(--color-primary))]/40 transition-all"
                  >
                    <div>
                      <div className="font-semibold text-[rgb(var(--color-text))]">{pref.title}</div>
                      <div className="text-xs text-[rgb(var(--color-text-muted))] mt-1">{pref.description}</div>
                    </div>
                    <span className="relative inline-flex items-center">
                      <input type="checkbox" className="peer sr-only" defaultChecked={pref.enabled} />
                      <span className="h-7 w-12 rounded-full bg-[rgb(var(--color-line))] peer-checked:bg-[rgb(var(--color-primary))] transition" />
                      <span className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-5" />
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="card reveal" data-reveal>
              <span className="eyebrow">Plan</span>
              <h3 className="text-2xl font-bold mt-2">Growth plan</h3>
              <p className="text-sm text-[rgb(var(--color-text-muted))] mt-3">
                Includes unlimited receipt scans, quarterly exports, and accountant collaboration.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[rgb(var(--bg-soft))] border border-[rgb(var(--color-line))]">
                  <div className="text-sm text-[rgb(var(--color-text-muted))]">Renewal</div>
                  <div className="text-lg font-bold text-[rgb(var(--color-text))]">Feb 20, 2026</div>
                </div>
                <div className="p-4 rounded-2xl bg-[rgb(var(--bg-soft))] border border-[rgb(var(--color-line))]">
                  <div className="text-sm text-[rgb(var(--color-text-muted))]">Monthly</div>
                  <div className="text-lg font-bold text-[rgb(var(--color-primary))]">EUR 39</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button className="btn-primary">Manage billing</button>
                <button className="btn-ghost">Download invoices</button>
              </div>
            </div>

            <div className="glass-panel reveal" data-reveal>
              <span className="eyebrow">Social proof</span>
              <h3 className="text-2xl font-bold mt-2">Trusted by modern freelancers</h3>
              <div className="mt-6 space-y-4">
                {testimonials.map((item) => (
                  <div key={item.author} className="p-4 rounded-2xl bg-white/70 border border-[rgb(var(--color-line))]">
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

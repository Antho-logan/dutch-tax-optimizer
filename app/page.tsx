import Link from "next/link";
import ScrollEffects from "@/components/ScrollEffects";
import ParticleField from "@/components/ParticleField";

const features = [
  {
    id: 1,
    title: "Receipt AI",
    description: "Snap a photo. Our AI extracts every deduction. No more manual data entry – just upload and done.",
    icon: "📸",
    stat: "2s",
    statLabel: "Processing time",
  },
  {
    id: 2,
    title: "Smart Deductions",
    description: "We know Dutch tax law inside out. Every freelance expense you can claim, automatically identified.",
    icon: "🔍",
    stat: "€8.5K",
    statLabel: "Avg. yearly savings",
  },
  {
    id: 3,
    title: "WBSO Wizard",
    description: "Dutch R&D tax credit made simple. We check your eligibility and guide you through the application.",
    icon: "🚀",
    stat: "€18.8K",
    statLabel: "Max. WBSO benefit",
  },
  {
    id: 4,
    title: "Tax Projection",
    description: "See your future. Calculate exactly what you'll owe – and what you'll save – before tax season arrives.",
    icon: "📊",
    stat: "98%",
    statLabel: "Accuracy rate",
  },
];

const testimonials = [
  {
    quote: "I saved €12,000 last year. The receipt scanner alone is worth 10x the subscription.",
    author: "Sarah de Vries",
    role: "Freelance UX Designer",
    location: "Amsterdam",
  },
  {
    quote: "Finally, tax software that understands Dutch freelancers. WBSO approval in 3 weeks.",
    author: "Mark Jansen",
    role: "Software Consultant",
    location: "Utrecht",
  },
  {
    quote: "Used to dread tax season. Now I just upload receipts and everything's done.",
    author: "Eva Bakker",
    role: "Copywriter",
    location: "Rotterdam",
  },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <ScrollEffects />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Animated Background Layers */}
        <div className="hero-gradient parallax-layer" data-parallax data-speed="0.12" />
        <div className="hero-rings parallax-layer" data-parallax data-speed="0.18" />
        <div className="absolute inset-0">
          <ParticleField count={30} />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 py-20 lg:py-32">
          <div className="max-w-5xl mx-auto text-center">
            <div className="reveal" data-reveal>
              <span className="eyebrow">For Dutch Freelancers</span>
              <h1 className="section-title mt-6 mb-6">
                Keep More of What You Earn.
                <span className="block mt-2 bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] bg-clip-text text-transparent">
                  Automatically.
                </span>
              </h1>
              <p className="text-xl text-[rgb(var(--color-text-muted))] max-w-3xl mx-auto leading-relaxed mb-10">
                Stop overpaying taxes. Our AI scans your receipts, finds every deduction,
                and calculates your WBSO eligibility. Join 500+ Dutch freelancers saving an average of
                <span className="font-bold text-[rgb(var(--color-primary))]"> €8,500/year</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/dashboard" className="btn-primary">
                  Start Saving Now
                  <span className="text-base">→</span>
                </Link>
                <Link href="#features" className="btn-ghost">
                  See How It Works
                </Link>
              </div>
              <div className="mt-16 grid grid-cols-3 gap-8 text-center max-w-2xl mx-auto">
                <div className="reveal" data-reveal data-delay="0.1s">
                  <div className="stat-value">€8.5K</div>
                  <div className="text-sm text-[rgb(var(--color-text-muted))] mt-1">Avg. savings/year</div>
                </div>
                <div className="reveal" data-reveal data-delay="0.2s">
                  <div className="stat-value">500+</div>
                  <div className="text-sm text-[rgb(var(--color-text-muted))] mt-1">Freelancers helped</div>
                </div>
                <div className="reveal" data-reveal data-delay="0.3s">
                  <div className="stat-value">2 min</div>
                  <div className="text-sm text-[rgb(var(--color-text-muted))] mt-1">To scan receipts</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section bg-[rgb(var(--bg-soft))]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 reveal" data-reveal>
            <span className="eyebrow">Powerful Features</span>
            <h2 className="section-title mt-4">
              Everything you need to optimize your taxes.
            </h2>
            <p className="text-lg text-[rgb(var(--color-text-muted))] mt-4 max-w-2xl mx-auto">
              Built for Dutch freelancers, by Dutch freelancers. We understand your unique challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="feature-card reveal"
                data-reveal
                data-delay={`${index * 0.1}s`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="text-4xl">{feature.icon}</div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[rgb(var(--color-primary))]">
                      {feature.stat}
                    </div>
                    <div className="text-xs text-[rgb(var(--color-text-muted))] uppercase tracking-wide">
                      {feature.statLabel}
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-[rgb(var(--color-text-muted))] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16 reveal" data-reveal>
            <span className="eyebrow">Simple Process</span>
            <h2 className="section-title mt-4">Three steps to tax savings.</h2>
          </div>

          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Upload Your Receipts",
                description: "Drag, drop, done. Our AI extracts vendor, amount, category, and date in seconds.",
              },
              {
                step: "02",
                title: "We Find Deductions",
                description: "Every expense is analyzed against Dutch tax law. We flag what you can claim.",
              },
              {
                step: "03",
                title: "File with Confidence",
                description: "Export your summary, file your taxes, and keep more of your hard-earned money.",
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="glass-panel reveal"
                data-reveal
                data-delay={`${index * 0.15}s`}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 text-5xl font-bold text-[rgb(var(--color-primary))] opacity-30">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-[rgb(var(--color-text-muted))] text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-[rgb(var(--bg-soft))]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16 reveal" data-reveal>
            <span className="eyebrow">Success Stories</span>
            <h2 className="section-title mt-4">Loved by freelancers.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, index) => (
              <div
                key={item.author}
                className="card reveal"
                data-reveal
                data-delay={`${index * 0.1}s`}
              >
                <div className="mb-6">
                  <div className="text-4xl font-bold text-[rgb(var(--color-primary))] opacity-20">"</div>
                  <p className="text-lg text-[rgb(var(--color-text))] leading-relaxed -mt-4">
                    {item.quote}
                  </p>
                </div>
                <div className="border-t border-[rgb(var(--color-line))] pt-4">
                  <div className="font-bold text-[rgb(var(--color-text))]">{item.author}</div>
                  <div className="text-sm text-[rgb(var(--color-text-muted))]">{item.role}</div>
                  <div className="text-xs text-[rgb(var(--color-primary))] mt-1">{item.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container mx-auto max-w-4xl">
          <div className="card reveal" data-reveal style={{
            background: "linear-gradient(135deg, rgba(234, 89, 50, 0.95), rgba(142, 97, 226, 0.95))",
            color: "white",
          }}>
            <div className="text-center py-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Save Thousands?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join 500+ Dutch freelancers who stopped overpaying taxes.
                Start your free trial today – no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-3 bg-white text-[rgb(var(--color-primary))] px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-[0.2em] hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  Get Started Free
                  <span className="text-base">→</span>
                </Link>
                <span className="text-white/70 text-sm">No credit card required</span>
              </div>

              <div className="grid grid-cols-3 gap-8 mt-16 pt-10 border-t border-white/20">
                <div>
                  <div className="text-4xl font-bold">€8.5K</div>
                  <div className="text-white/70 text-sm mt-1">Avg. savings/year</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">500+</div>
                  <div className="text-white/70 text-sm mt-1">Active users</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">4.9★</div>
                  <div className="text-white/70 text-sm mt-1">App rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section border-t border-[rgb(var(--color-line))]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[rgb(var(--color-text-muted))]">
            <span>© 2026 Dutch Tax Optimizer. Built for Dutch freelancers.</span>
            <span>Made with Next.js 15 + Tailwind CSS</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

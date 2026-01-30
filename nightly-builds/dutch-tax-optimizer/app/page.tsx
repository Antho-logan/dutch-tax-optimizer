import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";

const features = [
  {
    id: 1,
    title: "Receipt Scanner",
    description: "Upload receipts and let AI extract expense data automatically",
    icon: "📄",
    href: "/scan-receipts",
    color: "from-orange-500 to-red-600",
  },
  {
    id: 2,
    title: "Deductions Finder",
    description: "Discover all eligible Dutch tax deductions for freelancers",
    icon: "🔍",
    href: "/deductions",
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: 3,
    title: "WBSO Checker",
    description: "Check your 2026 WBSO eligibility (Dutch R&D tax credit)",
    icon: "💼",
    href: "/wbso-checker",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: 4,
    title: "Tax Projections",
    description: "Calculate your potential tax savings and plan ahead",
    icon: "📊",
    href: "/projections",
    color: "from-amber-500 to-orange-600",
  },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-orange-50/30 to-purple-50/30 dark:from-slate-950 dark:via-orange-950/20 dark:to-purple-950/20" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-[rgb(var(--color-line))]/50 backdrop-blur-sm bg-[rgb(var(--color-bg))]/50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gradient">
                Dutch Tax Optimizer
              </h1>
              <p className="mt-2 text-[rgb(var(--color-text-muted))] text-lg">
                AI-powered tax deductions for Dutch freelancers
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fadeIn">
          <Badge variant="outline" className="mb-6">
            Save Money on Your Taxes
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Maximize Your Deductions,{" "}
            <span className="text-gradient">Minimize Stress</span>
          </h2>
          <p className="text-xl text-[rgb(var(--color-text-muted))] max-w-2xl mx-auto leading-relaxed">
            Join hundreds of Dutch freelancers saving thousands with our intelligent tools.
            From receipt scanning to WBSO eligibility, we've got you covered.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Link key={feature.id} href={feature.href}>
              <Card hover className="group h-full animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div
                    className={`
                      w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color}
                      flex items-center justify-center text-3xl mb-4
                      group-hover:scale-110 transition-transform duration-300
                    `}
                  >
                    {feature.icon}
                  </div>
                  <CardTitle className="group-hover:text-[rgb(var(--color-primary))] transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-base mt-3">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full group-hover:bg-[rgb(var(--color-primary))] group-hover:text-white group-hover:border-transparent transition-all">
                    Get Started →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] border-0 text-white overflow-hidden relative">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 border border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-60 h-60 border border-white/30 rounded-full translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="relative z-10 text-center p-12">
              <h3 className="text-4xl font-bold mb-4">
                Ready to Optimize Your Taxes?
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join hundreds of Dutch freelancers saving thousands with our AI-powered tools.
                Start your free trial today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  variant="secondary"
                  className="bg-white text-[rgb(var(--color-primary))] hover:bg-white/90 px-8 py-4 text-lg"
                >
                  Get Started Free
                </Button>
                <span className="text-white/70 text-sm">No credit card required</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
                <div>
                  <div className="text-4xl font-bold">€8.5K</div>
                  <div className="text-white/70 text-sm mt-1">Avg. savings/year</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">500+</div>
                  <div className="text-white/70 text-sm mt-1">Freelancers helped</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">98%</div>
                  <div className="text-white/70 text-sm mt-1">Satisfaction rate</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[rgb(var(--color-line))]">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[rgb(var(--color-text-muted))]">
            <span>© 2026 Dutch Tax Optimizer. Built for Dutch freelancers.</span>
            <span>Made with Next.js 15 + Tailwind CSS</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

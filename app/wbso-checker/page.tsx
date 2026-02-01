"use client";

import { useState } from "react";
import ParticleField from "@/components/ParticleField";
import ScrollEffects from "@/components/ScrollEffects";

const questions = [
  { id: "innovative", text: "Developing new products, services, or processes?", desc: "WBSO supports technical R&D with innovative character" },
  { id: "technical", text: "Work involves technical research?", desc: "Research should have a technical nature" },
  { id: "uncertain", text: "Outcome of research is uncertain?", desc: "You shouldn't know in advance if you'll succeed" },
  { id: "systematic", text: "Following a structured approach?", desc: "Research should be planned and methodical" },
  { id: "expertise", text: "Have relevant expertise or hiring experts?", desc: "Professional knowledge is required" },
];

export default function WbsoCheckerPage() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (id: string, answer: boolean) => setAnswers(prev => ({ ...prev, [id]: answer }));

  const calculateEligibility = () => {
    const yesCount = Object.values(answers).filter(a => a).length;
    const pct = (yesCount / questions.length) * 100;

    if (pct >= 80) return { eligible: true, pct, message: "High likelihood! You should apply.", color: "from-emerald-500 to-teal-500" };
    if (pct >= 60) return { eligible: true, pct, message: "Good chance. Consult a WBSO advisor.", color: "from-blue-500 to-indigo-500" };
    if (pct >= 40) return { eligible: false, pct, message: "Possible, but may need stronger R&D components.", color: "from-amber-500 to-orange-500" };
    return { eligible: false, pct, message: "Lower likelihood. Focus on technical innovation.", color: "from-red-500 to-rose-500" };
  };

  const allAnswered = Object.keys(answers).length === questions.length;
  const result = showResult ? calculateEligibility() : null;

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
      <div className="relative z-10 p-6 ml-0 lg:ml-72 transition-all duration-300 max-w-3xl">
        {/* Page Header */}
        <div className="mb-8 reveal" data-reveal>
          <div className="flex items-center gap-3 mb-2">
            <span className="eyebrow">WBSO Checker</span>
            <span className="text-sm text-[rgb(var(--color-text-muted))]">Up to €18,828 benefit</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">Check Your Eligibility</h1>
          <p className="text-lg text-[rgb(var(--color-text-muted))]">
            Answer these questions to check if your R&D work qualifies for WBSO benefits.
          </p>
        </div>

        <div className="glass-panel mb-8 reveal" data-reveal>
          <h2 className="text-2xl font-bold mb-6">Eligibility Questionnaire</h2>

          <div className="space-y-4">
            {questions.map((q, i) => (
              <div
                key={q.id}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  answers[q.id] === true ? "border-[rgb(var(--color-accent))] bg-[rgb(var(--color-accent))]/5" :
                  answers[q.id] === false ? "border-red-300 bg-red-50/50" :
                  "border-[rgb(var(--color-line))] bg-[rgb(var(--bg-elev))]"
                } reveal`}
                data-reveal
                data-delay={`${i * 0.1}s`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] flex items-center justify-center text-white font-bold text-lg">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{q.text}</h3>
                    <p className="text-sm text-[rgb(var(--color-text-muted))] mb-4">{q.desc}</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAnswer(q.id, true)}
                        className={`px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wide transition-all duration-300 ${
                          answers[q.id] === true
                            ? "bg-[rgb(var(--color-accent))] text-white shadow-lg"
                            : "bg-[rgb(var(--bg-soft))] text-[rgb(var(--color-text-muted))] hover:bg-[rgb(var(--color-accent))]/10"
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => handleAnswer(q.id, false)}
                        className={`px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wide transition-all duration-300 ${
                          answers[q.id] === false
                            ? "bg-red-500 text-white shadow-lg"
                            : "bg-[rgb(var(--bg-soft))] text-[rgb(var(--color-text-muted))] hover:bg-red-100"
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button
              disabled={!allAnswered}
              onClick={() => setShowResult(true)}
              className={`px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                allAnswered
                  ? "btn-primary"
                  : "bg-[rgb(var(--bg-soft))] text-[rgb(var(--color-text-muted))] cursor-not-allowed"
              }`}
            >
              Check Eligibility
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className={`card reveal`} data-reveal style={{
            background: `linear-gradient(135deg, ${result.eligible ? 'rgba(16, 185, 129, 0.95), rgba(20, 184, 166, 0.95)' : 'rgba(245, 158, 11, 0.95), rgba(239, 68, 68, 0.95)'})`,
            color: "white",
          }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">{result.eligible ? "Good News!" : "Not Quite There"}</h2>
              <div className="text-4xl font-bold">{result.pct.toFixed(0)}%</div>
            </div>
            <p className="text-xl text-white/90 mb-8">{result.message}</p>

            <div className="bg-white/10 rounded-xl p-6 space-y-2 text-sm mb-8 backdrop-blur-sm">
              <p className="font-bold">Next Steps:</p>
              {result.eligible ? (
                <>
                  <p>1. Prepare detailed R&D project description</p>
                  <p>2. Document technical uncertainties</p>
                  <p>3. Apply through RVO.nl before starting</p>
                  <p>4. Consider hiring a WBSO consultant</p>
                </>
              ) : (
                <>
                  <p>1. Focus on technical innovation aspects</p>
                  <p>2. Document what makes research uncertain</p>
                  <p>3. Strengthen systematic approach</p>
                  <p>4. Consult with WBSO advisor</p>
                </>
              )}
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-white text-[rgb(var(--color-primary))] px-6 py-4 rounded-full text-sm font-semibold uppercase tracking-[0.2em] hover:shadow-2xl transition-all">
                {result.eligible ? "Start Application" : "Learn More"}
              </button>
              <button className="btn-ghost" style={{ borderColor: "rgba(255,255,255,0.3)", color: "white" }}>
                Download Guide
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

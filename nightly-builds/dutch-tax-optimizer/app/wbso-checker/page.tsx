"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import Link from "next/link";

const questions = [
  { id: "innovative", text: "Developing new products/services/processes?", desc: "WBSO supports technical R&D with innovative character" },
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

    if (pct >= 80) return { eligible: true, pct, message: "High likelihood! You should apply.", color: "success" };
    if (pct >= 60) return { eligible: true, pct, message: "Good chance. Consult a WBSO advisor.", color: "default" };
    if (pct >= 40) return { eligible: false, pct, message: "Possible, but may need stronger R&D components.", color: "warning" };
    return { eligible: false, pct, message: "Lower likelihood. Focus on technical innovation.", color: "warning" };
  };

  const allAnswered = Object.keys(answers).length === questions.length;
  const result = showResult ? calculateEligibility() : null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/20 to-teal-50/20">
      <header className="border-b border-[rgb(var(--color-line))]/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <Link href="/" className="text-[rgb(var(--color-text-muted))] hover:text-[rgb(var(--color-primary))]">← Back</Link>
          <h1 className="text-5xl font-bold mt-4 text-gradient">WBSO Checker</h1>
          <p className="mt-2 text-[rgb(var(--color-text-muted))] text-lg">Check your 2026 WBSO eligibility (Dutch R&D tax credit)</p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-3xl">
        <Card className="mb-8 border-2 border-[rgb(var(--color-primary))]/30">
          <CardHeader>
            <CardTitle>What is WBSO?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>The <strong>Wet Bevordering Speur- en Ontwikkelingswerk (WBSO)</strong> is a Dutch tax credit for R&D activities.</p>
            <p>In 2026, you can get up to <strong>€18,828</strong> in tax benefits for self-employed R&D work.</p>
          </CardContent>
        </Card>

        <div className="space-y-4 mb-8">
          <h2 className="text-3xl font-bold mb-4">Eligibility Questionnaire</h2>
          {questions.map((q, i) => (
            <Card key={q.id} className={answers[q.id] === true ? "border-2 border-[rgb(var(--color-accent))]" : answers[q.id] === false ? "border-2 border-red-300" : ""}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] flex items-center justify-center text-white font-bold text-lg">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{q.text}</h3>
                    <p className="text-sm text-[rgb(var(--color-text-muted))] mb-4">{q.desc}</p>
                    <div className="flex gap-3">
                      <Button
                        variant={answers[q.id] === true ? "primary" : "outline"}
                        onClick={() => handleAnswer(q.id, true)}
                        className={answers[q.id] === true ? "" : ""}
                      >
                        Yes
                      </Button>
                      <Button
                        variant={answers[q.id] === false ? "primary" : "outline"}
                        onClick={() => handleAnswer(q.id, false)}
                        className={answers[q.id] === false ? "bg-red-500 hover:bg-red-600" : ""}
                      >
                        No
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mb-8">
          <Button size="lg" disabled={!allAnswered} onClick={() => setShowResult(true)}>
            Check Eligibility
          </Button>
        </div>

        {result && (
          <Card className={`border-2 ${result.eligible ? "border-[rgb(var(--color-accent))]" : "border-amber-400"}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{result.eligible ? "Good News!" : "Not Quite There"}</CardTitle>
                <Badge variant={result.color === "success" ? "success" : "default"} className="text-lg px-4 py-1">
                  {result.pct.toFixed(0)}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-6">{result.message}</p>
              <div className="bg-[rgb(var(--color-bg))] rounded-xl p-6 space-y-2 text-sm mb-6">
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
                <Button className="flex-1">{result.eligible ? "Start Application" : "Learn More"}</Button>
                <Button variant="outline">Download Guide</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </main>
  );
}

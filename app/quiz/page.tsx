"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Rocket } from "lucide-react";

const QUESTIONS = [
  {
    id: "stage",
    question: "Where are you in your launch journey?",
    sub: "We'll skip steps you've already completed.",
    options: [
      { value: "idea",       label: "Just an idea",              desc: "I haven't started anything yet" },
      { value: "named",      label: "I have a concept",          desc: "Named it, maybe bought a domain" },
      { value: "registered", label: "Already registered",        desc: "I have an LLC or Corp filed" },
      { value: "open",       label: "Open but disorganized",     desc: "Running but missing key steps" },
    ],
  },
  {
    id: "type",
    question: "What kind of business are you building?",
    sub: "We'll surface the most relevant tools for your model.",
    options: [
      { value: "service",   label: "Service / Consulting",  desc: "Agency, freelance, coaching, B2B" },
      { value: "ecommerce", label: "Product / E-commerce",  desc: "Physical or digital products" },
      { value: "saas",      label: "SaaS / App",            desc: "Software, subscriptions, tech" },
      { value: "local",     label: "Local / Brick & Mortar", desc: "Retail, restaurant, trades" },
    ],
  },
  {
    id: "concern",
    question: "What's your biggest worry right now?",
    sub: "We'll prioritize the phases that matter most to you.",
    options: [
      { value: "legal",     label: "Doing it wrong legally",    desc: "Formation, contracts, compliance" },
      { value: "money",     label: "Banking & finances",        desc: "Accounts, credit, accounting" },
      { value: "customers", label: "Getting first customers",   desc: "Marketing, sales, brand" },
      { value: "product",   label: "Building the product",      desc: "Tech, ops, delivery" },
    ],
  },
];

const ACCENT_COLORS = ["#F97316", "#8B5CF6", "#16A34A"];

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0,1,2 = questions; 3 = loader
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);

  const q = QUESTIONS[step];
  const color = ACCENT_COLORS[step] ?? "#F97316";
  const isLast = step === QUESTIONS.length - 1;

  function handleSelect(value: string) {
    setSelected(value);
  }

  function handleNext() {
    if (!selected) return;
    const next = { ...answers, [q.id]: selected };
    setAnswers(next);
    setSelected(null);

    if (isLast) {
      // Save to localStorage and show loader
      if (typeof window !== "undefined") {
        localStorage.setItem("launchadvisor_quiz", JSON.stringify({
          ...next,
          completedAt: new Date().toISOString(),
        }));
      }
      setStep(3);
      setTimeout(() => router.push("/checklist"), 2000);
    } else {
      setStep(step + 1);
    }
  }

  // Loader screen
  if (step === 3) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--navy)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "20px 20px", pointerEvents: "none" }} />
        <div style={{ position: "relative", textAlign: "center", maxWidth: 480 }}>
          <div style={{ width: 64, height: 64, background: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <Rocket style={{ width: 32, height: 32, color: "white" }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "3rem", letterSpacing: "0.04em", color: "white", marginBottom: 12 }}>
            BUILDING<br />YOUR PLAN
          </h2>
          <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", marginBottom: 32 }}>
            Personalizing your 30-step checklist...
          </p>
          <div style={{ height: 6, background: "rgba(255,255,255,0.1)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.15)" }}>
            <div style={{ height: "100%", background: "var(--orange)", animation: "progressGrow 2s cubic-bezier(0.4,0,0.2,1) forwards" }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--navy)", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      {/* Background dot pattern */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "20px 20px", pointerEvents: "none" }} />

      {/* Header */}
      <div style={{ position: "relative", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", letterSpacing: "0.05em", color: "white" }}>
          LAUNCH<span style={{ color: "var(--orange)" }}>ADVISOR</span>
        </span>
        {/* Progress dots */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {QUESTIONS.map((_, i) => (
            <div key={i} style={{
              width: i === step ? 24 : 8,
              height: 8,
              background: i < step ? "var(--orange)" : i === step ? "var(--orange)" : "rgba(255,255,255,0.2)",
              transition: "all 0.3s ease",
            }} />
          ))}
        </div>
      </div>

      {/* Question */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 24px", position: "relative" }}>
        <div style={{ width: "100%", maxWidth: 600 }}>

          {/* Step label */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ height: 2, width: 32, background: color }} />
            <span style={{ fontFamily: "var(--font-display)", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
              Question {step + 1} of {QUESTIONS.length}
            </span>
          </div>

          {/* Question text */}
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.02em", color: "white", lineHeight: 1.05, marginBottom: 10 }}>
            {q.question}
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.45)", fontSize: "0.95rem", marginBottom: 32 }}>
            {q.sub}
          </p>

          {/* Options */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
            {q.options.map((opt) => {
              const isSelected = selected === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  style={{
                    padding: "18px 20px",
                    border: `2px solid ${isSelected ? color : "rgba(255,255,255,0.15)"}`,
                    background: isSelected ? `${color}22` : "rgba(255,255,255,0.04)",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                    boxShadow: isSelected ? `4px 4px 0 ${color}` : "none",
                    transform: isSelected ? "translate(-2px, -2px)" : "none",
                  }}
                >
                  <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.92rem", fontWeight: 700, color: isSelected ? "white" : "rgba(255,255,255,0.8)", marginBottom: 4 }}>
                    {opt.label}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: isSelected ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.35)", lineHeight: 1.4 }}>
                    {opt.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Next button */}
          <button
            onClick={handleNext}
            disabled={!selected}
            className="btn btn-primary"
            style={{
              width: "100%",
              fontSize: "0.85rem",
              padding: "14px 24px",
              opacity: selected ? 1 : 0.4,
              cursor: selected ? "pointer" : "not-allowed",
              justifyContent: "center",
            }}
          >
            {isLast ? "Build my plan" : "Next"} <ArrowRight style={{ width: 16, height: 16 }} />
          </button>
        </div>
      </div>
    </div>
  );
}

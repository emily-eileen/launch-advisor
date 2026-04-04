"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronDown, ChevronRight, ArrowRight, Zap, X } from "lucide-react";
import { phases, checklistSteps } from "@/lib/data/checklist";

const PHASE_COLORS = ["#F97316", "#8B5CF6", "#16A34A", "#0EA5E9", "#EF4444", "#F59E0B"];

const TYPE_LABELS: Record<string, string> = {
  service: "Service / Consulting",
  ecommerce: "Product / E-commerce",
  saas: "SaaS / App",
  local: "Local Business",
};
const CONCERN_PHASE: Record<string, number> = {
  legal: 2,
  money: 3,
  customers: 4,
  product: 6,
};

interface QuizAnswers {
  stage?: string;
  type?: string;
  concern?: string;
}

function SaveProgressModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    if (typeof window !== "undefined") {
      localStorage.setItem("launchadvisor_email", email.trim());
      localStorage.setItem("launchadvisor_email_prompted", "true");
    }
    setSubmitted(true);
    setTimeout(onClose, 1800);
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      {/* Backdrop */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(15,23,41,0.7)" }} onClick={onClose} />

      {/* Modal */}
      <div style={{ position: "relative", background: "var(--surface)", border: "2px solid var(--border)", boxShadow: "6px 6px 0 var(--orange)", maxWidth: 420, width: "100%", padding: 32 }}>
        <button onClick={onClose} style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", cursor: "pointer", color: "var(--ink-muted)" }}>
          <X style={{ width: 18, height: 18 }} />
        </button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "8px 0" }}>
            <CheckCircle2 style={{ width: 40, height: 40, color: "var(--orange)", margin: "0 auto 12px" }} />
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--navy)", letterSpacing: "0.04em" }}>
              PROGRESS SAVED
            </h3>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-muted)", fontSize: "0.85rem", marginTop: 6 }}>
              We'll send your plan to {email}
            </p>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <div style={{ height: 1, width: 24, background: "var(--orange)" }} />
              <span style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--orange)" }}>
                Step 1 complete!
              </span>
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--navy)", letterSpacing: "0.04em", marginBottom: 8, lineHeight: 1 }}>
              SAVE YOUR<br />PROGRESS
            </h3>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-muted)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 24 }}>
              Enter your email to save where you are and get personalized tips as you launch — no spam, ever.
            </p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                style={{ width: "100%" }}
              />
              <button type="submit" className="btn btn-primary" style={{ justifyContent: "center", fontSize: "0.82rem" }}>
                Save my progress <ArrowRight style={{ width: 14, height: 14 }} />
              </button>
            </form>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", marginTop: 12, width: "100%", fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--ink-muted)", textAlign: "center" }}>
              No thanks, I'll risk losing progress
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function ChecklistPage() {
  const [quiz, setQuiz] = useState<QuizAnswers>({});
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set([1]));
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage after mount
  useEffect(() => {
    const savedProgress = localStorage.getItem("launchadvisor_progress");
    const savedQuiz = localStorage.getItem("launchadvisor_quiz");
    const alreadyPrompted = localStorage.getItem("launchadvisor_email_prompted");

    const completedSet = savedProgress ? new Set<string>(JSON.parse(savedProgress)) : new Set<string>();
    setCompleted(completedSet);

    if (savedQuiz) {
      const q: QuizAnswers = JSON.parse(savedQuiz);
      setQuiz(q);
      // Expand the phase most relevant to their concern
      if (q.concern && CONCERN_PHASE[q.concern]) {
        setExpandedPhases(new Set([1, CONCERN_PHASE[q.concern]]));
      }
      // If already registered, expand Phase 3 by default
      if (q.stage === "registered" || q.stage === "open") {
        setExpandedPhases(new Set([3, 4]));
      }
    }

    // Show email prompt if they've just completed step 1 and haven't been prompted
    if (completedSet.has("decide-1") && !alreadyPrompted) {
      const emailSaved = localStorage.getItem("launchadvisor_email");
      if (!emailSaved) setShowSaveModal(true);
    }

    setHydrated(true);
  }, []);

  function togglePhase(num: number) {
    setExpandedPhases((prev) => {
      const next = new Set(prev);
      next.has(num) ? next.delete(num) : next.add(num);
      return next;
    });
  }

  function toggleStep(stepId: string) {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(stepId)) {
        next.delete(stepId);
      } else {
        next.add(stepId);
        // After completing first step, prompt email capture
        const alreadyPrompted = localStorage.getItem("launchadvisor_email_prompted");
        const emailSaved = localStorage.getItem("launchadvisor_email");
        if (stepId === "decide-1" && !alreadyPrompted && !emailSaved) {
          setTimeout(() => setShowSaveModal(true), 400);
        }
      }
      localStorage.setItem("launchadvisor_progress", JSON.stringify(Array.from(next)));
      return next;
    });
  }

  const totalDone = completed.size;
  const totalSteps = checklistSteps.length;

  if (!hydrated) return null; // avoid hydration mismatch

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {showSaveModal && (
        <SaveProgressModal onClose={() => {
          setShowSaveModal(false);
          localStorage.setItem("launchadvisor_email_prompted", "true");
        }} />
      )}

      {/* ── Header ─────────────────────────────────────────── */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <div style={{ height: 1, width: 32, background: "var(--orange)" }} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
            {totalSteps} steps · 6 phases
          </span>
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "3rem", letterSpacing: "0.02em", color: "var(--navy)", lineHeight: 1 }}>
          LAUNCH CHECKLIST
        </h1>

        {/* Quiz personalization banner */}
        {quiz.type && (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 10, padding: "6px 14px", background: "var(--orange-light)", border: "1.5px solid var(--orange)" }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--orange-dark)" }}>
              Your plan · {TYPE_LABELS[quiz.type] ?? quiz.type}
              {quiz.concern === "money" ? " · Banking focus" : quiz.concern === "legal" ? " · Legal focus" : quiz.concern === "customers" ? " · Growth focus" : ""}
            </span>
            <Link href="/quiz" style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "var(--orange-dark)", textDecoration: "underline" }}>
              retake quiz
            </Link>
          </div>
        )}
      </div>

      {/* ── Overall Progress Bar ───────────────────────────── */}
      <div className="panel" style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Zap style={{ width: 14, height: 14, color: "var(--orange)" }} />
            <span style={{ fontFamily: "var(--font-display)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
              Overall progress
            </span>
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--navy)", lineHeight: 1 }}>
            {totalDone}/{totalSteps}
          </span>
        </div>
        <div className="progress-track" style={{ height: 10 }}>
          <div className="progress-fill" style={{ width: `${(totalDone / totalSteps) * 100}%` }} />
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
          {phases.map((p, i) => {
            const phaseSteps = checklistSteps.filter(s => s.phase === p.number);
            const done = phaseSteps.filter(s => completed.has(s.id)).length;
            const pct = Math.round((done / phaseSteps.length) * 100);
            return (
              <div key={p.number} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 8, height: 8, background: PHASE_COLORS[i] }} />
                <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.65rem", fontWeight: 600, color: "var(--ink-muted)" }}>
                  {p.name} {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Phase Accordions ───────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {phases.map((phase, i) => {
          const color = PHASE_COLORS[i];
          const phaseSteps = checklistSteps.filter(s => s.phase === phase.number);
          const completedCount = phaseSteps.filter(s => completed.has(s.id)).length;
          const isExpanded = expandedPhases.has(phase.number);
          const isDone = completedCount === phaseSteps.length;
          const pct = Math.round((completedCount / phaseSteps.length) * 100);

          return (
            <div key={phase.number} className="panel"
              style={{ borderLeft: `4px solid ${color}`, overflow: "hidden" }}>

              {/* Phase header */}
              <button
                onClick={() => togglePhase(phase.number)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 16,
                  padding: "16px 20px", background: "none", border: "none", cursor: "pointer",
                  textAlign: "left", transition: "background 0.1s",
                }}
                className="phase-strip-header"
              >
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color, opacity: 0.35, lineHeight: 1, minWidth: 36, flexShrink: 0 }}>
                  0{phase.number}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 2 }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", letterSpacing: "0.06em", color: "var(--navy)" }}>
                      {phase.name.toUpperCase()}
                    </span>
                    {isDone && <CheckCircle2 style={{ width: 14, height: 14, color, flexShrink: 0 }} />}
                    <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 7px", border: `1.5px solid ${color}`, color, flexShrink: 0 }}>
                      {completedCount}/{phaseSteps.length}
                    </span>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--ink-muted)", lineHeight: 1.4 }}>
                    {phase.description}
                  </p>
                  <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ flex: 1, height: 4, background: "var(--border-light)", border: "1px solid var(--border-light)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: color, transition: "width 0.6s ease" }} />
                    </div>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "0.7rem", color, lineHeight: 1 }}>{pct}%</span>
                  </div>
                </div>
                <div style={{ flexShrink: 0, color: "var(--ink-muted)" }}>
                  {isExpanded ? <ChevronDown style={{ width: 18, height: 18 }} /> : <ChevronRight style={{ width: 18, height: 18 }} />}
                </div>
              </button>

              {/* Steps list */}
              {isExpanded && (
                <div style={{ borderTop: "1px solid var(--border-light)" }}>
                  {phaseSteps.map((step, idx) => {
                    const isDoneStep = completed.has(step.id);
                    const isLast = idx === phaseSteps.length - 1;
                    const stepNum = `${phase.number}.${step.order}`;

                    return (
                      <div
                        key={step.id}
                        style={{
                          display: "flex", alignItems: "center", gap: 14,
                          padding: "14px 20px 14px 24px",
                          borderBottom: isLast ? "none" : "1px solid var(--border-light)",
                          background: isDoneStep ? "rgba(249,115,22,0.03)" : "transparent",
                          transition: "background 0.1s",
                        }}
                      >
                        {/* Checkbox — toggles on click */}
                        <button
                          onClick={() => toggleStep(step.id)}
                          className={`step-checkbox ${isDoneStep ? "checked" : ""}`}
                          style={{ flexShrink: 0 }}
                        >
                          {isDoneStep && <CheckCircle2 style={{ width: 12, height: 12, color: "white" }} className="check-pop" />}
                        </button>

                        {/* Step number */}
                        <span style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", letterSpacing: "0.1em", color: isDoneStep ? color : "var(--ink-muted)", minWidth: 28, flexShrink: 0 }}>
                          {stepNum}
                        </span>

                        {/* Content — links to detail page */}
                        <Link href={`/checklist/${step.id}`} style={{ flex: 1, minWidth: 0, textDecoration: "none" }}>
                          <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.85rem", fontWeight: 600, color: isDoneStep ? "var(--ink-muted)" : "var(--navy)", textDecoration: isDoneStep ? "line-through" : "none", marginBottom: 2 }}>
                            {step.title}
                          </p>
                          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--ink-muted)", lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {step.description}
                          </p>
                        </Link>

                        {/* Resource count */}
                        {step.resources.length > 0 && (
                          <div style={{ fontFamily: "var(--font-display)", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: step.resources.some(r => r.affiliate) ? "var(--orange)" : "var(--ink-muted)", border: `1px solid ${step.resources.some(r => r.affiliate) ? "var(--orange)" : "var(--border-light)"}`, padding: "1px 5px", flexShrink: 0 }}>
                            {step.resources.length} tool{step.resources.length !== 1 ? "s" : ""}
                          </div>
                        )}

                        <Link href={`/checklist/${step.id}`} style={{ color: "var(--ink-muted)", flexShrink: 0, opacity: 0.5 }}>
                          <ArrowRight style={{ width: 14, height: 14 }} />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

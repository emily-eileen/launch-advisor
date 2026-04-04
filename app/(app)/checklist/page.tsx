"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Zap, X } from "lucide-react";
import { phases, checklistSteps } from "@/lib/data/checklist";

const PHASE_COLORS = ["#F97316", "#8B5CF6", "#16A34A", "#0EA5E9", "#EF4444", "#F59E0B", "#EC4899", "#06B6D4", "#A855F7", "#14B8A6"];

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
      <div style={{ position: "absolute", inset: 0, background: "rgba(15,23,41,0.7)" }} onClick={onClose} />
      <div style={{ position: "relative", background: "var(--surface)", border: "2px solid var(--border)", boxShadow: "6px 6px 0 var(--orange)", maxWidth: 420, width: "100%", padding: 32 }}>
        <button onClick={onClose} style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", cursor: "pointer", color: "var(--ink-muted)" }}>
          <X style={{ width: 18, height: 18 }} />
        </button>
        {submitted ? (
          <div style={{ textAlign: "center", padding: "8px 0" }}>
            <CheckCircle2 style={{ width: 40, height: 40, color: "var(--orange)", margin: "0 auto 12px" }} />
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--navy)", letterSpacing: "0.04em" }}>PROGRESS SAVED</h3>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-muted)", fontSize: "0.85rem", marginTop: 6 }}>We'll send your plan to {email}</p>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <div style={{ height: 1, width: 24, background: "var(--orange)" }} />
              <span style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--orange)" }}>Step 1 complete!</span>
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--navy)", letterSpacing: "0.04em", marginBottom: 8, lineHeight: 1 }}>SAVE YOUR<br />PROGRESS</h3>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-muted)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 24 }}>
              Enter your email to save where you are and get personalized tips as you launch — no spam, ever.
            </p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus style={{ width: "100%" }} />
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
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [emailSaved, setEmailSaved] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const savedProgress = localStorage.getItem("launchadvisor_progress");
    const completedSet = savedProgress ? new Set<string>(JSON.parse(savedProgress)) : new Set<string>();
    setCompleted(completedSet);

    const email = localStorage.getItem("launchadvisor_email");
    setEmailSaved(!!email);

    setHydrated(true);
  }, []);

  const totalDone = completed.size;
  const totalSteps = checklistSteps.length;
  const overallPct = Math.round((totalDone / totalSteps) * 100);

  // Find the first incomplete phase
  const currentPhaseNum = phases.find((p) => {
    const phaseSteps = checklistSteps.filter(s => s.phase === p.number);
    return phaseSteps.some(s => !completed.has(s.id));
  })?.number ?? 10;

  if (!hydrated) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {showSaveModal && (
        <SaveProgressModal onClose={() => {
          setShowSaveModal(false);
          localStorage.setItem("launchadvisor_email_prompted", "true");
          setEmailSaved(!!localStorage.getItem("launchadvisor_email"));
        }} />
      )}

      {/* ── Header ─────────────────────────────────────────── */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <div style={{ height: 1, width: 32, background: "var(--orange)" }} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
            {totalSteps} steps · 10 phases
          </span>
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "3rem", letterSpacing: "0.02em", color: "var(--navy)", lineHeight: 1 }}>
          LAUNCH CHECKLIST
        </h1>
      </div>

      {/* ── Email capture banner (shown until email is saved) ─ */}
      {!emailSaved && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 16, padding: "14px 20px", flexWrap: "wrap",
          background: "var(--navy)", borderLeft: "4px solid var(--orange)",
        }}>
          <div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", letterSpacing: "0.12em", color: "white", marginBottom: 2 }}>
              SAVE YOUR PROGRESS
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,255,255,0.55)" }}>
              Your checklist lives in your browser. Get a link so you never lose it.
            </p>
          </div>
          <button
            onClick={() => setShowSaveModal(true)}
            className="btn btn-primary"
            style={{ fontSize: "0.72rem", padding: "8px 18px", flexShrink: 0 }}
          >
            Save for free →
          </button>
        </div>
      )}

      {/* ── Overall Progress ───────────────────────────────── */}
      <div className="panel" style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
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
          <div className="progress-fill" style={{ width: `${overallPct}%` }} />
        </div>
        <div style={{ marginTop: 8 }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--ink-muted)" }}>
            {overallPct === 0 ? "Start with Phase 1 — Validate" : overallPct === 100 ? "All 55 steps complete 🎉" : `${overallPct}% complete · continue with Phase ${currentPhaseNum}`}
          </span>
        </div>
      </div>

      {/* ── Phase Grid ─────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
        {phases.map((phase, i) => {
          const color = PHASE_COLORS[i];
          const phaseSteps = checklistSteps.filter(s => s.phase === phase.number);
          const doneCnt = phaseSteps.filter(s => completed.has(s.id)).length;
          const pct = Math.round((doneCnt / phaseSteps.length) * 100);
          const isDone = doneCnt === phaseSteps.length;
          const isCurrent = phase.number === currentPhaseNum;

          return (
            <Link
              key={phase.number}
              href={`/checklist/phase/${phase.number}`}
              style={{ textDecoration: "none" }}
            >
              <div
                className="panel"
                style={{
                  borderLeft: `4px solid ${color}`,
                  padding: "18px 20px",
                  cursor: "pointer",
                  transition: "transform 0.1s, box-shadow 0.1s",
                  outline: isCurrent && overallPct > 0 ? `2px solid ${color}` : "none",
                  outlineOffset: 2,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0 ${color}40`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
              >
                {/* Phase num + status */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", color, opacity: 0.3, lineHeight: 1 }}>
                    {String(phase.number).padStart(2, "0")}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {isDone ? (
                      <CheckCircle2 style={{ width: 16, height: 16, color }} />
                    ) : (
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "2px 7px", border: `1.5px solid ${color}`, color }}>
                        {doneCnt}/{phaseSteps.length}
                      </span>
                    )}
                  </div>
                </div>

                {/* Name + description */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", letterSpacing: "0.06em", color: "var(--navy)", marginBottom: 4 }}>
                    {phase.name.toUpperCase()}
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--ink-muted)", lineHeight: 1.5, margin: 0 }}>
                    {phase.description}
                  </p>
                </div>

                {/* Progress bar + arrow */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ flex: 1, height: 4, background: "var(--border-light)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: color, transition: "width 0.4s ease" }} />
                  </div>
                  <ArrowRight style={{ width: 14, height: 14, color, opacity: 0.7, flexShrink: 0 }} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

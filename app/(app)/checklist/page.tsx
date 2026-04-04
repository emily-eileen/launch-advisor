"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight, Zap, X, CheckCircle2,
  Search, Hammer, Tag, FileText, DollarSign, MapPin, Palette, Shield, Users, Settings,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { phases, checklistSteps, getPhaseColor } from "@/lib/data/checklist";

const PHASE_ICON_MAP: Record<string, LucideIcon> = {
  Search, Hammer, Tag, FileText, DollarSign, MapPin, Palette, Shield, Users, Settings,
};

function SaveProgressModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    localStorage.setItem("launchadvisor_email", email.trim());
    localStorage.setItem("launchadvisor_email_prompted", "true");
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
          </div>
        ) : (
          <>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--navy)", letterSpacing: "0.04em", marginBottom: 8, lineHeight: 1 }}>SAVE YOUR<br />PROGRESS</h3>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-muted)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 24 }}>
              Your checklist lives in your browser. Enter your email so you don't lose it.
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
  const [completed, setCompleted]     = useState<Set<string>>(new Set());
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [emailSaved, setEmailSaved]   = useState(false);
  const [hydrated, setHydrated]       = useState(false);

  useEffect(() => {
    const savedProgress = localStorage.getItem("launchadvisor_progress");
    setCompleted(savedProgress ? new Set<string>(JSON.parse(savedProgress)) : new Set<string>());
    setEmailSaved(!!localStorage.getItem("launchadvisor_email"));
    setHydrated(true);
  }, []);

  const totalDone  = completed.size;
  const totalSteps = checklistSteps.length;
  const overallPct = totalSteps > 0 ? Math.round((totalDone / totalSteps) * 100) : 0;

  const currentPhaseNum = phases.find((p) => {
    const phaseSteps = checklistSteps.filter(s => s.phase === p.number);
    return phaseSteps.some(s => !completed.has(s.id));
  })?.number ?? phases[phases.length - 1].number;

  if (!hydrated) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
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

      {/* ── Save banner ─────────────────────────────────────── */}
      {!emailSaved && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 16, padding: "14px 20px", flexWrap: "wrap",
          background: "var(--navy)", borderLeft: "4px solid var(--orange)",
        }}>
          <div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", letterSpacing: "0.12em", color: "white", marginBottom: 2 }}>SAVE YOUR PROGRESS</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,255,255,0.55)" }}>Your checklist lives in your browser. Don't lose it.</p>
          </div>
          <button onClick={() => setShowSaveModal(true)} className="btn btn-primary" style={{ fontSize: "0.72rem", padding: "8px 18px", flexShrink: 0 }}>
            Save for free →
          </button>
        </div>
      )}

      {/* ── Overall Progress ────────────────────────────────── */}
      <div className="panel" style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Zap style={{ width: 14, height: 14, color: "var(--orange)" }} />
            <span style={{ fontFamily: "var(--font-display)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
              Overall progress
            </span>
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--navy)", lineHeight: 1 }}>
            {totalDone}<span style={{ fontSize: "1rem", color: "var(--ink-muted)" }}>/{totalSteps}</span>
          </span>
        </div>
        <div className="progress-track" style={{ height: 10 }}>
          <div className="progress-fill" style={{ width: `${overallPct}%` }} />
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--ink-muted)", marginTop: 8 }}>
          {overallPct === 0
            ? "Start with Phase 1 — Validate"
            : overallPct === 100
            ? "All steps complete!"
            : `${overallPct}% complete · continue with ${phases.find(p => p.number === currentPhaseNum)?.name ?? "next phase"}`}
        </p>
      </div>

      {/* ── Phase cards — collapsed, click to go to phase page ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {phases.map((phase, i) => {
          const color      = getPhaseColor(phase.number);
          const PhaseIcon  = PHASE_ICON_MAP[phase.icon] ?? Search;
          const phaseSteps = checklistSteps.filter(s => s.phase === phase.number);
          const doneCnt    = phaseSteps.filter(s => completed.has(s.id)).length;
          const pct        = phaseSteps.length ? Math.round((doneCnt / phaseSteps.length) * 100) : 0;
          const isDone     = doneCnt === phaseSteps.length;
          const isCurrent  = phase.number === currentPhaseNum && overallPct > 0 && overallPct < 100;

          return (
            <Link
              key={phase.number}
              href={`/checklist/phase/${phase.number}`}
              id={`phase-${phase.number}`}
              style={{ textDecoration: "none" }}
            >
              <div
                className="panel"
                style={{
                  borderLeft: `4px solid ${color}`,
                  padding: "16px 20px",
                  outline: isCurrent ? `2px solid ${color}` : "none",
                  outlineOffset: 2,
                  transition: "all 0.12s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "translateX(2px)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ""}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {/* Icon */}
                  <div style={{
                    width: 32, height: 32, background: isDone ? color : `${color}20`,
                    border: `1.5px solid ${isDone ? color : `${color}50`}`,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    {isDone
                      ? <CheckCircle2 style={{ width: 14, height: 14, color: "white" }} />
                      : <PhaseIcon style={{ width: 14, height: 14, color }} />
                    }
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 3 }}>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color, opacity: 0.7 }}>
                        Phase {String(i + 1).padStart(2, "0")}
                      </span>
                      {isCurrent && (
                        <span style={{ fontFamily: "var(--font-display)", fontSize: "0.5rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "1px 5px", background: color, color: "white" }}>
                          Current
                        </span>
                      )}
                    </div>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "1rem", letterSpacing: "0.06em", color: isDone ? "var(--ink-muted)" : "var(--navy)", textTransform: "uppercase", textDecoration: isDone ? "line-through" : "none", marginBottom: 2 }}>
                      {phase.name}
                    </p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.76rem", color: "var(--ink-muted)", lineHeight: 1.45, margin: 0 }}>
                      {phase.description}
                    </p>
                  </div>

                  {/* Right: count + arrow */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", letterSpacing: "0.1em", color: isDone ? color : "var(--ink-muted)" }}>
                      {doneCnt}/{phaseSteps.length}
                    </span>
                    <ArrowRight style={{ width: 13, height: 13, color, opacity: 0.6 }} />
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{ marginTop: 12, height: 3, background: "var(--border-light)", overflow: "hidden", marginLeft: 44 }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: color, transition: "width 0.4s ease" }} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

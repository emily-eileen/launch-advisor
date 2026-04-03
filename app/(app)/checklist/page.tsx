"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronDown, ChevronRight, ArrowRight, Zap } from "lucide-react";
import { phases, checklistSteps } from "@/lib/data/checklist";

const PHASE_COLORS = ["#F97316", "#8B5CF6", "#16A34A", "#0EA5E9", "#EF4444", "#F59E0B"];

const mockCompleted = new Set(["decide-1", "decide-2", "decide-3", "form-1"]);

export default function ChecklistPage() {
  const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set([1, 2]));
  const [completed] = useState(mockCompleted);

  function togglePhase(num: number) {
    setExpandedPhases((prev) => {
      const next = new Set(prev);
      next.has(num) ? next.delete(num) : next.add(num);
      return next;
    });
  }

  const totalDone = completed.size;
  const totalSteps = checklistSteps.length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* ── Header ─────────────────────────────────────────── */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <div style={{ height: 1, width: 32, background: "var(--orange)" }} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
            30 steps · 6 phases
          </span>
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "3rem", letterSpacing: "0.02em", color: "var(--navy)", lineHeight: 1 }}>
          LAUNCH CHECKLIST
        </h1>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-muted)", fontSize: "0.9rem", marginTop: 6 }}>
          Work through each phase in order. Every step has tools and resources to help.
        </p>
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
                {/* Phase number */}
                <div style={{
                  fontFamily: "var(--font-display)", fontSize: "1.8rem", color, opacity: 0.35,
                  lineHeight: 1, minWidth: 36, flexShrink: 0,
                }}>
                  0{phase.number}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 2 }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", letterSpacing: "0.06em", color: "var(--navy)" }}>
                      {phase.name.toUpperCase()}
                    </span>
                    {isDone && (
                      <CheckCircle2 style={{ width: 14, height: 14, color, flexShrink: 0 }} />
                    )}
                    <span style={{
                      fontFamily: "var(--font-heading)", fontSize: "0.62rem", fontWeight: 700,
                      letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 7px",
                      border: `1.5px solid ${color}`, color, flexShrink: 0,
                    }}>
                      {completedCount}/{phaseSteps.length}
                    </span>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--ink-muted)", lineHeight: 1.4 }}>
                    {phase.description}
                  </p>
                  {/* Mini progress */}
                  <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ flex: 1, height: 4, background: "var(--border-light)", border: "1px solid var(--border-light)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: color, transition: "width 0.6s ease" }} />
                    </div>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "0.7rem", color, lineHeight: 1 }}>
                      {pct}%
                    </span>
                  </div>
                </div>

                {/* Chevron */}
                <div style={{ flexShrink: 0, color: "var(--ink-muted)" }}>
                  {isExpanded
                    ? <ChevronDown style={{ width: 18, height: 18 }} />
                    : <ChevronRight style={{ width: 18, height: 18 }} />}
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
                      <Link
                        key={step.id}
                        href={`/checklist/${step.id}`}
                        style={{
                          display: "flex", alignItems: "center", gap: 14,
                          padding: "14px 20px 14px 24px", textDecoration: "none",
                          borderBottom: isLast ? "none" : "1px solid var(--border-light)",
                          background: isDoneStep ? "rgba(249,115,22,0.03)" : "transparent",
                          transition: "background 0.1s",
                        }}
                        className="step-item"
                      >
                        {/* Checkbox */}
                        <div className={`step-checkbox ${isDoneStep ? "checked" : ""}`}>
                          {isDoneStep && <CheckCircle2 style={{ width: 12, height: 12, color: "white" }} />}
                        </div>

                        {/* Step number */}
                        <span style={{
                          fontFamily: "var(--font-display)", fontSize: "0.75rem",
                          letterSpacing: "0.1em", color: isDoneStep ? color : "var(--ink-muted)",
                          minWidth: 28, flexShrink: 0,
                        }}>
                          {stepNum}
                        </span>

                        {/* Content */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{
                            fontFamily: "var(--font-heading)", fontSize: "0.85rem", fontWeight: 600,
                            color: isDoneStep ? "var(--ink-muted)" : "var(--navy)",
                            textDecoration: isDoneStep ? "line-through" : "none",
                            marginBottom: 2,
                          }}>
                            {step.title}
                          </p>
                          <p style={{
                            fontFamily: "var(--font-body)", fontSize: "0.75rem",
                            color: "var(--ink-muted)", lineHeight: 1.4,
                            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                          }}>
                            {step.description}
                          </p>
                        </div>

                        {/* Resource count hint */}
                        {step.resources.length > 0 && (
                          <div style={{
                            fontFamily: "var(--font-display)", fontSize: "0.58rem", letterSpacing: "0.1em",
                            textTransform: "uppercase", color: step.resources.some(r => r.affiliate) ? "var(--orange)" : "var(--ink-muted)",
                            border: `1px solid ${step.resources.some(r => r.affiliate) ? "var(--orange)" : "var(--border-light)"}`,
                            padding: "1px 5px", flexShrink: 0,
                          }}>
                            {step.resources.length} tool{step.resources.length !== 1 ? "s" : ""}
                          </div>
                        )}

                        <ArrowRight style={{ width: 14, height: 14, color: "var(--ink-muted)", flexShrink: 0, opacity: 0.5 }} />
                      </Link>
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

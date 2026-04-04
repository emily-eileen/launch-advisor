"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { phases, checklistSteps } from "@/lib/data/checklist";

const PHASE_COLORS = ["#F97316", "#8B5CF6", "#16A34A", "#0EA5E9", "#EF4444", "#F59E0B", "#EC4899", "#06B6D4", "#A855F7", "#14B8A6"];

export default function PhasePage() {
  const params = useParams();
  const num = parseInt(params.num as string, 10);
  const phase = phases.find((p) => p.number === num);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("launchadvisor_progress");
    if (saved) setCompleted(new Set<string>(JSON.parse(saved)));
    setHydrated(true);
  }, []);

  if (!phase) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-muted)", marginBottom: 16 }}>Phase not found.</p>
        <Link href="/checklist" className="btn btn-primary" style={{ fontSize: "0.75rem" }}>Back to checklist</Link>
      </div>
    );
  }

  const color = PHASE_COLORS[num - 1];
  const phaseSteps = checklistSteps.filter((s) => s.phase === num);
  const doneCnt = hydrated ? phaseSteps.filter((s) => completed.has(s.id)).length : 0;

  const prevPhase = phases.find((p) => p.number === num - 1);
  const nextPhase = phases.find((p) => p.number === num + 1);

  return (
    <div style={{ maxWidth: 680, display: "flex", flexDirection: "column", gap: 24 }}>

      {/* ── Back ──────────────────────────────────────────── */}
      <Link href="/checklist" style={{
        display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none",
        fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 600,
        letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-muted)",
      }}>
        <ArrowLeft style={{ width: 13, height: 13 }} />
        All phases
      </Link>

      {/* ── Phase header ──────────────────────────────────── */}
      <div style={{ borderLeft: `4px solid ${color}`, paddingLeft: 20 }}>
        <span style={{
          fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em",
          textTransform: "uppercase", color, display: "block", marginBottom: 4,
        }}>
          Phase {String(num).padStart(2, "0")}
        </span>
        <h1 style={{
          fontFamily: "var(--font-display)", fontSize: "2.8rem", letterSpacing: "0.03em",
          color: "var(--navy)", lineHeight: 1, marginBottom: 10,
        }}>
          {phase.name.toUpperCase()}
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "var(--ink-mid)", lineHeight: 1.6, margin: 0 }}>
          {phase.description}
        </p>
        {hydrated && (
          <p style={{ fontFamily: "var(--font-display)", fontSize: "0.68rem", letterSpacing: "0.12em", color, marginTop: 10 }}>
            {doneCnt}/{phaseSteps.length} STEPS COMPLETE
          </p>
        )}
      </div>

      {/* ── Steps ─────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {phaseSteps.map((step) => {
          const isDone = hydrated && completed.has(step.id);

          return (
            <Link
              key={step.id}
              href={`/checklist/${step.id}`}
              style={{ textDecoration: "none" }}
            >
              <div
                className="panel"
                style={{
                  display: "flex", alignItems: "center", gap: 16,
                  padding: "16px 20px",
                  borderLeft: `3px solid ${isDone ? color : "var(--border-light)"}`,
                  transition: "all 0.12s",
                  opacity: isDone ? 0.7 : 1,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderLeftColor = color;
                  (e.currentTarget as HTMLElement).style.transform = "translateX(2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderLeftColor = isDone ? color : "var(--border-light)";
                  (e.currentTarget as HTMLElement).style.transform = "";
                }}
              >
                {/* Step number */}
                <span style={{
                  fontFamily: "var(--font-display)", fontSize: "1.4rem",
                  color: isDone ? color : "var(--border)", lineHeight: 1, minWidth: 36, flexShrink: 0,
                }}>
                  {num}.{step.order}
                </span>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontFamily: "var(--font-heading)", fontSize: "0.9rem", fontWeight: 700,
                    color: isDone ? "var(--ink-muted)" : "var(--navy)", lineHeight: 1.3,
                    marginBottom: 3,
                    textDecoration: isDone ? "line-through" : "none",
                  }}>
                    {step.title}
                  </p>
                  <p style={{
                    fontFamily: "var(--font-body)", fontSize: "0.78rem",
                    color: "var(--ink-muted)", lineHeight: 1.45, margin: 0,
                  }}>
                    {step.description.slice(0, 100)}{step.description.length > 100 ? "…" : ""}
                  </p>
                </div>

                {/* Status / arrow */}
                <div style={{ flexShrink: 0 }}>
                  {isDone
                    ? <CheckCircle2 style={{ width: 16, height: 16, color }} />
                    : <ChevronRight style={{ width: 16, height: 16, color: "var(--ink-muted)" }} />
                  }
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── Phase navigation ──────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, gap: 12 }}>
        {prevPhase ? (
          <Link href={`/checklist/phase/${prevPhase.number}`} style={{
            display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none",
            fontFamily: "var(--font-heading)", fontSize: "0.75rem", fontWeight: 600,
            color: "var(--ink-muted)",
          }}>
            <ArrowLeft style={{ width: 13, height: 13 }} />
            Phase {prevPhase.number}: {prevPhase.name}
          </Link>
        ) : <div />}

        {nextPhase ? (
          <Link href={`/checklist/phase/${nextPhase.number}`} style={{
            display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none",
            fontFamily: "var(--font-heading)", fontSize: "0.75rem", fontWeight: 600,
            color,
          }}>
            Phase {nextPhase.number}: {nextPhase.name}
            <ArrowRight style={{ width: 13, height: 13 }} />
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, CheckCircle2, ChevronRight,
  Search, Hammer, Tag, FileText, DollarSign, MapPin, Palette, Shield, Users, Settings,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { phases, checklistSteps, getPhaseColor } from "@/lib/data/checklist";

const PHASE_ICON_MAP: Record<string, LucideIcon> = {
  Search, Hammer, Tag, FileText, DollarSign, MapPin, Palette, Shield, Users, Settings,
};

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

  const color = getPhaseColor(num);
  const PhaseIconComp: LucideIcon = PHASE_ICON_MAP[phase.icon] ?? Search;
  const phaseSteps = checklistSteps.filter((s) => s.phase === num);
  const doneCnt = hydrated ? phaseSteps.filter((s) => completed.has(s.id)).length : 0;

  // Find adjacent phases in display order
  const phaseIdx = phases.findIndex((p) => p.number === num);
  const prevPhase = phaseIdx > 0 ? phases[phaseIdx - 1] : null;
  const nextPhase = phaseIdx < phases.length - 1 ? phases[phaseIdx + 1] : null;

  return (
    <div style={{ maxWidth: 680, display: "flex", flexDirection: "column", gap: 24 }}>

      {/* ── Back ──────────────────────────────────────────────── */}
      <Link href="/checklist" style={{
        display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none",
        fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 600,
        letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-muted)",
      }}>
        <ArrowLeft style={{ width: 13, height: 13 }} />
        All phases
      </Link>

      {/* ── Phase header ──────────────────────────────────────── */}
      <div style={{ borderLeft: `4px solid ${color}`, paddingLeft: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <div style={{ width: 28, height: 28, background: color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <PhaseIconComp style={{ width: 14, height: 14, color: "white" }} />
          </div>
          <span style={{
            fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em",
            textTransform: "uppercase", color,
          }}>
            Phase {String(phaseIdx + 1).padStart(2, "0")}
          </span>
        </div>
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

      {/* ── Steps ─────────────────────────────────────────────── */}
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
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "16px 20px",
                  borderLeft: `3px solid ${isDone ? color : "var(--border-light)"}`,
                  transition: "all 0.12s",
                  opacity: isDone ? 0.72 : 1,
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
                {/* Phase icon (colored when done, muted when pending) */}
                <div style={{
                  width: 32, height: 32, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: isDone ? `${color}15` : "var(--border-light)",
                  border: `1.5px solid ${isDone ? color : "var(--border)"}`,
                }}>
                  {isDone
                    ? <CheckCircle2 style={{ width: 14, height: 14, color }} />
                    : <PhaseIconComp style={{ width: 13, height: 13, color: "var(--ink-muted)" }} />
                  }
                </div>

                {/* Step number + text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 2 }}>
                    <span style={{
                      fontFamily: "var(--font-display)", fontSize: "0.6rem",
                      color: isDone ? color : "var(--border)", letterSpacing: "0.08em", flexShrink: 0,
                    }}>
                      {phaseIdx + 1}.{step.order}
                    </span>
                    <p style={{
                      fontFamily: "var(--font-heading)", fontSize: "0.9rem", fontWeight: 700,
                      color: isDone ? "var(--ink-muted)" : "var(--navy)", lineHeight: 1.3,
                      textDecoration: isDone ? "line-through" : "none",
                      margin: 0,
                    }}>
                      {step.title}
                    </p>
                  </div>
                  <p style={{
                    fontFamily: "var(--font-body)", fontSize: "0.78rem",
                    color: "var(--ink-muted)", lineHeight: 1.45, margin: 0,
                  }}>
                    {step.description.slice(0, 110)}{step.description.length > 110 ? "…" : ""}
                  </p>
                </div>

                <ChevronRight style={{ width: 15, height: 15, color: isDone ? color : "var(--ink-muted)", flexShrink: 0, opacity: 0.6 }} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── Phase navigation ──────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, gap: 12 }}>
        {prevPhase ? (
          <Link href={`/checklist/phase/${prevPhase.number}`} style={{
            display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none",
            fontFamily: "var(--font-heading)", fontSize: "0.75rem", fontWeight: 600,
            color: "var(--ink-muted)",
          }}>
            <ArrowLeft style={{ width: 13, height: 13 }} />
            {prevPhase.name}
          </Link>
        ) : <div />}

        {nextPhase ? (
          <Link href={`/checklist/phase/${nextPhase.number}`} style={{
            display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none",
            fontFamily: "var(--font-heading)", fontSize: "0.75rem", fontWeight: 600,
            color,
          }}>
            {nextPhase.name}
            <ArrowRight style={{ width: 13, height: 13 }} />
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}

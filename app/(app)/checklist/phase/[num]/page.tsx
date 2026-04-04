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
  const num    = parseInt(params.num as string, 10);
  const phase  = phases.find((p) => p.number === num);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated]   = useState(false);

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

  const color        = getPhaseColor(num);
  const PhaseIconComp: LucideIcon = PHASE_ICON_MAP[phase.icon] ?? Search;
  const phaseSteps   = checklistSteps.filter((s) => s.phase === num);
  const phaseIdx     = phases.findIndex((p) => p.number === num);
  const doneCnt      = hydrated ? phaseSteps.filter((s) => completed.has(s.id)).length : 0;

  const prevPhase = phaseIdx > 0 ? phases[phaseIdx - 1] : null;
  const nextPhase = phaseIdx < phases.length - 1 ? phases[phaseIdx + 1] : null;

  function handleToggle(stepId: string) {
    const next = new Set(completed);
    if (next.has(stepId)) next.delete(stepId); else next.add(stepId);
    setCompleted(next);
    localStorage.setItem("launchadvisor_progress", JSON.stringify(Array.from(next)));
  }

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
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color }}>
            Phase {String(phaseIdx + 1).padStart(2, "0")}
          </span>
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1, marginBottom: 10 }}>
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

      {/* ── Steps with checkboxes ─────────────────────────────── */}
      <div className="panel" style={{ padding: 0, overflow: "hidden" }}>
        {phaseSteps.map((step, si) => {
          const isDone = hydrated && completed.has(step.id);
          return (
            <div
              key={step.id}
              style={{
                display: "flex", alignItems: "stretch",
                borderBottom: si < phaseSteps.length - 1 ? "1px solid var(--border-light)" : "none",
                borderLeft: `3px solid ${isDone ? color : "transparent"}`,
                background: isDone ? `${color}06` : "transparent",
                transition: "all 0.12s",
              }}
            >
              {/* Checkbox toggle */}
              <button
                onClick={() => handleToggle(step.id)}
                title={isDone ? "Mark incomplete" : "Mark complete"}
                style={{
                  flexShrink: 0, width: 48, display: "flex", alignItems: "center", justifyContent: "center",
                  background: isDone ? `${color}12` : "transparent",
                  border: "none", borderRight: "1px solid var(--border-light)",
                  cursor: "pointer", transition: "background 0.15s",
                }}
              >
                {/* Custom checkbox look */}
                <div style={{
                  width: 18, height: 18,
                  border: `2px solid ${isDone ? color : "var(--border)"}`,
                  background: isDone ? color : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.15s",
                }}>
                  {isDone && <CheckCircle2 style={{ width: 10, height: 10, color: "white" }} />}
                </div>
              </button>

              {/* Step link */}
              <Link
                href={`/checklist/${step.id}`}
                style={{
                  flex: 1, display: "flex", alignItems: "center", gap: 12,
                  padding: "14px 16px", textDecoration: "none", transition: "background 0.1s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = `${color}06`}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                <span style={{
                  fontFamily: "var(--font-display)", fontSize: "0.6rem",
                  color: isDone ? color : "var(--border)", minWidth: 28, flexShrink: 0, letterSpacing: "0.08em",
                }}>
                  {phaseIdx + 1}.{step.order}
                </span>
                <span style={{
                  fontFamily: "var(--font-heading)", fontSize: "0.88rem", fontWeight: 600,
                  color: isDone ? "var(--ink-muted)" : "var(--navy)",
                  textDecoration: isDone ? "line-through" : "none",
                  flex: 1, lineHeight: 1.35,
                }}>
                  {step.title}
                </span>
                <ChevronRight style={{ width: 14, height: 14, color: isDone ? color : "var(--border)", flexShrink: 0, opacity: 0.6 }} />
              </Link>
            </div>
          );
        })}
      </div>

      {/* ── Phase navigation ──────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, gap: 12 }}>
        {prevPhase ? (
          <Link href={`/checklist/phase/${prevPhase.number}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none", fontFamily: "var(--font-heading)", fontSize: "0.75rem", fontWeight: 600, color: "var(--ink-muted)" }}>
            <ArrowLeft style={{ width: 13, height: 13 }} />
            {prevPhase.name}
          </Link>
        ) : <div />}
        {nextPhase ? (
          <Link href={`/checklist/phase/${nextPhase.number}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none", fontFamily: "var(--font-heading)", fontSize: "0.75rem", fontWeight: 600, color }}>
            {nextPhase.name}
            <ArrowRight style={{ width: 13, height: 13 }} />
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}

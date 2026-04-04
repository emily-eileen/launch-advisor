"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, CheckCircle2, ExternalLink,
  BookOpen, Loader2, Zap, FileText,
} from "lucide-react";
import { getStepById, getAdjacentSteps } from "@/lib/data/checklist";
import { getGuidesForStep } from "@/lib/data/guides/index";
import type { Guide } from "@/lib/data/guides/types";

const PHASE_COLORS = ["#F97316", "#8B5CF6", "#16A34A", "#0EA5E9", "#EF4444", "#F59E0B", "#EC4899", "#06B6D4", "#A855F7", "#14B8A6"];

export default function StepDetailPage() {
  const params = useParams();
  const stepId = params.stepId as string;
  const step = getStepById(stepId);
  const { prev, next } = getAdjacentSteps(stepId);

  const [isDone, setIsDone] = useState(false);
  const [journalEntry, setJournalEntry] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [relatedGuides, setRelatedGuides] = useState<Guide[]>([]);

  useEffect(() => {
    const savedProgress = localStorage.getItem("launchadvisor_progress");
    if (savedProgress) {
      const set = new Set<string>(JSON.parse(savedProgress));
      if (step) setIsDone(set.has(step.id));
    }
    if (step) getGuidesForStep(step.id).then(setRelatedGuides).catch(() => {});
  }, [stepId, step]);

  if (!step) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <p style={{ fontFamily: "var(--font-heading)", color: "var(--ink-muted)", marginBottom: 16 }}>
          Step not found.
        </p>
        <Link href="/checklist" className="btn btn-primary" style={{ fontSize: "0.75rem" }}>
          Back to checklist
        </Link>
      </div>
    );
  }

  const color = PHASE_COLORS[step.phase - 1];

  function handleToggleDone() {
    if (!step) return;
    const newState = !isDone;
    setIsDone(newState);
    const raw = localStorage.getItem("launchadvisor_progress");
    const set = raw ? new Set<string>(JSON.parse(raw)) : new Set<string>();
    newState ? set.add(step.id) : set.delete(step.id);
    localStorage.setItem("launchadvisor_progress", JSON.stringify(Array.from(set)));
  }

  async function handleSaveJournal() {
    if (!journalEntry.trim()) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div style={{ maxWidth: 680, display: "flex", flexDirection: "column", gap: 20 }}>

      {/* ── Breadcrumb ────────────────────────────────────── */}
      <Link href={`/checklist/phase/${step.phase}`} style={{
        display: "inline-flex", alignItems: "center", gap: 5, textDecoration: "none",
        fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 600,
        letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--ink-muted)",
      }}>
        <ArrowLeft style={{ width: 12, height: 12 }} />
        Phase {step.phase}: {step.phaseName}
      </Link>

      {/* ── Step label ────────────────────────────────────── */}
      <div>
        <span style={{
          fontFamily: "var(--font-heading)", fontSize: "0.68rem", fontWeight: 600, color: "var(--ink-muted)",
        }}>
          Step {step.phase}.{step.order}
        </span>
      </div>

      {/* ── Main card ─────────────────────────────────────── */}
      <div className="panel" style={{ borderLeft: `4px solid ${color}`, padding: 28, boxShadow: `4px 4px 0 ${color}` }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 16 }}>
          <h1 style={{
            fontFamily: "var(--font-display)", fontSize: "1.9rem", letterSpacing: "0.03em",
            color: "var(--navy)", lineHeight: 1.1,
          }}>
            {step.title.toUpperCase()}
          </h1>
          <button
            onClick={handleToggleDone}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6, flexShrink: 0,
              fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "8px 14px", border: `2px solid ${isDone ? color : "var(--border)"}`,
              background: isDone ? color : "transparent", color: isDone ? "white" : "var(--ink-mid)",
              cursor: "pointer", transition: "all 0.15s",
            }}
          >
            <CheckCircle2 style={{ width: 13, height: 13 }} />
            {isDone ? "Done!" : "Mark done"}
          </button>
        </div>

        <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-mid)", lineHeight: 1.65, marginBottom: 20 }}>
          {step.description}
        </p>

        <div style={{
          background: "rgba(249,115,22,0.06)", border: "2px solid rgba(249,115,22,0.2)",
          padding: "14px 16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <Zap style={{ width: 12, height: 12, color: "var(--orange)" }} />
            <span style={{
              fontFamily: "var(--font-display)", fontSize: "0.6rem", letterSpacing: "0.2em",
              textTransform: "uppercase", color: "var(--orange)",
            }}>
              Do this now
            </span>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--ink)", lineHeight: 1.5 }}>
            {step.action}
          </p>
        </div>
      </div>

      {/* ── Tools & Resources ─────────────────────────────── */}
      {step.resources.length > 0 && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div style={{ height: 1, width: 24, background: "var(--orange)" }} />
            <span style={{
              fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em",
              textTransform: "uppercase", color: "var(--ink-muted)",
            }}>
              Tools &amp; Resources
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {step.resources.map((resource, idx) => (
              <a
                key={idx}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card"
                style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 14 }}
              >
                <div style={{
                  width: 38, height: 38, border: "2px solid var(--border-light)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  background: resource.affiliate ? "rgba(249,115,22,0.06)" : "var(--surface)",
                }}>
                  <ExternalLink style={{ width: 14, height: 14, color: resource.affiliate ? "var(--orange)" : "var(--ink-muted)" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.85rem", fontWeight: 700, color: "var(--navy)" }}>
                      {resource.name}
                    </span>
                    {resource.badge && (
                      <span style={{
                        fontFamily: "var(--font-display)", fontSize: "0.55rem", letterSpacing: "0.12em",
                        textTransform: "uppercase", padding: "1px 6px",
                        background: resource.affiliate ? "var(--orange)" : "var(--border-light)",
                        color: resource.affiliate ? "white" : "var(--ink-muted)",
                      }}>
                        {resource.badge}
                      </span>
                    )}
                  </div>
                  {resource.description && (
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--ink-muted)", lineHeight: 1.4 }}>
                      {resource.description}
                    </p>
                  )}
                </div>
                <ArrowRight style={{ width: 14, height: 14, color: "var(--ink-muted)", flexShrink: 0, opacity: 0.5 }} />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ── Go deeper: guide articles ─────────────────────── */}
      {relatedGuides.length > 0 && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div style={{ height: 1, width: 24, background: color }} />
            <span style={{
              fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em",
              textTransform: "uppercase", color: "var(--ink-muted)",
            }}>
              Go deeper
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {relatedGuides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`} style={{ textDecoration: "none" }}>
                <div
                  className="panel"
                  style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", transition: "all 0.12s" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderLeftColor = color;
                    (e.currentTarget as HTMLElement).style.transform = "translateX(2px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderLeftColor = "";
                    (e.currentTarget as HTMLElement).style.transform = "";
                  }}
                >
                  <FileText style={{ width: 16, height: 16, color, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontFamily: "var(--font-heading)", fontSize: "0.88rem", fontWeight: 700,
                      color: "var(--navy)", lineHeight: 1.3, marginBottom: 2,
                    }}>
                      {guide.title}
                    </p>
                    <p style={{
                      fontFamily: "var(--font-body)", fontSize: "0.74rem", color: "var(--ink-muted)", lineHeight: 1.4, margin: 0,
                    }}>
                      {guide.intro.slice(0, 100)}{guide.intro.length > 100 ? "…" : ""}
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                    <span style={{
                      fontFamily: "var(--font-display)", fontSize: "0.58rem", letterSpacing: "0.12em",
                      textTransform: "uppercase", color: "var(--ink-muted)",
                    }}>
                      {guide.readTime} min
                    </span>
                    <ArrowRight style={{ width: 13, height: 13, color, opacity: 0.7 }} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Journal ───────────────────────────────────────── */}
      <div className="panel" style={{ padding: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <BookOpen style={{ width: 14, height: 14, color: "var(--orange)" }} />
          <span style={{
            fontFamily: "var(--font-display)", fontSize: "0.65rem", letterSpacing: "0.2em",
            textTransform: "uppercase", color: "var(--ink-muted)",
          }}>
            Journal this step
          </span>
        </div>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--orange)",
          fontStyle: "italic", marginBottom: 12, lineHeight: 1.5,
        }}>
          {step.journalPrompt}
        </p>
        <textarea
          value={journalEntry}
          onChange={(e) => setJournalEntry(e.target.value)}
          placeholder="Write your thoughts here..."
          rows={4}
          style={{ resize: "none", marginBottom: 12 }}
        />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.7rem", color: "var(--ink-muted)" }}>
            {saved ? "Saved!" : "Private to you."}
          </span>
          <button
            onClick={handleSaveJournal}
            disabled={!journalEntry.trim() || saving}
            className="btn btn-primary"
            style={{ fontSize: "0.72rem", padding: "8px 16px", opacity: !journalEntry.trim() || saving ? 0.5 : 1 }}
          >
            {saving ? <Loader2 style={{ width: 12, height: 12, animation: "spin 1s linear infinite" }} /> : null}
            Save entry
          </button>
        </div>
      </div>

      {/* ── Step navigation ───────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 4 }}>
        {prev ? (
          <Link href={`/checklist/${prev.id}`} style={{
            display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none",
            fontFamily: "var(--font-heading)", fontSize: "0.75rem", fontWeight: 600,
            letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--ink-muted)",
          }}>
            <ArrowLeft style={{ width: 13, height: 13 }} />
            Previous
          </Link>
        ) : <div />}
        {next ? (
          <Link href={`/checklist/${next.id}`} className="btn btn-primary" style={{ fontSize: "0.72rem", padding: "8px 16px" }}>
            Next step <ArrowRight style={{ width: 13, height: 13 }} />
          </Link>
        ) : (
          <Link href={`/checklist/phase/${step.phase}`} className="btn btn-primary" style={{ fontSize: "0.72rem", padding: "8px 16px" }}>
            Phase complete <CheckCircle2 style={{ width: 13, height: 13 }} />
          </Link>
        )}
      </div>
    </div>
  );
}

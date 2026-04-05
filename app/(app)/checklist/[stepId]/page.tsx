"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowLeft, ArrowRight, CheckCircle2, ExternalLink,
  Loader2, Zap, FileText, Sparkles, Diamond,
  BarChart2, Palette, ClipboardList, Search as SearchIcon, MessageCircle, BriefcaseIcon,
} from "lucide-react";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getStepById, getAdjacentSteps, getPhaseColor, phases } from "@/lib/data/checklist";
import { getGuidesForStep } from "@/lib/data/guides/index";
import type { Guide } from "@/lib/data/guides/types";
import { BUSINESS_CATEGORIES } from "@/app/quiz/page";
import { getAffiliateUrl } from "@/lib/config/affiliates";

// ── Premium features catalog ──────────────────────────────
const ALL_PREMIUM_FEATURES: {
  id: string;
  icon: LucideIcon;
  label: string;
  tagline: string;
  cta: string;
  phases: number[]; // which phase numbers this is relevant for
}[] = [
  { id: "market-research",    icon: BarChart2,      label: "Market Research Report",   tagline: "AI pulls competitor data, market size estimates, and demand signals for your niche.",            cta: "Run research",       phases: [1, 3, 9] },
  { id: "customer-survey",    icon: ClipboardList,  label: "Customer Survey Builder",  tagline: "AI writes discovery questions specific to your industry, then analyzes the responses.",          cta: "Build my survey",    phases: [1, 9] },
  { id: "competitor-analysis",icon: SearchIcon,     label: "Competitor Analysis",      tagline: "See who you're up against, what they charge, and where the gaps are in your market.",           cta: "Analyze competitors", phases: [1, 7, 3] },
  { id: "logo-brand-kit",     icon: Palette,        label: "Logo & Brand Kit",         tagline: "Generate logo concepts, a color palette, and font pairings — ready to use in minutes.",         cta: "Build my brand",     phases: [7, 2] },
  { id: "business-plan",      icon: BriefcaseIcon,  label: "Business Plan Draft",      tagline: "Full AI-drafted business plan with executive summary, financials, and market positioning.",      cta: "Draft my plan",      phases: [4, 5, 10] },
  { id: "action-plan",        icon: Sparkles,       label: "AI Action Plan",           tagline: "Get a step-by-step plan tailored to your business type and where you are right now.",           cta: "Generate my plan",   phases: [2, 6, 8, 9, 10] },
];

function getPremiumFeaturesForPhase(phaseNumber: number) {
  return ALL_PREMIUM_FEATURES.filter(f => f.phases.includes(phaseNumber)).slice(0, 3);
}

// ── Upgrade modal ────────────────────────────────────────
function UpgradeModal({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(15,23,41,0.75)" }} onClick={onClose} />
      <div style={{ position: "relative", background: "var(--surface)", border: "2px solid #7C3AED", boxShadow: "6px 6px 0 #7C3AED40", maxWidth: 400, width: "100%", padding: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Diamond style={{ width: 18, height: 18, color: "#7C3AED" }} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7C3AED" }}>Premium feature</span>
        </div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--navy)", letterSpacing: "0.04em", marginBottom: 10, lineHeight: 1 }}>
          YOU'VE USED<br />YOUR FREE PASS
        </h3>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-muted)", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: 24 }}>
          The AI journal feature is included free once. Upgrade to use it on every step — plus unlock market research, brand kits, competitor analysis, and more.
        </p>
        <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: "0.82rem", marginBottom: 10, background: "#7C3AED", borderColor: "#7C3AED" }}>
          Upgrade to Premium <Diamond style={{ width: 12, height: 12 }} />
        </button>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", width: "100%", fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--ink-muted)", textAlign: "center" }}>
          No thanks, I'll write it myself
        </button>
      </div>
    </div>
  );
}

export default function StepDetailPage() {
  const params  = useParams();
  const stepId  = params.stepId as string;
  const step    = getStepById(stepId);
  const { prev, next } = getAdjacentSteps(stepId);

  const [isDone, setIsDone]                   = useState(false);
  const [journalEntry, setJournalEntry]       = useState("");
  const [saving, setSaving]                   = useState(false);
  const [saved, setSaved]                     = useState(false);
  const [relatedGuides, setRelatedGuides]     = useState<Guide[]>([]);
  const [quizBusinessType, setQuizBusinessType] = useState<string | null>(null);
  const [aiLoading, setAiLoading]             = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    let currentBusinessType: string | null = null;
    const savedProgress = localStorage.getItem("launchadvisor_progress");
    if (savedProgress && step) {
      setIsDone(new Set<string>(JSON.parse(savedProgress)).has(step.id));
    }
    const quiz = localStorage.getItem("launchadvisor_quiz");
    if (quiz) {
      try { 
        currentBusinessType = JSON.parse(quiz).businessType ?? null; 
        setQuizBusinessType(currentBusinessType); 
      } catch { /* ignore */ }
    }
    
    async function loadJournal() {
      if (!step) return;
      const activeWs = localStorage.getItem("launchadvisor_active_workspace");
      if (activeWs && activeWs !== "local") {
        const supabase = createClient();
        const { data } = await supabase
          .from("workspace_journals")
          .select("content")
          .eq("workspace_id", activeWs)
          .eq("step_id", step.id)
          .single();
        if (data?.content) {
          setJournalEntry(data.content);
          localStorage.setItem(`launchadvisor_journal_${step.id}`, data.content);
        } else {
          const fallback = localStorage.getItem(`launchadvisor_journal_${step.id}`);
          if (fallback) setJournalEntry(fallback);
        }
      } else {
        const saved = localStorage.getItem(`launchadvisor_journal_${step.id}`);
        if (saved) setJournalEntry(saved);
      }
    }

    if (step) {
      loadJournal();
      getGuidesForStep(step.id, currentBusinessType || undefined).then(setRelatedGuides).catch(() => {});
    }
  }, [stepId, step]);

  if (!step) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <p style={{ fontFamily: "var(--font-heading)", color: "var(--ink-muted)", marginBottom: 16 }}>Step not found.</p>
        <Link href="/checklist" className="btn btn-primary" style={{ fontSize: "0.75rem" }}>Back to checklist</Link>
      </div>
    );
  }

  const color          = getPhaseColor(step.phase);
  const phaseIdx       = phases.findIndex((p) => p.number === step.phase);
  const displayPhaseNum = phaseIdx + 1;
  const premiumFeatures = step.premiumFeatures && step.premiumFeatures.length > 0 
    ? step.premiumFeatures 
    : getPremiumFeaturesForPhase(step.phase);

  const businessTypeLabel = quizBusinessType
    ? BUSINESS_CATEGORIES.find(b => b.value === quizBusinessType)?.label ?? null
    : null;

  async function handleToggleDone() {
    const savedEntry = localStorage.getItem(`launchadvisor_journal_${step!.id}`);
    if (!isDone && (!savedEntry || !savedEntry.trim())) {
      alert("Please save a note in your journal before checking this step off.");
      document.getElementById("journal-textarea")?.focus();
      return;
    }
    const newState = !isDone;
    setIsDone(newState);
    
    // Write Local
    const raw = localStorage.getItem("launchadvisor_progress");
    const set = raw ? new Set<string>(JSON.parse(raw)) : new Set<string>();
    newState ? set.add(step!.id) : set.delete(step!.id);
    localStorage.setItem("launchadvisor_progress", JSON.stringify(Array.from(set)));

    // Write Cloud
    const activeWs = localStorage.getItem("launchadvisor_active_workspace");
    if (activeWs && activeWs !== "local") {
        const supabase = createClient();
        await supabase.from("workspace_progress").upsert({
            workspace_id: activeWs,
            step_id: step!.id,
            is_done: newState
        }, { onConflict: "workspace_id, step_id" });
    }
  }

  async function handleSaveJournal() {
    if (!journalEntry.trim()) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    
    // Write Local
    localStorage.setItem(`launchadvisor_journal_${step!.id}`, journalEntry);
    
    // Write Cloud
    const activeWs = localStorage.getItem("launchadvisor_active_workspace");
    let needsSupabaseProgressUpdate = false;

    if (activeWs && activeWs !== "local") {
        const supabase = createClient();
        await supabase.from("workspace_journals").upsert({
            workspace_id: activeWs,
            step_id: step!.id,
            content: journalEntry
        }, { onConflict: "workspace_id, step_id" });
        needsSupabaseProgressUpdate = true;
    }

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);

    if (!isDone) {
      setIsDone(true);
      const raw = localStorage.getItem("launchadvisor_progress");
      const set = raw ? new Set<string>(JSON.parse(raw)) : new Set<string>();
      set.add(step!.id);
      localStorage.setItem("launchadvisor_progress", JSON.stringify(Array.from(set)));
      
      if (needsSupabaseProgressUpdate && activeWs) {
        const supabase = createClient();
        await supabase.from("workspace_progress").upsert({
            workspace_id: activeWs,
            step_id: step!.id,
            is_done: true
        }, { onConflict: "workspace_id, step_id" });
      }
    }
  }

  async function handleAiJournal() {
    // Check if user has used their free AI pass
    const usesRaw = localStorage.getItem("launchadvisor_ai_journal_uses") ?? "0";
    const uses = parseInt(usesRaw, 10);
    if (uses >= 1) {
      setShowUpgradeModal(true);
      return;
    }
    setAiLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    // Placeholder — production calls /api/ai/journal
    const draft = `Here's a starting point for "${step!.title.toLowerCase()}": I'm thinking through who exactly my ideal customer is and what problem they urgently want solved. The key question is whether this problem is painful enough that someone pays to fix it today — not just "that'd be nice."`;
    setJournalEntry(draft);
    localStorage.setItem("launchadvisor_ai_journal_uses", "1");
    setAiLoading(false);
  }

  return (
    <div style={{ maxWidth: 680, display: "flex", flexDirection: "column", gap: 24 }}>
      {showUpgradeModal && <UpgradeModal onClose={() => setShowUpgradeModal(false)} />}

      {/* ── Breadcrumb ────────────────────────────────────────── */}
      <Link href={`/checklist/phase/${step.phase}`} style={{
        display: "inline-flex", alignItems: "center", gap: 5, textDecoration: "none",
        fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 600,
        letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--ink-muted)",
      }}>
        <ArrowLeft style={{ width: 12, height: 12 }} />
        Phase {displayPhaseNum}: {step.phaseName}
      </Link>

      {/* ── Step label ────────────────────────────────────────── */}
      <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.68rem", fontWeight: 600, color: "var(--ink-muted)" }}>
        Step {displayPhaseNum}.{step.order}
      </span>

      {/* ── Main card — description + exercise + journal ──────── */}
      <div className="panel" style={{ borderLeft: `4px solid ${color}`, padding: 28, boxShadow: `4px 4px 0 ${color}` }}>

        {/* Title + mark done */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 16 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.9rem", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.1 }}>
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

        {/* ── Context & Strategy ── */}
        <div style={{ marginBottom: 28 }}>
          {step.whyItMatters ? (
            <>
              <div style={{ marginBottom: 18 }}>
                <span style={{ display: "block", fontFamily: "var(--font-heading)", fontSize: "0.82rem", fontWeight: 700, color: "var(--navy)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6 }}>Why it matters</span>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--ink)", lineHeight: 1.65, fontSize: "0.95rem", margin: 0 }}>
                  {step.whyItMatters}
                </p>
              </div>
              <div style={{ marginBottom: 18 }}>
                <span style={{ display: "block", fontFamily: "var(--font-heading)", fontSize: "0.82rem", fontWeight: 700, color: "var(--navy)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6 }}>How to do it</span>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--ink)", lineHeight: 1.65, fontSize: "0.95rem", margin: 0, whiteSpace: "pre-wrap" }}>
                  {step.howToDoIt}
                </p>
              </div>
              <div>
                <span style={{ display: "block", fontFamily: "var(--font-heading)", fontSize: "0.82rem", fontWeight: 700, color: "var(--navy)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6 }}>What to start with</span>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--ink)", lineHeight: 1.65, fontSize: "0.95rem", margin: 0 }}>
                  {step.whatToStartWith}
                </p>
              </div>
            </>
          ) : (
            <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-mid)", lineHeight: 1.75, marginBottom: 20, fontSize: "0.97rem" }}>
              {step.description}
            </p>
          )}
        </div>

        {/* Do this now — the exercise */}
        <div style={{ background: `${color}0E`, border: `1.5px solid ${color}33`, padding: "14px 16px", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <Zap style={{ width: 12, height: 12, color }} />
            <span style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color }}>
              Do this now
            </span>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--ink)", lineHeight: 1.55 }}>
            {step.action}
          </p>
        </div>

        {/* ── Journal — embedded below the exercise ─────────── */}
        <div style={{ borderTop: `1px solid ${color}22`, paddingTop: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
              Journal this step
            </span>
            {/* AI "Do it for me" — first use is free */}
            <button
              onClick={handleAiJournal}
              disabled={aiLoading}
              style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                fontFamily: "var(--font-heading)", fontSize: "0.68rem", fontWeight: 600,
                letterSpacing: "0.06em", textTransform: "uppercase",
                padding: "5px 10px", border: "1.5px solid #7C3AED",
                background: aiLoading ? "#7C3AED18" : "transparent", color: "#7C3AED",
                cursor: aiLoading ? "not-allowed" : "pointer", opacity: aiLoading ? 0.7 : 1,
                transition: "all 0.15s",
              }}
              onMouseEnter={e => { if (!aiLoading) (e.currentTarget as HTMLElement).style.background = "#7C3AED18"; }}
              onMouseLeave={e => { if (!aiLoading) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              title="AI writes a draft journal entry for you — free once, then upgrade"
            >
              {aiLoading
                ? <Loader2 style={{ width: 11, height: 11, animation: "spin 1s linear infinite" }} />
                : <Sparkles style={{ width: 11, height: 11 }} />
              }
              {aiLoading ? "Writing..." : "Do it for me"}
              <Diamond style={{ width: 9, height: 9, opacity: 0.7 }} />
            </button>
          </div>

          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color, fontStyle: "italic", marginBottom: 10, lineHeight: 1.55 }}>
            {step.journalPrompt}
          </p>
          <textarea
            id="journal-textarea"
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            placeholder="Write your thoughts here..."
            rows={4}
            style={{ resize: "none", marginBottom: 10, background: "var(--bg)" }}
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
      </div>

      {/* ── Premium features — 1-3 relevant to this phase ────── */}
      {premiumFeatures.length > 0 && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <Diamond style={{ width: 11, height: 11, color: "#7C3AED" }} />
            <span style={{ fontFamily: "var(--font-display)", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#7C3AED" }}>
              Premium features
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${premiumFeatures.length}, 1fr)`, gap: 10 }}>
            {premiumFeatures.map((feat: any) => {
              const FeatureIcon = typeof feat.icon === "string" 
                ? ((Icons as any)[feat.icon] || Icons.Sparkles) 
                : feat.icon;
              return (
                <div
                  key={feat.id}
                  style={{ border: "1.5px solid #7C3AED33", background: "#7C3AED06", padding: "14px 14px 12px", cursor: "pointer", transition: "all 0.15s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#7C3AED12"; (e.currentTarget as HTMLElement).style.borderColor = "#7C3AED66"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#7C3AED06"; (e.currentTarget as HTMLElement).style.borderColor = "#7C3AED33"; }}
                  title="Upgrade to unlock"
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <FeatureIcon style={{ width: 15, height: 15, color: "#7C3AED" }} />
                    <Diamond style={{ width: 9, height: 9, color: "#7C3AED", opacity: 0.7 }} />
                  </div>
                  <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.82rem", fontWeight: 700, color: "var(--navy)", marginBottom: 5, lineHeight: 1.2 }}>
                    {feat.label}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.73rem", color: "var(--ink-muted)", lineHeight: 1.45, marginBottom: 10 }}>
                    {feat.tagline}
                  </p>
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#7C3AED", borderBottom: "1.5px solid #7C3AED44", paddingBottom: 1 }}>
                    {feat.cta} →
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Go deeper: guides filtered by business type ───────── */}
      {relatedGuides.length > 0 && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div style={{ height: 1, width: 24, background: color }} />
            <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
              Go deeper
            </span>
            {businessTypeLabel && (
              <span style={{ fontFamily: "var(--font-display)", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 7px", background: `${color}18`, color, border: `1px solid ${color}44` }}>
                {businessTypeLabel}
              </span>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {relatedGuides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`} style={{ textDecoration: "none" }}>
                <div
                  className="panel"
                  style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", transition: "all 0.12s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderLeftColor = color; (e.currentTarget as HTMLElement).style.transform = "translateX(2px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderLeftColor = ""; (e.currentTarget as HTMLElement).style.transform = ""; }}
                >
                  <FileText style={{ width: 16, height: 16, color, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.88rem", fontWeight: 700, color: "var(--navy)", lineHeight: 1.3, marginBottom: 2 }}>
                      {guide.title}
                    </p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.74rem", color: "var(--ink-muted)", lineHeight: 1.4, margin: 0 }}>
                      {guide.intro.slice(0, 110)}{guide.intro.length > 110 ? "…" : ""}
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
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

      {/* ── Tools & Resources ─────────────────────────────────── */}
      {step.resources.length > 0 && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ height: 1, width: 24, background: "var(--orange)" }} />
            <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
              Tools &amp; Resources
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {step.resources.map((resource, idx) => (
              <div key={idx} style={{ border: "2px solid var(--border)", background: "var(--surface)", padding: "16px 18px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.95rem", fontWeight: 700, color: "var(--navy)" }}>{resource.name}</span>
                    {resource.badge && (
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "2px 7px", background: resource.affiliate ? "var(--orange)" : "var(--border-light)", color: resource.affiliate ? "white" : "var(--ink-muted)", flexShrink: 0 }}>
                        {resource.badge}
                      </span>
                    )}
                  </div>
                  {resource.affiliate && (
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted)", flexShrink: 0 }}>
                      affiliate
                    </span>
                  )}
                </div>
                {resource.description && (
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", color: "var(--ink)", lineHeight: 1.6, marginBottom: 12 }}>
                    {resource.description}
                  </p>
                )}
                <a
                  href={getAffiliateUrl(resource.name, resource.url)}
                  target="_blank"
                  rel={resource.affiliate ? "noopener noreferrer sponsored" : "noopener noreferrer"}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none",
                    fontFamily: "var(--font-heading)", fontSize: "0.75rem", fontWeight: 700,
                    letterSpacing: "0.06em", textTransform: "uppercase",
                    color: resource.affiliate ? "var(--orange)" : "var(--ink-mid)",
                    borderBottom: `1.5px solid ${resource.affiliate ? "var(--orange)" : "var(--border)"}`,
                    paddingBottom: 1, transition: "opacity 0.15s",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.7"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
                >
                  Open {resource.name}
                  <ExternalLink style={{ width: 11, height: 11 }} />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Ask an Expert ─────────────────────────────────────── */}
      <div style={{ border: "2px solid var(--border)", background: "var(--surface)", padding: "18px 20px", display: "flex", alignItems: "flex-start", gap: 16, borderLeft: `4px solid ${color}` }}>
        <div style={{ width: 38, height: 38, background: `${color}14`, border: `1.5px solid ${color}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <MessageCircle style={{ width: 18, height: 18, color }} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.92rem", fontWeight: 700, color: "var(--navy)", marginBottom: 6 }}>
            Ask an Expert about {step.title.toLowerCase()}
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--ink-muted)", lineHeight: 1.55, marginBottom: 12 }}>
            Stuck here? Book a 30-minute session with a fractional advisor who's helped dozens of founders through this exact step. You'll leave with a clear next action.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <button className="btn btn-primary" style={{ fontSize: "0.72rem", padding: "8px 16px" }}
              onClick={() => {/* production: open booking modal */}}
            >
              Book a 30-min call <ArrowRight style={{ width: 12, height: 12 }} />
            </button>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--ink-muted)" }}>
              Free with Growth plan · $49 à la carte
            </span>
          </div>
        </div>
      </div>

      {/* ── Step navigation ───────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 4 }}>
        {prev ? (
          <Link href={`/checklist/${prev.id}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none", fontFamily: "var(--font-heading)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
            <ArrowLeft style={{ width: 13, height: 13 }} /> Previous
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

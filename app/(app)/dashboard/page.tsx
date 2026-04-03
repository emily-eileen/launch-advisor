"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, TrendingUp, Zap, BookOpen } from "lucide-react";

const PHASES = [
  { num: 1, name: "Decide", color: "#F97316", done: 5, total: 5 },
  { num: 2, name: "Form", color: "#8B5CF6", done: 4, total: 5 },
  { num: 3, name: "Money", color: "#16A34A", done: 3, total: 5 },
  { num: 4, name: "Brand", color: "#0EA5E9", done: 2, total: 5 },
  { num: 5, name: "Protect", color: "#EF4444", done: 0, total: 5 },
  { num: 6, name: "Launch", color: "#F59E0B", done: 0, total: 5 },
];

const RECENT_JOURNAL = [
  { id: 1, text: "Validated idea with 12 potential customers. 9 said they'd pay.", date: "Apr 1" },
  { id: 2, text: "Filed LLC with ZenBusiness. EIN received in 2 days.", date: "Mar 29" },
];

const TOTAL_DONE = PHASES.reduce((s, p) => s + p.done, 0);
const TOTAL = 30;
const NEXT_STEP = { phase: "Form", step: "Get your EIN", id: "form-4" };

export default function DashboardPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* ── Header ───────────────────────────────────────── */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <div style={{ height: 1, width: 32, background: "var(--orange)" }} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ink-muted)" }}>Your command center</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "3rem", letterSpacing: "0.02em", color: "var(--navy)", lineHeight: 1 }}>
          LAUNCH DASHBOARD
        </h1>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-muted)", fontSize: "0.9rem", marginTop: 6 }}>
          You&apos;re {TOTAL_DONE} of {TOTAL} steps in. Keep going.
        </p>
      </div>

      {/* ── Top stat row ─────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {[
          { label: "Steps done", value: TOTAL_DONE, icon: CheckCircle2, color: "var(--orange)" },
          { label: "Steps left", value: TOTAL - TOTAL_DONE, icon: Clock, color: "var(--navy)" },
          { label: "Phases active", value: PHASES.filter(p => p.done > 0 && p.done < p.total).length, icon: TrendingUp, color: "#8B5CF6" },
          { label: "Phases done", value: PHASES.filter(p => p.done === p.total).length, icon: Zap, color: "#16A34A" },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ width: 32, height: 32, border: "2px solid var(--border-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <s.icon style={{ width: 15, height: 15, color: s.color }} />
              </div>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
                {s.label}
              </span>
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", color: s.color, lineHeight: 1 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* ── Overall progress + next step ─────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16 }}>
        {/* Progress */}
        <div className="panel" style={{ padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
                Overall launch progress
              </span>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "var(--navy)", lineHeight: 1, marginTop: 2 }}>
                {Math.round((TOTAL_DONE / TOTAL) * 100)}%
              </div>
            </div>
            <Link href="/checklist" className="btn btn-primary" style={{ fontSize: "0.72rem", padding: "8px 16px" }}>
              Continue <ArrowRight style={{ width: 13, height: 13 }} />
            </Link>
          </div>

          {/* Big progress bar */}
          <div style={{ marginBottom: 24 }}>
            <div className="progress-track" style={{ height: 12 }}>
              <div className="progress-fill" style={{ width: `${(TOTAL_DONE / TOTAL) * 100}%` }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.68rem", color: "var(--ink-muted)", fontWeight: 600 }}>{TOTAL_DONE} done</span>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.68rem", color: "var(--ink-muted)", fontWeight: 600 }}>{TOTAL - TOTAL_DONE} remaining</span>
            </div>
          </div>

          {/* Phase mini bars */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {PHASES.map((p) => (
              <div key={p.num}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 8, height: 8, background: p.color }} />
                    <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, color: "var(--ink-mid)" }}>
                      {p.name}
                    </span>
                  </div>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "0.72rem", color: p.done === p.total ? p.color : "var(--ink-muted)" }}>
                    {p.done}/{p.total}
                  </span>
                </div>
                <div className="progress-track" style={{ height: 5 }}>
                  <div style={{ height: "100%", width: `${(p.done / p.total) * 100}%`, background: p.color, transition: "width 0.6s ease" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Next step */}
          <div className="panel" style={{ borderLeft: "4px solid var(--orange)", padding: 20, boxShadow: "4px 4px 0 var(--orange)" }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--orange)" }}>
              Next up
            </span>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", letterSpacing: "0.02em", color: "var(--navy)", lineHeight: 1.1, margin: "6px 0 4px" }}>
              {NEXT_STEP.step.toUpperCase()}
            </h3>
            <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.75rem", color: "var(--ink-muted)", marginBottom: 16 }}>
              Phase: {NEXT_STEP.phase}
            </p>
            <Link href={`/checklist/${NEXT_STEP.id}`} className="btn btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: "0.72rem", padding: "10px" }}>
              Start this step <ArrowRight style={{ width: 13, height: 13 }} />
            </Link>
          </div>

          {/* Journal snippet */}
          <div className="panel" style={{ padding: 20, flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <BookOpen style={{ width: 14, height: 14, color: "var(--orange)" }} />
                <span style={{ fontFamily: "var(--font-display)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
                  Recent journal
                </span>
              </div>
              <Link href="/journal" style={{ fontFamily: "var(--font-heading)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--orange)" }}>
                View all →
              </Link>
            </div>
            {RECENT_JOURNAL.map(j => (
              <div key={j.id} style={{ borderLeft: "3px solid var(--orange)", paddingLeft: 12, marginBottom: 12 }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--ink-mid)", lineHeight: 1.5 }}>{j.text}</p>
                <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.65rem", color: "var(--ink-muted)", marginTop: 3, fontWeight: 600 }}>{j.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Phase grid ───────────────────────────────────── */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div style={{ height: 1, width: 28, background: "var(--orange)" }} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-muted)" }}>All phases</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
          {PHASES.map((p) => {
            const pct = Math.round((p.done / p.total) * 100);
            const isDone = p.done === p.total;
            return (
              <Link key={p.num} href="/checklist" style={{ textDecoration: "none" }}>
                <div className="panel"
                  style={{ padding: "14px 14px 10px", cursor: "pointer", borderBottom: `4px solid ${p.color}`, transition: "box-shadow 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `3px 3px 0 ${p.color}`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: p.color, opacity: 0.3, lineHeight: 1 }}>0{p.num}</span>
                    {isDone && <CheckCircle2 style={{ width: 14, height: 14, color: p.color }} />}
                  </div>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", letterSpacing: "0.05em", color: "var(--navy)", lineHeight: 1, marginBottom: 8 }}>
                    {p.name.toUpperCase()}
                  </p>
                  <div className="progress-track" style={{ height: 4 }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: p.color }} />
                  </div>
                  <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.62rem", color: "var(--ink-muted)", marginTop: 4 }}>{p.done}/{p.total}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

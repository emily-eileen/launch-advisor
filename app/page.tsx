"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Zap, Shield, Users, Star } from "lucide-react";

const PHASES = [
  { num: "01", name: "Decide", color: "#F97316", desc: "Validate your idea before spending a dime." },
  { num: "02", name: "Form", color: "#8B5CF6", desc: "Register legally, get your EIN, stay protected." },
  { num: "03", name: "Money", color: "#16A34A", desc: "Open banking, set up accounting and payments." },
  { num: "04", name: "Brand", color: "#0EA5E9", desc: "Build your online presence that converts." },
  { num: "05", name: "Protect", color: "#EF4444", desc: "Insurance, contracts, IP — cover your bases." },
  { num: "06", name: "Launch", color: "#F59E0B", desc: "Go live, get your first customer, iterate." },
];

const TESTIMONIALS = [
  { name: "Marcus T.", role: "E-commerce founder", text: "I wasted 3 months spinning my wheels. LaunchAdvisor gave me a clear path and I was open for business in 6 weeks.", stars: 5 },
  { name: "Priya K.", role: "Consulting firm", text: "The checklist links you to the actual tools you need. Saved me thousands in bad software choices.", stars: 5 },
  { name: "James R.", role: "SaaS founder", text: "Running my 3rd business through this. First time I haven't missed a critical compliance step.", stars: 5 },
];

const STATS = [
  { value: "30", label: "Proven steps" },
  { value: "6", label: "Launch phases" },
  { value: "50+", label: "Vetted tools" },
  { value: "100%", label: "Free to start" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--bg)" }}>

      {/* ── Nav ─────────────────────────────────────────── */}
      <nav style={{ borderBottom: "2px solid var(--border)", background: "var(--surface)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", letterSpacing: "0.05em", color: "var(--navy)" }}>
            LAUNCH<span style={{ color: "var(--orange)" }}>ADVISOR</span>
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link href="/login" style={{ fontFamily: "var(--font-heading)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-muted)", padding: "8px 14px" }}>
              Sign in
            </Link>
            <Link href="/login" className="btn btn-primary" style={{ fontSize: "0.75rem", padding: "9px 18px" }}>
              Start free <ArrowRight style={{ width: 14, height: 14 }} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section style={{ background: "var(--navy)", position: "relative", overflow: "hidden" }}>
        <div className="stripe-accent" />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "20px 20px", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          {/* Left */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ height: 1, width: 40, background: "var(--orange)" }} />
              <span style={{ fontFamily: "var(--font-display)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
                The business launch OS
              </span>
            </div>

            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(4rem,9vw,8rem)", lineHeight: 0.92, letterSpacing: "0.02em", color: "white", marginBottom: 8 }}>
              STOP<br />
              <span style={{ color: "var(--orange)", WebkitTextStroke: "2px var(--navy)" }}>GOOGLING.</span><br />
              <span style={{ fontSize: "0.65em" }}>START LAUNCHING.</span>
            </h1>

            <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: 36, maxWidth: 460 }}>
              The exact 30-step playbook to go from idea to open for business — with the right tools at every step.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 36 }}>
              <Link href="/login" className="btn btn-primary" style={{ fontSize: "0.82rem", padding: "12px 28px" }}>
                Build my launch plan <ArrowRight style={{ width: 16, height: 16 }} />
              </Link>
              <a href="#how-it-works" style={{ fontFamily: "var(--font-heading)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", padding: "12px 20px", border: "2px solid rgba(255,255,255,0.15)", display: "inline-flex", alignItems: "center", gap: 8 }}>
                See how it works
              </a>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ display: "flex" }}>
                {["F","M","K","J","A"].map((l, i) => (
                  <div key={i} style={{ width: 32, height: 32, marginLeft: i ? -8 : 0, border: "2px solid var(--navy)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "white", background: ["#F97316","#8B5CF6","#16A34A","#0EA5E9","#F59E0B"][i] }}>
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ display: "flex", gap: 2, marginBottom: 2 }}>
                  {[1,2,3,4,5].map(s => <Star key={s} style={{ width: 14, height: 14, fill: "var(--orange)", color: "var(--orange)" }} />)}
                </div>
                <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>Trusted by 500+ founders</p>
              </div>
            </div>
          </div>

          {/* Right — checklist preview */}
          <div style={{ position: "relative" }}>
            <div className="panel" style={{ background: "var(--surface)", boxShadow: "6px 6px 0 var(--orange)", border: "2px solid var(--border)" }}>
              <div style={{ borderBottom: "2px solid var(--border)", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--surface-warm)" }}>
                <div>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.25em", color: "var(--ink-muted)", textTransform: "uppercase" }}>Your launch checklist</p>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1.2 }}>PHASE 1 — DECIDE</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--orange)" }}>4/5</span>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--ink-muted)" }}>steps done</p>
                </div>
              </div>

              {[
                { n: "01", t: "Define your core idea", done: true },
                { n: "02", t: "Research target market", done: true },
                { n: "03", t: "Choose business model", done: true },
                { n: "04", t: "Validate with real people", done: true },
                { n: "05", t: "Set your launch budget", done: false, active: true },
              ].map((s) => (
                <div key={s.n} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 20px", borderBottom: "1px solid var(--border-light)", background: s.active ? "var(--orange-light)" : "transparent" }}>
                  <div className={`step-checkbox ${s.done ? "checked" : ""}`}>
                    {s.done && <CheckCircle2 style={{ width: 13, height: 13, color: "white" }} />}
                  </div>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", color: "var(--ink-muted)", minWidth: 28 }}>{s.n}</span>
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.85rem", flex: 1, fontWeight: s.active ? 700 : 400, color: s.done ? "var(--ink-muted)" : s.active ? "var(--navy)" : "var(--ink)", textDecoration: s.done ? "line-through" : "none" }}>
                    {s.t}
                  </span>
                  {s.active && <ArrowRight style={{ width: 16, height: 16, color: "var(--orange)", flexShrink: 0 }} />}
                </div>
              ))}

              <div style={{ padding: "14px 20px", background: "var(--surface-warm)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted)" }}>Phase progress</span>
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, color: "var(--orange)" }}>80%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: "80%" }} />
                </div>
              </div>
            </div>

            <div style={{ position: "absolute", top: -16, right: -16, background: "var(--orange)", border: "2px solid var(--navy)", padding: "6px 14px", boxShadow: "3px 3px 0 var(--navy)" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", letterSpacing: "0.12em", color: "white" }}>FREE TO START</p>
            </div>
          </div>
        </div>
        <div className="stripe-accent" />
      </section>

      {/* ── Stats ─────────────────────────────────────────── */}
      <section style={{ borderBottom: "2px solid var(--border)", background: "var(--surface)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {STATS.map((s, i) => (
              <div key={s.label} style={{ padding: "28px 24px", textAlign: "center", borderRight: i < 3 ? "2px solid var(--border)" : "none" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "3rem", color: "var(--orange)", lineHeight: 1 }}>{s.value}</div>
                <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-muted)", marginTop: 4 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Phases ───────────────────────────────────────── */}
      <section id="how-it-works" style={{ padding: "72px 0", maxWidth: 1200, margin: "0 auto", paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
          <div style={{ height: 1, width: 40, background: "var(--orange)" }} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ink-muted)" }}>The system</span>
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem,5vw,4rem)", letterSpacing: "0.02em", color: "var(--navy)", lineHeight: 1, marginBottom: 40 }}>
          6 PHASES. 30 STEPS.<br />ZERO GUESSWORK.
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {PHASES.map((phase) => (
            <div key={phase.num} className="panel" style={{ cursor: "default", transition: "box-shadow 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "4px 4px 0 var(--orange)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}>
              <div style={{ padding: 20 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "3.5rem", color: phase.color, lineHeight: 1, opacity: 0.2 }}>{phase.num}</span>
                  <span className="phase-badge" style={{ color: phase.color, borderColor: phase.color }}>Phase {phase.num}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1 }}>{phase.name.toUpperCase()}</h3>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-muted)", fontSize: "0.88rem", marginTop: 8 }}>{phase.desc}</p>
              </div>
              <div style={{ height: 6, background: `repeating-linear-gradient(-45deg, ${phase.color}, ${phase.color} 3px, transparent 3px, transparent 10px)` }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────── */}
      <section style={{ padding: "72px 0", background: "var(--navy-light)", borderTop: "2px solid var(--border)", borderBottom: "2px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3.5rem)", color: "var(--navy)", letterSpacing: "0.02em" }}>
              BUILT FOR FOUNDERS WHO SHIP
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[
              { icon: Zap, title: "Step-by-step clarity", desc: "Each step tells you exactly what to do, why it matters, and what tool to use.", color: "var(--orange)" },
              { icon: CheckCircle2, title: "Track your progress", desc: "Visual progress across all 6 phases. See exactly where you are and what's next.", color: "#8B5CF6" },
              { icon: Shield, title: "Vetted tools only", desc: "Every resource is hand-picked. No spam, no hidden upsells. Affiliate-disclosed.", color: "#16A34A" },
              { icon: Users, title: "Multiple businesses", desc: "Managing more than one venture? Track each separately in one dashboard.", color: "#0EA5E9" },
            ].map((f) => (
              <div key={f.title} className="stat-card" style={{ transition: "box-shadow 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "4px 4px 0 var(--border)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}>
                <div style={{ width: 40, height: 40, border: "2px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <f.icon style={{ width: 20, height: 20, color: f.color }} />
                </div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.92rem", color: "var(--navy)", marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-muted)", fontSize: "0.85rem" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section style={{ padding: "72px 0", maxWidth: 1200, margin: "0 auto", paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
          <div style={{ height: 1, width: 40, background: "var(--orange)" }} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ink-muted)" }}>Real founders</span>
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3.5rem)", color: "var(--navy)", letterSpacing: "0.02em", lineHeight: 1, marginBottom: 40 }}>
          THEY DID IT. YOU CAN TOO.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="journal-card">
              <div style={{ display: "flex", gap: 3, marginBottom: 12 }}>
                {[1,2,3,4,5].map(s => <Star key={s} style={{ width: 14, height: 14, fill: "var(--orange)", color: "var(--orange)" }} />)}
              </div>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-mid)", fontSize: "0.88rem", fontStyle: "italic", marginBottom: 14, lineHeight: 1.6 }}>&ldquo;{t.text}&rdquo;</p>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--navy)", fontSize: "0.85rem" }}>{t.name}</p>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-muted)", fontSize: "0.75rem" }}>{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section style={{ background: "var(--navy)", borderTop: "2px solid var(--border)", borderBottom: "2px solid var(--border)" }}>
        <div className="stripe-accent" />
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "64px 24px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem,6vw,5rem)", color: "white", letterSpacing: "0.02em", lineHeight: 1, marginBottom: 16 }}>
            YOUR BUSINESS<br /><span style={{ color: "var(--orange)" }}>WON&apos;T LAUNCH ITSELF.</span>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.55)", fontSize: "1.1rem", marginBottom: 32 }}>Free to start. No credit card required.</p>
          <Link href="/login" className="btn btn-primary" style={{ fontSize: "0.85rem", padding: "14px 36px" }}>
            Start my launch plan <ArrowRight style={{ width: 18, height: 18 }} />
          </Link>
        </div>
        <div className="stripe-accent" />
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer style={{ borderTop: "2px solid var(--border)", background: "var(--surface)", padding: "32px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", letterSpacing: "0.05em", color: "var(--navy)" }}>
            LAUNCH<span style={{ color: "var(--orange)" }}>ADVISOR</span>
          </span>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy", "Terms", "Contact"].map(l => (
              <a key={l} href="#" style={{ fontFamily: "var(--font-heading)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-muted)" }}>{l}</a>
            ))}
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--ink-muted)" }}>© 2026 LaunchAdvisor</p>
        </div>
      </footer>
    </div>
  );
}

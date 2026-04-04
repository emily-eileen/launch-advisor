"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Zap, Shield, BookOpen, TrendingUp, Star } from "lucide-react";

const PHASES = [
  { num: "01", phaseId: 1,  name: "Validate", color: "#F97316", desc: "Prove your idea before spending a dollar. Talk to customers, run demand tests, define your niche." },
  { num: "02", phaseId: 4,  name: "Form",     color: "#8B5CF6", desc: "Register your entity, get your EIN, open your bank account, set up payroll." },
  { num: "03", phaseId: 5,  name: "Finance",  color: "#16A34A", desc: "Get funded, set up bookkeeping, and build the financial systems to stay solvent." },
  { num: "04", phaseId: 2,  name: "Build",    color: "#0EA5E9", desc: "Create your MVP — product, service, or storefront. Ship the minimum that earns the first dollar." },
  { num: "05", phaseId: 7,  name: "Brand",    color: "#EF4444", desc: "Name, logo, website, social presence. Build the identity that earns trust on first contact." },
  { num: "06", phaseId: 8,  name: "Protect",  color: "#F59E0B", desc: "Business insurance, contracts, IP, and compliance. Cover the bases that sink unprepared founders." },
  { num: "07", phaseId: 6,  name: "Locate",   color: "#EC4899", desc: "Find your space — storefront, virtual office, or home-based setup. Set up your address and ops stack." },
  { num: "08", phaseId: 3,  name: "Price",    color: "#06B6D4", desc: "Set pricing that covers costs and signals value. Model your unit economics from day one." },
  { num: "09", phaseId: 9,  name: "Sell",     color: "#A855F7", desc: "Build your sales system — CRM, pipeline, outreach, and your first repeatable acquisition channel." },
  { num: "10", phaseId: 10, name: "Operate",  color: "#14B8A6", desc: "Set up team, tools, SOPs, and reporting. Run like a real business from the first week." },
];

const TESTIMONIALS = [
  { name: "Marcus T.", role: "E-commerce founder", text: "I wasted 3 months spinning my wheels. LaunchAdvisor gave me a clear path and I was open for business in 6 weeks.", stars: 5 },
  { name: "Priya K.", role: "Consulting firm", text: "The checklist links you to the actual tools you need. Saved me thousands in bad software choices.", stars: 5 },
  { name: "James R.", role: "SaaS founder", text: "Running my 3rd business through this. First time I haven't missed a critical compliance step.", stars: 5 },
];

const STATS = [
  { value: "55", label: "Proven steps" },
  { value: "10", label: "Launch phases" },
  { value: "200+", label: "Launch guides" },
  { value: "100%", label: "Free to start" },
];

const GUIDE_TOPICS = [
  { phase: "Validate", color: "#F97316", guides: ["How to Validate a Business Idea", "Market Research on a Shoestring", "Lean MVP Testing Methods"] },
  { phase: "Form",     color: "#8B5CF6", guides: ["LLC vs S-Corp: Which Is Right for You?", "How to Get an EIN in 10 Minutes", "Opening a Business Bank Account"] },
  { phase: "Finance",  color: "#16A34A", guides: ["Best Business Credit Cards for Startups", "Small Business Bookkeeping Setup", "How to Apply for an SBA Loan"] },
  { phase: "Brand",    color: "#EF4444", guides: ["Building a Brand Identity on a Budget", "How to Register a Domain Name", "The Website Launch Checklist"] },
];

const BUSINESS_CATEGORIES = [
  { value: "consulting",      label: "Consulting / Coaching" },
  { value: "tech",            label: "Tech / IT / App" },
  { value: "creative",        label: "Creative Services" },
  { value: "home-services",   label: "Home / Property Service" },
  { value: "trades",          label: "Trades / Construction" },
  { value: "food",            label: "Food & Beverage" },
  { value: "str",             label: "Airbnb / Rental" },
  { value: "ecommerce",       label: "E-Commerce / Retail" },
  { value: "beauty-wellness", label: "Beauty / Wellness" },
  { value: "care-services",   label: "Care / Personal Services" },
  { value: "saas",            label: "Software Publishers / SaaS" },
  { value: "real-estate",     label: "Real Estate Agencies / Brokerages" },
  { value: "logistics",       label: "Logistics / Trucking Fleet" },
  { value: "medspa",          label: "Private Healthcare / MedSpa" },
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
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Link href="/checklist" style={{ fontFamily: "var(--font-heading)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-muted)", padding: "8px 14px" }}>
              Checklist
            </Link>
            <Link href="/guides" style={{ fontFamily: "var(--font-heading)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-muted)", padding: "8px 14px" }}>
              Guides
            </Link>
            <Link href="/resources" style={{ fontFamily: "var(--font-heading)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-muted)", padding: "8px 14px" }}>
              Resources
            </Link>
            <div style={{ width: 1, height: 20, background: "var(--border-light)", margin: "0 8px" }} />
            <Link href="/login" style={{ fontFamily: "var(--font-heading)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-muted)", padding: "8px 14px" }}>
              Sign in
            </Link>
            <Link href="/quiz" className="btn btn-primary" style={{ fontSize: "0.75rem", padding: "9px 18px" }}>
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
                The Executive Copilot For New Founders
              </span>
            </div>

            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(4rem,9vw,8rem)", lineHeight: 0.92, letterSpacing: "0.02em", color: "white", marginBottom: 8 }}>
              STOP<br />
              <span style={{ color: "var(--orange)", WebkitTextStroke: "2px var(--navy)" }}>GOOGLING.</span><br />
              <span style={{ fontSize: "0.65em" }}>START LAUNCHING.</span>
            </h1>

            <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.6)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: 36, maxWidth: 500 }}>
              Don't guess how to start your business. Follow the exact 10-step industry process to form, build, and launch your business with confidence — zero to first revenue.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 36 }}>
              <Link href="/checklist" className="btn btn-primary" style={{ fontSize: "0.82rem", padding: "12px 28px" }}>
                Open the free checklist <ArrowRight style={{ width: 16, height: 16 }} />
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

          {/* Right — Hero Image */}
          <div style={{ position: "relative", transform: "rotate(2deg)" }}>
            <img 
              src="/hero-image.png" 
              alt="Take your startup from zero to launch" 
              style={{ width: "100%", height: "auto", border: "4px solid var(--navy)", boxShadow: "10px 10px 0 var(--orange)", borderRadius: 8 }} 
            />
            <div style={{ position: "absolute", top: -16, right: -16, background: "var(--orange)", border: "2px solid var(--navy)", padding: "6px 14px", boxShadow: "3px 3px 0 var(--navy)", transform: "rotate(-4deg)" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", letterSpacing: "0.12em", color: "white" }}>ZERO GUESSWORK</p>
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
      <section id="how-it-works" style={{ padding: "72px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
          <div style={{ height: 1, width: 40, background: "var(--orange)" }} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ink-muted)" }}>The system</span>
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem,5vw,4rem)", letterSpacing: "0.02em", color: "var(--navy)", lineHeight: 1, marginBottom: 12 }}>
          10 PHASES. 55 STEPS.<br />ZERO GUESSWORK.
        </h2>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-muted)", fontSize: "1rem", marginBottom: 40, maxWidth: 600 }}>
          Every phase unlocks the next. Complete them in order or jump to where you are — your progress is tracked automatically.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
          {PHASES.map((phase) => (
            <Link key={phase.num} href={`/checklist#phase-${phase.phaseId}`}
              className="panel"
              style={{ textDecoration: "none", display: "block", transition: "box-shadow 0.15s, transform 0.15s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0 ${phase.color}`; (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
              <div style={{ padding: "16px 16px 12px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", color: phase.color, lineHeight: 1, opacity: 0.18 }}>{phase.num}</span>
                  <span className="phase-badge" style={{ color: phase.color, borderColor: phase.color, fontSize: "0.58rem" }}>Phase {parseInt(phase.num)}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", letterSpacing: "0.03em", color: "var(--navy)", lineHeight: 1, marginBottom: 8 }}>{phase.name.toUpperCase()}</h3>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-muted)", fontSize: "0.78rem", lineHeight: 1.5 }}>{phase.desc}</p>
              </div>
              <div style={{ height: 4, background: `repeating-linear-gradient(-45deg, ${phase.color}, ${phase.color} 3px, transparent 3px, transparent 10px)` }} />
            </Link>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 32 }}>
          <Link href="/checklist" className="btn btn-secondary" style={{ fontSize: "0.8rem", padding: "12px 32px" }}>
            Open the full 55-step checklist <ArrowRight style={{ width: 15, height: 15 }} />
          </Link>
        </div>
      </section>

      {/* ── Guides ───────────────────────────────────────── */}
      <section style={{ padding: "72px 24px", background: "var(--navy-light)", borderTop: "2px solid var(--border)", borderBottom: "2px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                <div style={{ height: 1, width: 40, background: "var(--orange)" }} />
                <span style={{ fontFamily: "var(--font-display)", fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ink-muted)" }}>200+ free guides</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3.5rem)", color: "var(--navy)", letterSpacing: "0.02em", lineHeight: 1 }}>
                EVERY ANSWER.<br />ONE PLACE.
              </h2>
            </div>
            <Link href="/guides" className="btn btn-secondary" style={{ fontSize: "0.78rem", padding: "10px 24px", flexShrink: 0 }}>
              Browse all guides <BookOpen style={{ width: 14, height: 14 }} />
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {GUIDE_TOPICS.map((topic) => (
              <div key={topic.phase} className="panel" style={{ background: "var(--surface)" }}>
                <div style={{ padding: "14px 16px 12px", borderBottom: "2px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 8, height: 8, background: topic.color, flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", letterSpacing: "0.08em", color: "var(--navy)" }}>{topic.phase.toUpperCase()}</span>
                </div>
                <div style={{ padding: "8px 0" }}>
                  {topic.guides.map((guide, i) => (
                    <Link key={guide} href="/guides"
                      style={{ display: "block", padding: "9px 16px", fontFamily: "var(--font-heading)", fontSize: "0.78rem", fontWeight: 600, color: "var(--ink-mid)", textDecoration: "none", borderBottom: i < topic.guides.length - 1 ? "1px solid var(--border-light)" : "none", transition: "color 0.15s, background 0.15s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = `${topic.color}`; (e.currentTarget as HTMLElement).style.background = "var(--surface-warm)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--ink-mid)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                      {guide}
                    </Link>
                  ))}
                </div>
                <div style={{ height: 3, background: `repeating-linear-gradient(-45deg, ${topic.color}, ${topic.color} 2px, transparent 2px, transparent 8px)` }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industry Specific ───────────────────────────────────────── */}
      <section style={{ padding: "48px 24px", background: "white", borderBottom: "2px solid var(--border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--navy)", letterSpacing: "0.02em" }}>
              BROWSE BY <span style={{ color: "var(--orange)" }}>INDUSTRY</span>
            </h2>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-muted)", fontSize: "0.9rem", marginTop: 8 }}>
              Check out launch guides and tool libraries mapped perfectly to your vertical.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {BUSINESS_CATEGORIES.map(c => (
              <div key={c.value} className="panel" style={{ padding: "16px", background: "var(--surface)", border: "1.5px solid var(--border-light)" }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "0.85rem", fontWeight: 700, color: "var(--navy)", marginBottom: 12 }}>
                  {c.label}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <Link href={`/guides?industry=${c.value}`} style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--orange)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                    Read Guides <ArrowRight style={{ width: 12, height: 12 }} />
                  </Link>
                  <Link href={`/resources?industry=${c.value}`} style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--orange)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                    View Resources <ArrowRight style={{ width: 12, height: 12 }} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────── */}
      <section style={{ padding: "72px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3.5rem)", color: "var(--navy)", letterSpacing: "0.02em" }}>
              BUILT FOR FOUNDERS WHO SHIP
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[
              { icon: Zap, title: "Step-by-step clarity", desc: "Each step tells you exactly what to do, why it matters, and which tool to use.", color: "var(--orange)" },
              { icon: CheckCircle2, title: "Track your progress", desc: "Visual progress across all 10 phases. See exactly where you are and what comes next.", color: "#8B5CF6" },
              { icon: Shield, title: "Vetted tools only", desc: "Every resource is hand-picked. No spam, no hidden upsells. Affiliate-disclosed.", color: "#16A34A" },
              { icon: BookOpen, title: "200+ launch guides", desc: "Deep-dive articles for every phase, every question, every edge case you'll face.", color: "#0EA5E9" },
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

      {/* ── Product Ladder ────────────────────────────────── */}
      <section style={{ padding: "72px 0", background: "var(--navy)", borderTop: "2px solid var(--border)", borderBottom: "2px solid var(--border)" }}>
        <div className="stripe-accent" style={{ opacity: 0.4 }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
            <div style={{ height: 1, width: 40, background: "var(--orange)" }} />
            <span style={{ fontFamily: "var(--font-display)", fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>Where this takes you</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3.5rem)", color: "white", letterSpacing: "0.02em", lineHeight: 1, marginBottom: 40 }}>
            LAUNCH IS JUST<br /><span style={{ color: "var(--orange)" }}>THE BEGINNING.</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              {
                step: "01",
                title: "LaunchAdvisor",
                subtitle: "Zero → Launch",
                desc: "Start here. Get your business from idea to open for business with the 55-step checklist.",
                cta: "You are here",
                ctaHref: "/checklist",
                color: "var(--orange)",
                active: true,
              },
              {
                step: "02",
                title: "Build to Disappear",
                subtitle: "$0 → $10M",
                desc: "Once you launch, scale with systems. Build a business that runs without you — free playbook for post-launch founders.",
                cta: "Coming soon",
                ctaHref: "#",
                color: "#8B5CF6",
                active: false,
              },
              {
                step: "03",
                title: "MeetMyCXO",
                subtitle: "AI Executive Suite",
                desc: "CMO, CFO, CRO, COO, CTO — AI advisors trained on your business, available on demand.",
                cta: "Join waitlist →",
                ctaHref: "https://meetmycxo.com",
                color: "#16A34A",
                active: false,
              },
            ].map((item) => (
              <div key={item.step} style={{ border: `2px solid ${item.active ? item.color : "rgba(255,255,255,0.12)"}`, background: item.active ? "rgba(249,115,22,0.08)" : "rgba(255,255,255,0.04)", padding: "28px 24px", position: "relative" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "3rem", color: item.color, lineHeight: 1, opacity: 0.25 }}>{item.step}</span>
                  {item.active && (
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", letterSpacing: "0.2em", background: "var(--orange)", color: "white", padding: "3px 10px" }}>CURRENT</span>
                  )}
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", letterSpacing: "0.03em", color: "white", lineHeight: 1, marginBottom: 4 }}>{item.title.toUpperCase()}</h3>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", letterSpacing: "0.15em", color: item.color, marginBottom: 14 }}>{item.subtitle}</p>
                <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 20 }}>{item.desc}</p>
                <a href={item.ctaHref} style={{ fontFamily: "var(--font-heading)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: item.active ? "var(--orange)" : "rgba(255,255,255,0.35)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                  {item.cta} {item.active && <ArrowRight style={{ width: 14, height: 14 }} />}
                </a>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `repeating-linear-gradient(-45deg, ${item.color}, ${item.color} 2px, transparent 2px, transparent 8px)`, opacity: item.active ? 1 : 0.3 }} />
              </div>
            ))}
          </div>
        </div>
        <div className="stripe-accent" style={{ marginTop: 40, opacity: 0.4 }} />
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section style={{ padding: "72px 24px", maxWidth: 1200, margin: "0 auto" }}>
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
          <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.55)", fontSize: "1.1rem", marginBottom: 32 }}>
            Free to start. No credit card. No fluff.<br />
            <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.35)" }}>55 steps. 10 phases. Every tool vetted.</span>
          </p>
          <Link href="/checklist" className="btn btn-primary" style={{ fontSize: "0.85rem", padding: "14px 36px" }}>
            Open the free checklist <ArrowRight style={{ width: 18, height: 18 }} />
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
            {[["Checklist", "/checklist"], ["Guides", "/guides"], ["Resources", "/resources"], ["Privacy", "#"], ["Terms", "#"]].map(([label, href]) => (
              <Link key={label} href={href} style={{ fontFamily: "var(--font-heading)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-muted)", textDecoration: "none" }}>{label}</Link>
            ))}
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--ink-muted)" }}>© 2026 LaunchAdvisor</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", color: "var(--border-light)", marginTop: 2 }}>Some links are affiliate links. See our <a href="#" style={{ color: "var(--ink-muted)" }}>disclosure</a>.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

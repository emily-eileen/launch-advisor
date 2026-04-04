"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  BookOpen, Library, Settings,
  LogOut, Menu, X, Plus, ChevronDown, Rocket,
} from "lucide-react";
import { phases, checklistSteps } from "@/lib/data/checklist";

const PHASE_COLORS = ["#F97316", "#8B5CF6", "#16A34A", "#0EA5E9", "#EF4444", "#F59E0B"];

const MOCK_BUSINESSES = [
  { id: "1", name: "Acme Ecommerce", type: "E-commerce" },
  { id: "2", name: "Consulting Co",  type: "Services" },
];

const PUBLIC_PATHS = ["/checklist", "/resources"];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser]             = useState<{ email?: string; id?: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bizMenuOpen, setBizMenuOpen] = useState(false);
  const [activeBiz, setActiveBiz]   = useState(MOCK_BUSINESSES[0]);
  const [completed, setCompleted]   = useState<Set<string>>(new Set());
  const [loading, setLoading]       = useState(true);
  const router   = useRouter();
  const pathname = usePathname();

  const isPublicPath = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

  // Determine active phase from pathname
  const currentStepId = pathname.startsWith("/checklist/")
    ? pathname.replace("/checklist/", "")
    : null;
  const currentStep = currentStepId
    ? checklistSteps.find((s) => s.id === currentStepId)
    : null;
  const activePhase = currentStep?.phase ?? null;

  useEffect(() => {
    // Load progress from localStorage
    const saved = localStorage.getItem("launchadvisor_progress");
    if (saved) setCompleted(new Set(JSON.parse(saved)));

    async function getUser() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user && !isPublicPath) { router.push("/login"); return; }
        setUser(user ? { email: user.email, id: user.id } : null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, [router, isPublicPath]);

  async function handleSignOut() {
    try { const supabase = createClient(); await supabase.auth.signOut(); } catch { /* ignore */ }
    router.push("/login");
  }

  const totalDone  = completed.size;
  const totalSteps = checklistSteps.length;

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 8 }}>
            LOADING...
          </div>
          <div style={{ width: 160, height: 4, background: "var(--border-light)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: "40%", background: "var(--orange)", animation: "progressGrow 1s ease infinite alternate" }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "var(--bg)" }}>
      {sidebarOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 40 }} onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ──────────────────────────────────────── */}
      <aside style={{
        width: "var(--sidebar-width)", background: "var(--navy)",
        borderRight: "2px solid var(--border)", display: "flex",
        flexDirection: "column", minHeight: "100vh",
        position: "sticky", top: 0, flexShrink: 0, zIndex: 50,
      }}>

        {/* Logo */}
        <div style={{ padding: "18px 16px 14px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <Link href="/checklist" style={{ display: "block", textDecoration: "none" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", letterSpacing: "0.05em", color: "white", lineHeight: 1 }}>
              LAUNCH<span style={{ color: "var(--orange)" }}>ADVISOR</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
              <div style={{ height: 2, width: 20, background: "var(--orange)" }} />
              <span style={{ fontFamily: "var(--font-display)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
                Launch OS
              </span>
            </div>
          </Link>
        </div>

        {/* Business switcher — auth only */}
        {user && (
          <div style={{ padding: "10px 10px", borderBottom: "1px solid rgba(255,255,255,0.08)", position: "relative" }}>
            <button
              onClick={() => setBizMenuOpen(!bizMenuOpen)}
              className="biz-switcher"
              style={{ width: "100%", padding: "8px 10px", display: "flex", alignItems: "center", gap: 8, textAlign: "left" }}
            >
              <div style={{ width: 24, height: 24, background: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Rocket style={{ width: 12, height: 12, color: "white" }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.75rem", fontWeight: 700, color: "white", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {activeBiz.name}
                </p>
              </div>
              <ChevronDown style={{ width: 12, height: 12, color: "rgba(255,255,255,0.4)", flexShrink: 0, transform: bizMenuOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
            </button>

            {bizMenuOpen && (
              <div style={{ position: "absolute", left: 10, right: 10, top: "100%", background: "var(--surface)", border: "2px solid var(--border)", zIndex: 100, boxShadow: "4px 4px 0 var(--border)" }}>
                {MOCK_BUSINESSES.map(biz => (
                  <button key={biz.id} onClick={() => { setActiveBiz(biz); setBizMenuOpen(false); }}
                    style={{ width: "100%", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid var(--border-light)", background: activeBiz.id === biz.id ? "var(--orange-light)" : "transparent", cursor: "pointer" }}>
                    <div style={{ flex: 1, textAlign: "left" }}>
                      <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.8rem", fontWeight: 700, color: "var(--navy)" }}>{biz.name}</p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", color: "var(--ink-muted)" }}>{biz.type}</p>
                    </div>
                    {activeBiz.id === biz.id && <div style={{ width: 6, height: 6, background: "var(--orange)" }} />}
                  </button>
                ))}
                <button style={{ width: "100%", padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, cursor: "pointer", background: "transparent" }}>
                  <Plus style={{ width: 14, height: 14, color: "var(--orange)" }} />
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.75rem", fontWeight: 600, color: "var(--orange)", letterSpacing: "0.05em" }}>Add Business</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Overall progress bar */}
        <div style={{ padding: "10px 14px 8px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
              Overall
            </span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", color: "var(--orange)", lineHeight: 1 }}>
              {totalDone}<span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.3)" }}>/{totalSteps}</span>
            </span>
          </div>
          <div style={{ height: 3, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(totalDone / totalSteps) * 100}%`, background: "var(--orange)", transition: "width 0.6s ease" }} />
          </div>
        </div>

        {/* ── Phase navigation (primary) ─────────────────── */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "6px 0" }}>
          {phases.map((phase, i) => {
            const color      = PHASE_COLORS[i];
            const phaseSteps = checklistSteps.filter((s) => s.phase === phase.number);
            const done       = phaseSteps.filter((s) => completed.has(s.id)).length;
            const pct        = phaseSteps.length ? (done / phaseSteps.length) * 100 : 0;
            const isActive   = activePhase === phase.number ||
              (pathname === "/checklist" && false); // highlight only on step pages
            const isComplete = done === phaseSteps.length;

            return (
              <Link
                key={phase.number}
                href={`/checklist#phase-${phase.number}`}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: "block",
                  padding: "10px 14px 10px 16px",
                  textDecoration: "none",
                  borderLeft: `3px solid ${isActive ? color : "transparent"}`,
                  background: isActive ? `${color}18` : "transparent",
                  transition: "all 0.15s",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
                className="phase-nav-item"
              >
                <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                  {/* Phase num */}
                  <span style={{
                    fontFamily: "var(--font-display)", fontSize: "0.75rem",
                    color: isActive ? color : "rgba(255,255,255,0.2)",
                    letterSpacing: "0.06em", minWidth: 22, flexShrink: 0,
                    transition: "color 0.15s",
                  }}>
                    {String(phase.number).padStart(2, "0")}
                  </span>

                  {/* Phase name */}
                  <span style={{
                    fontFamily: "var(--font-display)", fontSize: "0.88rem",
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    color: isActive ? "white" : isComplete ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.7)",
                    flex: 1, transition: "color 0.15s",
                  }}>
                    {phase.name}
                  </span>

                  {/* Count badge */}
                  <span style={{
                    fontFamily: "var(--font-display)", fontSize: "0.65rem",
                    color: isComplete ? color : "rgba(255,255,255,0.3)",
                    letterSpacing: "0.05em", flexShrink: 0,
                  }}>
                    {done}/{phaseSteps.length}
                  </span>
                </div>

                {/* Mini phase progress bar */}
                <div style={{ marginTop: 5, height: 2, background: "rgba(255,255,255,0.07)", overflow: "hidden", marginLeft: 22 }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: color, transition: "width 0.6s ease", opacity: isActive ? 1 : 0.6 }} />
                </div>
              </Link>
            );
          })}
        </nav>

        {/* ── Secondary links ───────────────────────────── */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "6px 0" }}>
          {[
            { href: "/resources", label: "Resources",  Icon: Library  },
            { href: "/journal",   label: "Journal",    Icon: BookOpen },
            { href: "/settings",  label: "Settings",   Icon: Settings },
          ].map(({ href, label, Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link key={href} href={href} onClick={() => setSidebarOpen(false)}
                className={`sidebar-link ${isActive ? "active" : ""}`}
                style={{ fontSize: "0.72rem" }}>
                <Icon style={{ width: 14, height: 14 }} />
                {label}
              </Link>
            );
          })}
        </div>

        {/* ── User footer ───────────────────────────────── */}
        <div style={{ padding: "10px 10px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <p style={{ flex: 1, fontFamily: "var(--font-heading)", fontSize: "0.68rem", fontWeight: 600, color: "rgba(255,255,255,0.4)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user.email}
              </p>
              <button onClick={handleSignOut} title="Sign out" style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", padding: 4, flexShrink: 0 }}>
                <LogOut style={{ width: 14, height: 14 }} />
              </button>
            </div>
          ) : (
            <Link href="/login" style={{ display: "block", padding: "9px 14px", background: "var(--orange)", textAlign: "center", fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "white", textDecoration: "none" }}>
              Save Progress →
            </Link>
          )}
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────── */}
      <div style={{ flex: 1, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Mobile topbar */}
        <header style={{ display: "none", borderBottom: "2px solid var(--border)", background: "var(--navy)", padding: "12px 16px", alignItems: "center", justifyContent: "space-between" }}
          className="mobile-header">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: "white" }}>
            {sidebarOpen ? <X style={{ width: 20, height: 20 }} /> : <Menu style={{ width: 20, height: 20 }} />}
          </button>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", letterSpacing: "0.05em", color: "white" }}>
            LAUNCH<span style={{ color: "var(--orange)" }}>ADVISOR</span>
          </span>
          <div style={{ width: 32 }} />
        </header>

        <main style={{ flex: 1, padding: "32px", maxWidth: 1100, width: "100%" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

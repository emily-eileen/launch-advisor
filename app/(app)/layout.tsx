"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, CheckSquare, BookOpen, Library, Settings,
  LogOut, Menu, X, Plus, ChevronDown, Rocket,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/checklist", label: "Checklist", icon: CheckSquare },
  { href: "/journal", label: "Journal", icon: BookOpen },
  { href: "/resources", label: "Resources", icon: Library },
  { href: "/settings", label: "Settings", icon: Settings },
];

// Mock businesses for multi-biz UI
const MOCK_BUSINESSES = [
  { id: "1", name: "Acme Ecommerce", type: "E-commerce", progress: 14 },
  { id: "2", name: "Consulting Co", type: "Services", progress: 6 },
];

const PUBLIC_PATHS = ["/checklist", "/resources"];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ email?: string; id?: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bizMenuOpen, setBizMenuOpen] = useState(false);
  const [activeBiz, setActiveBiz] = useState(MOCK_BUSINESSES[0]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const isPublicPath = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

  useEffect(() => {
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
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch { /* ignore */ }
    router.push("/login");
  }

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
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 40 }} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside style={{
        width: "var(--sidebar-width)",
        background: "var(--navy)",
        borderRight: "2px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "sticky",
        top: 0,
        flexShrink: 0,
        zIndex: 50,
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <Link href="/dashboard" style={{ display: "block", textDecoration: "none" }}>
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

        {/* Business Switcher — auth only */}
        {user && <div style={{ padding: "12px 10px", borderBottom: "1px solid rgba(255,255,255,0.08)", position: "relative" }}>
          <button
            onClick={() => setBizMenuOpen(!bizMenuOpen)}
            className="biz-switcher"
            style={{ width: "100%", padding: "10px 12px", display: "flex", alignItems: "center", gap: 10, textAlign: "left" }}>
            <div style={{ width: 28, height: 28, background: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Rocket style={{ width: 14, height: 14, color: "white" }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.78rem", fontWeight: 700, color: "white", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {activeBiz.name}
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>{activeBiz.type}</p>
            </div>
            <ChevronDown style={{ width: 14, height: 14, color: "rgba(255,255,255,0.4)", flexShrink: 0, transform: bizMenuOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </button>

          {bizMenuOpen && (
            <div style={{ position: "absolute", left: 10, right: 10, top: "100%", background: "var(--surface)", border: "2px solid var(--border)", zIndex: 100, boxShadow: "4px 4px 0 var(--border)" }}>
              {MOCK_BUSINESSES.map(biz => (
                <button key={biz.id} onClick={() => { setActiveBiz(biz); setBizMenuOpen(false); }}
                  style={{ width: "100%", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid var(--border-light)", background: activeBiz.id === biz.id ? "var(--orange-light)" : "transparent", cursor: "pointer" }}>
                  <div style={{ flex: 1, textAlign: "left" }}>
                    <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.8rem", fontWeight: 700, color: "var(--navy)" }}>{biz.name}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", color: "var(--ink-muted)" }}>{biz.progress}/30 steps</p>
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
        </div>}

        {/* Progress blurb — auth only */}
        {user && <div style={{ padding: "10px 12px", margin: "8px 10px", background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>Overall progress</span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", color: "var(--orange)" }}>{activeBiz.progress}/30</span>
          </div>
          <div style={{ height: 4, background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(activeBiz.progress / 30) * 100}%`, background: "var(--orange)" }} />
          </div>
        </div>}

        {/* Nav */}
        <nav style={{ flex: 1, padding: "8px 8px" }}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}
                className={`sidebar-link ${isActive ? "active" : ""}`}>
                <item.icon style={{ width: 16, height: 16 }} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User footer */}
        <div style={{ padding: "12px 10px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {user ? (
            <>
              <div style={{ padding: "8px 12px", marginBottom: 4 }}>
                <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 600, color: "rgba(255,255,255,0.5)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {user.email}
                </p>
              </div>
              <button onClick={handleSignOut} className="sidebar-link" style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex" }}>
                <LogOut style={{ width: 16, height: 16 }} />
                Sign out
              </button>
            </>
          ) : (
            <Link href="/login" style={{ display: "block", margin: "4px 0", padding: "10px 14px", background: "var(--orange)", textAlign: "center", fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "white", textDecoration: "none" }}>
              Save Progress →
            </Link>
          )}
        </div>
      </aside>

      {/* Main */}
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

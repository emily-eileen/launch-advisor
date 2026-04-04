import Link from "next/link";

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Topbar */}
      <header style={{
        borderBottom: "2px solid var(--border)",
        background: "var(--navy)",
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", letterSpacing: "0.05em", color: "white" }}>
            LAUNCH<span style={{ color: "var(--orange)" }}>ADVISOR</span>
          </span>
        </Link>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <Link href="/guides" style={{ fontFamily: "var(--font-heading)", fontSize: "0.78rem", fontWeight: 600, color: "rgba(255,255,255,0.6)", textDecoration: "none", letterSpacing: "0.06em" }}>
            ALL GUIDES
          </Link>
          <Link href="/checklist" style={{ fontFamily: "var(--font-heading)", fontSize: "0.78rem", fontWeight: 700, color: "white", textDecoration: "none", letterSpacing: "0.06em", background: "var(--orange)", padding: "8px 16px" }}>
            FREE CHECKLIST →
          </Link>
        </div>
      </header>

      <main>{children}</main>

      {/* Footer */}
      <footer style={{ borderTop: "2px solid var(--border)", background: "var(--navy)", padding: "32px 24px", marginTop: 80 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "white", letterSpacing: "0.05em" }}>
              LAUNCH<span style={{ color: "var(--orange)" }}>ADVISOR</span>
            </span>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", marginTop: 6, maxWidth: 280 }}>
              The step-by-step operating system for launching your business. Free forever.
            </p>
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            <div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "0.55rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", marginBottom: 10, textTransform: "uppercase" }}>Resources</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <Link href="/checklist" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Launch Checklist</Link>
                <Link href="/guides" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Guides</Link>
                <Link href="/resources" style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Tools & Resources</Link>
              </div>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 900, margin: "24px auto 0", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "rgba(255,255,255,0.2)" }}>
            © {new Date().getFullYear()} LaunchAdvisor. Some links on this page are affiliate links — we may earn a commission at no extra cost to you.
          </p>
        </div>
      </footer>
    </div>
  );
}

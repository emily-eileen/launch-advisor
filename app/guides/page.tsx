import type { Metadata } from "next";
import Link from "next/link";
import { getAllGuides } from "@/lib/data/guides/index";
import type { Guide } from "@/lib/data/guides/types";

export const metadata: Metadata = {
  title: "Business Launch Guides — LaunchAdvisor",
  description: "Free step-by-step guides for every stage of launching a business — from validating your idea to hiring your first team.",
  openGraph: {
    title: "Business Launch Guides — LaunchAdvisor",
    description: "Free guides covering every step of launching a business.",
    url: "https://launchadvisor.co/guides",
    siteName: "LaunchAdvisor",
    type: "website",
  },
  alternates: { canonical: "https://launchadvisor.co/guides" },
};

const PHASE_COLORS: Record<number, string> = {
  1: "#F97316", 2: "#8B5CF6", 3: "#16A34A", 4: "#0EA5E9",
  5: "#EF4444", 6: "#F59E0B", 7: "#EC4899", 8: "#06B6D4",
  9: "#A855F7", 10: "#14B8A6",
};

const PHASE_NAMES: Record<number, string> = {
  1: "Validate", 2: "Build", 3: "Price", 4: "Form", 5: "Finance",
  6: "Locate", 7: "Brand", 8: "Protect", 9: "Sell", 10: "Operate",
};

export default async function GuidesIndexPage() {
  const guides = await getAllGuides();

  // Group by phase
  const byPhase: Record<number, Guide[]> = {};
  for (const g of guides) {
    if (!byPhase[g.phase]) byPhase[g.phase] = [];
    byPhase[g.phase].push(g);
  }

  const totalGuides = guides.length;

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px 80px" }}>

      {/* Header */}
      <div style={{ marginBottom: 56 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ height: 2, width: 32, background: "var(--orange)" }} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "var(--ink-muted)", textTransform: "uppercase" }}>
            Free Guides
          </span>
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: "0.02em", color: "var(--navy)", lineHeight: 1, marginBottom: 16 }}>
          LAUNCH YOUR<br />BUSINESS — RIGHT.
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "var(--ink-muted)", maxWidth: 560, lineHeight: 1.6 }}>
          {totalGuides} free guides covering every step — from testing your first idea to building the systems that let your business run without you.
        </p>
        <div style={{ marginTop: 24 }}>
          <Link href="/checklist" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontFamily: "var(--font-heading)", fontSize: "0.82rem", fontWeight: 700,
            letterSpacing: "0.08em", textTransform: "uppercase", color: "white",
            background: "var(--orange)", padding: "12px 22px", textDecoration: "none",
          }}>
            Get the Free Checklist →
          </Link>
        </div>
      </div>

      {/* Phases */}
      {Object.entries(byPhase)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([phaseStr, phaseGuides]) => {
          const phase = Number(phaseStr);
          const color = PHASE_COLORS[phase];
          const name = PHASE_NAMES[phase];
          return (
            <section key={phase} style={{ marginBottom: 64 }}>
              {/* Phase header */}
              <div style={{
                display: "flex", alignItems: "center", gap: 12, marginBottom: 24,
                paddingBottom: 16, borderBottom: `2px solid ${color}33`,
              }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: `${color}44`, letterSpacing: "0.05em", lineHeight: 1 }}>
                  {String(phase).padStart(2, "0")}
                </div>
                <div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", letterSpacing: "0.06em", color: "var(--navy)", lineHeight: 1 }}>
                    {name.toUpperCase()}
                  </h2>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--ink-muted)", marginTop: 2 }}>
                    {phaseGuides.length} guides
                  </p>
                </div>
              </div>

              {/* Guide cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
                {phaseGuides.map((guide) => (
                  <Link key={guide.slug} href={`/guides/${guide.slug}`}
                    style={{
                      display: "block", padding: "20px", border: "2px solid var(--border)",
                      background: "var(--surface)", textDecoration: "none",
                      transition: "border-color 0.15s, box-shadow 0.15s",
                    }}
                    className="guide-card"
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "var(--ink-muted)" }}>
                        {guide.readTime} min
                      </span>
                      <div style={{ width: 8, height: 8, background: color, flexShrink: 0 }} />
                    </div>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "0.92rem", fontWeight: 700, color: "var(--navy)", lineHeight: 1.35, marginBottom: 8 }}>
                      {guide.title}
                    </h3>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--ink-muted)", lineHeight: 1.5 }}>
                      {guide.metaDescription.slice(0, 100)}…
                    </p>
                    <div style={{ marginTop: 12 }}>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", letterSpacing: "0.15em", color, textTransform: "uppercase" }}>
                        Read guide →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
    </div>
  );
}

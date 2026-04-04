"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import type { Guide } from "@/lib/data/guides/types";

const PHASE_COLORS: Record<number, string> = {
  1: "#F97316", 4: "#8B5CF6", 5: "#16A34A", 2: "#0EA5E9",
  7: "#EF4444", 8: "#F59E0B", 6: "#EC4899", 3: "#06B6D4",
  9: "#A855F7", 10: "#14B8A6",
};

const PHASE_NAMES: Record<number, string> = {
  1: "Validate", 4: "Form", 5: "Finance", 2: "Build",
  7: "Brand", 8: "Protect", 6: "Locate", 3: "Price",
  9: "Sell", 10: "Operate",
};

const PHASE_FILTERS = [
  { num: "All", label: "All Phases", color: "var(--navy)" },
  { num: "1",   label: "01 Validate", color: "#F97316" },
  { num: "4",   label: "02 Form",     color: "#8B5CF6" },
  { num: "5",   label: "03 Finance",  color: "#16A34A" },
  { num: "2",   label: "04 Build",    color: "#0EA5E9" },
  { num: "7",   label: "05 Brand",    color: "#EF4444" },
  { num: "8",   label: "06 Protect",  color: "#F59E0B" },
  { num: "6",   label: "07 Locate",   color: "#EC4899" },
  { num: "3",   label: "08 Price",    color: "#06B6D4" },
  { num: "9",   label: "09 Sell",     color: "#A855F7" },
  { num: "10",  label: "10 Operate",  color: "#14B8A6" },
];

const SUBJECT_FILTERS = [
  "All",
  "Research & Validate",
  "Legal & Finance",
  "Brand & Design",
  "Operations & Logistics",
  "Marketing & Sales",
];

const PHASE_TO_SUBJECT: Record<number, string> = {
  1: "Research & Validate",
  4: "Legal & Finance",
  5: "Legal & Finance",
  8: "Legal & Finance",
  7: "Brand & Design",
  2: "Operations & Logistics",
  6: "Operations & Logistics",
  10: "Operations & Logistics",
  3: "Marketing & Sales",
  9: "Marketing & Sales",
};

const BUSINESS_CATEGORIES = [
  { value: "all",             label: "All Industries (General)",    naics: "" },
  { value: "consulting",      label: "Consulting / Coaching",       naics: "541611" },
  { value: "tech",            label: "Tech / IT / App",             naics: "541512" },
  { value: "creative",        label: "Creative Services",           naics: "541810" },
  { value: "home-services",   label: "Home & Property Services",    naics: "561720" },
  { value: "trades",          label: "Trades & Construction",       naics: "238220" },
  { value: "food",            label: "Food & Beverage",             naics: "722330" },
  { value: "str",             label: "Short-Term Rental / Airbnb",  naics: "721199" },
  { value: "ecommerce",       label: "E-Commerce / Retail",         naics: "454110" },
  { value: "beauty-wellness", label: "Beauty / Wellness / Fitness", naics: "812112" },
  { value: "care-services",   label: "Care & Personal Services",    naics: "812990" },
  { value: "saas",            label: "Software Publishers / SaaS Startups", naics: "513210" },
  { value: "real-estate",     label: "Real Estate Agencies & Brokerages", naics: "531210" },
  { value: "logistics",       label: "Logistics / Freight / Trucking", naics: "484121" },
  { value: "medspa",          label: "Private Healthcare / MedSpa Practices", naics: "621399" },
];

export default function GuidesClient({ guides, initialIndustry = "all" }: { guides: Guide[], initialIndustry?: string }) {
  const router = useRouter();
  const [selectedPhase, setSelectedPhase] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [search, setSearch] = useState("");

  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val && val !== "all") {
      router.push(`/guides?industry=${val}`);
    } else {
      router.push(`/guides`);
    }
  };

  const filtered = guides.filter(g => {
    const matchPhase = selectedPhase === "All" || g.phase === parseInt(selectedPhase);
    const matchSubject = selectedSubject === "All" || PHASE_TO_SUBJECT[g.phase] === selectedSubject;
    const q = search.toLowerCase();
    const matchSearch = !q || g.title.toLowerCase().includes(q) || g.metaDescription.toLowerCase().includes(q);
    
    return matchPhase && matchSubject && matchSearch;
  });

  // Group filtered by phase
  const byPhase: Record<number, Guide[]> = {};
  for (const g of filtered) {
    if (!byPhase[g.phase]) byPhase[g.phase] = [];
    byPhase[g.phase].push(g);
  }

  return (
    <div>
      {/* ── Search & Industry ────────────────────────────────────────── */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 280px" }}>
          <Search style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, color: "var(--ink-muted)" }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search guides..."
            style={{ paddingLeft: 36, width: "100%", padding: "12px 12px 12px 36px", border: "1px solid var(--border-light)", fontSize: "0.9rem" }}
          />
        </div>
        <div style={{ flex: "0 0 240px" }}>
          <select
            value={initialIndustry}
            onChange={handleIndustryChange}
            style={{ width: "100%", padding: "12px", border: "1px solid var(--border-light)", fontSize: "0.9rem", background: "white" }}
          >
            {BUSINESS_CATEGORIES.map(c => (
              <option key={c.value} value={c.value}>
                {c.label} {c.naics ? `(NAICS: ${c.naics})` : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Phase pills ───────────────────────────────────── */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
        {PHASE_FILTERS.map((phase) => {
          const isActive = selectedPhase === phase.num;
          return (
            <button
              key={phase.num}
              onClick={() => setSelectedPhase(phase.num)}
              style={{
                fontFamily: "var(--font-heading)", fontSize: "0.68rem", fontWeight: 700,
                letterSpacing: "0.05em", textTransform: "uppercase", padding: "5px 11px",
                border: `2px solid ${isActive ? phase.color : "var(--border-light)"}`,
                background: isActive ? phase.color : "transparent",
                color: isActive ? "white" : "var(--ink-muted)",
                cursor: "pointer", transition: "all 0.12s",
              }}
            >
              {phase.label}
            </button>
          );
        })}
      </div>

      {/* ── Subject pills ──────────────────────────────────- */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 40 }}>
        {SUBJECT_FILTERS.map((subj) => {
          const isActive = selectedSubject === subj;
          return (
            <button
              key={subj}
              onClick={() => setSelectedSubject(subj)}
              style={{
                fontFamily: "var(--font-heading)", fontSize: "0.65rem", fontWeight: 600,
                padding: "3px 9px", borderRadius: 4,
                border: `1.5px solid ${isActive ? "var(--orange)" : "var(--border-light)"}`,
                background: isActive ? `rgba(249,115,22,0.1)` : "transparent",
                color: isActive ? "var(--orange)" : "var(--ink-muted)",
                cursor: "pointer", transition: "all 0.12s",
              }}
            >
              {subj}
            </button>
          );
        })}
      </div>

      {/* Phases layout */}
      {Object.entries(byPhase)
        .sort(([a], [b]) => {
            // Sort by correct display order
            const orderList = [1, 4, 5, 2, 7, 8, 6, 3, 9, 10];
            return orderList.indexOf(Number(a)) - orderList.indexOf(Number(b));
        })
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

        {Object.keys(byPhase).length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <p style={{ fontFamily: "var(--font-heading)", color: "var(--ink-muted)" }}>
              No guides found. Try a different search or filter.
            </p>
          </div>
        )}
    </div>
  );
}

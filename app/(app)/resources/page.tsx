"use client";

import { useState } from "react";
import { ExternalLink, Search, ArrowRight } from "lucide-react";

interface Resource {
  id: string;
  name: string;
  description: string;
  url: string;
  affiliateUrl?: string;
  category: string;
  color: string;
}

const CATEGORY_META: Record<string, { color: string; label: string }> = {
  "Entity Formation": { color: "#8B5CF6", label: "Entity Formation" },
  "Banking":          { color: "#16A34A", label: "Banking" },
  "Accounting":       { color: "#0EA5E9", label: "Accounting" },
  "Branding":         { color: "#F97316", label: "Branding" },
  "Website":          { color: "#1A2B4A", label: "Website" },
  "Insurance":        { color: "#EF4444", label: "Insurance" },
  "Legal":            { color: "#DC2626", label: "Legal" },
  "Marketing":        { color: "#F59E0B", label: "Marketing" },
  "Productivity":     { color: "#0EA5E9", label: "Productivity" },
  "HR & Payroll":     { color: "#8B5CF6", label: "HR & Payroll" },
  "E-commerce":       { color: "#F97316", label: "E-commerce" },
  "CRM & Sales":      { color: "#16A34A", label: "CRM & Sales" },
  "Automation":       { color: "#1A2B4A", label: "Automation" },
  "Newsletter":       { color: "#F59E0B", label: "Newsletter" },
};

const categories = ["All", "Entity Formation", "Banking", "Accounting", "Branding", "Website", "CRM & Sales", "Marketing", "Newsletter", "Automation", "Insurance", "Legal", "HR & Payroll", "E-commerce", "Productivity"];

const resources: Resource[] = [
  // Entity Formation
  { id: "r1",  name: "ZenBusiness",               category: "Entity Formation", color: "#8B5CF6", description: "Fast, affordable LLC formation with registered agent service included.",       url: "https://www.zenbusiness.com",           affiliateUrl: "https://www.zenbusiness.com" },
  { id: "r2",  name: "LegalZoom",                  category: "Entity Formation", color: "#8B5CF6", description: "Well-known legal formation with attorney access.",                            url: "https://www.legalzoom.com",             affiliateUrl: "https://www.legalzoom.com" },
  { id: "r3",  name: "Northwest Registered Agent", category: "Entity Formation", color: "#8B5CF6", description: "Privacy-focused formation with free registered agent for a year.",            url: "https://www.northwestregisteredagent.com", affiliateUrl: "https://www.northwestregisteredagent.com" },
  { id: "r4",  name: "Incfile",                    category: "Entity Formation", color: "#8B5CF6", description: "LLC formation starting at $0 + state fees — includes registered agent.",     url: "https://www.incfile.com",               affiliateUrl: "https://www.incfile.com" },

  // Banking
  { id: "r5",  name: "Mercury",                    category: "Banking",          color: "#16A34A", description: "Modern business banking designed for startups. No fees, no minimums.",       url: "https://mercury.com",                   affiliateUrl: "https://mercury.com" },
  { id: "r6",  name: "Relay",                      category: "Banking",          color: "#16A34A", description: "Free business banking with multiple checking accounts and auto-save rules.",  url: "https://relayfi.com",                   affiliateUrl: "https://relayfi.com" },
  { id: "r7",  name: "Bluevine",                   category: "Banking",          color: "#16A34A", description: "Business checking with 1.5% interest and no monthly fees.",                  url: "https://www.bluevine.com",              affiliateUrl: "https://www.bluevine.com" },
  { id: "r8",  name: "Novo",                       category: "Banking",          color: "#16A34A", description: "Fee-free business checking built for small businesses and freelancers.",     url: "https://www.novo.co",                   affiliateUrl: "https://www.novo.co" },

  // Accounting
  { id: "r9",  name: "QuickBooks",                 category: "Accounting",       color: "#0EA5E9", description: "Industry-standard small business accounting and bookkeeping.",               url: "https://quickbooks.intuit.com",         affiliateUrl: "https://quickbooks.intuit.com" },
  { id: "r10", name: "Wave",                        category: "Accounting",       color: "#0EA5E9", description: "Completely free accounting, invoicing, and receipt scanning.",                url: "https://www.waveapps.com",              affiliateUrl: "" },
  { id: "r11", name: "FreshBooks",                  category: "Accounting",       color: "#0EA5E9", description: "Easy invoicing, expense tracking, and time tracking.",                      url: "https://www.freshbooks.com",            affiliateUrl: "https://www.freshbooks.com" },
  { id: "r12", name: "Bench",                       category: "Accounting",       color: "#0EA5E9", description: "Dedicated bookkeeper + software. Perfect if you hate doing books.",         url: "https://bench.co",                      affiliateUrl: "https://bench.co" },

  // Branding
  { id: "r13", name: "Looka",                       category: "Branding",         color: "#F97316", description: "AI-powered logo and brand kit. Get a full brand identity in minutes.",      url: "https://looka.com",                     affiliateUrl: "https://looka.com" },
  { id: "r14", name: "Canva",                        category: "Branding",         color: "#F97316", description: "Free design tool for logos, social graphics, and marketing materials.",   url: "https://www.canva.com",                 affiliateUrl: "" },
  { id: "r15", name: "99designs",                    category: "Branding",         color: "#F97316", description: "Professional logo design from vetted freelance designers.",                url: "https://99designs.com",                 affiliateUrl: "https://99designs.com" },
  { id: "r16", name: "Namecheap",                    category: "Branding",         color: "#F97316", description: "Affordable domain registration. Often the cheapest for .com domains.",     url: "https://www.namecheap.com",             affiliateUrl: "https://www.namecheap.com" },

  // Website
  { id: "r17", name: "Squarespace",                  category: "Website",          color: "#1A2B4A", description: "Beautiful drag-and-drop website builder with great templates.",             url: "https://www.squarespace.com",           affiliateUrl: "https://www.squarespace.com" },
  { id: "r18", name: "Carrd",                         category: "Website",          color: "#1A2B4A", description: "Minimal one-page sites. Free tier is genuinely useful for MVPs.",          url: "https://carrd.co",                      affiliateUrl: "https://carrd.co" },
  { id: "r19", name: "Webflow",                       category: "Website",          color: "#1A2B4A", description: "No-code website builder with full design control and CMS.",                url: "https://webflow.com",                   affiliateUrl: "https://webflow.com" },
  { id: "r20", name: "Google Workspace",              category: "Website",          color: "#1A2B4A", description: "Professional email at your domain plus Docs, Sheets, Drive.",             url: "https://workspace.google.com",          affiliateUrl: "https://workspace.google.com" },

  // Insurance
  { id: "r21", name: "Next Insurance",                category: "Insurance",        color: "#EF4444", description: "Fast, online business insurance tailored by industry. Quote in minutes.", url: "https://www.nextinsurance.com",         affiliateUrl: "https://www.nextinsurance.com" },
  { id: "r22", name: "Hiscox",                         category: "Insurance",        color: "#EF4444", description: "Small business insurance specialists with flexible monthly plans.",        url: "https://www.hiscox.com",                affiliateUrl: "https://www.hiscox.com" },
  { id: "r23", name: "Thimble",                         category: "Insurance",        color: "#EF4444", description: "Pay-per-job or monthly business insurance. Great for freelancers.",      url: "https://www.thimble.com",               affiliateUrl: "https://www.thimble.com" },

  // Legal
  { id: "r24", name: "Rocket Lawyer",                  category: "Legal",            color: "#DC2626", description: "Legal documents, contracts, and attorney access for small businesses.",  url: "https://www.rocketlawyer.com",          affiliateUrl: "https://www.rocketlawyer.com" },
  { id: "r25", name: "Termly",                           category: "Legal",            color: "#DC2626", description: "Privacy policy and terms of service generator for websites.",           url: "https://termly.io",                     affiliateUrl: "https://termly.io" },
  { id: "r26", name: "Trademarkia",                      category: "Legal",            color: "#DC2626", description: "Trademark search and filing service for protecting your brand.",        url: "https://www.trademarkia.com",           affiliateUrl: "https://www.trademarkia.com" },

  // Marketing
  { id: "r27", name: "Mailchimp",                        category: "Marketing",        color: "#F59E0B", description: "Email marketing for small businesses. Free up to 500 subscribers.",   url: "https://mailchimp.com",                 affiliateUrl: "https://mailchimp.com" },
  { id: "r28", name: "ConvertKit",                        category: "Marketing",        color: "#F59E0B", description: "Email marketing and automation built for creators and founders.",      url: "https://convertkit.com",                affiliateUrl: "https://convertkit.com" },
  { id: "r29", name: "Buffer",                             category: "Marketing",        color: "#F59E0B", description: "Social media scheduling and analytics. Free plan is generous.",       url: "https://buffer.com",                    affiliateUrl: "https://buffer.com" },
  { id: "r30", name: "Semrush",                            category: "Marketing",        color: "#F59E0B", description: "SEO, keyword research, and competitor analysis for growing traffic.", url: "https://www.semrush.com",               affiliateUrl: "https://www.semrush.com" },

  // Productivity
  { id: "r31", name: "Calendly",                           category: "Productivity",     color: "#0EA5E9", description: "Easy scheduling for client calls and meetings. Free tier available.", url: "https://calendly.com",                  affiliateUrl: "https://calendly.com" },
  { id: "r32", name: "Notion",                              category: "Productivity",     color: "#0EA5E9", description: "All-in-one workspace for notes, projects, wikis, and databases.",     url: "https://www.notion.so",                 affiliateUrl: "https://www.notion.so" },
  { id: "r33", name: "Typeform",                             category: "Productivity",     color: "#0EA5E9", description: "Beautiful interactive surveys and forms that people actually fill out.", url: "https://www.typeform.com",           affiliateUrl: "https://www.typeform.com" },

  // HR & Payroll
  { id: "r34", name: "Gusto",                               category: "HR & Payroll",     color: "#8B5CF6", description: "Full-service payroll and HR for small businesses. Simple and reliable.", url: "https://gusto.com",                  affiliateUrl: "https://gusto.com" },
  { id: "r35", name: "Rippling",                             category: "HR & Payroll",     color: "#8B5CF6", description: "Unified HR, IT, and finance platform for growing teams.",              url: "https://www.rippling.com",              affiliateUrl: "https://www.rippling.com" },

  // CRM & Sales
  { id: "r38", name: "HubSpot",    category: "CRM & Sales", color: "#16A34A", description: "Free CRM with email, pipeline, and contact tracking. Scales with your business.", url: "https://www.hubspot.com", affiliateUrl: "https://www.hubspot.com" },
  { id: "r39", name: "Pipedrive",  category: "CRM & Sales", color: "#16A34A", description: "Sales-focused CRM with visual pipeline. Great for service businesses.", url: "https://www.pipedrive.com", affiliateUrl: "https://www.pipedrive.com" },
  { id: "r40", name: "Close",      category: "CRM & Sales", color: "#16A34A", description: "Built-in calling, SMS, and email CRM designed for small sales teams.", url: "https://close.com", affiliateUrl: "https://close.com" },

  // Newsletter
  { id: "r41", name: "Beehiiv",    category: "Newsletter",   color: "#F59E0B", description: "Newsletter platform built for growth. 60% recurring commissions.", url: "https://www.beehiiv.com", affiliateUrl: "https://www.beehiiv.com" },
  { id: "r42", name: "Substack",   category: "Newsletter",   color: "#F59E0B", description: "Free newsletter platform with built-in paid subscriptions.",           url: "https://substack.com", affiliateUrl: "" },

  // Automation
  { id: "r43", name: "Zapier",     category: "Automation",   color: "#1A2B4A", description: "Connect 6000+ apps without code. Automate repetitive tasks instantly.", url: "https://zapier.com", affiliateUrl: "https://zapier.com" },
  { id: "r44", name: "Make",       category: "Automation",   color: "#1A2B4A", description: "Visual automation builder. More powerful than Zapier for complex flows.", url: "https://www.make.com", affiliateUrl: "https://www.make.com" },

  // E-commerce
  { id: "r36", name: "Shopify",                              category: "E-commerce",       color: "#F97316", description: "The leading e-commerce platform. Easy to set up, powerful at scale.", url: "https://www.shopify.com",               affiliateUrl: "https://www.shopify.com" },
  { id: "r37", name: "Gumroad",                               category: "E-commerce",       color: "#F97316", description: "Sell digital products, memberships, and courses with no setup fee.",  url: "https://gumroad.com",                   affiliateUrl: "" },
];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = resources.filter((r) => {
    const matchCat = selectedCategory === "All" || r.category === selectedCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || r.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const affiliateCount = filtered.filter(r => r.affiliateUrl).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* ── Header ─────────────────────────────────────────── */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <div style={{ height: 1, width: 32, background: "var(--orange)" }} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
            {resources.length} tools curated
          </span>
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "3rem", letterSpacing: "0.02em", color: "var(--navy)", lineHeight: 1 }}>
          RESOURCE LIBRARY
        </h1>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-muted)", fontSize: "0.9rem", marginTop: 6 }}>
          The best tools for every stage of launching. We only recommend what works.
        </p>
      </div>

      {/* ── Search + filter row ────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Search */}
        <div style={{ position: "relative" }}>
          <Search style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, color: "var(--ink-muted)" }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tools..."
            style={{ paddingLeft: 36 }}
          />
        </div>

        {/* Category pills */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            const meta = CATEGORY_META[cat];
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  fontFamily: "var(--font-heading)", fontSize: "0.7rem", fontWeight: 700,
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  padding: "5px 12px",
                  border: `2px solid ${isActive ? (meta?.color || "var(--navy)") : "var(--border-light)"}`,
                  background: isActive ? (meta?.color || "var(--navy)") : "transparent",
                  color: isActive ? "white" : "var(--ink-muted)",
                  cursor: "pointer", transition: "all 0.12s",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Results header ────────────────────────────────── */}
      {filtered.length > 0 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 600, color: "var(--ink-muted)" }}>
            {filtered.length} tool{filtered.length !== 1 ? "s" : ""} shown
          </span>
          {affiliateCount > 0 && (
            <span style={{
              fontFamily: "var(--font-display)", fontSize: "0.58rem", letterSpacing: "0.12em",
              textTransform: "uppercase", color: "var(--orange)", border: "1.5px solid var(--orange)", padding: "2px 8px",
            }}>
              {affiliateCount} partner tool{affiliateCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      )}

      {/* ── Grid ──────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <p style={{ fontFamily: "var(--font-heading)", color: "var(--ink-muted)" }}>
            No tools found. Try a different search or category.
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {filtered.map((resource) => {
            const color = resource.color || "var(--navy)";
            const hasAffiliate = !!resource.affiliateUrl;
            return (
              <a
                key={resource.id}
                href={resource.affiliateUrl || resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card"
                style={{ textDecoration: "none", display: "flex", flexDirection: "column", borderBottom: `3px solid ${color}` }}
              >
                {/* Top row */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "0.92rem", fontWeight: 700, color: "var(--navy)", lineHeight: 1.2 }}>
                    {resource.name}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                    {hasAffiliate && <span className="affiliate-badge">Partner</span>}
                    <ExternalLink style={{ width: 12, height: 12, color: "var(--ink-muted)", opacity: 0.5 }} />
                  </div>
                </div>

                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--ink-muted)", lineHeight: 1.5, flex: 1, marginBottom: 10 }}>
                  {resource.description}
                </p>

                {/* Category + cta */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{
                    fontFamily: "var(--font-display)", fontSize: "0.55rem", letterSpacing: "0.12em",
                    textTransform: "uppercase", padding: "2px 6px",
                    border: `1.5px solid ${color}`, color,
                  }}>
                    {resource.category}
                  </span>
                  <ArrowRight style={{ width: 12, height: 12, color, opacity: 0.6 }} />
                </div>
              </a>
            );
          })}
        </div>
      )}

      {/* ── Affiliate disclosure ──────────────────────────── */}
      <div style={{ padding: "14px 18px", background: "rgba(249,115,22,0.04)", border: "1px solid rgba(249,115,22,0.15)" }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--ink-muted)", lineHeight: 1.5 }}>
          <strong style={{ color: "var(--ink-mid)" }}>Affiliate disclosure:</strong> Some tools on this page use affiliate links. If you sign up through our link, we may earn a commission at no extra cost to you. We only recommend tools we genuinely believe in.
        </p>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { getAllGuides, getTailoredCategoryGuides } from "@/lib/data/guides/index";
import type { Guide } from "@/lib/data/guides/types";
import GuidesClient from "./_client";

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



type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function GuidesIndexPage({ searchParams }: Props) {
  const industryParam = typeof searchParams.industry === 'string' ? searchParams.industry : undefined;
  
  // SEO Bots will index /guides?industry=food-truck and we pull exactly those customized files on the server
  let guides = [];
  if (industryParam && industryParam !== "all") {
    guides = await getTailoredCategoryGuides(industryParam);
    if (!guides || guides.length === 0) {
      guides = await getAllGuides();
    }
  } else {
    guides = await getAllGuides();
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

      {/* Render Client Side Filters & Guides Grid */}
      <GuidesClient guides={guides} initialIndustry={industryParam || "all"} />
    </div>
  );
}

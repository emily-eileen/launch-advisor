import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getGuideBySlug, getAllGuides } from "@/lib/data/guides/index";
import { getStepById } from "@/lib/data/checklist";
import type { Guide } from "@/lib/data/guides/types";
import { getAffiliateUrl } from "@/lib/config/affiliates";

const PHASE_COLORS: Record<number, string> = {
  1: "#F97316", 2: "#8B5CF6", 3: "#16A34A", 4: "#0EA5E9",
  5: "#EF4444", 6: "#F59E0B", 7: "#EC4899", 8: "#06B6D4",
  9: "#A855F7", 10: "#14B8A6",
};

export async function generateStaticParams() {
  const genericGuides = await getAllGuides();
  let tailoredGuides: Guide[] = [];
  try {
    const tailoredMod = await import('@/lib/data/guides/index');
    tailoredGuides = await tailoredMod.getAllTailoredGuides();
  } catch (e) {
    // If tailored guides don't exist yet
  }
  
  const allCurrentSlugs = [...genericGuides, ...tailoredGuides];
  
  return allCurrentSlugs.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) return {};
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    keywords: [guide.primaryKeyword, ...guide.secondaryKeywords].join(", "),
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: `https://launchadvisor.co/guides/${guide.slug}`,
      siteName: "LaunchAdvisor",
      type: "article",
    },
    alternates: { canonical: `https://launchadvisor.co/guides/${guide.slug}` },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) notFound();

  const color = PHASE_COLORS[guide.phase] ?? "#F97316";

  // Fetch related guides
  const allGuides = await getAllGuides();
  const related = guide.relatedSlugs
    .map((s) => allGuides.find((g) => g.slug === s))
    .filter(Boolean) as Guide[];

  // Build JSON-LD schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": guide.title,
    "description": guide.metaDescription,
    "datePublished": guide.publishedAt,
    "dateModified": guide.publishedAt,
    "author": { "@type": "Organization", "name": "LaunchAdvisor", "url": "https://launchadvisor.co" },
    "publisher": { "@type": "Organization", "name": "LaunchAdvisor", "url": "https://launchadvisor.co" },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://launchadvisor.co/guides/${guide.slug}` },
    "keywords": [guide.primaryKeyword, ...guide.secondaryKeywords].join(", "),
  };

  const faqSchema = guide.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": guide.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
    })),
  } : null;

  // Lookup step titles for checklist links
  const checklistStepDetails = guide.checklistStepIds
    .map((id) => ({ id, step: getStepById(id) }))
    .filter((x) => x.step !== undefined) as { id: string; step: NonNullable<ReturnType<typeof getStepById>> }[];

  return (
    <article style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px 80px" }}>

      {/* JSON-LD Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      {/* Breadcrumb */}
      <nav style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 32, flexWrap: "wrap" }}>
        <Link href="/guides" style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--ink-muted)", textDecoration: "none", textTransform: "uppercase" }}>
          Guides
        </Link>
        <span style={{ color: "var(--border)", fontSize: "0.7rem" }}>→</span>
        <Link href={`/guides?phase=${guide.phase}`} style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", letterSpacing: "0.2em", color, textDecoration: "none", textTransform: "uppercase" }}>
          {guide.phaseName}
        </Link>
      </nav>

      {/* Phase badge */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16, padding: "5px 12px", background: `${color}18`, border: `1px solid ${color}44` }}>
        <div style={{ width: 6, height: 6, background: color, borderRadius: "50%" }} />
        <span style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", letterSpacing: "0.2em", color, textTransform: "uppercase" }}>
          Phase {guide.phase}: {guide.phaseName}
        </span>
      </div>

      {/* Title */}
      <h1 style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(2rem, 5vw, 3.2rem)",
        letterSpacing: "0.02em",
        color: "var(--navy)",
        lineHeight: 1.05,
        marginBottom: 16,
      }}>
        {guide.title}
      </h1>

      {/* Meta row */}
      <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 32, flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--ink-muted)" }}>
          {guide.readTime} min read
        </span>
        <span style={{ color: "var(--border-light)", fontSize: "0.7rem" }}>·</span>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--ink-muted)" }}>
          Updated {new Date(guide.publishedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </span>
      </div>

      {/* Intro */}
      <div style={{ borderLeft: `3px solid ${color}`, paddingLeft: 20, marginBottom: 40 }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "var(--ink)", lineHeight: 1.7 }}>
          {guide.intro}
        </p>
      </div>

      {/* CTA — checklist */}
      <div style={{ background: "var(--navy)", border: `2px solid ${color}`, padding: "20px 24px", marginBottom: 48, display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "1rem", letterSpacing: "0.06em", color: "white", marginBottom: 4 }}>
            READY TO TAKE ACTION?
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(255,255,255,0.5)" }}>
            Use the free LaunchAdvisor checklist to track every step in this guide.
          </p>
        </div>
        <Link href="/checklist" style={{
          fontFamily: "var(--font-heading)", fontSize: "0.78rem", fontWeight: 700,
          letterSpacing: "0.08em", textTransform: "uppercase", color: "white",
          background: color, padding: "11px 20px", textDecoration: "none", whiteSpace: "nowrap",
        }}>
          Open Free Checklist →
        </Link>
      </div>

      {/* Content sections */}
      {guide.sections.map((section, i) => (
        <section key={i} style={{ marginBottom: 40 }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            letterSpacing: "0.04em",
            color: "var(--navy)",
            marginBottom: 16,
            paddingBottom: 8,
            borderBottom: `2px solid var(--border-light)`,
          }}>
            {section.heading}
          </h2>
          {section.body.split("\n\n").map((para, j) => (
            <p key={j} style={{ fontFamily: "var(--font-body)", fontSize: "0.97rem", color: "var(--ink)", lineHeight: 1.75, marginBottom: 16 }}>
              {para}
            </p>
          ))}
        </section>
      ))}

      {/* Affiliate resources */}
      {guide.affiliates.length > 0 && (
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", letterSpacing: "0.04em", color: "var(--navy)", marginBottom: 20, paddingBottom: 8, borderBottom: "2px solid var(--border-light)" }}>
            RECOMMENDED TOOLS
          </h2>
          <div style={{ display: "grid", gap: 12 }}>
            {guide.affiliates.map((aff, i) => (
              <a key={i} href={getAffiliateUrl(aff.name, aff.url)} target="_blank" rel="noopener noreferrer sponsored"
                style={{
                  display: "flex", alignItems: "center", gap: 16, padding: "16px 20px",
                  border: "2px solid var(--border)", background: "var(--surface)",
                  textDecoration: "none", transition: "border-color 0.15s",
                }}
                className="guide-resource-link"
              >
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.9rem", fontWeight: 700, color: "var(--navy)", marginBottom: 2 }}>
                    {aff.name}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--ink-muted)", lineHeight: 1.4 }}>
                    {aff.description}
                  </p>
                </div>
                {aff.badge && (
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "0.65rem", letterSpacing: "0.1em", color: "white", background: color, padding: "4px 10px", whiteSpace: "nowrap", flexShrink: 0 }}>
                    {aff.badge}
                  </span>
                )}
              </a>
            ))}
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "var(--ink-muted)", marginTop: 12, fontStyle: "italic" }}>
            Some links above are affiliate links. We may earn a commission if you sign up — at no extra cost to you.
          </p>
        </section>
      )}

      {/* FAQs */}
      {guide.faqs.length > 0 && (
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", letterSpacing: "0.04em", color: "var(--navy)", marginBottom: 20, paddingBottom: 8, borderBottom: "2px solid var(--border-light)" }}>
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <div style={{ display: "grid", gap: 0 }}>
            {guide.faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: "1px solid var(--border-light)", padding: "20px 0" }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "0.97rem", fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>
                  {faq.question}
                </h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--ink)", lineHeight: 1.7 }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Checklist step links */}
      {checklistStepDetails.length > 0 && (
        <div style={{ background: `${color}10`, border: `2px solid ${color}33`, padding: "24px", marginBottom: 48 }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "0.7rem", letterSpacing: "0.2em", color, marginBottom: 12, textTransform: "uppercase" }}>
            Apply This in Your Checklist
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {checklistStepDetails.map(({ id, step }) => (
              <Link key={id} href={`/checklist/${id}`}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
                  fontFamily: "var(--font-heading)", fontSize: "0.82rem", fontWeight: 600,
                  color: "var(--navy)", border: `1px solid ${color}44`, padding: "10px 16px",
                  textDecoration: "none", background: "var(--surface)", transition: "border-color 0.15s",
                }}>
                <span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", color, letterSpacing: "0.12em", marginRight: 8 }}>
                    {`Phase ${step.phase}.${step.order}`}
                  </span>
                  {step.title}
                </span>
                <span style={{ color, opacity: 0.7, flexShrink: 0 }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related guides */}
      {related.length > 0 && (
        <section>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", letterSpacing: "0.06em", color: "var(--navy)", marginBottom: 16, textTransform: "uppercase" }}>
            Related Guides
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
            {related.map((r) => {
              const rc = PHASE_COLORS[r.phase] ?? "#F97316";
              return (
                <Link key={r.slug} href={`/guides/${r.slug}`}
                  style={{ padding: "16px", border: "2px solid var(--border)", textDecoration: "none", background: "var(--surface)", display: "block" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "0.55rem", letterSpacing: "0.2em", color: rc, textTransform: "uppercase" }}>{r.phaseName}</span>
                  <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.82rem", fontWeight: 700, color: "var(--navy)", marginTop: 4, lineHeight: 1.3 }}>{r.title}</p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

    </article>
  );
}

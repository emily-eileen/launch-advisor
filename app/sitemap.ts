import type { MetadataRoute } from "next";
import { getAllGuides } from "@/lib/data/guides/index";
import { checklistSteps } from "@/lib/data/checklist";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://launchadvisor.co";
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/checklist`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/guides`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/quiz`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/resources`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  const checklistPages: MetadataRoute.Sitemap = checklistSteps.map((step) => ({
    url: `${base}/checklist/${step.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const guides = await getAllGuides();
  const guidePages: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${base}/guides/${g.slug}`,
    lastModified: new Date(g.publishedAt).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...checklistPages, ...guidePages];
}

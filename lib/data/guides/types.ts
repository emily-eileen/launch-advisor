export interface GuideAffiliate {
  name: string;
  url: string; // real URL or "#affiliate-[slug]" stub
  description: string;
  badge?: string; // "$250 bonus", "30% recurring", "Free trial"
  affiliate?: boolean;
}

export interface GuideSection {
  heading: string;
  body: string; // plain text / markdown-lite (paragraphs separated by \n\n)
}

export interface GuideFaq {
  question: string;
  answer: string;
}

export interface Guide {
  slug: string;
  phase: number;
  phaseName: string;
  title: string;
  metaTitle: string; // ≤60 chars for Google
  metaDescription: string; // ≤155 chars
  primaryKeyword: string;
  secondaryKeywords: string[];
  readTime: number; // minutes
  intro: string; // 2-3 sentences hook
  sections: GuideSection[];
  checklistStepIds: string[]; // links back into the app checklist
  affiliates: GuideAffiliate[];
  faqs: GuideFaq[];
  relatedSlugs: string[];
  publishedAt: string; // ISO date string
  // Optional: filter this guide to specific business types from the quiz
  // Values match BUSINESS_CATEGORIES values in app/quiz/page.tsx
  // Omit to show this guide to all business types (universal)
  businessTypes?: string[];
}

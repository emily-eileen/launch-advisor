"use client";

import { useState } from "react";
import { ExternalLink, Search } from "lucide-react";

interface Resource {
  id: string;
  name: string;
  description: string;
  url: string;
  affiliateUrl?: string;
  category: string;
}

const categories = [
  "All",
  "Entity Formation",
  "Banking",
  "Accounting",
  "Branding",
  "Website",
  "Insurance",
  "Legal",
  "Marketing",
  "Productivity",
];

const resources: Resource[] = [
  // Entity Formation
  { id: "r1", name: "ZenBusiness", description: "Fast, affordable LLC formation with registered agent service included.", url: "https://www.zenbusiness.com", affiliateUrl: "https://www.zenbusiness.com/?ref=launchadvisor", category: "Entity Formation" },
  { id: "r2", name: "LegalZoom", description: "Well-known legal formation service with attorney access.", url: "https://www.legalzoom.com", affiliateUrl: "https://www.legalzoom.com/?ref=launchadvisor", category: "Entity Formation" },
  { id: "r3", name: "Northwest Registered Agent", description: "Privacy-focused formation with free registered agent for a year.", url: "https://www.northwestregisteredagent.com", affiliateUrl: "https://www.northwestregisteredagent.com/?ref=launchadvisor", category: "Entity Formation" },

  // Banking
  { id: "r4", name: "Mercury", description: "Modern business banking designed for startups and small businesses.", url: "https://mercury.com", affiliateUrl: "https://mercury.com/?ref=launchadvisor", category: "Banking" },
  { id: "r5", name: "Relay", description: "Free business banking with multiple checking accounts and smart features.", url: "https://relayfi.com", affiliateUrl: "https://relayfi.com/?ref=launchadvisor", category: "Banking" },
  { id: "r6", name: "Bluevine", description: "Business checking with interest on your balance.", url: "https://www.bluevine.com", affiliateUrl: "https://www.bluevine.com/?ref=launchadvisor", category: "Banking" },

  // Accounting
  { id: "r7", name: "QuickBooks", description: "Industry-standard small business accounting and bookkeeping.", url: "https://quickbooks.intuit.com", affiliateUrl: "https://quickbooks.intuit.com/?ref=launchadvisor", category: "Accounting" },
  { id: "r8", name: "Wave", description: "Completely free accounting software for small businesses.", url: "https://www.waveapps.com", category: "Accounting" },
  { id: "r9", name: "FreshBooks", description: "Easy invoicing, expense tracking, and time tracking.", url: "https://www.freshbooks.com", affiliateUrl: "https://www.freshbooks.com/?ref=launchadvisor", category: "Accounting" },

  // Branding
  { id: "r10", name: "Canva", description: "Free design tool for logos, social media, and marketing materials.", url: "https://www.canva.com", category: "Branding" },
  { id: "r11", name: "Looka", description: "AI-powered logo and brand kit generator.", url: "https://looka.com", affiliateUrl: "https://looka.com/?ref=launchadvisor", category: "Branding" },
  { id: "r12", name: "Namecheap", description: "Affordable domain name registration and hosting.", url: "https://www.namecheap.com", affiliateUrl: "https://www.namecheap.com/?ref=launchadvisor", category: "Branding" },

  // Website
  { id: "r13", name: "Squarespace", description: "Beautiful, easy-to-use website builder with templates.", url: "https://www.squarespace.com", affiliateUrl: "https://www.squarespace.com/?ref=launchadvisor", category: "Website" },
  { id: "r14", name: "Carrd", description: "Simple, free one-page websites perfect for launching fast.", url: "https://carrd.co", affiliateUrl: "https://carrd.co/?ref=launchadvisor", category: "Website" },
  { id: "r15", name: "WordPress.com", description: "Flexible website platform with thousands of themes and plugins.", url: "https://wordpress.com", category: "Website" },

  // Insurance
  { id: "r16", name: "Next Insurance", description: "Fast, online business insurance tailored to your industry.", url: "https://www.nextinsurance.com", affiliateUrl: "https://www.nextinsurance.com/?ref=launchadvisor", category: "Insurance" },
  { id: "r17", name: "Hiscox", description: "Small business insurance specialists with flexible policies.", url: "https://www.hiscox.com", affiliateUrl: "https://www.hiscox.com/?ref=launchadvisor", category: "Insurance" },

  // Legal
  { id: "r18", name: "Rocket Lawyer", description: "Legal documents, contracts, and access to attorneys.", url: "https://www.rocketlawyer.com", affiliateUrl: "https://www.rocketlawyer.com/?ref=launchadvisor", category: "Legal" },
  { id: "r19", name: "Termly", description: "Privacy policy and terms of service generator for websites.", url: "https://termly.io", affiliateUrl: "https://termly.io/?ref=launchadvisor", category: "Legal" },

  // Marketing
  { id: "r20", name: "Mailchimp", description: "Email marketing platform for building your audience.", url: "https://mailchimp.com", affiliateUrl: "https://mailchimp.com/?ref=launchadvisor", category: "Marketing" },
  { id: "r21", name: "ConvertKit", description: "Email marketing built for creators and small businesses.", url: "https://convertkit.com", affiliateUrl: "https://convertkit.com/?ref=launchadvisor", category: "Marketing" },

  // Productivity
  { id: "r22", name: "Calendly", description: "Easy scheduling for client calls and meetings.", url: "https://calendly.com", affiliateUrl: "https://calendly.com/?ref=launchadvisor", category: "Productivity" },
  { id: "r23", name: "Google Workspace", description: "Professional email, docs, and productivity tools.", url: "https://workspace.google.com", affiliateUrl: "https://workspace.google.com/?ref=launchadvisor", category: "Productivity" },
  { id: "r24", name: "Tally", description: "Free, beautiful form builder for surveys and feedback.", url: "https://tally.so", category: "Productivity" },
];

const categoryColors: Record<string, string> = {
  "Entity Formation": "bg-blue-50 text-blue-700",
  Banking: "bg-green-50 text-green-700",
  Accounting: "bg-purple-50 text-purple-700",
  Branding: "bg-pink-50 text-pink-700",
  Website: "bg-indigo-50 text-indigo-700",
  Insurance: "bg-amber-50 text-amber-700",
  Legal: "bg-red-50 text-red-700",
  Marketing: "bg-cyan-50 text-cyan-700",
  Productivity: "bg-emerald-50 text-emerald-700",
};

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = resources.filter((r) => {
    const matchesCategory = selectedCategory === "All" || r.category === selectedCategory;
    const matchesSearch =
      search === "" ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  function handleResourceClick(resource: Resource) {
    console.log("Resource click tracked:", {
      resourceId: resource.id,
      name: resource.name,
      category: resource.category,
      hasAffiliate: !!resource.affiliateUrl,
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-navy">
          Resource Library
        </h1>
        <p className="text-muted mt-1">
          Curated tools and services to help you launch. We only recommend tools we trust.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-light" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search resources..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-colors"
        />
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 lg:mx-0 lg:px-0 lg:flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? "bg-orange text-white"
                : "bg-white border border-border text-muted hover:text-foreground hover:border-foreground/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((resource) => (
          <a
            key={resource.id}
            href={resource.affiliateUrl || resource.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleResourceClick(resource)}
            className="bg-white rounded-xl border border-border-light p-5 hover:border-orange/30 hover:shadow-sm transition-all group flex flex-col"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-base font-semibold text-foreground group-hover:text-orange transition-colors">
                {resource.name}
              </h3>
              <ExternalLink className="w-4 h-4 text-muted-light group-hover:text-orange transition-colors flex-shrink-0 mt-0.5" />
            </div>
            <p className="text-sm text-muted flex-1">{resource.description}</p>
            <div className="mt-3">
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  categoryColors[resource.category] || "bg-gray-50 text-gray-700"
                }`}
              >
                {resource.category}
              </span>
            </div>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted">No resources found. Try a different search or category.</p>
        </div>
      )}
    </div>
  );
}

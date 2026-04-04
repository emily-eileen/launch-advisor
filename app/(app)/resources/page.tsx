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
  badge?: string;
}

const CATEGORY_META: Record<string, { color: string }> = {
  "Entity Formation": { color: "#8B5CF6" },
  "Banking":           { color: "#16A34A" },
  "Business Credit":   { color: "#0EA5E9" },
  "Accounting":        { color: "#0EA5E9" },
  "Payments":          { color: "#16A34A" },
  "Trademark":         { color: "#DC2626" },
  "Legal":             { color: "#DC2626" },
  "Insurance":         { color: "#EF4444" },
  "Branding":          { color: "#F97316" },
  "Website":           { color: "#1A2B4A" },
  "Marketing":         { color: "#F59E0B" },
  "Newsletter":        { color: "#F59E0B" },
  "SEO & Growth":      { color: "#8B5CF6" },
  "CRM & Sales":       { color: "#16A34A" },
  "Automation":        { color: "#1A2B4A" },
  "HR & Payroll":      { color: "#8B5CF6" },
  "E-commerce":        { color: "#F97316" },
  "Productivity":      { color: "#0EA5E9" },
};

const categories = [
  "All",
  "Entity Formation", "Banking", "Business Credit", "Accounting", "Payments",
  "Trademark", "Legal", "Insurance",
  "Branding", "Website",
  "Marketing", "Newsletter", "SEO & Growth",
  "CRM & Sales", "Automation",
  "HR & Payroll", "E-commerce", "Productivity",
];

const resources: Resource[] = [
  // ── Entity Formation ──────────────────────────────────
  { id: "ef1",  name: "ZenBusiness",                 category: "Entity Formation", color: "#8B5CF6", badge: "Most Popular",    description: "Fast, affordable LLC formation with registered agent service included.",          url: "https://www.zenbusiness.com",              affiliateUrl: "https://www.zenbusiness.com" },
  { id: "ef2",  name: "LegalZoom",                   category: "Entity Formation", color: "#8B5CF6",                            description: "Well-known legal formation with attorney access.",                               url: "https://www.legalzoom.com",                affiliateUrl: "https://www.legalzoom.com" },
  { id: "ef3",  name: "Northwest Registered Agent",  category: "Entity Formation", color: "#8B5CF6",                            description: "Privacy-focused formation with free registered agent for a year.",              url: "https://www.northwestregisteredagent.com", affiliateUrl: "https://www.northwestregisteredagent.com" },
  { id: "ef4",  name: "Northeast Registered Agents", category: "Entity Formation", color: "#8B5CF6", badge: "Best Privacy",     description: "Registered agent + formation service with strong privacy protections.",          url: "https://www.northeastregisteredagent.com", affiliateUrl: "https://www.northeastregisteredagent.com" },
  { id: "ef5",  name: "Bizee",                        category: "Entity Formation", color: "#8B5CF6", badge: "Free to Start",    description: "LLC formation starting at $0 + state fees — registered agent included year 1.", url: "https://www.bizee.com",                    affiliateUrl: "https://www.bizee.com" },
  { id: "ef6",  name: "Stripe Atlas",                 category: "Entity Formation", color: "#8B5CF6", badge: "Best for Startups", description: "Delaware C-Corp + banking + $5K AWS credits + $500 Stripe credits.",          url: "https://stripe.com/atlas",                 affiliateUrl: "https://stripe.com/atlas" },
  { id: "ef7",  name: "Harbor Compliance",            category: "Entity Formation", color: "#8B5CF6",                            description: "Compliance experts handle licenses, permits, and registered agent service.",    url: "https://www.harborcompliance.com",         affiliateUrl: "https://www.harborcompliance.com" },

  // ── Banking ───────────────────────────────────────────
  { id: "bk1",  name: "Mercury",           category: "Banking", color: "#16A34A", badge: "Best for Startups", description: "Modern business banking — no fees, no minimums, excellent UI.",              url: "https://mercury.com",            affiliateUrl: "https://mercury.com" },
  { id: "bk2",  name: "Relay",             category: "Banking", color: "#16A34A",                              description: "Free business banking with smart spending envelopes and auto-save rules.",    url: "https://relayfi.com",            affiliateUrl: "https://relayfi.com" },
  { id: "bk3",  name: "Bluevine",          category: "Banking", color: "#16A34A",                              description: "Business checking with 1.5% APY on balances — great for cash-heavy businesses.", url: "https://www.bluevine.com",       affiliateUrl: "https://www.bluevine.com" },
  { id: "bk4",  name: "Novo",              category: "Banking", color: "#16A34A", badge: "Best for Freelancers", description: "Fee-free checking built for freelancers and small business owners.",        url: "https://www.novo.co",            affiliateUrl: "https://www.novo.co" },
  { id: "bk5",  name: "Lili",              category: "Banking", color: "#16A34A",                              description: "Banking + automatic tax buckets built for solopreneurs.",                    url: "https://www.lili.co",            affiliateUrl: "https://www.lili.co" },
  { id: "bk6",  name: "Grasshopper Bank",  category: "Banking", color: "#16A34A",                              description: "High-yield business checking with 2% APY on all balances.",                  url: "https://www.grasshopper.bank",   affiliateUrl: "https://www.grasshopper.bank" },
  { id: "bk7",  name: "NorthOne",          category: "Banking", color: "#16A34A",                              description: "Business banking with sub-accounts for separating funds by purpose.",        url: "https://www.northone.com",       affiliateUrl: "https://www.northone.com" },
  { id: "bk8",  name: "Found",             category: "Banking", color: "#16A34A",                              description: "Banking + tax estimated payments for self-employed founders.",               url: "https://www.found.com",          affiliateUrl: "https://www.found.com" },

  // ── Business Credit ───────────────────────────────────
  { id: "bc1",  name: "Dun & Bradstreet (DUNS)", category: "Business Credit", color: "#0EA5E9", badge: "Start Here · Free", description: "Get your free D-U-N-S Number — required to build business credit and work with large companies.", url: "https://www.dnb.com/duns-number/get-a-duns-number.html", affiliateUrl: "" },
  { id: "bc2",  name: "Brex",              category: "Business Credit", color: "#0EA5E9", badge: "Best for Startups", description: "Corporate card with no personal guarantee — builds business credit from day one.", url: "https://www.brex.com",          affiliateUrl: "https://www.brex.com" },
  { id: "bc3",  name: "Ramp",              category: "Business Credit", color: "#0EA5E9",                              description: "Corporate card + expense management. No personal guarantee. Cash back on everything.", url: "https://ramp.com",             affiliateUrl: "https://ramp.com" },
  { id: "bc4",  name: "Divvy (BILL)",      category: "Business Credit", color: "#0EA5E9",                              description: "Free expense management + corporate cards with real-time spend limits.",    url: "https://www.bill.com/product/divvy", affiliateUrl: "https://www.bill.com/product/divvy" },
  { id: "bc5",  name: "Nav",               category: "Business Credit", color: "#0EA5E9", badge: "Best Monitoring",   description: "Monitor your business credit scores across all 3 bureaus and get matched to financing.", url: "https://www.nav.com",          affiliateUrl: "https://www.nav.com" },
  { id: "bc6",  name: "Quill",             category: "Business Credit", color: "#0EA5E9",                              description: "Office supplies vendor that reports payments to Dun & Bradstreet — great for building credit.", url: "https://www.quill.com",        affiliateUrl: "https://www.quill.com" },
  { id: "bc7",  name: "ULINE",             category: "Business Credit", color: "#0EA5E9",                              description: "Shipping and packaging vendor — net-30 account reports to business credit bureaus.", url: "https://www.uline.com",         affiliateUrl: "" },
  { id: "bc8",  name: "Grainger",          category: "Business Credit", color: "#0EA5E9",                              description: "Industrial supply net-30 vendor account that reports to DNB and Experian Business.", url: "https://www.grainger.com",      affiliateUrl: "" },
  { id: "bc9",  name: "Fundbox",           category: "Business Credit", color: "#0EA5E9",                              description: "Business line of credit up to $150K — reports to business credit bureaus.",  url: "https://fundbox.com",          affiliateUrl: "https://fundbox.com" },
  { id: "bc10", name: "American Express Business Blueprint", category: "Business Credit", color: "#0EA5E9", description: "Flexible line of credit for small businesses with no annual fee.", url: "https://www.americanexpress.com/en-us/business/blueprint/", affiliateUrl: "https://www.americanexpress.com/en-us/business/blueprint/" },

  // ── Accounting ────────────────────────────────────────
  { id: "ac1",  name: "QuickBooks",   category: "Accounting", color: "#0EA5E9", badge: "Most Popular", description: "Industry-standard small business accounting and bookkeeping.",               url: "https://quickbooks.intuit.com",  affiliateUrl: "https://quickbooks.intuit.com" },
  { id: "ac2",  name: "Wave",          category: "Accounting", color: "#0EA5E9", badge: "Free",         description: "Completely free accounting, invoicing, and receipt scanning.",               url: "https://www.waveapps.com",       affiliateUrl: "" },
  { id: "ac3",  name: "FreshBooks",    category: "Accounting", color: "#0EA5E9",                        description: "Easy invoicing, expense tracking, and time tracking for service businesses.", url: "https://www.freshbooks.com",    affiliateUrl: "https://www.freshbooks.com" },
  { id: "ac4",  name: "Bench",         category: "Accounting", color: "#0EA5E9", badge: "Best Full-Service", description: "Dedicated bookkeeper + software. Hands-off books and year-end tax filing.", url: "https://bench.co",            affiliateUrl: "https://bench.co" },
  { id: "ac5",  name: "Keeper",        category: "Accounting", color: "#0EA5E9",                        description: "AI finds your write-offs automatically — built for freelancers and solopreneurs.", url: "https://www.keepertax.com",  affiliateUrl: "https://www.keepertax.com" },
  { id: "ac6",  name: "1-800Accountant", category: "Accounting", color: "#0EA5E9",                      description: "CPA-backed small business tax preparation and bookkeeping service.",         url: "https://1800accountant.com",    affiliateUrl: "https://1800accountant.com" },

  // ── Payments ──────────────────────────────────────────
  { id: "py1",  name: "Stripe",        category: "Payments", color: "#16A34A", badge: "Best for Online", description: "The leading online payment processor. 2.9% + 30¢ per transaction.",          url: "https://stripe.com",            affiliateUrl: "" },
  { id: "py2",  name: "Square",        category: "Payments", color: "#16A34A", badge: "Best for In-Person", description: "In-person and online payments with a free card reader to start.",         url: "https://squareup.com",          affiliateUrl: "https://squareup.com" },
  { id: "py3",  name: "Lemon Squeezy", category: "Payments", color: "#16A34A",                           description: "Sell digital products with built-in tax compliance. No monthly fees.",      url: "https://www.lemonsqueezy.com",  affiliateUrl: "https://www.lemonsqueezy.com" },
  { id: "py4",  name: "PayPal Business", category: "Payments", color: "#16A34A",                         description: "Widely trusted — your customers likely already have an account.",            url: "https://www.paypal.com/us/business", affiliateUrl: "" },
  { id: "py5",  name: "Paddle",        category: "Payments", color: "#16A34A",                           description: "Merchant of record for SaaS — handles global VAT and tax compliance.",      url: "https://www.paddle.com",        affiliateUrl: "https://www.paddle.com" },

  // ── Trademark ─────────────────────────────────────────
  { id: "tm1",  name: "TMKings",           category: "Trademark", color: "#DC2626", badge: "Best Value",   description: "Trademark filing with attorney review, monitoring, and office action responses.", url: "https://www.tmkings.com",          affiliateUrl: "https://www.tmkings.com" },
  { id: "tm2",  name: "Trademarkia",       category: "Trademark", color: "#DC2626", badge: "Most Popular", description: "Search and file trademarks with full attorney support and monitoring.",        url: "https://www.trademarkia.com",      affiliateUrl: "https://www.trademarkia.com" },
  { id: "tm3",  name: "Trademark Engine",  category: "Trademark", color: "#DC2626",                        description: "Affordable trademark filing starting at $99 + USPTO fees.",                   url: "https://www.trademarkengine.com",  affiliateUrl: "https://www.trademarkengine.com" },
  { id: "tm4",  name: "USPTO Trademark Search", category: "Trademark", color: "#DC2626", badge: "Free",    description: "Search existing trademarks before you file — always start here.",               url: "https://www.uspto.gov/trademarks/search", affiliateUrl: "" },
  { id: "tm5",  name: "LegalZoom Trademark", category: "Trademark", color: "#DC2626",                      description: "Full-service trademark registration with attorney consultation included.",      url: "https://www.legalzoom.com/trademarks", affiliateUrl: "https://www.legalzoom.com" },

  // ── Legal ─────────────────────────────────────────────
  { id: "lg1",  name: "Rocket Lawyer",  category: "Legal", color: "#DC2626", badge: "Most Popular", description: "Legal documents, contracts, and access to attorneys.",                         url: "https://www.rocketlawyer.com",  affiliateUrl: "https://www.rocketlawyer.com" },
  { id: "lg2",  name: "Bonsai",         category: "Legal", color: "#DC2626",                        description: "Contracts, proposals, invoices, and time tracking in one platform.",            url: "https://www.hellobonsai.com",   affiliateUrl: "https://www.hellobonsai.com" },
  { id: "lg3",  name: "HoneyBook",      category: "Legal", color: "#DC2626",                        description: "Client management with contracts, proposals, invoices, and payments.",          url: "https://www.honeybook.com",     affiliateUrl: "https://www.honeybook.com" },
  { id: "lg4",  name: "Termly",         category: "Legal", color: "#DC2626",                        description: "Privacy policy and terms of service generator with auto-update monitoring.",    url: "https://termly.io",            affiliateUrl: "https://termly.io" },
  { id: "lg5",  name: "iubenda",        category: "Legal", color: "#DC2626",                        description: "GDPR/CCPA compliant privacy policies with ongoing legal monitoring.",           url: "https://www.iubenda.com",      affiliateUrl: "https://www.iubenda.com" },
  { id: "lg6",  name: "LawDepot",       category: "Legal", color: "#DC2626",                        description: "Free legal document templates for contracts, agreements, and more.",            url: "https://www.lawdepot.com",     affiliateUrl: "https://www.lawdepot.com" },

  // ── Insurance ─────────────────────────────────────────
  { id: "in1",  name: "Next Insurance",    category: "Insurance", color: "#EF4444", badge: "Most Popular",      description: "Fast, tailored business insurance — quote and buy in minutes.",             url: "https://www.nextinsurance.com", affiliateUrl: "https://www.nextinsurance.com" },
  { id: "in2",  name: "Hiscox",            category: "Insurance", color: "#EF4444",                              description: "Small business insurance specialists with flexible monthly plans.",          url: "https://www.hiscox.com",        affiliateUrl: "https://www.hiscox.com" },
  { id: "in3",  name: "Thimble",           category: "Insurance", color: "#EF4444", badge: "Best for Freelancers", description: "Pay-per-project or monthly insurance — great for gig workers.",            url: "https://www.thimble.com",       affiliateUrl: "https://www.thimble.com" },
  { id: "in4",  name: "Simply Business",   category: "Insurance", color: "#EF4444",                              description: "Compare multiple insurers to find the best rate for your business.",        url: "https://www.simplybusiness.com", affiliateUrl: "https://www.simplybusiness.com" },
  { id: "in5",  name: "Embroker",          category: "Insurance", color: "#EF4444",                              description: "Tech-first business insurance for startups, including D&O and cyber.",       url: "https://www.embroker.com",      affiliateUrl: "https://www.embroker.com" },

  // ── Branding ──────────────────────────────────────────
  { id: "br1",  name: "Looka",      category: "Branding", color: "#F97316", badge: "Best Value",   description: "AI-powered logo + full brand kit. Get a full brand identity in minutes.",   url: "https://looka.com",            affiliateUrl: "https://looka.com" },
  { id: "br2",  name: "Canva",      category: "Branding", color: "#F97316", badge: "Free",         description: "Free design tool for logos, social graphics, and all marketing materials.", url: "https://www.canva.com",        affiliateUrl: "" },
  { id: "br3",  name: "99designs",  category: "Branding", color: "#F97316",                        description: "Professional logo design from vetted freelance designers.",                url: "https://99designs.com",        affiliateUrl: "https://99designs.com" },
  { id: "br4",  name: "Namecheap",  category: "Branding", color: "#F97316",                        description: "Affordable domain registration — often the cheapest for .com domains.",    url: "https://www.namecheap.com",    affiliateUrl: "https://www.namecheap.com" },
  { id: "br5",  name: "Porkbun",    category: "Branding", color: "#F97316", badge: "Best Deals",   description: "Very cheap domain registration with free WHOIS privacy included.",          url: "https://porkbun.com",          affiliateUrl: "https://porkbun.com" },
  { id: "br6",  name: "Fiverr",     category: "Branding", color: "#F97316",                        description: "Find freelance logo designers and brand strategists starting at $5.",       url: "https://www.fiverr.com",       affiliateUrl: "https://www.fiverr.com" },

  // ── Website ───────────────────────────────────────────
  { id: "wb1",  name: "Squarespace",      category: "Website", color: "#1A2B4A", badge: "Most Popular", description: "Beautiful drag-and-drop website builder with built-in ecommerce.",       url: "https://www.squarespace.com",   affiliateUrl: "https://www.squarespace.com" },
  { id: "wb2",  name: "Webflow",          category: "Website", color: "#1A2B4A",                        description: "No-code website builder with full design control — 50% affiliate commission.", url: "https://webflow.com",        affiliateUrl: "https://webflow.com" },
  { id: "wb3",  name: "Framer",           category: "Website", color: "#1A2B4A", badge: "Best Design",  description: "Stunning websites with AI layout generation and animations.",            url: "https://www.framer.com",        affiliateUrl: "https://www.framer.com" },
  { id: "wb4",  name: "Carrd",            category: "Website", color: "#1A2B4A", badge: "Free to Start", description: "Minimal one-page sites — free tier is genuinely great for MVPs.",       url: "https://carrd.co",             affiliateUrl: "https://carrd.co" },
  { id: "wb5",  name: "WordPress.com",    category: "Website", color: "#1A2B4A",                        description: "Flexible platform with thousands of themes and plugins.",               url: "https://wordpress.com",         affiliateUrl: "" },
  { id: "wb6",  name: "Google Workspace", category: "Website", color: "#1A2B4A",                        description: "Professional email at your domain + Docs, Sheets, Drive.",              url: "https://workspace.google.com",  affiliateUrl: "https://workspace.google.com" },
  { id: "wb7",  name: "Microsoft 365",    category: "Website", color: "#1A2B4A",                        description: "Outlook + Office apps for your domain email and productivity.",          url: "https://www.microsoft.com/en-us/microsoft-365/business", affiliateUrl: "https://www.microsoft.com/en-us/microsoft-365/business" },

  // ── Marketing ─────────────────────────────────────────
  { id: "mk1",  name: "Kit (ConvertKit)", category: "Marketing", color: "#F59E0B", badge: "Best for Creators", description: "Email marketing for founders — 50% recurring commission for 12 months.", url: "https://convertkit.com",   affiliateUrl: "https://convertkit.com" },
  { id: "mk2",  name: "Mailchimp",        category: "Marketing", color: "#F59E0B", badge: "Free to Start",     description: "Email marketing for small businesses — free up to 500 subscribers.",     url: "https://mailchimp.com",    affiliateUrl: "https://mailchimp.com" },
  { id: "mk3",  name: "ActiveCampaign",   category: "Marketing", color: "#F59E0B",                             description: "Email automation + CRM for growing businesses.",                         url: "https://www.activecampaign.com", affiliateUrl: "https://www.activecampaign.com" },
  { id: "mk4",  name: "Klaviyo",          category: "Marketing", color: "#F59E0B",                             description: "Email and SMS marketing for ecommerce brands.",                          url: "https://www.klaviyo.com",  affiliateUrl: "https://www.klaviyo.com" },
  { id: "mk5",  name: "Buffer",           category: "Marketing", color: "#F59E0B",                             description: "Social media scheduling and analytics — generous free plan.",              url: "https://buffer.com",       affiliateUrl: "https://buffer.com" },
  { id: "mk6",  name: "Later",            category: "Marketing", color: "#F59E0B",                             description: "Visual social media scheduler — great for Instagram and TikTok.",        url: "https://later.com",        affiliateUrl: "https://later.com" },

  // ── Newsletter ────────────────────────────────────────
  { id: "nl1",  name: "Beehiiv",   category: "Newsletter", color: "#F59E0B", badge: "Fastest Growing", description: "Newsletter platform with built-in paid subs — 60% recurring affiliate commission.", url: "https://www.beehiiv.com", affiliateUrl: "https://www.beehiiv.com" },
  { id: "nl2",  name: "Substack",  category: "Newsletter", color: "#F59E0B", badge: "Free",             description: "Free newsletter platform with built-in paid subscriptions.",                     url: "https://substack.com",    affiliateUrl: "" },
  { id: "nl3",  name: "Ghost",     category: "Newsletter", color: "#F59E0B",                             description: "Open-source newsletter and membership platform — great for content businesses.", url: "https://ghost.org",       affiliateUrl: "https://ghost.org" },

  // ── SEO & Growth ──────────────────────────────────────
  { id: "sg1",  name: "Semrush",    category: "SEO & Growth", color: "#8B5CF6", badge: "Best All-in-One", description: "Keyword research, competitor analysis, and site audit — the full SEO toolkit.", url: "https://www.semrush.com",  affiliateUrl: "https://www.semrush.com" },
  { id: "sg2",  name: "Ahrefs",     category: "SEO & Growth", color: "#8B5CF6",                           description: "Best backlink analysis and keyword explorer on the market.",                  url: "https://ahrefs.com",       affiliateUrl: "https://ahrefs.com" },
  { id: "sg3",  name: "Surfer SEO", category: "SEO & Growth", color: "#8B5CF6",                           description: "AI-powered content optimization — write articles that rank.",                url: "https://surferseo.com",    affiliateUrl: "https://surferseo.com" },
  { id: "sg4",  name: "Hotjar",     category: "SEO & Growth", color: "#8B5CF6",                           description: "Heatmaps and session recordings to see how users interact with your site.",   url: "https://www.hotjar.com",   affiliateUrl: "https://www.hotjar.com" },
  { id: "sg5",  name: "Google Analytics", category: "SEO & Growth", color: "#8B5CF6", badge: "Free",      description: "Free website analytics — track traffic, conversions, and user behavior.",     url: "https://analytics.google.com", affiliateUrl: "" },
  { id: "sg6",  name: "SpyFu",      category: "SEO & Growth", color: "#8B5CF6",                           description: "Spy on competitor keywords and ad spend — great for market research.",       url: "https://www.spyfu.com",    affiliateUrl: "https://www.spyfu.com" },

  // ── CRM & Sales ───────────────────────────────────────
  { id: "cr1",  name: "HubSpot",    category: "CRM & Sales", color: "#16A34A", badge: "Most Popular", description: "Free CRM with email, pipeline tracking, and contact management.",               url: "https://www.hubspot.com",   affiliateUrl: "https://www.hubspot.com" },
  { id: "cr2",  name: "Pipedrive",  category: "CRM & Sales", color: "#16A34A",                        description: "Sales-focused CRM with visual pipeline — 20-30% recurring commissions.",       url: "https://www.pipedrive.com", affiliateUrl: "https://www.pipedrive.com" },
  { id: "cr3",  name: "Close",      category: "CRM & Sales", color: "#16A34A",                        description: "Built-in calling, SMS, and email CRM designed for small sales teams.",          url: "https://close.com",         affiliateUrl: "https://close.com" },
  { id: "cr4",  name: "Freshsales", category: "CRM & Sales", color: "#16A34A",                        description: "AI-powered CRM from Freshworks with a generous free plan.",                    url: "https://www.freshworks.com/crm/sales/", affiliateUrl: "https://www.freshworks.com/crm/sales/" },
  { id: "cr5",  name: "Apollo",     category: "CRM & Sales", color: "#16A34A",                        description: "Sales intelligence + outreach — find leads and automate prospecting.",          url: "https://www.apollo.io",     affiliateUrl: "https://www.apollo.io" },

  // ── Automation ────────────────────────────────────────
  { id: "au1",  name: "Zapier",    category: "Automation", color: "#1A2B4A", badge: "Most Popular", description: "Connect 6,000+ apps without code. Automate repetitive tasks instantly.",       url: "https://zapier.com",      affiliateUrl: "https://zapier.com" },
  { id: "au2",  name: "Make",      category: "Automation", color: "#1A2B4A",                        description: "More powerful visual automation builder for complex multi-step workflows.",     url: "https://www.make.com",     affiliateUrl: "https://www.make.com" },
  { id: "au3",  name: "n8n",       category: "Automation", color: "#1A2B4A",                        description: "Open-source automation — self-host for free or use cloud version.",            url: "https://n8n.io",           affiliateUrl: "" },
  { id: "au4",  name: "Pabbly",    category: "Automation", color: "#1A2B4A",                        description: "Affordable Zapier alternative with no per-task limits.",                       url: "https://www.pabbly.com",   affiliateUrl: "https://www.pabbly.com" },

  // ── HR & Payroll ──────────────────────────────────────
  { id: "hr1",  name: "Gusto",     category: "HR & Payroll", color: "#8B5CF6", badge: "Most Popular", description: "Full-service payroll and HR for small businesses. Simple, reliable, and trusted.", url: "https://gusto.com",          affiliateUrl: "https://gusto.com" },
  { id: "hr2",  name: "Rippling",  category: "HR & Payroll", color: "#8B5CF6",                        description: "Unified HR, IT, and finance platform — from hire to retire.",                   url: "https://www.rippling.com",    affiliateUrl: "https://www.rippling.com" },
  { id: "hr3",  name: "Deel",      category: "HR & Payroll", color: "#8B5CF6",                        description: "Global payroll and contractor management in 150+ countries.",                   url: "https://www.deel.com",        affiliateUrl: "https://www.deel.com" },
  { id: "hr4",  name: "Oyster",    category: "HR & Payroll", color: "#8B5CF6",                        description: "Hire and pay international employees and contractors compliantly.",              url: "https://www.oysterhr.com",    affiliateUrl: "https://www.oysterhr.com" },

  // ── E-commerce ────────────────────────────────────────
  { id: "ec1",  name: "Shopify",        category: "E-commerce", color: "#F97316", badge: "Best for Products", description: "The leading ecommerce platform — easy to start, powerful to scale.",    url: "https://www.shopify.com",        affiliateUrl: "https://www.shopify.com" },
  { id: "ec2",  name: "Gumroad",        category: "E-commerce", color: "#F97316", badge: "Free to Start",     description: "Sell digital products and memberships with no monthly fee.",            url: "https://gumroad.com",            affiliateUrl: "" },
  { id: "ec3",  name: "Lemon Squeezy",  category: "E-commerce", color: "#F97316",                             description: "Sell digital products with built-in global tax compliance.",             url: "https://www.lemonsqueezy.com",   affiliateUrl: "https://www.lemonsqueezy.com" },
  { id: "ec4",  name: "WooCommerce",    category: "E-commerce", color: "#F97316",                             description: "Free WordPress ecommerce plugin — own your store completely.",           url: "https://woocommerce.com",        affiliateUrl: "https://woocommerce.com" },
  { id: "ec5",  name: "BigCommerce",    category: "E-commerce", color: "#F97316",                             description: "Enterprise ecommerce platform — great 200% first-payment commission.",  url: "https://www.bigcommerce.com",    affiliateUrl: "https://www.bigcommerce.com" },

  // ── Productivity ──────────────────────────────────────
  { id: "pr1",  name: "Notion",     category: "Productivity", color: "#0EA5E9", badge: "Most Popular",    description: "All-in-one workspace for notes, wikis, databases — 50% recurring commission.", url: "https://www.notion.so",       affiliateUrl: "https://www.notion.so" },
  { id: "pr2",  name: "Calendly",   category: "Productivity", color: "#0EA5E9",                            description: "Easy scheduling for client calls and meetings — share one link.",            url: "https://calendly.com",         affiliateUrl: "https://calendly.com" },
  { id: "pr3",  name: "Typeform",   category: "Productivity", color: "#0EA5E9",                            description: "Beautiful interactive surveys and forms people actually complete.",           url: "https://www.typeform.com",     affiliateUrl: "https://www.typeform.com" },
  { id: "pr4",  name: "Tally",      category: "Productivity", color: "#0EA5E9", badge: "Free",             description: "Free, beautiful form builder with unlimited responses.",                     url: "https://tally.so",             affiliateUrl: "" },
  { id: "pr5",  name: "Loom",       category: "Productivity", color: "#0EA5E9",                            description: "Record and share video messages instead of writing long emails.",            url: "https://www.loom.com",         affiliateUrl: "https://www.loom.com" },
  { id: "pr6",  name: "Airtable",   category: "Productivity", color: "#0EA5E9",                            description: "Spreadsheet-database hybrid for tracking anything in your business.",       url: "https://www.airtable.com",     affiliateUrl: "https://www.airtable.com" },
  { id: "pr7",  name: "Monday.com", category: "Productivity", color: "#0EA5E9",                            description: "Visual project management for teams — tracks tasks, timelines, and goals.", url: "https://monday.com",           affiliateUrl: "https://monday.com" },
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

      {/* ── Search ────────────────────────────────────────── */}
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

      {/* ── Category pills ────────────────────────────────── */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          const color = CATEGORY_META[cat]?.color || "var(--navy)";
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                fontFamily: "var(--font-heading)", fontSize: "0.68rem", fontWeight: 700,
                letterSpacing: "0.05em", textTransform: "uppercase", padding: "5px 11px",
                border: `2px solid ${isActive ? color : "var(--border-light)"}`,
                background: isActive ? color : "transparent",
                color: isActive ? "white" : "var(--ink-muted)",
                cursor: "pointer", transition: "all 0.12s",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* ── Results header ────────────────────────────────── */}
      {filtered.length > 0 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.72rem", fontWeight: 600, color: "var(--ink-muted)" }}>
            {filtered.length} tool{filtered.length !== 1 ? "s" : ""}
          </span>
          {affiliateCount > 0 && (
            <span style={{
              fontFamily: "var(--font-display)", fontSize: "0.58rem", letterSpacing: "0.12em",
              textTransform: "uppercase", color: "var(--orange)", border: "1.5px solid var(--orange)", padding: "2px 8px",
            }}>
              {affiliateCount} partner link{affiliateCount !== 1 ? "s" : ""}
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
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "0.9rem", fontWeight: 700, color: "var(--navy)", lineHeight: 1.2 }}>
                    {resource.name}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                    {hasAffiliate && <span className="affiliate-badge">Partner</span>}
                    <ExternalLink style={{ width: 12, height: 12, color: "var(--ink-muted)", opacity: 0.5 }} />
                  </div>
                </div>

                {resource.badge && (
                  <span style={{
                    fontFamily: "var(--font-display)", fontSize: "0.55rem", letterSpacing: "0.12em",
                    textTransform: "uppercase", color, border: `1px solid ${color}`,
                    padding: "1px 5px", alignSelf: "flex-start", marginBottom: 6,
                  }}>
                    {resource.badge}
                  </span>
                )}

                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.77rem", color: "var(--ink-muted)", lineHeight: 1.5, flex: 1, marginBottom: 10 }}>
                  {resource.description}
                </p>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{
                    fontFamily: "var(--font-display)", fontSize: "0.54rem", letterSpacing: "0.12em",
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
          <strong style={{ color: "var(--ink-mid)" }}>Affiliate disclosure:</strong> Some links on this page are affiliate links. If you sign up through our link, we may earn a commission at no extra cost to you. We only recommend tools we genuinely believe in.
        </p>
      </div>
    </div>
  );
}

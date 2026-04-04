export interface ChecklistResource {
  name: string;
  url: string;
  affiliate?: boolean;
  description?: string;
  badge?: string;
}

export interface PremiumFeature {
  id: string;
  icon: string; // Maps to lucide-react keys like 'Palette', 'Search', etc.
  label: string;
  tagline: string;
  cta: string;
}

export interface ChecklistStep {
  id: string;
  phase: number;
  phaseName: string;
  order: number;
  title: string;
  description: string; // Legacy fallback or short summary
  whyItMatters?: string;
  howToDoIt?: string;
  whatToStartWith?: string;
  action: string;
  resources: ChecklistResource[];
  premiumFeatures?: PremiumFeature[]; // 1-3 targeted monetization endpoints
  journalPrompt: string;
}

export interface Phase {
  number: number;
  name: string;
  icon: string;
  description: string;
}

// Phase display order: Validate → Form → Finance → Build → Brand → Protect → Locate → Price → Sell → Operate
// The number field is the stable ID (used in step data and URLs). The array order controls display sequence.
export const phases: Phase[] = [
  { number: 1,  name: "Validate", icon: "Search",     description: "Confirm real people will pay for your idea before you spend a dollar" },
  { number: 4,  name: "Form",     icon: "FileText",   description: "Make your business official and legally protected" },
  { number: 5,  name: "Finance",  icon: "DollarSign", description: "Build the financial foundation that compounds over time" },
  { number: 2,  name: "Build",    icon: "Hammer",     description: "Create your product or design your service offer" },
  { number: 7,  name: "Brand",    icon: "Palette",    description: "Build the identity that earns trust before anyone speaks to you" },
  { number: 8,  name: "Protect",  icon: "Shield",     description: "Prevent the five things that shut down businesses before year two" },
  { number: 6,  name: "Locate",   icon: "MapPin",     description: "Place your business — online, offline, or both" },
  { number: 3,  name: "Price",    icon: "Tag",        description: "Set your price with confidence from day one" },
  { number: 9,  name: "Sell",     icon: "Users",      description: "Get your first paying customer this week" },
  { number: 10, name: "Operate",  icon: "Settings",   description: "Build systems so the business runs — and grows — without you" },
];

// Phase colors by display position (index 0–9 in the phases array above)
export const PHASE_COLORS = [
  "#F97316", // 0 Validate  — orange
  "#8B5CF6", // 1 Form      — purple
  "#16A34A", // 2 Finance   — green
  "#0EA5E9", // 3 Build     — blue
  "#EF4444", // 4 Brand     — red
  "#F59E0B", // 5 Protect   — amber
  "#EC4899", // 6 Locate    — pink
  "#06B6D4", // 7 Price     — cyan
  "#A855F7", // 8 Sell      — violet
  "#14B8A6", // 9 Operate   — teal
];

/** Returns the display color for a phase by its number (stable ID). */
export function getPhaseColor(phaseNumber: number): string {
  const idx = phases.findIndex((p) => p.number === phaseNumber);
  return idx >= 0 ? PHASE_COLORS[idx] : "#F97316";
}

export const checklistSteps: ChecklistStep[] = [
  {
  "id": "validate-1",
  "phase": 1,
  "phaseName": "Validate",
  "order": 1,
  "title": "Define your customer and their problem",
  "description": "Write down exactly who your customer is and what problem they have that is painful enough to pay to solve.",
  "action": "Write one sentence: I help [specific person] solve [specific problem] by [your solution].",
  "resources": [
    {
      "name": "Notion",
      "url": "https://www.notion.so",
      "affiliate": true,
      "description": "Build your customer research doc, idea wiki, and business plan",
      "badge": "Most Popular"
    },
    {
      "name": "Typeform",
      "url": "https://www.typeform.com",
      "affiliate": true,
      "description": "Build a beautiful customer discovery survey in minutes"
    },
    {
      "name": "Tally",
      "url": "https://tally.so",
      "description": "Free form builder — simple and fast",
      "badge": "Free"
    },
    {
      "name": "SBA Market Research Guide",
      "url": "https://www.sba.gov/business-guide/plan-your-business/market-research-competitive-analysis",
      "description": "Free government guide to understanding your market",
      "badge": "Free"
    }
  ],
  "journalPrompt": "Who exactly is my customer? What does their problem cost them — in time, money, or stress?",
  "whyItMatters": "Ignoring this step is like throwing darts blindfolded – you'll waste precious time, money, and energy building solutions for an audience that doesn't exist or doesn't care. Truly understanding your customer and their specific, painful problem is the bedrock of all successful businesses, leading to highly effective marketing, product development that resonates, and customers who are eager to pay for your unique solution.",
  "howToDoIt": "Think like a detective, not a salesperson. Your goal is to uncover deeply rooted problems, not just surface-level annoyances. Use an empathy map or customer persona framework to go beyond demographics and explore their daily life, aspirations, fears, and the specific 'job' they're trying to get done. Focus on problems that cause genuine friction, cost them significantly in time or money, or create emotional stress. The more specific and painful the problem, the more urgent the need for your solution.",
  "whatToStartWith": "Before you write your action statement, take 10 minutes to brainstorm 3-5 distinct types of people or businesses who might be interested in your offering. For each, jot down one specific, current struggle they face. Then, pick the one that feels most compelling and specific, and let that guide your focus.",
  "premiumFeatures": [
    {
      "id": "ai-persona-builder",
      "icon": "User",
      "label": "AI Customer Persona Builder",
      "tagline": "Input basic details and AI generates a comprehensive customer persona including pain points, goals, and daily challenges.",
      "cta": "Build Persona"
    },
    {
      "id": "pain-quantifier",
      "icon": "Zap",
      "label": "AI Problem Pain Quantifier",
      "tagline": "Describe a customer problem and AI suggests ways to quantify its cost in time, money, or emotional stress.",
      "cta": "Quantify Pain"
    },
    {
      "id": "niche-problem-explorer",
      "icon": "Search",
      "label": "AI Niche Problem Explorer",
      "tagline": "Input a broad market and AI identifies underserved sub-niches and common, unaddressed problems within them.",
      "cta": "Explore Niches"
    }
  ]
},
  {
  "id": "validate-2",
  "phase": 1,
  "phaseName": "Validate",
  "order": 2,
  "title": "Test your idea with real people",
  "description": "Before spending money, talk to 10 real potential customers to validate the problem, not your solution.",
  "action": "Have 10 conversations using The Mom Test framework: ask about their life, not your idea. Record what you hear.",
  "resources": [
    {
      "name": "Typeform",
      "url": "https://www.typeform.com",
      "affiliate": true,
      "description": "Create a research survey to reach more people faster"
    },
    {
      "name": "Loom",
      "url": "https://www.loom.com",
      "affiliate": true,
      "description": "Record yourself walking through your idea to share with potential customers",
      "badge": "Best for Remote"
    },
    {
      "name": "Hotjar",
      "url": "https://www.hotjar.com",
      "affiliate": true,
      "description": "If you have a landing page, see how visitors respond"
    },
    {
      "name": "The Mom Test (book)",
      "url": "https://www.momtestbook.com",
      "description": "The definitive guide to customer conversations that give you real answers"
    },
    {
      "name": "Product Hunt",
      "url": "https://www.producthunt.com",
      "description": "See what similar products exist and how the market responded",
      "badge": "Free"
    }
  ],
  "journalPrompt": "What surprised me about the customer conversations? Did anyone say 'I need this' or just 'that sounds nice'? What new insights did I uncover about the problem's frequency, severity, or current cost to them?",
  "whyItMatters": "Building a solution to a problem that doesn't exist or isn't painful enough is the fastest way to waste time, money, and emotional energy, leading to product failure. Getting it right, however, means you're investing in a proven market need, de-risking your entire venture, and laying a strong foundation for rapid adoption and sustainable growth.",
  "howToDoIt": "Adopt 'The Mom Test' framework, which teaches you to ask questions about your customers' lives, experiences, and past behaviors, rather than pitching your idea. The goal is to uncover deep, unbiased insights into their existing problems and needs, without leading them to be polite or positive about your potential solution. Focus on problems they *currently* have and *actively* seek solutions for, not hypothetical ones.",
  "whatToStartWith": "Begin by scheduling your first 3-5 'Mom Test' style conversations with potential customers you can access easily (friends of friends, LinkedIn connections, or local community groups). Focus purely on listening and documenting their responses to your problem-focused questions, capturing unfiltered feedback without trying to sell anything.",
  "premiumFeatures": [
    {
      "id": "ai-question-architect",
      "icon": "FileText",
      "label": "AI Mom Test Question Architect",
      "tagline": "Generate unbiased, open-ended questions tailored to your target persona and problem space, ensuring you get honest feedback.",
      "cta": "Generate now"
    },
    {
      "id": "ai-insight-synthesizer",
      "icon": "LayoutDashboard",
      "label": "AI Customer Insight Synthesizer",
      "tagline": "Upload conversation notes or transcripts to get automated summaries of key pain points, 'aha' moments, and user needs.",
      "cta": "Analyze now"
    },
    {
      "id": "ai-persona-definer",
      "icon": "Users",
      "label": "AI Persona & Problem Definer",
      "tagline": "Synthesize insights from your customer conversations into detailed persona profiles and crystal-clear problem statements.",
      "cta": "Define now"
    }
  ]
},
  {
  "id": "validate-3",
  "phase": 1,
  "phaseName": "Validate",
  "order": 3,
  "title": "Research your market and competition",
  "description": "Research your market and competition to understand existing solutions, pricing, and identify gaps your business can fill.",
  "action": "List 5 competitors. For each: what do they charge, who do they serve, and what do customers complain about in their reviews?",
  "resources": [
    {
      "name": "Semrush",
      "url": "https://www.semrush.com",
      "affiliate": true,
      "description": "See competitor traffic, keywords, and ad spend",
      "badge": "Best for Research"
    },
    {
      "name": "SpyFu",
      "url": "https://www.spyfu.com",
      "affiliate": true,
      "description": "See every keyword competitors are buying and ranking for"
    },
    {
      "name": "Google Trends",
      "url": "https://trends.google.com",
      "description": "See whether demand for your idea is growing or shrinking",
      "badge": "Free"
    },
    {
      "name": "Exploding Topics",
      "url": "https://explodingtopics.com",
      "affiliate": true,
      "description": "Discover trends before they peak — find your timing edge"
    },
    {
      "name": "Census Business Builder",
      "url": "https://www.census.gov/data/data-tools/cbb.html",
      "description": "Free demographic and market size data from the US Census",
      "badge": "Free"
    }
  ],
  "journalPrompt": "What do my competitors get wrong? What do customers consistently complain about?",
  "whyItMatters": "Failing to thoroughly research your market and competition can lead to launching a product or service with no demand, incorrect pricing, or an inability to differentiate, resulting in wasted time, money, and a swift market exit. Getting it right, however, provides the blueprint for a product that truly solves problems, a pricing strategy that attracts customers, and a clear path to carving out your unique niche and achieving sustainable growth.",
  "howToDoIt": "Adopt a 'Reverse Engineering Gaps' mindset: view competitors not as threats, but as essential data points. By systematically analyzing their value propositions, pricing models, and – most critically – the consistent pain points expressed by their customers, you can identify underserved segments, unmet needs, or areas where current solutions fall short. This framework turns competitive analysis into a strategic opportunity map, revealing where your unique offering can thrive.",
  "whatToStartWith": "Begin by compiling a concise list of the 3-5 most prominent competitors in your space and, for each, identify the primary segments they serve and their core offerings. Then, make a dedicated effort to spend at least 30 minutes reading customer reviews, forum discussions, or social media comments about these competitors, specifically noting down recurring complaints or frustrations.",
  "premiumFeatures": [
    {
      "id": "ai-competitor-report",
      "icon": "BarChart2",
      "label": "AI Competitor Landscape Report",
      "tagline": "Generate a concise report on your top competitors, detailing their offerings, pricing, and target audience.",
      "cta": "Generate now"
    },
    {
      "id": "ai-complaint-synth",
      "icon": "FileText",
      "label": "AI Customer Complaint Synthesizer",
      "tagline": "Pinpoint common frustrations and unmet needs by analyzing competitor customer reviews and feedback at scale.",
      "cta": "Analyze now"
    }
  ]
},
  {
  "id": "validate-4",
  "phase": 1,
  "phaseName": "Validate",
  "order": 4,
  "title": "Choose your business model",
  "description": "Choosing your business model defines how you generate revenue, directly impacting your operational costs, profit margins, and daily activities.",
  "action": "Choose your primary model and estimate your revenue per sale and how many sales you need per month to break even.",
  "resources": [
    {
      "name": "Shopify",
      "url": "https://www.shopify.com",
      "affiliate": true,
      "description": "Best platform for product-based businesses — physical or digital",
      "badge": "Best for Products"
    },
    {
      "name": "Gumroad",
      "url": "https://gumroad.com",
      "affiliate": true,
      "description": "Sell digital products and memberships with no monthly fee",
      "badge": "Free to Start"
    },
    {
      "name": "Kajabi",
      "url": "https://kajabi.com",
      "affiliate": true,
      "description": "All-in-one platform for courses, coaching, and memberships — 30% recurring commission",
      "badge": "Best for Creators"
    },
    {
      "name": "SBA Business Structure Guide",
      "url": "https://www.sba.gov/business-guide/launch-your-business/choose-business-structure",
      "description": "Official guide to business types and models",
      "badge": "Free"
    }
  ],
  "journalPrompt": "How exactly will money flow into my business? What does one successful sale look like?",
  "whyItMatters": "Getting your business model wrong can lead to unsustainable cash flow, constant operational struggles, and ultimately, business failure, even if you have a great product. Conversely, a well-chosen business model acts as a powerful lever, aligning your offerings with market demand and ensuring a clear, profitable path to sustainable growth and scalability from day one.",
  "howToDoIt": "Think of your business model as the blueprint for value exchange: what specific value do you deliver, to whom, and how do you capture a fair portion of that value in return? Consider your target customer, the problem you solve, and the most natural, scalable way to monetize that solution. This framework helps you identify the core 'unit' of transaction that drives your revenue.",
  "whatToStartWith": "Begin by listing all potential ways customers might pay you for your core offering, then select the single primary method that best aligns with your value proposition and target market. Define this core unit of transaction (e.g., one product sold, one hour of service, one monthly subscription).",
  "premiumFeatures": [
    {
      "id": "ai-revenue-explorer",
      "icon": "Lightbulb",
      "label": "AI Revenue Model Explorer",
      "tagline": "Get tailored suggestions for primary and secondary revenue streams based on your core offering and target market.",
      "cta": "Explore Revenue Models"
    },
    {
      "id": "ai-breakeven-estimator",
      "icon": "BarChart2",
      "label": "AI Break-Even Sales Estimator",
      "tagline": "Input your fixed and variable costs, and AI calculates the number of sales needed monthly to achieve profitability.",
      "cta": "Calculate Break-Even"
    },
    {
      "id": "ai-pricing-assistant",
      "icon": "DollarSign",
      "label": "AI Pricing Strategy Assistant",
      "tagline": "Receive data-driven recommendations for pricing your products or services, considering market benchmarks and perceived value.",
      "cta": "Suggest Pricing"
    }
  ]
},
  {
  "id": "build-1",
  "phase": 2,
  "phaseName": "Build",
  "order": 1,
  "title": "Design your minimum viable offer",
  "description": "Define the simplest version of your product or service that solves the core problem, focusing on one thing done exceptionally well.",
  "action": "Write a one-page offer document: what is included, what is not, what the customer receives, and how it is delivered.",
  "resources": [
    {
      "name": "Notion",
      "url": "https://www.notion.so",
      "affiliate": true,
      "description": "Build your offer document, service menu, or product spec",
      "badge": "Most Popular"
    },
    {
      "name": "Canva",
      "url": "https://www.canva.com",
      "affiliate": true,
      "description": "Design a visual one-pager or service menu",
      "badge": "Free to Start"
    },
    {
      "name": "Fiverr",
      "url": "https://www.fiverr.com",
      "affiliate": true,
      "description": "Hire a product designer or UX consultant to sharpen your offer"
    },
    {
      "name": "Loom",
      "url": "https://www.loom.com",
      "affiliate": true,
      "description": "Record a quick demo of your concept to share for feedback"
    }
  ],
  "journalPrompt": "What is the single most important thing my product or service does? What can I cut without losing that?",
  "whyItMatters": "Without a clear Minimum Viable Offer (MVO), you risk feature bloat, draining resources and time on non-essential elements, leading to delayed launches, confused messaging, and a product that tries to do everything but excels at nothing. This often results in a 'Swiss Army knife' of features that overwhelms customers and dilutes your core value proposition. Conversely, a well-defined MVO allows you to launch faster, validate your core hypothesis with real customers, conserve resources, and iterate based on genuine market feedback, ensuring every subsequent feature adds demonstrable value and moves you closer to product-market fit.",
  "howToDoIt": "Employ the 'Problem-Solution-Fit' framework combined with the 'Jobs-to-be-Done' theory. Identify the single, most painful problem your target customer faces (the 'job'). Then, define the absolute smallest, most efficient solution that reliably 'gets the job done' better than existing alternatives. Focus relentlessly on this core value proposition, eliminating anything that doesn't directly contribute to solving that one critical problem.",
  "whatToStartWith": "Begin by explicitly stating the single, most pressing problem your ideal customer faces that you intend to solve. Then, articulate the core promise of your product or service as the ultimate solution to *that specific problem*.",
  "premiumFeatures": [
    {
      "id": "ai-value-prop-generator",
      "icon": "Zap",
      "label": "AI Core Value Proposition Generator",
      "tagline": "Craft a compelling, concise value proposition highlighting your product's single most important solution.",
      "cta": "Generate now"
    },
    {
      "id": "ai-mvp-prioritizer",
      "icon": "ListChecks",
      "label": "AI MVP Feature Prioritizer",
      "tagline": "AI analyzes potential features against your core problem and customer needs, suggesting an MVP roadmap.",
      "cta": "Prioritize now"
    },
    {
      "id": "ai-offer-document-draft",
      "icon": "FileText",
      "label": "AI One-Page Offer Document Draft",
      "tagline": "Instantly draft a one-page MVP offer document including inclusions, exclusions, and delivery specifics.",
      "cta": "Draft now"
    }
  ]
},
  {
  "id": "build-2",
  "phase": 2,
  "phaseName": "Build",
  "order": 2,
  "title": "Source, make, or build your product",
  "description": "This step focuses on bringing your product or service to life, whether by sourcing a physical product, building a digital asset, or documenting a service delivery process.",
  "action": "Create or source version one of your product, or document your service delivery process end to end.",
  "resources": [
    {
      "name": "Printful",
      "url": "https://www.printful.com",
      "affiliate": true,
      "description": "Print-on-demand — create branded products with no inventory or upfront cost",
      "badge": "Best for Merch"
    },
    {
      "name": "Printify",
      "url": "https://printify.com",
      "affiliate": true,
      "description": "Print-on-demand with 900+ products and the largest supplier network"
    },
    {
      "name": "Spocket",
      "url": "https://www.spocket.co",
      "affiliate": true,
      "description": "Dropshipping from US and EU suppliers — fast shipping, high margins"
    },
    {
      "name": "SaleHoo",
      "url": "https://www.salehoo.com",
      "affiliate": true,
      "description": "Verified supplier directory — find reliable manufacturers and wholesalers",
      "badge": "Best for Sourcing"
    },
    {
      "name": "Teachable",
      "url": "https://teachable.com",
      "affiliate": true,
      "description": "Build and sell online courses — 30% recurring commission"
    },
    {
      "name": "Thinkific",
      "url": "https://www.thinkific.com",
      "affiliate": true,
      "description": "Create and sell online courses and memberships — 20% recurring"
    },
    {
      "name": "Fiverr",
      "url": "https://www.fiverr.com",
      "affiliate": true,
      "description": "Hire a developer, writer, or designer to build your product"
    },
    {
      "name": "Upwork",
      "url": "https://www.upwork.com",
      "affiliate": true,
      "description": "Find skilled contractors to build or create what you need"
    }
  ],
  "journalPrompt": "Do I have something I could hand to a customer right now? If not, what is the one thing stopping me?",
  "whyItMatters": "Getting this wrong means launching with an unrefined or non-existent product, leading to immediate customer dissatisfaction, negative reviews, and wasted resources on something that doesn't meet market needs. It erodes trust before you've even built it. Getting it right, however, means having a tangible, even if minimal, product or a well-defined service that allows for crucial early feedback, rapid iteration, and the ability to secure initial customers. It provides the core asset around which your entire business will be built and validated, dramatically accelerating your path to market fit and revenue.",
  "howToDoIt": "Adopt the 'Lean Startup' approach by focusing on your Minimum Viable Product (MVP) or service blueprint. For products, identify the core problem you're solving and build or source only the essential features required to address that problem for your first customers. Resist the urge to over-engineer. For services, meticulously map out the customer journey from inquiry to delivery and post-delivery follow-up, identifying every step, input, and output. Your goal is a functional, deliverable version one, not perfection.",
  "whatToStartWith": "Start by defining the single most valuable feature or deliverable your product or service provides, and then sketch out the simplest possible way to create or deliver just that, ready for a customer to experience.",
  "premiumFeatures": [
    {
      "id": "ai-supplier-scout",
      "icon": "Search",
      "label": "AI Supplier Scout",
      "tagline": "Get a curated list of potential suppliers or manufacturers based on your product specs and budget.",
      "cta": "Generate now"
    },
    {
      "id": "ai-mvp-architect",
      "icon": "LayoutDashboard",
      "label": "MVP Feature Architect",
      "tagline": "Input your product ideas and receive a prioritized list of core features for your Minimum Viable Product.",
      "cta": "Generate now"
    },
    {
      "id": "ai-service-blueprint",
      "icon": "FileText",
      "label": "Service Journey Blueprint",
      "tagline": "Generate a detailed step-by-step blueprint of your service delivery process, including customer touchpoints.",
      "cta": "Generate now"
    }
  ]
},
  {
  "id": "build-3",
  "phase": 2,
  "phaseName": "Build",
  "order": 3,
  "title": "Test with real users before you invest",
  "description": "Validate your product or service with real paying users before investing significant capital in inventory, marketing, or infrastructure.",
  "action": "Get 3 people to try your product or service and pay for it or commit to paying. No friends — real potential customers.",
  "resources": [
    {
      "name": "Gumroad",
      "url": "https://gumroad.com",
      "affiliate": true,
      "description": "Pre-sell your digital product before it is finished",
      "badge": "Free to Start"
    },
    {
      "name": "Stripe",
      "url": "https://stripe.com",
      "description": "Create a payment link and collect money before you build the full product"
    },
    {
      "name": "Typeform",
      "url": "https://www.typeform.com",
      "affiliate": true,
      "description": "Build a beta application form — collect interest and qualify testers"
    },
    {
      "name": "Hotjar",
      "url": "https://www.hotjar.com",
      "affiliate": true,
      "description": "Put up a simple landing page and see how people interact with it"
    },
    {
      "name": "Maze",
      "url": "https://maze.co",
      "affiliate": true,
      "description": "Run usability tests on your prototype and get quantitative feedback"
    }
  ],
  "journalPrompt": "Did anyone pay — or commit to paying — for this? What did testers say that surprised me?",
  "whyItMatters": "Launching a product or service without prior validation often leads to significant financial losses on inventory, marketing, and infrastructure for something nobody truly wants. Getting it right, by contrast, provides irrefutable evidence of demand, de-risking your investment, attracting future funding, and building a foundation for sustainable growth based on genuine customer need.",
  "howToDoIt": "Embrace the 'Paid Validation' mental model: rather than just asking for opinions, ask for commitment or money. This proves people truly value your solution enough to exchange something for it. Start with your 'Minimum Viable Offer' – the simplest version of your product or service that still delivers core value – and seek out early adopters who genuinely experience the problem you're solving.",
  "whatToStartWith": "Identify 3 potential customers who are not friends or family, and prepare a concise offer or prototype to present to them, aiming to secure payment or a firm commitment.",
  "premiumFeatures": [
    {
      "id": "ai-persona-builder",
      "icon": "Users",
      "label": "AI Ideal Customer Profiler",
      "tagline": "Generate detailed profiles of your most likely early adopters to identify who to approach for paid validation.",
      "cta": "Generate now"
    },
    {
      "id": "ai-pitch-generator",
      "icon": "Megaphone",
      "label": "AI Paid Validation Pitch Creator",
      "tagline": "Craft compelling scripts and value propositions designed to secure early commitments or pre-sales from testers.",
      "cta": "Generate now"
    },
    {
      "id": "ai-offer-creator",
      "icon": "ShoppingCart",
      "label": "AI Minimum Viable Offer Designer",
      "tagline": "Design an enticing initial offer or pre-sale package to incentivize your first users to pay or commit.",
      "cta": "Generate now"
    }
  ]
},
  {
  "id": "build-4",
  "phase": 2,
  "phaseName": "Build",
  "order": 4,
  "title": "Set up your production or delivery process",
  "description": "Document your repeatable production or delivery process to ensure consistent quality and scalability.",
  "action": "Write a step-by-step fulfillment checklist for your product or a service blueprint for your offering.",
  "resources": [
    {
      "name": "Notion",
      "url": "https://www.notion.so",
      "affiliate": true,
      "description": "Document your SOPs, delivery checklists, and fulfillment process"
    },
    {
      "name": "Loom",
      "url": "https://www.loom.com",
      "affiliate": true,
      "description": "Record video walkthroughs of your process for team training"
    },
    {
      "name": "Jungle Scout",
      "url": "https://www.junglescout.com",
      "affiliate": true,
      "description": "For Amazon sellers: validate demand and set up your product listing",
      "badge": "Best for Amazon"
    },
    {
      "name": "Helium 10",
      "url": "https://www.helium10.com",
      "affiliate": true,
      "description": "Amazon seller tools for keyword research, listing optimization, and analytics"
    },
    {
      "name": "ShipBob",
      "url": "https://www.shipbob.com",
      "affiliate": true,
      "description": "Fulfillment and warehousing for ecommerce — outsource shipping entirely",
      "badge": "Best 3PL"
    }
  ],
  "journalPrompt": "Could someone else follow my process and deliver the same result? What is still inside my head that needs to be written down?",
  "whyItMatters": "Without a clear, documented process, every order or service delivery becomes a chaotic 'reinvention of the wheel', leading to inconsistent quality, frustrated customers, and founder burnout. You'll be trapped in the day-to-day, unable to delegate or scale beyond your direct involvement. Conversely, a well-documented process creates a reliable operational machine that ensures consistent quality, delightful customer experiences, saves countless hours, and makes your business resilient, scalable, and highly attractive to future hires or investors.",
  "howToDoIt": "Think like an industrial engineer or a chef meticulously writing a recipe. Start from the exact moment a customer commits to an order or service and map every single step required until they receive and are satisfied with the final product or outcome. Consider the trigger for each step, who is responsible, what tools or resources are needed, and any critical decisions or checkpoints. Envision it as a detailed instruction manual for someone completely new to your business.",
  "whatToStartWith": "Choose your most popular or foundational product/service. Grab a pen and paper (or open a document) and outline the first 3-5 concrete steps someone would need to take to fulfill a single order or deliver that specific service, from initiation to completion, assuming they know nothing.",
  "premiumFeatures": [
    {
      "id": "ai-process-generator",
      "icon": "FileText",
      "label": "AI Process Blueprint Creator",
      "tagline": "Input your product/service and get a detailed step-by-step fulfillment checklist or service blueprint drafted instantly.",
      "cta": "Generate now"
    },
    {
      "id": "ai-knowledge-extractor",
      "icon": "Brain",
      "label": "AI Tacit Knowledge Unblocker",
      "tagline": "Answer prompts about your process, and AI will help you articulate and document the implicit steps and nuances still in your head.",
      "cta": "Start Interview"
    },
    {
      "id": "ai-optimization-suggester",
      "icon": "Zap",
      "label": "AI Process Optimizer",
      "tagline": "Upload your drafted process and receive AI-driven suggestions for efficiency, consistency, and potential bottlenecks.",
      "cta": "Analyze Process"
    }
  ]
},
  {
  "id": "price-1",
  "phase": 3,
  "phaseName": "Price",
  "order": 1,
  "title": "Calculate your true costs",
  "description": "Determine all direct and indirect expenses required to deliver your product or service, including the value of your own time.",
  "action": "Build a cost breakdown spreadsheet for your core offer. Include everything, including 30 minutes of your time at a rate you would actually accept.",
  "resources": [
    {
      "name": "Wave",
      "url": "https://www.waveapps.com",
      "affiliate": true,
      "description": "Free accounting software — track every cost from day one",
      "badge": "Free"
    },
    {
      "name": "QuickBooks",
      "url": "https://quickbooks.intuit.com",
      "affiliate": true,
      "description": "Industry standard for tracking costs and understanding margins"
    },
    {
      "name": "Notion",
      "url": "https://www.notion.so",
      "affiliate": true,
      "description": "Build a cost calculator and pricing model document"
    },
    {
      "name": "SCORE Startup Cost Calculator",
      "url": "https://www.score.org/resource/startup-costs-calculator",
      "description": "Free tool to estimate startup and operating costs",
      "badge": "Free"
    }
  ],
  "journalPrompt": "What does it actually cost me to deliver one unit of my product or service? Am I including my own time?",
  "whyItMatters": "Miscalculating your true costs is a silent killer for small businesses, leading to underpricing, exhausted margins, and ultimately, an unsustainable venture where you're busy but not profitable. Conversely, a precise understanding of your cost floor empowers you to price confidently, negotiate effectively, identify areas for efficiency, and ensure every sale contributes meaningfully to your bottom line, setting the stage for healthy growth and profitability.",
  "howToDoIt": "Adopt a 'Unit Economics' mindset. Break down every expense into two categories: 'Direct Costs' directly attributable to producing one unit (materials, direct labor, shipping) and 'Indirect Costs' (overhead, software subscriptions, marketing, utilities) that need to be allocated per unit. Don't forget to include the often-overlooked cost of your own time, valuing it as a professional service. This granular approach reveals your true 'Cost of Goods Sold' (COGS) per unit and helps allocate fixed overhead effectively.",
  "whatToStartWith": "Begin by listing every single expense, no matter how small, associated with your core product or service over a typical month or production cycle. Categorize them into direct materials, direct labor, and overhead. Then, determine how to allocate those overhead costs to a single unit. Crucially, estimate the specific time you personally invest in delivering one unit and assign a realistic hourly rate to that time.",
  "premiumFeatures": [
    {
      "id": "ai-cost-brainstorm",
      "icon": "Lightbulb",
      "label": "AI Cost Brainstormer",
      "tagline": "Generate a comprehensive list of potential direct and indirect costs relevant to your business type.",
      "cta": "Brainstorm Costs"
    },
    {
      "id": "ai-overhead-allocator",
      "icon": "Calculator",
      "label": "AI Overhead Allocator",
      "tagline": "Estimate and allocate monthly fixed overhead across your projected unit volume for accurate per-unit costs.",
      "cta": "Calculate Allocation"
    },
    {
      "id": "ai-time-valuation",
      "icon": "Clock",
      "label": "AI Time Valuation",
      "tagline": "Get a data-driven estimate for your professional hourly rate based on your skills, experience, and industry.",
      "cta": "Value My Time"
    }
  ]
},
  {
  "id": "price-2",
  "phase": 3,
  "phaseName": "Price",
  "order": 2,
  "title": "Research what competitors charge",
  "description": "Examine what the market is currently paying for solutions similar to yours to understand customer expectations and identify potential pricing gaps.",
  "action": "Find the pricing of 5 competitors and map them from cheapest to most expensive. Where does your offer fit and why?",
  "resources": [
    {
      "name": "Semrush",
      "url": "https://www.semrush.com",
      "affiliate": true,
      "description": "Research competitor positioning and who they are targeting",
      "badge": "Best for Research"
    },
    {
      "name": "SpyFu",
      "url": "https://www.spyfu.com",
      "affiliate": true,
      "description": "See competitors' paid keywords — often reveals their pricing strategy"
    },
    {
      "name": "Google Trends",
      "url": "https://trends.google.com",
      "description": "See how demand has shifted for your product category",
      "badge": "Free"
    }
  ],
  "journalPrompt": "Am I pricing based on what I think I am worth or what the market is actually paying? What is the most expensive option in my category and why do people pay for it?",
  "whyItMatters": "Getting your pricing wrong can be a costly mistake: underprice and you leave significant revenue on the table, potentially signaling lower quality; overprice and you risk deterring potential customers and struggling to gain market traction. Conversely, mastering your pricing strategy is a powerful lever for success. It allows you to maximize profitability, attract your ideal customer segment, reinforce your brand's perceived value, and strategically position your business for sustainable growth.",
  "howToDoIt": "Approach pricing research with a 'Value-Driven Competitive Analysis' mindset. Instead of simply copying competitor prices, seek to understand the *why* behind them. First, identify your direct and indirect competitors. Second, meticulously document their pricing models (e.g., hourly, flat fee, subscription, tiered), feature sets, and target audience. Third, analyze their perceived value and market positioning. Finally, map your unique value proposition against these findings, considering how your differentiators justify your price point, whether premium, value, or niche, and explore psychological pricing tactics to optimize perception.",
  "whatToStartWith": "List your top 5 direct competitors, their primary pricing structure, and the highest price point they offer, noting any premium features or benefits associated with that top tier.",
  "premiumFeatures": [
    {
      "id": "competitor-pricing-insights",
      "icon": "BarChart2",
      "label": "AI Competitor Pricing Insights",
      "tagline": "Get a detailed breakdown of competitor pricing models, feature sets, and market positioning across your industry.",
      "cta": "Analyze Competitors"
    },
    {
      "id": "pricing-model-generator",
      "icon": "PenTool",
      "label": "AI Pricing Model Generator",
      "tagline": "Receive data-backed recommendations for your optimal pricing strategy (e.g., freemium, tiered, subscription) based on market and value.",
      "cta": "Suggest Pricing Model"
    },
    {
      "id": "price-value-map",
      "icon": "LayoutDashboard",
      "label": "AI Price-Value Position Map",
      "tagline": "Visualize your offer's price vs. perceived value against key competitors to find your strategic sweet spot in the market.",
      "cta": "Create Map"
    }
  ]
},
  {
  "id": "price-3",
  "phase": 3,
  "phaseName": "Price",
  "order": 3,
  "title": "Set your price and create your offer structure",
  "description": "Choose your price based on cost, competition, and value, then structure your offer into 1-3 compelling tiers.",
  "action": "Set your prices, write out what each tier includes, and publish them somewhere — even if just in a document for now.",
  "resources": [
    {
      "name": "HoneyBook",
      "url": "https://www.honeybook.com",
      "affiliate": true,
      "description": "Build beautiful pricing packages and send proposals in minutes",
      "badge": "Best for Services"
    },
    {
      "name": "Bonsai",
      "url": "https://www.hellobonsai.com",
      "affiliate": true,
      "description": "Create and send professional proposals with built-in e-signature"
    },
    {
      "name": "Canva",
      "url": "https://www.canva.com",
      "affiliate": true,
      "description": "Design a beautiful pricing menu or rate card"
    },
    {
      "name": "SCORE Pricing Guide",
      "url": "https://www.score.org/resource/how-price-your-products",
      "description": "Free pricing strategy guide from SCORE mentors",
      "badge": "Free"
    }
  ],
  "journalPrompt": "Did I flinch when I wrote my price down? If yes, that is the price. Why do I feel I am not worth it?",
  "whyItMatters": "Getting your pricing wrong can be a death sentence for a new business, leading to under-earning, cash flow issues, or alienating potential customers. The right price, however, isn't just about covering costs; it's a powerful statement of your value, attracting ideal clients, maximizing profitability, and creating the financial runway needed for growth.",
  "howToDoIt": "Think of pricing as a three-legged stool: one leg is your 'cost floor' (what you need to make to survive), the second is the 'competitive ceiling' (what the market bears and your competitors charge), and the third, most important leg, is your 'value delivered' (what unique benefits and transformations you provide). Use these to find your sweet spot, then package your offerings into 1-3 tiers – a budget-friendly entry, your desired core offer, and a premium option – to cater to different customer needs and willingness to pay.",
  "whatToStartWith": "Based on your research and value proposition, write down the exact prices for each of your offer tiers. Don't second-guess yourself yet; just commit them to paper or a digital document.",
  "premiumFeatures": [
    {
      "id": "ai-competitor-price-scanner",
      "icon": "BarChart2",
      "label": "AI Competitor Price Scanner",
      "tagline": "Scrapes competitor websites and compiles a comprehensive pricing comparison report for your industry.",
      "cta": "Generate now"
    },
    {
      "id": "ai-value-proposition-enhancer",
      "icon": "Sparkles",
      "label": "AI Value Proposition Enhancer",
      "tagline": "Refines your service descriptions and benefits to powerfully justify your premium pricing.",
      "cta": "Enhance now"
    },
    {
      "id": "ai-tiered-offer-architect",
      "icon": "LayoutDashboard",
      "label": "AI Tiered Offer Architect",
      "tagline": "Generates 3 compelling offer tiers with suggested names, inclusions, and price points based on your target customer.",
      "cta": "Design tiers"
    }
  ]
},
  {
  "id": "price-4",
  "phase": 3,
  "phaseName": "Price",
  "order": 4,
  "title": "Set up invoicing and accept your first payment",
  "description": "Choose how you will send invoices, collect payments, and conduct a test transaction to ensure smooth operations.",
  "action": "Set up invoicing software, create a test invoice, and run a $1 test transaction through your payment processor.",
  "resources": [
    {
      "name": "Stripe",
      "url": "https://stripe.com",
      "description": "The best online payment processor — create a payment link in 2 minutes",
      "badge": "Best for Online"
    },
    {
      "name": "Square",
      "url": "https://squareup.com",
      "affiliate": true,
      "description": "In-person and online payments with free card reader",
      "badge": "Best In-Person"
    },
    {
      "name": "Wave",
      "url": "https://www.waveapps.com",
      "affiliate": true,
      "description": "Free invoicing and payment collection — no monthly fee",
      "badge": "Free"
    },
    {
      "name": "FreshBooks",
      "url": "https://www.freshbooks.com",
      "affiliate": true,
      "description": "Professional invoicing with automatic payment reminders"
    },
    {
      "name": "Lemon Squeezy",
      "url": "https://www.lemonsqueezy.com",
      "affiliate": true,
      "description": "Sell digital products and subscriptions with built-in tax compliance"
    },
    {
      "name": "PayPal Business",
      "url": "https://www.paypal.com/us/business",
      "description": "Widely trusted — your customers already have an account"
    }
  ],
  "journalPrompt": "Have I received a payment in my business account yet? What did it feel like?",
  "whyItMatters": "Missing this step can lead to cash flow nightmares, lost revenue due to payment issues, and a tarnished professional image, ultimately crippling your business before it even starts. Conversely, setting up robust, efficient payment systems from day one ensures steady cash flow, accurate financial tracking, delighted customers, and the peace of mind to focus on growing your business.",
  "howToDoIt": "Adopt the 'Payment Pipeline Protocol' framework. First, identify your specific invoicing and payment collection needs (e.g., recurring payments, one-time services, e-commerce). Second, research and select a compatible invoicing software and payment processor. Third, meticulously configure and integrate these systems. Fourth, critically, perform multiple test transactions to trace the payment journey from invoice generation to funds landing in your business account. Finally, automate reminders and set up monitoring for incoming payments to maintain healthy cash flow.",
  "whatToStartWith": "Begin by sending yourself a test invoice for a nominal amount (e.g., $1) using your chosen invoicing software, and then process that payment through your selected payment processor. Track this test transaction all the way to your business bank account.",
  "premiumFeatures": [
    {
      "id": "ai-invoicing-compare",
      "icon": "Scale",
      "label": "AI Invoicing & Payment Processor Recommender",
      "tagline": "Get personalized recommendations for invoicing software and payment gateways tailored to your business model and volume.",
      "cta": "Find my perfect match"
    },
    {
      "id": "ai-invoice-template",
      "icon": "FileText",
      "label": "AI Branded Invoice Template Generator",
      "tagline": "Generate professional, legally compliant invoice templates with your branding, services, and specific business details.",
      "cta": "Create my template"
    },
    {
      "id": "ai-payment-auditor",
      "icon": "Zap",
      "label": "AI Payment Flow Auditor",
      "tagline": "Simulate your entire payment process end-to-end to identify potential bottlenecks and suggest optimizations for faster payments.",
      "cta": "Audit my flow"
    }
  ]
},
  {
  "id": "form-1",
  "phase": 4,
  "phaseName": "Form",
  "order": 1,
  "title": "Choose your legal structure",
  "description": "Choosing your legal structure, like LLC or sole proprietorship, fundamentally impacts your liability, taxation, and administrative burden.",
  "action": "Research LLC vs sole proprietorship for your state and decide which structure fits your situation.",
  "resources": [
    {
      "name": "ZenBusiness",
      "url": "https://www.zenbusiness.com",
      "affiliate": true,
      "description": "Fast, affordable LLC formation with registered agent included",
      "badge": "Most Popular"
    },
    {
      "name": "Bizee",
      "url": "https://www.bizee.com",
      "affiliate": true,
      "description": "Free LLC formation — pay only state fees. Registered agent free for 1 year",
      "badge": "Best Free Option"
    },
    {
      "name": "Northwest Registered Agent",
      "url": "https://www.northwestregisteredagent.com",
      "affiliate": true,
      "description": "Privacy-first formation with strong customer support"
    },
    {
      "name": "Stripe Atlas",
      "url": "https://stripe.com/atlas",
      "affiliate": true,
      "description": "Delaware C-Corp + banking + AWS credits — for venture-backed startups",
      "badge": "Best for Startups"
    },
    {
      "name": "IRS Business Structures",
      "url": "https://www.irs.gov/businesses/small-businesses-self-employed/business-structures",
      "description": "Official IRS guide to entity types and tax implications",
      "badge": "Free"
    }
  ],
  "journalPrompt": "Which legal structure did I choose for my business and why? Did my decision account for liability, taxation, and potential future fundraising or growth needs?",
  "whyItMatters": "Getting your legal structure wrong can expose your personal assets to business liabilities, lead to unnecessary tax burdens, and create administrative headaches down the line, potentially costing thousands in legal and accounting fees; conversely, choosing wisely from the start provides robust personal asset protection, optimizes your tax situation, and streamlines future growth or fundraising efforts.",
  "howToDoIt": "*(Disclaimer: We are an educational platform, not a law or accounting firm. This is not legal or tax advice.)*\n\nApproach this decision by weighing liability protection, tax implications, and administrative burden. If operating within the US, pay close attention to state-specific nuances. For example, forming in Delaware or Wyoming is popular for startups seeking anonymity or favorable corporate laws, but if you primarily operate in California or New York, you may still have to pay foreign entity registration fees in your home state (often negating the tax benefits of incorporating out-of-state). If you are an international founder launching globally, forming a US LLC (like a Delaware or Wyoming LLC) or exploring international hubs like Estonia's E-Residency or the UK LTD structure are common routes that provide digital flexibility.",
  "whatToStartWith": "Perform a focused comparison of an LLC versus a Sole Proprietorship in your specific home state or country. Look up your state/country's specific annual franchise tax and filing fees before paying for any formation service.",
  "premiumFeatures": [
    {
      "id": "legal-structure-recommender",
      "icon": "Balance",
      "label": "AI Legal Structure Recommender",
      "tagline": "Receive a tailored recommendation for your legal structure based on your business type, state, and financial goals.",
      "cta": "Get Recommendation"
    },
    {
      "id": "state-comparison-report",
      "icon": "FileText",
      "label": "State-Specific Comparison Report",
      "tagline": "Generate a comprehensive report comparing Sole Proprietorship vs. LLC for your specific state, covering tax, liability, and compliance details.",
      "cta": "Generate Report"
    },
    {
      "id": "tax-liability-snapshot",
      "icon": "Shield",
      "label": "AI Tax & Liability Snapshot",
      "tagline": "Get a quick overview of the tax implications and liability protection provided by your chosen legal structure for your projected income.",
      "cta": "Get Snapshot"
    }
  ]
},
  {
  "id": "form-2",
  "phase": 4,
  "phaseName": "Form",
  "order": 2,
  "title": "Register your business name",
  "description": "Confirm your desired business name's legal availability and secure its matching domain name to establish a consistent brand identity.",
  "action": "Search your state's business name database and confirm the .com domain is available at the same time.",
  "resources": [
    {
      "name": "Namecheap",
      "url": "https://www.namecheap.com",
      "affiliate": true,
      "description": "Check domain availability and register your .com with free WHOIS privacy",
      "badge": "Best Value"
    },
    {
      "name": "Porkbun",
      "url": "https://porkbun.com",
      "affiliate": true,
      "description": "Often the cheapest registrar — free privacy protection included"
    },
    {
      "name": "Namechk",
      "url": "https://namechk.com",
      "description": "Check username availability across 100+ social platforms at once",
      "badge": "Free"
    },
    {
      "name": "SBA Name Search Guide",
      "url": "https://www.sba.gov/business-guide/launch-your-business/register-your-business",
      "description": "SBA guide with links to all 50 state business registries",
      "badge": "Free"
    }
  ],
  "journalPrompt": "Is my business name available everywhere I need it — legal, domain, and social? Does it still feel right?",
  "whyItMatters": "Your business name is the cornerstone of your brand and legal entity. Getting it wrong can lead to costly rebranding, legal disputes, customer confusion, and a fragmented online presence. A well-chosen, available name, however, provides instant credibility, simplifies marketing, protects your intellectual property, and ensures a cohesive brand across all touchpoints, laying a strong foundation for future growth and recognition.",
  "howToDoIt": "Think of your business name selection as a multi-layered validation process. Start by brainstorming names that embody your brand's essence and values. Then, systematically check for availability across three crucial layers: first, state/federal legal registries (e.g., Secretary of State, USPTO for trademarks if applicable); second, domain name registrars (prioritizing .com); and third, key social media platforms. The goal is not just a legally available name, but one that resonates and can be consistently used everywhere your audience might look for you.",
  "whatToStartWith": "Begin by listing your top 3-5 potential business names. For each, open separate browser tabs and simultaneously search your state's business registry, a reputable domain registrar, and the user search function on your primary social media platforms.",
  "premiumFeatures": [
    {
      "id": "ai-multi-platform-scan",
      "icon": "Search",
      "label": "AI Multi-Platform Availability Scan",
      "tagline": "Instantly check your desired business name across legal registries, domain names, and key social media platforms.",
      "cta": "Scan now"
    },
    {
      "id": "ai-brand-name-generator",
      "icon": "Lightbulb",
      "label": "AI Brand Name Generator",
      "tagline": "Input your business idea and get creative, memorable, and available name suggestions tailored to your brand.",
      "cta": "Generate names"
    }
  ]
},
  {
  "id": "form-3",
  "phase": 4,
  "phaseName": "Form",
  "order": 3,
  "title": "File your formation documents",
  "description": "Submit your Articles of Organization (LLC) or Articles of Incorporation to your state — either yourself or through a specialized formation service.",
  "action": "File your formation documents with your state — DIY or through a service. Save all confirmation documents.",
  "resources": [
    {
      "name": "ZenBusiness",
      "url": "https://www.zenbusiness.com/llc",
      "affiliate": true,
      "description": "LLC formation from $0 + state fees — fast turnaround",
      "badge": "Most Popular"
    },
    {
      "name": "Bizee",
      "url": "https://www.bizee.com",
      "affiliate": true,
      "description": "Free filing + registered agent for 1 year",
      "badge": "Best Value"
    },
    {
      "name": "Northeast Registered Agents",
      "url": "https://www.northeastregisteredagent.com",
      "affiliate": true,
      "description": "Privacy-focused formation service with strong registered agent"
    },
    {
      "name": "LegalZoom",
      "url": "https://www.legalzoom.com",
      "affiliate": true,
      "description": "Well-known legal formation with optional attorney access"
    },
    {
      "name": "Harbor Compliance",
      "url": "https://www.harborcompliance.com",
      "affiliate": true,
      "description": "Compliance experts for complex multi-state formations",
      "badge": "Best for Compliance"
    }
  ],
  "journalPrompt": "I just filed my business formation. What feels different now that it is official?",
  "whyItMatters": "Getting this wrong leaves your personal assets vulnerable to business debts and lawsuits, and without official status, you can't legally open business bank accounts, sign contracts, or secure funding. Getting it right creates a legally recognized shield for your personal finances, establishes credibility, unlocks access to business banking and capital, and lays the essential foundation for all future legitimate operations.",
  "howToDoIt": "Think of this as giving your business its official birth certificate. First, verify your chosen entity type (LLC/Corp) and research your state's specific requirements, including forms, fees, and the need for a registered agent. Decide whether you'll handle the submission yourself via the state's website or leverage a formation service for convenience and expertise. Carefully complete and submit the necessary Articles of Organization or Incorporation, ensuring all information is accurate to avoid delays. Finally, pay the required state fees and patiently await your official confirmation documents.",
  "whatToStartWith": "Once your state officially approves your formation documents, take a moment to download and save the digital confirmation, print a physical copy for your records, and then physically hold that official document in your hands.",
  "premiumFeatures": [
    {
      "id": "ai-filing-guide",
      "icon": "FileText",
      "label": "AI State Filing Navigator",
      "tagline": "Get a personalized, step-by-step guide for filing your specific business entity in your state, including direct links to forms and fees.",
      "cta": "Generate Guide"
    },
    {
      "id": "ai-registered-agent",
      "icon": "Contact",
      "label": "AI Registered Agent Matchmaker",
      "tagline": "Find and compare top-rated registered agent services tailored to your state and business needs in minutes.",
      "cta": "Find Agent"
    },
    {
      "id": "ai-name-availability",
      "icon": "Search",
      "label": "AI Business Name Availability",
      "tagline": "Quickly check your desired business name's availability across state registers and receive suggestions if it's taken.",
      "cta": "Check Name"
    }
  ]
},
  {
  "id": "form-4",
  "phase": 4,
  "phaseName": "Form",
  "order": 4,
  "title": "Get your EIN",
  "description": "Apply for your free Employer Identification Number (EIN) from the IRS online, a quick process essential for your business's legal and financial operations.",
  "action": "Apply for your EIN at irs.gov right now. Save the confirmation letter as a PDF.",
  "resources": [
    {
      "name": "IRS EIN Application",
      "url": "https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online",
      "description": "Free, instant EIN from the IRS — 5 minutes online",
      "badge": "Free"
    },
    {
      "name": "ZenBusiness",
      "url": "https://www.zenbusiness.com",
      "affiliate": true,
      "description": "Will obtain your EIN for you as part of their formation packages"
    }
  ],
  "journalPrompt": "I have my EIN. What does it mean for my business to have a tax ID number of its own?",
  "whyItMatters": "Delaying or omitting your EIN can halt critical operations like opening business bank accounts, signing vendor contracts, hiring employees, and filing taxes, potentially leading to operational standstill, missed opportunities, and even penalties. More importantly, it blurs the lines between your personal and business finances, eroding personal liability protection. Obtaining your EIN establishes your business as a separate legal entity in the eyes of the IRS, unlocking access to business banking, credit, legitimate vendor relationships, and the ability to grow, fundamentally protecting your personal assets and legitimizing your venture.",
  "howToDoIt": "Think of the EIN as your business's unique Social Security Number – it's a critical identifier that formally separates your business from you personally for tax and legal purposes. The mental model is to approach this directly: understand that *you* are empowering your business with its distinct identity. The process is straightforward, requiring you to answer basic questions about your business structure and purpose directly on the IRS website. Do not overcomplicate it or pay a third party; empower your business yourself.",
  "whatToStartWith": "Go to the IRS website (irs.gov/ein) and navigate to the online EIN application for sole proprietors, partnerships, or corporations. Carefully complete the questions, ensuring accuracy regarding your business entity type and purpose, then submit your application to receive your EIN immediately and save the confirmation letter as a PDF.",
  "premiumFeatures": [
    {
      "id": "ein-entity-advisor",
      "icon": "Lightbulb",
      "label": "AI Entity Type Advisor",
      "tagline": "Unsure of your business structure? Get clarity on the best entity type for your EIN application and future growth.",
      "cta": "Clarify my entity"
    },
    {
      "id": "ein-document-manager",
      "icon": "FileText",
      "label": "AI Critical Document Organizer",
      "tagline": "Automatically categorize and suggest a secure digital filing system for your EIN confirmation and other vital launch documents.",
      "cta": "Organize my docs"
    },
    {
      "id": "ein-action-plan",
      "icon": "LayoutDashboard",
      "label": "AI Post-EIN Action Planner",
      "tagline": "Generate a personalized checklist of immediate next steps and compliance actions now that you have your business's tax ID.",
      "cta": "Plan my next steps"
    }
  ]
},
  {
  "id": "form-5",
  "phase": 4,
  "phaseName": "Form",
  "order": 5,
  "title": "Get your licenses and permits",
  "description": "Most businesses require general or industry-specific licenses and local permits, with requirements varying by location and business type.",
  "action": "Check your state and city requirements using the SBA tool. Apply for every required license before you start operating.",
  "resources": [
    {
      "name": "SBA License & Permit Tool",
      "url": "https://www.sba.gov/business-guide/launch-your-business/apply-licenses-permits",
      "description": "Find required licenses by state and industry type",
      "badge": "Free"
    },
    {
      "name": "Harbor Compliance",
      "url": "https://www.harborcompliance.com",
      "affiliate": true,
      "description": "Compliance experts handle all license research and applications for you",
      "badge": "Best for Compliance"
    },
    {
      "name": "ZenBusiness",
      "url": "https://www.zenbusiness.com",
      "affiliate": true,
      "description": "Includes compliance alerts to keep your license status current"
    }
  ],
  "journalPrompt": "Do I have every license I need to legally operate? What happens if I am audited?",
  "whyItMatters": "Operating without the necessary licenses and permits can lead to severe penalties, including hefty fines, legal injunctions, forced business closure, and significant damage to your reputation and personal liability. Conversely, meticulously securing all required authorizations ensures legal compliance, grants peace of mind, protects your personal assets, and builds a solid, credible foundation for sustainable growth and future opportunities.",
  "howToDoIt": "Adopt a 'Compliance Funnel' approach: Start by clearly defining your business type, activities, and precise location. Then, systematically research requirements from the broadest level (federal, if applicable) down through state, county, and city regulations, and finally, industry-specific licenses. Think of it as peeling an onion – each layer reveals more specific requirements. Proactively identify all potential authorities (e.g., Secretary of State, Department of Revenue, local planning departments, professional boards) and confirm exactly what applies to your unique business model.",
  "whatToStartWith": "Begin by visiting the SBA website's 'State & Local Business Licenses & Permits' section or your state's official business portal to compile an initial checklist of potential licenses and permits based on your business type and location.",
  "premiumFeatures": [
    {
      "id": "ai-license-generator",
      "icon": "FileText",
      "label": "AI License & Permit Generator",
      "tagline": "Get a customized report detailing all federal, state, and local licenses and permits specific to your business type, activities, and location.",
      "cta": "Generate My List"
    },
    {
      "id": "ai-compliance-auditor",
      "icon": "ClipboardCheck",
      "label": "AI Compliance Gap Analysis",
      "tagline": "Upload your proposed business activities and existing licenses for an AI-powered review to identify any missing permits or potential compliance risks.",
      "cta": "Analyze My Compliance"
    },
    {
      "id": "ai-authority-contacts",
      "icon": "Mail",
      "label": "AI Licensing Office Contact Finder",
      "tagline": "Receive a curated list of direct contact information and application portals for all relevant licensing authorities in your area.",
      "cta": "Get Contact Info"
    }
  ]
},
  {
  "id": "form-6",
  "phase": 4,
  "phaseName": "Form",
  "order": 6,
  "title": "Draft your operating agreement",
  "description": "An operating agreement defines how your LLC is run, covering ownership, decision-making, profit distribution, and what happens if a partner exits.",
  "action": "Draft and sign an operating agreement and file it with your business records.",
  "resources": [
    {
      "name": "ZenBusiness",
      "url": "https://www.zenbusiness.com",
      "affiliate": true,
      "description": "Operating agreement included in most formation packages",
      "badge": "Easiest"
    },
    {
      "name": "Rocket Lawyer",
      "url": "https://www.rocketlawyer.com",
      "affiliate": true,
      "description": "Attorney-reviewed operating agreement with ongoing legal Q&A"
    },
    {
      "name": "LegalZoom",
      "url": "https://www.legalzoom.com",
      "affiliate": true,
      "description": "Custom operating agreement with optional attorney review"
    },
    {
      "name": "NOLO Guide",
      "url": "https://www.nolo.com/legal-encyclopedia/llc-operating-agreements.html",
      "description": "Free plain-English guide to what your operating agreement needs",
      "badge": "Free"
    }
  ],
  "journalPrompt": "Does my operating agreement reflect how I actually want this business to work? What would happen if my partner and I disagreed tomorrow?",
  "whyItMatters": "Getting this wrong can lead to crippling legal disputes, business paralysis, and even dissolution if partners disagree, costing you financially and emotionally. Getting it right provides a clear roadmap for your business, prevents conflicts before they start, protects your personal assets, clarifies roles, and ensures continuity and stability, making your business more attractive to investors and smoother to operate.",
  "howToDoIt": "Approach your operating agreement as your business's pre-nuptial agreement. It's a strategic blueprint to anticipate future scenarios – from disagreements on major decisions to a partner wanting to exit – and proactively define how your business will respond. Focus on clarity, fairness, and pragmatism, not just legal compliance.",
  "whatToStartWith": "Before diving into specific clauses, sit down and envision the five biggest potential disagreements or operational challenges your business might face in the next 3-5 years (e.g., profit distribution, partner exiting, major investment dispute).",
  "premiumFeatures": [
    {
      "id": "oa-draft-assist",
      "icon": "FileText",
      "label": "AI Operating Agreement Draft Assistant",
      "tagline": "Generates a tailored initial draft of your operating agreement based on your business structure and key preferences.",
      "cta": "Generate now"
    },
    {
      "id": "oa-conflict-simulator",
      "icon": "Zap",
      "label": "AI Partnership Conflict Simulator",
      "tagline": "Input potential disagreement scenarios and receive insights on how your draft OA addresses them, or suggest improvements.",
      "cta": "Simulate conflicts"
    }
  ]
},
  {
  "id": "finance-1",
  "phase": 5,
  "phaseName": "Finance",
  "order": 1,
  "title": "Open a business bank account",
  "description": "Safeguard your business's legal standing and simplify financial management by establishing a dedicated business bank account before any transactions occur.",
  "action": "Open a dedicated business checking account using your EIN and formation documents.",
  "resources": [
    {
      "name": "Mercury",
      "url": "https://mercury.com",
      "affiliate": true,
      "description": "Modern business banking with no fees and no minimums — built for startups",
      "badge": "Best for Startups"
    },
    {
      "name": "Relay",
      "url": "https://relayfi.com",
      "affiliate": true,
      "description": "Free business banking with smart spending envelopes and team cards"
    },
    {
      "name": "Bluevine",
      "url": "https://www.bluevine.com",
      "affiliate": true,
      "description": "Business checking with interest on your balance + line of credit access"
    },
    {
      "name": "Novo",
      "url": "https://www.novo.co",
      "affiliate": true,
      "description": "Fee-free checking built for freelancers and small business owners",
      "badge": "Best for Freelancers"
    },
    {
      "name": "Lili",
      "url": "https://www.lili.co",
      "affiliate": true,
      "description": "Banking + automatic tax savings built for self-employed founders"
    },
    {
      "name": "Grasshopper Bank",
      "url": "https://www.grasshopper.bank",
      "affiliate": true,
      "description": "High-yield business checking with 2% APY on all balances"
    }
  ],
  "journalPrompt": "Reflect: Have I completely separated my business and personal finances? What specific costs (time, money, legal risk) could I incur if these were mixed at tax time?",
  "whyItMatters": "Failing to separate personal and business finances can pierce your LLC's corporate veil, exposing personal assets to business liabilities and turning tax season into an expensive, audit-prone nightmare. Conversely, establishing clear financial boundaries from day one protects your personal wealth, streamlines accounting, simplifies tax preparation, and builds a credible financial foundation essential for securing future funding and demonstrating professionalism.",
  "howToDoIt": "Adopt the 'Two Wallets' mental model: view your business as a completely separate financial entity from yourself. Every dollar spent or earned must clearly flow into or out of its designated 'wallet,' ensuring zero commingling. This isn't just about compliance; it's about building robust financial hygiene that supports growth and resilience.",
  "whatToStartWith": "Before visiting a bank, review your current financial setup to identify any immediate areas where personal and business funds might already be mixing, or where they could potentially mix.",
  "premiumFeatures": [
    {
      "id": "ai-bank-account-navigator",
      "icon": "Banknote",
      "label": "AI Bank Account Navigator",
      "tagline": "Receive personalized bank recommendations and a tailored document checklist for your business entity type and location.",
      "cta": "Generate now"
    },
    {
      "id": "ai-corporate-veil-advisor",
      "icon": "ShieldCheck",
      "label": "AI Corporate Veil Risk Advisor",
      "tagline": "Assess your financial practices with AI to identify potential commingling risks that could pierce your corporate veil.",
      "cta": "Run Assessment"
    }
  ]
},
  {
  "id": "finance-2",
  "phase": 5,
  "phaseName": "Finance",
  "order": 2,
  "title": "Set up accounting software",
  "description": "Set up your accounting software, connect your business bank account, and ensure every transaction is tracked from day one.",
  "action": "Sign up for accounting software, connect your business bank account, and categorize your first transaction.",
  "resources": [
    {
      "name": "QuickBooks",
      "url": "https://quickbooks.intuit.com",
      "affiliate": true,
      "description": "Industry standard small business accounting with payroll integration",
      "badge": "Most Popular"
    },
    {
      "name": "Wave",
      "url": "https://www.waveapps.com",
      "affiliate": true,
      "description": "Completely free accounting for small businesses",
      "badge": "Free"
    },
    {
      "name": "FreshBooks",
      "url": "https://www.freshbooks.com",
      "affiliate": true,
      "description": "Easy invoicing, expense tracking, and time billing"
    },
    {
      "name": "Bench",
      "url": "https://bench.co",
      "affiliate": true,
      "description": "Dedicated bookkeeper + software — never do your own books again",
      "badge": "Best Full-Service"
    },
    {
      "name": "Keeper",
      "url": "https://www.keepertax.com",
      "affiliate": true,
      "description": "AI finds your write-offs and files your taxes — built for the self-employed"
    }
  ],
  "journalPrompt": "Are my finances being tracked from the first dollar? Could I tell someone my profit margin right now?",
  "whyItMatters": "Neglecting proper accounting from the start can lead to hundreds of hours of painful reconciliation, missed tax deductions, potential penalties, and a complete lack of insight into your business's true financial health. Getting it right provides immediate financial clarity, simplifies tax season, empowers informed decision-making, and gives you peace of mind knowing your business's pulse.",
  "howToDoIt": "Adopt the 'First Dollar In, First Dollar Tracked' mindset: before any money moves (in or out), your system should be ready to capture it. Think of your accounting software as your business's nervous system, linking every financial action to its proper place. The framework is 'Select, Connect, Categorize, Review' – choose a simple tool, link your bank, tag transactions immediately, and regularly review your reports.",
  "whatToStartWith": "Sign up for your chosen accounting software, connect your dedicated business bank account, and categorize even a single initial transaction (like your first founder's contribution or a small software subscription) to establish the tracking process.",
  "premiumFeatures": [
    {
      "id": "accounting-software-match",
      "icon": "Zap",
      "label": "AI Accounting Software Matchmaker",
      "tagline": "Input your business type and needs, and AI recommends the perfect accounting software for you.",
      "cta": "Find my software"
    },
    {
      "id": "chart-of-accounts-gen",
      "icon": "FileText",
      "label": "AI Chart of Accounts Generator",
      "tagline": "Automatically generate a foundational chart of accounts tailored to your industry and business structure.",
      "cta": "Generate chart"
    },
    {
      "id": "transaction-categorizer",
      "icon": "LayoutDashboard",
      "label": "AI First Transaction Reviewer",
      "tagline": "AI reviews your initial categorized transactions and suggests improvements for accuracy and consistency.",
      "cta": "Review my transactions"
    }
  ]
},
  {
  "id": "finance-3",
  "phase": 5,
  "phaseName": "Finance",
  "order": 3,
  "title": "Get a business credit card",
  "description": "A business credit card separates expenses, earns rewards, and builds business credit history, and applying requires your EIN and business bank account.",
  "action": "Apply for a business credit card that matches your spending pattern and spending volume.",
  "resources": [
    {
      "name": "Brex",
      "url": "https://www.brex.com",
      "affiliate": true,
      "description": "No personal guarantee required — built for startups. 7x points on rideshare",
      "badge": "Best for Startups"
    },
    {
      "name": "Ramp",
      "url": "https://ramp.com",
      "affiliate": true,
      "description": "1.5% cashback on everything with AI-powered spend controls",
      "badge": "Best Cashback"
    },
    {
      "name": "Divvy (BILL)",
      "url": "https://www.bill.com/product/divvy",
      "affiliate": true,
      "description": "Free expense management + virtual cards + rewards up to 7x"
    },
    {
      "name": "Capital One Spark Cash",
      "url": "https://www.capitalone.com/small-business/credit-cards/spark-cash-select/",
      "affiliate": true,
      "description": "2% unlimited cashback — simple and reliable for any spend level"
    },
    {
      "name": "Chase Ink Business Cash",
      "url": "https://creditcards.chase.com/business-credit-cards/ink",
      "affiliate": true,
      "description": "5% at office stores, internet and cable. $750 welcome offer"
    },
    {
      "name": "Amex Blue Business Cash",
      "url": "https://www.americanexpress.com/us/credit-cards/business/",
      "affiliate": true,
      "description": "2% cashback up to $50K/year plus Amex business benefits"
    }
  ],
  "journalPrompt": "Which card makes the most sense for how I will spend in the first year? Have I applied?",
  "whyItMatters": "Getting this wrong means commingling personal and business finances, complicating taxes, potentially jeopardizing personal assets, and failing to build crucial business credit, making future financing harder. Getting it right provides clear financial separation, streamlines accounting, maximizes reward earnings, protects personal assets, and establishes a strong business credit profile, paving the way for easier access to larger capital as your business grows.",
  "howToDoIt": "Approach this by first assessing your anticipated monthly business spending and identifying your primary expense categories. Next, research business credit cards, prioritizing those that offer the best rewards or cash back in your high-spend areas, along with favorable terms like low annual fees or introductory APRs. Finally, consider whether you prefer a card with no personal guarantee to further separate liabilities, ensuring you meet the issuer's basic requirements (like EIN and business bank account) before applying.",
  "whatToStartWith": "List out your projected top three spending categories and estimated monthly business expenses for the next 12 months.",
  "premiumFeatures": [
    {
      "id": "card-recommender",
      "icon": "CreditCard",
      "label": "AI Credit Card Recommender",
      "tagline": "Get personalized recommendations for business credit cards based on your projected spending and business type.",
      "cta": "Compare cards"
    },
    {
      "id": "eligibility-analyzer",
      "icon": "CheckSquare",
      "label": "AI Eligibility Analyzer",
      "tagline": "Instantly check your business and personal eligibility for various credit cards without impacting your credit score.",
      "cta": "Check eligibility"
    },
    {
      "id": "credit-builder-plan",
      "icon": "BarChart2",
      "label": "AI Business Credit Builder Plan",
      "tagline": "Generate a custom strategy for rapidly establishing and improving your business credit profile with your new card.",
      "cta": "Build my plan"
    }
  ]
},
  {
  "id": "finance-4",
  "phase": 5,
  "phaseName": "Finance",
  "order": 4,
  "title": "Build your business credit",
  "description": "Establish a strong, independent business credit profile by securing a D-U-N-S number, opening net-30 vendor accounts, and actively monitoring your score.",
  "action": "Register for a free D-U-N-S number, sign up for Nav to monitor your score, and open one net-30 vendor account.",
  "resources": [
    {
      "name": "Nav",
      "url": "https://www.nav.com",
      "affiliate": true,
      "description": "Monitor your business credit score and find the best financing options",
      "badge": "Best for Credit Monitoring"
    },
    {
      "name": "D&B D-U-N-S Registration",
      "url": "https://www.dnb.com/duns-number/get-a-duns.html",
      "description": "Free D-U-N-S number — required by vendors, lenders, and government contracts",
      "badge": "Free"
    },
    {
      "name": "Quill",
      "url": "https://www.quill.com",
      "affiliate": true,
      "description": "Office supplies on net-30 terms — reports to D&B and Experian Business"
    },
    {
      "name": "Uline",
      "url": "https://www.uline.com",
      "affiliate": true,
      "description": "Shipping and packaging on net-30 — one of the fastest trade credit reporters"
    },
    {
      "name": "Grainger",
      "url": "https://www.grainger.com",
      "affiliate": true,
      "description": "Industrial and business supply on net-30 — builds your PAYDEX score"
    }
  ],
  "journalPrompt": "What is my current business credit score (or what is the status of my profile if new)? What realistically will it be in 90 days if I diligently follow the plan to register, monitor, and open accounts?",
  "whyItMatters": "Ignoring business credit means relying on personal guarantees for loans, tying up your personal assets, and paying higher interest rates, severely limiting your growth potential. A strong business credit profile unlocks access to larger funding, better terms, and vendor credit lines, enabling your business to scale independently and minimize personal financial risk.",
  "howToDoIt": "Think of building business credit as cultivating a distinct financial identity for your company, separate from your personal finances. It's a three-phase process: first, establish your business's core identity (D-U-N-S); second, build tradelines by consistently using and paying net-30 vendor accounts; and third, diligently monitor your progress to ensure accuracy and identify opportunities for improvement.",
  "whatToStartWith": "Your very first step is to register for a free D-U-N-S number, as it's foundational for establishing your business's credit identity. Once you have it, sign up for a service like Nav to get an initial snapshot of your credit profile, even if it's currently thin.",
  "premiumFeatures": [
    {
      "id": "ai-duns-navigator",
      "icon": "FileText",
      "label": "AI D-U-N-S Navigator",
      "tagline": "Step-by-step guidance to successfully secure your crucial D-U-N-S number.",
      "cta": "Generate now"
    },
    {
      "id": "ai-net30-recommender",
      "icon": "Link",
      "label": "AI Net-30 Vendor Recommender",
      "tagline": "Discover ideal net-30 vendors to quickly build your business credit tradelines.",
      "cta": "Generate now"
    },
    {
      "id": "ai-credit-roadmap",
      "icon": "Map",
      "label": "AI Credit Building Roadmap",
      "tagline": "Receive a tailored 90-day roadmap to strategically elevate your business credit score.",
      "cta": "Generate now"
    }
  ]
},
  {
  "id": "finance-5",
  "phase": 5,
  "phaseName": "Finance",
  "order": 5,
  "title": "Understand your tax obligations",
  "description": "Understand your tax obligations including quarterly estimated taxes, sales tax, and deductible expenses to avoid penalties and maximize savings.",
  "action": "Research your state's sales tax requirements, set up quarterly tax reminders, and put 25-30% of every payment into a dedicated tax savings account.",
  "resources": [
    {
      "name": "Bench",
      "url": "https://bench.co",
      "affiliate": true,
      "description": "Bookkeeping + year-end tax filing handled for you",
      "badge": "Best Full-Service"
    },
    {
      "name": "Keeper",
      "url": "https://www.keepertax.com",
      "affiliate": true,
      "description": "AI finds write-offs automatically and prepares your return"
    },
    {
      "name": "1-800Accountant",
      "url": "https://1800accountant.com",
      "affiliate": true,
      "description": "CPA-backed small business tax and bookkeeping services"
    },
    {
      "name": "IRS Small Business Tax Center",
      "url": "https://www.irs.gov/businesses/small-businesses-self-employed",
      "description": "Official IRS small business tax guide and quarterly payment portal",
      "badge": "Free"
    }
  ],
  "journalPrompt": "Do I know my quarterly tax due dates? Have I set aside money for taxes on every payment I have received?",
  "whyItMatters": "Neglecting your tax obligations can lead to severe IRS penalties, audits, and significant financial stress, potentially derailing your business before it even takes off. Conversely, proactively understanding and managing your taxes empowers you to maximize deductible expenses, avoid penalties, and confidently allocate funds, ensuring long-term financial health and allowing you to reinvest savings into growth.",
  "howToDoIt": "Adopt 'The Tax Buffer Strategy': Treat taxes as a mandatory business expense that comes off the top of every payment, not an afterthought. Immediately set aside 25-30% (or your estimated rate) of every payment into a separate, dedicated tax savings account. This proactive approach ensures funds are always available for quarterly estimated taxes and annual filings, preventing last-minute scrambles and penalty fears.",
  "whatToStartWith": "Start by identifying the specific quarterly estimated tax due dates for the current year and opening a dedicated business savings account specifically for tax reserves.",
  "premiumFeatures": [
    {
      "id": "ai-tax-obligation-report",
      "icon": "FileText",
      "label": "AI Tax Obligation Report",
      "tagline": "Get a personalized summary of federal, state, and sales tax requirements for your specific business type and location.",
      "cta": "Generate now"
    },
    {
      "id": "ai-deductible-expense-finder",
      "icon": "ClipboardList",
      "label": "AI Deductible Expense Finder",
      "tagline": "Upload your categorized expense data and get a tailored list of potential business deductions to maximize your savings.",
      "cta": "Analyze now"
    },
    {
      "id": "ai-estimated-tax-reminder",
      "icon": "CalendarCheck",
      "label": "AI Estimated Tax & Reminder Setup",
      "tagline": "Receive an estimated quarterly tax calculation based on your income and automatically set up calendar reminders for due dates.",
      "cta": "Set up now"
    }
  ]
},
  {
  "id": "finance-6",
  "phase": 5,
  "phaseName": "Finance",
  "order": 6,
  "title": "Set up payroll (if you are paying yourself or hiring)",
  "description": "If you're an S-Corp owner paying yourself a salary or hiring employees, setting up payroll software is essential for automated tax withholding, direct deposits, and government filings.",
  "action": "Set up payroll software and run your first payroll — or set up your owner distribution schedule.",
  "resources": [
    {
      "name": "Gusto",
      "url": "https://gusto.com",
      "affiliate": true,
      "description": "Full-service payroll + benefits + HR — files all taxes automatically",
      "badge": "Best Overall"
    },
    {
      "name": "Rippling",
      "url": "https://www.rippling.com",
      "affiliate": true,
      "description": "HR + payroll + IT management in one platform for growing teams"
    },
    {
      "name": "OnPay",
      "url": "https://onpay.com",
      "affiliate": true,
      "description": "Simple, affordable payroll at $40/mo + $6 per person"
    },
    {
      "name": "Wave Payroll",
      "url": "https://www.waveapps.com/payroll",
      "affiliate": true,
      "description": "Payroll integrated with free Wave accounting"
    },
    {
      "name": "IRS Employer Tax Guide",
      "url": "https://www.irs.gov/publications/p15",
      "description": "Circular E — official guide to employer tax obligations",
      "badge": "Free"
    }
  ],
  "journalPrompt": "How am I paying myself? Is it sustainable? Am I compliant with payroll tax requirements?",
  "whyItMatters": "Getting payroll wrong can lead to severe IRS penalties, state fines, and potential legal issues for misclassification or non-compliance, damaging your business reputation and finances. Getting it right ensures legal compliance, avoids costly mistakes, fosters employee trust through accurate and timely payments, and streamlines your financial operations, freeing you to focus on growth.",
  "howToDoIt": "Approach payroll with a \"Compliance First, Efficiency Second\" mindset. First, clarify your legal obligations: Are you paying yourself as an S-Corp owner, hiring W-2 employees, or working with 1099 contractors? This dictates your payroll needs. Next, select a payroll system (software or service) that automates tax calculations, withholdings, and filings, ensuring you remain compliant from day one while minimizing manual effort.",
  "whatToStartWith": "Begin by clearly defining your compensation strategy: will you take an owner's draw, an S-Corp salary, or hire W-2 employees? Research the basic federal and state payroll tax obligations associated with each method to understand your starting point.",
  "premiumFeatures": [
    {
      "id": "payroll-matcher",
      "icon": "Search",
      "label": "AI Payroll System Matchmaker",
      "tagline": "Get personalized payroll software recommendations based on your business structure, employee count, and state.",
      "cta": "Find my perfect payroll system"
    },
    {
      "id": "tax-guide",
      "icon": "FileText",
      "label": "AI Payroll Tax Obligations Guide",
      "tagline": "Instantly identify federal and state payroll tax requirements relevant to your business type and location.",
      "cta": "Generate tax guide"
    },
    {
      "id": "worker-classifier",
      "icon": "Users",
      "label": "AI Worker Classification Advisor",
      "tagline": "Get AI-powered guidance on correctly classifying your workers (W-2 employee vs. 1099 contractor) to avoid penalties.",
      "cta": "Classify workers"
    }
  ]
},
  {
  "id": "space-1",
  "phase": 6,
  "phaseName": "Locate",
  "order": 1,
  "title": "Decide where your business will operate",
  "description": "Choosing your business's operating model—from home-based to retail—critically impacts costs, zoning, customer experience, and your ability to start lean.",
  "action": "Map out your operating model: where will work happen, where will customers find you, and what physical space do you actually need in year one?",
  "resources": [
    {
      "name": "WeWork",
      "url": "https://www.wework.com",
      "affiliate": true,
      "description": "Flexible coworking and private offices — month-to-month available",
      "badge": "Most Locations"
    },
    {
      "name": "Regus",
      "url": "https://www.regus.com",
      "affiliate": true,
      "description": "Business center locations worldwide with virtual office options"
    },
    {
      "name": "Industrious",
      "url": "https://www.industriousoffice.com",
      "affiliate": true,
      "description": "Premium coworking with all-inclusive pricing — no surprise fees"
    },
    {
      "name": "LiquidSpace",
      "url": "https://liquidspace.com",
      "affiliate": true,
      "description": "Find and book flexible office and meeting space on demand"
    },
    {
      "name": "Regus Virtual Office",
      "url": "https://www.regus.com/en-us/virtual-office",
      "affiliate": true,
      "description": "Professional business address without paying for physical space",
      "badge": "Best Virtual"
    }
  ],
  "journalPrompt": "What does my business actually need from a physical space? Am I spending on space out of ego or necessity?",
  "whyItMatters": "Getting your operating model wrong can saddle your startup with crippling overhead, limit your access to target customers, or even lead to legal issues if you violate zoning laws. Conversely, optimizing your location strategy from day one allows you to conserve capital, operate with maximum flexibility, reach your customers effectively, and reinvest savings into growth, creating a powerful competitive advantage.",
  "howToDoIt": "Employ a 'Lean Operations Blueprint' by breaking down your business into core functions: 1) **Production/Service Delivery:** Where will your actual work occur? 2) **Customer Interface:** How and where will customers primarily interact with you? 3) **Logistics/Storage:** What physical space is truly required for inventory, equipment, or administrative tasks? Prioritize minimal viable space to reduce fixed costs and maintain agility.",
  "whatToStartWith": "Begin by listing every single activity your business might undertake (e.g., manufacturing, client meetings, shipping, admin, inventory storage). Then, for each item, determine if it *absolutely requires* a dedicated physical space in year one, or if it can be done remotely, outsourced, or deferred.",
  "premiumFeatures": [
    {
      "id": "ai-zoning-permit-advisor",
      "icon": "MapPin",
      "label": "AI Zoning & Permit Advisor",
      "tagline": "Generate a preliminary report on zoning restrictions and necessary permits for your chosen business type and potential location.",
      "cta": "Generate now"
    },
    {
      "id": "ai-operating-model-cost",
      "icon": "DollarSign",
      "label": "AI Operating Model Cost Estimator",
      "tagline": "Receive tailored cost projections (rent, utilities, insurance) for different operating models (e.g., home-based vs. coworking vs. retail).",
      "cta": "Get estimates"
    },
    {
      "id": "ai-lean-space-analyzer",
      "icon": "LayoutDashboard",
      "label": "AI Lean Space Requirement Analyzer",
      "tagline": "Identify the absolute minimum physical space and essential equipment needed based on your industry and core business activities.",
      "cta": "Analyze my needs"
    }
  ]
},
  {
  "id": "space-2",
  "phase": 6,
  "phaseName": "Locate",
  "order": 2,
  "title": "Build your website or online storefront",
  "description": "Your website is your most important business asset, acting as your 24/7 storefront or first salesperson, clearly communicating your value.",
  "action": "Build and publish your website or online store with at least a home page, what you offer, and how to buy or book.",
  "resources": [
    {
      "name": "Shopify",
      "url": "https://www.shopify.com",
      "affiliate": true,
      "description": "The best ecommerce platform for product businesses — physical and digital",
      "badge": "Best for Ecommerce"
    },
    {
      "name": "Squarespace",
      "url": "https://www.squarespace.com",
      "affiliate": true,
      "description": "Beautiful all-in-one website builder with ecommerce and booking built in",
      "badge": "Most Popular"
    },
    {
      "name": "Webflow",
      "url": "https://webflow.com",
      "affiliate": true,
      "description": "No-code builder with full design control and powerful CMS"
    },
    {
      "name": "Framer",
      "url": "https://www.framer.com",
      "affiliate": true,
      "description": "Stunning websites with AI layout generation — fastest to beautiful",
      "badge": "Best Design"
    },
    {
      "name": "Wix",
      "url": "https://www.wix.com",
      "affiliate": true,
      "description": "Drag-and-drop website builder with booking, ecommerce, and blog"
    },
    {
      "name": "WordPress + SiteGround",
      "url": "https://www.siteground.com",
      "affiliate": true,
      "description": "Self-hosted WordPress — most flexibility. SiteGround is the best host for WP"
    },
    {
      "name": "WordPress + Bluehost",
      "url": "https://www.bluehost.com",
      "affiliate": true,
      "description": "Affordable WordPress hosting — $2.95/mo gets you started",
      "badge": "Best Value Hosting"
    },
    {
      "name": "Carrd",
      "url": "https://carrd.co",
      "affiliate": true,
      "description": "Simple one-page sites — free tier is genuinely excellent for launch",
      "badge": "Free to Start"
    },
    {
      "name": "Fiverr",
      "url": "https://www.fiverr.com",
      "affiliate": true,
      "description": "Hire a web developer to build your site — from $50 for a basic site"
    },
    {
      "name": "BigCommerce",
      "url": "https://www.bigcommerce.com",
      "affiliate": true,
      "description": "Enterprise-grade ecommerce for high-volume product businesses"
    }
  ],
  "journalPrompt": "Does my website clearly answer: who is this for, what do they get, and how do they start? Would a stranger understand it in 5 seconds?",
  "whyItMatters": "Without a clear, functional website, you risk losing potential customers who can't understand what you offer or how to buy, effectively leaving money on the table; a well-built site, however, acts as a tireless salesperson and trusted information hub, building credibility and converting visitors around the clock.",
  "howToDoIt": "Adopt a 'Customer-First Clarity' mindset: Every element of your website should answer your customer's most pressing questions: 'Is this for me?', 'What problem does it solve?', and 'How do I get it?'. Prioritize simple, direct language and a clear path to action over elaborate design, ensuring a seamless user experience from the moment they land on your page.",
  "whatToStartWith": "Before diving into design, draft the core message for your homepage and key service/product pages, focusing solely on answering: Who do you help? What do you offer? How do they get started?",
  "premiumFeatures": [
    {
      "id": "ai-content-writer",
      "icon": "FileText",
      "label": "AI Website Content Writer",
      "tagline": "Generate compelling and clear copy for your homepage, services, and about pages in minutes.",
      "cta": "Generate now"
    },
    {
      "id": "ai-homepage-analyzer",
      "icon": "Eye",
      "label": "AI '5-Second Rule' Homepage Analyzer",
      "tagline": "Get instant feedback on your homepage's clarity, messaging, and visual appeal for first-time visitors.",
      "cta": "Analyze now"
    },
    {
      "id": "ai-cta-optimizer",
      "icon": "Zap",
      "label": "AI Call-to-Action Optimizer",
      "tagline": "Receive data-driven suggestions for high-converting Calls-to-Action and strategic placement on your site.",
      "cta": "Optimize now"
    }
  ]
},
  {
  "id": "space-3",
  "phase": 6,
  "phaseName": "Locate",
  "order": 3,
  "title": "Get a virtual address",
  "description": "Protect your privacy and professional image by using a virtual address for your business filings, keeping your home address off public records.",
  "action": "Sign up for a virtual mailbox service and update your business address with your state and the IRS.",
  "resources": [
    {
      "name": "Anytime Mailbox",
      "url": "https://www.anytimemailbox.com",
      "affiliate": true,
      "description": "Real street address + digital mail scanning from $9.99/mo",
      "badge": "Best Value"
    },
    {
      "name": "iPostal1",
      "url": "https://ipostal1.com",
      "affiliate": true,
      "description": "500+ real US addresses with digital mail management"
    },
    {
      "name": "PostScan Mail",
      "url": "https://www.postscanmail.com",
      "affiliate": true,
      "description": "Virtual mailbox with check deposit and mail forwarding"
    },
    {
      "name": "Traveling Mailbox",
      "url": "https://travelingmailbox.com",
      "affiliate": true,
      "description": "Unlimited mail scanning — great for remote and traveling founders"
    },
    {
      "name": "Earth Class Mail",
      "url": "https://www.earthclassmail.com",
      "affiliate": true,
      "description": "Premium virtual office with automated mail processing and routing"
    }
  ],
  "journalPrompt": "Is my home address on my business filings? Is that a privacy risk I am comfortable with?",
  "whyItMatters": "The moment you file your LLC or other business entity, your registered address becomes public record, making your personal home address easily discoverable. Getting this wrong can lead to unsolicited mail, unwelcome visitors, and a less professional appearance to clients and investors. Getting it right ensures your personal privacy is protected, maintains a clear boundary between your personal and business life, and provides a credible, professional mailing address that enhances your business's reputation and legitimacy.",
  "howToDoIt": "To secure a virtual address, first identify your core needs: do you just need mail forwarding, or also a registered agent service, package handling, or a local phone number? Research reputable virtual mailbox providers (e.g., Northwest Registered Agent, Anytime Mailbox, PostScan Mail) that offer addresses in a state beneficial to your business (often where your LLC is registered or where you want a local presence). Select a plan that fits your budget and mail volume, complete the necessary identity verification (typically USPS Form 1583), and then update your business address proactively with your state's Secretary of State, the IRS, your bank, and any other relevant business directories.",
  "whatToStartWith": "Before signing up for any service, take a moment to confirm where your current business filings publicly display your address.",
  "premiumFeatures": [
    {
      "id": "ai-address-scout",
      "icon": "Search",
      "label": "AI Virtual Address Scout",
      "tagline": "Find the optimal virtual address and service provider tailored to your business needs, location preferences, and budget.",
      "cta": "Generate Recommendations"
    },
    {
      "id": "ai-address-update-bot",
      "icon": "FileText",
      "label": "AI Address Update Bot",
      "tagline": "Generate a personalized checklist and instructions for updating your business address across all key entities (state, IRS, banks, etc.).",
      "cta": "Create Update Plan"
    },
    {
      "id": "ai-privacy-audit",
      "icon": "Shield",
      "label": "AI Privacy Exposure Audit",
      "tagline": "Analyze your current business registration and online presence to identify personal address exposure and recommend mitigation strategies.",
      "cta": "Run Audit"
    }
  ]
},
  {
  "id": "space-4",
  "phase": 6,
  "phaseName": "Locate",
  "order": 4,
  "title": "Set up your physical workspace",
  "description": "Establish a dedicated physical workspace to delineate professional boundaries and optimize productivity, while ensuring compliance and tax benefits.",
  "action": "Set up and photograph your workspace. If working from home, confirm your zoning allows it and document the square footage for tax purposes.",
  "resources": [
    {
      "name": "WeWork",
      "url": "https://www.wework.com",
      "affiliate": true,
      "description": "Flexible coworking and private offices globally"
    },
    {
      "name": "Industrious",
      "url": "https://www.industriousoffice.com",
      "affiliate": true,
      "description": "Premium coworking — all amenities included, no surprises"
    },
    {
      "name": "LiquidSpace",
      "url": "https://liquidspace.com",
      "affiliate": true,
      "description": "Book meeting rooms and day offices on demand"
    },
    {
      "name": "Makersquare / Fab Lab",
      "url": "https://www.fablabs.io",
      "description": "Find a local maker space or fabrication lab for product businesses",
      "badge": "Free to Explore"
    }
  ],
  "journalPrompt": "Does my workspace make me feel like a professional running a business — or like someone doing a side project at the kitchen table?",
  "whyItMatters": "Getting this wrong can cost you valuable tax deductions and blur the lines between professional ambition and personal life, leading to decreased productivity, potential burnout, and a perception (even self-perception) of merely 'playing business'. Getting it right establishes a clear psychological boundary, enhances focus and efficiency, and leverages legitimate tax benefits, signalling to yourself and others that you are serious about building a thriving enterprise.",
  "howToDoIt": "Adopt the 'Professional Sanctuary' mental model: view your workspace not just as a location, but as a dedicated environment meticulously crafted for focus, productivity, and professional identity. This involves intentional physical separation from personal zones, optimizing for necessary tools and minimal distractions, and ensuring it reflects the serious business you are building, rather than just a temporary setup.",
  "whatToStartWith": "Before arranging a single item, physically sit or stand in your intended or current workspace, take a deep breath, and mentally 'clock in' as if it's the first day of your new business.",
  "premiumFeatures": [
    {
      "id": "ai-zoning-check",
      "icon": "MapPin",
      "label": "AI Zoning Compliance Check",
      "tagline": "Instantly check local zoning laws for your home-based business address.",
      "cta": "Check Zoning"
    },
    {
      "id": "ai-tax-deduction",
      "icon": "Calculator",
      "label": "AI Home Office Deduction Estimator",
      "tagline": "Calculate potential home office tax deductions based on your space and expenses.",
      "cta": "Estimate Deduction"
    },
    {
      "id": "ai-workspace-design",
      "icon": "LayoutDashboard",
      "label": "AI Workspace Design Advisor",
      "tagline": "Receive personalized recommendations for optimizing your workspace layout and aesthetics.",
      "cta": "Get Design Ideas"
    }
  ]
},
  {
  "id": "space-5",
  "phase": 6,
  "phaseName": "Locate",
  "order": 5,
  "title": "Find and negotiate commercial or retail space",
  "description": "Securing a physical location is a significant financial commitment; understand all lease terms before signing, especially regarding costs and personal liability.",
  "action": "Tour at least 3 spaces, compare true all-in costs, and have any lease reviewed by an attorney before signing.",
  "resources": [
    {
      "name": "LoopNet",
      "url": "https://www.loopnet.com",
      "description": "The largest commercial real estate listing platform in the US",
      "badge": "Free to Search"
    },
    {
      "name": "CoStar",
      "url": "https://www.costar.com",
      "description": "Professional-grade commercial real estate data and listings"
    },
    {
      "name": "Rocket Lawyer",
      "url": "https://www.rocketlawyer.com",
      "affiliate": true,
      "description": "Have your commercial lease reviewed by an attorney before you sign"
    },
    {
      "name": "SCORE Mentors",
      "url": "https://www.score.org",
      "description": "Free one-on-one mentoring from experienced business owners — great for lease negotiation",
      "badge": "Free"
    },
    {
      "name": "LiquidSpace",
      "url": "https://liquidspace.com",
      "affiliate": true,
      "description": "Flexible short-term commercial space — test a location before committing"
    }
  ],
  "journalPrompt": "Have I calculated the true all-in monthly cost of this space including CAM, utilities, insurance, and build-out? Can my business afford it at half my expected revenue?",
  "whyItMatters": "A commercial lease is often the largest recurring expense and longest-term commitment a small business makes, frequently backed by a personal guarantee. A mistake here can lead to crippling financial burden, difficulty scaling, or even business failure, as it locks in high fixed costs that are difficult to escape. Conversely, negotiating a favorable lease with clear terms and reasonable exit options provides immense stability, cost control, and flexibility, freeing up capital and mental energy to focus on growth and operations.",
  "howToDoIt": "Approach this decision with meticulous financial and legal due diligence, not just property aesthetics. Think of it as investing in an asset with a fixed monthly payment. First, define your non-negotiable operational requirements (size, zoning, accessibility). Second, systematically evaluate multiple spaces based on true all-in costs, not just base rent, including Common Area Maintenance (CAM), utilities, build-out, and insurance. Third, understand the full scope of your personal liability and exit clauses. Never let excitement override financial prudence or legal review.",
  "whatToStartWith": "Begin by requesting detailed lease proposals for your top 2-3 potential spaces, ensuring they itemize all additional charges beyond base rent, such as CAM, property taxes, utilities, and estimated build-out costs.",
  "premiumFeatures": [
    {
      "id": "ai-lease-analyzer",
      "icon": "FileText",
      "label": "AI Lease Clause Analyzer",
      "tagline": "Upload any lease draft to instantly identify key clauses, potential risks, and explain complex legal jargon in plain English.",
      "cta": "Analyze my lease"
    },
    {
      "id": "ai-cost-comparator",
      "icon": "Calculator",
      "label": "AI True Cost Comparator",
      "tagline": "Input details from multiple lease proposals to generate a standardized, all-inclusive monthly cost comparison for each space.",
      "cta": "Compare spaces"
    },
    {
      "id": "ai-location-intelligence",
      "icon": "Users",
      "label": "AI Location Intelligence Report",
      "tagline": "Get a detailed report on foot traffic patterns, local demographics, and competitor presence for any potential commercial address.",
      "cta": "Generate market report"
    }
  ]
},
  {
  "id": "brand-1",
  "phase": 7,
  "phaseName": "Brand",
  "order": 1,
  "title": "Design your logo and visual identity",
  "description": "Design your logo and visual identity, focusing on professionalism, consistency, and readability across all mediums.",
  "action": "Get a logo designed using a tool or freelancer. Lock in your primary color, secondary color, and font.",
  "resources": [
    {
      "name": "Looka",
      "url": "https://looka.com",
      "affiliate": true,
      "description": "AI-powered logo + full brand kit: colors, fonts, business cards in minutes",
      "badge": "Best Value"
    },
    {
      "name": "Canva",
      "url": "https://www.canva.com",
      "affiliate": true,
      "description": "Free logo templates and brand kit builder — good for solopreneurs",
      "badge": "Free"
    },
    {
      "name": "99designs",
      "url": "https://99designs.com",
      "affiliate": true,
      "description": "Professional logo from a vetted designer — higher quality, higher cost"
    },
    {
      "name": "Fiverr",
      "url": "https://www.fiverr.com",
      "affiliate": true,
      "description": "Logo designers starting at $25 — filter by rating and portfolio"
    },
    {
      "name": "Moo",
      "url": "https://www.moo.com",
      "affiliate": true,
      "description": "Premium business cards and print materials — the best quality in print"
    },
    {
      "name": "Vistaprint",
      "url": "https://www.vistaprint.com",
      "affiliate": true,
      "description": "Affordable business cards, signage, and branded materials",
      "badge": "Best Value Print"
    }
  ],
  "journalPrompt": "Does my logo communicate the right thing about my brand before anyone reads my name?",
  "whyItMatters": "Getting your visual identity wrong creates confusion, erodes trust, and makes your brand appear unprofessional or unestablished, leading to missed opportunities and costly redesigns. Getting it right provides instant recognition, communicates your brand's essence at a glance, and builds credibility, making all your marketing efforts more effective and memorable.",
  "howToDoIt": "Think of your brand's visual identity as its silent ambassador. It needs to convey personality, purpose, and professionalism without words. Start by defining 3-5 core brand adjectives (e.g., 'playful,' 'reliable,' 'innovative') that your visuals should embody. Then, consider your target audience and where your brand will primarily appear (digital, print, physical). Aim for simplicity, versatility, and memorability over complexity, ensuring your choices resonate with your brand's essence.",
  "whatToStartWith": "Before diving into design tools or freelancers, articulate what three core feelings or messages you want your logo to convey to someone seeing it for the very first time. Sketch a few rough ideas that capture these feelings, then look at some competitors or admired brands for inspiration, noting what visual elements evoke similar emotions.",
  "premiumFeatures": [
    {
      "id": "ai-logo-concept-generator",
      "icon": "PenTool",
      "label": "AI Logo Concept Generator",
      "tagline": "Generate unique logo ideas and variations based on your brand keywords, industry, and desired style in seconds.",
      "cta": "Generate concepts"
    },
    {
      "id": "ai-color-font-recommender",
      "icon": "Palette",
      "label": "AI Color & Font Recommender",
      "tagline": "Discover a harmonious primary color, secondary color, and font pair that aligns perfectly with your brand's personality.",
      "cta": "Get recommendations"
    },
    {
      "id": "ai-visual-identity-feedback",
      "icon": "MessageCircle",
      "label": "AI Visual Identity Feedback",
      "tagline": "Upload your proposed logo and visual assets for AI-driven feedback on clarity, consistency, and brand message alignment.",
      "cta": "Analyze my design"
    }
  ]
},
  {
  "id": "brand-2",
  "phase": 7,
  "phaseName": "Brand",
  "order": 2,
  "title": "Set up business email and phone",
  "description": "Establish a professional brand identity and separate work from personal life by setting up a custom domain email and a dedicated business phone number.",
  "action": "Set up yourname@yourdomain.com and a business phone number that routes to you.",
  "resources": [
    {
      "name": "Google Workspace",
      "url": "https://workspace.google.com",
      "affiliate": true,
      "description": "Professional email + Docs, Sheets, Meet, Drive — all in one",
      "badge": "Most Popular"
    },
    {
      "name": "Microsoft 365 Business",
      "url": "https://www.microsoft.com/en-us/microsoft-365/business",
      "affiliate": true,
      "description": "Outlook email + Word, Excel, Teams — best for Windows-first teams"
    },
    {
      "name": "OpenPhone",
      "url": "https://www.openphone.com",
      "affiliate": true,
      "description": "Business phone number with calls, texts, and shared team inbox — $13/mo",
      "badge": "Best Business Phone"
    },
    {
      "name": "Grasshopper",
      "url": "https://grasshopper.com",
      "affiliate": true,
      "description": "Virtual phone system with toll-free and local numbers + extensions"
    },
    {
      "name": "Zoho Mail",
      "url": "https://www.zoho.com/mail",
      "description": "Free business email for up to 5 users",
      "badge": "Free"
    }
  ],
  "journalPrompt": "Does my contact information make me look like a serious business? Would I trust a business with a Gmail address?",
  "whyItMatters": "Using a personal Gmail or cell phone number for business screams 'hobbyist' rather than 'professional,' eroding customer trust before you even have a conversation. This lack of perceived legitimacy can cost you lucrative contracts and client loyalty, making it harder to establish your brand in a competitive market. Conversely, a custom domain email and a dedicated business line instantly signal seriousness, reliability, and commitment, building a foundation of trust that attracts serious clients and fosters long-term relationships, all while providing essential work-life separation.",
  "howToDoIt": "Think of your business contact information as your company's digital front door. It needs to look polished, be easy to find, and offer a clear path for professional communication. Start by consolidating your digital identity: your website domain should be the anchor for your email, and your phone solution should offer flexibility (routing, voicemail, business hours) without tying you down to a physical desk. Prioritize solutions that scale with your growth and integrate with other business tools.",
  "whatToStartWith": "Before you invest in any service, draft out what your ideal professional email address (e.g., 'hello@yourdomain.com') and business phone number would look like, then consider how this contact information will be presented on your website, social media, and business cards.",
  "premiumFeatures": [
    {
      "id": "ai-domain-email-suggestion",
      "icon": "Mail",
      "label": "AI Domain & Email Namer",
      "tagline": "Generate compelling domain names and matching professional email address ideas based on your business type and brand keywords.",
      "cta": "Generate ideas"
    },
    {
      "id": "ai-phone-provider-recommend",
      "icon": "Phone",
      "label": "AI Phone System Advisor",
      "tagline": "Get personalized recommendations for virtual business phone systems tailored to your budget, call volume, and feature needs.",
      "cta": "Find my system"
    },
    {
      "id": "ai-voicemail-script",
      "icon": "MessageSquare",
      "label": "AI Voicemail & Script Creator",
      "tagline": "Craft professional, on-brand voicemail greetings and essential call scripts for common inquiries in minutes.",
      "cta": "Draft scripts"
    }
  ]
},
  {
  "id": "brand-3",
  "phase": 7,
  "phaseName": "Brand",
  "order": 3,
  "title": "Claim your social media handles",
  "description": "Secure your brand's presence across all major social media platforms by claiming consistent handles, even for future use.",
  "action": "Create business profiles on LinkedIn, Instagram, Facebook, and X. Fill in the bio and link to your website on each.",
  "resources": [
    {
      "name": "Namechk",
      "url": "https://namechk.com",
      "description": "Check username availability across 100+ platforms at once",
      "badge": "Free"
    },
    {
      "name": "Buffer",
      "url": "https://buffer.com",
      "affiliate": true,
      "description": "Schedule social posts across all platforms from one dashboard",
      "badge": "Most Popular"
    },
    {
      "name": "Later",
      "url": "https://later.com",
      "affiliate": true,
      "description": "Visual social media scheduler — great for Instagram and Pinterest"
    },
    {
      "name": "Canva",
      "url": "https://www.canva.com",
      "affiliate": true,
      "description": "Create consistently branded social posts without a designer"
    }
  ],
  "journalPrompt": "Are all my social handles consistent with my brand name? Does my bio tell someone what I do in under 10 words?",
  "whyItMatters": "In the crowded digital landscape, an inconsistent or absent social media presence is a direct pathway to lost brand recognition and potential customer confusion. Missteps here can lead to 'handle squatters' claiming your desired identity, forcing costly rebrands or making your business difficult to find. Conversely, securing a consistent handle across all platforms establishes immediate credibility, reinforces your brand's professional image, and future-proofs your digital footprint, ensuring you own your narrative wherever your audience seeks you out.",
  "howToDoIt": "Approach this step with a 'Digital Land Claim' mindset: act fast and be comprehensive. Your mental model should be 'Defensive Branding through Proactive Presence'. Start by identifying your ideal handle and then systematically check its availability across ALL major and relevant niche platforms, not just the ones you plan to use immediately. Prioritize consistency, aiming for an identical handle everywhere. If your ideal name is taken, brainstorm slight, logical variations that maintain brand integrity. The goal is to secure your digital 'real estate' before anyone else does, building a foundational layer for future engagement and discoverability.",
  "whatToStartWith": "Begin by listing your top 5-7 target social media platforms (e.g., LinkedIn, Instagram, Facebook, X, TikTok, YouTube, Pinterest) and your primary business name. Then, one by one, manually check the availability of your exact business name as a handle on each of these platforms. Note down if it's available or taken.",
  "premiumFeatures": [
    {
      "id": "ai-handle-scanner",
      "icon": "Search",
      "label": "AI Handle Availability Scan",
      "tagline": "Instantly check your desired handles across 10+ major social platforms and get smart alternatives if unavailable.",
      "cta": "Scan now"
    },
    {
      "id": "ai-bio-generator",
      "icon": "FileText",
      "label": "AI Brand Bio & Tagline Generator",
      "tagline": "Craft compelling, platform-optimized bios and taglines that capture your brand essence in under 10 words.",
      "cta": "Generate now"
    },
    {
      "id": "ai-competitor-social-audit",
      "icon": "BarChart2",
      "label": "AI Competitor Social Presence Report",
      "tagline": "Analyze how your top competitors claim and utilize their social handles and bios for strategic inspiration.",
      "cta": "Analyze competitors"
    }
  ]
},
  {
  "id": "brand-4",
  "phase": 7,
  "phaseName": "Brand",
  "order": 4,
  "title": "Set up your Google Business Profile",
  "description": "A Google Business Profile is free and makes your business visible in local search results and Google Maps, essential for both local and online businesses to quickly appear in relevant searches.",
  "action": "Create, verify, and fully complete your Google Business Profile with photos, hours, and a description.",
  "resources": [
    {
      "name": "Google Business Profile",
      "url": "https://business.google.com",
      "description": "Free local business listing that appears in Google Maps and Search",
      "badge": "Free"
    },
    {
      "name": "Semrush",
      "url": "https://www.semrush.com",
      "affiliate": true,
      "description": "Track your local search rankings and optimize your Google presence"
    },
    {
      "name": "BrightLocal",
      "url": "https://www.brightlocal.com",
      "affiliate": true,
      "description": "Local SEO tools — audit your local presence and track citation consistency"
    }
  ],
  "journalPrompt": "Does my Google Business Profile have photos, a description, and accurate hours? Am I showing up when someone searches for what I do?",
  "whyItMatters": "Without an optimized Google Business Profile, your business is virtually invisible to local customers actively searching for your services, costing you organic leads, trust, and a crucial competitive edge. A well-maintained profile, however, acts as a 24/7 digital storefront, leveraging free Google visibility to drive discovery, build credibility through reviews, and convert local searchers into loyal customers.",
  "howToDoIt": "Approach your Google Business Profile as your primary free digital storefront on Google. The mental model is 'Complete, Compelling, & Current': first, ensure all information is 100% complete and accurate, making it easy for customers to find and understand your offerings. Second, make it compelling with high-quality photos, detailed service descriptions, and regular updates. Finally, keep it current by actively responding to reviews and Q&As, transforming it into a dynamic hub for customer engagement and trust-building.",
  "whatToStartWith": "Begin by logging into your Google Business Profile (or creating one if you haven't) and immediately checking that your business hours, descriptive summary, and at least five high-quality photos are uploaded and accurate.",
  "premiumFeatures": [
    {
      "id": "ai-gbp-profile-optimizer",
      "icon": "FileText",
      "label": "AI GBP Profile Optimizer",
      "tagline": "Generates SEO-friendly descriptions, services, and product listings to maximize local search visibility.",
      "cta": "Generate now"
    },
    {
      "id": "ai-review-response-assistant",
      "icon": "MessageSquareText",
      "label": "AI Review Response Assistant",
      "tagline": "Drafts professional, personalized responses to customer reviews (positive and negative) to boost your online reputation.",
      "cta": "Generate responses"
    },
    {
      "id": "ai-gbp-post-creator",
      "icon": "Megaphone",
      "label": "AI GBP Post & Offer Creator",
      "tagline": "Creates engaging Google Business Profile posts for promotions, events, or updates, keeping your profile active and discoverable.",
      "cta": "Create post ideas"
    }
  ]
},
  {
  "id": "brand-5",
  "phase": 7,
  "phaseName": "Brand",
  "order": 5,
  "title": "Create your brand style guide",
  "description": "A brand style guide documents your logo, colors, fonts, tone of voice, and usage rules to ensure consistency.",
  "action": "Create a one-page brand guide covering your logo, primary and secondary colors (hex codes), fonts, and 3 adjectives describing your brand voice.",
  "resources": [
    {
      "name": "Canva Brand Kit",
      "url": "https://www.canva.com",
      "affiliate": true,
      "description": "Store your brand colors, fonts, and logos — apply with one click",
      "badge": "Free"
    },
    {
      "name": "Looka",
      "url": "https://looka.com",
      "affiliate": true,
      "description": "Generates a full brand kit automatically from your logo"
    },
    {
      "name": "Fiverr",
      "url": "https://www.fiverr.com",
      "affiliate": true,
      "description": "Hire a brand designer to create a professional style guide"
    },
    {
      "name": "Notion",
      "url": "https://www.notion.so",
      "affiliate": true,
      "description": "Build and share your brand guide as a Notion page your whole team can use"
    }
  ],
  "journalPrompt": "If I handed a freelancer my brand guide tomorrow, would they create something that looks like me?",
  "whyItMatters": "Without a clear brand guide, your visual and verbal identity will be inconsistent across platforms and content, confusing your audience and diluting your brand's impact. This inconsistency leads to wasted time and money on rework, undermines customer trust, and makes delegation inefficient. A robust brand guide, even a simple one, empowers you to build a cohesive, recognizable, and trustworthy brand that resonates with your audience, simplifies future content creation, and enables seamless collaboration with freelancers and agencies.",
  "howToDoIt": "Think of your brand as a distinct personality with a unique visual language. Your task is to codify this personality and language into a simple handbook. Start by defining the core emotions and values your brand embodies, then translate these into tangible visual elements (logo, colors, fonts) and a consistent verbal tone. The goal is to create a framework that allows anyone interacting with your brand to effortlessly convey its essence, maintaining consistency and recognition across all touchpoints.",
  "whatToStartWith": "Begin by listing 3-5 core adjectives that genuinely describe your brand's personality, then gather your current logo file, identify your primary and secondary brand colors with their hex codes, and list your chosen brand fonts. Compile these essential elements onto a single page, ensuring clarity and precision for each component.",
  "premiumFeatures": [
    {
      "id": "ai-tone-generator",
      "icon": "Speech",
      "label": "AI Brand Tone & Voice Generator",
      "tagline": "Generate brand voice adjectives and example phrases tailored to your brand's essence.",
      "cta": "Generate now"
    },
    {
      "id": "ai-palette-advisor",
      "icon": "Palette",
      "label": "AI Brand Color & Font Advisor",
      "tagline": "Get instant feedback on your color palette and font pairings for brand consistency and impact.",
      "cta": "Analyze my brand"
    },
    {
      "id": "ai-guide-builder",
      "icon": "FileText",
      "label": "AI One-Page Brand Guide Builder",
      "tagline": "Automatically populate a professional one-page brand guide with your essential elements.",
      "cta": "Build my guide"
    }
  ]
},
  {
  "id": "brand-6",
  "phase": 7,
  "phaseName": "Brand",
  "order": 6,
  "title": "Set up a dedicated business phone",
  "description": "Using your personal cell phone for business erodes privacy and looks unprofessional; a dedicated business line or VoIP service solves both problems instantly.",
  "action": "Sign up for a digital VoIP phone line and set up a professional voicemail greeting.",
  "resources": [
    {
      "name": "OpenPhone",
      "url": "https://www.openphone.com",
      "affiliate": true,
      "description": "Modern business phone app that lives right on your existing smartphone"
    },
    {
      "name": "RingCentral",
      "url": "https://www.ringcentral.com",
      "affiliate": true,
      "description": "Robust cloud communications for growing teams"
    }
  ],
  "journalPrompt": "What is my business phone number and what does my voicemail greeting currently say?",
  "whyItMatters": "Blurring personal and business communications leads to missed leads because you didn't answer an 'unknown' number professionally. A dedicated business phone line establishes immediate credibility, protects your privacy, and enables critical features like auto-attendants and SMS marketing as you scale.",
  "howToDoIt": "You don't need a clunky desk phone. Sign up for a cloud-based VoIP service that operates as an app on your current cell phone. Select a local or toll-free number, and immediately record a professional voicemail greeting stating your business name and expected response time.",
  "whatToStartWith": "Compare features between top VoIP providers like OpenPhone or Google Voice, select a plan, and write a 15-second script for your professional voicemail greeting.",
  "premiumFeatures": [
    {
      "id": "ai-voicemail-script",
      "icon": "Mic",
      "label": "AI Voicemail Script Generator",
      "tagline": "Instantly generate professional, warm, and clear voicemail greetings tailored to your specific industry.",
      "cta": "Generate Script"
    }
  ]
},
  {
  "id": "brand-7",
  "phase": 7,
  "phaseName": "Brand",
  "order": 7,
  "title": "Order foundational promo merch & business cards",
  "description": "Physical branded assets turn you into a walking billboard and give you something tangible to hand to potential customers.",
  "action": "Design and order your first batch of high-quality business cards and at least one piece of branded apparel.",
  "resources": [
    {
      "name": "Vistaprint",
      "url": "https://www.vistaprint.com",
      "affiliate": true,
      "description": "Affordable, high-quality business cards and signage"
    },
    {
      "name": "StickerMule",
      "url": "https://www.stickermule.com",
      "affiliate": true,
      "description": "Fast turnarounds on custom stickers, packaging tape, and labels"
    }
  ],
  "journalPrompt": "Which physical item will give my brand the most visibility in my first 30 days of operation?",
  "whyItMatters": "While digital presence is crucial, physical touchpoints build tangible trust. Handing someone a high-quality business card or wearing branded apparel instantly legitimizes your operation in local or networking environments, opening up unpredictable offline sales channels.",
  "howToDoIt": "Don't overbuy inventory. Start with a lean order: 250 thick, well-designed business cards and 1-2 pieces of branded apparel (like a polo or hoodie) for yourself. Ensure your URL and primary contact method are the largest, clearest text on the card.",
  "whatToStartWith": "Upload your brand style guide (logo, hex colors) into an online print vendor, select a minimalist business card template, and place a small test order.",
  "premiumFeatures": [
    {
      "id": "ai-merch-mockup",
      "icon": "Palette",
      "label": "AI Merch Visualizer",
      "tagline": "Instantly see how your logo builds brand awareness on hundreds of apparel items, stickers, and cards before you buy.",
      "cta": "Visualize Merch"
    }
  ]
},
  {
  "id": "protect-1",
  "phase": 8,
  "phaseName": "Protect",
  "order": 1,
  "title": "Get business insurance",
  "description": "Secure your business's future by ensuring adequate insurance coverage is in place before any operations begin.",
  "action": "Get quotes from at least 2 providers and purchase a policy before you serve your first customer.",
  "resources": [
    {
      "name": "Next Insurance",
      "url": "https://www.nextinsurance.com",
      "affiliate": true,
      "description": "Fast online quotes tailored to your business type — coverage in minutes",
      "badge": "Most Popular"
    },
    {
      "name": "Hiscox",
      "url": "https://www.hiscox.com",
      "affiliate": true,
      "description": "Small business insurance specialists with flexible monthly plans"
    },
    {
      "name": "Thimble",
      "url": "https://www.thimble.com",
      "affiliate": true,
      "description": "Pay-per-project or monthly coverage — ideal for freelancers",
      "badge": "Best for Freelancers"
    },
    {
      "name": "Simply Business",
      "url": "https://www.simplybusiness.com",
      "affiliate": true,
      "description": "Compare multiple insurers side by side to find your best rate"
    },
    {
      "name": "CoverWallet",
      "url": "https://www.coverwallet.com",
      "affiliate": true,
      "description": "Business insurance marketplace — one application, multiple quotes"
    }
  ],
  "journalPrompt": "Am I covered before I serve my first customer? What is the worst thing that could happen and would my policy cover it?",
  "whyItMatters": "Operating a business without adequate insurance is like driving without a seatbelt – it feels fine until an unexpected incident turns catastrophic. A single lawsuit, unforeseen accident, or professional error can lead to devastating financial loss, wipe out personal assets, and completely derail your entrepreneurial dream before it even takes off. Conversely, securing the right policies provides a robust safety net, protecting your personal finances, business assets, and reputation. It instills confidence, allows you to focus on growth without paralyzing fear, and demonstrates professionalism to clients and partners, ultimately building a resilient foundation for long-term success.",
  "howToDoIt": "Approach insurance not as a burden, but as a strategic risk management investment. The mental model is to 'Identify, Evaluate, Compare, and Cover.' First, identify potential risks specific to your industry, operations, and services (e.g., physical accidents, data breaches, professional errors). Next, evaluate which types of insurance directly address these risks (e.g., General Liability, Professional Liability, Cyber Liability, Workers' Comp). Then, compare at least 2-3 providers, looking beyond just price to understand coverage limits, deductibles, exclusions, and customer service. Finally, cover your business adequately before you serve your first customer, ensuring you have peace of mind and protection against the unexpected.",
  "whatToStartWith": "Start by listing out the specific services or products your business will offer and brainstorm the absolute worst things that could realistically go wrong for each – think about potential property damage, client injuries, data breaches, or professional mistakes. Then, research the typical insurance requirements for businesses in your specific industry and location, and begin gathering initial quotes from at least two reputable insurance providers based on these identified risks and requirements.",
  "premiumFeatures": [
    {
      "id": "ai-policy-matchmaker",
      "icon": "ShieldCheck",
      "label": "AI Policy Matchmaker",
      "tagline": "Input your business details and AI will recommend essential insurance types and coverage considerations.",
      "cta": "Generate recommendations"
    },
    {
      "id": "ai-quote-compare",
      "icon": "Scale",
      "label": "AI Quote Compare",
      "tagline": "Upload insurance quotes and AI will highlight key differences in coverage, deductibles, and exclusions.",
      "cta": "Analyze quotes"
    },
    {
      "id": "ai-risk-scenario-generator",
      "icon": "AlertTriangle",
      "label": "AI Risk Scenario Generator",
      "tagline": "Describe your business and AI will generate realistic 'worst-case scenarios' and potential liabilities to consider.",
      "cta": "Generate scenarios"
    }
  ]
},
  {
  "id": "protect-2",
  "phase": 8,
  "phaseName": "Protect",
  "order": 2,
  "title": "Create your contracts and service agreements",
  "description": "Prepare essential client service agreements, contractor agreements, and a basic NDA template to safeguard your business relationships.",
  "action": "Get a client service agreement, a contractor agreement, and a basic NDA template ready before you need them.",
  "resources": [
    {
      "name": "Bonsai",
      "url": "https://www.hellobonsai.com",
      "affiliate": true,
      "description": "Contracts, proposals, invoices, and time tracking in one platform",
      "badge": "Best for Freelancers"
    },
    {
      "name": "HoneyBook",
      "url": "https://www.honeybook.com",
      "affiliate": true,
      "description": "Client management with contracts, proposals, and payment in one flow"
    },
    {
      "name": "Rocket Lawyer",
      "url": "https://www.rocketlawyer.com",
      "affiliate": true,
      "description": "Attorney-reviewed legal documents + ongoing legal Q&A",
      "badge": "Most Popular"
    },
    {
      "name": "LawDepot",
      "url": "https://www.lawdepot.com",
      "affiliate": true,
      "description": "Affordable legal document templates for small businesses"
    },
    {
      "name": "DocuSign",
      "url": "https://www.docusign.com",
      "affiliate": true,
      "description": "Electronic signature for any document — professional and legally binding"
    }
  ],
  "journalPrompt": "Do I have a signed contract with every client or contractor? What would happen if one of those relationships turned sour?",
  "whyItMatters": "Without clear written contracts, you risk costly disputes, miscommunications that erode trust, and legal battles that can derail your business before it even starts. The true cost extends far beyond legal fees—it includes lost time, reputation damage, and immense stress. Conversely, well-crafted agreements provide clarity, build professional trust, protect your intellectual property, define expectations, and offer a clear roadmap for dispute resolution, allowing you to focus on growth with confidence and peace of mind.",
  "howToDoIt": "Approach contracts as tools for clarity and protection, not just legal hurdles. Start by identifying the core relationship type (client, contractor, partner) and the key terms that define it: scope of work, payment structure, timelines, intellectual property ownership, confidentiality, and clear termination clauses. Think of them as living documents that evolve with your business, aiming for simplicity and understanding over impenetrable legal jargon. Prioritize getting something robustly drafted, then seek professional legal review for critical agreements.",
  "whatToStartWith": "Begin by identifying your single most immediate contract need (e.g., your first client service agreement or contractor agreement) and find a reliable template. Focus on customizing the key clauses for scope, deliverables, and payment specific to your initial offering or engagement. Then, consider a test-run with a hypothetical scenario to ensure it addresses potential issues.",
  "premiumFeatures": [
    {
      "id": "ai-contract-draft",
      "icon": "FileText",
      "label": "AI Contract Draft Assistant",
      "tagline": "Generate a customized client service agreement or contractor agreement based on your specific business needs and inputs.",
      "cta": "Draft my contract"
    },
    {
      "id": "ai-simplify-jargon",
      "icon": "BookOpen",
      "label": "AI Legal Jargon Simplifier",
      "tagline": "Upload any contract to instantly simplify complex legal language into easy-to-understand terms.",
      "cta": "Simplify now"
    },
    {
      "id": "ai-risk-detector",
      "icon": "ShieldAlert",
      "label": "AI Contract Risk Detector",
      "tagline": "Scan your drafted contracts to identify potential ambiguities, missing clauses, or common legal pitfalls.",
      "cta": "Scan for risks"
    }
  ]
},
  {
  "id": "protect-3",
  "phase": 8,
  "phaseName": "Protect",
  "order": 3,
  "title": "Protect your intellectual property",
  "description": "Safeguard your unique brand name, logo, and product identity by understanding and protecting your intellectual property before launch.",
  "action": "Search the USPTO database for your business name and logo. Decide whether to file a trademark now or add it to your 90-day plan.",
  "resources": [
    {
      "name": "TMKings",
      "url": "https://www.tmkings.com",
      "affiliate": true,
      "description": "Trademark filing with attorney review and ongoing monitoring",
      "badge": "Best Value"
    },
    {
      "name": "Trademarkia",
      "url": "https://www.trademarkia.com",
      "affiliate": true,
      "description": "Search and file trademarks with legal support and monitoring",
      "badge": "Most Popular"
    },
    {
      "name": "Trademark Engine",
      "url": "https://www.trademarkengine.com",
      "affiliate": true,
      "description": "Affordable trademark filing starting at $99 + USPTO fees"
    },
    {
      "name": "USPTO Trademark Search",
      "url": "https://www.uspto.gov/trademarks/search",
      "description": "Free official search — always start here before filing anything",
      "badge": "Free"
    }
  ],
  "journalPrompt": "Is my brand name unique enough to be worth protecting? What would I lose if someone else trademarked it first?",
  "whyItMatters": "Getting it wrong means facing costly re-branding, potential legal disputes, and the devastating loss of your brand identity after significant investment. Getting it right provides exclusive rights, builds valuable brand equity, and establishes a defensible market position, turning your unique identity into a valuable business asset.",
  "howToDoIt": "Adopt the 'Search, Evaluate, Protect' framework: First, conduct thorough searches to ensure your proposed IP is unique. Second, evaluate the commercial significance and potential enforceability of your IP. Third, decide on a protection strategy (e.g., trademark, copyright) and execute promptly, prioritizing core assets.",
  "whatToStartWith": "Begin by performing a preliminary search of the USPTO database and common search engines for your proposed business name, logo, and product names to identify potential conflicts or existing protections.",
  "premiumFeatures": [
    {
      "id": "ai-trademark-search",
      "icon": "Search",
      "label": "AI Preliminary Trademark Search",
      "tagline": "Receive a concise report on potential conflicts for your brand name and logo from common databases.",
      "cta": "Generate Search Report"
    },
    {
      "id": "ai-brand-uniqueness-analysis",
      "icon": "Lightbulb",
      "label": "AI Brand Uniqueness Analyzer",
      "tagline": "Get an AI-powered assessment of your brand name's distinctiveness and initial protectability.",
      "cta": "Analyze My Brand"
    },
    {
      "id": "ai-ip-filing-insights",
      "icon": "FileText",
      "label": "AI Trademark Class & Strategy Guide",
      "tagline": "Identify relevant trademark classes and receive tailored insights on filing considerations.",
      "cta": "Get Strategy Insights"
    }
  ]
},
  {
  "id": "protect-4",
  "phase": 8,
  "phaseName": "Protect",
  "order": 4,
  "title": "Set up privacy policy and legal compliance",
  "description": "If your website collects any data, you legally need a privacy policy and terms of service to avoid fines, so generate and publish them.",
  "action": "Generate and publish a privacy policy and terms of service on your website.",
  "resources": [
    {
      "name": "Termly",
      "url": "https://termly.io",
      "affiliate": true,
      "description": "Privacy policy + terms generator with automatic GDPR and CCPA updates",
      "badge": "Most Popular"
    },
    {
      "name": "iubenda",
      "url": "https://www.iubenda.com",
      "affiliate": true,
      "description": "GDPR and CCPA compliant policies with ongoing legal monitoring"
    },
    {
      "name": "PrivacyPolicies.com",
      "url": "https://www.privacypolicies.com",
      "description": "Free privacy policy generator — good enough to start",
      "badge": "Free"
    }
  ],
  "journalPrompt": "Is my website legally compliant? What data am I collecting from visitors and am I disclosing it?",
  "whyItMatters": "Ignoring privacy and legal compliance can lead to hefty fines, legal disputes, and irreparable damage to your brand's reputation, especially under regulations like GDPR or CCPA. Conversely, proactively setting up clear policies builds immediate trust with your audience, signals professionalism, and safeguards your business from future liabilities, creating a stable foundation for growth.",
  "howToDoIt": "Adopt the 'Audit-Generate-Publish-Review' framework: First, meticulously audit all data touchpoints on your website to identify what information you collect (e.g., emails, IPs, cookies). Next, use reputable templates or legal tools to generate a comprehensive privacy policy and terms of service tailored to your data practices and target regions. Then, conspicuously publish these documents on your website (typically in the footer). Finally, commit to reviewing and updating them regularly as your business or legal landscape evolves.",
  "whatToStartWith": "Begin by making a detailed list of every single piece of information your website collects from visitors, including email sign-ups, analytics data (like IP addresses or device info), contact form submissions, and cookie usage.",
  "premiumFeatures": [
    {
      "id": "ai-policy-generator",
      "icon": "FileText",
      "label": "AI Legal Policy Generator",
      "tagline": "Instantly generate custom privacy policies and terms of service tailored to your business, data practices, and regional compliance requirements.",
      "cta": "Generate now"
    },
    {
      "id": "ai-data-auditor",
      "icon": "Search",
      "label": "AI Website Data Auditor",
      "tagline": "Scan your website to automatically identify all data collection points, cookies, and third-party scripts that require disclosure.",
      "cta": "Scan my site"
    },
    {
      "id": "ai-compliance-monitor",
      "icon": "Zap",
      "label": "AI Compliance Change Monitor",
      "tagline": "Get real-time alerts on new privacy laws (GDPR, CCPA) affecting your business and suggested updates for your legal documents.",
      "cta": "Activate monitoring"
    }
  ]
},
  {
  "id": "protect-5",
  "phase": 8,
  "phaseName": "Protect",
  "order": 5,
  "title": "Set up password management and security",
  "description": "Secure your business's digital assets by implementing strong password management and multi-factor authentication across all critical accounts.",
  "action": "Install a password manager, enable 2FA on all critical accounts, and audit your existing passwords for reuse.",
  "resources": [
    {
      "name": "1Password Business",
      "url": "https://1password.com/business",
      "affiliate": true,
      "description": "The gold standard for business password management — $7.99/user/mo",
      "badge": "Best for Teams"
    },
    {
      "name": "Bitwarden",
      "url": "https://bitwarden.com",
      "affiliate": true,
      "description": "Open-source password manager with a generous free tier",
      "badge": "Free"
    },
    {
      "name": "Dashlane Business",
      "url": "https://www.dashlane.com/business",
      "affiliate": true,
      "description": "Password manager + dark web monitoring + VPN included"
    },
    {
      "name": "NordPass Business",
      "url": "https://nordpass.com/business-password-manager/",
      "affiliate": true,
      "description": "Easy-to-deploy password manager with admin console"
    },
    {
      "name": "Authy",
      "url": "https://authy.com",
      "description": "Free 2FA app — works with all your accounts",
      "badge": "Free"
    },
    {
      "name": "Backblaze",
      "url": "https://www.backblaze.com",
      "affiliate": true,
      "description": "Automatic computer backup for $9/mo — set it and forget it",
      "badge": "Best Backup"
    }
  ],
  "journalPrompt": "Could someone break into my business accounts right now? How many of my passwords are unique?",
  "whyItMatters": "In an increasingly digital world, your business's security is its foundation. A single compromised credential can lead to devastating financial losses, data breaches, and a destroyed reputation, costing hundreds of thousands in recovery and lost trust. Conversely, robust password management and multi-factor authentication protect your intellectual property, financial accounts, and customer data, providing peace of mind and building a trustworthy, resilient operation from day one.",
  "howToDoIt": "Think of your business's digital security like a fortress: you need strong walls (unique, complex passwords) and a second gate (two-factor authentication) for every critical entrance. The mental model is 'Assume Breach' – always operate as if someone might try to get in, so your defenses must be redundant and robust. Start by identifying your 'crown jewels' – primary email, business banking, domain registrar, and CRM – and prioritize securing those first before expanding to all other accounts. Use a trusted password manager as your central vault, never reusing passwords, and always enabling 2FA where available.",
  "whatToStartWith": "Begin by identifying your five most critical business accounts (e.g., primary email, business bank, payment processor, domain registrar, CRM). Log into each one and immediately verify if you have 2FA enabled. Next, check the strength and uniqueness of the password for each of these core accounts.",
  "premiumFeatures": [
    {
      "id": "ai-security-scan",
      "icon": "ShieldCheck",
      "label": "AI Security Posture Scan",
      "tagline": "Scans your business email and domain for known breaches, leaked credentials, and potential vulnerabilities across the web.",
      "cta": "Run Scan Now"
    },
    {
      "id": "ai-credential-audit",
      "icon": "KeyRound",
      "label": "AI Credential Audit Assistant",
      "tagline": "Analyzes your unique credentials for reuse patterns and identifies accounts needing stronger, unique passwords.",
      "cta": "Start Audit"
    },
    {
      "id": "ai-2fa-guide",
      "icon": "Fingerprint",
      "label": "AI 2FA Implementation Guide",
      "tagline": "Generates tailored, step-by-step instructions for enabling Two-Factor Authentication on your critical business platforms.",
      "cta": "Generate Guide"
    }
  ]
},
  {
  "id": "sell-1",
  "phase": 9,
  "phaseName": "Sell",
  "order": 1,
  "title": "Build your email list and launch announcement",
  "description": "Build your email list, which is your only owned audience, and craft a launch announcement that clearly explains your offering and how to get started.",
  "action": "Set up email marketing, import your contacts, and write your launch announcement email.",
  "resources": [
    {
      "name": "Kit (ConvertKit)",
      "url": "https://convertkit.com",
      "affiliate": true,
      "description": "Email marketing built for independent businesses — 30% recurring commission",
      "badge": "Best for Creators"
    },
    {
      "name": "ActiveCampaign",
      "url": "https://www.activecampaign.com",
      "affiliate": true,
      "description": "Email + automation + CRM — the most powerful tool for serious list building",
      "badge": "Best Automation"
    },
    {
      "name": "Beehiiv",
      "url": "https://www.beehiiv.com",
      "affiliate": true,
      "description": "Newsletter platform with built-in growth tools and monetization"
    },
    {
      "name": "Mailchimp",
      "url": "https://mailchimp.com",
      "affiliate": true,
      "description": "Free up to 500 subscribers — good starting point",
      "badge": "Free to Start"
    }
  ],
  "journalPrompt": "Who are the first 50 people I will email when I launch? Do I have their email addresses?",
  "whyItMatters": "Launching a business without a pre-built list of warm contacts means shouting into the void, leaving your success to the whims of platform algorithms and costly cold outreach. The cost of getting this wrong is low initial traction, wasted marketing spend, and the potential for a slow, painful start. Getting it right, however, means leveraging trust and existing relationships to generate immediate interest, gather early adopters, collect vital feedback, and create powerful social proof, providing a direct and reliable channel to convert initial curiosity into paying customers and significant launch momentum.",
  "howToDoIt": "Adopt a 'Concentric Circles of Influence' mental model: start with your warmest contacts who already know and trust you (family, friends, mentors), then expand to professional contacts, former colleagues, and acquaintances who might benefit from your offering or know someone who would. For the announcement, use a 'Problem-Solution-Value Proposition-Call to Action' framework, focusing on how your business addresses their needs and clearly outlining the next steps for them to engage.",
  "whatToStartWith": "Begin by identifying your 'inner circle' – the individuals who are most likely to support your launch, provide feedback, or spread the word about your new venture.",
  "premiumFeatures": [
    {
      "id": "ai-launch-email-draft",
      "icon": "Mail",
      "label": "AI Launch Announcement Draft",
      "tagline": "Generate a compelling launch announcement email tailored to your business, audience, and key value proposition.",
      "cta": "Draft my email"
    },
    {
      "id": "ai-subject-line-optimizer",
      "icon": "Zap",
      "label": "AI Subject Line & CTA Optimizer",
      "tagline": "Get AI-generated, high-performing subject lines and calls-to-action to maximize email open rates and engagement.",
      "cta": "Optimize now"
    },
    {
      "id": "ai-personalization-suggestor",
      "icon": "Users",
      "label": "AI Personalized Email Variants",
      "tagline": "Receive personalized opening and closing suggestions for different contact segments to boost connection and relevance.",
      "cta": "Get suggestions"
    }
  ]
},
  {
  "id": "sell-2",
  "phase": 9,
  "phaseName": "Sell",
  "order": 2,
  "title": "Tell your personal network first",
  "description": "Your first customer is almost certainly someone you already know — or someone they know, and personal outreach converts at 10-50x better than cold outreach or ads.",
  "action": "Send a personal message to 30 specific people in your network about your new business. Email first, then DM. No mass email — individual messages.",
  "resources": [
    {
      "name": "LinkedIn",
      "url": "https://www.linkedin.com",
      "description": "Best platform for B2B and professional service announcements",
      "badge": "Free"
    },
    {
      "name": "Loom",
      "url": "https://www.loom.com",
      "affiliate": true,
      "description": "Send a personal video message — 3x more responses than text alone",
      "badge": "Most Engaging"
    },
    {
      "name": "Kit (ConvertKit)",
      "url": "https://convertkit.com",
      "affiliate": true,
      "description": "Start capturing emails from everyone who shows interest"
    }
  ],
  "journalPrompt": "Who in my network could be a customer — or refer me to one — and have I actually asked them?",
  "whyItMatters": "Skipping this step means you'll likely spend significantly more time and money pursuing cold leads or expensive ads, burning through resources without the crucial early validation and sales momentum. Getting it right, however, means leveraging existing trust to secure your first paying customers quickly, gather invaluable feedback, and gain early testimonials that will fuel your growth much more efficiently than any other strategy.",
  "howToDoIt": "Adopt the 'Concentric Circles of Trust' framework: Start with your inner circle of closest friends and family who genuinely want to see you succeed, then expand to professional acquaintances, mentors, and past colleagues. Approach each person with a spirit of genuine sharing and curiosity, clearly articulating what problem you solve and asking for feedback, introductions, or their direct business if it's a fit.",
  "whatToStartWith": "Begin by listing 10-15 individuals from your immediate network (personal and professional) who either understand your industry, might directly benefit from your offering, or are well-connected and likely to know someone who could.",
  "premiumFeatures": [
    {
      "id": "ai-message-draft",
      "icon": "FileText",
      "label": "Personal Outreach Message Drafts",
      "tagline": "Generate personalized, non-awkward outreach messages tailored for different relationship types in your network.",
      "cta": "Generate now"
    },
    {
      "id": "ai-network-analyzer",
      "icon": "Users",
      "label": "Network Potential Analyzer",
      "tagline": "Identify and prioritize potential customers or referrers within your network based on business relevance and connection strength.",
      "cta": "Analyze network"
    }
  ]
},
  {
  "id": "sell-3",
  "phase": 9,
  "phaseName": "Sell",
  "order": 3,
  "title": "Get listed where your customers are looking",
  "description": "For local and service businesses, securing directory listings and marketplace presence drives significant early revenue by meeting customers where they are already searching.",
  "action": "Create or optimize your listing on the 2-3 platforms most relevant to your business type and location.",
  "resources": [
    {
      "name": "Google Business Profile",
      "url": "https://business.google.com",
      "description": "Free — the most important local listing you can have",
      "badge": "Free"
    },
    {
      "name": "Yelp for Business",
      "url": "https://biz.yelp.com",
      "affiliate": true,
      "description": "Critical for restaurants, retail, and local service businesses"
    },
    {
      "name": "Thumbtack",
      "url": "https://www.thumbtack.com",
      "affiliate": true,
      "description": "Lead generation for home services, events, and personal services"
    },
    {
      "name": "Angi",
      "url": "https://www.angi.com",
      "affiliate": true,
      "description": "Home services marketplace — strong lead volume for contractors and trades"
    },
    {
      "name": "Bark.com",
      "url": "https://www.bark.com",
      "affiliate": true,
      "description": "Leads for service businesses across hundreds of categories"
    },
    {
      "name": "Etsy",
      "url": "https://www.etsy.com/sell",
      "description": "Best marketplace for handmade, vintage, and craft product businesses",
      "badge": "Best for Makers"
    }
  ],
  "journalPrompt": "Where do my customers go when they are looking for what I offer? Am I showing up there?",
  "whyItMatters": "Getting this wrong means missing out on your most accessible, high-intent customers who are actively searching for your service, often leading to wasted ad spend and a slower path to profitability. Nailing it, however, grants you immediate, cost-effective access to an existing audience ready to buy, establishing early revenue streams and building crucial initial credibility without needing to 'find' customers from scratch.",
  "howToDoIt": "Adopt the 'Customer Path to Purchase' mental model: envision your ideal customer's journey when they realize they need what you offer. What search terms do they use? Which online directories, social platforms, or specialized marketplaces are their first stops for discovery and validation? Prioritize platforms based on direct customer intent and relevance to your niche, focusing on creating compelling, complete profiles rather than just generic listings.",
  "whatToStartWith": "Begin by actively brainstorming and listing the top 3-5 places—online directories, social media platforms, industry-specific forums, or marketplaces—where you believe your ideal customers would start their search when looking for a business like yours.",
  "premiumFeatures": [
    {
      "id": "ai-platform-locator",
      "icon": "Search",
      "label": "AI Platform & Directory Finder",
      "tagline": "Instantly identify the top 3-5 most relevant online directories, local search engines, and marketplaces for your specific business type and location.",
      "cta": "Generate now"
    },
    {
      "id": "ai-listing-content-creator",
      "icon": "FileText",
      "label": "AI Listing Content Creator",
      "tagline": "Generate optimized, keyword-rich descriptions, service lists, and business profiles tailored for maximum visibility on selected platforms.",
      "cta": "Generate now"
    },
    {
      "id": "ai-profile-strength-analyzer",
      "icon": "LayoutDashboard",
      "label": "AI Profile Strength Analyzer",
      "tagline": "Get an AI-powered assessment of your current online presence across key platforms, highlighting areas for optimization and consistency.",
      "cta": "Generate now"
    }
  ]
},
  {
  "id": "sell-4",
  "phase": 9,
  "phaseName": "Sell",
  "order": 4,
  "title": "Run your first sales conversations",
  "description": "Initiate your first sales conversations, mastering scheduling, objection handling, and confident price delivery to secure early customers.",
  "action": "Book 5 sales calls using a scheduling tool. Practice saying your price out loud without the word 'just' in front of it.",
  "resources": [
    {
      "name": "Calendly",
      "url": "https://calendly.com",
      "affiliate": true,
      "description": "Share one link — customers book directly into your calendar",
      "badge": "Most Popular"
    },
    {
      "name": "HubSpot CRM",
      "url": "https://www.hubspot.com/products/crm",
      "affiliate": true,
      "description": "Free CRM to track every lead and follow-up — never lose a prospect",
      "badge": "Free CRM"
    },
    {
      "name": "Pipedrive",
      "url": "https://www.pipedrive.com",
      "affiliate": true,
      "description": "Visual sales pipeline — simple to set up and powerful for service businesses"
    },
    {
      "name": "HoneyBook",
      "url": "https://www.honeybook.com",
      "affiliate": true,
      "description": "Send proposals, contracts, and collect payment all in one flow"
    }
  ],
  "journalPrompt": "How many sales conversations have I had this week? What objections keep coming up and how do I handle them?",
  "whyItMatters": "Mismanaging early sales conversations can lead to lost revenue, misinformed product development, and a significant blow to founder confidence. Conversely, mastering these initial interactions provides invaluable direct customer feedback, validates your offering with actual revenue, and builds a robust foundation for scaling your sales efforts and refining your value proposition.",
  "howToDoIt": "Approach sales conversations not as pitches, but as collaborative problem-solving sessions. Adopt the 'Listen, Empathize, Solution, Ask' (LESA) framework: genuinely listen to understand their pains, empathize with their challenges, present your solution as the answer, and confidently ask for the business, including your price, without hesitation.",
  "whatToStartWith": "Begin by scheduling your first 3-5 sales calls using a simple calendar tool. Before each call, outline 3 potential objections you anticipate and draft confident, value-driven responses. After each call, immediately record key learnings, specific objections raised, and how you addressed them.",
  "premiumFeatures": [
    {
      "id": "ai-objection-handler",
      "icon": "Megaphone",
      "label": "AI Objection Handler Pro",
      "tagline": "Generate confident, value-driven responses to your most common sales objections.",
      "cta": "Generate now"
    },
    {
      "id": "ai-price-coach",
      "icon": "DollarSign",
      "label": "AI Price Confidence Coach",
      "tagline": "Practice saying your price out loud with AI-generated scripts that remove hesitation and emphasize value.",
      "cta": "Generate now"
    },
    {
      "id": "ai-call-analyzer",
      "icon": "BarChart2",
      "label": "AI Sales Call Insights",
      "tagline": "Upload call notes or transcripts to automatically identify recurring objections, sentiment, and areas for pitch improvement.",
      "cta": "Analyze now"
    }
  ]
},
  {
  "id": "sell-5",
  "phase": 9,
  "phaseName": "Sell",
  "order": 5,
  "title": "Get your first customer and collect feedback",
  "description": "Securing your first paying customer is paramount, as it validates your business and provides essential feedback and testimonials that fuel future growth.",
  "action": "Close your first sale, deliver an exceptional experience, and ask for a written testimonial and a Google review.",
  "resources": [
    {
      "name": "Typeform",
      "url": "https://www.typeform.com",
      "affiliate": true,
      "description": "Beautiful customer feedback surveys they actually complete",
      "badge": "Most Popular"
    },
    {
      "name": "Google Business Profile",
      "url": "https://business.google.com",
      "description": "Ask customers to leave a review directly — link straight to your review form",
      "badge": "Free"
    },
    {
      "name": "Hotjar",
      "url": "https://www.hotjar.com",
      "affiliate": true,
      "description": "See how customers use your website before and after purchase"
    },
    {
      "name": "Tally",
      "url": "https://tally.so",
      "description": "Free feedback form builder",
      "badge": "Free"
    }
  ],
  "journalPrompt": "Did I get my first customer? How did the delivery go? What would I do differently next time?",
  "whyItMatters": "Failing to secure your first customer means your business remains an unproven concept, risking wasted effort and an early demise without the vital feedback and social proof needed to pivot or scale. Conversely, successfully closing that first sale provides invaluable market validation, critical insights for product refinement, and powerful testimonials that act as a magnet for future customers, transforming your initial effort into exponential growth.",
  "howToDoIt": "Adopt the 'Validation Loop' framework: First, **Target & Engage** by pinpointing someone who genuinely needs your solution and approaching them directly with a tailored offer. Second, **Deliver & Delight** by over-delivering on your promise, ensuring their first experience is exceptional. Third, **Listen & Learn** by immediately and proactively seeking specific, actionable feedback. Finally, **Request & Leverage** by gently asking for a written testimonial and a public review based on positive feedback, making it effortless for them.",
  "whatToStartWith": "Identify one highly engaged potential customer and make a concrete plan to present your offer to them within the next 24-48 hours.",
  "premiumFeatures": [
    {
      "id": "ai-outreach-script",
      "icon": "Mail",
      "label": "AI First Customer Outreach Script",
      "tagline": "Craft a compelling, personalized message to your ideal first customer, increasing your chances of conversion.",
      "cta": "Draft My Message"
    },
    {
      "id": "ai-feedback-prompts",
      "icon": "ClipboardList",
      "label": "AI Testimonial & Feedback Prompt Creator",
      "tagline": "Generate effective questions and prompts to collect rich feedback and powerful testimonials from your new customers.",
      "cta": "Generate Prompts"
    },
    {
      "id": "ai-offer-builder",
      "icon": "Gift",
      "label": "AI Irresistible First Offer Builder",
      "tagline": "Design a compelling initial offer or package that maximizes perceived value and minimizes friction for your first customer.",
      "cta": "Build My Offer"
    }
  ]
},
  {
  "id": "operate-1",
  "phase": 10,
  "phaseName": "Operate",
  "order": 1,
  "title": "Set up project management",
  "description": "A robust project management system is essential to track tasks, deadlines, and responsibilities, serving as your business's operating system as you gain clients and recurring work.",
  "action": "Choose a project management tool and set up your core workflows — client delivery, recurring tasks, and priorities.",
  "resources": [
    {
      "name": "Monday.com",
      "url": "https://monday.com",
      "affiliate": true,
      "description": "Visual work OS for teams — highly customizable and scalable",
      "badge": "Most Popular"
    },
    {
      "name": "ClickUp",
      "url": "https://clickup.com",
      "affiliate": true,
      "description": "All-in-one PM with docs, goals, automations, and time tracking",
      "badge": "Best Value"
    },
    {
      "name": "Asana",
      "url": "https://asana.com",
      "affiliate": true,
      "description": "Clean, powerful task management — great for service businesses"
    },
    {
      "name": "Notion",
      "url": "https://www.notion.so",
      "affiliate": true,
      "description": "Flexible workspace combining docs, databases, and project tracking"
    },
    {
      "name": "Linear",
      "url": "https://linear.app",
      "affiliate": true,
      "description": "Beautiful, fast project tracking — built for product and tech teams",
      "badge": "Best for Tech"
    },
    {
      "name": "Trello",
      "url": "https://trello.com",
      "description": "Simple Kanban boards — great free tier for solo founders",
      "badge": "Free"
    }
  ],
  "journalPrompt": "Is anything falling through the cracks right now? What would be the first thing to break if I took a week off?",
  "whyItMatters": "Without a clear project management system, you risk missed deadlines, client dissatisfaction, and the constant stress of things \"falling through the cracks,\" hindering growth and leading to burnout. Conversely, a well-implemented system provides incredible leverage, ensuring smooth operations, delighted clients, clear communication, and the scalability needed to grow confidently, transforming potential chaos into calm control.",
  "howToDoIt": "Adopt the \"Map, Tool, Automate\" framework: First, map out your core workflows (e.g., client onboarding, service delivery, recurring admin) step-by-step, identifying key tasks, dependencies, and owners. Second, choose a project management tool that aligns with your mapped workflows and team size, configuring it to mirror your processes. Third, look for opportunities to automate repetitive tasks within your chosen tool to reduce manual effort and increase consistency.",
  "whatToStartWith": "Begin by listing your three most critical active projects or recurring tasks. For each, identify where you currently track its progress, who is responsible, and its next immediate step.",
  "premiumFeatures": [
    {
      "id": "ai-workflow-template-builder",
      "icon": "LayoutDashboard",
      "label": "AI Workflow Blueprint",
      "tagline": "Generate a customizable project workflow template based on your service type and typical client journey.",
      "cta": "Generate now"
    },
    {
      "id": "ai-pm-tool-advisor",
      "icon": "Tool",
      "label": "Smart PM Tool Advisor",
      "tagline": "Receive personalized recommendations for the best project management tool tailored to your business size, budget, and specific workflow needs.",
      "cta": "Find my tool"
    },
    {
      "id": "ai-sop-generator",
      "icon": "ScrollText",
      "label": "AI Standard Operating Procedure Builder",
      "tagline": "Turn a complex project task into a detailed, step-by-step Standard Operating Procedure (SOP) ready for your team or personal use.",
      "cta": "Build SOP"
    }
  ]
},
  {
  "id": "operate-2",
  "phase": 10,
  "phaseName": "Operate",
  "order": 2,
  "title": "Set up team communication",
  "description": "Set up a dedicated team communication platform to move work conversations out of email for better organization and searchability.",
  "action": "Set up a team chat tool and create channels for your main work areas. Move work conversations out of email.",
  "resources": [
    {
      "name": "Slack",
      "url": "https://slack.com",
      "affiliate": true,
      "description": "The standard for team communication with a massive app ecosystem",
      "badge": "Most Popular"
    },
    {
      "name": "Google Chat",
      "url": "https://workspace.google.com",
      "affiliate": true,
      "description": "Free with Google Workspace — good for small teams already on Gmail"
    },
    {
      "name": "Microsoft Teams",
      "url": "https://www.microsoft.com/en-us/microsoft-teams/",
      "affiliate": true,
      "description": "Included with Microsoft 365 — deep Office integration"
    },
    {
      "name": "Loom",
      "url": "https://www.loom.com",
      "affiliate": true,
      "description": "Async video messages — reduces meetings for distributed teams",
      "badge": "Best Async"
    },
    {
      "name": "Zoom",
      "url": "https://zoom.us",
      "affiliate": true,
      "description": "Video calls for client meetings and team standups"
    }
  ],
  "journalPrompt": "Are important decisions and context being documented somewhere? Or are they living only in my head?",
  "whyItMatters": "Without a structured communication space, critical information gets lost in email threads or one-off DMs, leading to duplicated efforts, missed context, and slow decision-making. This erodes productivity and creates 'knowledge silos.' Getting it right means faster execution, easier team onboarding, a searchable repository of decisions, and a transparent culture that empowers everyone to contribute effectively.",
  "howToDoIt": "Adopt the 'Channel-First' framework: instead of general chat, create distinct channels for specific projects, departments (e.g., Marketing, Sales, Product), or recurring topics (e.g., #general, #announcements, #client-support). Establish clear guidelines for what kind of information belongs in each channel and train your team to post relevant updates, decisions, and files there. Treat each channel as a living, searchable record of that topic, encouraging concise and actionable messages over lengthy discussions.",
  "whatToStartWith": "Begin by identifying 2-3 core work areas or projects that generate frequent decisions or key information. For each, create a dedicated channel in your chosen communication tool and make a conscious effort to post all relevant updates, decisions, and critical context there as they happen, rather than relying on memory or private messages.",
  "premiumFeatures": [
    {
      "id": "ai-channel-planner",
      "icon": "LayoutDashboard",
      "label": "AI Channel Structure Planner",
      "tagline": "Generates a recommended channel hierarchy for your business based on your specific projects and team structure.",
      "cta": "Generate now"
    },
    {
      "id": "ai-comms-policy",
      "icon": "FileText",
      "label": "AI Team Comms Policy Creator",
      "tagline": "Drafts clear, concise communication guidelines and best practices for using your new team chat tool.",
      "cta": "Generate now"
    },
    {
      "id": "ai-decision-logger",
      "icon": "ScrollText",
      "label": "AI Decision Logger & Notetaker",
      "tagline": "Helps you structure and capture key decisions, action items, and context from discussions into a concise, searchable format.",
      "cta": "Generate now"
    }
  ]
},
  {
  "id": "operate-3",
  "phase": 10,
  "phaseName": "Operate",
  "order": 3,
  "title": "Hire your first contractor or find a VA",
  "description": "Delegate low-value tasks to contractors or virtual assistants to free your time for strategic growth and build a true business, not just a job.",
  "action": "List 5 recurring tasks you should not be doing. Post a job or find a VA to take them within the next 30 days.",
  "resources": [
    {
      "name": "Belay",
      "url": "https://belaysolutions.com",
      "affiliate": true,
      "description": "US-based virtual assistants and bookkeepers — vetted and trained",
      "badge": "Best US VAs"
    },
    {
      "name": "Time Etc",
      "url": "https://www.timeetc.com",
      "affiliate": true,
      "description": "US and UK virtual assistants starting at $29/hour"
    },
    {
      "name": "Zirtual",
      "url": "https://zirtual.com",
      "affiliate": true,
      "description": "Dedicated US-based EAs for entrepreneurs — from $549/mo"
    },
    {
      "name": "Magic",
      "url": "https://getmagic.com",
      "affiliate": true,
      "description": "On-demand assistant available 24/7 via text — no long-term contract"
    },
    {
      "name": "Fiverr Business",
      "url": "https://business.fiverr.com",
      "affiliate": true,
      "description": "Hire vetted freelancers for any task with team dashboard"
    },
    {
      "name": "Deel",
      "url": "https://www.deel.com",
      "affiliate": true,
      "description": "Hire and pay contractors and employees in 150+ countries — compliance handled",
      "badge": "Best for Global"
    }
  ],
  "journalPrompt": "What am I doing this week that someone else could do? What is one hour of my time actually worth?",
  "whyItMatters": "Failing to delegate traps you in a high-paying job, not a scalable business. Every hour you spend on a $20 task is an hour *not* spent on $200+ strategic work like sales, product innovation, or vision setting. This opportunity cost stalls growth, leads to burnout, and limits your potential impact. Conversely, mastering delegation frees your most valuable time, allowing you to focus on high-leverage activities that truly scale your business, multiply your output, and move you closer to your entrepreneurial vision.",
  "howToDoIt": "Adopt the 'Founder's Leverage' mindset: Scrutinize every hour you work through the lens of its highest possible value. Identify tasks that are repeatable, teachable, and don't require your unique genius. Systemize these tasks by documenting processes, then quantify the time saved and the strategic value generated by offloading them. Understand the critical distinction between a 1099 contractor (project-based, independent, sets own hours) and a W-2 employee (hourly/salary, directed work) to ensure legal compliance and proper engagement.",
  "whatToStartWith": "Begin by tracking your time for one full day, noting every activity, then list 5 recurring tasks you completed that someone else could reasonably perform with a clear set of instructions.",
  "premiumFeatures": [
    {
      "id": "ai-delegation-blueprint",
      "icon": "ListTodo",
      "label": "AI Delegation Blueprint",
      "tagline": "Analyzes your daily activities to identify delegable tasks and generates a step-by-step delegation plan with suggested instructions.",
      "cta": "Generate now"
    },
    {
      "id": "ai-job-post-creator",
      "icon": "FileText",
      "label": "AI Job Post Creator",
      "tagline": "Crafts optimized job descriptions for VAs and contractors, including key responsibilities, qualifications, and pricing guidance.",
      "cta": "Create post"
    },
    {
      "id": "ai-skill-to-role-matcher",
      "icon": "Lightbulb",
      "label": "AI Skill-to-Role Matcher",
      "tagline": "Suggests ideal contractor roles and essential skills needed based on your identified delegable tasks, streamlining your search.",
      "cta": "Find matches"
    }
  ]
},
  {
  "id": "operate-4",
  "phase": 10,
  "phaseName": "Operate",
  "order": 4,
  "title": "Build your email list and marketing automation",
  "description": "Establish your owned audience by building an email list, offering a lead magnet, and automating a welcome sequence.",
  "action": "Create one lead magnet, publish an opt-in form on your website, and build a 5-email welcome sequence.",
  "resources": [
    {
      "name": "ActiveCampaign",
      "url": "https://www.activecampaign.com",
      "affiliate": true,
      "description": "The most powerful email automation for small businesses — 30% recurring",
      "badge": "Best Automation"
    },
    {
      "name": "Klaviyo",
      "url": "https://www.klaviyo.com",
      "affiliate": true,
      "description": "Email and SMS automation built for ecommerce — native Shopify integration",
      "badge": "Best for Ecommerce"
    },
    {
      "name": "Kit (ConvertKit)",
      "url": "https://convertkit.com",
      "affiliate": true,
      "description": "Visual automation builder — perfect for creator businesses"
    },
    {
      "name": "HubSpot Marketing Hub",
      "url": "https://www.hubspot.com/products/marketing",
      "affiliate": true,
      "description": "Full marketing automation + CRM + analytics — 30% for 12 months"
    },
    {
      "name": "Beehiiv",
      "url": "https://www.beehiiv.com",
      "affiliate": true,
      "description": "Newsletter platform with built-in paid subscriptions and growth tools"
    }
  ],
  "journalPrompt": "What does someone receive from me immediately after joining my email list? Have I built it yet?",
  "whyItMatters": "Without an owned audience, your business operates on rented land, constantly at the mercy of platform algorithms and ever-increasing advertising costs. This dependency can stifle growth, erode profit margins, and leave you vulnerable to sudden changes. By building a direct email list, you cultivate a proprietary asset that provides unparalleled leverage: a direct, cost-effective channel for communication, relationship-building, and sales, insulating your business from external whims and fostering sustainable growth.",
  "howToDoIt": "The 'Value-First Nurture Journey' involves attracting potential customers with an irresistible lead magnet, then immediately delivering on that promise and consistently providing further value through an automated welcome sequence. Each email in the sequence should educate, build trust, and gently guide subscribers towards understanding the unique solutions your business offers, transforming curious visitors into loyal customers.",
  "whatToStartWith": "Start by clearly identifying the specific lead magnet and the very first email a new subscriber will receive immediately after joining your list. This initial interaction sets the tone for your entire relationship.",
  "premiumFeatures": [
    {
      "id": "ai-lead-magnet-architect",
      "icon": "FileText",
      "label": "AI Lead Magnet Architect",
      "tagline": "Generates compelling lead magnet ideas and outlines tailored to your niche and audience, complete with content suggestions.",
      "cta": "Generate Outline"
    },
    {
      "id": "ai-welcome-sequence-builder",
      "icon": "Mail",
      "label": "AI Welcome Sequence Builder",
      "tagline": "Drafts a personalized 5-email welcome sequence designed to nurture and convert new subscribers into loyal customers.",
      "cta": "Compose Sequence"
    },
    {
      "id": "ai-opt-in-copy-generator",
      "icon": "FormInput",
      "label": "AI Opt-in Copy Generator",
      "tagline": "Creates high-converting headlines and calls-to-action for your website's email signup forms to maximize subscriptions.",
      "cta": "Generate Copy"
    }
  ]
},
  {
  "id": "operate-5",
  "phase": 10,
  "phaseName": "Operate",
  "order": 5,
  "title": "Launch your growth engine",
  "description": "Getting your first customer through your network proves your idea, but a repeatable growth engine proves your business, so build the acquisition channel most suited to your business type.",
  "action": "Choose your primary growth channel and run your first paid campaign or publish your first SEO article.",
  "resources": [
    {
      "name": "Google Ads",
      "url": "https://ads.google.com",
      "description": "Search ads — capture people already looking for what you sell",
      "badge": "Highest Intent"
    },
    {
      "name": "Meta Business Suite",
      "url": "https://business.facebook.com",
      "description": "Facebook and Instagram ads — unmatched audience targeting for B2C"
    },
    {
      "name": "Leadpages",
      "url": "https://www.leadpages.com",
      "affiliate": true,
      "description": "High-converting landing pages with proven templates — 30% lifetime recurring",
      "badge": "Best Landing Pages"
    },
    {
      "name": "ClickFunnels",
      "url": "https://www.clickfunnels.com",
      "affiliate": true,
      "description": "Complete sales funnel builder — 40% recurring commission on every plan"
    },
    {
      "name": "Semrush",
      "url": "https://www.semrush.com",
      "affiliate": true,
      "description": "Keyword research and SEO toolkit for organic growth"
    },
    {
      "name": "Surfer SEO",
      "url": "https://surferseo.com",
      "affiliate": true,
      "description": "AI content editor that tells you exactly how to rank — 25% recurring"
    },
    {
      "name": "Apollo.io",
      "url": "https://www.apollo.io",
      "affiliate": true,
      "description": "Find and email any B2B prospect — 275M contacts with built-in sequences",
      "badge": "Best for Outbound"
    },
    {
      "name": "ReferralHero",
      "url": "https://referralhero.com",
      "affiliate": true,
      "description": "Launch a viral referral program — turn customers into your sales team"
    }
  ],
  "journalPrompt": "How am I getting customers today? Will that channel still work in 12 months?",
  "whyItMatters": "Without a repeatable growth engine, your business relies solely on sporadic efforts and personal networks, leading to inconsistent revenue, wasted marketing spend, and an inability to scale beyond a certain point. A well-oiled acquisition channel, however, creates predictable customer flow, unlocks exponential growth, and allows you to confidently invest in what works, proving your business model and significantly increasing its valuation.",
  "howToDoIt": "Adopt the 'Channel-Market Fit' framework: First, deeply understand your ideal customer's behavior and where they spend their time and attention. Second, evaluate potential acquisition channels (paid ads, SEO, social, referrals, outbound) based on their ability to reach that audience efficiently and affordably. Third, select one primary channel for focused experimentation, setting clear metrics for success and iterating rapidly. The goal is to establish a predictable, measurable pathway for customer acquisition before diversifying.",
  "whatToStartWith": "Document your chosen primary growth channel, outline its initial execution plan (e.g., target keywords for SEO, audience segments for paid ads), and clearly define the key performance indicators (KPIs) you'll track to measure its effectiveness.",
  "premiumFeatures": [
    {
      "id": "ai-growth-strategy",
      "icon": "LayoutDashboard",
      "label": "AI Growth Channel Strategist",
      "tagline": "Receive a tailored report suggesting your top 3 most viable customer acquisition channels, complete with audience alignment and initial budget considerations.",
      "cta": "Generate now"
    },
    {
      "id": "ai-campaign-content",
      "icon": "FileText",
      "label": "AI Campaign & Content Builder",
      "tagline": "Generate initial ad copy variants, SEO keyword clusters, or social post ideas optimized for your primary growth channel.",
      "cta": "Generate now"
    },
    {
      "id": "ai-channel-viability",
      "icon": "TrendingUp",
      "label": "AI Future-Proofing Scan",
      "tagline": "Analyze current market trends and competitive dynamics to assess the long-term viability and potential challenges of your chosen growth channel.",
      "cta": "Generate now"
    }
  ]
},
  {
  "id": "operate-6",
  "phase": 10,
  "phaseName": "Operate",
  "order": 6,
  "title": "Set up customer support",
  "description": "Establish a dedicated customer support system to centralize inquiries, improve response times, and gather insights from customer interactions.",
  "action": "Set up a customer support inbox and create canned responses for your 5 most common questions.",
  "resources": [
    {
      "name": "HelpScout",
      "url": "https://www.helpscout.com",
      "affiliate": true,
      "description": "Shared inbox that feels like email — simple, human, and powerful",
      "badge": "Best for Services"
    },
    {
      "name": "Intercom",
      "url": "https://www.intercom.com",
      "affiliate": true,
      "description": "In-app chat + help desk + AI automation for SaaS and apps",
      "badge": "Best for SaaS"
    },
    {
      "name": "Freshdesk",
      "url": "https://freshdesk.com",
      "affiliate": true,
      "description": "Full help desk with ticketing, automation, and reporting — free tier available",
      "badge": "Free to Start"
    },
    {
      "name": "Tidio",
      "url": "https://www.tidio.com",
      "affiliate": true,
      "description": "Live chat and AI chatbot for your website — free plan available",
      "badge": "Free"
    }
  ],
  "journalPrompt": "How long does it take me to respond to a customer question? What is my most asked question that I could automate?",
  "whyItMatters": "Failing to manage customer inquiries effectively can lead to frustrated customers, negative reviews, and high churn rates, directly impacting your brand reputation and bottom line. Conversely, a well-structured support system not only ensures customer satisfaction and loyalty but also provides invaluable data to refine your product and operations, turning every interaction into an opportunity for growth and advocacy.",
  "howToDoIt": "Adopt a 'Centralize, Categorize, Automate, Analyze' framework. First, centralize all customer communications into a dedicated platform (shared inbox or help desk) to ensure no query goes unanswered. Next, categorize incoming questions to identify recurring themes and common pain points. Then, leverage automation by creating canned responses for these frequent inquiries. Finally, regularly analyze your support data to continually refine your responses, identify areas for product improvement, and further optimize your support workflows.",
  "whatToStartWith": "Begin by channeling all new customer inquiries into a temporary shared inbox or a dedicated label in your existing email system for just one week. During this period, actively track the time it takes you to respond to each customer and make a simple tally of the top 5 distinct questions or issues that arise.",
  "premiumFeatures": [
    {
      "id": "ai-canned-response-generator",
      "icon": "FileText",
      "label": "AI Canned Response Drafts",
      "tagline": "Generate professional, empathetic canned responses for your top 5 customer questions instantly.",
      "cta": "Generate now"
    },
    {
      "id": "ai-help-desk-recommendation",
      "icon": "LayoutDashboard",
      "label": "AI Help Desk Selector",
      "tagline": "Receive personalized recommendations for the best customer support platform tailored to your business needs and budget.",
      "cta": "Recommend now"
    },
    {
      "id": "ai-customer-question-categorizer",
      "icon": "Search",
      "label": "AI Question Theme Analyzer",
      "tagline": "Upload past customer emails to automatically identify recurring themes, common questions, and pain points.",
      "cta": "Analyze now"
    }
  ]
},
  {
  "id": "operate-7",
  "phase": 10,
  "phaseName": "Operate",
  "order": 7,
  "title": "Set up analytics and track your key metrics",
  "description": "Establish core analytics, define your most critical metric, and create a simple dashboard to track business performance and drive improvement.",
  "action": "Install Google Analytics 4, set up one conversion event, and identify the single metric that tells you if your business is winning.",
  "resources": [
    {
      "name": "Google Analytics 4",
      "url": "https://analytics.google.com",
      "description": "Free industry-standard web analytics — non-negotiable baseline",
      "badge": "Free"
    },
    {
      "name": "Hotjar",
      "url": "https://www.hotjar.com",
      "affiliate": true,
      "description": "Heatmaps, recordings, and on-site surveys — see what users actually do",
      "badge": "Most Insightful"
    },
    {
      "name": "Mixpanel",
      "url": "https://mixpanel.com",
      "affiliate": true,
      "description": "User behavior analytics for SaaS and apps with powerful free tier"
    },
    {
      "name": "Plausible",
      "url": "https://plausible.io",
      "affiliate": true,
      "description": "Privacy-first analytics — GDPR compliant, no cookie banner required"
    },
    {
      "name": "Google Search Console",
      "url": "https://search.google.com/search-console",
      "description": "See exactly what keywords bring people to your site",
      "badge": "Free"
    }
  ],
  "journalPrompt": "What is the one number that tells me whether my business is growing? Do I know it right now without looking it up?",
  "whyItMatters": "Without clear metrics, you're navigating blind, making costly decisions based on intuition rather than data, which leads to wasted effort and missed growth opportunities. Conversely, by meticulously tracking your key performance indicators, you gain unparalleled clarity, allowing you to quickly identify what's working, pivot from what isn't, and confidently invest in strategies that drive real, measurable business growth.",
  "howToDoIt": "Adopt the 'North Star Metric' framework: identify the single most important metric that best represents the core value your business delivers and correlates directly with long-term success. Focus on actionable metrics that drive behavior, not just vanity metrics. Then, establish a weekly habit of reviewing your dashboard, using the insights to inform your next set of experiments and adjustments, creating a continuous 'Measure-Learn-Grow' feedback loop.",
  "whatToStartWith": "Before diving into complex setups, commit 15 minutes to clearly define the single most critical metric that genuinely signifies your business's success and growth. Write it down, make it specific, and ensure it directly reflects your core business objective.",
  "premiumFeatures": [
    {
      "id": "ai-north-star-metric-assistant",
      "icon": "Target",
      "label": "AI North Star Metric Assistant",
      "tagline": "Get personalized recommendations for your business's primary growth metric and supporting KPIs.",
      "cta": "Generate now"
    },
    {
      "id": "ai-ga4-setup-configurator",
      "icon": "Zap",
      "label": "AI GA4 Setup & Event Configurator",
      "tagline": "Automate your Google Analytics 4 installation and quickly configure key conversion events for tracking.",
      "cta": "Configure now"
    },
    {
      "id": "ai-metrics-dashboard-builder",
      "icon": "LayoutDashboard",
      "label": "AI Metrics Dashboard Builder",
      "tagline": "Generate a simple, focused dashboard template tailored to your North Star Metric and core KPIs.",
      "cta": "Build dashboard"
    }
  ]
},
  {
  "id": "operate-8",
  "phase": 10,
  "phaseName": "Operate",
  "order": 8,
  "title": "Get a business line of credit and plan your finances",
  "description": "Secure a business line of credit before it's critical, and establish a clear financial strategy to manage cash flow and future growth effectively.",
  "action": "Apply for a business line of credit now — even if you do not need it. Review your cash flow runway monthly.",
  "resources": [
    {
      "name": "Bluevine",
      "url": "https://www.bluevine.com",
      "affiliate": true,
      "description": "Line of credit up to $250K — fast approval for established businesses",
      "badge": "Best Line of Credit"
    },
    {
      "name": "Kabbage (Amex)",
      "url": "https://www.kabbage.com",
      "affiliate": true,
      "description": "Flexible line of credit up to $250K with monthly fee structure"
    },
    {
      "name": "Fundbox",
      "url": "https://fundbox.com",
      "affiliate": true,
      "description": "Invoice financing and lines of credit — approved in minutes"
    },
    {
      "name": "OnDeck",
      "url": "https://www.ondeck.com",
      "affiliate": true,
      "description": "Term loans and lines of credit for established small businesses"
    },
    {
      "name": "Nav",
      "url": "https://www.nav.com",
      "affiliate": true,
      "description": "Compare loan and credit options based on your actual business profile"
    },
    {
      "name": "SBA Microloan",
      "url": "https://www.sba.gov/funding-programs/loans/microloans",
      "description": "Up to $50K from nonprofit lenders — ideal for new businesses",
      "badge": "Free to Apply"
    }
  ],
  "journalPrompt": "If my revenue dropped by half next month, how long could I keep operating? Do I have a plan?",
  "whyItMatters": "Ignoring financial planning can lead to missed opportunities, inability to weather slow periods, and even business failure when unexpected costs arise. Proactively establishing a line of credit and understanding your financial runway provides vital flexibility, allows you to confidently seize growth opportunities, maintains operational stability during downturns, and strengthens your business's overall resilience and creditworthiness.",
  "howToDoIt": "Adopt a 'Financial Foresight' mindset by establishing robust financial systems early. First, separate business and personal finances to build a clear credit history. Second, master your 'Burn Rate' by tracking all fixed and variable monthly operating expenses. Third, perform regular 'Cash Flow Scenario Planning'—projecting best-case, realistic, and worst-case revenue alongside expenses to understand your financial vulnerabilities and opportunities. Finally, view a line of credit as a strategic safety net, not a last resort, applying when your business is stable to secure favorable terms.",
  "whatToStartWith": "Immediately calculate your current monthly operating expenses and total liquid assets to determine your immediate cash runway.",
  "premiumFeatures": [
    {
      "id": "cash-flow-planner",
      "icon": "BarChart2",
      "label": "AI Cash Flow Scenario Planner",
      "tagline": "Generate robust best-case, realistic, and worst-case cash flow projections based on your current financials and market assumptions.",
      "cta": "Generate now"
    },
    {
      "id": "lender-matcher",
      "icon": "Zap",
      "label": "AI Lender Compatibility Matcher",
      "tagline": "Identify the most suitable business lenders and line of credit products based on your business type, revenue, and operational history.",
      "cta": "Find matches"
    },
    {
      "id": "burn-rate-calculator",
      "icon": "LayoutDashboard",
      "label": "AI Burn Rate & Runway Calculator",
      "tagline": "Connect your accounting software to instantly calculate your monthly burn rate and projected cash runway.",
      "cta": "Calculate now"
    }
  ]
},
];

export function getStepById(id: string): ChecklistStep | undefined {
  return checklistSteps.find((step) => step.id === id);
}

export function getStepsByPhase(phase: number): ChecklistStep[] {
  return checklistSteps.filter((step) => step.phase === phase);
}

export function getAdjacentSteps(id: string): { prev: ChecklistStep | null; next: ChecklistStep | null } {
  const index = checklistSteps.findIndex((step) => step.id === id);
  return {
    prev: index > 0 ? checklistSteps[index - 1] : null,
    next: index < checklistSteps.length - 1 ? checklistSteps[index + 1] : null,
  };
}

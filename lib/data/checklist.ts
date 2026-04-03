export interface ChecklistResource {
  name: string;
  url: string;
  affiliate?: boolean;
  description?: string;
}

export interface ChecklistStep {
  id: string;
  phase: number;
  phaseName: string;
  order: number;
  title: string;
  description: string;
  action: string;
  resources: ChecklistResource[];
  journalPrompt: string;
}

export interface Phase {
  number: number;
  name: string;
  icon: string;
  description: string;
}

export const phases: Phase[] = [
  { number: 1, name: "Decide", icon: "Lightbulb", description: "Clarify your idea and choose your business type" },
  { number: 2, name: "Form", icon: "FileText", description: "Make it official with the right legal structure" },
  { number: 3, name: "Set Up Money", icon: "DollarSign", description: "Get your finances organized from day one" },
  { number: 4, name: "Brand Basics", icon: "Palette", description: "Build your visual identity and online presence" },
  { number: 5, name: "Protect", icon: "Shield", description: "Cover your bases with insurance and legal docs" },
  { number: 6, name: "Launch", icon: "Rocket", description: "Go live and start serving customers" },
];

export const checklistSteps: ChecklistStep[] = [
  // Phase 1: Decide
  {
    id: "decide-1",
    phase: 1,
    phaseName: "Decide",
    order: 1,
    title: "Define your business idea",
    description: "Write down what you will sell or what service you will offer. Be specific about who your customer is and what problem you solve for them.",
    action: "Write a one-sentence description of your business: I help [who] do [what] by [how].",
    resources: [
      { name: "SBA Business Idea Guide", url: "https://www.sba.gov/business-guide/plan-your-business/market-research-competitive-analysis", description: "Free government guide to refining your idea" },
    ],
    journalPrompt: "What problem does my business solve, and who specifically has this problem?",
  },
  {
    id: "decide-2",
    phase: 1,
    phaseName: "Decide",
    order: 2,
    title: "Research your market",
    description: "Look at who else offers something similar. Understand what makes you different and whether people are willing to pay for your solution.",
    action: "List 3 competitors and write one thing you will do differently from each.",
    resources: [
      { name: "Google Trends", url: "https://trends.google.com", description: "See what people are searching for" },
      { name: "Census Business Builder", url: "https://www.census.gov/data/data-tools/cbb.html", description: "Free demographic and economic data" },
    ],
    journalPrompt: "What did I learn from looking at my competition? What is my unique edge?",
  },
  {
    id: "decide-3",
    phase: 1,
    phaseName: "Decide",
    order: 3,
    title: "Choose your business type",
    description: "Decide whether you are selling products, services, content, or a combination. This affects everything from taxes to daily operations.",
    action: "Select your business type: ecommerce, service-based, content/creator, or hybrid.",
    resources: [
      { name: "SBA Choose Your Business Structure", url: "https://www.sba.gov/business-guide/launch-your-business/choose-business-structure", description: "Government guide to business types" },
    ],
    journalPrompt: "Why did I choose this business type? What feels right about it?",
  },
  {
    id: "decide-4",
    phase: 1,
    phaseName: "Decide",
    order: 4,
    title: "Validate your idea",
    description: "Before investing time and money, test whether real people will pay for what you offer. Talk to potential customers or run a small experiment.",
    action: "Talk to 5 potential customers and ask if they would pay for your solution. Record their responses.",
    resources: [
      { name: "The Mom Test (book summary)", url: "https://www.momtestbook.com", description: "How to talk to customers without leading them" },
    ],
    journalPrompt: "What did people say when I described my business idea? Any surprises?",
  },
  {
    id: "decide-5",
    phase: 1,
    phaseName: "Decide",
    order: 5,
    title: "Set your launch budget",
    description: "Estimate how much money you need to get started. Include one-time costs (formation, website) and monthly costs (tools, marketing).",
    action: "Create a simple spreadsheet with startup costs and monthly expenses for the first 3 months.",
    resources: [
      { name: "SCORE Startup Cost Calculator", url: "https://www.score.org/resource/startup-costs-calculator", description: "Free tool to estimate startup costs" },
    ],
    journalPrompt: "What is my realistic budget? Am I comfortable with this investment?",
  },

  // Phase 2: Form
  {
    id: "form-1",
    phase: 2,
    phaseName: "Form",
    order: 1,
    title: "Choose your legal structure",
    description: "Pick between sole proprietorship, LLC, S-Corp, or corporation. Most small businesses start as an LLC for its balance of simplicity and protection.",
    action: "Research LLC vs sole proprietorship for your state and decide which structure fits best.",
    resources: [
      { name: "ZenBusiness", url: "https://www.zenbusiness.com", affiliate: true, description: "Fast, affordable LLC formation" },
      { name: "LegalZoom", url: "https://www.legalzoom.com", affiliate: true, description: "Well-known legal formation service" },
      { name: "IRS Business Structures", url: "https://www.irs.gov/businesses/small-businesses-self-employed/business-structures", description: "Official IRS guide to entity types" },
    ],
    journalPrompt: "Which legal structure did I choose and why?",
  },
  {
    id: "form-2",
    phase: 2,
    phaseName: "Form",
    order: 2,
    title: "Register your business name",
    description: "Check that your desired business name is available in your state, then register it. If using an LLC, the name registers with your formation.",
    action: "Search your state's business name database and confirm your name is available.",
    resources: [
      { name: "State Business Name Search", url: "https://www.sba.gov/business-guide/launch-your-business/register-your-business", description: "SBA guide with links to all state registries" },
    ],
    journalPrompt: "What name did I choose? Does it feel right for my brand?",
  },
  {
    id: "form-3",
    phase: 2,
    phaseName: "Form",
    order: 3,
    title: "File your formation documents",
    description: "Submit your Articles of Organization (LLC) or Articles of Incorporation to your state. You can do this yourself or use a formation service.",
    action: "File your formation documents with your state or through a formation service.",
    resources: [
      { name: "ZenBusiness Formation", url: "https://www.zenbusiness.com/llc", affiliate: true, description: "LLC formation starting at $0 + state fees" },
      { name: "Northwest Registered Agent", url: "https://www.northwestregisteredagent.com", affiliate: true, description: "Includes registered agent service" },
    ],
    journalPrompt: "I just filed my business formation. How does it feel to make it official?",
  },
  {
    id: "form-4",
    phase: 2,
    phaseName: "Form",
    order: 4,
    title: "Get your EIN",
    description: "Apply for an Employer Identification Number from the IRS. It is free and takes about 5 minutes online. You need this for banking, taxes, and hiring.",
    action: "Apply for your EIN at irs.gov. Save the confirmation letter.",
    resources: [
      { name: "IRS EIN Application", url: "https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online", description: "Free, instant EIN from the IRS" },
    ],
    journalPrompt: "Got my EIN. What did I learn about the process?",
  },
  {
    id: "form-5",
    phase: 2,
    phaseName: "Form",
    order: 5,
    title: "Get required licenses and permits",
    description: "Research what licenses and permits your business needs at the federal, state, and local level. Requirements vary by industry and location.",
    action: "Check your state and city requirements for business licenses and permits.",
    resources: [
      { name: "SBA License & Permit Tool", url: "https://www.sba.gov/business-guide/launch-your-business/apply-licenses-permits", description: "Find required licenses by state and industry" },
    ],
    journalPrompt: "What licenses do I need? Have I applied for all of them?",
  },

  // Phase 3: Set Up Money
  {
    id: "money-1",
    phase: 3,
    phaseName: "Set Up Money",
    order: 1,
    title: "Open a business bank account",
    description: "Keep your personal and business finances separate from day one. This protects your LLC status and makes taxes much easier.",
    action: "Open a dedicated business checking account at a bank or credit union.",
    resources: [
      { name: "Mercury", url: "https://mercury.com", affiliate: true, description: "Modern business banking for startups" },
      { name: "Relay", url: "https://relayfi.com", affiliate: true, description: "Free business banking with smart features" },
      { name: "Bluevine", url: "https://www.bluevine.com", affiliate: true, description: "Business checking with interest" },
    ],
    journalPrompt: "Which bank did I choose and why? How does it feel to have a real business account?",
  },
  {
    id: "money-2",
    phase: 3,
    phaseName: "Set Up Money",
    order: 2,
    title: "Set up accounting software",
    description: "Choose an accounting tool to track income, expenses, and prepare for tax time. Start tracking from your very first transaction.",
    action: "Sign up for accounting software and connect your business bank account.",
    resources: [
      { name: "QuickBooks", url: "https://quickbooks.intuit.com", affiliate: true, description: "Industry standard small business accounting" },
      { name: "Wave", url: "https://www.waveapps.com", affiliate: true, description: "Free accounting software for small businesses" },
      { name: "FreshBooks", url: "https://www.freshbooks.com", affiliate: true, description: "Easy invoicing and expense tracking" },
    ],
    journalPrompt: "Which accounting tool did I pick? Do I feel confident tracking my finances?",
  },
  {
    id: "money-3",
    phase: 3,
    phaseName: "Set Up Money",
    order: 3,
    title: "Set up payment processing",
    description: "Choose how you will accept payments from customers. Consider credit cards, online payments, and invoicing based on your business type.",
    action: "Set up at least one payment method (Stripe, Square, or PayPal) and do a test transaction.",
    resources: [
      { name: "Stripe", url: "https://stripe.com", description: "Online payment processing for internet businesses" },
      { name: "Square", url: "https://squareup.com", affiliate: true, description: "In-person and online payments" },
    ],
    journalPrompt: "How will my customers pay me? Is the process smooth?",
  },
  {
    id: "money-4",
    phase: 3,
    phaseName: "Set Up Money",
    order: 4,
    title: "Understand your tax obligations",
    description: "Learn about quarterly estimated taxes, sales tax requirements, and what expenses you can deduct. Consider consulting a CPA.",
    action: "Research your state sales tax requirements and set up quarterly tax reminders.",
    resources: [
      { name: "IRS Small Business Taxes", url: "https://www.irs.gov/businesses/small-businesses-self-employed", description: "Official IRS small business tax center" },
      { name: "Bench", url: "https://bench.co", affiliate: true, description: "Bookkeeping and tax prep service" },
    ],
    journalPrompt: "What are my main tax obligations? Do I need a CPA?",
  },
  {
    id: "money-5",
    phase: 3,
    phaseName: "Set Up Money",
    order: 5,
    title: "Create your pricing",
    description: "Set prices for your products or services. Consider your costs, competitor pricing, and the value you deliver. Do not underprice yourself.",
    action: "Set your initial pricing for your top 3 offerings and write down your reasoning.",
    resources: [
      { name: "SCORE Pricing Guide", url: "https://www.score.org/resource/how-price-your-products", description: "Free pricing strategy guide" },
    ],
    journalPrompt: "How did I decide on my pricing? Am I charging what I am worth?",
  },

  // Phase 4: Brand Basics
  {
    id: "brand-1",
    phase: 4,
    phaseName: "Brand Basics",
    order: 1,
    title: "Design your logo",
    description: "Create a simple, memorable logo that represents your brand. You do not need to spend thousands. A clean, professional mark is enough to start.",
    action: "Get a logo designed using a tool or freelancer.",
    resources: [
      { name: "Canva Logo Maker", url: "https://www.canva.com/logos", description: "Free logo design tool" },
      { name: "Looka", url: "https://looka.com", affiliate: true, description: "AI-powered logo design" },
      { name: "99designs", url: "https://99designs.com", affiliate: true, description: "Professional logo design marketplace" },
    ],
    journalPrompt: "What does my logo say about my brand? Does it feel like me?",
  },
  {
    id: "brand-2",
    phase: 4,
    phaseName: "Brand Basics",
    order: 2,
    title: "Secure your domain name",
    description: "Buy a domain name that matches or closely relates to your business name. A .com is ideal, but other extensions work too.",
    action: "Search for and purchase your domain name.",
    resources: [
      { name: "Namecheap", url: "https://www.namecheap.com", affiliate: true, description: "Affordable domain registration" },
      { name: "Google Domains", url: "https://domains.google", description: "Simple domain registration from Google" },
    ],
    journalPrompt: "What domain did I choose? Does it match my brand well?",
  },
  {
    id: "brand-3",
    phase: 4,
    phaseName: "Brand Basics",
    order: 3,
    title: "Build your website",
    description: "Create a simple website that explains what you do, who you serve, and how to get started. You do not need dozens of pages. Start with one great page.",
    action: "Set up your website with at least a home page, about section, and contact form.",
    resources: [
      { name: "Squarespace", url: "https://www.squarespace.com", affiliate: true, description: "Beautiful, easy website builder" },
      { name: "Carrd", url: "https://carrd.co", affiliate: true, description: "Simple one-page websites" },
      { name: "WordPress.com", url: "https://wordpress.com", description: "Flexible website platform" },
    ],
    journalPrompt: "How does my website look? Does it clearly communicate my value?",
  },
  {
    id: "brand-4",
    phase: 4,
    phaseName: "Brand Basics",
    order: 4,
    title: "Set up business email",
    description: "Get a professional email address using your domain name. It builds credibility and separates business from personal communications.",
    action: "Set up yourname@yourdomain.com using Google Workspace or another email provider.",
    resources: [
      { name: "Google Workspace", url: "https://workspace.google.com", affiliate: true, description: "Professional email and productivity tools" },
      { name: "Zoho Mail", url: "https://www.zoho.com/mail", description: "Free business email for small teams" },
    ],
    journalPrompt: "Does my email feel professional? Am I ready to send my first business email?",
  },
  {
    id: "brand-5",
    phase: 4,
    phaseName: "Brand Basics",
    order: 5,
    title: "Claim your social media handles",
    description: "Reserve your business name on the social platforms where your customers spend time. You do not need to be active everywhere, but claim the names.",
    action: "Create business accounts on 2-3 social platforms relevant to your audience.",
    resources: [
      { name: "Namechk", url: "https://namechk.com", description: "Check username availability across platforms" },
    ],
    journalPrompt: "Which platforms did I claim? Where do my ideal customers spend their time?",
  },

  // Phase 5: Protect
  {
    id: "protect-1",
    phase: 5,
    phaseName: "Protect",
    order: 1,
    title: "Get business insurance",
    description: "Protect your business with general liability insurance at minimum. Depending on your industry, you may need professional liability or other coverage.",
    action: "Get quotes from at least 2 insurance providers and choose a policy.",
    resources: [
      { name: "Next Insurance", url: "https://www.nextinsurance.com", affiliate: true, description: "Fast, online business insurance" },
      { name: "Hiscox", url: "https://www.hiscox.com", affiliate: true, description: "Small business insurance specialists" },
    ],
    journalPrompt: "What insurance did I get? Do I feel protected?",
  },
  {
    id: "protect-2",
    phase: 5,
    phaseName: "Protect",
    order: 2,
    title: "Create your service agreement or terms",
    description: "Draft a basic service agreement, terms of service, or sales terms. This protects both you and your customers and sets clear expectations.",
    action: "Draft or download a template service agreement and customize it for your business.",
    resources: [
      { name: "Rocket Lawyer", url: "https://www.rocketlawyer.com", affiliate: true, description: "Legal documents and attorney access" },
      { name: "LawDepot", url: "https://www.lawdepot.com", affiliate: true, description: "Free legal document templates" },
    ],
    journalPrompt: "Do I have clear terms for working with clients? What boundaries am I setting?",
  },
  {
    id: "protect-3",
    phase: 5,
    phaseName: "Protect",
    order: 3,
    title: "Set up a privacy policy",
    description: "If you have a website that collects any data (email signups, cookies, analytics), you need a privacy policy. It is required by law in many states.",
    action: "Generate and publish a privacy policy on your website.",
    resources: [
      { name: "Termly", url: "https://termly.io", affiliate: true, description: "Privacy policy generator" },
      { name: "PrivacyPolicies.com", url: "https://www.privacypolicies.com", description: "Free privacy policy generator" },
    ],
    journalPrompt: "Is my website legally compliant? What data am I collecting?",
  },
  {
    id: "protect-4",
    phase: 5,
    phaseName: "Protect",
    order: 4,
    title: "Protect your intellectual property",
    description: "Consider whether you need to trademark your business name or logo. File a trademark if your brand is a core part of your business value.",
    action: "Search the USPTO database for your business name and decide if you need to file a trademark.",
    resources: [
      { name: "USPTO Trademark Search", url: "https://www.uspto.gov/trademarks/search", description: "Official trademark search tool" },
      { name: "Trademarkia", url: "https://www.trademarkia.com", affiliate: true, description: "Trademark filing service" },
    ],
    journalPrompt: "Is my brand name unique enough? Should I trademark it now or later?",
  },
  {
    id: "protect-5",
    phase: 5,
    phaseName: "Protect",
    order: 5,
    title: "Set up data backups",
    description: "Protect your business data with regular backups. Use cloud storage for important documents, customer data, and financial records.",
    action: "Set up automatic cloud backups for your critical business files.",
    resources: [
      { name: "Google Drive", url: "https://drive.google.com", description: "Free cloud storage with 15GB" },
      { name: "Backblaze", url: "https://www.backblaze.com", affiliate: true, description: "Affordable automatic computer backup" },
    ],
    journalPrompt: "Are my important business files backed up? What would I lose if my computer died tomorrow?",
  },

  // Phase 6: Launch
  {
    id: "launch-1",
    phase: 6,
    phaseName: "Launch",
    order: 1,
    title: "Create your launch announcement",
    description: "Write a clear, exciting announcement for your network. Tell people what you are offering, who it is for, and how to get started.",
    action: "Write and schedule your launch post for social media and email.",
    resources: [
      { name: "Mailchimp", url: "https://mailchimp.com", affiliate: true, description: "Email marketing for small businesses" },
      { name: "ConvertKit", url: "https://convertkit.com", affiliate: true, description: "Email marketing for creators" },
    ],
    journalPrompt: "What does my launch announcement say? Am I excited to share this?",
  },
  {
    id: "launch-2",
    phase: 6,
    phaseName: "Launch",
    order: 2,
    title: "Tell your personal network",
    description: "Let friends, family, and professional contacts know about your business. Personal referrals are often the first source of customers.",
    action: "Send a personal message to 20 people in your network about your new business.",
    resources: [
      { name: "LinkedIn", url: "https://www.linkedin.com", description: "Professional networking platform" },
    ],
    journalPrompt: "How did people react when I told them? Any early interest or leads?",
  },
  {
    id: "launch-3",
    phase: 6,
    phaseName: "Launch",
    order: 3,
    title: "Set up Google Business Profile",
    description: "If you serve local customers, a Google Business Profile helps you appear in local search results and Google Maps. It is free and essential.",
    action: "Create and verify your Google Business Profile listing.",
    resources: [
      { name: "Google Business Profile", url: "https://business.google.com", description: "Free local business listing" },
    ],
    journalPrompt: "Is my business showing up on Google? What does my listing look like?",
  },
  {
    id: "launch-4",
    phase: 6,
    phaseName: "Launch",
    order: 4,
    title: "Get your first customer",
    description: "This is the most important step. Focus all your energy on getting one paying customer. It validates everything you have built.",
    action: "Reach out to your warmest leads and make your first sale or booking.",
    resources: [
      { name: "Calendly", url: "https://calendly.com", affiliate: true, description: "Easy scheduling for client calls" },
    ],
    journalPrompt: "Did I get my first customer? What did it feel like? What did I learn?",
  },
  {
    id: "launch-5",
    phase: 6,
    phaseName: "Launch",
    order: 5,
    title: "Set up your feedback loop",
    description: "Create a simple way to collect feedback from your first customers. Their input will help you improve and grow.",
    action: "Send a short survey or follow-up email to your first customers asking for feedback.",
    resources: [
      { name: "Tally", url: "https://tally.so", description: "Free, beautiful form builder" },
      { name: "Typeform", url: "https://www.typeform.com", affiliate: true, description: "Interactive surveys and forms" },
    ],
    journalPrompt: "What feedback did my first customers give me? What will I change based on it?",
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

import type { Guide } from "./types";

export const guides: Guide[] = [

  // ─── 1. VALUE-BASED vs COST-PLUS vs COMPETITIVE ───────────────────────────
  {
    slug: "value-based-vs-cost-plus-vs-competitive-pricing",
    phase: 3,
    phaseName: "Price",
    title: "Value-Based vs Cost-Plus vs Competitive Pricing: How to Choose",
    metaTitle: "Value-Based vs Cost-Plus vs Competitive Pricing",
    metaDescription:
      "Compare the three core pricing strategies side-by-side and learn which one fits your business, customer, and stage.",
    primaryKeyword: "value-based vs cost-plus vs competitive pricing",
    secondaryKeywords: [
      "pricing strategy for small business",
      "how to choose a pricing model",
      "cost-plus pricing example",
      "value-based pricing explained",
    ],
    readTime: 7,
    intro:
      "Every business picks a pricing strategy — most founders pick the wrong one by accident. Cost-plus feels safe, competitive feels logical, and value-based feels risky. This guide breaks down how each method works, when each one wins, and how to choose.",
    sections: [
      {
        heading: "The quick answer",
        body: "For most early-stage service businesses and digital products, value-based pricing produces the highest margins. Cost-plus is safest for physical goods with predictable unit economics. Competitive pricing is a fallback when you genuinely cannot differentiate.",
      },
      {
        heading: "Side-by-side breakdown",
        body: "Cost-plus pricing: you add a target margin on top of your unit cost. Simple, defensible, but completely ignores what the market will actually pay.\n\nCompetitive pricing: you anchor to what others charge. Easy to research, but you inherit your competitors' margin problems and race them to the bottom.\n\nValue-based pricing: you anchor to the outcome the customer gets. Requires you to understand their alternative — doing nothing, hiring someone, or buying a competing solution — and price against that cost, not your cost.",
      },
      {
        heading: "When to choose cost-plus",
        body: "Use cost-plus when your product is a commodity, when procurement teams require cost transparency (government contracts, wholesale), or when your unit economics are so tight that margin discipline is the only lever you have. Physical goods with predictable COGS fit this model well.",
      },
      {
        heading: "When to choose value-based",
        body: "Use value-based pricing when your customer's pain is quantifiable — time saved, revenue gained, cost avoided — and when you can articulate the before and after. Software, consulting, coaching, and productized services almost always have more room for value-based pricing than founders assume.",
      },
      {
        heading: "The verdict",
        body: "Start with cost-plus to set your floor. Research competitors to set your range. Then ask: what is the outcome worth to the customer? Price at 10-20% of the value you deliver, not at cost plus a fixed margin. Most founders leave money on the table by anchoring too low.",
      },
      {
        heading: "How to get started",
        body: "Write down three numbers: your true cost floor, the median competitor price, and the quantified value your customer gets. If your current price is closer to your cost floor than to the value number, you have room to move. Run one conversation with a customer where you ask what the problem was costing them before they found you.",
      },
    ],
    checklistStepIds: ["price-1", "price-2", "price-3"],
    affiliates: [
      {
        name: "SCORE Pricing Guide",
        url: "https://www.score.org/resource/how-price-your-products",
        description: "Free pricing strategy guide from SCORE mentors",
        badge: "Free",
      },
      {
        name: "Notion",
        url: "https://www.notion.so",
        description: "Build a pricing model and cost breakdown document",
        affiliate: true,
        badge: "Most Popular",
      },
    ],
    faqs: [
      {
        question: "Can I use multiple pricing strategies at once?",
        answer:
          "Yes. You might price your base tier competitively to win against alternatives, then price premium tiers on value. The strategies are not mutually exclusive — your floor is cost-based, your ceiling is value-based.",
      },
      {
        question: "Is value-based pricing only for expensive products?",
        answer:
          "No. A $29/month tool that saves 5 hours a week is deeply value-priced — the value is far higher than $29. Value-based pricing is about the ratio of price to outcome, not the absolute dollar amount.",
      },
    ],
    relatedSlugs: [
      "freemium-vs-free-trial-vs-paid-only",
      "monthly-vs-annual-pricing-saas",
      "per-seat-vs-flat-rate-vs-usage-based",
    ],
    publishedAt: "2025-01-15",
  },

  // ─── 2. STRIPE vs PAYPAL vs SQUARE ────────────────────────────────────────
  {
    slug: "stripe-vs-paypal-vs-square-best-payment-processor",
    phase: 3,
    phaseName: "Price",
    title: "Stripe vs PayPal vs Square: Best Payment Processor for Startups",
    metaTitle: "Stripe vs PayPal vs Square for Startups (2025)",
    metaDescription:
      "Stripe, PayPal, and Square compared side-by-side. Find out which payment processor fits your business type, volume, and setup.",
    primaryKeyword: "stripe vs paypal vs square",
    secondaryKeywords: [
      "best payment processor for small business",
      "stripe vs square",
      "paypal vs stripe fees",
      "how to accept payments online",
    ],
    readTime: 8,
    intro:
      "Stripe, PayPal, and Square all let you accept money — but they are built for very different businesses. Picking the wrong one costs you in fees, checkout friction, and missed integrations. Here is how to choose the one that fits what you are actually building.",
    sections: [
      {
        heading: "The quick answer",
        body: "Stripe wins for online-first businesses, developers, and SaaS. Square wins for in-person retail and food service. PayPal wins when your customers expect to pay with a PayPal balance and trust is a barrier.",
      },
      {
        heading: "Side-by-side breakdown",
        body: "Stripe: 2.9% + 30 cents per transaction online. Best-in-class API and developer docs. Supports subscriptions, invoicing, usage-based billing natively. Requires some technical setup for custom checkout flows.\n\nPayPal: 3.49% + 49 cents for standard checkout. Higher brand recognition with older and international shoppers. Easy setup with no code required. Checkout redirects can hurt conversion on desktop.\n\nSquare: 2.6% + 10 cents in-person, 2.9% + 30 cents online. Free card reader for in-person sales. POS system built-in. Less powerful for subscription or digital product businesses.",
      },
      {
        heading: "When to choose Stripe",
        body: "Choose Stripe if you are selling online, running subscriptions, building a SaaS product, or want developer-grade control over your checkout. Stripe's billing and revenue recovery tools (retry logic, dunning emails) pay for themselves in reduced churn.",
      },
      {
        heading: "When to choose Square",
        body: "Choose Square if you have a physical location, do pop-up markets, or run a restaurant or service business with in-person transactions. The free card reader and integrated POS system eliminate the need for separate hardware.",
      },
      {
        heading: "The verdict",
        body: "Most new online businesses should start with Stripe. Add PayPal as a secondary checkout option if your customer base expects it — conversion data shows 5-15% of buyers prefer to use their PayPal balance. Use Square only if in-person payments are a primary channel.",
      },
      {
        heading: "How to get started",
        body: "Create a Stripe account at stripe.com — you can have a payment link live in under 10 minutes with no code. Run a $1 test transaction to yourself before your first real customer. If you need in-person capability, order the free Square reader and set up your item catalog before your first event or appointment.",
      },
    ],
    checklistStepIds: ["price-4"],
    affiliates: [
      {
        name: "Stripe",
        url: "https://stripe.com",
        description: "Best online payment processor — create a payment link in under 10 minutes",
        badge: "Best for Online",
      },
      {
        name: "Square",
        url: "https://squareup.com",
        description: "Free card reader and POS for in-person and online payments",
        affiliate: true,
        badge: "Best In-Person",
      },
      {
        name: "PayPal Business",
        url: "https://www.paypal.com/us/business",
        description: "Widely trusted — your customers already have an account",
      },
    ],
    faqs: [
      {
        question: "Can I use Stripe and PayPal at the same time?",
        answer:
          "Yes, and many businesses do. Platforms like Shopify and WooCommerce let you enable both as checkout options simultaneously. Stripe handles most transactions while PayPal captures buyers who prefer it.",
      },
      {
        question: "Does Stripe charge a monthly fee?",
        answer:
          "No. Stripe's standard plan is pay-as-you-go at 2.9% + 30 cents per transaction with no monthly fee. Stripe Billing for subscriptions and some advanced features have separate pricing.",
      },
    ],
    relatedSlugs: [
      "gumroad-vs-lemon-squeezy-vs-payhip",
      "quickbooks-vs-freshbooks-vs-wave",
      "value-based-vs-cost-plus-vs-competitive-pricing",
    ],
    publishedAt: "2025-01-22",
  },

  // ─── 3. GUMROAD vs LEMON SQUEEZY vs PAYHIP ────────────────────────────────
  {
    slug: "gumroad-vs-lemon-squeezy-vs-payhip",
    phase: 3,
    phaseName: "Price",
    title: "Gumroad vs Lemon Squeezy vs Payhip: Best Platform for Digital Products",
    metaTitle: "Gumroad vs Lemon Squeezy vs Payhip (2025)",
    metaDescription:
      "Sell ebooks, courses, templates, or software? Compare Gumroad, Lemon Squeezy, and Payhip on fees, features, and tax handling.",
    primaryKeyword: "gumroad vs lemon squeezy vs payhip",
    secondaryKeywords: [
      "best platform for selling digital products",
      "gumroad fees",
      "lemon squeezy review",
      "how to sell ebooks online",
    ],
    readTime: 7,
    intro:
      "Gumroad made selling digital products mainstream. Lemon Squeezy became the go-to for developers selling software. Payhip carved out a free-plan niche. Which one you choose affects your take-home on every sale. Here is the full comparison.",
    sections: [
      {
        heading: "The quick answer",
        body: "Gumroad is the fastest to launch for simple digital products. Lemon Squeezy is best when you need automatic tax compliance (VAT, sales tax) for software and SaaS. Payhip is the best free option for low-volume sellers who do not want a monthly fee.",
      },
      {
        heading: "Side-by-side breakdown",
        body: "Gumroad: 10% flat transaction fee on the free plan, drops with paid plans. Handles taxes in many jurisdictions but you manage setup. Clean storefront with built-in audience features.\n\nLemon Squeezy: 5% + 50 cents per transaction, no monthly fee. Acts as Merchant of Record — they handle all sales tax and VAT globally so you never file. Best for SaaS, subscriptions, and software with global buyers.\n\nPayhip: 5% on free plan, 2% on Plus ($29/mo), 0% on Pro ($99/mo). Handles EU VAT automatically. Good for ebooks, courses, and memberships. Smaller customer base discovery than Gumroad.",
      },
      {
        heading: "When to choose Gumroad",
        body: "Choose Gumroad when you have an existing audience driving traffic to your product and want the fastest, simplest setup. Gumroad's discover feature can generate some organic sales. Good for writers, designers, and creators with a newsletter or social following.",
      },
      {
        heading: "When to choose Lemon Squeezy",
        body: "Choose Lemon Squeezy if you are selling software, plugins, SaaS seats, or any product to international buyers where tax compliance is a real concern. Their Merchant of Record model means they collect, remit, and are legally responsible for all sales taxes — you never deal with VAT or state sales tax.",
      },
      {
        heading: "The verdict",
        body: "For pure digital content (ebooks, templates, presets): Gumroad. For software, SaaS, or anything with global sales tax complexity: Lemon Squeezy. For a free option to start with minimal volume: Payhip. Most founders making over $1,000/month should be on a paid plan to reduce transaction fees — they pay for themselves quickly.",
      },
      {
        heading: "How to get started",
        body: "List your product on your chosen platform before you build an audience — having a live sales page forces you to write your positioning clearly. Upload your file, set your price, and share the link with the 10 people most likely to buy. That first sale teaches you more than any planning.",
      },
    ],
    checklistStepIds: ["price-3", "price-4"],
    affiliates: [
      {
        name: "Lemon Squeezy",
        url: "https://www.lemonsqueezy.com",
        description: "Sell digital products and subscriptions with built-in tax compliance",
        affiliate: true,
        badge: "Best for Software",
      },
      {
        name: "Gumroad",
        url: "https://gumroad.com",
        description: "Fastest setup for creators selling digital products",
      },
      {
        name: "Payhip",
        url: "https://payhip.com",
        description: "Free plan with EU VAT handling — best for getting started",
        badge: "Free Option",
      },
    ],
    faqs: [
      {
        question: "Do these platforms handle EU VAT automatically?",
        answer:
          "Lemon Squeezy handles it fully as Merchant of Record. Payhip handles EU VAT automatically. Gumroad handles some jurisdictions but the responsibility varies — check their current tax pages before selling to EU customers at scale.",
      },
      {
        question: "Can I migrate from Gumroad to Lemon Squeezy later?",
        answer:
          "Yes. You can export your products and customer list and recreate your store. The main friction is updating any links you have published. Many founders start on Gumroad and migrate when sales tax compliance becomes a real concern.",
      },
    ],
    relatedSlugs: [
      "stripe-vs-paypal-vs-square-best-payment-processor",
      "monthly-vs-annual-pricing-saas",
      "per-seat-vs-flat-rate-vs-usage-based",
    ],
    publishedAt: "2025-01-29",
  },

  // ─── 4. MONTHLY vs ANNUAL PRICING ─────────────────────────────────────────
  {
    slug: "monthly-vs-annual-pricing-saas",
    phase: 3,
    phaseName: "Price",
    title: "Monthly vs Annual Pricing: Which Converts Better for SaaS",
    metaTitle: "Monthly vs Annual Pricing for SaaS: Which to Offer",
    metaDescription:
      "Should you offer monthly, annual, or both? Compare conversion rates, churn impact, and cash flow tradeoffs for early-stage SaaS businesses.",
    primaryKeyword: "monthly vs annual pricing SaaS",
    secondaryKeywords: [
      "annual plan discount strategy",
      "saas pricing tiers",
      "subscription pricing models",
      "how to reduce churn saas",
    ],
    readTime: 6,
    intro:
      "Monthly pricing is easier to sell. Annual pricing changes your business. The gap between those two statements is where most SaaS founders lose a year of cash flow and momentum. Here is how to decide which to lead with and when to add the other.",
    sections: [
      {
        heading: "The quick answer",
        body: "Offer monthly to reduce signup friction. Offer annual with a 15-20% discount to lock in cash and reduce churn. Most SaaS businesses should offer both from day one, with annual as the clearly highlighted default on the pricing page.",
      },
      {
        heading: "Side-by-side breakdown",
        body: "Monthly pricing: lower commitment, easier to sell, higher churn risk, predictable recurring revenue but more cancellation exposure. Customers who sign up monthly churn 2-4x more in the first 90 days.\n\nAnnual pricing: 12 months of cash upfront, dramatically lower churn (annual customers who make it to renewal renew at 70-85%+ for most B2B SaaS), forces customers to actually use the product to justify renewal. Harder initial sale, especially without brand trust.",
      },
      {
        heading: "When to lead with monthly",
        body: "Lead with monthly when you are pre-product-market fit and need feedback volume, when your customer has a short buying cycle and cannot get budget approval for annual software, or when you are in a category where monthly is the norm (consumer apps, tools under $20/month).",
      },
      {
        heading: "When to push annual",
        body: "Push annual when you have validated retention past 90 days, when your customer needs the tool ongoing (not project-based), or when you are trying to extend your runway without raising more capital. A single annual campaign to existing monthly customers can fund 2-3 months of operations.",
      },
      {
        heading: "The verdict",
        body: "Start with monthly to reduce friction. Add annual billing within your first 60 days — offer a 15-20% discount (2 months free framing converts better than percent framing). Highlight the annual plan on your pricing page. Within 6 months, track your monthly-to-annual conversion rate as a key metric.",
      },
      {
        heading: "How to get started",
        body: "In Stripe Billing, create both a monthly and annual price for each product tier. Set your annual price at monthly x 10 (giving 2 months free). On your pricing page, show annual as the default toggle with the savings badge. Send one email to your monthly subscribers explaining the upgrade — most SaaS founders are surprised by the conversion rate.",
      },
    ],
    checklistStepIds: ["price-3", "price-4"],
    affiliates: [
      {
        name: "Stripe",
        url: "https://stripe.com",
        description: "Handle both monthly and annual subscriptions with built-in dunning",
        badge: "Best for SaaS",
      },
      {
        name: "Lemon Squeezy",
        url: "https://www.lemonsqueezy.com",
        description: "Subscriptions with tax compliance built in",
        affiliate: true,
      },
    ],
    faqs: [
      {
        question: "What discount should I offer for annual?",
        answer:
          "15-20% is the standard range. 'Get 2 months free' framing outperforms '17% off' framing for most audiences even though they are mathematically identical — the free months feel more tangible.",
      },
      {
        question: "What if a customer on annual wants to cancel mid-year?",
        answer:
          "Have a refund policy ready. Most B2B SaaS offer prorated refunds for remaining months or credit toward a future product. Being fair here preserves the relationship and referrals.",
      },
    ],
    relatedSlugs: [
      "per-seat-vs-flat-rate-vs-usage-based",
      "freemium-vs-free-trial-vs-paid-only",
      "stripe-vs-paypal-vs-square-best-payment-processor",
    ],
    publishedAt: "2025-02-05",
  },

  // ─── 5. PER-SEAT vs FLAT-RATE vs USAGE-BASED ──────────────────────────────
  {
    slug: "per-seat-vs-flat-rate-vs-usage-based",
    phase: 3,
    phaseName: "Price",
    title: "Per-Seat vs Flat-Rate vs Usage-Based: SaaS Pricing Models Compared",
    metaTitle: "Per-Seat vs Flat-Rate vs Usage-Based SaaS Pricing",
    metaDescription:
      "Compare per-seat, flat-rate, and usage-based pricing for SaaS. Learn which model expands revenue best and which kills deals.",
    primaryKeyword: "per-seat vs flat-rate vs usage-based pricing",
    secondaryKeywords: [
      "saas pricing models",
      "usage-based pricing explained",
      "per user pricing saas",
      "how to price a saas product",
    ],
    readTime: 7,
    intro:
      "Your pricing model is not just how you charge — it determines what deal sizes you can close, how you grow inside accounts, and whether customers feel punished for success. The wrong model is invisible until it costs you a contract.",
    sections: [
      {
        heading: "The quick answer",
        body: "Per-seat pricing is the most common and easiest to sell. Flat-rate pricing is simple but caps your upside. Usage-based pricing aligns with customer value but requires precise metering. Most B2B SaaS should start per-seat and add usage components at Series A+.",
      },
      {
        heading: "Side-by-side breakdown",
        body: "Per-seat: charge per user or license. Scales naturally as a company grows. Buyers understand it immediately. Downside: customers are incentivized to share logins.\n\nFlat-rate: one price for everything, unlimited users. Easy to sell, easy to budget. Customers love it. You cap your own revenue expansion and large accounts get a massive discount by default.\n\nUsage-based: charge per API call, message sent, GB stored, or outcome delivered. Aligns pricing with value. Compounds as power users grow. Hard to budget for buyers and complex to instrument correctly.",
      },
      {
        heading: "When to choose per-seat",
        body: "Choose per-seat when your product is used daily by named individuals, when seat count correlates with the customer's investment in the tool, or when your buyers are used to per-user SaaS pricing (CRM, project management, communication tools).",
      },
      {
        heading: "When to choose usage-based",
        body: "Choose usage-based when your product's value scales with consumption — API platforms, infrastructure, AI tools, email or SMS sending. Usage-based pricing lets small customers start cheaply and lets large customers pay proportionally, which often results in higher NRR.",
      },
      {
        heading: "The verdict",
        body: "Start per-seat unless your product is clearly consumption-based. Per-seat is predictable for both you and your buyer. Add usage caps or overages once you have 6 months of usage data and can see where customers exceed the base. Flat-rate is a trap for most growth-stage SaaS — it feels customer-friendly but destroys your ability to expand revenue.",
      },
      {
        heading: "How to get started",
        body: "Map your five best customers: how many seats are using the tool and how much value are they getting per seat? If the power users are getting 10x the value of light users, a usage component makes sense. If usage is roughly equal, per-seat is cleaner. Build your pricing page around the model that matches your sales motion, not the model your competitor uses.",
      },
    ],
    checklistStepIds: ["price-3"],
    affiliates: [
      {
        name: "Stripe",
        url: "https://stripe.com",
        description: "Native support for per-seat, flat-rate, metered, and usage-based billing",
        badge: "Most Flexible",
      },
      {
        name: "Notion",
        url: "https://www.notion.so",
        description: "Map out your pricing model and tier logic before you build",
        affiliate: true,
      },
    ],
    faqs: [
      {
        question: "Can I switch pricing models after launch?",
        answer:
          "Yes, but grandfather existing customers at their current model while new customers move to the new one. Forcing existing customers onto a new model mid-contract damages trust. Give at least 60-90 days notice and frame it as a value upgrade.",
      },
      {
        question: "What is 'hybrid' pricing?",
        answer:
          "Hybrid pricing combines a base platform fee (flat-rate) with per-seat or usage overages. It gives you predictable floor revenue while letting you expand with customers who grow. HubSpot, Intercom, and Twilio all use hybrid models.",
      },
    ],
    relatedSlugs: [
      "monthly-vs-annual-pricing-saas",
      "freemium-vs-free-trial-vs-paid-only",
      "value-based-vs-cost-plus-vs-competitive-pricing",
    ],
    publishedAt: "2025-02-12",
  },

  // ─── 6. FREEMIUM vs FREE TRIAL vs PAID-ONLY ───────────────────────────────
  {
    slug: "freemium-vs-free-trial-vs-paid-only",
    phase: 3,
    phaseName: "Price",
    title: "Freemium vs Free Trial vs Paid-Only: How to Choose Your Pricing Model",
    metaTitle: "Freemium vs Free Trial vs Paid-Only: How to Choose",
    metaDescription:
      "Freemium, free trial, or paid-only? Compare conversion rates, support costs, and when each model fits your stage and product.",
    primaryKeyword: "freemium vs free trial",
    secondaryKeywords: [
      "freemium pricing model",
      "free trial conversion rate",
      "should I offer a free plan",
      "how to price a startup",
    ],
    readTime: 6,
    intro:
      "Free is a pricing decision, not a marketing strategy. Offering the wrong free model destroys margins and builds a user base that will never pay. Here is how to choose — and the math behind each option.",
    sections: [
      {
        heading: "The quick answer",
        body: "Freemium works when your product has viral distribution and low marginal cost per user. Free trials work when the product's value is obvious within 7-14 days. Paid-only is the right default for most B2B service businesses and anything with high support costs.",
      },
      {
        heading: "Side-by-side breakdown",
        body: "Freemium: unlimited free tier with paid upgrades. Drives top-of-funnel volume. Conversion to paid typically 2-5%. Requires either very low marginal cost or a hard paywall at meaningful usage limits.\n\nFree trial: full product access for 7-30 days, then requires payment. Higher intent at signup, conversion rates of 15-25% for time-limited trials with active onboarding. Requires a strong activation moment within the trial window.\n\nPaid-only: no free access. Highest average customer quality. Forces better positioning because you cannot rely on 'try it for free' as a closer. Lower top-of-funnel volume, higher conversion rate from qualified leads.",
      },
      {
        heading: "When to choose freemium",
        body: "Choose freemium if your product has network effects (collaboration tools, marketplaces, communication platforms), if free users create value for paid users, or if your per-user cost is near zero (software only, no support cost per user). Notion, Canva, and Slack built on freemium because free users created the social proof that converted organizations.",
      },
      {
        heading: "When to choose free trial",
        body: "Choose a free trial when you can reliably demonstrate value within 14 days, when your onboarding sequence is strong enough to get a user to the 'aha moment' before the trial ends, and when you have the capacity to do activation outreach. Free trials with no onboarding are just delayed churn.",
      },
      {
        heading: "The verdict",
        body: "Most early-stage founders should start paid-only with a strong money-back guarantee rather than a free tier. This forces better positioning, attracts higher-quality customers, and gives you real revenue data. Add a free trial only once you know your activation sequence and can support the trial-to-paid motion.",
      },
      {
        heading: "How to get started",
        body: "Before offering a free plan, answer these three questions: What is the marginal cost of one more free user? What is the activation moment that makes someone want to pay? What is the conversion path? If you cannot answer all three, start paid-only with a 14-day refund policy. Add a free tier when you have data to make it intentional.",
      },
    ],
    checklistStepIds: ["price-3", "price-4"],
    affiliates: [
      {
        name: "Stripe",
        url: "https://stripe.com",
        description: "Set up trial periods and automatic conversion to paid in minutes",
        badge: "Best for Trials",
      },
      {
        name: "HoneyBook",
        url: "https://www.honeybook.com",
        description: "Build professional proposals for paid-only service businesses",
        affiliate: true,
        badge: "Best for Services",
      },
    ],
    faqs: [
      {
        question: "What is a 'reverse trial'?",
        answer:
          "A reverse trial gives new users the full paid experience for free, then downgrades them to a free tier if they do not convert. This is more effective than a standard free trial because users experience loss aversion at downgrade, not just urgency at expiry.",
      },
      {
        question: "Does offering a free plan hurt my paid conversions?",
        answer:
          "It can if the free plan is too generous. The free tier should create value but hit a real constraint that makes upgrading obvious. If users can run their business on the free plan indefinitely, you have misaligned your paywall.",
      },
    ],
    relatedSlugs: [
      "monthly-vs-annual-pricing-saas",
      "per-seat-vs-flat-rate-vs-usage-based",
      "value-based-vs-cost-plus-vs-competitive-pricing",
    ],
    publishedAt: "2025-02-19",
  },

  // ─── 7. QUICKBOOKS vs FRESHBOOKS vs WAVE ──────────────────────────────────
  {
    slug: "quickbooks-vs-freshbooks-vs-wave",
    phase: 3,
    phaseName: "Price",
    title: "QuickBooks vs FreshBooks vs Wave: Best for Tracking Revenue",
    metaTitle: "QuickBooks vs FreshBooks vs Wave: Which to Use (2025)",
    metaDescription:
      "Compare QuickBooks, FreshBooks, and Wave for small business revenue tracking, invoicing, and expense management.",
    primaryKeyword: "quickbooks vs freshbooks vs wave",
    secondaryKeywords: [
      "best accounting software small business",
      "wave accounting review",
      "freshbooks vs quickbooks",
      "free accounting software for startups",
    ],
    readTime: 7,
    intro:
      "You need to know what you are making and what it costs. QuickBooks, FreshBooks, and Wave all solve this — but for different businesses at different price points. Here is how to pick the one that matches where you are right now.",
    sections: [
      {
        heading: "The quick answer",
        body: "Wave is the best free option for solo founders and simple businesses. FreshBooks is the best for service businesses who send invoices and want time tracking. QuickBooks is the standard for growing businesses that need a bookkeeper or accountant to collaborate.",
      },
      {
        heading: "Side-by-side breakdown",
        body: "Wave: completely free for invoicing, accounting, and receipt scanning. Charges transaction fees on payments. Limited reporting. Best for businesses under $250K revenue with simple financials.\n\nFreshBooks: starts at $19/month. Best-in-class invoicing UI, time tracking, and project profitability reporting. Built specifically for service businesses. Less powerful for product-based businesses with inventory.\n\nQuickBooks: starts at $35/month. Industry standard — almost every bookkeeper and accountant knows it. Payroll integration, inventory tracking, tax filing prep, and extensive reporting. Steeper learning curve but the most complete system.",
      },
      {
        heading: "When to choose Wave",
        body: "Choose Wave if you are pre-revenue or early-stage with simple finances, if budget is a constraint, or if you just need basic invoicing and expense tracking. The free tier is genuinely functional — not a bait-and-switch. Transition when you hire a bookkeeper or need payroll.",
      },
      {
        heading: "When to choose QuickBooks",
        body: "Choose QuickBooks when you have a bookkeeper, when you are preparing for tax season with multiple revenue streams, when you have employees or contractors to pay, or when your accountant specifically recommends it. The accounting standard matters for transitions.",
      },
      {
        heading: "The verdict",
        body: "Start with Wave if you are under $10K/month and running lean. Move to FreshBooks if your business is service-based and invoicing is your primary revenue model. Move to QuickBooks when complexity requires it — or when your accountant makes you.",
      },
      {
        heading: "How to get started",
        body: "Open a Wave account today and connect your business bank account. Categorize every transaction from the past 30 days. This single exercise — knowing exactly where your money is coming from and going to — is worth more than any pricing strategy. You cannot optimize what you cannot see.",
      },
    ],
    checklistStepIds: ["price-1", "price-4"],
    affiliates: [
      {
        name: "Wave",
        url: "https://www.waveapps.com",
        description: "Free accounting, invoicing, and receipt tracking — no monthly fee",
        affiliate: true,
        badge: "Free",
      },
      {
        name: "FreshBooks",
        url: "https://www.freshbooks.com",
        description: "Best invoicing and time tracking for service businesses",
        affiliate: true,
        badge: "Best for Services",
      },
      {
        name: "QuickBooks",
        url: "https://quickbooks.intuit.com",
        description: "Industry standard — works with every bookkeeper and accountant",
        affiliate: true,
      },
    ],
    faqs: [
      {
        question: "Can I switch from Wave to QuickBooks later without losing data?",
        answer:
          "Yes. You can export your chart of accounts and transaction history from Wave and import into QuickBooks. The migration takes a few hours and is worth doing at a fiscal year boundary to keep your records clean.",
      },
      {
        question: "Does Wave really have no monthly fee?",
        answer:
          "Wave's core accounting, invoicing, and receipt scanning features are free. Wave charges transaction fees when customers pay invoices through the platform (similar to Stripe or PayPal). Payroll is a paid add-on starting at $20/month.",
      },
    ],
    relatedSlugs: [
      "stripe-vs-paypal-vs-square-best-payment-processor",
      "value-based-vs-cost-plus-vs-competitive-pricing",
      "how-to-calculate-your-true-cost-floor",
    ],
    publishedAt: "2025-02-26",
  },

  // ─── 8. HONEYBOOK vs BONSAI vs DUBSADO ────────────────────────────────────
  {
    slug: "honeybook-vs-bonsai-vs-dubsado",
    phase: 3,
    phaseName: "Price",
    title: "HoneyBook vs Bonsai vs Dubsado: Best Proposal and Invoicing Tool",
    metaTitle: "HoneyBook vs Bonsai vs Dubsado for Service Businesses",
    metaDescription:
      "Compare HoneyBook, Bonsai, and Dubsado for client proposals, contracts, invoicing, and payments. Find the right fit for your service business.",
    primaryKeyword: "honeybook vs bonsai vs dubsado",
    secondaryKeywords: [
      "best invoicing tool for freelancers",
      "honeybook vs bonsai",
      "dubsado review",
      "how to send client proposals",
    ],
    readTime: 6,
    intro:
      "When you run a service business, your proposal is your price. The tool you use to send it shapes how professional you look before anyone reads the number. HoneyBook, Bonsai, and Dubsado all handle proposals, contracts, and invoices — but they are built for different workflows.",
    sections: [
      {
        heading: "The quick answer",
        body: "HoneyBook is the most polished and easiest to set up — best for creatives and event-based businesses. Bonsai is best for solo freelancers who need simplicity and solid contract templates. Dubsado is the most customizable and best for agencies with complex workflows.",
      },
      {
        heading: "Side-by-side breakdown",
        body: "HoneyBook: $19-$79/month. Beautiful proposal templates, built-in payment processing, automated follow-up sequences. Strong mobile app. Best for photographers, designers, event planners, and coaches.\n\nBonsai: $24-$49/month. Clean UI, fast to get started, solid contract library for common freelance arrangements. Good time tracking. Slightly weaker automation than HoneyBook.\n\nDubsado: $20/month flat. Steeper setup curve but extremely powerful workflow automation. Build multi-step onboarding sequences, custom forms, scheduler integration. Best ROI at volume for established agencies.",
      },
      {
        heading: "When to choose HoneyBook",
        body: "Choose HoneyBook when visual presentation of proposals matters to your clients, when you work on project-based engagements with defined deliverables, or when you want the fastest path from 'I am interested' to signed contract and paid deposit.",
      },
      {
        heading: "When to choose Dubsado",
        body: "Choose Dubsado when you handle 10+ clients per month and need automated workflows to avoid manual follow-up, when you want deep customization of client portals and branded experiences, or when you are willing to invest setup time for long-term efficiency gains.",
      },
      {
        heading: "The verdict",
        body: "Most service founders should start with HoneyBook or Bonsai. Both get you professional in a day. Graduate to Dubsado when you are managing enough clients that automation ROI becomes clear. Do not start with Dubsado — the setup time will delay your first invoice.",
      },
      {
        heading: "How to get started",
        body: "Create your first proposal template before your first sales call. Having a structured proposal that shows your packages, terms, and payment options signals professionalism before you have a track record. Send your first proposal within 24 hours of your next discovery call.",
      },
    ],
    checklistStepIds: ["price-3", "price-4"],
    affiliates: [
      {
        name: "HoneyBook",
        url: "https://www.honeybook.com",
        description: "Beautiful proposals, contracts, and invoices for service businesses",
        affiliate: true,
        badge: "Best for Creatives",
      },
      {
        name: "Bonsai",
        url: "https://www.hellobonsai.com",
        description: "Simple proposals and contracts for solo freelancers",
        affiliate: true,
      },
    ],
    faqs: [
      {
        question: "Do these tools accept payments directly?",
        answer:
          "Yes. All three have integrated payment processing using Stripe or their own processor under the hood. Clients can pay invoices directly within the platform without needing a separate payment link.",
      },
      {
        question: "Can I use my own contract template?",
        answer:
          "Yes in all three. Bonsai has the largest built-in contract library for common freelance agreements. HoneyBook and Dubsado allow full custom contract text that clients can e-sign inside the proposal flow.",
      },
    ],
    relatedSlugs: [
      "stripe-vs-paypal-vs-square-best-payment-processor",
      "value-based-vs-cost-plus-vs-competitive-pricing",
      "how-to-set-and-communicate-your-price",
    ],
    publishedAt: "2025-03-05",
  },

  // ─── 9. TIERED vs SINGLE PRICE ────────────────────────────────────────────
  {
    slug: "tiered-pricing-vs-single-price-how-to-choose",
    phase: 3,
    phaseName: "Price",
    title: "Tiered Pricing vs Single Price: Which Converts Better",
    metaTitle: "Tiered Pricing vs Single Price: Which Converts Better",
    metaDescription:
      "Should you offer one price or three tiers? Compare single-price and tiered pricing strategies for services, software, and physical products.",
    primaryKeyword: "tiered pricing vs single price",
    secondaryKeywords: [
      "how to structure pricing tiers",
      "pricing page best practices",
      "good better best pricing",
      "how to price services",
    ],
    readTime: 5,
    intro:
      "One price feels simple. Three tiers feel like a strategy. The data on which converts better is not what most founders expect — and the reasons are as much about psychology as economics.",
    sections: [
      {
        heading: "The quick answer",
        body: "Tiered pricing (3 options) outperforms single pricing for most businesses because it anchors perception and lets customers self-select based on budget and need. Single pricing is better when your offer is highly productized and customers should not be choosing between configurations.",
      },
      {
        heading: "Side-by-side breakdown",
        body: "Single price: one offer, one number. No decision fatigue. Easiest to sell and explain. Caps revenue at the maximum any customer will pay at that one price point — you leave money from premium buyers and exclude price-sensitive buyers simultaneously.\n\nTiered pricing: three options (entry, core, premium). Most buyers choose the middle. The top tier anchors the middle as 'reasonable.' The bottom tier captures price-sensitive buyers. Increases average order value by 20-40% for most businesses that make the switch.",
      },
      {
        heading: "When to choose single price",
        body: "Choose single price when you are still defining your offer and adding tiers would force you to productize something you have not fully figured out, when your clients are sophisticated buyers who would see tiers as artificial complexity, or when your competitive advantage is extreme simplicity.",
      },
      {
        heading: "When to choose tiered pricing",
        body: "Choose tiered pricing when your market has real budget variation, when you can draw a clear line between tier deliverables (not just 'more hours'), or when you have lost deals because your single price was too high for some buyers and too low for others.",
      },
      {
        heading: "The verdict",
        body: "Most service and software businesses should offer three tiers. Name them after outcomes, not sizes (Basic / Pro / Enterprise is weaker than Launch / Grow / Scale). Make the middle tier do 80% of the work — it should be the option you would pick if you were the customer. Price the top tier so the middle feels like the smart choice.",
      },
      {
        heading: "How to get started",
        body: "Take your current single offer and split it: reduce it by 30% for a starter tier, add premium deliverables for a top tier. Your current offer becomes the middle. Then look at your last 10 customers and ask which tier each would have chosen. If all would go middle, your tiers are too similar. If all would go top, your middle is underpriced.",
      },
    ],
    checklistStepIds: ["price-3"],
    affiliates: [
      {
        name: "Canva",
        url: "https://www.canva.com",
        description: "Design a clear, conversion-optimized pricing page or rate card",
        affiliate: true,
      },
      {
        name: "HoneyBook",
        url: "https://www.honeybook.com",
        description: "Build tiered proposal packages clients can choose between",
        affiliate: true,
        badge: "Best for Services",
      },
    ],
    faqs: [
      {
        question: "How different should my tiers be in price?",
        answer:
          "A common ratio is 1x / 2.5x / 5x. If your entry tier is $500, core is $1,250, and premium is $2,500. The ratio matters more than the absolute gap — buyers should feel the jump between tiers is proportional to the value jump.",
      },
      {
        question: "Should I show prices publicly or send on request?",
        answer:
          "B2C and most B2B under $5K/year should show prices publicly. Transparent pricing reduces friction and pre-qualifies inbound. 'Contact for pricing' is appropriate only for enterprise deals where scope varies significantly per customer.",
      },
    ],
    relatedSlugs: [
      "value-based-vs-cost-plus-vs-competitive-pricing",
      "how-to-set-and-communicate-your-price",
      "freemium-vs-free-trial-vs-paid-only",
    ],
    publishedAt: "2025-03-12",
  },

  // ─── 10. PROJECT vs RETAINER vs HOURLY ────────────────────────────────────
  {
    slug: "project-pricing-vs-retainer-vs-hourly",
    phase: 3,
    phaseName: "Price",
    title: "Project vs Retainer vs Hourly: Best Pricing Structure for Service Businesses",
    metaTitle: "Project vs Retainer vs Hourly Pricing for Services",
    metaDescription:
      "Should you charge by the hour, per project, or on retainer? Compare each structure for freelancers and service business owners.",
    primaryKeyword: "project pricing vs retainer vs hourly",
    secondaryKeywords: [
      "how to charge for consulting",
      "retainer pricing model",
      "should I charge hourly or per project",
      "freelance pricing structure",
    ],
    readTime: 7,
    intro:
      "Hourly pricing feels fair until you realize it penalizes you for getting faster. Project pricing feels clean until scope creep eats your margin. Retainers feel stable until a client cancels. Here is how to choose the model that pays you fairly and protects your time.",
    sections: [
      {
        heading: "The quick answer",
        body: "Hourly is a trap for experienced service providers. Project pricing is the standard for defined deliverables. Retainers are the goal for ongoing relationships with high trust. Most service businesses should move through this sequence as they build track record.",
      },
      {
        heading: "Side-by-side breakdown",
        body: "Hourly: transparent, easy to start, universally understood. But it caps your income at hours available, punishes efficiency, and creates adversarial tracking dynamics with clients. Your best hours (the thinking, not the doing) are often invisible.\n\nProject-based: one price for one outcome. Rewards efficiency and scoping skill. Requires confident discovery to avoid scope creep. Clients prefer it because they know the budget upfront.\n\nRetainer: monthly fee for ongoing access and deliverables. Predictable revenue, deeper relationships, compound value over time. Requires a clearly defined scope — vague retainers become unpaid labor over time.",
      },
      {
        heading: "When to choose hourly",
        body: "Use hourly for exploratory engagements where neither you nor the client knows how long something will take, for very short-duration tasks (under 4 hours), or when a client insists on it and you are early enough to need the work. Cap hourly at 40% of your client mix.",
      },
      {
        heading: "When to choose retainer",
        body: "Pursue retainers with clients where you have proven value, where the work recurs monthly (content, maintenance, advisory, ongoing strategy), and where the relationship has enough trust that monthly billing feels natural rather than suspicious.",
      },
      {
        heading: "The verdict",
        body: "If you are just starting: hourly to get paid and gather data. Within 90 days: package your most common engagement into a project price. Within 6 months: identify your top 2-3 clients and propose a retainer. By year one, target 60% of revenue as retainer, 30% project, 10% hourly.",
      },
      {
        heading: "How to get started",
        body: "Track your hours on your next three hourly engagements even if the client does not require it. Then calculate what you actually made per hour of total time (including sales, admin, revisions). That number tells you whether hourly is sustainable. If it is under your target rate, convert to project pricing on your next proposal.",
      },
    ],
    checklistStepIds: ["price-2", "price-3"],
    affiliates: [
      {
        name: "HoneyBook",
        url: "https://www.honeybook.com",
        description: "Set up project packages and retainer billing in one platform",
        affiliate: true,
        badge: "Best for Services",
      },
      {
        name: "Bonsai",
        url: "https://www.hellobonsai.com",
        description: "Time tracking, project scoping, and contract templates for freelancers",
        affiliate: true,
      },
      {
        name: "Toggl",
        url: "https://toggl.com",
        description: "Track time on projects to know your real hourly effective rate",
        badge: "Free",
      },
    ],
    faqs: [
      {
        question: "How do I protect against scope creep on project pricing?",
        answer:
          "Define deliverables, not effort. Your contract should specify exactly what is included (number of drafts, revision rounds, formats delivered) and what triggers a change order. Include a scope change process in every contract.",
      },
      {
        question: "How do I convince a client to move from hourly to a retainer?",
        answer:
          "Show them what they are getting monthly and package it as a flat fee that is 10-15% less than they would pay at your hourly rate for the same volume. The discount feels like value; the predictability is what you actually want.",
      },
    ],
    relatedSlugs: [
      "tiered-pricing-vs-single-price-how-to-choose",
      "value-based-vs-cost-plus-vs-competitive-pricing",
      "honeybook-vs-bonsai-vs-dubsado",
    ],
    publishedAt: "2025-03-19",
  },

  // ─── 11. HOW TO CALCULATE YOUR TRUE COST FLOOR ────────────────────────────
  {
    slug: "how-to-calculate-your-true-cost-floor",
    phase: 3,
    phaseName: "Price",
    title: "How to Calculate Your True Cost Floor (Before You Set Any Price)",
    metaTitle: "How to Calculate Your True Cost Floor for Pricing",
    metaDescription:
      "Before you set your price, you need your cost floor. Learn how to calculate the minimum you need to charge to be profitable — including your own time.",
    primaryKeyword: "how to calculate cost floor for pricing",
    secondaryKeywords: [
      "startup cost calculator",
      "pricing below cost",
      "cost of goods sold small business",
      "how to price a product",
    ],
    readTime: 5,
    intro:
      "Most founders undercharge because they undercount. They forget to include their time, their tools, their tax rate, and their cost of customer acquisition. The result is a price that feels right but erodes their margin every month. Here is how to find the real number.",
    sections: [
      {
        heading: "The quick answer",
        body: "Your cost floor is the minimum price at which one more sale makes financial sense. It includes direct costs, allocated overhead, payment processing fees, your time at a fair rate, and a margin buffer for taxes and reinvestment.",
      },
      {
        heading: "Side-by-side breakdown",
        body: "Simplified cost floor (what most founders calculate): materials + direct labor + software used for this delivery. This understates costs by 30-50% for most businesses.\n\nTrue cost floor (what you actually need): direct materials + direct labor at your target hourly rate + allocated overhead (rent, tools, subscriptions divided by client count) + customer acquisition cost + payment processing fee + tax provision (25-30% of net) + reinvestment margin (10%).",
      },
      {
        heading: "When simplified is enough",
        body: "For a quick gut-check before a sales call, simplified cost floor is better than nothing. If your proposed price is 3x or more above your simplified cost, you likely have margin. Use the simplified number to set a floor, not to set your final price.",
      },
      {
        heading: "When to do the full calculation",
        body: "Do the full calculation before you publish any pricing page, before you take on a recurring client at a fixed rate, and annually as your business scales. When you add employees, tools, or overhead, your cost floor shifts — and your prices may need to shift with it.",
      },
      {
        heading: "The verdict",
        body: "Build a simple spreadsheet with three rows: direct costs, allocated overhead, and your time. Price at 2x your true cost floor for product businesses and 3x for service businesses. If the market will not bear that, your offer needs to change before your price does.",
      },
      {
        heading: "How to get started",
        body: "Open a spreadsheet and list every cost you incurred in the last 30 days. Divide fixed costs by the number of clients or units you served. Add 30 minutes of your time per client at the hourly rate you would hire someone to replace you at. That bottom line is your cost floor. Does your current price cover it with room?",
      },
    ],
    checklistStepIds: ["price-1"],
    affiliates: [
      {
        name: "Wave",
        url: "https://www.waveapps.com",
        description: "Free accounting software to track every cost from day one",
        affiliate: true,
        badge: "Free",
      },
      {
        name: "SCORE Startup Cost Calculator",
        url: "https://www.score.org/resource/startup-costs-calculator",
        description: "Free tool to estimate startup and operating costs",
        badge: "Free",
      },
      {
        name: "QuickBooks",
        url: "https://quickbooks.intuit.com",
        description: "Track expenses and run profitability reports by client or project",
        affiliate: true,
      },
    ],
    faqs: [
      {
        question: "Should I include my own salary in my cost floor?",
        answer:
          "Yes — at the rate you would pay someone competent to replace you. If you value your time at $0, your pricing will reflect that and so will your business decisions. Even if you are not paying yourself yet, include it to model sustainability.",
      },
      {
        question: "What if my price floor is above what the market pays?",
        answer:
          "That is important information. It means either your costs are too high, your target market is wrong, or your offer is not differentiated enough to command the price you need. Solve the offer problem before cutting your prices.",
      },
    ],
    relatedSlugs: [
      "value-based-vs-cost-plus-vs-competitive-pricing",
      "quickbooks-vs-freshbooks-vs-wave",
      "tiered-pricing-vs-single-price-how-to-choose",
    ],
    publishedAt: "2025-03-26",
  },

  // ─── 12. HOW TO SET AND COMMUNICATE YOUR PRICE ────────────────────────────
  {
    slug: "how-to-set-and-communicate-your-price",
    phase: 3,
    phaseName: "Price",
    title: "How to Set and Communicate Your Price Without Apologizing for It",
    metaTitle: "How to Set and Communicate Your Price Confidently",
    metaDescription:
      "Learn how to set a price you believe in and communicate it in sales conversations without flinching, over-explaining, or discounting reflexively.",
    primaryKeyword: "how to communicate your price to clients",
    secondaryKeywords: [
      "how to present pricing to clients",
      "pricing confidence",
      "how to stop discounting",
      "sales conversation pricing",
    ],
    readTime: 6,
    intro:
      "The number is not the problem. Most founders lose on price before the customer hears it — in how they frame the offer, how they pause after saying the number, and whether they volunteer a discount before one is requested. Here is how to get your price right and say it right.",
    sections: [
      {
        heading: "The quick answer",
        body: "Set your price based on value delivered, not cost plus a guess. Say the price clearly, pause, and wait. Do not explain, qualify, or discount unless specifically asked. The goal is not to win every deal — it is to win the right ones at a price that makes the work sustainable.",
      },
      {
        heading: "Side-by-side breakdown",
        body: "Weak price delivery: 'So the investment would be... well, it depends a lot, but somewhere around $3,000, give or take, and we can definitely work with your budget.' This signals uncertainty and invites negotiation before negotiation was on the table.\n\nStrong price delivery: 'The project is $3,500. That covers [X, Y, Z]. When would you like to start?' Confident, specific, forward-moving. The pause after stating the price is intentional.",
      },
      {
        heading: "When to hold your price",
        body: "Hold your price when the customer has not objected to it yet, when the objection is about budget rather than value (budget objections are often negotiations, not hard no's), or when discounting would mean delivering at a margin that does not make the work worthwhile.",
      },
      {
        heading: "When a discount is appropriate",
        body: "Discount when you genuinely need the case study, when you are entering a new market and need reference customers, or when you are offering annual prepayment instead of monthly. Never discount reactively — make the reason explicit and the adjustment structural.",
      },
      {
        heading: "The verdict",
        body: "The best pricing conversation is not about convincing the customer your price is fair. It is about whether they are the right customer. A customer who pushes back hard on price before experiencing your work is a different customer than one who pushes back after. Qualify budget in the discovery call, not during the proposal.",
      },
      {
        heading: "How to get started",
        body: "Practice saying your price out loud three times before your next sales call. Notice if you add qualifiers ('just', 'only', 'around'). Remove them. Write down the three things your price includes that justify it. Lead with those in the proposal before stating the number. The customer should understand the value before they see the price.",
      },
    ],
    checklistStepIds: ["price-3"],
    affiliates: [
      {
        name: "HoneyBook",
        url: "https://www.honeybook.com",
        description: "Build proposals that present your price in the context of your value",
        affiliate: true,
        badge: "Best for Services",
      },
      {
        name: "Bonsai",
        url: "https://www.hellobonsai.com",
        description: "Send professional proposals with clear pricing and e-signature",
        affiliate: true,
      },
    ],
    faqs: [
      {
        question: "What do I do if a customer says my price is too high?",
        answer:
          "Ask: 'Too high compared to what?' This question often reveals the real objection — a different competitor, a budget constraint, or a mismatch in perceived value. From there you can address the actual issue rather than just discounting.",
      },
      {
        question: "Is it okay to raise my prices on existing clients?",
        answer:
          "Yes. Give 60-90 days notice, explain the reason briefly (increased costs, scope of service), and frame it around continued partnership. Most established clients accept a 10-20% increase once per year. Losing one price-sensitive client is often better than keeping them at an unsustainable rate.",
      },
    ],
    relatedSlugs: [
      "value-based-vs-cost-plus-vs-competitive-pricing",
      "tiered-pricing-vs-single-price-how-to-choose",
      "project-pricing-vs-retainer-vs-hourly",
    ],
    publishedAt: "2025-04-02",
  },

  // ─── 13. INVOICING BEST PRACTICES ─────────────────────────────────────────
  {
    slug: "invoicing-best-practices-get-paid-faster",
    phase: 3,
    phaseName: "Price",
    title: "How to Invoice Clients So You Get Paid Faster",
    metaTitle: "Invoicing Best Practices: Get Paid Faster (2025)",
    metaDescription:
      "The right invoicing setup reduces late payments and removes friction from your cash flow. Learn terms, follow-up, and tool selection.",
    primaryKeyword: "how to invoice clients",
    secondaryKeywords: [
      "invoice payment terms",
      "how to get paid faster",
      "net 30 vs net 15",
      "best invoicing software",
    ],
    readTime: 5,
    intro:
      "Late payments are not random — they are a symptom of a process problem. Most invoicing friction is preventable before the invoice is sent. Here is what separates founders who get paid on time from those chasing payments.",
    sections: [
      {
        heading: "The quick answer",
        body: "Require a deposit before starting work. Send invoices immediately upon project completion or on a fixed monthly date. Use Net 7 or Net 14 terms rather than Net 30. Send a friendly reminder 48 hours before the due date. Automate all of this.",
      },
      {
        heading: "Side-by-side breakdown",
        body: "Net 30 terms: standard in large enterprise but cash-flow dangerous for small businesses. Expect 25-40% of Net 30 invoices to be paid late.\n\nNet 14 terms: a reasonable compromise that most small and mid-size clients accept without complaint. Cuts your average days to payment nearly in half.\n\nNet 7 / due on receipt: normal for project deposits, retainer payments, and digital products. Use for clients who have already shown a pattern of timely payment.",
      },
      {
        heading: "When to require deposits",
        body: "Always require a 25-50% deposit for project-based work before starting. Frame it as 'how we secure your slot' rather than a trust check. Deposits reduce scope creep risk (clients who have paid are more decisive) and eliminate the worst late-payment scenarios entirely.",
      },
      {
        heading: "When to switch from manual to automated invoicing",
        body: "Switch to automated invoicing when you are sending more than 4 invoices per month or when you have any recurring client. The time saved on follow-up alone pays for any invoicing software within one billing cycle.",
      },
      {
        heading: "The verdict",
        body: "Structure your invoicing so payment is the natural next step, not an interruption. Collect 50% deposit, deliver work, invoice immediately for the balance with Net 14 terms and a payment link in the invoice. Automated reminders at 7 days and 1 day before due date catch 80% of late payments before they are late.",
      },
      {
        heading: "How to get started",
        body: "Set up your invoicing tool today and create your first invoice template with your bank details, Net 14 terms, and an online payment link. For your next project, ask for a 50% deposit before you start. Track how your time-to-payment changes over the next 30 days.",
      },
    ],
    checklistStepIds: ["price-4"],
    affiliates: [
      {
        name: "FreshBooks",
        url: "https://www.freshbooks.com",
        description: "Automated invoicing with payment reminders and online payment links",
        affiliate: true,
        badge: "Best for Invoicing",
      },
      {
        name: "Wave",
        url: "https://www.waveapps.com",
        description: "Free invoicing with automated payment reminders",
        affiliate: true,
        badge: "Free",
      },
      {
        name: "HoneyBook",
        url: "https://www.honeybook.com",
        description: "Proposals, contracts, deposits, and final invoices in one flow",
        affiliate: true,
      },
    ],
    faqs: [
      {
        question: "Can I charge a late fee?",
        answer:
          "Yes. Include it in your contract terms — typically 1.5% per month on outstanding balances. The deterrent effect is stronger than the revenue. Most clients will pay on time to avoid it. Check your state's maximum allowable late fee rate.",
      },
      {
        question: "Should I accept checks?",
        answer:
          "Only if you must. Checks slow down your cash flow and require manual processing. If a client insists on checks, add 5 business days to your payment terms to account for mail and clearing time, and confirm receipt.",
      },
    ],
    relatedSlugs: [
      "stripe-vs-paypal-vs-square-best-payment-processor",
      "quickbooks-vs-freshbooks-vs-wave",
      "honeybook-vs-bonsai-vs-dubsado",
    ],
    publishedAt: "2025-04-09",
  },

  // ─── 14. ANCHORING AND PRICE PSYCHOLOGY ───────────────────────────────────
  {
    slug: "price-anchoring-and-psychology-what-actually-works",
    phase: 3,
    phaseName: "Price",
    title: "Price Anchoring and Psychology: What Actually Works for Small Businesses",
    metaTitle: "Price Anchoring and Psychology for Small Business",
    metaDescription:
      "Learn which pricing psychology tactics — anchoring, charm pricing, decoy pricing — have real evidence behind them and how to apply them without gimmicks.",
    primaryKeyword: "price anchoring psychology small business",
    secondaryKeywords: [
      "charm pricing",
      "decoy pricing strategy",
      "pricing psychology",
      "how to make your price look reasonable",
    ],
    readTime: 6,
    intro:
      "Your customer's perception of your price is shaped before they read the number. Anchoring, framing, and context determine whether $500 feels expensive or cheap. Here is what the research says and how to use it without being manipulative.",
    sections: [
      {
        heading: "The quick answer",
        body: "Price anchoring (showing a higher number first) and the decoy effect (adding a third option to make one option look clearly best) are the two tactics with the strongest evidence base for small business pricing pages and proposals.",
      },
      {
        heading: "Side-by-side breakdown",
        body: "Anchoring: your most expensive option sets the reference point. Everything else looks more reasonable because of it. Works in proposals (show top tier first), pricing pages (left-to-right layout matters), and sales conversations.\n\nCharm pricing ($997 vs $1,000): evidence is mixed for B2B but stronger for consumer purchases. The left digit change (9 to 10) affects perception more than the dollar. Less effective when trust is the primary barrier.\n\nDecoy pricing: add a third option that makes your preferred option look like the obvious choice. The decoy does not need to sell — it needs to reframe.",
      },
      {
        heading: "When anchoring makes the biggest difference",
        body: "Anchoring has the strongest effect when the customer has no prior reference for what the category should cost. If you are the first provider they have spoken to, the anchor you set becomes their baseline. Premium-first sequencing in sales conversations consistently increases average deal size.",
      },
      {
        heading: "When psychology alone is not enough",
        body: "Pricing psychology is a multiplier on a good offer, not a replacement for one. If your value proposition is unclear or your customer is already certain you are overpriced, no framing will close the gap. Fix the offer before optimizing the frame.",
      },
      {
        heading: "The verdict",
        body: "Use anchoring by showing your premium tier first in proposals and on pricing pages. Use decoy pricing when you have three tiers and want buyers to gravitate toward the middle. Skip charm pricing for B2B — round numbers signal confidence. Test one change at a time and measure conversion rate.",
      },
      {
        heading: "How to get started",
        body: "Reorder your pricing page to show the highest tier on the left. In your next proposal, lead with the premium option and its full value before presenting the middle option. Note whether the conversation changes. Most founders find the middle option closes more easily when the top anchor is set first.",
      },
    ],
    checklistStepIds: ["price-3"],
    affiliates: [
      {
        name: "Canva",
        url: "https://www.canva.com",
        description: "Design pricing pages and proposal layouts that apply anchoring correctly",
        affiliate: true,
      },
      {
        name: "HoneyBook",
        url: "https://www.honeybook.com",
        description: "Build multi-tier proposal packages with visual hierarchy",
        affiliate: true,
      },
    ],
    faqs: [
      {
        question: "Is charm pricing (like $97) still effective?",
        answer:
          "For consumer purchases and impulse buys yes — the left digit effect is real. For B2B services above $1,000, round numbers signal confidence and clarity. Use $100, not $97, when the buyer is a business owner.",
      },
      {
        question: "What is the decoy effect and how do I use it?",
        answer:
          "The decoy is a third option that is close in price to your premium tier but clearly inferior in value, making the premium look like the obvious choice. For example: $500 for 5 posts, $900 for 10 posts (your target), $875 for 9 posts (the decoy). The decoy makes $900 feel rational.",
      },
    ],
    relatedSlugs: [
      "tiered-pricing-vs-single-price-how-to-choose",
      "value-based-vs-cost-plus-vs-competitive-pricing",
      "how-to-set-and-communicate-your-price",
    ],
    publishedAt: "2025-04-16",
  },

  // ─── 15. PRODUCTIZED SERVICES vs CUSTOM QUOTES ────────────────────────────
  {
    slug: "productized-services-vs-custom-quotes",
    phase: 3,
    phaseName: "Price",
    title: "Productized Services vs Custom Quotes: Which Is Right for Your Business",
    metaTitle: "Productized Services vs Custom Quotes: How to Decide",
    metaDescription:
      "Should you offer fixed-price productized services or custom quotes per client? Compare scalability, conversion, and margin for each model.",
    primaryKeyword: "productized services vs custom quotes",
    secondaryKeywords: [
      "what is a productized service",
      "how to productize a service",
      "custom quotes for freelancers",
      "scalable service business",
    ],
    readTime: 6,
    intro:
      "Custom quotes feel flexible. Productized services feel rigid. The difference in business outcomes is significant: productized services close faster, deliver more consistently, and scale without proportional time investment. Here is how to decide which model fits where you are.",
    sections: [
      {
        heading: "The quick answer",
        body: "Productized services win on scalability, close rate, and operational predictability. Custom quotes win on flexibility and high-value complex engagements. Most service businesses should productize their most common deliverable and use custom quotes only for work outside that scope.",
      },
      {
        heading: "Side-by-side breakdown",
        body: "Productized service: fixed price, fixed scope, fixed deliverables. No discovery call required. Sells while you sleep. Predictable fulfillment. Limits your ability to take unusually complex or large work without creating a separate offering.\n\nCustom quote: scoped per client. Maximum flexibility. Can accommodate any budget and any scope. Requires discovery time (often unpaid). Conversion rate lower because the customer cannot evaluate without a call. Harder to systematize delivery.",
      },
      {
        heading: "When to productize",
        body: "Productize when you have delivered the same type of engagement 5+ times, when you can define the deliverables precisely, when the customer profile is consistent, and when your bottleneck is sales rather than delivery capacity. The first productized offering is usually your most-requested service.",
      },
      {
        heading: "When to use custom quotes",
        body: "Use custom quotes for your highest-value engagements (over $10K), for clients with genuinely unique requirements, or for work that requires significant discovery before you can scope accurately. Custom does not mean unprofessional — it means the scope genuinely varies.",
      },
      {
        heading: "The verdict",
        body: "Create at least one productized service in your first 90 days. It forces you to define your offer clearly, gives you a public price to reference in marketing, and closes faster than custom proposals. Keep custom quoting for complex or large engagements. Let the mix evolve as you learn where value is consistent enough to productize.",
      },
      {
        heading: "How to get started",
        body: "Review your last five client engagements. Find the one with the most similar scope and deliverables. Write down exactly what was included — the specific outputs, the number of rounds, the timeline. Package that as a fixed-price offer and publish it on your website. That is your first productized service.",
      },
    ],
    checklistStepIds: ["price-3"],
    affiliates: [
      {
        name: "HoneyBook",
        url: "https://www.honeybook.com",
        description: "Build product packages that clients can book and pay for without a call",
        affiliate: true,
        badge: "Best for Products",
      },
      {
        name: "Bonsai",
        url: "https://www.hellobonsai.com",
        description: "Create templated service packages with built-in contracts",
        affiliate: true,
      },
    ],
    faqs: [
      {
        question: "Can I offer both productized and custom at the same time?",
        answer:
          "Yes — many established agencies do. A productized service captures the standard work efficiently while a 'custom engagement' option exists for complex or large accounts. The key is having a clear qualifier for which path a client takes.",
      },
      {
        question: "Does productizing lower your perceived value?",
        answer:
          "Not if you position it correctly. A well-designed productized service with a clear outcome can command premium pricing. The risk is productizing too early with too little differentiation — then you are competing on price. Productize the outcome, not just the task.",
      },
    ],
    relatedSlugs: [
      "tiered-pricing-vs-single-price-how-to-choose",
      "project-pricing-vs-retainer-vs-hourly",
      "how-to-set-and-communicate-your-price",
    ],
    publishedAt: "2025-04-23",
  },

  // ─── 16. COMPETITOR PRICING RESEARCH ──────────────────────────────────────
  {
    slug: "how-to-research-competitor-pricing",
    phase: 3,
    phaseName: "Price",
    title: "How to Research Competitor Pricing (Without Copying Their Mistakes)",
    metaTitle: "How to Research Competitor Pricing Without Copying It",
    metaDescription:
      "Learn where to find competitor pricing, how to interpret what you find, and how to use the data to position your offer without racing to the bottom.",
    primaryKeyword: "how to research competitor pricing",
    secondaryKeywords: [
      "competitive pricing analysis",
      "how to find competitor prices",
      "pricing strategy research",
      "how to price against competitors",
    ],
    readTime: 5,
    intro:
      "Knowing what competitors charge is not the same as knowing what to charge. Most founders research competitor prices and then anchor to them — which means inheriting their margin problems and their positioning decisions. Here is how to use competitor pricing as data, not as a ceiling.",
    sections: [
      {
        heading: "The quick answer",
        body: "Research competitors to understand the market range and what customers are already accustomed to paying. Do not use competitor prices as your target — use your value floor and customer outcome to set price, then validate it against the market range.",
      },
      {
        heading: "Side-by-side breakdown",
        body: "Direct competitor research: visit pricing pages, sign up for trials, call as a customer. Gets you current public pricing quickly. Misses private pricing, negotiated rates, and what customers actually pay after discounts.\n\nIndirect research: read reviews (G2, Capterra, Trustpilot) — customers often mention pricing in reviews. Check Reddit communities in your niche. Use job postings (companies list budgets for similar roles which signals what they pay for that function).\n\nPrimary research: ask your prospects what they currently pay for the problem you solve. This is the most accurate and least-used method.",
      },
      {
        heading: "When competitor pricing is useful",
        body: "Use competitor pricing to confirm you are in a plausible range (not wildly above or below the market without a reason), to identify pricing gaps (no one is serving the $500/month segment, everyone clusters at $1,500+), and to understand what is table stakes versus what commands a premium.",
      },
      {
        heading: "When to ignore competitor pricing",
        body: "Ignore competitor pricing when your product delivers meaningfully different outcomes, when you are targeting a different buyer persona, when competitors are clearly underpriced and struggling, or when the comparison simply does not map to your offer scope.",
      },
      {
        heading: "The verdict",
        body: "Run a competitor pricing analysis before you publish any public price. Map the range from lowest to highest. Understand why the most expensive option charges what it does. Then set your price based on value and check it against the map — not the other way around.",
      },
      {
        heading: "How to get started",
        body: "Build a simple table: competitor name, price, what is included, who it is for. Five competitors is enough. Note who is the most expensive and why customers pay for it. This takes two hours and produces more pricing clarity than most founders get from months of overthinking.",
      },
    ],
    checklistStepIds: ["price-2"],
    affiliates: [
      {
        name: "Semrush",
        url: "https://www.semrush.com",
        description: "Research competitor positioning, keywords, and who they are targeting",
        affiliate: true,
        badge: "Best for Research",
      },
      {
        name: "SpyFu",
        url: "https://www.spyfu.com",
        description: "See competitors' paid keywords — often reveals their pricing strategy",
        affiliate: true,
      },
      {
        name: "Google Trends",
        url: "https://trends.google.com",
        description: "Track demand shifts in your product category",
        badge: "Free",
      },
    ],
    faqs: [
      {
        question: "What if no competitors publish their pricing?",
        answer:
          "Call them as a prospect. Most sales conversations will yield at least a range. Review G2, Capterra, and Reddit for price mentions. Ask your prospects: 'What are you currently paying to solve this problem?' — that reveals the effective market rate better than any published pricing page.",
      },
      {
        question: "Should I be the cheapest option in my market?",
        answer:
          "Almost never. The cheapest position attracts the most price-sensitive customers, produces the thinnest margins, and makes you the first to lose clients when a competitor cuts further. Price for the segment you want, not for everyone.",
      },
    ],
    relatedSlugs: [
      "value-based-vs-cost-plus-vs-competitive-pricing",
      "how-to-calculate-your-true-cost-floor",
      "tiered-pricing-vs-single-price-how-to-choose",
    ],
    publishedAt: "2025-04-30",
  },

  // ─── 17. SUBSCRIPTION vs ONE-TIME vs HYBRID ───────────────────────────────
  {
    slug: "subscription-vs-one-time-vs-hybrid-pricing",
    phase: 3,
    phaseName: "Price",
    title: "Subscription vs One-Time vs Hybrid Pricing: What Fits Your Business",
    metaTitle: "Subscription vs One-Time vs Hybrid Pricing Models",
    metaDescription:
      "Compare subscription, one-time, and hybrid pricing models on revenue predictability, customer acquisition, and lifetime value.",
    primaryKeyword: "subscription vs one-time pricing",
    secondaryKeywords: [
      "recurring revenue model",
      "one-time payment vs subscription",
      "hybrid pricing model",
      "how to add subscriptions to my business",
    ],
    readTime: 6,
    intro:
      "Every business has a default pricing model — most just never examined whether it is the right one. Subscription revenue is the most valuable on paper but the hardest to justify if your product is not actually used monthly. Here is how to choose.",
    sections: [
      {
        heading: "The quick answer",
        body: "One-time pricing is simplest and requires no ongoing value justification. Subscriptions compound over time but require continuous delivered value to survive renewal. Hybrid (one-time setup + ongoing subscription) is the best model for many service businesses transitioning to recurring revenue.",
      },
      {
        heading: "Side-by-side breakdown",
        body: "One-time: single purchase, no renewal friction. Customer feels full ownership. You must constantly acquire new customers. Revenue does not compound.\n\nSubscription: monthly or annual recurring payment. Revenue compounds, lifetime value multiplies, but churn is a constant fight. Only works when the product delivers ongoing value that the customer can feel.\n\nHybrid: upfront setup fee + monthly subscription. Captures implementation value immediately. Provides ongoing revenue. Works especially well for service businesses with initial build plus ongoing management.",
      },
      {
        heading: "When to choose one-time pricing",
        body: "Choose one-time pricing for digital products with no ongoing delivery (ebooks, templates, courses with lifetime access), for physical goods, or for defined projects with a clear end state. One-time pricing also works well as a trial pathway — buy once, upgrade to subscription for ongoing support.",
      },
      {
        heading: "When to add a subscription layer",
        body: "Add a subscription when you are continuously delivering ongoing value (content, updates, maintenance, access, community), when your customers would use the product or service every week, and when you can articulate what they get every month for their fee.",
      },
      {
        heading: "The verdict",
        body: "Start with one-time pricing for your initial offer — it is easier to sell and requires no value defense at renewal. Add a subscription option after your first 10 customers have been using your product or service for 60 days. At that point, you will know whether ongoing delivery is worth packaging.",
      },
      {
        heading: "How to get started",
        body: "Map your current revenue by transaction type. If every sale requires finding a new customer from scratch, you have a one-time model and an acquisition treadmill. Identify what ongoing service you could offer to your existing customers for $50-200/month. That is your subscription layer.",
      },
    ],
    checklistStepIds: ["price-3", "price-4"],
    affiliates: [
      {
        name: "Stripe",
        url: "https://stripe.com",
        description: "Native support for one-time and recurring subscription billing",
        badge: "Best for SaaS",
      },
      {
        name: "Lemon Squeezy",
        url: "https://www.lemonsqueezy.com",
        description: "One-time and subscription payments with automatic tax compliance",
        affiliate: true,
      },
    ],
    faqs: [
      {
        question: "Can I convert one-time buyers into subscribers?",
        answer:
          "Yes. Offer a subscription upgrade within 30 days of their one-time purchase when they are most satisfied. The conversion rate from recent buyers to subscribers is 3-5x higher than cold acquisition. Frame it as continuity, not upselling.",
      },
      {
        question: "What is churn and how do I reduce it?",
        answer:
          "Churn is the percentage of subscribers who cancel each month. Reduce it by increasing activation (making sure new subscribers use the product in the first 7 days), sending usage summaries (show what they got), and catching at-risk customers before they decide to cancel.",
      },
    ],
    relatedSlugs: [
      "monthly-vs-annual-pricing-saas",
      "freemium-vs-free-trial-vs-paid-only",
      "per-seat-vs-flat-rate-vs-usage-based",
    ],
    publishedAt: "2025-05-07",
  },

  // ─── 18. PRICING FOR PHYSICAL PRODUCTS ────────────────────────────────────
  {
    slug: "pricing-physical-products-retail-vs-direct-to-consumer",
    phase: 3,
    phaseName: "Price",
    title: "Retail vs Direct-to-Consumer Pricing: How to Set Prices for Physical Products",
    metaTitle: "Retail vs Direct-to-Consumer Pricing for Physical Products",
    metaDescription:
      "Should you price for wholesale/retail or direct-to-consumer? Learn keystone pricing, DTC margin math, and how to structure for both channels.",
    primaryKeyword: "retail vs direct-to-consumer pricing",
    secondaryKeywords: [
      "keystone pricing formula",
      "wholesale pricing for small business",
      "how to price physical products",
      "dtc pricing strategy",
    ],
    readTime: 6,
    intro:
      "Physical product pricing has a different math than services or software. Your cost of goods, channel margin, and retail markup interact in ways that can make a product profitable in one channel and loss-making in another. Here is how to get the math right before you go to market.",
    sections: [
      {
        heading: "The quick answer",
        body: "Direct-to-consumer (DTC) pricing gives you the highest margin but requires you to drive your own traffic. Retail and wholesale require a keystone markup structure that gives the retailer enough margin to carry your product. Build your pricing model to work in both channels from the start.",
      },
      {
        heading: "Side-by-side breakdown",
        body: "Keystone pricing: wholesale price = 2x cost, retail price = 2x wholesale (4x cost). Simple and widely understood by retail buyers. If your product costs $10 to make, wholesale is $20, retail is $40. This only works if your cost structure supports it.\n\nDTC pricing: you sell at retail price directly, keeping the wholesale-to-retail margin. Higher per-unit revenue but you absorb shipping, returns, and customer acquisition costs that retail handles for you. Your effective margin after ads and fulfillment may be lower than it appears.",
      },
      {
        heading: "When to prioritize DTC",
        body: "Prioritize DTC when you have a built-in audience (email list, social following, community), when your product benefits from your brand story (retail shelves strip that context), or when your product requires explanation or demonstration. DTC margins fund brand building.",
      },
      {
        heading: "When to prioritize wholesale/retail",
        body: "Prioritize wholesale when distribution is your primary barrier (your product benefits from being in-store), when retail buyers will provide discovery that you cannot generate yourself, or when your unit economics support the margin haircut and you need volume to drive down your COGS.",
      },
      {
        heading: "The verdict",
        body: "Build your cost structure to support keystone pricing from day one. If you cannot profitably sell at 4x your COGS, you will not be able to sell wholesale at any meaningful scale. Start DTC to validate demand and build margin data before approaching retail buyers.",
      },
      {
        heading: "How to get started",
        body: "Calculate your landed cost per unit (materials + production + packaging + inbound shipping). Multiply by 4 to get your target retail price. If that price is competitive in your market, you have a viable product. If it is not, your cost structure needs to change before your pricing does.",
      },
    ],
    checklistStepIds: ["price-1", "price-2", "price-3"],
    affiliates: [
      {
        name: "Shopify",
        url: "https://www.shopify.com",
        description: "Launch your DTC store and manage both wholesale and retail channels",
        badge: "Best for DTC",
      },
      {
        name: "Wave",
        url: "https://www.waveapps.com",
        description: "Track product costs and margins from day one at no cost",
        affiliate: true,
        badge: "Free",
      },
      {
        name: "QuickBooks",
        url: "https://quickbooks.intuit.com",
        description: "Inventory tracking and COGS management as you scale",
        affiliate: true,
      },
    ],
    faqs: [
      {
        question: "Do I need different pricing for Amazon vs my own website?",
        answer:
          "You typically cannot price lower on Amazon than on your own site per most retailer agreements, but you can price the same. Factor in Amazon's 15% referral fee and FBA fulfillment costs when calculating your effective margin on that channel.",
      },
      {
        question: "What is minimum advertised price (MAP) and do I need it?",
        answer:
          "MAP is the lowest price retailers are allowed to advertise your product. It protects your brand value and prevents price wars between your retail accounts. Set a MAP policy before you have multiple retail accounts — it is much harder to enforce retroactively.",
      },
    ],
    relatedSlugs: [
      "value-based-vs-cost-plus-vs-competitive-pricing",
      "how-to-calculate-your-true-cost-floor",
      "stripe-vs-paypal-vs-square-best-payment-processor",
    ],
    publishedAt: "2025-05-14",
  },

  // ─── 19. WHEN TO RAISE YOUR PRICES ────────────────────────────────────────
  {
    slug: "when-and-how-to-raise-your-prices",
    phase: 3,
    phaseName: "Price",
    title: "When and How to Raise Your Prices (Without Losing Clients)",
    metaTitle: "When and How to Raise Your Prices Without Losing Clients",
    metaDescription:
      "Signs you are underpriced, when to raise rates, how to tell clients, and what to do when they push back.",
    primaryKeyword: "when to raise your prices",
    secondaryKeywords: [
      "how to raise rates as a freelancer",
      "price increase announcement to clients",
      "signs you are undercharging",
      "how to raise prices without losing customers",
    ],
    readTime: 5,
    intro:
      "The hardest pricing decision is not setting your price — it is raising it. Most founders wait too long, give too much notice, and over-explain. Here is how to know when to raise prices and how to do it in a way that keeps the right clients and loses the ones holding you back.",
    sections: [
      {
        heading: "The quick answer",
        body: "You are underpriced if you are closing more than 80% of your proposals, if your waitlist is longer than 4 weeks, or if clients never push back on your rate. Raise prices annually at minimum, with 60 days notice and one clear sentence of rationale.",
      },
      {
        heading: "Side-by-side breakdown",
        body: "Gradual increase: 10-20% per year, timed to contract renewals or calendar year. Least disruptive. Maintains existing relationships. Compounds significantly over three years.\n\nImmediate reposition: significant price increase (50-100%) often combined with a scope or offer change. Loses some clients, but typically the most time-intensive and least profitable ones. Refocuses your business on better-fit customers.",
      },
      {
        heading: "When you should raise prices now",
        body: "Raise now if your close rate is above 80%, if you have more demand than capacity, if you have raised your skill level significantly since setting the current price, if your costs have increased materially, or if you simply flinched when you set the original price.",
      },
      {
        heading: "When to wait",
        body: "Wait if you are in the middle of a large project with a client you need a reference from, if you are entering a new market where the relationship matters more than the rate, or if you have lost three or more deals in a row on price (in which case a raise is the wrong direction).",
      },
      {
        heading: "The verdict",
        body: "Plan a price increase every January. Set a new rate, grandfather existing annual clients at their current rate until renewal, move all new clients to the new rate immediately. The revenue impact compounds fast and the client loss rate is almost always lower than founders expect.",
      },
      {
        heading: "How to get started",
        body: "Write your price increase email now, even if you do not send it yet. The clarity of having to explain your new rate and the reason for it often reveals whether the increase is justified and how to frame it. Then send it to your next three new proposals — not your existing clients first.",
      },
    ],
    checklistStepIds: ["price-3"],
    affiliates: [
      {
        name: "HoneyBook",
        url: "https://www.honeybook.com",
        description: "Update pricing templates and send new-rate proposals with one click",
        affiliate: true,
      },
      {
        name: "FreshBooks",
        url: "https://www.freshbooks.com",
        description: "Update recurring invoices and billing rates across active clients",
        affiliate: true,
      },
    ],
    faqs: [
      {
        question: "How much notice should I give clients before a price increase?",
        answer:
          "60 days is the standard for ongoing retainer clients. 30 days for project-based clients. New pricing applies to all new proposals immediately — you do not need to notify prospects, only existing clients mid-engagement.",
      },
      {
        question: "What do I say when a client says the new price is too high?",
        answer:
          "Say: 'I understand. My new rate reflects the scope and value we have been delivering together. If the new rate does not work, I am happy to help with a transition plan.' Do not negotiate unless you have a specific structural reason to. The clients who leave on a price increase are usually the ones taking the most of your time for the least margin.",
      },
    ],
    relatedSlugs: [
      "how-to-set-and-communicate-your-price",
      "value-based-vs-cost-plus-vs-competitive-pricing",
      "project-pricing-vs-retainer-vs-hourly",
    ],
    publishedAt: "2025-05-21",
  },

  // ─── 20. PAYMENT PROCESSOR FEES COMPARED ──────────────────────────────────
  {
    slug: "payment-processor-fees-compared",
    phase: 3,
    phaseName: "Price",
    title: "Payment Processor Fees Compared: How Much Each Platform Really Costs",
    metaTitle: "Payment Processor Fees Compared: True Cost Breakdown",
    metaDescription:
      "A detailed comparison of transaction fees, monthly fees, and hidden costs for Stripe, Square, PayPal, HoneyBook, Wave, and Lemon Squeezy.",
    primaryKeyword: "payment processor fees comparison",
    secondaryKeywords: [
      "stripe fees",
      "paypal fees for business",
      "cheapest payment processor",
      "how much does stripe cost",
    ],
    readTime: 5,
    intro:
      "Every payment processor charges something. The advertised rate is rarely the effective rate once you add card types, international transactions, chargebacks, and monthly fees. Here is a plain-language comparison of what you actually pay on each platform.",
    sections: [
      {
        heading: "The quick answer",
        body: "For most online businesses processing under $50K/month, Stripe and Square offer the most transparent fee structures. For digital products with global buyers, Lemon Squeezy's all-in-one fee (including tax compliance) often beats adding Stripe + a tax tool separately.",
      },
      {
        heading: "Side-by-side breakdown",
        body: "Stripe: 2.9% + 30 cents (card not present). 2.7% + 5 cents (in-person). Interchange-plus pricing available at higher volumes. No monthly fee. Chargeback fee: $15 (refunded if you win).\n\nSquare: 2.6% + 10 cents (in-person). 2.9% + 30 cents (online). No monthly fee on standard plan. $0 for the first card reader.\n\nPayPal: 3.49% + 49 cents (standard checkout). 2.99% + 49 cents (advanced checkout). Fees are higher and structure is more complex. Strong brand trust with buyers.\n\nLemon Squeezy: 5% + 50 cents per transaction, but includes Merchant of Record (all sales tax handled). Comparable to Stripe + a tax tool when you factor in compliance cost.\n\nWave Payments: 2.9% + 60 cents (card). 1% (bank transfer, minimum $1). No monthly fee. Built into free Wave accounting.",
      },
      {
        heading: "When lower fees matter most",
        body: "Fee optimization matters most at high transaction volume or when your average order value is high. At $10,000/month in revenue, a 0.3% fee difference is $30 — meaningful but not worth switching for. At $100,000/month, it is $300 — worth a conversation with your processor.",
      },
      {
        heading: "When to prioritize features over fees",
        body: "Prioritize features when churn risk from poor billing is higher than fee savings (use Stripe's dunning tools), when tax compliance is a liability (use Lemon Squeezy's Merchant of Record), or when checkout conversion is a problem (test PayPal's brand trust against Stripe's speed).",
      },
      {
        heading: "The verdict",
        body: "Start with Stripe for most online businesses. The developer tools, documentation, and reliability justify the standard rate. Revisit your processor choice at $50K/month when negotiated rates and interchange-plus pricing become available and the savings are meaningful.",
      },
      {
        heading: "How to get started",
        body: "Calculate your current effective processing rate: total fees paid last month divided by total revenue. Compare to the published rates above. If you are paying above 3.2% without getting Merchant of Record or premium features, you have room to optimize. If you are not yet processing, start with Stripe — you can always switch.",
      },
    ],
    checklistStepIds: ["price-4"],
    affiliates: [
      {
        name: "Stripe",
        url: "https://stripe.com",
        description: "Transparent fees, best-in-class API, and no monthly cost",
        badge: "Best Overall",
      },
      {
        name: "Square",
        url: "https://squareup.com",
        description: "Free card reader and lowest in-person transaction fees",
        affiliate: true,
        badge: "Best In-Person",
      },
      {
        name: "Lemon Squeezy",
        url: "https://www.lemonsqueezy.com",
        description: "All-in-one fee includes global tax compliance — best for digital products",
        affiliate: true,
      },
      {
        name: "Wave",
        url: "https://www.waveapps.com",
        description: "Free accounting with built-in payment processing",
        affiliate: true,
        badge: "Free Accounting",
      },
    ],
    faqs: [
      {
        question: "Are there hidden fees I should watch for?",
        answer:
          "Yes. Watch for: chargeback fees ($15-25 per dispute), international card surcharges (1.5% additional on Stripe), currency conversion fees, refund fees (Stripe keeps the processing fee on refunds), and ACH/bank transfer fees which vary by processor.",
      },
      {
        question: "Can I negotiate lower rates?",
        answer:
          "Yes, once you are processing over $50,000/month consistently. Contact Stripe, Square, or PayPal directly and ask about custom pricing or interchange-plus. Most processors will negotiate rather than lose a high-volume account.",
      },
    ],
    relatedSlugs: [
      "stripe-vs-paypal-vs-square-best-payment-processor",
      "gumroad-vs-lemon-squeezy-vs-payhip",
      "invoicing-best-practices-get-paid-faster",
    ],
    publishedAt: "2025-05-28",
  },
];

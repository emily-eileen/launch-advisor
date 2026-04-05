export const AFFILIATE_LINKS: Record<string, string> = {
  // ==========================================
  // PHASE 4: FORMATION & LEGAL
  // ==========================================
  "ZenBusiness": "https://www.zenbusiness.com", // UPDATE THIS LINK
  "Northwest Registered Agent": "https://www.northwestregisteredagent.com", // UPDATE THIS LINK
  "Bizee": "https://www.bizee.com", // UPDATE THIS LINK
  "Incfile": "https://www.bizee.com", // UPDATE THIS LINK

  // ==========================================
  // VIRTUAL REAL ESTATE
  // ==========================================
  "iPostal1": "https://ipostal1.com", // UPDATE THIS LINK
  "PostNet": "https://www.postnet.com", // UPDATE THIS LINK

  // ==========================================
  // PHASE 5: FINANCIALS
  // ==========================================
  "Mercury": "https://mercury.com", // UPDATE THIS LINK
  "Novo": "https://banknovo.com", // UPDATE THIS LINK
  "Relay Financial": "https://relayfi.com", // UPDATE THIS LINK
  "Bench Accounting": "https://bench.co", // UPDATE THIS LINK
  "Keeper": "https://www.keeper.app", // UPDATE THIS LINK

  // ==========================================
  // PHASE 6: PROMO MERCH & COMMUNICATIONS
  // ==========================================
  "OpenPhone": "https://www.openphone.com", // UPDATE THIS LINK
  "RingCentral": "https://www.ringcentral.com", // UPDATE THIS LINK
  "Vistaprint": "https://www.vistaprint.com", // UPDATE THIS LINK
  "StickerMule": "https://www.stickermule.com", // UPDATE THIS LINK
  "Printify": "https://printify.com", // UPDATE THIS LINK

  // ==========================================
  // PHASE 6: BRANDING & DESIGN
  // ==========================================
  "Fiverr": "https://www.fiverr.com", // UPDATE THIS LINK
  "Looka": "https://looka.com", // UPDATE THIS LINK
  "Canva": "https://www.canva.com", // UPDATE THIS LINK

  // ==========================================
  // PHASE 7: WEB & DIGITAL
  // ==========================================
  "Hostinger": "https://www.hostinger.com", // UPDATE THIS LINK
  "Bluehost": "https://www.bluehost.com", // UPDATE THIS LINK
  "Google Workspace": "https://workspace.google.com", // UPDATE THIS LINK
  "Shopify": "https://www.shopify.com", // UPDATE THIS LINK
  "Stripe": "https://stripe.com", // UPDATE THIS LINK
  "Gumroad": "https://gumroad.com", // UPDATE THIS LINK

  // ==========================================
  // TOOLS, RESEARCH & ANALYTICS
  // ==========================================
  "Notion": "https://www.notion.so", // UPDATE THIS LINK
  "Airtable": "https://www.airtable.com", // UPDATE THIS LINK
  "Typeform": "https://www.typeform.com", // UPDATE THIS LINK
  "SurveyMonkey": "https://www.surveymonkey.com", // UPDATE THIS LINK
  "Hotjar": "https://www.hotjar.com", // UPDATE THIS LINK
  "Exploding Topics": "https://explodingtopics.com", // UPDATE THIS LINK
  "Semrush": "https://www.semrush.com", // UPDATE THIS LINK
  "SpyFu": "https://www.spyfu.com", // UPDATE THIS LINK
  "Loom": "https://www.loom.com", // UPDATE THIS LINK
  "Lyssna": "https://www.lyssna.com", // UPDATE THIS LINK
  "Maze": "https://maze.co", // UPDATE THIS LINK
  "UserTesting": "https://www.usertesting.com", // UPDATE THIS LINK
};

/**
 * Helper function to safely replace a base URL with an affiliate URL if one exists.
 * @param providerName The name of the software/service
 * @param originalUrl The hardcoded fallback URL
 */
export function getAffiliateUrl(providerName: string, originalUrl: string): string {
  // Normalize the lookup to prevent case-sensitivity issues
  const foundKey = Object.keys(AFFILIATE_LINKS).find(
    (key) => key.toLowerCase() === providerName.toLowerCase()
  );
  
  if (foundKey && AFFILIATE_LINKS[foundKey] && !AFFILIATE_LINKS[foundKey].includes('example.com')) {
    return AFFILIATE_LINKS[foundKey];
  }
  
  return originalUrl;
}

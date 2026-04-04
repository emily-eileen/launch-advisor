import fs from 'fs';
import path from 'path';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("Please set GEMINI_API_KEY environment variable.");
  process.exit(1);
}

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma",
  "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas",
  "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const INTERNATIONAL_HUBS = [
  "Estonia (E-Residency)", "United Kingdom", "Singapore", "United Arab Emirates", "British Virgin Islands"
];

const LOCATIONS = [...US_STATES, ...INTERNATIONAL_HUBS];

const OUT_DIR = path.join(__dirname, '../lib/data/guides/locations');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function generateWithGemini(prompt: string, retries = 3): Promise<any> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });
      if (!response.ok) throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      const data = await response.json() as any;
      if (data.candidates && data.candidates.length > 0) {
        return JSON.parse(data.candidates[0].content.parts[0].text);
      }
    } catch (err: any) {
      console.warn(`Attempt ${i+1} failed: ${err.message}. Retrying...`);
      await new Promise(r => setTimeout(r, 2000 * (i + 1))); // backoff
    }
  }
  throw new Error("Failed after retries");
}

async function main() {
  console.log(`Starting to generate ${LOCATIONS.length} location guides...`);
  for (const location of LOCATIONS) {
    const slug = slugify(location);
    const filePath = path.join(OUT_DIR, `${slug}.json`);
    if (fs.existsSync(filePath)) {
      console.log(`Skipping ${location}, already generated.`);
      continue;
    }

    console.log(`Generating: ${location}...`);
    const prompt = `
You are an expert small business attorney and accountant (though you must stipulate you are speaking generally and an educational platform). 
Write a comprehensive, SEO-optimized business launch guide specific to the location: "${location}". Focus exclusively on the legal formation process, tax implications, and accounting considerations for registering there.

Include highly practical advice, potential state/regional traps (like California's $800 minimum franchise tax, or Delaware foreign entity registration pitfalls), and standard business licenses an incoming founder must be aware of. Subtly mention affiliate tools as pragmatic solutions (e.g. ZenBusiness for fast LLC filings, Keeper/Bench for taxes) if it fits. Ensure the tone is direct, supportive, and executive.

Format output exactly as this JSON structure:
{
  "id": "${slug}",
  "location": "${location}",
  "type": "location-guide",
  "title": "How to Start a Business in ${location}: Legal & Tax Guide",
  "metaDescription": "The complete founder's guide to legal formation, tax compliance, and accounting considerations when starting a business in ${location}.",
  "sections": [
    {
      "title": "Legal Formation Options",
      "content": "..."
    },
    {
      "title": "State/Regional Business Taxes & Fees",
      "content": "..."
    },
    {
      "title": "Required Licenses & Permits",
      "content": "..."
    },
    {
      "title": "Expert Advice & Common Traps",
      "content": "..."
    }
  ]
}
`;
    try {
      const generated = await generateWithGemini(prompt);
      fs.writeFileSync(filePath, JSON.stringify(generated, null, 2));
      console.log(`Successfully saved: ${slug}.json`);
    } catch (err: any) {
      console.error(`Failed on ${location}: ${err.message}`);
    }
  }
  console.log("All locations done.");
}

main().catch(console.error);

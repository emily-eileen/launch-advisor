"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// scripts/generate-location-guides.ts
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("Please set GEMINI_API_KEY environment variable.");
  process.exit(1);
}
var US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming"
];
var INTERNATIONAL_HUBS = [
  "Estonia (E-Residency)",
  "United Kingdom",
  "Singapore",
  "United Arab Emirates",
  "British Virgin Islands"
];
var LOCATIONS = [...US_STATES, ...INTERNATIONAL_HUBS];
var OUT_DIR = import_path.default.join(__dirname, "../lib/data/guides/locations");
if (!import_fs.default.existsSync(OUT_DIR)) {
  import_fs.default.mkdirSync(OUT_DIR, { recursive: true });
}
function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}
async function generateWithGemini(prompt, retries = 3) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });
      if (!response.ok) throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      const data = await response.json();
      if (data.candidates && data.candidates.length > 0) {
        return JSON.parse(data.candidates[0].content.parts[0].text);
      }
    } catch (err) {
      console.warn(`Attempt ${i + 1} failed: ${err.message}. Retrying...`);
      await new Promise((r) => setTimeout(r, 2e3 * (i + 1)));
    }
  }
  throw new Error("Failed after retries");
}
async function main() {
  console.log(`Starting to generate ${LOCATIONS.length} location guides...`);
  for (const location of LOCATIONS) {
    const slug = slugify(location);
    const filePath = import_path.default.join(OUT_DIR, `${slug}.json`);
    if (import_fs.default.existsSync(filePath)) {
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
      import_fs.default.writeFileSync(filePath, JSON.stringify(generated, null, 2));
      console.log(`Successfully saved: ${slug}.json`);
    } catch (err) {
      console.error(`Failed on ${location}: ${err.message}`);
    }
  }
  console.log("All locations done.");
}
main().catch(console.error);

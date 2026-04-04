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

// scripts/enrich-checklist.ts
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("Please set GEMINI_API_KEY environment variable.");
  process.exit(1);
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
  require("ts-node").register({ transpileOnly: true, compilerOptions: { module: "commonjs", moduleResolution: "node" } });
  const checklistPath = import_path.default.join(__dirname, "../lib/data/checklist.ts");
  const checklistModule = require(checklistPath);
  const steps = checklistModule.checklistSteps;
  console.log(`Starting to enrich ${steps.length} steps...`);
  const results = [];
  for (const step of steps) {
    console.log(`Processing: ${step.title}...`);
    const prompt = `
You are an expert small business launch advisor.
I have a checklist step for a business launch. I need to expand its intro section so it feeds logically into the final journal entry, and I need to recommend 1-3 AI-enabled premium micro-services (like Fiverr services but embedded into this app).

STEP CONTEXT:
Phase: ${step.phaseName}
Title: ${step.title}
Original Description: ${step.description}
Action Statement: ${step.action}
End Journal Prompt: ${step.journalPrompt}

TASK:
1. Provide "whyItMatters": Explains the cost of getting it wrong and the leverage of getting it right.
2. Provide "howToDoIt": The mental model or framework to execute.
3. Provide "whatToStartWith": The specific micro-action that transitions perfectly into the Journal Prompt.
4. Keep "description" as a 1 sentence short summary.
5. Provide "premiumFeatures": An array of 1-3 highly customized, relevant "AI do-it-for-me" features embedded for this step to fast-track execution. For example, if it's market research, an 'AI Competitor Scraping Bot'. 
Icon should be a lucide-react icon name, like "PenTool", "BarChart2", "Zap", "Search", "FileText", "LayoutDashboard", etc.

Return JSON EXACTLY in this format:
{
  "description": "...",
  "whyItMatters": "...",
  "howToDoIt": "...",
  "whatToStartWith": "...",
  "journalPrompt": "...",  // Provide the original journal prompt or slightly tweaked to fit perfectly
  "premiumFeatures": [
    {
      "id": "item-id",
      "icon": "IconName",
      "label": "AI Premium Name",
      "tagline": "Short description of what the AI generates for them.",
      "cta": "Generate now"
    }
  ]
}
`;
    const enriched = await generateWithGemini(prompt, 5);
    results.push({ ...step, ...enriched });
  }
  const fileContent = import_fs.default.readFileSync(checklistPath, "utf8");
  let newArrayStr = `export const checklistSteps: ChecklistStep[] = [
`;
  for (const r of results) {
    newArrayStr += `  ${JSON.stringify(r, null, 2)},
`;
  }
  newArrayStr += `];
`;
  const startRegex = /export const checklistSteps: ChecklistStep\[\] = \[/;
  const endRegex = /export function getStepById/;
  const startIdx = fileContent.search(startRegex);
  const endIdx = fileContent.search(endRegex);
  if (startIdx !== -1 && endIdx !== -1) {
    const beginning = fileContent.substring(0, startIdx);
    const ending = fileContent.substring(endIdx);
    const newContent = beginning + newArrayStr + "\n" + ending;
    import_fs.default.writeFileSync(checklistPath, newContent, "utf8");
    console.log("Successfully updated checklist.ts!");
  } else {
    console.log("Regex failed to find bounds, saving to raw json for fallback.");
    import_fs.default.writeFileSync(import_path.default.join(__dirname, "../lib/data/checklist-enriched.json"), JSON.stringify(results, null, 2));
  }
}
main().catch(console.error);

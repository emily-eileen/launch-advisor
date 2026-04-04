import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("Please set GEMINI_API_KEY environment variable.");
  process.exit(1);
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
          generationConfig: {
            responseMimeType: "application/json"
          }
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json() as any;
      if (data.candidates && data.candidates.length > 0) {
        const text = data.candidates[0].content.parts[0].text;
        return JSON.parse(text);
      } else {
        throw new Error("No candidates returned from Gemini");
      }
    } catch (err: any) {
      console.warn(`Attempt ${i+1} failed: ${err.message}. Retrying...`);
      await new Promise(r => setTimeout(r, 2000 * (i + 1))); // backoff
    }
  }
  throw new Error("Failed to generate content after retries.");
}

// Simple concurrency limiter
async function asyncPool(poolLimit: number, array: any[], iteratorFn: (item: any) => Promise<any>) {
  const ret: Promise<any>[] = [];
  const executing: Promise<any>[] = [];
  for (const item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item));
    ret.push(p);
    
    if (poolLimit <= array.length) {
      const e: any = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= poolLimit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
}

async function main() {
  console.log('Loading configuration...');
  const yamlPath = path.join(__dirname, '../launchadvisor.yaml');
  const yamlContent = fs.readFileSync(yamlPath, 'utf8');
  const config = yaml.load(yamlContent) as any;

  const targetNaics = config?.audience_positioning?.target_naics;
  if (!targetNaics) {
    console.error('Could not find target_naics in launchadvisor.yaml');
    process.exit(1);
  }

  console.log(`Found ${targetNaics.length} NAICS categories to target.`);

  const guidesDir = path.join(__dirname, '../lib/data/guides');
  const tailoredDir = path.join(guidesDir, 'tailored');
  if (!fs.existsSync(tailoredDir)) {
    fs.mkdirSync(tailoredDir, { recursive: true });
  }

  require('ts-node').register({ transpileOnly: true, compilerOptions: { module: 'commonjs', moduleResolution: 'node' } });
  
  const phaseFiles = fs.readdirSync(guidesDir).filter(f => f.startsWith('phase-') && f.endsWith('.ts'));
  
  // Aggregate all original guides
  console.log('Loading original guides...');
  const allOriginalGuides: any[] = [];
  for (const file of phaseFiles) {
    const filePath = path.join(guidesDir, file);
    delete require.cache[require.resolve(filePath)];
    const moduleContent = require(filePath);
    if (moduleContent.guides) {
      allOriginalGuides.push(...moduleContent.guides);
    }
  }
  
  console.log(`Loaded ${allOriginalGuides.length} generic guides to process for each category.\n`);

  for (const category of targetNaics) {
    const categorySlug = category.label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const categoryFilePath = path.join(tailoredDir, `${categorySlug}.json`);
    
    // Resume support - if file exists and has same length, skip
    if (fs.existsSync(categoryFilePath)) {
      try {
        const existing = JSON.parse(fs.readFileSync(categoryFilePath, 'utf8'));
        if (existing.length >= allOriginalGuides.length) {
          console.log(`Skipping ${category.label} - already fully generated.`);
          continue;
        }
      } catch (e) {}
    }

    console.log(`\n===========================================`);
    console.log(`Generating AI content batches for: ${category.label}`);
    console.log(`Description: ${category.description}`);
    console.log(`===========================================\n`);

    const categoryGuides: any[] = [];

    // Run parallel batches (concurrency of 5 to respect API rate limits)
    await asyncPool(5, allOriginalGuides, async (guide) => {
      console.log(`  - Processing guide in background worker: ${guide.title}`);
      
      const prompt = `
You are an expert small business launch advisor.
We are tailoring a generic business launch guide for a specific business type.

TARGET BUSINESS TYPE: 
Name: ${category.label}
Description: ${category.description}

ORIGINAL GUIDE:
Title: ${guide.title}
Primary Keyword: ${guide.primaryKeyword}
Intro: ${guide.intro}
Sections:
${guide.sections.map((s: any) => `## ${s.heading}\n${s.body}`).join('\n\n')}

INSTRUCTIONS:
1. Rewrite the Title, Meta Title, Meta Description, Primary Keyword, and Intro to specifically target this business type (e.g., instead of generic "business", use "${category.label}").
2. Maximize high-intent, ready-to-purchase SEO keywords (long-tail) for this business type.
3. Rewrite the body of each section so that the examples, costs, metrics, advice, and facts are HYPER-SPECIFIC to this industry. Use industry benchmarks, equipment names, or relevant operational norms.
4. Adhere strictly to the LaunchAdvisor brand voice (practical, direct, no jargon, no motivational fluff, 8th-grade reading level).
5. When mentioning a tool or service, thoughtfully optimize for recommendations where there is an affiliate link revenue opportunity (e.g. LLC formation, banking, web hosting). Embed these tools naturally as the pragmatic choice without sounding like a salesperson — remain subtle and non-salesy.
6. Output ONLY valid JSON matching the following structure EXACTLY:
{
  "title": "...",
  "metaTitle": "...",
  "metaDescription": "...",
  "primaryKeyword": "...",
  "secondaryKeywords": ["...", "..."],
  "intro": "...",
  "sections": [
    { "heading": "...", "body": "..." }
  ]
}
`;

      try {
        const rewrittenJson = await generateWithGemini(prompt);
        
        const newGuide = {
          ...guide,
          slug: `${guide.slug}-${categorySlug}`,
          title: rewrittenJson.title || guide.title,
          metaTitle: rewrittenJson.metaTitle || guide.metaTitle,
          metaDescription: rewrittenJson.metaDescription || guide.metaDescription,
          primaryKeyword: rewrittenJson.primaryKeyword || guide.primaryKeyword,
          secondaryKeywords: rewrittenJson.secondaryKeywords || guide.secondaryKeywords,
          intro: rewrittenJson.intro || guide.intro,
          sections: rewrittenJson.sections || guide.sections,
          businessTypes: [category.label],
        };
        categoryGuides.push(newGuide);
      } catch (err: any) {
        console.error(`    [ERROR] Failed guide ${guide.slug}: ${err.message}. Falling back to default.`);
        categoryGuides.push({
          ...guide,
          slug: `${guide.slug}-${categorySlug}`,
          businessTypes: [category.label]
        });
      }
      
      // Save incrementally so progress isn't lost if the script terminates
      fs.writeFileSync(categoryFilePath, JSON.stringify(categoryGuides, null, 2));
    });

    console.log(`Saved ${categoryGuides.length} AI-tailored guides to ${categoryFilePath}`);
  }

  // Create barrel file
  const customFiles = fs.readdirSync(tailoredDir).filter(f => f.endsWith('.json'));
  let indexTsContent = `import type { Guide } from '../types';\n\n`;
  indexTsContent += `export const getTailoredGuides = (): Guide[] => {\n  const allGuides: Guide[] = [];\n`;
  for (const file of customFiles) {
    indexTsContent += `  allGuides.push(...(require('./${file}')));\n`;
  }
  indexTsContent += `  return allGuides;\n};\n`;
  fs.writeFileSync(path.join(tailoredDir, 'index.ts'), indexTsContent);

  console.log('\\nAll parallel AI agent generation complete!');
}

main().catch(console.error);

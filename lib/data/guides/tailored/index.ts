import fs from 'fs';
import path from 'path';
import type { Guide } from '../types';

export const getTailoredGuides = (): Guide[] => {
  const allGuides: Guide[] = [];
  try {
    const dir = path.join(process.cwd(), 'lib/data/guides/tailored');
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.endsWith('.json')) {
        try {
          const content = fs.readFileSync(path.join(dir, file), 'utf8');
          allGuides.push(...JSON.parse(content));
        } catch (err) {
          console.warn(`Failed to parse ${file}`);
        }
      }
    }
  } catch (err) {
    console.warn("Could not load tailored guides directory.", err);
  }
  return allGuides;
};

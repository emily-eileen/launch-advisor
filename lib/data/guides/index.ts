import type { Guide } from "./types";

// Lazy-loaded per phase to keep initial bundle small
// Each phase file exports: export const guides: Guide[] = [...]

export async function getGuidesByPhase(phase: number): Promise<Guide[]> {
  const phaseMap: Record<number, () => Promise<{ guides: Guide[] }>> = {
    1:  () => import("./phase-1-validate"),
    2:  () => import("./phase-2-build"),
    3:  () => import("./phase-3-price"),
    4:  () => import("./phase-4-form"),
    5:  () => import("./phase-5-finance"),
    6:  () => import("./phase-6-locate"),
    7:  () => import("./phase-7-brand"),
    8:  () => import("./phase-8-protect"),
    9:  () => import("./phase-9-sell"),
    10: () => import("./phase-10-operate"),
  };
  const mod = await phaseMap[phase]?.();
  return mod?.guides ?? [];
}

export async function getAllGuides(): Promise<Guide[]> {
  const phases = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const results = await Promise.all(phases.map(getGuidesByPhase));
  return results.flat();
}

export async function getTailoredCategoryGuides(businessType: string): Promise<Guide[]> {
  if (!businessType) return [];
  const categorySlug = businessType.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  try {
    const tailoredGuides = await import(`./tailored/${categorySlug}.json`);
    return tailoredGuides.default || tailoredGuides;
  } catch (err) {
    // Fall back to original generic guides
    return [];
  }
}

export async function getAllTailoredGuides(): Promise<Guide[]> {
  try {
    const mod = await import('./tailored/index');
    return await mod.getTailoredGuides();
  } catch(e) {
    return [];
  }
}

export async function getGuideBySlug(slug: string, businessType?: string): Promise<Guide | undefined> {
  if (businessType) {
    // If businessType is provided, also check if the user is requesting specific tailored format
    const categorySlug = businessType.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const tailoredSlug = slug.endsWith(`-${categorySlug}`) ? slug : `${slug}-${categorySlug}`;
    
    const tailored = await getTailoredCategoryGuides(businessType);
    const foundTailored = tailored.find((g: Guide) => g.slug === tailoredSlug || g.slug === slug);
    if (foundTailored) return foundTailored;
  }
  
  const all = await getAllGuides();
  let found = all.find((g) => g.slug === slug);
  
  if (!found) {
    // Direct link from crawler or external site to a tailored guide slug
    const allTailored = await getAllTailoredGuides();
    found = allTailored.find((g) => g.slug === slug);
  }
  
  return found;
}

export async function getGuidesByPhaseName(phaseName: string, businessType?: string): Promise<Guide[]> {
  const all = await getAllGuides();
  const baseGuides = all.filter((g) => g.phaseName.toLowerCase() === phaseName.toLowerCase());
  
  if (businessType) {
    const tailored = await getTailoredCategoryGuides(businessType);
    const tailoredPhaseGuides = tailored.filter((g: Guide) => g.phaseName.toLowerCase() === phaseName.toLowerCase());
    return tailoredPhaseGuides.length > 0 ? tailoredPhaseGuides : baseGuides;
  }
  
  return baseGuides;
}

export async function getGuidesForStep(stepId: string, businessType?: string): Promise<Guide[]> {
  const all = await getAllGuides();
  const baseGuides = all.filter((g) => g.checklistStepIds.includes(stepId));
  
  if (businessType) {
    const tailored = await getTailoredCategoryGuides(businessType);
    const tailoredStepGuides = tailored.filter((g: Guide) => g.checklistStepIds.includes(stepId));
    return tailoredStepGuides.length > 0 ? tailoredStepGuides : baseGuides;
  }
  
  return baseGuides;
}

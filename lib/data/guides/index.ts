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

export async function getGuideBySlug(slug: string): Promise<Guide | undefined> {
  const all = await getAllGuides();
  return all.find((g) => g.slug === slug);
}

export async function getGuidesByPhaseName(phaseName: string): Promise<Guide[]> {
  const all = await getAllGuides();
  return all.filter((g) => g.phaseName.toLowerCase() === phaseName.toLowerCase());
}

export async function getGuidesForStep(stepId: string): Promise<Guide[]> {
  const all = await getAllGuides();
  return all.filter((g) => g.checklistStepIds.includes(stepId));
}

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Lightbulb,
  FileText,
  DollarSign,
  Palette,
  Shield,
  Rocket,
} from "lucide-react";
import { phases, checklistSteps } from "@/lib/data/checklist";

// Mock completed steps for development
const mockCompleted = new Set(["decide-1", "decide-2", "decide-3", "form-1"]);

const phaseIcons: Record<string, React.ElementType> = {
  Decide: Lightbulb,
  Form: FileText,
  "Set Up Money": DollarSign,
  "Brand Basics": Palette,
  Protect: Shield,
  Launch: Rocket,
};

export default function ChecklistPage() {
  const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set([1, 2]));
  const [completed] = useState(mockCompleted);

  function togglePhase(phase: number) {
    setExpandedPhases((prev) => {
      const next = new Set(prev);
      if (next.has(phase)) {
        next.delete(phase);
      } else {
        next.add(phase);
      }
      return next;
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-navy">
          Your Launch Checklist
        </h1>
        <p className="text-muted mt-1">
          30 steps across 6 phases. Work through them at your own pace.
        </p>
      </div>

      <div className="space-y-4">
        {phases.map((phase) => {
          const phaseSteps = checklistSteps.filter((s) => s.phase === phase.number);
          const completedCount = phaseSteps.filter((s) => completed.has(s.id)).length;
          const isExpanded = expandedPhases.has(phase.number);
          const isComplete = completedCount === phaseSteps.length;
          const Icon = phaseIcons[phase.name] || Circle;

          return (
            <div
              key={phase.number}
              className="bg-white rounded-2xl border border-border-light overflow-hidden"
            >
              {/* Phase header */}
              <button
                onClick={() => togglePhase(phase.number)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-surface/50 transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isComplete
                      ? "bg-success text-white"
                      : completedCount > 0
                      ? "bg-orange-light text-orange"
                      : "bg-surface text-muted"
                  }`}
                >
                  {isComplete ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-semibold font-[family-name:var(--font-space-grotesk)] text-navy">
                      Phase {phase.number}: {phase.name}
                    </h2>
                    <span className="text-xs text-muted bg-surface px-2 py-0.5 rounded-full">
                      {completedCount}/{phaseSteps.length}
                    </span>
                  </div>
                  <p className="text-sm text-muted mt-0.5">{phase.description}</p>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-muted flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted flex-shrink-0" />
                )}
              </button>

              {/* Steps */}
              {isExpanded && (
                <div className="border-t border-border-light">
                  {phaseSteps.map((step, idx) => {
                    const isDone = completed.has(step.id);
                    return (
                      <Link
                        key={step.id}
                        href={`/checklist/${step.id}`}
                        className={`flex items-center gap-4 px-5 py-4 hover:bg-surface/50 transition-colors group ${
                          idx < phaseSteps.length - 1 ? "border-b border-border-light" : ""
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-border flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm font-medium ${
                              isDone ? "text-muted line-through" : "text-foreground"
                            }`}
                          >
                            {step.title}
                          </p>
                          <p className="text-xs text-muted mt-0.5 line-clamp-1">
                            {step.description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-light opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

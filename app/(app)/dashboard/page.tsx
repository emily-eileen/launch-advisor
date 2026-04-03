"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Rocket,
  ArrowRight,
  CheckCircle2,
  Circle,
  Lightbulb,
  FileText,
  DollarSign,
  Palette,
  Shield,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { phases } from "@/lib/data/checklist";

// Mock data for development (works without Supabase)
const mockProgress = {
  completedSteps: 4,
  totalSteps: 30,
  phaseProgress: [
    { phase: 1, completed: 3, total: 5 },
    { phase: 2, completed: 1, total: 5 },
    { phase: 3, completed: 0, total: 5 },
    { phase: 4, completed: 0, total: 5 },
    { phase: 5, completed: 0, total: 5 },
    { phase: 6, completed: 0, total: 5 },
  ],
  nextStep: {
    id: "decide-4",
    title: "Validate your idea",
    phase: "Decide",
    description: "Before investing time and money, test whether real people will pay for what you offer.",
  },
};

const mockJournalEntries = [
  { id: "1", text: "Decided to start an online coaching business focused on career transitions. Feeling excited and a bit nervous.", stepTitle: "Define your business idea", createdAt: "2026-03-30T10:00:00Z" },
  { id: "2", text: "Found 3 competitors. My edge is the personalized 1-on-1 approach plus my corporate background.", stepTitle: "Research your market", createdAt: "2026-03-31T14:30:00Z" },
  { id: "3", text: "Going with professional services. It feels right for what I want to build.", stepTitle: "Choose your business type", createdAt: "2026-04-01T09:15:00Z" },
];

const phaseIcons: Record<string, React.ElementType> = {
  Decide: Lightbulb,
  Form: FileText,
  "Set Up Money": DollarSign,
  "Brand Basics": Palette,
  Protect: Shield,
  Launch: Rocket,
};

export default function DashboardPage() {
  const progress = mockProgress;
  const journalEntries = mockJournalEntries;
  const percentage = Math.round((progress.completedSteps / progress.totalSteps) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-navy">
          Your Launch Plan
        </h1>
        <p className="text-muted mt-1">
          You are making progress. Keep going, one step at a time.
        </p>
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-2xl border border-border-light p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-foreground">Overall Progress</span>
          <span className="text-sm font-semibold text-orange">{percentage}% complete</span>
        </div>
        <div className="w-full bg-border-light rounded-full h-3">
          <div
            className="bg-orange rounded-full h-3 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-muted mt-2">
          {progress.completedSteps} of {progress.totalSteps} steps done
        </p>
      </div>

      {/* Next Step card */}
      <Link href={`/checklist/${progress.nextStep.id}`}>
        <div className="bg-orange-light border-2 border-orange/20 rounded-2xl p-6 hover:border-orange/40 transition-colors cursor-pointer group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-orange uppercase tracking-wide mb-1">
                Your Next Step
              </p>
              <h2 className="text-lg font-semibold font-[family-name:var(--font-space-grotesk)] text-navy mb-1">
                {progress.nextStep.title}
              </h2>
              <p className="text-sm text-muted">{progress.nextStep.description}</p>
              <span className="inline-block mt-3 text-sm font-medium text-orange">
                Phase: {progress.nextStep.phase}
              </span>
            </div>
            <div className="bg-orange text-white p-2.5 rounded-xl group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </Link>

      {/* Phase overview */}
      <div>
        <h2 className="text-lg font-semibold font-[family-name:var(--font-space-grotesk)] text-navy mb-4">
          Your 6 Phases
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {phases.map((phase) => {
            const pp = progress.phaseProgress.find((p) => p.phase === phase.number);
            const Icon = phaseIcons[phase.name] || Circle;
            const isComplete = pp && pp.completed === pp.total;
            const isStarted = pp && pp.completed > 0;

            return (
              <Link key={phase.number} href="/checklist">
                <div
                  className={`bg-white rounded-xl border p-4 hover:shadow-sm transition-all cursor-pointer ${
                    isComplete ? "border-success/30 bg-success-light/30" : "border-border-light"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        isComplete
                          ? "bg-success text-white"
                          : isStarted
                          ? "bg-orange-light text-orange"
                          : "bg-surface text-muted"
                      }`}
                    >
                      {isComplete ? (
                        <CheckCircle2 className="w-4.5 h-4.5" />
                      ) : (
                        <Icon className="w-4.5 h-4.5" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{phase.name}</p>
                      <p className="text-xs text-muted">
                        {pp?.completed || 0}/{pp?.total || 5} steps
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-border-light rounded-full h-1.5">
                    <div
                      className={`rounded-full h-1.5 transition-all ${
                        isComplete ? "bg-success" : "bg-orange"
                      }`}
                      style={{
                        width: `${((pp?.completed || 0) / (pp?.total || 5)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent journal entries */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold font-[family-name:var(--font-space-grotesk)] text-navy">
            Recent Journal Entries
          </h2>
          <Link
            href="/journal"
            className="text-sm text-orange font-medium hover:underline flex items-center gap-1"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="space-y-3">
          {journalEntries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white rounded-xl border border-border-light p-4"
            >
              <div className="flex items-start gap-3">
                <BookOpen className="w-4 h-4 text-muted-light mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground line-clamp-2">{entry.text}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {entry.stepTitle && (
                      <span className="text-xs bg-orange-light text-orange px-2 py-0.5 rounded-full">
                        {entry.stepTitle}
                      </span>
                    )}
                    <span className="text-xs text-muted">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade prompt */}
      <div className="bg-white rounded-2xl border border-border-light p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-surface-warm rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-orange" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-navy mb-1">
              Want personalized guidance?
            </h3>
            <p className="text-sm text-muted mb-3">
              Upgrade to Pro for state-specific checklists, AI-powered recommendations, and priority support.
            </p>
            <button className="text-sm font-medium text-orange hover:underline">
              Learn more about Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

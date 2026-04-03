"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  ExternalLink,
  BookOpen,
  Star,
  Loader2,
} from "lucide-react";
import { getStepById, getAdjacentSteps } from "@/lib/data/checklist";

export default function StepDetailPage() {
  const params = useParams();
  const router = useRouter();
  const stepId = params.stepId as string;
  const step = getStepById(stepId);
  const { prev, next } = getAdjacentSteps(stepId);

  const [isDone, setIsDone] = useState(false);
  const [journalEntry, setJournalEntry] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!step) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-muted mb-4">Step not found.</p>
        <Link href="/checklist" className="text-orange font-medium hover:underline">
          Back to checklist
        </Link>
      </div>
    );
  }

  async function handleToggleDone() {
    setIsDone(!isDone);
    // In production, save to Supabase user_checklist_progress
    console.log(`Step ${stepId} marked as ${!isDone ? "done" : "not done"}`);
  }

  async function handleSaveJournal() {
    if (!journalEntry.trim()) return;
    setSaving(true);
    // In production, save to Supabase journal_entries
    console.log("Journal entry saved:", { stepId, text: journalEntry });
    await new Promise((r) => setTimeout(r, 500));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back link */}
      <Link
        href="/checklist"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to checklist
      </Link>

      {/* Phase badge */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-orange bg-orange-light px-2.5 py-1 rounded-full">
          Phase {step.phase}: {step.phaseName}
        </span>
        <span className="text-xs text-muted">
          Step {step.order} of 5
        </span>
      </div>

      {/* Title + completion toggle */}
      <div className="bg-white rounded-2xl border border-border-light p-6">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-xl font-bold font-[family-name:var(--font-space-grotesk)] text-navy">
            {step.title}
          </h1>
          <button
            onClick={handleToggleDone}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all flex-shrink-0 ${
              isDone
                ? "bg-success-light text-success border border-success/20"
                : "bg-surface text-muted hover:bg-orange-light hover:text-orange border border-border-light"
            }`}
          >
            {isDone ? (
              <>
                <CheckCircle2 className="w-4 h-4" /> Done
              </>
            ) : (
              <>
                <Circle className="w-4 h-4" /> Mark as Done
              </>
            )}
          </button>
        </div>

        <p className="text-muted mt-3 leading-relaxed">{step.description}</p>

        {/* Action */}
        <div className="mt-5 bg-orange-light/50 rounded-xl p-4 border border-orange/10">
          <p className="text-xs font-medium text-orange uppercase tracking-wide mb-1">
            Do this next
          </p>
          <p className="text-sm text-foreground">{step.action}</p>
        </div>
      </div>

      {/* Resources */}
      {step.resources.length > 0 && (
        <div>
          <h2 className="text-base font-semibold font-[family-name:var(--font-space-grotesk)] text-navy mb-3">
            Recommended Tools & Resources
          </h2>
          <div className="space-y-2">
            {step.resources.map((resource, idx) => (
              <a
                key={idx}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  // Track click event (console for now, Supabase later)
                  console.log("Resource click:", {
                    resource: resource.name,
                    url: resource.url,
                    affiliate: resource.affiliate || false,
                    step: stepId,
                  });
                }}
                className="flex items-center gap-4 bg-white rounded-xl border border-border-light p-4 hover:border-orange/30 hover:shadow-sm transition-all group"
              >
                <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-orange-light transition-colors">
                  <Star className="w-4.5 h-4.5 text-muted group-hover:text-orange transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{resource.name}</p>
                    {resource.affiliate && (
                      <span className="text-[10px] text-muted-light bg-surface px-1.5 py-0.5 rounded">
                        Partner
                      </span>
                    )}
                  </div>
                  {resource.description && (
                    <p className="text-xs text-muted mt-0.5">{resource.description}</p>
                  )}
                </div>
                <ExternalLink className="w-4 h-4 text-muted-light group-hover:text-orange transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Journal */}
      <div className="bg-white rounded-2xl border border-border-light p-6">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-4.5 h-4.5 text-orange" />
          <h2 className="text-base font-semibold font-[family-name:var(--font-space-grotesk)] text-navy">
            Journal Entry
          </h2>
        </div>
        <p className="text-sm text-muted mb-3 italic">
          {step.journalPrompt}
        </p>
        <textarea
          value={journalEntry}
          onChange={(e) => setJournalEntry(e.target.value)}
          placeholder="Write your thoughts here..."
          rows={4}
          className="w-full px-4 py-3 border border-border rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-colors"
        />
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-muted">
            {saved ? "Saved!" : "Your entries are private to you."}
          </span>
          <button
            onClick={handleSaveJournal}
            disabled={!journalEntry.trim() || saving}
            className="px-4 py-2 bg-orange text-white text-sm rounded-lg font-medium hover:bg-orange-hover transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
            Save entry
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        {prev ? (
          <Link
            href={`/checklist/${prev.id}`}
            className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{prev.title}</span>
            <span className="sm:hidden">Previous</span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/checklist/${next.id}`}
            className="flex items-center gap-2 text-sm text-orange font-medium hover:underline"
          >
            <span className="hidden sm:inline">{next.title}</span>
            <span className="sm:hidden">Next</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  BookOpen,
  Plus,
  X,
  Calendar,
  Loader2,
} from "lucide-react";

interface JournalEntry {
  id: string;
  text: string;
  stepId?: string;
  stepTitle?: string;
  createdAt: string;
}

// Mock data for development
const mockEntries: JournalEntry[] = [
  {
    id: "1",
    text: "Decided to start an online coaching business focused on career transitions. I have 15 years of corporate experience and I know the pain points people face when switching careers. Feeling excited and a bit nervous about taking this leap.",
    stepId: "decide-1",
    stepTitle: "Define your business idea",
    createdAt: "2026-03-30T10:00:00Z",
  },
  {
    id: "2",
    text: "Found 3 competitors offering similar coaching. But none of them combine the corporate insider perspective with personalized 1-on-1 coaching like I plan to. My edge is clearly the depth of experience.",
    stepId: "decide-2",
    stepTitle: "Research your market",
    createdAt: "2026-03-31T14:30:00Z",
  },
  {
    id: "3",
    text: "Going with professional services. It fits naturally with coaching and consulting. I can always expand into digital products later.",
    stepId: "decide-3",
    stepTitle: "Choose your business type",
    createdAt: "2026-04-01T09:15:00Z",
  },
  {
    id: "4",
    text: "Had a great conversation with a friend about the business idea. She immediately wanted to be my first client. That felt really validating.",
    createdAt: "2026-04-01T16:45:00Z",
  },
  {
    id: "5",
    text: "Looked into LLC formation today. ZenBusiness seems like the easiest option. Going to file this week.",
    stepId: "form-1",
    stepTitle: "Choose your legal structure",
    createdAt: "2026-04-02T08:30:00Z",
  },
];

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>(mockEntries);
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!newEntry.trim()) return;
    setSaving(true);

    // In production, save to Supabase
    await new Promise((r) => setTimeout(r, 500));

    const entry: JournalEntry = {
      id: String(Date.now()),
      text: newEntry,
      createdAt: new Date().toISOString(),
    };

    setEntries([entry, ...entries]);
    setNewEntry("");
    setShowForm(false);
    setSaving(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-navy">
            Launch Journal
          </h1>
          <p className="text-muted mt-1">
            Track your journey, reflect on your progress, and remember how far you have come.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-orange text-white rounded-xl text-sm font-medium hover:bg-orange-hover transition-colors"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : "New Entry"}
        </button>
      </div>

      {/* New entry form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-border-light p-6">
          <h2 className="text-base font-semibold font-[family-name:var(--font-space-grotesk)] text-navy mb-3">
            New Journal Entry
          </h2>
          <textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="What is on your mind? Record a decision, a win, a worry, or just how you are feeling about your launch..."
            rows={4}
            autoFocus
            className="w-full px-4 py-3 border border-border rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-colors"
          />
          <div className="flex justify-end mt-3">
            <button
              onClick={handleSave}
              disabled={!newEntry.trim() || saving}
              className="px-5 py-2.5 bg-orange text-white text-sm rounded-xl font-medium hover:bg-orange-hover transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Save Entry
            </button>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="space-y-4">
        {entries.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-12 h-12 text-border mx-auto mb-4" />
            <h3 className="text-base font-medium text-foreground mb-1">
              No entries yet
            </h3>
            <p className="text-sm text-muted">
              Start writing about your journey. Your future self will thank you.
            </p>
          </div>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white rounded-xl border border-border-light p-5"
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-orange-light rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <BookOpen className="w-4 h-4 text-orange" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                    {entry.text}
                  </p>
                  <div className="flex items-center flex-wrap gap-2 mt-3">
                    {entry.stepTitle && (
                      <span className="text-xs bg-orange-light text-orange px-2.5 py-0.5 rounded-full font-medium">
                        {entry.stepTitle}
                      </span>
                    )}
                    <span className="text-xs text-muted flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(entry.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { BookOpen, Plus, X, Calendar, Loader2 } from "lucide-react";

interface JournalEntry {
  id: string;
  text: string;
  stepId?: string;
  stepTitle?: string;
  createdAt: string;
}

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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>(mockEntries);
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!newEntry.trim()) return;
    setSaving(true);
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
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* ── Header ─────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <div style={{ height: 1, width: 32, background: "var(--orange)" }} />
            <span style={{ fontFamily: "var(--font-display)", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
              Your journey
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "3rem", letterSpacing: "0.02em", color: "var(--navy)", lineHeight: 1 }}>
            LAUNCH JOURNAL
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-muted)", fontSize: "0.9rem", marginTop: 6 }}>
            Track your decisions, wins, and reflections as you build.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
          style={{ fontSize: "0.72rem", padding: "10px 18px", flexShrink: 0, marginTop: 8 }}
        >
          {showForm ? <X style={{ width: 13, height: 13 }} /> : <Plus style={{ width: 13, height: 13 }} />}
          {showForm ? "Cancel" : "New Entry"}
        </button>
      </div>

      {/* ── New entry form ─────────────────────────────────── */}
      {showForm && (
        <div className="panel" style={{ padding: 24, borderLeft: "4px solid var(--orange)", boxShadow: "4px 4px 0 var(--orange)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <BookOpen style={{ width: 14, height: 14, color: "var(--orange)" }} />
            <span style={{ fontFamily: "var(--font-display)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--orange)" }}>
              New Entry
            </span>
          </div>
          <textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="What is on your mind? Record a decision, a win, a worry, or just how you feel about your launch..."
            rows={5}
            autoFocus
            style={{ resize: "none", marginBottom: 12 }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={handleSave}
              disabled={!newEntry.trim() || saving}
              className="btn btn-primary"
              style={{ fontSize: "0.72rem", padding: "10px 20px", opacity: !newEntry.trim() || saving ? 0.5 : 1 }}
            >
              {saving && <Loader2 style={{ width: 12, height: 12 }} />}
              Save Entry
            </button>
          </div>
        </div>
      )}

      {/* ── Entry count ─────────────────────────────────────── */}
      {entries.length > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ height: 1, flex: 1, background: "var(--border-light)" }} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-muted)", flexShrink: 0 }}>
            {entries.length} entries
          </span>
          <div style={{ height: 1, flex: 1, background: "var(--border-light)" }} />
        </div>
      )}

      {/* ── Timeline ──────────────────────────────────────── */}
      {entries.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
          <BookOpen style={{ width: 40, height: 40, color: "var(--border-light)", margin: "0 auto 16px" }} />
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--ink-mid)", marginBottom: 8 }}>
            No entries yet
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--ink-muted)" }}>
            Start writing about your journey. Your future self will thank you.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {entries.map((entry) => (
            <div key={entry.id} className="journal-card">
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--ink-mid)", lineHeight: 1.7, marginBottom: 12 }}>
                {entry.text}
              </p>
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                {entry.stepTitle && (
                  <span style={{
                    fontFamily: "var(--font-display)", fontSize: "0.58rem", letterSpacing: "0.12em",
                    textTransform: "uppercase", padding: "2px 8px",
                    border: "1.5px solid var(--orange)", color: "var(--orange)",
                  }}>
                    {entry.stepTitle}
                  </span>
                )}
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--font-heading)", fontSize: "0.68rem", fontWeight: 600, color: "var(--ink-muted)" }}>
                  <Calendar style={{ width: 11, height: 11 }} />
                  {formatDate(entry.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

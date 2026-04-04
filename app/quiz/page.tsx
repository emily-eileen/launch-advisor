"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Rocket } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// Business categories mapped to top NAICS codes for new business formation
// naics is the primary 6-digit code — used for filtering, not shown to users
export const BUSINESS_CATEGORIES = [
  { value: "consulting",      label: "Consulting / Coaching",       desc: "Business, life, HR, or strategy consulting — selling expertise by the hour or project", naics: "541611" },
  { value: "tech",            label: "Tech / IT / App",             desc: "Freelance dev, IT support, SaaS product, AI services, web design",                      naics: "541512" },
  { value: "creative",        label: "Creative Services",           desc: "Photography, videography, graphic design, copywriting, social media management",         naics: "541810" },
  { value: "home-services",   label: "Home & Property Services",    desc: "Cleaning, lawn care, handyman, pressure washing, property maintenance",                  naics: "561720" },
  { value: "trades",          label: "Trades & Construction",       desc: "Contractor, electrician, plumber, painter, roofer — skilled trades going independent",   naics: "238220" },
  { value: "food",            label: "Food & Beverage",             desc: "Food truck, ghost kitchen, catering, home bakery, pop-up restaurant",                    naics: "722330" },
  { value: "str",             label: "Short-Term Rental / Airbnb",  desc: "First Airbnb listing, VRBO host, vacation rental",                                       naics: "721199" },
  { value: "ecommerce",       label: "E-Commerce / Retail",         desc: "Shopify store, Etsy shop, Amazon reseller, online products, reselling",                  naics: "454110" },
  { value: "beauty-wellness", label: "Beauty / Wellness / Fitness", desc: "Hair stylist, nail tech, personal trainer, yoga instructor, esthetician",                naics: "812112" },
  { value: "care-services",   label: "Care & Personal Services",    desc: "Dog walking, pet sitting, childcare, babysitting, errands, concierge",                   naics: "812990" },
  { value: "saas",            label: "Software Publishers / SaaS Startups", desc: "B2B or B2C SaaS platforms, mobile application publishers, enterprise software",      naics: "513210" },
  { value: "real-estate",     label: "Real Estate Agencies & Brokerages",   desc: "Independent real estate agents graduating to owning their own B2B brokerage",    naics: "531210" },
  { value: "logistics",       label: "Logistics / Freight / Trucking",      desc: "Owner-operators starting an independent logistics or long-haul trucking business", naics: "484121" },
  { value: "medspa",          label: "Private Healthcare / MedSpa Practices", desc: "Nurse practitioners, functional medicine doctors, physical therapists",            naics: "621399" },
];

type QuizStep = "businessType" | "stage" | "projectName" | "email" | "loading";

const STAGE_OPTIONS = [
  { value: "idea",       label: "Just an idea",            desc: "Haven't started anything yet" },
  { value: "named",      label: "Named it / have a concept", desc: "Domain bought, maybe an LLC started" },
  { value: "registered", label: "Already registered",      desc: "Have an LLC or entity filed" },
  { value: "open",       label: "Open but filling gaps",   desc: "Running — just missing some foundation steps" },
];

const STEP_COLORS: Record<QuizStep, string> = {
  businessType: "#F97316",
  stage:        "#8B5CF6",
  projectName:  "#0EA5E9",
  email:        "#16A34A",
  loading:      "#F97316",
};

export default function QuizPage() {
  const router = useRouter();
  const [quizStep, setQuizStep] = useState<QuizStep>("businessType");
  const [businessType, setBusinessType] = useState<string | null>(null);
  const [stage, setStage]               = useState<string | null>(null);
  const [projectName, setProjectName] = useState("");
  const [email, setEmail]               = useState("");
  const [emailError, setEmailError]     = useState("");

  const color = STEP_COLORS[quizStep];
  const stepNum = quizStep === "businessType" ? 1 : quizStep === "stage" ? 2 : quizStep === "projectName" ? 3 : quizStep === "email" ? 4 : 4;

  async function saveAndRedirect(emailVal: string) {
    const answers = {
      businessType: businessType!,
      stage:        stage!,
      projectName:  projectName.trim() || "My New Business",
      email:        emailVal.trim(),
      completedAt:  new Date().toISOString(),
    };
    localStorage.setItem("launchadvisor_quiz", JSON.stringify(answers));
    if (projectName.trim()) {
      localStorage.setItem("launchadvisor_project_name", projectName.trim());
    }
    if (emailVal.trim()) {
      localStorage.setItem("launchadvisor_email", emailVal.trim());
      localStorage.setItem("launchadvisor_email_prompted", "true");
    }
    setQuizStep("loading");

    // Write Cloud context
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
       const { data: newWs } = await supabase.from("workspaces").insert({
           user_id: user.id,
           project_name: answers.projectName,
           business_type: answers.businessType,
           stage: answers.stage
       }).select().single();
       if (newWs) {
         localStorage.setItem("launchadvisor_active_workspace", newWs.id);
         // Erase existing local progress when starting a new workspace context
         localStorage.removeItem("launchadvisor_progress");
       }
    }

    setTimeout(() => router.push("/checklist"), 1500);
  }

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    const val = email.trim();
    if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setEmailError("Enter a valid email address.");
      return;
    }
    saveAndRedirect(val);
  }

  // ── Loading screen ────────────────────────────────────────
  if (quizStep === "loading") {
    return (
      <div style={{ minHeight: "100vh", background: "var(--navy)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "20px 20px", pointerEvents: "none" }} />
        <div style={{ position: "relative", textAlign: "center", maxWidth: 480 }}>
          <div style={{ width: 64, height: 64, background: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <Rocket style={{ width: 32, height: 32, color: "white" }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "3rem", letterSpacing: "0.04em", color: "white", marginBottom: 12 }}>
            BUILDING<br />YOUR PLAN
          </h2>
          <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", marginBottom: 32 }}>
            Personalizing your checklist and guides...
          </p>
          <div style={{ height: 6, background: "rgba(255,255,255,0.1)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.15)" }}>
            <div style={{ height: "100%", background: "var(--orange)", animation: "progressGrow 2s cubic-bezier(0.4,0,0.2,1) forwards" }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--navy)", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "20px 20px", pointerEvents: "none" }} />

      {/* Header */}
      <div style={{ position: "relative", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", letterSpacing: "0.05em", color: "white" }}>
          LAUNCH<span style={{ color: "var(--orange)" }}>ADVISOR</span>
        </span>
        {/* Step dots */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {(["businessType", "stage", "projectName", "email"] as QuizStep[]).map((s, i) => (
            <div key={s} style={{
              width: s === quizStep ? 24 : 8,
              height: 8,
              background: i < stepNum - 1 ? "var(--orange)" : s === quizStep ? "var(--orange)" : "rgba(255,255,255,0.2)",
              transition: "all 0.3s ease",
            }} />
          ))}
        </div>
      </div>

      {/* Question area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 24px", position: "relative" }}>
        <div style={{ width: "100%", maxWidth: 640 }}>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ height: 2, width: 32, background: color }} />
            <span style={{ fontFamily: "var(--font-display)", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
              Step {stepNum} of 4
            </span>
          </div>

          {/* ── STEP 1: Business type ───────────────────────── */}
          {quizStep === "businessType" && (
            <>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "0.02em", color: "white", lineHeight: 1.05, marginBottom: 10 }}>
                What kind of business?
              </h1>
              <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.45)", fontSize: "0.95rem", marginBottom: 28 }}>
                We'll show guides, tools, and tips that actually fit your model.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 28, maxHeight: 360, overflowY: "auto", paddingRight: 4 }}>
                {BUSINESS_CATEGORIES.map((opt) => {
                  const isSelected = businessType === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => setBusinessType(opt.value)}
                      style={{
                        padding: "14px 16px", border: `2px solid ${isSelected ? color : "rgba(255,255,255,0.15)"}`,
                        background: isSelected ? `${color}22` : "rgba(255,255,255,0.04)",
                        cursor: "pointer", textAlign: "left", transition: "all 0.15s ease",
                        boxShadow: isSelected ? `4px 4px 0 ${color}` : "none",
                        transform: isSelected ? "translate(-2px, -2px)" : "none",
                      }}
                    >
                      <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.88rem", fontWeight: 700, color: isSelected ? "white" : "rgba(255,255,255,0.8)", marginBottom: 3 }}>{opt.label}</p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: isSelected ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.35)", lineHeight: 1.4 }}>{opt.desc}</p>
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => { if (businessType) setQuizStep("stage"); }}
                disabled={!businessType}
                className="btn btn-primary"
                style={{ width: "100%", fontSize: "0.85rem", padding: "14px 24px", opacity: businessType ? 1 : 0.4, cursor: businessType ? "pointer" : "not-allowed", justifyContent: "center" }}
              >
                Next <ArrowRight style={{ width: 16, height: 16 }} />
              </button>
            </>
          )}

          {/* ── STEP 2: Stage ───────────────────────────────── */}
          {quizStep === "stage" && (
            <>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "0.02em", color: "white", lineHeight: 1.05, marginBottom: 10 }}>
                Where are you right now?
              </h1>
              <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.45)", fontSize: "0.95rem", marginBottom: 28 }}>
                We'll focus on what's most relevant for where you are.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 28 }}>
                {STAGE_OPTIONS.map((opt) => {
                  const isSelected = stage === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => setStage(opt.value)}
                      style={{
                        padding: "16px 16px", border: `2px solid ${isSelected ? color : "rgba(255,255,255,0.15)"}`,
                        background: isSelected ? `${color}22` : "rgba(255,255,255,0.04)",
                        cursor: "pointer", textAlign: "left", transition: "all 0.15s ease",
                        boxShadow: isSelected ? `4px 4px 0 ${color}` : "none",
                        transform: isSelected ? "translate(-2px, -2px)" : "none",
                      }}
                    >
                      <p style={{ fontFamily: "var(--font-heading)", fontSize: "0.9rem", fontWeight: 700, color: isSelected ? "white" : "rgba(255,255,255,0.8)", marginBottom: 4 }}>{opt.label}</p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.74rem", color: isSelected ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.35)", lineHeight: 1.4 }}>{opt.desc}</p>
                    </button>
                  );
                })}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => setQuizStep("businessType")}
                  style={{ padding: "14px 20px", border: "2px solid rgba(255,255,255,0.2)", background: "transparent", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontFamily: "var(--font-heading)", fontSize: "0.8rem", fontWeight: 600 }}
                >
                  ← Back
                </button>
                <button
                  onClick={() => { if (stage) setQuizStep("projectName"); }}
                  disabled={!stage}
                  className="btn btn-primary"
                  style={{ flex: 1, fontSize: "0.85rem", padding: "14px 24px", opacity: stage ? 1 : 0.4, cursor: stage ? "pointer" : "not-allowed", justifyContent: "center" }}
                >
                  Next <ArrowRight style={{ width: 16, height: 16 }} />
                </button>
              </div>
            </>
          )}

          {/* ── STEP 3: Project Name ──────────────────────── */}
          {quizStep === "projectName" && (
            <>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "0.02em", color: "white", lineHeight: 1.05, marginBottom: 10 }}>
                What are you calling it?
              </h1>
              <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.45)", fontSize: "0.95rem", marginBottom: 28 }}>
                You can change this later. It just helps us personalize your workspace.
              </p>
              <form onSubmit={(e) => { e.preventDefault(); if (projectName.trim()) setQuizStep("email"); }} style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                <input
                  type="text"
                  placeholder="Acme Corp, My Project..."
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  autoFocus
                  style={{
                    width: "100%", padding: "16px 18px",
                    background: "rgba(255,255,255,0.06)",
                    border: "2px solid rgba(255,255,255,0.2)",
                    color: "white", fontFamily: "var(--font-body)", fontSize: "1rem",
                    outline: "none",
                  }}
                />
                <button type="submit" disabled={!projectName.trim()} className="btn btn-primary" style={{ fontSize: "0.85rem", padding: "14px 24px", opacity: projectName.trim() ? 1 : 0.4, cursor: projectName.trim() ? "pointer" : "not-allowed", justifyContent: "center" }}>
                  Next <ArrowRight style={{ width: 16, height: 16 }} />
                </button>
              </form>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => setQuizStep("stage")}
                  style={{ padding: "10px 18px", border: "2px solid rgba(255,255,255,0.15)", background: "transparent", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontFamily: "var(--font-heading)", fontSize: "0.78rem", fontWeight: 600 }}
                >
                  ← Back
                </button>
              </div>
            </>
          )}

          {/* ── STEP 3: Email ───────────────────────────────── */}
          {quizStep === "email" && (
            <>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "0.02em", color: "white", lineHeight: 1.05, marginBottom: 10 }}>
                Save your plan
              </h1>
              <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.45)", fontSize: "0.95rem", marginBottom: 28 }}>
                Enter your email and we'll save your progress so you don't lose it. No spam, ever.
              </p>
              <form onSubmit={handleEmailSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                  autoFocus
                  style={{
                    width: "100%", padding: "16px 18px",
                    background: "rgba(255,255,255,0.06)",
                    border: emailError ? "2px solid #EF4444" : "2px solid rgba(255,255,255,0.2)",
                    color: "white", fontFamily: "var(--font-body)", fontSize: "1rem",
                    outline: "none",
                  }}
                />
                {emailError && (
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "#EF4444" }}>{emailError}</p>
                )}
                <button type="submit" className="btn btn-primary" style={{ fontSize: "0.85rem", padding: "14px 24px", justifyContent: "center" }}>
                  Build my checklist <ArrowRight style={{ width: 16, height: 16 }} />
                </button>
              </form>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => setQuizStep("projectName")}
                  style={{ padding: "10px 18px", border: "2px solid rgba(255,255,255,0.15)", background: "transparent", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontFamily: "var(--font-heading)", fontSize: "0.78rem", fontWeight: 600 }}
                >
                  ← Back
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

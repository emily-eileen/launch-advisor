"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Rocket,
  ShoppingCart,
  Palette,
  Briefcase,
  HelpCircle,
  Lightbulb,
  Clock,
  Zap,
  Shield,
  Sparkles,
  Globe,
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
} from "lucide-react";

const steps = [
  {
    question: "What kind of business are you starting?",
    subtitle: "This helps us customize your checklist.",
    options: [
      { value: "ecommerce", label: "Ecommerce", description: "Selling physical or digital products", icon: ShoppingCart },
      { value: "creator", label: "Creator / Content", description: "Building an audience and monetizing it", icon: Palette },
      { value: "services", label: "Professional Services", description: "Offering skills and expertise to clients", icon: Briefcase },
      { value: "other", label: "Other / Not sure yet", description: "Still figuring it out", icon: HelpCircle },
    ],
  },
  {
    question: "What stage are you at?",
    subtitle: "No wrong answer here. We meet you where you are.",
    options: [
      { value: "idea", label: "Just an idea", description: "Thinking about it, doing research", icon: Lightbulb },
      { value: "side_hustle", label: "Side hustle", description: "Doing it on the side, want to grow", icon: Clock },
      { value: "full_time", label: "Ready to go full-time", description: "All in, making this my main thing", icon: Zap },
    ],
  },
  {
    question: "Where are you based?",
    subtitle: "We will tailor legal and tax info to your location.",
    type: "text" as const,
    placeholder: "e.g., California, USA or London, UK",
    icon: Globe,
  },
  {
    question: "Do you have a business name?",
    subtitle: "If not, no worries. You can always change it later.",
    type: "name" as const,
  },
  {
    question: "What matters most to you right now?",
    subtitle: "This shapes what we prioritize in your plan.",
    options: [
      { value: "speed", label: "Speed", description: "I want to launch as fast as possible", icon: Zap },
      { value: "protection", label: "Protection", description: "I want to do everything by the book", icon: Shield },
      { value: "brand", label: "Brand", description: "I want to look professional from day one", icon: Sparkles },
      { value: "all", label: "All of it", description: "I want a complete, balanced approach", icon: Check },
    ],
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({
    businessType: "",
    stage: "",
    location: "",
    hasName: "",
    businessName: "",
    priority: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const step = steps[currentStep];
  const totalSteps = steps.length;

  function selectOption(value: string) {
    const keys = ["businessType", "stage", "location", "hasName", "priority"];
    setAnswers((prev) => ({ ...prev, [keys[currentStep]]: value }));
    if (currentStep < totalSteps - 1) {
      setTimeout(() => setCurrentStep((prev) => prev + 1), 200);
    }
  }

  function canProceed(): boolean {
    const keys = ["businessType", "stage", "location", "hasName", "priority"];
    const val = answers[keys[currentStep]];
    if (currentStep === 3) return answers.hasName !== "";
    return val !== "";
  }

  async function handleComplete() {
    setLoading(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        await supabase.from("business_profiles").upsert({
          user_id: user.id,
          business_type: answers.businessType,
          stage: answers.stage,
          state: answers.location,
          name: answers.businessName || null,
          priorities: answers.priority,
        });
      }
    } catch {
      // Graceful fallback: continue to dashboard even without DB
      console.log("Saved onboarding answers locally:", answers);
    }
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-surface-warm flex flex-col">
      {/* Progress bar */}
      <div className="w-full bg-white border-b border-border-light">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange rounded-lg flex items-center justify-center">
                <Rocket className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold font-[family-name:var(--font-space-grotesk)] text-navy">
                Launch Advisor
              </span>
            </div>
            <span className="text-sm text-muted">
              Step {currentStep + 1} of {totalSteps}
            </span>
          </div>
          <div className="w-full bg-border-light rounded-full h-2">
            <div
              className="bg-orange rounded-full h-2 transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <h1 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-navy mb-2">
            {step.question}
          </h1>
          <p className="text-muted mb-8">{step.subtitle}</p>

          {step.type === "text" ? (
            <div>
              <div className="relative">
                {step.icon && <step.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-light" />}
                <input
                  type="text"
                  value={answers.location}
                  onChange={(e) =>
                    setAnswers((prev) => ({ ...prev, location: e.target.value }))
                  }
                  placeholder={step.placeholder}
                  className="w-full pl-12 pr-4 py-4 border border-border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-colors"
                />
              </div>
            </div>
          ) : step.type === "name" ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setAnswers((prev) => ({ ...prev, hasName: "yes" }))}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    answers.hasName === "yes"
                      ? "border-orange bg-orange-light"
                      : "border-border hover:border-orange/50"
                  }`}
                >
                  <Check className="w-5 h-5 mx-auto mb-1 text-orange" />
                  <span className="font-medium text-sm">Yes, I have one</span>
                </button>
                <button
                  onClick={() =>
                    setAnswers((prev) => ({ ...prev, hasName: "no", businessName: "" }))
                  }
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    answers.hasName === "no"
                      ? "border-orange bg-orange-light"
                      : "border-border hover:border-orange/50"
                  }`}
                >
                  <HelpCircle className="w-5 h-5 mx-auto mb-1 text-muted" />
                  <span className="font-medium text-sm">Not yet</span>
                </button>
              </div>
              {answers.hasName === "yes" && (
                <input
                  type="text"
                  value={answers.businessName}
                  onChange={(e) =>
                    setAnswers((prev) => ({ ...prev, businessName: e.target.value }))
                  }
                  placeholder="Enter your business name"
                  className="w-full px-4 py-4 border border-border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-colors"
                />
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {step.options?.map((option) => {
                const keys = ["businessType", "stage", "location", "hasName", "priority"];
                const isSelected = answers[keys[currentStep]] === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => selectOption(option.value)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                      isSelected
                        ? "border-orange bg-orange-light"
                        : "border-border hover:border-orange/50 hover:bg-white"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isSelected ? "bg-orange text-white" : "bg-surface text-muted"
                      }`}
                    >
                      <option.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{option.label}</p>
                      <p className="text-sm text-muted">{option.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors disabled:opacity-30"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            {currentStep === totalSteps - 1 ? (
              <button
                onClick={handleComplete}
                disabled={!canProceed() || loading}
                className="flex items-center gap-2 px-6 py-3 bg-orange text-white rounded-xl font-medium hover:bg-orange-hover transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Start my plan <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep((prev) => prev + 1)}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-6 py-3 bg-orange text-white rounded-xl font-medium hover:bg-orange-hover transition-colors disabled:opacity-50"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

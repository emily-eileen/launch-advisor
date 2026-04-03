import Link from "next/link";
import {
  Rocket,
  CheckCircle2,
  BookOpen,
  Lightbulb,
  FileText,
  DollarSign,
  Palette,
  Shield,
  Zap,
  ArrowRight,
  Star,
  Library,
} from "lucide-react";

const valueProps = [
  {
    icon: CheckCircle2,
    title: "Step-by-step checklist",
    description:
      "30 clear steps across 6 phases. No guessing, no overwhelm. Just the next thing to do.",
  },
  {
    icon: BookOpen,
    title: "Launch journal",
    description:
      "Record decisions, track progress, and reflect on your journey. Your future self will thank you.",
  },
  {
    icon: Library,
    title: "Curated resources",
    description:
      "Vetted tools and services for every step. We only recommend what we trust.",
  },
];

const phaseSteps = [
  { icon: Lightbulb, name: "Decide", description: "Clarify your idea and validate it" },
  { icon: FileText, name: "Form", description: "Make it legal and official" },
  { icon: DollarSign, name: "Money", description: "Set up banking and accounting" },
  { icon: Palette, name: "Brand", description: "Logo, website, and online presence" },
  { icon: Shield, name: "Protect", description: "Insurance, contracts, and compliance" },
  { icon: Rocket, name: "Launch", description: "Go live and get your first customer" },
];

const testimonials = [
  {
    quote: "I spent weeks Googling how to start my LLC. Launch Advisor laid it all out in 30 minutes.",
    name: "Sarah K.",
    role: "Freelance Designer",
  },
  {
    quote: "The journal feature was unexpected but became my favorite part. I can see how far I have come.",
    name: "Marcus T.",
    role: "Online Coach",
  },
  {
    quote: "Finally, a tool that does not try to sell me on expensive courses. Just practical, clear steps.",
    name: "Priya R.",
    role: "Ecommerce Founder",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-border-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-orange rounded-xl flex items-center justify-center">
              <Rocket className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-lg font-bold font-[family-name:var(--font-space-grotesk)] text-navy">
              Launch Advisor
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-muted hover:text-foreground transition-colors hidden sm:block"
            >
              Sign In
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 bg-orange text-white text-sm font-medium rounded-xl hover:bg-orange-hover transition-colors"
            >
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 sm:pt-36 sm:pb-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-light text-orange text-sm font-medium rounded-full mb-6">
            <Zap className="w-3.5 h-3.5" />
            Free to start. No credit card required.
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-space-grotesk)] text-navy leading-tight">
            Your launch,{" "}
            <span className="text-orange">made easy.</span>
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            Stop Googling. Start your free step-by-step launch plan. Launch Advisor walks you through
            every step of starting your business, from idea to first customer.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-3.5 bg-orange text-white font-medium rounded-xl hover:bg-orange-hover transition-colors flex items-center justify-center gap-2 text-base"
            >
              Start your launch plan <ArrowRight className="w-4.5 h-4.5" />
            </Link>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-8 py-3.5 bg-surface text-foreground font-medium rounded-xl hover:bg-border-light transition-colors text-center text-base"
            >
              See how it works
            </a>
          </div>
          <p className="mt-4 text-sm text-muted-light">
            Trusted by 1,000+ first-time founders
          </p>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 sm:py-20 bg-surface px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map((prop, idx) => (
              <div key={idx} className="text-center">
                <div className="w-14 h-14 bg-orange-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <prop.icon className="w-6 h-6 text-orange" />
                </div>
                <h3 className="text-lg font-semibold font-[family-name:var(--font-space-grotesk)] text-navy mb-2">
                  {prop.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works / 6 Phases */}
      <section id="how-it-works" className="py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-[family-name:var(--font-space-grotesk)] text-navy mb-3">
              6 phases. 30 steps. One clear path.
            </h2>
            <p className="text-muted text-lg max-w-xl mx-auto">
              We break starting a business into manageable phases so you always know what to do next.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {phaseSteps.map((phase, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-border-light p-5 hover:border-orange/20 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-light rounded-lg flex items-center justify-center">
                    <phase.icon className="w-5 h-5 text-orange" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-light font-medium">Phase {idx + 1}</span>
                    <h3 className="text-base font-semibold font-[family-name:var(--font-space-grotesk)] text-navy -mt-0.5">
                      {phase.name}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-muted">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 sm:py-20 bg-surface-warm px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-[family-name:var(--font-space-grotesk)] text-navy mb-3">
              Founders love Launch Advisor
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-border-light p-6"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-orange fill-orange"
                    />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-medium text-navy">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-orange rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-space-grotesk)] text-navy mb-4">
            Ready to launch?
          </h2>
          <p className="text-lg text-muted mb-8 max-w-lg mx-auto">
            Start your free launch journal and checklist today. No credit card, no commitment, no
            overwhelm.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-orange text-white font-medium rounded-xl hover:bg-orange-hover transition-colors text-base"
          >
            Start your launch journal (free) <ArrowRight className="w-4.5 h-4.5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-light py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-orange rounded-lg flex items-center justify-center">
                <Rocket className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-semibold font-[family-name:var(--font-space-grotesk)] text-navy">
                Launch Advisor
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted">
              <a href="#" className="hover:text-foreground transition-colors">
                About
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
            <p className="text-xs text-muted-light">
              &copy; 2026 Launch Advisor. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

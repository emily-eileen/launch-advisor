"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { User, Mail, Building, LogOut, Loader2 } from "lucide-react";

export default function SettingsPage() {
  const [user, setUser] = useState<{ email?: string; id?: string } | null>(null);
  const [profile, setProfile] = useState<{
    businessType?: string;
    stage?: string;
    location?: string;
    businessName?: string;
    priorities?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          setUser({ email: user.email, id: user.id });
          const { data } = await supabase
            .from("business_profiles")
            .select("*")
            .eq("user_id", user.id)
            .single();
          if (data) {
            setProfile({
              businessType: data.business_type,
              stage: data.stage,
              location: data.state,
              businessName: data.name,
              priorities: data.priorities,
            });
          }
        }
      } catch {
        // Graceful fallback
        setUser({ email: "dev@launchadvisor.com", id: "mock-user" });
        setProfile({
          businessType: "services",
          stage: "full_time",
          location: "California, USA",
          businessName: "My Business",
          priorities: "all",
        });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleSignOut() {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-orange" />
      </div>
    );
  }

  const formatLabel = (value?: string) => {
    if (!value) return "Not set";
    return value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, " ");
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-navy">
          Settings
        </h1>
        <p className="text-muted mt-1">Manage your account and business profile.</p>
      </div>

      {/* Account info */}
      <div className="bg-white rounded-2xl border border-border-light p-6">
        <h2 className="text-base font-semibold font-[family-name:var(--font-space-grotesk)] text-navy mb-4 flex items-center gap-2">
          <User className="w-4.5 h-4.5 text-muted" />
          Account
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-muted-light" />
            <div>
              <p className="text-xs text-muted">Email</p>
              <p className="text-sm font-medium text-foreground">{user?.email || "Not set"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Business profile */}
      <div className="bg-white rounded-2xl border border-border-light p-6">
        <h2 className="text-base font-semibold font-[family-name:var(--font-space-grotesk)] text-navy mb-4 flex items-center gap-2">
          <Building className="w-4.5 h-4.5 text-muted" />
          Business Profile
        </h2>
        {profile ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted mb-0.5">Business Name</p>
              <p className="text-sm font-medium text-foreground">
                {profile.businessName || "Not set"}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted mb-0.5">Business Type</p>
              <p className="text-sm font-medium text-foreground">
                {formatLabel(profile.businessType)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted mb-0.5">Stage</p>
              <p className="text-sm font-medium text-foreground">
                {formatLabel(profile.stage)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted mb-0.5">Location</p>
              <p className="text-sm font-medium text-foreground">
                {profile.location || "Not set"}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted mb-0.5">Priority</p>
              <p className="text-sm font-medium text-foreground">
                {formatLabel(profile.priorities)}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted">
            No business profile yet.{" "}
            <a href="/onboarding" className="text-orange font-medium hover:underline">
              Complete onboarding
            </a>
          </p>
        )}
      </div>

      {/* Sign out */}
      <div className="bg-white rounded-2xl border border-border-light p-6">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign out of Launch Advisor
        </button>
      </div>
    </div>
  );
}

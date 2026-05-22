import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { OnboardingClient } from "./onboarding-client"

export default async function OnboardingPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("id")
      .eq("id", user.id)
      .maybeSingle()

    if (profile) {
      redirect("/dashboard")
    }
  }

  return (
    <OnboardingClient
      existingSession={user ? { id: user.id, email: user.email ?? "" } : null}
    />
  )
}

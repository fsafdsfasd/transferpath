/** Shape needed to compute a stable remount key for settings; safe to import from Server Components. */
export type SettingsProfileRemountInput = {
  full_name: string | null
  current_university_id: string | null
  target_university_id: string | null
  target_major: string | null
  field_of_study: string | null
  expected_transfer_term: string | null
  gpa: number | null
  credits_completed: number | null
  notify_deadline_reminders: boolean
  notify_product_updates: boolean
  prefer_compact_dashboard: boolean
}

/** Remount `SettingsClient` when server profile changes after `router.refresh()` so form state matches DB. */
export function settingsProfileRemountKey(profile: SettingsProfileRemountInput | null): string {
  if (!profile) return "no-profile"
  return [
    profile.full_name ?? "",
    profile.current_university_id ?? "",
    profile.target_university_id ?? "",
    profile.target_major ?? "",
    profile.field_of_study ?? "",
    profile.expected_transfer_term ?? "",
    profile.gpa ?? "",
    profile.credits_completed ?? "",
    profile.notify_deadline_reminders ? "1" : "0",
    profile.notify_product_updates ? "1" : "0",
    profile.prefer_compact_dashboard ? "1" : "0",
  ].join("\x1e")
}

-- User preference flags on profile (single table; existing RLS update-own-row still applies).

ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS notify_deadline_reminders boolean DEFAULT true;

ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS notify_product_updates boolean DEFAULT false;

ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS prefer_compact_dashboard boolean DEFAULT false;

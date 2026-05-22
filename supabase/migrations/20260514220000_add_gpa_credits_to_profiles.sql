ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS gpa numeric(3,2),
  ADD COLUMN IF NOT EXISTS credits_completed integer;

ALTER TABLE public.user_courses
  ADD COLUMN IF NOT EXISTS semester_taken text;

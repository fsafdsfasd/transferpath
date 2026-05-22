-- Finite field-of-study bucket for track-aware planning (onboarding + settings).
-- NULL allowed for legacy rows; app defaults reads to `other` where needed.

ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS field_of_study text;

ALTER TABLE public.user_profiles DROP CONSTRAINT IF EXISTS user_profiles_field_of_study_check;

ALTER TABLE public.user_profiles ADD CONSTRAINT user_profiles_field_of_study_check CHECK (
  field_of_study IS NULL
  OR field_of_study IN (
    'stem_engineering',
    'stem_non_engineering',
    'business',
    'liberal_arts',
    'health',
    'other'
  )
);

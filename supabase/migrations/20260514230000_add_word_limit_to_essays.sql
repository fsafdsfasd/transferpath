ALTER TABLE public.user_essays
  ADD COLUMN IF NOT EXISTS word_limit integer;

ALTER TABLE public.user_essays
  ADD CONSTRAINT user_essays_user_id_prompt_type_key UNIQUE (user_id, prompt_type);

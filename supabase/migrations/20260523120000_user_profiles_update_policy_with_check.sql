-- Ensure UPDATE uses both USING and WITH CHECK so row updates are fully constrained to own id.

DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;

CREATE POLICY "Users can update their own profile"
  ON public.user_profiles
  AS PERMISSIVE
  FOR UPDATE
  TO public
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

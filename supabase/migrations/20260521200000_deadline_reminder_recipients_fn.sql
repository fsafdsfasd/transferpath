-- Recipients for weekly deadline reminder emails (service_role RPC only).
--
-- Opt-in rule (must stay aligned with app): coalesce(notify_deadline_reminders, true).
-- NULL in notify_deadline_reminders means ON; only explicit FALSE opts out.

CREATE OR REPLACE FUNCTION public.deadline_reminder_recipients()
RETURNS TABLE (
  user_id uuid,
  email text,
  target_university_id uuid
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT
    p.id AS user_id,
    u.email::text AS email,
    p.target_university_id
  FROM public.user_profiles p
  INNER JOIN auth.users u ON u.id = p.id
  WHERE coalesce(p.notify_deadline_reminders, true) = true
    AND u.email IS NOT NULL
    AND btrim(u.email) <> '';
$$;

COMMENT ON FUNCTION public.deadline_reminder_recipients() IS
  'Weekly deadline emails: users opted in (coalesce(notify_deadline_reminders, true)) with auth email. Callable only by service_role.';

REVOKE ALL ON FUNCTION public.deadline_reminder_recipients() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.deadline_reminder_recipients() FROM anon;
REVOKE ALL ON FUNCTION public.deadline_reminder_recipients() FROM authenticated;
GRANT EXECUTE ON FUNCTION public.deadline_reminder_recipients() TO service_role;

-- Align checklist task_key with planner credit target (was reach_60_credits).

UPDATE public.user_checklist_items
SET task_key = 'reach_30_credits'
WHERE task_key = 'reach_60_credits';

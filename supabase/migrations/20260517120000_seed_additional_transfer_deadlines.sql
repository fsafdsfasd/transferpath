-- Additional illustrative transfer milestones — planning only; verify on each school\u2019s official calendar.
-- Idempotent: NOT EXISTS on (university_id, title, due_date).
--
-- Adds: University of Texas at Dallas, Rice University, Southern Methodist University, Texas Christian University,
-- plus an earlier UT Austin planning row so school-specific \u201cnext deadline\u201d is meaningful after ApplyTexas opens.

-- Earlier UT Austin planning milestone (school-specific; does not replace global ApplyTexas for users with no school rows yet)
INSERT INTO public.deadlines (university_id, title, description, due_date, category, academic_term, academic_year)
SELECT u.id, v.title, v.description, v.due_date::date, v.category, v.academic_term, v.academic_year
FROM public.universities u
CROSS JOIN (VALUES
  ('Transfer application preparation checkpoint', 'Review UT Austin external transfer requirements — confirm on utexas.edu.', '2026-09-15'::text, 'application'::text, 'Fall'::text, 2027::integer)
) AS v(title, description, due_date, category, academic_term, academic_year)
WHERE u.name = 'The University of Texas at Austin'
  AND NOT EXISTS (
    SELECT 1 FROM public.deadlines d
    WHERE d.university_id = u.id
      AND d.title = v.title
      AND d.due_date = v.due_date::date
  );

-- University of Texas at Dallas
INSERT INTO public.deadlines (university_id, title, description, due_date, category, academic_term, academic_year)
SELECT u.id, v.title, v.description, v.due_date::date, v.category, v.academic_term, v.academic_year
FROM public.universities u
CROSS JOIN (VALUES
  ('Priority transfer deadline', 'Earlier submission for competitive programs — verify with UT Dallas Admissions.', '2027-03-01'::text, 'application'::text, 'Fall'::text, 2027::integer),
  ('Transfer application deadline', 'Illustrative fall transfer deadline — confirm utdallas.edu.', '2027-05-15'::text, 'application'::text, 'Fall'::text, 2027::integer),
  ('Financial aid priority deadline', 'Institutional scholarships / aid — confirm with UT Dallas.', '2027-04-01'::text, 'financial_aid'::text, 'Fall'::text, 2027::integer)
) AS v(title, description, due_date, category, academic_term, academic_year)
WHERE u.name = 'University of Texas at Dallas'
  AND NOT EXISTS (
    SELECT 1 FROM public.deadlines d
    WHERE d.university_id = u.id
      AND d.title = v.title
      AND d.due_date = v.due_date::date
  );

-- Rice University
INSERT INTO public.deadlines (university_id, title, description, due_date, category, academic_term, academic_year)
SELECT u.id, v.title, v.description, v.due_date::date, v.category, v.academic_term, v.academic_year
FROM public.universities u
CROSS JOIN (VALUES
  ('Early transfer deadline', 'Earlier review for selective programs — verify admission.rice.edu.', '2027-02-01'::text, 'application'::text, 'Fall'::text, 2027::integer),
  ('Transfer application deadline', 'Illustrative regular deadline — confirm Rice transfer pages.', '2027-04-15'::text, 'application'::text, 'Fall'::text, 2027::integer),
  ('Housing application timeline', 'On-campus housing — confirm with Rice Housing.', '2027-05-01'::text, 'housing'::text, 'Fall'::text, 2027::integer)
) AS v(title, description, due_date, category, academic_term, academic_year)
WHERE u.name = 'Rice University'
  AND NOT EXISTS (
    SELECT 1 FROM public.deadlines d
    WHERE d.university_id = u.id
      AND d.title = v.title
      AND d.due_date = v.due_date::date
  );

-- Southern Methodist University
INSERT INTO public.deadlines (university_id, title, description, due_date, category, academic_term, academic_year)
SELECT u.id, v.title, v.description, v.due_date::date, v.category, v.academic_term, v.academic_year
FROM public.universities u
CROSS JOIN (VALUES
  ('Priority transfer deadline', 'Earlier submission encouraged — verify SMU Undergraduate Admission.', '2027-01-20'::text, 'application'::text, 'Fall'::text, 2027::integer),
  ('Transfer application deadline', 'Illustrative fall deadline — confirm smu.edu.', '2027-06-01'::text, 'application'::text, 'Fall'::text, 2027::integer),
  ('Orientation / registration', 'New student orientation — confirm with SMU.', '2027-07-15'::text, 'registration'::text, 'Fall'::text, 2027::integer)
) AS v(title, description, due_date, category, academic_term, academic_year)
WHERE u.name = 'Southern Methodist University'
  AND NOT EXISTS (
    SELECT 1 FROM public.deadlines d
    WHERE d.university_id = u.id
      AND d.title = v.title
      AND d.due_date = v.due_date::date
  );

-- Texas Christian University
INSERT INTO public.deadlines (university_id, title, description, due_date, category, academic_term, academic_year)
SELECT u.id, v.title, v.description, v.due_date::date, v.category, v.academic_term, v.academic_year
FROM public.universities u
CROSS JOIN (VALUES
  ('Early transfer deadline', 'Scholarship consideration timeline — verify TCU Admission.', '2026-11-01'::text, 'application'::text, 'Fall'::text, 2027::integer),
  ('Transfer application deadline', 'Illustrative regular deadline — confirm tcu.edu.', '2027-05-01'::text, 'application'::text, 'Fall'::text, 2027::integer),
  ('Financial aid priority deadline', 'Institutional aid planning — confirm TCU.', '2027-03-01'::text, 'financial_aid'::text, 'Fall'::text, 2027::integer)
) AS v(title, description, due_date, category, academic_term, academic_year)
WHERE u.name = 'Texas Christian University'
  AND NOT EXISTS (
    SELECT 1 FROM public.deadlines d
    WHERE d.university_id = u.id
      AND d.title = v.title
      AND d.due_date = v.due_date::date
  );

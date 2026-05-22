-- Transfer-oriented milestone rows for key Texas destinations + ApplyTexas-wide dates.
-- PLANNING DATA ONLY — admins should verify all dates against each institution’s official admissions and aid calendars before relying on them in production.

-- ApplyTexas / statewide (visible when no target school or combined with school-specific rows)
INSERT INTO public.deadlines (university_id, title, description, due_date, category, academic_term, academic_year)
SELECT NULL, v.title, v.description, v.due_date::date, v.category, v.academic_term, v.academic_year
FROM (VALUES
  ('ApplyTexas transfer application opens', 'Typical August opening for the new application cycle — confirm on ApplyTexas.', '2026-08-01'::text, 'application'::text, NULL::text, NULL::integer),
  ('FAFSA / TASFA priority date', 'Use for financial aid planning — confirm federal and institutional deadlines.', '2027-01-15'::text, 'financial_aid'::text, NULL::text, NULL::integer)
) AS v(title, description, due_date, category, academic_term, academic_year)
WHERE NOT EXISTS (
  SELECT 1 FROM public.deadlines d
  WHERE d.university_id IS NULL
    AND d.title = v.title
    AND d.due_date = v.due_date::date
);

-- The University of Texas at Austin
INSERT INTO public.deadlines (university_id, title, description, due_date, category, academic_term, academic_year)
SELECT u.id, v.title, v.description, v.due_date::date, v.category, v.academic_term, v.academic_year
FROM public.universities u
CROSS JOIN (VALUES
  ('Priority transfer deadline', 'Earlier submission may help for capacity-limited programs — verify with UT Admissions.', '2027-12-01'::text, 'application'::text, 'Fall'::text, 2028::integer),
  ('Transfer application deadline', 'Illustrative regular fall transfer deadline — confirm utexas.edu.', '2028-03-01'::text, 'application'::text, 'Fall'::text, 2028::integer),
  ('Transfer scholarship consideration', 'Institutional aid / scholarship awareness date — confirm with UT.', '2028-01-15'::text, 'financial_aid'::text, 'Fall'::text, 2028::integer)
) AS v(title, description, due_date, category, academic_term, academic_year)
WHERE u.name = 'The University of Texas at Austin'
  AND NOT EXISTS (
    SELECT 1 FROM public.deadlines d
    WHERE d.university_id = u.id
      AND d.title = v.title
      AND d.due_date = v.due_date::date
  );

-- Texas A&M University
INSERT INTO public.deadlines (university_id, title, description, due_date, category, academic_term, academic_year)
SELECT u.id, v.title, v.description, v.due_date::date, v.category, v.academic_term, v.academic_year
FROM public.universities u
CROSS JOIN (VALUES
  ('Priority transfer deadline', 'Earlier review for competitive entry — confirm with Texas A&M Admissions.', '2027-11-01'::text, 'application'::text, 'Spring'::text, 2028::integer),
  ('Transfer application deadline', 'Illustrative deadline — confirm admissions.tamu.edu.', '2028-05-01'::text, 'application'::text, 'Fall'::text, 2028::integer),
  ('Housing application opens', 'On-campus housing timeline — confirm with Residence Life.', '2027-12-01'::text, 'housing'::text, 'Fall'::text, 2028::integer)
) AS v(title, description, due_date, category, academic_term, academic_year)
WHERE u.name = 'Texas A&M University'
  AND NOT EXISTS (
    SELECT 1 FROM public.deadlines d
    WHERE d.university_id = u.id
      AND d.title = v.title
      AND d.due_date = v.due_date::date
  );

-- University of Houston
INSERT INTO public.deadlines (university_id, title, description, due_date, category, academic_term, academic_year)
SELECT u.id, v.title, v.description, v.due_date::date, v.category, v.academic_term, v.academic_year
FROM public.universities u
CROSS JOIN (VALUES
  ('Priority transfer deadline', 'Encouraged earlier submission — verify with UH Admissions.', '2027-02-01'::text, 'application'::text, 'Fall'::text, 2027::integer),
  ('Transfer application deadline', 'Illustrative fall transfer deadline — confirm uh.edu.', '2027-04-01'::text, 'application'::text, 'Fall'::text, 2027::integer),
  ('Financial aid priority deadline', 'Institutional aid planning — confirm with UH Scholarships & Financial Aid.', '2027-03-15'::text, 'financial_aid'::text, 'Fall'::text, 2027::integer)
) AS v(title, description, due_date, category, academic_term, academic_year)
WHERE u.name = 'University of Houston'
  AND NOT EXISTS (
    SELECT 1 FROM public.deadlines d
    WHERE d.university_id = u.id
      AND d.title = v.title
      AND d.due_date = v.due_date::date
  );

-- Baylor University
INSERT INTO public.deadlines (university_id, title, description, due_date, category, academic_term, academic_year)
SELECT u.id, v.title, v.description, v.due_date::date, v.category, v.academic_term, v.academic_year
FROM public.universities u
CROSS JOIN (VALUES
  ('Early transfer deadline', 'Earlier submission for scholarship consideration — verify baylor.edu.', '2026-12-15'::text, 'application'::text, 'Fall'::text, 2027::integer),
  ('Regular transfer application deadline', 'Illustrative regular deadline — confirm Baylor transfer pages.', '2027-06-01'::text, 'application'::text, 'Fall'::text, 2027::integer),
  ('Orientation / registration', 'Typical orientation window — confirm with Baylor.', '2027-07-01'::text, 'registration'::text, 'Fall'::text, 2027::integer)
) AS v(title, description, due_date, category, academic_term, academic_year)
WHERE u.name = 'Baylor University'
  AND NOT EXISTS (
    SELECT 1 FROM public.deadlines d
    WHERE d.university_id = u.id
      AND d.title = v.title
      AND d.due_date = v.due_date::date
  );

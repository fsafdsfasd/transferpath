-- Per-deadline link for verifying dates (planning tool — users must confirm on the live site).
ALTER TABLE public.deadlines
  ADD COLUMN IF NOT EXISTS official_info_url text;

COMMENT ON COLUMN public.deadlines.official_info_url IS 'Official or primary source URL to verify this milestone; nullable for legacy rows.';

-- Global milestones
UPDATE public.deadlines d
SET official_info_url = 'https://www.goapplytexas.org/'
WHERE d.university_id IS NULL
  AND d.title = 'ApplyTexas transfer application opens'
  AND d.official_info_url IS NULL;

UPDATE public.deadlines d
SET official_info_url = 'https://studentaid.gov/apply-for-aid/fafsa/filling-out'
WHERE d.university_id IS NULL
  AND d.title = 'FAFSA / TASFA priority date'
  AND d.official_info_url IS NULL;

-- School-specific: one verified landing page per institution (all rows for that school).
UPDATE public.deadlines d
SET official_info_url = 'https://admissions.utexas.edu/apply/transfer'
FROM public.universities u
WHERE d.university_id = u.id
  AND u.name = 'The University of Texas at Austin'
  AND d.official_info_url IS NULL;

UPDATE public.deadlines d
SET official_info_url = 'https://admissions.tamu.edu/apply/transfer'
FROM public.universities u
WHERE d.university_id = u.id
  AND u.name = 'Texas A&M University'
  AND d.official_info_url IS NULL;

UPDATE public.deadlines d
SET official_info_url = 'https://www.uh.edu/undergraduate/admissions/apply/'
FROM public.universities u
WHERE d.university_id = u.id
  AND u.name = 'University of Houston'
  AND d.official_info_url IS NULL;

UPDATE public.deadlines d
SET official_info_url = 'https://www.baylor.edu/admissions/'
FROM public.universities u
WHERE d.university_id = u.id
  AND u.name = 'Baylor University'
  AND d.official_info_url IS NULL;

UPDATE public.deadlines d
SET official_info_url = 'https://www.utd.edu/enroll/transfer/'
FROM public.universities u
WHERE d.university_id = u.id
  AND u.name = 'University of Texas at Dallas'
  AND d.official_info_url IS NULL;

UPDATE public.deadlines d
SET official_info_url = 'https://futureowls.rice.edu/apply'
FROM public.universities u
WHERE d.university_id = u.id
  AND u.name = 'Rice University'
  AND d.official_info_url IS NULL;

UPDATE public.deadlines d
SET official_info_url = 'https://www.smu.edu/Admission/Apply/'
FROM public.universities u
WHERE d.university_id = u.id
  AND u.name = 'Southern Methodist University'
  AND d.official_info_url IS NULL;

UPDATE public.deadlines d
SET official_info_url = 'https://admissions.tcu.edu/apply/'
FROM public.universities u
WHERE d.university_id = u.id
  AND u.name = 'Texas Christian University'
  AND d.official_info_url IS NULL;

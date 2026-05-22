-- School-aware planning copy for Competitiveness / readiness (not admission statistics).

CREATE TABLE IF NOT EXISTS public.university_competitiveness_insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  university_id uuid REFERENCES public.universities (id) ON DELETE CASCADE,
  sort_order integer NOT NULL DEFAULT 0,
  title text NOT NULL,
  body text NOT NULL,
  tone text NOT NULL DEFAULT 'info' CHECK (tone IN ('info', 'success', 'warning')),
  optional_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_university_competitiveness_insights_uni_sort
  ON public.university_competitiveness_insights (university_id, sort_order);

ALTER TABLE public.university_competitiveness_insights ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "university_competitiveness_insights are viewable by everyone"
  ON public.university_competitiveness_insights;

CREATE POLICY "university_competitiveness_insights are viewable by everyone"
  ON public.university_competitiveness_insights
  AS PERMISSIVE
  FOR SELECT
  TO public
  USING (true);

GRANT SELECT ON TABLE public.university_competitiveness_insights TO anon;
GRANT SELECT ON TABLE public.university_competitiveness_insights TO authenticated;
GRANT SELECT ON TABLE public.university_competitiveness_insights TO service_role;

-- Global insights (planning-only; no fabricated admit rates)
INSERT INTO public.university_competitiveness_insights (
  university_id, sort_order, title, body, tone, optional_url
)
SELECT NULL, v.sort_order, v.title, v.body, v.tone::text, v.optional_url
FROM (VALUES
  (0, 'Use official sources for competitiveness', 'Selective programs publish prerequisites, expectations, and timelines on their own sites. Treat this app as a planner — not a substitute for admissions offices.', 'info', NULL::text),
  (1, 'Academic record and consistency', 'Strong term-to-term performance and coherent coursework in your intended field are widely valued in holistic review. Confirm what your target emphasizes on its transfer pages.', 'info', NULL::text),
  (2, 'Prerequisites and major fit', 'Map your credits to the target program early so you can close gaps before deadlines. Cross-check course titles with official articulation or advising resources.', 'info', NULL::text),
  (3, 'Application narrative and materials', 'Essays and recommendations (when required) help explain your path. Draft early and align your story with each school''s prompts — planning only here.', 'info', NULL::text),
  (4, 'Financial aid and deadlines', 'Aid and scholarship windows may differ from general admission. Verify dates on official financial aid pages alongside your application checklist.', 'warning', NULL::text)
) AS v(sort_order, title, body, tone, optional_url)
WHERE NOT EXISTS (
  SELECT 1 FROM public.university_competitiveness_insights x
  WHERE x.university_id IS NULL AND x.title = v.title
);

-- The University of Texas at Austin
INSERT INTO public.university_competitiveness_insights (
  university_id, sort_order, title, body, tone, optional_url
)
SELECT u.id, v.sort_order, v.title, v.body, v.tone::text, v.optional_url
FROM public.universities u
CROSS JOIN (VALUES
  (0, 'External transfer expectations', 'Review UT Austin''s official external transfer materials for your college and intended major — requirements change over time.', 'info', 'https://admissions.utexas.edu/apply/transfer'),
  (1, 'Course depth in your field', 'Competitive applicants often show sustained preparation in disciplines related to their major. Use official degree and department pages to plan.', 'info', 'https://admissions.utexas.edu/'),
  (2, 'Whole application', 'Holistic review considers academics and context. Polish materials and meet published deadlines — confirm every detail on UT sites.', 'warning', NULL::text)
) AS v(sort_order, title, body, tone, optional_url)
WHERE u.name = 'The University of Texas at Austin'
  AND NOT EXISTS (
    SELECT 1 FROM public.university_competitiveness_insights x
    WHERE x.university_id = u.id AND x.title = v.title
  );

-- Texas A&M University
INSERT INTO public.university_competitiveness_insights (
  university_id, sort_order, title, body, tone, optional_url
)
SELECT u.id, v.sort_order, v.title, v.body, v.tone::text, v.optional_url
FROM public.universities u
CROSS JOIN (VALUES
  (0, 'Transfer competitiveness', 'Use Texas A&M''s admissions resources for transfer expectations by entry term and college. Planning copy in-app is illustrative only.', 'info', 'https://admissions.tamu.edu/apply/transfer'),
  (1, 'Major and college fit', 'Some colleges outline recommended preparation; align your transcript with official catalog and advising guidance.', 'info', 'https://admissions.tamu.edu/'),
  (2, 'Deadlines and documents', 'Transcripts and major-specific steps have real cutoffs — verify on official admissions channels.', 'warning', NULL::text)
) AS v(sort_order, title, body, tone, optional_url)
WHERE u.name = 'Texas A&M University'
  AND NOT EXISTS (
    SELECT 1 FROM public.university_competitiveness_insights x
    WHERE x.university_id = u.id AND x.title = v.title
  );

-- University of Houston
INSERT INTO public.university_competitiveness_insights (
  university_id, sort_order, title, body, tone, optional_url
)
SELECT u.id, v.sort_order, v.title, v.body, v.tone::text, v.optional_url
FROM public.universities u
CROSS JOIN (VALUES
  (0, 'UH transfer preparation', 'Check official UH transfer pages for GPA expectations and program notes — not reproduced as statistics here.', 'info', 'https://www.uh.edu/undergraduate/admissions/apply/transfer/'),
  (1, 'College-specific guidance', 'Departments may publish additional expectations; use official UH links rather than informal summaries.', 'info', 'https://www.uh.edu/undergraduate/admissions/'),
  (2, 'Complete materials on time', 'Missing items can stall review. Follow the checklist from UH undergraduate admissions.', 'warning', NULL::text)
) AS v(sort_order, title, body, tone, optional_url)
WHERE u.name = 'University of Houston'
  AND NOT EXISTS (
    SELECT 1 FROM public.university_competitiveness_insights x
    WHERE x.university_id = u.id AND x.title = v.title
  );

-- Baylor University
INSERT INTO public.university_competitiveness_insights (
  university_id, sort_order, title, body, tone, optional_url
)
SELECT u.id, v.sort_order, v.title, v.body, v.tone::text, v.optional_url
FROM public.universities u
CROSS JOIN (VALUES
  (0, 'Baylor transfer context', 'Review Baylor''s admissions pages for faith, community, and academic expectations where applicable — confirm live policies online.', 'info', 'https://www.baylor.edu/admissions/'),
  (1, 'Credit evaluation', 'Understanding how credits apply helps you plan remaining work; use official Baylor resources and advisors.', 'info', NULL::text),
  (2, 'Scholarships and timing', 'Institutional awards may have earlier timelines than general deadlines — verify on official aid pages.', 'warning', NULL::text)
) AS v(sort_order, title, body, tone, optional_url)
WHERE u.name = 'Baylor University'
  AND NOT EXISTS (
    SELECT 1 FROM public.university_competitiveness_insights x
    WHERE x.university_id = u.id AND x.title = v.title
  );

-- University of Texas at Dallas
INSERT INTO public.university_competitiveness_insights (
  university_id, sort_order, title, body, tone, optional_url
)
SELECT u.id, v.sort_order, v.title, v.body, v.tone::text, v.optional_url
FROM public.universities u
CROSS JOIN (VALUES
  (0, 'UT Dallas transfer', 'Use enrollment/transfer pages for official steps and competitiveness-related guidance for your school and major.', 'info', 'https://www.utd.edu/enroll/transfer/'),
  (1, 'STEM and pre-professional paths', 'Some programs emphasize quantitative readiness; confirm recommended sequences on official UT Dallas pages.', 'info', 'https://www.utd.edu/'),
  (2, 'Verify every requirement', 'Do not rely on informal \"typical admit\" lists — use catalog and advising contacts.', 'warning', NULL::text)
) AS v(sort_order, title, body, tone, optional_url)
WHERE u.name = 'University of Texas at Dallas'
  AND NOT EXISTS (
    SELECT 1 FROM public.university_competitiveness_insights x
    WHERE x.university_id = u.id AND x.title = v.title
  );

-- Rice University
INSERT INTO public.university_competitiveness_insights (
  university_id, sort_order, title, body, tone, optional_url
)
SELECT u.id, v.sort_order, v.title, v.body, v.tone::text, v.optional_url
FROM public.universities u
CROSS JOIN (VALUES
  (0, 'Rice transfer competitiveness', 'Selective private review emphasizes fit and preparation. Read Rice''s official transfer instructions end-to-end.', 'info', 'https://futureowls.rice.edu/apply'),
  (1, 'Academic rigor', 'Depth in relevant coursework is often part of a strong file — align with Rice-published guidance only.', 'info', NULL::text),
  (2, 'Aid and cost planning', 'Understand cost and aid through official Rice channels alongside application work.', 'warning', NULL::text)
) AS v(sort_order, title, body, tone, optional_url)
WHERE u.name = 'Rice University'
  AND NOT EXISTS (
    SELECT 1 FROM public.university_competitiveness_insights x
    WHERE x.university_id = u.id AND x.title = v.title
  );

-- Southern Methodist University
INSERT INTO public.university_competitiveness_insights (
  university_id, sort_order, title, body, tone, optional_url
)
SELECT u.id, v.sort_order, v.title, v.body, v.tone::text, v.optional_url
FROM public.universities u
CROSS JOIN (VALUES
  (0, 'SMU transfer review', 'SMU publishes transfer expectations and supplements by program. Follow official admission pages for your pathway.', 'info', 'https://www.smu.edu/Admission/Apply/TransferAdmission'),
  (1, 'Bulletin and degree planning', 'Use SMU academic bulletins and advising to plan credit application — not third-party admit stats.', 'info', 'https://www.smu.edu/Catalogs'),
  (2, 'Meet published deadlines', 'Missed document deadlines can weaken an otherwise strong file — confirm on SMU sites.', 'warning', NULL::text)
) AS v(sort_order, title, body, tone, optional_url)
WHERE u.name = 'Southern Methodist University'
  AND NOT EXISTS (
    SELECT 1 FROM public.university_competitiveness_insights x
    WHERE x.university_id = u.id AND x.title = v.title
  );

-- Texas Christian University
INSERT INTO public.university_competitiveness_insights (
  university_id, sort_order, title, body, tone, optional_url
)
SELECT u.id, v.sort_order, v.title, v.body, v.tone::text, v.optional_url
FROM public.universities u
CROSS JOIN (VALUES
  (0, 'TCU transfer competitiveness', 'Review TCU admissions for transfer eligibility and college-specific notes — planning text here is not binding.', 'info', 'https://admissions.tcu.edu/apply/transfer/'),
  (1, 'Holistic file', 'Academics, activities, and fit may all matter; align your plan with TCU''s published materials only.', 'info', NULL::text),
  (2, 'Scholarship timing', 'Some awards require separate steps or applications — verify on official TCU pages.', 'warning', NULL::text)
) AS v(sort_order, title, body, tone, optional_url)
WHERE u.name = 'Texas Christian University'
  AND NOT EXISTS (
    SELECT 1 FROM public.university_competitiveness_insights x
    WHERE x.university_id = u.id AND x.title = v.title
  );

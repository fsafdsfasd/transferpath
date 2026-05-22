-- Target-school-aware planning notes for Requirements (not a substitute for official catalogs).

CREATE TABLE IF NOT EXISTS public.university_requirement_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  university_id uuid REFERENCES public.universities (id) ON DELETE CASCADE,
  sort_order integer NOT NULL DEFAULT 0,
  title text NOT NULL,
  body text NOT NULL,
  optional_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_university_requirement_notes_uni_sort
  ON public.university_requirement_notes (university_id, sort_order);

ALTER TABLE public.university_requirement_notes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "university_requirement_notes are viewable by everyone" ON public.university_requirement_notes;

CREATE POLICY "university_requirement_notes are viewable by everyone"
  ON public.university_requirement_notes
  AS PERMISSIVE
  FOR SELECT
  TO public
  USING (true);

GRANT SELECT ON TABLE public.university_requirement_notes TO anon;
GRANT SELECT ON TABLE public.university_requirement_notes TO authenticated;
GRANT SELECT ON TABLE public.university_requirement_notes TO service_role;

-- Global notes (university_id NULL): Texas-wide + planning disclaimers
INSERT INTO public.university_requirement_notes (university_id, sort_order, title, body, optional_url)
SELECT NULL, v.sort_order, v.title, v.body, v.optional_url
FROM (VALUES
  (0, 'ApplyTexas and your application', 'Most Texas public universities use ApplyTexas for undergraduate applications. Start early, save drafts often, and confirm each school''s supplement requirements on the live application.', 'https://www.goapplytexas.org/'),
  (1, 'Financial aid awareness', 'FAFSA opens each year for federal aid; TASFA may apply for Texas residents without federal eligibility. Verify deadlines for your target school on official financial aid pages.', 'https://studentaid.gov/'),
  (2, 'Texas Success Initiative (TSI)', 'If you attended Texas public institutions, ensure TSI status is complete or waived before transferring. Confirm with your current and target schools.', 'https://www.highered.texas.gov/our-work/supporting-or-education/texas-success-initiative'),
  (3, 'Always verify on official sources', 'This planner uses illustrative milestones only — confirm GPA, credit minimums, prerequisites, and deadlines directly with each institution.', NULL::text)
) AS v(sort_order, title, body, optional_url)
WHERE NOT EXISTS (
  SELECT 1 FROM public.university_requirement_notes n
  WHERE n.university_id IS NULL AND n.title = v.title
);

-- The University of Texas at Austin
INSERT INTO public.university_requirement_notes (university_id, sort_order, title, body, optional_url)
SELECT u.id, v.sort_order, v.title, v.body, v.optional_url
FROM public.universities u
CROSS JOIN (VALUES
  (0, 'Coordinated Admission Program (CAP)', 'CAP is specific to the UT System. If you are a CAP student at a partner school, understand which UT campus you are guaranteed and what steps are required for your intended major — verify with your advisor and UT.', 'https://admissions.utexas.edu/'),
  (1, 'Transfer credit hours', 'Many competitive majors expect substantial transferable credit. Review UT''s external transfer guides for your college and confirm how your courses map — planning only.', 'https://admissions.utexas.edu/apply/transfer'),
  (2, 'Major-specific requirements', 'Some majors have additional coursework or GPA expectations beyond university minimums. Use official UT degree and department pages for your program.', NULL::text)
) AS v(sort_order, title, body, optional_url)
WHERE u.name = 'The University of Texas at Austin'
  AND NOT EXISTS (
    SELECT 1 FROM public.university_requirement_notes n
    WHERE n.university_id = u.id AND n.title = v.title
  );

-- Texas A&M University
INSERT INTO public.university_requirement_notes (university_id, sort_order, title, body, optional_url)
SELECT u.id, v.sort_order, v.title, v.body, v.optional_url
FROM public.universities u
CROSS JOIN (VALUES
  (0, 'Transfer admission basics', 'Review Texas A&M''s transfer admissions hub for entry terms, document submission, and how coursework is evaluated — confirm all details on the official site.', 'https://admissions.tamu.edu/apply/transfer'),
  (1, 'Major and college requirements', 'Some colleges may publish recommended or required preparatory coursework. Cross-check your intended catalog year on official A&M pages.', 'https://admissions.tamu.edu/academics/majors'),
  (2, 'Engineering Pathways and similar programs', 'If you are following a pathway from a partner college, keep documentation of progress and confirm deadlines with both institutions.', NULL::text)
) AS v(sort_order, title, body, optional_url)
WHERE u.name = 'Texas A&M University'
  AND NOT EXISTS (
    SELECT 1 FROM public.university_requirement_notes n
    WHERE n.university_id = u.id AND n.title = v.title
  );

-- University of Houston
INSERT INTO public.university_requirement_notes (university_id, sort_order, title, body, optional_url)
SELECT u.id, v.sort_order, v.title, v.body, v.optional_url
FROM public.universities u
CROSS JOIN (VALUES
  (0, 'UH transfer overview', 'Use UH''s undergraduate admissions resources for transfer GPAs, deadlines, and document requirements — illustrative only here.', 'https://www.uh.edu/undergraduate/admissions/apply/transfer/'),
  (1, 'College and major expectations', 'Majors may list prerequisites or performance expectations. Confirm on the department and college sites linked from official admissions.', 'https://www.uh.edu/undergraduate/admissions/'),
  (2, 'Scholarship and residency', 'Review scholarship timelines and Texas residency rules on official UH pages if they affect your plan.', NULL::text)
) AS v(sort_order, title, body, optional_url)
WHERE u.name = 'University of Houston'
  AND NOT EXISTS (
    SELECT 1 FROM public.university_requirement_notes n
    WHERE n.university_id = u.id AND n.title = v.title
  );

-- Baylor University
INSERT INTO public.university_requirement_notes (university_id, sort_order, title, body, optional_url)
SELECT u.id, v.sort_order, v.title, v.body, v.optional_url
FROM public.universities u
CROSS JOIN (VALUES
  (0, 'Baylor transfer planning', 'Review Baylor''s admission materials for transfer terms, faith and community expectations if applicable, and required transcripts.', 'https://www.baylor.edu/admissions/'),
  (1, 'Course credit and degree plans', 'Confirm how your credits apply toward your intended Baylor degree using official transfer and advising resources.', 'https://www.baylor.edu/admissions/'),
  (2, 'Scholarship windows', 'Institutional scholarships may have earlier deadlines than general admission — verify on Baylor financial aid pages.', NULL::text)
) AS v(sort_order, title, body, optional_url)
WHERE u.name = 'Baylor University'
  AND NOT EXISTS (
    SELECT 1 FROM public.university_requirement_notes n
    WHERE n.university_id = u.id AND n.title = v.title
  );

-- University of Texas at Dallas
INSERT INTO public.university_requirement_notes (university_id, sort_order, title, body, optional_url)
SELECT u.id, v.sort_order, v.title, v.body, v.optional_url
FROM public.universities u
CROSS JOIN (VALUES
  (0, 'UT Dallas transfer resources', 'Confirm application steps, transcript rules, and term options on official UT Dallas enrollment pages.', 'https://www.utd.edu/enroll/transfer/'),
  (1, 'School-specific majors', 'Some schools publish additional transfer guidance. Use the official catalog and advising contacts for your major.', 'https://www.utd.edu/'),
  (2, 'Merit and residency', 'Check residency classification and scholarship dates separately from general admission where applicable.', NULL::text)
) AS v(sort_order, title, body, optional_url)
WHERE u.name = 'University of Texas at Dallas'
  AND NOT EXISTS (
    SELECT 1 FROM public.university_requirement_notes n
    WHERE n.university_id = u.id AND n.title = v.title
  );

-- Rice University
INSERT INTO public.university_requirement_notes (university_id, sort_order, title, body, optional_url)
SELECT u.id, v.sort_order, v.title, v.body, v.optional_url
FROM public.universities u
CROSS JOIN (VALUES
  (0, 'Rice transfer overview', 'Rice publishes transfer-specific instructions and expectations — use official admissions pages as the source of truth.', 'https://futureowls.rice.edu/apply'),
  (1, 'Course rigor and fit', 'Strong preparation in relevant disciplines is typical; confirm recommended coursework with Rice and your current advisors.', 'https://futureowls.rice.edu/'),
  (2, 'Financial planning', 'Review aid and scholarship information on official Rice sites in parallel with application work.', NULL::text)
) AS v(sort_order, title, body, optional_url)
WHERE u.name = 'Rice University'
  AND NOT EXISTS (
    SELECT 1 FROM public.university_requirement_notes n
    WHERE n.university_id = u.id AND n.title = v.title
  );

-- Southern Methodist University
INSERT INTO public.university_requirement_notes (university_id, sort_order, title, body, optional_url)
SELECT u.id, v.sort_order, v.title, v.body, v.optional_url
FROM public.universities u
CROSS JOIN (VALUES
  (0, 'SMU transfer admission', 'Review SMU''s transfer application steps, deadlines, and portfolio or school-specific supplements on official admission pages.', 'https://www.smu.edu/Admission/Apply/TransferAdmission'),
  (1, 'Degree requirements', 'Confirm how transferred credits satisfy SMU degree components through official academic bulletins and advising.', 'https://www.smu.edu/Catalogs'),
  (2, 'Scholarships', 'Institutional awards may have separate timelines — verify on SMU financial aid pages.', NULL::text)
) AS v(sort_order, title, body, optional_url)
WHERE u.name = 'Southern Methodist University'
  AND NOT EXISTS (
    SELECT 1 FROM public.university_requirement_notes n
    WHERE n.university_id = u.id AND n.title = v.title
  );

-- Texas Christian University
INSERT INTO public.university_requirement_notes (university_id, sort_order, title, body, optional_url)
SELECT u.id, v.sort_order, v.title, v.body, v.optional_url
FROM public.universities u
CROSS JOIN (VALUES
  (0, 'TCU transfer basics', 'Use TCU admissions for transfer eligibility, document submission, and orientation expectations — planning copy only here.', 'https://admissions.tcu.edu/apply/transfer/'),
  (1, 'College and major fit', 'Colleges within TCU may highlight recommended preparation; confirm with official sites and your advisor.', 'https://admissions.tcu.edu/'),
  (2, 'Housing and enrollment', 'Review housing and enrollment steps on official TCU pages once admitted.', NULL::text)
) AS v(sort_order, title, body, optional_url)
WHERE u.name = 'Texas Christian University'
  AND NOT EXISTS (
    SELECT 1 FROM public.university_requirement_notes n
    WHERE n.university_id = u.id AND n.title = v.title
  );

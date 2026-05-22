drop extension if exists "pg_net";


  create table "public"."canonical_courses" (
    "id" uuid not null default gen_random_uuid(),
    "course_name" text not null,
    "category" text not null,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."canonical_courses" enable row level security;


  create table "public"."custom_courses" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "course_name" text not null,
    "category" text,
    "status" text not null default 'pending'::text,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."custom_courses" enable row level security;


  create table "public"."deadlines" (
    "id" uuid not null default gen_random_uuid(),
    "university_id" uuid,
    "title" text not null,
    "description" text,
    "due_date" date not null,
    "category" text not null,
    "academic_term" text,
    "academic_year" integer,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."deadlines" enable row level security;


  create table "public"."majors" (
    "id" uuid not null default gen_random_uuid(),
    "university_id" uuid not null,
    "name" text not null,
    "department" text,
    "degree_type" text not null default 'bachelor'::text,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."majors" enable row level security;


  create table "public"."transfer_requirements" (
    "id" uuid not null default gen_random_uuid(),
    "from_university_id" uuid not null,
    "to_university_id" uuid not null,
    "major_id" uuid not null,
    "min_gpa" numeric(3,2) not null default 2.0,
    "required_courses" jsonb not null default '[]'::jsonb,
    "recommended_courses" jsonb not null default '[]'::jsonb,
    "notes" text,
    "application_deadline" date,
    "essay_required" boolean not null default false,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."transfer_requirements" enable row level security;


  create table "public"."universities" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "abbreviation" text not null,
    "location" text not null,
    "type" text not null,
    "website" text,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."universities" enable row level security;


  create table "public"."user_checklist_items" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "task_key" text not null,
    "category" text not null,
    "is_complete" boolean not null default false,
    "completed_at" timestamp with time zone,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."user_checklist_items" enable row level security;


  create table "public"."user_courses" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "canonical_course_id" uuid,
    "course_name" text not null,
    "status" text not null default 'completed'::text,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."user_courses" enable row level security;


  create table "public"."user_essays" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "prompt_type" text not null,
    "title" text,
    "content" text,
    "word_count" integer not null default 0,
    "updated_at" timestamp with time zone not null default now(),
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."user_essays" enable row level security;


  create table "public"."user_profiles" (
    "id" uuid not null,
    "email" text not null,
    "full_name" text,
    "current_university_id" uuid,
    "target_university_id" uuid,
    "target_major" text,
    "expected_transfer_term" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."user_profiles" enable row level security;

CREATE UNIQUE INDEX canonical_courses_course_name_key ON public.canonical_courses USING btree (course_name);

CREATE UNIQUE INDEX canonical_courses_pkey ON public.canonical_courses USING btree (id);

CREATE UNIQUE INDEX custom_courses_pkey ON public.custom_courses USING btree (id);

CREATE UNIQUE INDEX deadlines_pkey ON public.deadlines USING btree (id);

CREATE INDEX idx_deadlines_due_date ON public.deadlines USING btree (due_date);

CREATE INDEX idx_deadlines_university ON public.deadlines USING btree (university_id);

CREATE INDEX idx_majors_university ON public.majors USING btree (university_id);

CREATE INDEX idx_transfer_from ON public.transfer_requirements USING btree (from_university_id);

CREATE INDEX idx_transfer_major ON public.transfer_requirements USING btree (major_id);

CREATE INDEX idx_transfer_to ON public.transfer_requirements USING btree (to_university_id);

CREATE UNIQUE INDEX majors_pkey ON public.majors USING btree (id);

CREATE UNIQUE INDEX majors_university_name_unique ON public.majors USING btree (university_id, name);

CREATE UNIQUE INDEX transfer_requirements_pkey ON public.transfer_requirements USING btree (id);

CREATE UNIQUE INDEX universities_name_unique ON public.universities USING btree (name);

CREATE UNIQUE INDEX universities_pkey ON public.universities USING btree (id);

CREATE UNIQUE INDEX user_checklist_items_pkey ON public.user_checklist_items USING btree (id);

CREATE UNIQUE INDEX user_checklist_items_user_id_task_key_key ON public.user_checklist_items USING btree (user_id, task_key);

CREATE UNIQUE INDEX user_courses_pkey ON public.user_courses USING btree (id);

CREATE UNIQUE INDEX user_essays_pkey ON public.user_essays USING btree (id);

CREATE UNIQUE INDEX user_profiles_pkey ON public.user_profiles USING btree (id);

alter table "public"."canonical_courses" add constraint "canonical_courses_pkey" PRIMARY KEY using index "canonical_courses_pkey";

alter table "public"."custom_courses" add constraint "custom_courses_pkey" PRIMARY KEY using index "custom_courses_pkey";

alter table "public"."deadlines" add constraint "deadlines_pkey" PRIMARY KEY using index "deadlines_pkey";

alter table "public"."majors" add constraint "majors_pkey" PRIMARY KEY using index "majors_pkey";

alter table "public"."transfer_requirements" add constraint "transfer_requirements_pkey" PRIMARY KEY using index "transfer_requirements_pkey";

alter table "public"."universities" add constraint "universities_pkey" PRIMARY KEY using index "universities_pkey";

alter table "public"."user_checklist_items" add constraint "user_checklist_items_pkey" PRIMARY KEY using index "user_checklist_items_pkey";

alter table "public"."user_courses" add constraint "user_courses_pkey" PRIMARY KEY using index "user_courses_pkey";

alter table "public"."user_essays" add constraint "user_essays_pkey" PRIMARY KEY using index "user_essays_pkey";

alter table "public"."user_profiles" add constraint "user_profiles_pkey" PRIMARY KEY using index "user_profiles_pkey";

alter table "public"."canonical_courses" add constraint "canonical_courses_course_name_key" UNIQUE using index "canonical_courses_course_name_key";

alter table "public"."custom_courses" add constraint "custom_courses_status_check" CHECK ((status = ANY (ARRAY['pending'::text, 'approved'::text, 'rejected'::text]))) not valid;

alter table "public"."custom_courses" validate constraint "custom_courses_status_check";

alter table "public"."custom_courses" add constraint "custom_courses_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."custom_courses" validate constraint "custom_courses_user_id_fkey";

alter table "public"."deadlines" add constraint "deadlines_category_check" CHECK ((category = ANY (ARRAY['application'::text, 'financial_aid'::text, 'housing'::text, 'registration'::text, 'other'::text]))) not valid;

alter table "public"."deadlines" validate constraint "deadlines_category_check";

alter table "public"."deadlines" add constraint "deadlines_university_id_fkey" FOREIGN KEY (university_id) REFERENCES public.universities(id) ON DELETE CASCADE not valid;

alter table "public"."deadlines" validate constraint "deadlines_university_id_fkey";

alter table "public"."majors" add constraint "majors_degree_type_check" CHECK ((degree_type = ANY (ARRAY['associate'::text, 'bachelor'::text, 'master'::text]))) not valid;

alter table "public"."majors" validate constraint "majors_degree_type_check";

alter table "public"."majors" add constraint "majors_university_id_fkey" FOREIGN KEY (university_id) REFERENCES public.universities(id) ON DELETE CASCADE not valid;

alter table "public"."majors" validate constraint "majors_university_id_fkey";

alter table "public"."majors" add constraint "majors_university_name_unique" UNIQUE using index "majors_university_name_unique";

alter table "public"."transfer_requirements" add constraint "different_universities" CHECK ((from_university_id <> to_university_id)) not valid;

alter table "public"."transfer_requirements" validate constraint "different_universities";

alter table "public"."transfer_requirements" add constraint "transfer_requirements_from_university_id_fkey" FOREIGN KEY (from_university_id) REFERENCES public.universities(id) ON DELETE CASCADE not valid;

alter table "public"."transfer_requirements" validate constraint "transfer_requirements_from_university_id_fkey";

alter table "public"."transfer_requirements" add constraint "transfer_requirements_major_id_fkey" FOREIGN KEY (major_id) REFERENCES public.majors(id) ON DELETE CASCADE not valid;

alter table "public"."transfer_requirements" validate constraint "transfer_requirements_major_id_fkey";

alter table "public"."transfer_requirements" add constraint "transfer_requirements_to_university_id_fkey" FOREIGN KEY (to_university_id) REFERENCES public.universities(id) ON DELETE CASCADE not valid;

alter table "public"."transfer_requirements" validate constraint "transfer_requirements_to_university_id_fkey";

alter table "public"."universities" add constraint "universities_name_unique" UNIQUE using index "universities_name_unique";

alter table "public"."universities" add constraint "universities_type_check" CHECK ((type = ANY (ARRAY['community_college'::text, 'four_year'::text]))) not valid;

alter table "public"."universities" validate constraint "universities_type_check";

alter table "public"."user_checklist_items" add constraint "user_checklist_items_category_check" CHECK ((category = ANY (ARRAY['academic'::text, 'application'::text, 'preparation'::text]))) not valid;

alter table "public"."user_checklist_items" validate constraint "user_checklist_items_category_check";

alter table "public"."user_checklist_items" add constraint "user_checklist_items_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."user_checklist_items" validate constraint "user_checklist_items_user_id_fkey";

alter table "public"."user_checklist_items" add constraint "user_checklist_items_user_id_task_key_key" UNIQUE using index "user_checklist_items_user_id_task_key_key";

alter table "public"."user_courses" add constraint "user_courses_canonical_course_id_fkey" FOREIGN KEY (canonical_course_id) REFERENCES public.canonical_courses(id) not valid;

alter table "public"."user_courses" validate constraint "user_courses_canonical_course_id_fkey";

alter table "public"."user_courses" add constraint "user_courses_status_check" CHECK ((status = ANY (ARRAY['completed'::text, 'in_progress'::text, 'planned'::text]))) not valid;

alter table "public"."user_courses" validate constraint "user_courses_status_check";

alter table "public"."user_courses" add constraint "user_courses_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."user_courses" validate constraint "user_courses_user_id_fkey";

alter table "public"."user_essays" add constraint "user_essays_prompt_type_check" CHECK ((prompt_type = ANY (ARRAY['why_transfer'::text, 'leadership'::text, 'diversity'::text, 'extracurricular'::text, 'other'::text]))) not valid;

alter table "public"."user_essays" validate constraint "user_essays_prompt_type_check";

alter table "public"."user_essays" add constraint "user_essays_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."user_essays" validate constraint "user_essays_user_id_fkey";

alter table "public"."user_profiles" add constraint "user_profiles_current_university_id_fkey" FOREIGN KEY (current_university_id) REFERENCES public.universities(id) ON DELETE SET NULL not valid;

alter table "public"."user_profiles" validate constraint "user_profiles_current_university_id_fkey";

alter table "public"."user_profiles" add constraint "user_profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."user_profiles" validate constraint "user_profiles_id_fkey";

alter table "public"."user_profiles" add constraint "user_profiles_target_university_id_fkey" FOREIGN KEY (target_university_id) REFERENCES public.universities(id) ON DELETE SET NULL not valid;

alter table "public"."user_profiles" validate constraint "user_profiles_target_university_id_fkey";

grant delete on table "public"."canonical_courses" to "anon";

grant insert on table "public"."canonical_courses" to "anon";

grant references on table "public"."canonical_courses" to "anon";

grant select on table "public"."canonical_courses" to "anon";

grant trigger on table "public"."canonical_courses" to "anon";

grant truncate on table "public"."canonical_courses" to "anon";

grant update on table "public"."canonical_courses" to "anon";

grant delete on table "public"."canonical_courses" to "authenticated";

grant insert on table "public"."canonical_courses" to "authenticated";

grant references on table "public"."canonical_courses" to "authenticated";

grant select on table "public"."canonical_courses" to "authenticated";

grant trigger on table "public"."canonical_courses" to "authenticated";

grant truncate on table "public"."canonical_courses" to "authenticated";

grant update on table "public"."canonical_courses" to "authenticated";

grant delete on table "public"."canonical_courses" to "service_role";

grant insert on table "public"."canonical_courses" to "service_role";

grant references on table "public"."canonical_courses" to "service_role";

grant select on table "public"."canonical_courses" to "service_role";

grant trigger on table "public"."canonical_courses" to "service_role";

grant truncate on table "public"."canonical_courses" to "service_role";

grant update on table "public"."canonical_courses" to "service_role";

grant delete on table "public"."custom_courses" to "anon";

grant insert on table "public"."custom_courses" to "anon";

grant references on table "public"."custom_courses" to "anon";

grant select on table "public"."custom_courses" to "anon";

grant trigger on table "public"."custom_courses" to "anon";

grant truncate on table "public"."custom_courses" to "anon";

grant update on table "public"."custom_courses" to "anon";

grant delete on table "public"."custom_courses" to "authenticated";

grant insert on table "public"."custom_courses" to "authenticated";

grant references on table "public"."custom_courses" to "authenticated";

grant select on table "public"."custom_courses" to "authenticated";

grant trigger on table "public"."custom_courses" to "authenticated";

grant truncate on table "public"."custom_courses" to "authenticated";

grant update on table "public"."custom_courses" to "authenticated";

grant delete on table "public"."custom_courses" to "service_role";

grant insert on table "public"."custom_courses" to "service_role";

grant references on table "public"."custom_courses" to "service_role";

grant select on table "public"."custom_courses" to "service_role";

grant trigger on table "public"."custom_courses" to "service_role";

grant truncate on table "public"."custom_courses" to "service_role";

grant update on table "public"."custom_courses" to "service_role";

grant delete on table "public"."deadlines" to "anon";

grant insert on table "public"."deadlines" to "anon";

grant references on table "public"."deadlines" to "anon";

grant select on table "public"."deadlines" to "anon";

grant trigger on table "public"."deadlines" to "anon";

grant truncate on table "public"."deadlines" to "anon";

grant update on table "public"."deadlines" to "anon";

grant delete on table "public"."deadlines" to "authenticated";

grant insert on table "public"."deadlines" to "authenticated";

grant references on table "public"."deadlines" to "authenticated";

grant select on table "public"."deadlines" to "authenticated";

grant trigger on table "public"."deadlines" to "authenticated";

grant truncate on table "public"."deadlines" to "authenticated";

grant update on table "public"."deadlines" to "authenticated";

grant delete on table "public"."deadlines" to "service_role";

grant insert on table "public"."deadlines" to "service_role";

grant references on table "public"."deadlines" to "service_role";

grant select on table "public"."deadlines" to "service_role";

grant trigger on table "public"."deadlines" to "service_role";

grant truncate on table "public"."deadlines" to "service_role";

grant update on table "public"."deadlines" to "service_role";

grant delete on table "public"."majors" to "anon";

grant insert on table "public"."majors" to "anon";

grant references on table "public"."majors" to "anon";

grant select on table "public"."majors" to "anon";

grant trigger on table "public"."majors" to "anon";

grant truncate on table "public"."majors" to "anon";

grant update on table "public"."majors" to "anon";

grant delete on table "public"."majors" to "authenticated";

grant insert on table "public"."majors" to "authenticated";

grant references on table "public"."majors" to "authenticated";

grant select on table "public"."majors" to "authenticated";

grant trigger on table "public"."majors" to "authenticated";

grant truncate on table "public"."majors" to "authenticated";

grant update on table "public"."majors" to "authenticated";

grant delete on table "public"."majors" to "service_role";

grant insert on table "public"."majors" to "service_role";

grant references on table "public"."majors" to "service_role";

grant select on table "public"."majors" to "service_role";

grant trigger on table "public"."majors" to "service_role";

grant truncate on table "public"."majors" to "service_role";

grant update on table "public"."majors" to "service_role";

grant delete on table "public"."transfer_requirements" to "anon";

grant insert on table "public"."transfer_requirements" to "anon";

grant references on table "public"."transfer_requirements" to "anon";

grant select on table "public"."transfer_requirements" to "anon";

grant trigger on table "public"."transfer_requirements" to "anon";

grant truncate on table "public"."transfer_requirements" to "anon";

grant update on table "public"."transfer_requirements" to "anon";

grant delete on table "public"."transfer_requirements" to "authenticated";

grant insert on table "public"."transfer_requirements" to "authenticated";

grant references on table "public"."transfer_requirements" to "authenticated";

grant select on table "public"."transfer_requirements" to "authenticated";

grant trigger on table "public"."transfer_requirements" to "authenticated";

grant truncate on table "public"."transfer_requirements" to "authenticated";

grant update on table "public"."transfer_requirements" to "authenticated";

grant delete on table "public"."transfer_requirements" to "service_role";

grant insert on table "public"."transfer_requirements" to "service_role";

grant references on table "public"."transfer_requirements" to "service_role";

grant select on table "public"."transfer_requirements" to "service_role";

grant trigger on table "public"."transfer_requirements" to "service_role";

grant truncate on table "public"."transfer_requirements" to "service_role";

grant update on table "public"."transfer_requirements" to "service_role";

grant delete on table "public"."universities" to "anon";

grant insert on table "public"."universities" to "anon";

grant references on table "public"."universities" to "anon";

grant select on table "public"."universities" to "anon";

grant trigger on table "public"."universities" to "anon";

grant truncate on table "public"."universities" to "anon";

grant update on table "public"."universities" to "anon";

grant delete on table "public"."universities" to "authenticated";

grant insert on table "public"."universities" to "authenticated";

grant references on table "public"."universities" to "authenticated";

grant select on table "public"."universities" to "authenticated";

grant trigger on table "public"."universities" to "authenticated";

grant truncate on table "public"."universities" to "authenticated";

grant update on table "public"."universities" to "authenticated";

grant delete on table "public"."universities" to "service_role";

grant insert on table "public"."universities" to "service_role";

grant references on table "public"."universities" to "service_role";

grant select on table "public"."universities" to "service_role";

grant trigger on table "public"."universities" to "service_role";

grant truncate on table "public"."universities" to "service_role";

grant update on table "public"."universities" to "service_role";

grant delete on table "public"."user_checklist_items" to "anon";

grant insert on table "public"."user_checklist_items" to "anon";

grant references on table "public"."user_checklist_items" to "anon";

grant select on table "public"."user_checklist_items" to "anon";

grant trigger on table "public"."user_checklist_items" to "anon";

grant truncate on table "public"."user_checklist_items" to "anon";

grant update on table "public"."user_checklist_items" to "anon";

grant delete on table "public"."user_checklist_items" to "authenticated";

grant insert on table "public"."user_checklist_items" to "authenticated";

grant references on table "public"."user_checklist_items" to "authenticated";

grant select on table "public"."user_checklist_items" to "authenticated";

grant trigger on table "public"."user_checklist_items" to "authenticated";

grant truncate on table "public"."user_checklist_items" to "authenticated";

grant update on table "public"."user_checklist_items" to "authenticated";

grant delete on table "public"."user_checklist_items" to "service_role";

grant insert on table "public"."user_checklist_items" to "service_role";

grant references on table "public"."user_checklist_items" to "service_role";

grant select on table "public"."user_checklist_items" to "service_role";

grant trigger on table "public"."user_checklist_items" to "service_role";

grant truncate on table "public"."user_checklist_items" to "service_role";

grant update on table "public"."user_checklist_items" to "service_role";

grant delete on table "public"."user_courses" to "anon";

grant insert on table "public"."user_courses" to "anon";

grant references on table "public"."user_courses" to "anon";

grant select on table "public"."user_courses" to "anon";

grant trigger on table "public"."user_courses" to "anon";

grant truncate on table "public"."user_courses" to "anon";

grant update on table "public"."user_courses" to "anon";

grant delete on table "public"."user_courses" to "authenticated";

grant insert on table "public"."user_courses" to "authenticated";

grant references on table "public"."user_courses" to "authenticated";

grant select on table "public"."user_courses" to "authenticated";

grant trigger on table "public"."user_courses" to "authenticated";

grant truncate on table "public"."user_courses" to "authenticated";

grant update on table "public"."user_courses" to "authenticated";

grant delete on table "public"."user_courses" to "service_role";

grant insert on table "public"."user_courses" to "service_role";

grant references on table "public"."user_courses" to "service_role";

grant select on table "public"."user_courses" to "service_role";

grant trigger on table "public"."user_courses" to "service_role";

grant truncate on table "public"."user_courses" to "service_role";

grant update on table "public"."user_courses" to "service_role";

grant delete on table "public"."user_essays" to "anon";

grant insert on table "public"."user_essays" to "anon";

grant references on table "public"."user_essays" to "anon";

grant select on table "public"."user_essays" to "anon";

grant trigger on table "public"."user_essays" to "anon";

grant truncate on table "public"."user_essays" to "anon";

grant update on table "public"."user_essays" to "anon";

grant delete on table "public"."user_essays" to "authenticated";

grant insert on table "public"."user_essays" to "authenticated";

grant references on table "public"."user_essays" to "authenticated";

grant select on table "public"."user_essays" to "authenticated";

grant trigger on table "public"."user_essays" to "authenticated";

grant truncate on table "public"."user_essays" to "authenticated";

grant update on table "public"."user_essays" to "authenticated";

grant delete on table "public"."user_essays" to "service_role";

grant insert on table "public"."user_essays" to "service_role";

grant references on table "public"."user_essays" to "service_role";

grant select on table "public"."user_essays" to "service_role";

grant trigger on table "public"."user_essays" to "service_role";

grant truncate on table "public"."user_essays" to "service_role";

grant update on table "public"."user_essays" to "service_role";

grant delete on table "public"."user_profiles" to "anon";

grant insert on table "public"."user_profiles" to "anon";

grant references on table "public"."user_profiles" to "anon";

grant select on table "public"."user_profiles" to "anon";

grant trigger on table "public"."user_profiles" to "anon";

grant truncate on table "public"."user_profiles" to "anon";

grant update on table "public"."user_profiles" to "anon";

grant delete on table "public"."user_profiles" to "authenticated";

grant insert on table "public"."user_profiles" to "authenticated";

grant references on table "public"."user_profiles" to "authenticated";

grant select on table "public"."user_profiles" to "authenticated";

grant trigger on table "public"."user_profiles" to "authenticated";

grant truncate on table "public"."user_profiles" to "authenticated";

grant update on table "public"."user_profiles" to "authenticated";

grant delete on table "public"."user_profiles" to "service_role";

grant insert on table "public"."user_profiles" to "service_role";

grant references on table "public"."user_profiles" to "service_role";

grant select on table "public"."user_profiles" to "service_role";

grant trigger on table "public"."user_profiles" to "service_role";

grant truncate on table "public"."user_profiles" to "service_role";

grant update on table "public"."user_profiles" to "service_role";


  create policy "canonical_courses: public read"
  on "public"."canonical_courses"
  as permissive
  for select
  to public
using (true);



  create policy "custom_courses: users can delete own"
  on "public"."custom_courses"
  as permissive
  for delete
  to public
using ((auth.uid() = user_id));



  create policy "custom_courses: users can insert own"
  on "public"."custom_courses"
  as permissive
  for insert
  to public
with check ((auth.uid() = user_id));



  create policy "custom_courses: users can update own"
  on "public"."custom_courses"
  as permissive
  for update
  to public
using ((auth.uid() = user_id));



  create policy "custom_courses: users can view own"
  on "public"."custom_courses"
  as permissive
  for select
  to public
using ((auth.uid() = user_id));



  create policy "Deadlines are viewable by everyone"
  on "public"."deadlines"
  as permissive
  for select
  to public
using (true);



  create policy "Majors are viewable by everyone"
  on "public"."majors"
  as permissive
  for select
  to public
using (true);



  create policy "Transfer requirements are viewable by everyone"
  on "public"."transfer_requirements"
  as permissive
  for select
  to public
using (true);



  create policy "Universities are viewable by everyone"
  on "public"."universities"
  as permissive
  for select
  to public
using (true);



  create policy "user_checklist_items: delete own"
  on "public"."user_checklist_items"
  as permissive
  for delete
  to public
using ((auth.uid() = user_id));



  create policy "user_checklist_items: insert own"
  on "public"."user_checklist_items"
  as permissive
  for insert
  to public
with check ((auth.uid() = user_id));



  create policy "user_checklist_items: select own"
  on "public"."user_checklist_items"
  as permissive
  for select
  to public
using ((auth.uid() = user_id));



  create policy "user_checklist_items: update own"
  on "public"."user_checklist_items"
  as permissive
  for update
  to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



  create policy "user_courses: users can delete own"
  on "public"."user_courses"
  as permissive
  for delete
  to public
using ((auth.uid() = user_id));



  create policy "user_courses: users can insert own"
  on "public"."user_courses"
  as permissive
  for insert
  to public
with check ((auth.uid() = user_id));



  create policy "user_courses: users can update own"
  on "public"."user_courses"
  as permissive
  for update
  to public
using ((auth.uid() = user_id));



  create policy "user_courses: users can view own"
  on "public"."user_courses"
  as permissive
  for select
  to public
using ((auth.uid() = user_id));



  create policy "user_essays: delete own"
  on "public"."user_essays"
  as permissive
  for delete
  to public
using ((auth.uid() = user_id));



  create policy "user_essays: insert own"
  on "public"."user_essays"
  as permissive
  for insert
  to public
with check ((auth.uid() = user_id));



  create policy "user_essays: select own"
  on "public"."user_essays"
  as permissive
  for select
  to public
using ((auth.uid() = user_id));



  create policy "user_essays: update own"
  on "public"."user_essays"
  as permissive
  for update
  to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



  create policy "Users can insert their own profile"
  on "public"."user_profiles"
  as permissive
  for insert
  to public
with check ((auth.uid() = id));



  create policy "Users can update their own profile"
  on "public"."user_profiles"
  as permissive
  for update
  to public
using ((auth.uid() = id));



  create policy "Users can view their own profile"
  on "public"."user_profiles"
  as permissive
  for select
  to public
using ((auth.uid() = id));




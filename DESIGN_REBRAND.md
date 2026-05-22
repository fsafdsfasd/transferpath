# TransferPath — design & rebrand playbook

This document defines how to **incrementally** rebrand the product from **Texas Transfer** to **TransferPath** and elevate the UI to a **premium, roadmap-oriented** student productivity experience—without breaking backend behavior.

---

## Brand

| | |
|---|---|
| **Product name** | **TransferPath** |
| **Tagline** | *Your transfer journey, mapped clearly.* |
| **Scope** | Built first for **Texas** transfer students (community college, CAP, inter-university). Naming, visuals, and copy should **scale beyond Texas**; keep Texas-specific messaging in optional sublines (“Built first for Texas transfer students”). |

### Personality

- Modern, polished, calm, motivating, trustworthy, aspirational  
- **Roadmap / path / momentum** — the UI should communicate **journey**, not a generic admin panel  
- Avoid “vibe-coded SaaS gray” — replace with intentional hierarchy, spacing, and motion (subtle)

### Visual direction (target)

- **Inspiration:** Linear, Notion, Vercel, Ramp, premium edtech / productivity SaaS  
- **Metaphors:** paths, milestones, progress, “next step” — reusable **primitives** (e.g. path step, milestone pill, timeline row), not one-off layouts per page  
- **Palette (suggested evolution):** move away from default purple-gray templates toward a cohesive system, e.g. **deep indigo/navy primary**, **warm orange/gold accent**, **muted green success**, **soft cream/off-white background**, **near-black/navy text** — **map everything through CSS variables** (`:root` in `src/app/globals.css` and shadcn semantic tokens), not raw hex scattered in components  

### Guardrails

- **Do not** rewrite the whole app in one PR  
- **Do not** break Supabase, routes, or data logic  
- **Prefer** evolving shared primitives (`Button`, `Card`, layout shells) over duplicating styles  
- **Single focal** per screen where possible (hero OR primary roadmap block OR KPI row — avoid five equal-weight gray cards)  
- **Light mode first** for v1 unless dark is already a product requirement  

---

## Current codebase anchors (audit starting points)

| Area | Location |
|------|-----------|
| Root metadata / title | `src/app/layout.tsx` |
| Global theme + `--tt-*` tokens | `src/app/globals.css` |
| shadcn config | `components.json` |
| Marketing homepage | `src/app/page.tsx`, `src/components/landing/*` |
| Dashboard shell + sidebar | `src/app/dashboard/layout.tsx`, `src/components/dashboard/sidebar.tsx` |
| Auth / onboarding | `src/app/(auth)/*`, `src/components/onboarding/*` |
| UI primitives | `src/components/ui/*` |

**Audit step (manual + automated):**

1. List all **routes** under `src/app/` (App Router).  
2. Grep for **`Texas Transfer`**, **`Texas Transfer`**, **`texas transfer`**, **`--tt-purple`** (and other legacy names) across `src/`, `public/`, `README.md`.  
3. Inventory **shared layout** (root layout, dashboard layout, landing sections).  
4. Note **inconsistencies** (random `bg-white`, duplicate card padding, mixed heading sizes).  

---

## Recommended phase order (why)

**Foundation first avoids double work:** updating copy everywhere *before* tokens often means touching the **same files twice** when colors change.

Suggested order:

1. **Audit** (inventory only; no big deletes).  
2. **Design tokens + shadcn semantics** — update `:root` (`--primary`, `--accent`, `--sidebar-*`, `--chart-*`, etc.) so **all** shadcn components shift together. Introduce new semantic names (e.g. `--path-accent`) only if they map to Tailwind/shadcn cleanly.  
3. **Central brand strings** — add e.g. `src/lib/brand.ts` exporting `PRODUCT_NAME`, `TAGLINE`, optional `REGION_TAGLINE`; import from `layout`, landing, sidebar, emails text if any. Then **rename** UI strings from Texas Transfer → TransferPath.  
4. **Landing** (highest visibility).  
5. **Dashboard layout** (sidebar + headers — sets tone for all subpages).  
6. **Dashboard pages** one route at a time (see list below).  
7. **Auth / onboarding** alignment.  
8. **Polish** (empty/loading states, mobile nav, focus rings).  
9. **QA checklist** (below).  

You can keep “Step 2 rebrand / Step 3 design system” from an older plan **merged** into: **tokens + brand module + string pass** as one foundation phase.

---

## Step-by-step execution plan (aligned with your original 10 steps)

### Step 1 — Audit

- Routes, layouts, shared components, `globals.css`, hardcoded branding, inconsistent patterns (document in a short checklist or issue).  

### Step 2 — Rebrand strings (after or with tokens)

- Replace product name in UI, **metadata** (`layout.tsx` title/description), **README** if user-facing, **favicon** / **OG** assets in `public/` if present.  
- Keep Texas-only copy where intentional (“Built first for Texas…”).  
- Run `rg -i "texas transfer" src public` until clean (except intentional mentions).  

### Step 3 — Design system

- Typography scale (page title, section, label, body, helper).  
- Spacing rhythm (multiples of 4; section gaps).  
- Card recipe (`bg-card`, `border-border`, radius, padding — **surfaces**, not heavy shadows).  
- Buttons (map to shadcn `Button` variants — avoid 10 ad-hoc purple classes).  
- Badges / status (semantic colors: success, warning, urgent — **status only**).  
- Progress (thin tracks, consistent fill tokens, label adjacent to bar when needed).  
- **Journey components** — small reusable building blocks for “path” UI (avoid reinventing per page).  

### Step 4 — Landing page

- Hero: **TransferPath** + tagline; primary CTA **Build your path**; secondary **See how it works**.  
- Sections: pain points, how it works, Texas schools (honest), features, trust, roadmap preview, premium footer.  
- Startup-quality layout; no lorem; Texas where accurate, scalable voice elsewhere.  

### Step 5 — Dashboard layout (“transfer mission control”)

- Sidebar + page header + main grid: **path progress**, **next milestone**, **current term**, **gaps**, **deadlines**, **recommended next actions**.  
- Reduce undifferentiated gray cards; **one clear hierarchy** per view.  

### Step 6 — Core app pages (one at a time)

Suggested order (adjust as needed):

| Route (typical) | Focus |
|-----------------|--------|
| `/dashboard` | Home / readiness / roadmap preview |
| `/dashboard/timeline` | Semester timeline |
| `/dashboard/requirements` | Requirements |
| `/dashboard/competitiveness` | Path readiness (rename label if needed for brand) |
| `/dashboard/checklist` | Checklist |
| `/dashboard/essay` | Essay Builder (same nav as other tools) |
| `/dashboard/settings` | Profile / settings |

Per page: hierarchy, copy, empty states, actions obvious, **no placeholder tone**.  

### Step 7 — Navigation

- Premium, student-focused sidebar; clear active state; **mobile:** if sidebar is desktop-only, add **Sheet/drawer** nav using existing shadcn patterns — **must** reach Essay + Settings like other items.  
- Consistent **dashboard layout** for all in-scope routes.  

### Step 8 — UX polish

- Hover/focus states (`focus-visible`), loading skeletons where needed, combobox/input spacing, responsive breakpoints.  
- Mark **coming soon** explicitly if an action is not wired — don’t imply dead buttons work.  

### Step 9 — Preserve backend

- No breaking Supabase contracts; no removing routes without cause.  
- Refactors: explain **why** + scope **small**.  

### Step 10 — Final QA

- [ ] `npm run build` passes  
- [ ] Auth flows still work (login / onboarding / redirect)  
- [ ] Dashboard routes and sidebar links work  
- [ ] Supabase client usage unchanged  
- [ ] Branding: no stray “Texas Transfer” except intentional Texas positioning copy  
- [ ] Mobile layout usable; Essay reachable in nav  
- [ ] No obvious placeholder strings  
- [ ] Metadata / favicon / OG reflect TransferPath  

---

## Implementation notes

### Brand module

**Shipped:** `src/lib/brand.ts` centralizes `PRODUCT_NAME`, `TAGLINE`, `REGION_TAGLINE`, `META_DESCRIPTION`, CTAs (`CTA_BUILD_PATH`, `CTA_SEE_HOW`, etc.), `TRUST_LINE`, `EMAIL_PRODUCT_LINE`, and `buildPageTitle()`. Root layout and high-visibility surfaces import from here—avoid duplicating the product name in new components.

### Theme migration

**Shipped (single pass):** `:root` in `src/app/globals.css` uses cream background, near-navy text, deep navy `--primary`, warm gold (`chart-3`), muted green (`chart-2`), orange-leaning destructive, updated sidebar tokens. Legacy `--tt-*` variables **alias** the new semantics so older class references stay coherent.

### Icons

Lucide only; use consistent size and `strokeWidth` where appropriate for a calmer look.

### Assets

**Partially shipped:** `src/app/layout.tsx` uses `buildPageTitle()`, `META_DESCRIPTION`, `public/icon.svg`, and basic Open Graph / Twitter metadata. **Optional follow-up:** add a dedicated `public/og.png` (or `opengraph-image` route) and set `metadata.openGraph.images` so link previews show a branded image (currently text-oriented metadata only).

### Legal / naming

Outside this repo: verify **TransferPath** trademark/domain availability as needed.

---

## Foundation ship log (completed)

Use this as a checkpoint; **Steps 6–8** (per-page dashboard depth, journey primitives, polish pass) remain incremental work.

| Area | What shipped |
|------|----------------|
| **Brand** | `src/lib/brand.ts`; `package.json` name `transferpath`; README title |
| **Root metadata** | `layout.tsx`: title/description, `/icon.svg`, Open Graph / Twitter |
| **Theme** | `globals.css` `:root` rebase; `--tt-*` aliases |
| **Landing** | `page.tsx` + `components/landing/*` — TransferPath voice, CTAs, token-based preview, `#about` anchor on testimonials |
| **Dashboard chrome** | `sidebar.tsx` — TransferPath branding, “Path readiness” label (route still `/dashboard/competitiveness`), **mobile:** `md:hidden` header + **Sheet** for full nav including Essay / Settings |
| **Dashboard layout** | `pt-14 md:pt-0` so content clears mobile top bar |
| **Auth / onboarding / email** | Login left panel uses brand constants; onboarding steps use tokens; `buildDeadlineReminderEmail` uses `EMAIL_PRODUCT_LINE`; settings help references `PRODUCT_NAME` |
| **Path readiness** | Competitiveness client heading: “Path readiness” (URL and data unchanged) |
| **Verify** | `npm run build` passes |

**Not in scope for this foundation pass:** deep redesign of each dashboard sub-route (timeline, requirements, checklist, essay body UI) beyond tokens/chrome—follow **Step 6** in the plan above.

---

## Working agreement for agents / contributors

1. Work **incrementally**; explain changes per PR or per page.  
2. Ask before **large destructive** refactors.  
3. After each phase, run **build** and smoke-test critical paths.  
4. Document any **new patterns** (card recipe, badge variants) in this file or a short `DESIGN_TOKENS.md` if the system grows.  

### Visual system — Academic Futurism (implemented, template-aligned)

- **Theme (light-first):** **Cream canvas** (`--background`), **paper** cards (`--card` / `--surface`), **navy primary** (`--primary`, CTAs like “Save draft”), **burnt-orange accent** (`--accent`) for rails, urgency, marketing CTAs; **muted emerald success** (`--success`, chart-3). **Navy sidebar** via `--sidebar-*`. **Legacy `--tt-*`** map to oranges / success / navy as appropriate (`--tt-purple` → accent).
- **Typography:** **Playfair Display** (`--font-playfair` → headings via `h1–h3` + `.font-heading`), **Inter** (`--font-inter` → `font-sans`), **JetBrains Mono** (`--font-jetbrains-mono` → `font-mono`). Dashboard wordmark strips use **`font-sans`** where mocks call for clean caps.
- **Backgrounds:** **`.tp-mesh-bg`** — warm cream mesh (soft orange veil); **`.tp-dashboard-bg`** — light ambient wash behind the main column next to the navy rail.
- **Utilities:** `--primary-soft`, `--accent-soft`, `--border-strong`; `.shadow-glow-*` tuned for paper depth (not neon).
- **Components:** **`Button`** **`accent`** variant = solid orange accent (marketing + focal actions). Sidebar **orange orb** marks brand; **`tp-interactive-panel`** hover mixes **accent** into the border.
- **Motion (CSS-only):** `--tp-ease`, `.tp-stagger-children`, `.tp-enter-slide-right`, `.tp-ring-progress` / `.stroke-primary-dash`, **`prefers-reduced-motion`**; optional **`.animate-fade-in`** (template-aligned keyframes).
- **Dashboard chrome:** `dashboard-chrome` — Mission Control breadcrumb strip, centered **decorative search + ⌘K focus**, notifications bell indicator (no backend wiring yet), sidebar pathway panel preserved.
- **Home:** **RecommendedNextSection** derives three prioritized action cards from profile, checklist essays, deadlines, credits (no demo school names).

---

*Last updated: Academic Futurism shell + Journey map timeline + heuristic “recommended next” cards documented; onboarding deep styling pass optional.*

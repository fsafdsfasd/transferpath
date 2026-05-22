# Deploy TransferPath on Vercel (free tier)

## 1. Push code to GitHub

```bash
chmod +x scripts/publish-to-github.sh
./scripts/publish-to-github.sh transferpath
```

(Or create a repo on github.com and `git remote add origin` + `git push -u origin main`.)

## 2. Import on Vercel

1. Sign in at [vercel.com](https://vercel.com) with GitHub.
2. **Add New Project** → import your `transferpath` repo.
3. Framework: **Next.js** (auto-detected).
4. Add environment variables (from Supabase → Project Settings → API):

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `anon` public key |
| `NEXT_PUBLIC_SITE_URL` | `https://YOUR-PROJECT.vercel.app` (set after first deploy, then redeploy) |

5. Deploy. Copy the production URL.

## 3. Supabase auth URLs

Supabase Dashboard → **Authentication** → **URL configuration**:

- **Site URL:** `https://YOUR-PROJECT.vercel.app`
- **Redirect URLs:**  
  - `https://YOUR-PROJECT.vercel.app/auth/callback`  
  - `http://localhost:3000/auth/callback`

## 4. Database

If this repo’s migrations are not on your Supabase project yet:

```bash
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push
```

## 5. Optional: weekly deadline emails

Add on Vercel (server env only): `SUPABASE_SERVICE_ROLE_KEY`, `CRON_SECRET`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`.  
Schedule a weekly GET to `/api/cron/deadline-reminders` with `Authorization: Bearer $CRON_SECRET` (Vercel Cron or GitHub Actions).

## Cost

- **Vercel Hobby:** free for personal projects (reasonable traffic).
- **Supabase Free:** free tier for database + auth.

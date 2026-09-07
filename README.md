# MODAEDITZ

Real estate video editing portfolio site. Next.js (App Router) + Tailwind
+ Supabase. Every piece of content that changes often - packages/pricing,
portfolio videos, stats, contact info, even the hero/showcase video - lives
in Supabase tables, editable from Table Editor with no code changes and no
redeploy. The page fetches fresh from Supabase on every load.

## 1. Create the Supabase project

1. Go to [supabase.com](https://supabase.com) -> New project.
2. Once it's ready, open **SQL Editor -> New query**, paste in the entire
   contents of [`supabase/schema.sql`](./supabase/schema.sql), and run it.
   This creates all 6 tables (`site_settings`, `services`,
   `service_features`, `portfolio_items`, `stats`, `testimonials`, `faqs`)
   with read-only public access, and seeds a few starter rows so the site
   isn't empty on first load.
3. Go to **Project Settings -> API** and copy the **Project URL** and the
   **anon public** key.

## 2. Local setup

```bash
npm install
cp .env.local.example .env.local
# paste your Project URL + anon key into .env.local
npm run dev
```

Open http://localhost:3000 - you should see the site running on your
seeded Supabase content.

## 3. Editing content - the whole point of this setup

Open your project in **Supabase Studio -> Table Editor** and edit rows
directly:

| Table               | Controls                                                              |
| ------------------- | ---------------------------------------------------------------------- |
| `site_settings`     | Brand name, hero headline/video, location tag, phone, email, socials  |
| `services`          | Pricing packages (name, price, description, "most booked" flag)       |
| `service_features`  | The bullet list under each package (`service_id` links to `services`) |
| `portfolio_items`   | Your work - title, client, category, video link, thumbnail, 16:9/9:16 |
| `stats`             | The numbers row (e.g. "40 - Projects delivered")                      |
| `testimonials`      | Client quotes                                                          |
| `faqs`              | Questions section                                                      |

**Changing the showcase/hero video:** open `site_settings`, edit the
`hero_video_url` row. Paste a direct link to an `.mp4` file (e.g. from
Supabase Storage - see below). Refresh the site, it's updated. No git
commit, no redeploy.

**Adding a portfolio piece:** add a row to `portfolio_items`. `video_url`
accepts a YouTube link, a Vimeo link, or a direct `.mp4` link - the site
figures out how to play it. `thumbnail_url` is the cover image shown
before it's clicked.

**Hosting your own video files:** in Supabase Studio go to
**Storage -> New bucket** (make it public), upload your `.mp4`, then copy
its public URL into `hero_video_url` or a `portfolio_items.video_url` row.

Every table only grants **public read access** (`select`) - the site
itself can never write to your database. Edits only happen through
Supabase Studio, which uses your own login.

## 4. Push to GitHub

```bash
git init
git add .
git commit -m "Initial MODAEDITZ site"
git branch -M main
git remote add origin https://github.com/<your-username>/modaeditz.git
git push -u origin main
```

`.env.local` is already git-ignored - your Supabase keys won't be
committed. That's expected; you'll set them again in Vercel below.

## 5. Deploy on Vercel

1. [vercel.com/new](https://vercel.com/new) -> import the GitHub repo.
2. In the import screen (or later under **Settings -> Environment
   Variables**), add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy. Every future content change happens in Supabase, not by
   redeploying - you only need to redeploy again if you change the code
   itself (e.g. add a new section).

## Project structure

```
app/
  layout.js        Root layout, page metadata
  page.js           Assembles the whole homepage, fetches all Supabase data
  globals.css       Design tokens (colors/type) for the MODAEDITZ look
components/          One file per section (Hero, Work, Services, ...)
lib/
  supabase.js        Supabase client
  content.js         Data-fetching functions with safe fallbacks
  media.js           Figures out how to play YouTube/Vimeo/direct-file links
supabase/
  schema.sql          Run once in Supabase SQL Editor to set everything up
```

## Notes

- No logo/favicon is included yet - drop a `favicon.ico` into `app/` and
  a logo image into `public/` once you have one, and swap the text
  wordmark in `components/Nav.js` / `components/Footer.js` for an
  `<img>` if you'd rather show a mark than the text logo.
- The design leans on a single accent color (`--color-signal`, a
  red-orange) defined in `app/globals.css` - change that one variable to
  re-theme the whole site.

-- MODAEDITZ website schema
-- Run this once in Supabase Studio -> SQL Editor -> New query -> Run.
-- After that, every table below can be edited any time from Table Editor
-- and the change appears on the live site on next page load (no redeploy).

-- ============================================================
-- 1. SITE SETTINGS  (single row: brand, hero, contact, showcase video)
-- ============================================================
create table if not exists site_settings (
  id                  int primary key default 1,
  brand_name          text not null default 'MODAEDITZ',
  location_label      text default 'Based in India — working with agents everywhere',
  hero_headline        text not null default 'Footage in. Listings sold.',
  hero_subheadline     text default 'Real estate video editing that turns raw walkthroughs and drone clips into cinematic listing videos and scroll-stopping reels.',
  hero_video_url       text default '',
  hero_poster_url      text default '',
  showcase_heading     text default 'Recent cuts',
  showcase_subheading  text default 'A few projects straight out of the timeline.',
  primary_cta_label    text default 'View the work',
  primary_cta_url      text default '#work',
  secondary_cta_label  text default 'See services',
  secondary_cta_url    text default '#services',
  phone               text default '',
  email               text default '',
  instagram_url        text default '',
  tiktok_url           text default '',
  youtube_url          text default '',
  constraint single_row check (id = 1)
);

insert into site_settings (id) values (1)
  on conflict (id) do nothing;

alter table site_settings enable row level security;

drop policy if exists "public can read site_settings" on site_settings;
create policy "public can read site_settings"
  on site_settings for select
  to anon
  using (true);


-- ============================================================
-- 2. SERVICES / PRICING PACKAGES
-- ============================================================
create table if not exists services (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  price          numeric,
  price_note     text default 'Starting at',
  description    text,
  is_popular     boolean default false,
  display_order  int default 0,
  created_at     timestamptz default now()
);

create table if not exists service_features (
  id             uuid primary key default gen_random_uuid(),
  service_id     uuid references services(id) on delete cascade,
  feature        text not null,
  display_order  int default 0
);

alter table services enable row level security;
alter table service_features enable row level security;

drop policy if exists "public can read services" on services;
create policy "public can read services" on services for select to anon using (true);

drop policy if exists "public can read service_features" on service_features;
create policy "public can read service_features" on service_features for select to anon using (true);

-- seed packages
insert into services (name, price, price_note, description, is_popular, display_order) values
  ('Reel Cut',       120,  'Starting at', 'One raw clip turned into a polished vertical reel, ready to post.', false, 1),
  ('Listing Edit',   250,  'Starting at', 'Full walkthrough footage cut into one cinematic listing video.',    true,  2),
  ('Agent Package',  600,  'Starting at', 'A month of branding reels + one listing video, cut and delivered on a schedule.', false, 3)
on conflict do nothing;

-- seed features (looked up by package name, safe to re-run)
insert into service_features (service_id, feature, display_order)
select id, f.feature, f.ord
from services, (values
  ('Reel Cut', 'Up to 60 seconds', 1),
  ('Reel Cut', 'Captions + music sync', 2),
  ('Reel Cut', '1 revision round', 3)
) as f(name, feature, ord)
where services.name = f.name
on conflict do nothing;

insert into service_features (service_id, feature, display_order)
select id, f.feature, f.ord
from services, (values
  ('Listing Edit', 'Drone + walkthrough footage combined', 1),
  ('Listing Edit', 'Color grade + music', 2),
  ('Listing Edit', 'Horizontal + vertical cutdown', 3),
  ('Listing Edit', '2 revision rounds', 4)
) as f(name, feature, ord)
where services.name = f.name
on conflict do nothing;

insert into service_features (service_id, feature, display_order)
select id, f.feature, f.ord
from services, (values
  ('Agent Package', '4 short-form reels / month', 1),
  ('Agent Package', '1 full listing video / month', 2),
  ('Agent Package', 'Priority turnaround', 3),
  ('Agent Package', 'Unlimited minor revisions', 4)
) as f(name, feature, ord)
where services.name = f.name
on conflict do nothing;


-- ============================================================
-- 3. PORTFOLIO / CLIENT WORK
-- ============================================================
create table if not exists portfolio_items (
  id             uuid primary key default gen_random_uuid(),
  title          text not null,
  client_name    text,
  category       text,                 -- e.g. 'Listing Video', 'Agent Reel', 'Drone Edit'
  aspect_ratio   text default '16:9',  -- '16:9' or '9:16'
  video_url      text,                 -- YouTube/Vimeo embed URL or direct .mp4
  thumbnail_url  text,
  is_featured    boolean default true,
  display_order  int default 0,
  created_at     timestamptz default now()
);

alter table portfolio_items enable row level security;
drop policy if exists "public can read portfolio_items" on portfolio_items;
create policy "public can read portfolio_items" on portfolio_items for select to anon using (true);

insert into portfolio_items (title, client_name, category, aspect_ratio, video_url, thumbnail_url, display_order) values
  ('Lakeview Modern Build', 'Sample Client', 'Listing Video', '16:9', '', '', 1),
  ('Downtown Loft Walkthrough', 'Sample Client', 'Listing Video', '16:9', '', '', 2),
  ('Agent Intro Reel', 'Sample Client', 'Agent Reel', '9:16', '', '', 3)
on conflict do nothing;


-- ============================================================
-- 4. STATS
-- ============================================================
create table if not exists stats (
  id             uuid primary key default gen_random_uuid(),
  label          text not null,
  value          text not null,
  display_order  int default 0
);

alter table stats enable row level security;
drop policy if exists "public can read stats" on stats;
create policy "public can read stats" on stats for select to anon using (true);

insert into stats (label, value, display_order) values
  ('Projects delivered', '0', 1),
  ('Avg. turnaround',    '—', 2),
  ('Happy clients',      '0', 3)
on conflict do nothing;
-- edit these values in Table Editor once you have real numbers to show.


-- ============================================================
-- 5. TESTIMONIALS
-- ============================================================
create table if not exists testimonials (
  id             uuid primary key default gen_random_uuid(),
  client_name    text not null,
  client_role    text,     -- e.g. 'Realtor, XYZ Realty'
  quote          text not null,
  display_order  int default 0
);

alter table testimonials enable row level security;
drop policy if exists "public can read testimonials" on testimonials;
create policy "public can read testimonials" on testimonials for select to anon using (true);

-- no seed rows here on purpose — add real ones as you get them.


-- ============================================================
-- 6. FAQ
-- ============================================================
create table if not exists faqs (
  id             uuid primary key default gen_random_uuid(),
  question       text not null,
  answer         text not null,
  display_order  int default 0
);

alter table faqs enable row level security;
drop policy if exists "public can read faqs" on faqs;
create policy "public can read faqs" on faqs for select to anon using (true);

insert into faqs (question, answer, display_order) values
  ('What footage do you need from me?', 'Raw drone and walkthrough clips from your phone or camera — send over Google Drive, Dropbox, or WeTransfer. No special gear required.', 1),
  ('How fast is turnaround?', 'Most edits are delivered in 2–4 business days depending on package. Rush turnaround is available on request.', 2),
  ('Can I request changes after delivery?', 'Yes — every package includes at least one revision round, listed on each package above.', 3)
on conflict do nothing;

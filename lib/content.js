import { getSupabase } from "./supabase";

// Fallback content shown if Supabase env vars aren't set yet, or a table
// is empty. Lets the site render sensibly at every stage of setup.
const FALLBACK_SETTINGS = {
  brand_name: "MODAEDITZ",
  location_label: "Real estate video editing",
  hero_headline: "Footage in. Listings sold.",
  hero_subheadline:
    "Raw walkthroughs and drone clips, cut into cinematic listing videos and scroll-stopping reels.",
  hero_video_url: "",
  hero_poster_url: "",
  showcase_heading: "Recent cuts",
  showcase_subheading: "A few projects straight out of the timeline.",
  primary_cta_label: "View the work",
  primary_cta_url: "#work",
  secondary_cta_label: "See services",
  secondary_cta_url: "#services",
  phone: "",
  email: "",
  instagram_url: "",
  tiktok_url: "",
  youtube_url: "",
};

export async function getSiteSettings() {
  const supabase = getSupabase();
  if (!supabase) return FALLBACK_SETTINGS;

  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (error || !data) return FALLBACK_SETTINGS;
  return { ...FALLBACK_SETTINGS, ...data };
}

export async function getServices() {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("services")
    .select("*, service_features(feature, display_order)")
    .order("display_order", { ascending: true });

  if (error || !data) return [];

  return data.map((service) => ({
    ...service,
    service_features: (service.service_features || []).sort(
      (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)
    ),
  }));
}

export async function getPortfolioItems() {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("portfolio_items")
    .select("*")
    .order("display_order", { ascending: true });

  if (error || !data) return [];
  return data;
}

export async function getStats() {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("stats")
    .select("*")
    .order("display_order", { ascending: true });

  if (error || !data) return [];
  return data;
}

export async function getTestimonials() {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("display_order", { ascending: true });

  if (error || !data) return [];
  return data;
}

export async function getFaqs() {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("display_order", { ascending: true });

  if (error || !data) return [];
  return data;
}

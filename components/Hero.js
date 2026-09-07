export default function Hero({ settings }) {
  const {
    location_label,
    hero_headline,
    hero_subheadline,
    hero_video_url,
    hero_poster_url,
    primary_cta_label,
    primary_cta_url,
    secondary_cta_label,
    secondary_cta_url,
  } = settings;

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-end overflow-hidden bg-ink"
    >
      {hero_video_url ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={hero_video_url}
          poster={hero_poster_url || undefined}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : hero_poster_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={hero_poster_url}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#232025_0%,#0c0c0e_65%)]" />
      )}

      {/* legibility gradient, not decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />

      <div className="relative z-10 w-full mx-auto max-w-6xl px-5 md:px-8 pb-20 pt-40 hero-enter">
        {location_label && (
          <div className="flex items-center gap-2 mb-5 timecode text-xs text-slate">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal" />
            {location_label}
          </div>
        )}

        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-paper max-w-3xl">
          {hero_headline}
        </h1>

        {hero_subheadline && (
          <p className="mt-5 text-base md:text-lg text-slate max-w-xl leading-relaxed">
            {hero_subheadline}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-6">
          {primary_cta_label && (
            <a
              href={primary_cta_url || "#work"}
              className="rounded-full bg-signal text-ink text-sm font-medium px-6 py-3 hover:bg-signal-soft transition-colors"
            >
              {primary_cta_label}
            </a>
          )}
          {secondary_cta_label && (
            <a
              href={secondary_cta_url || "#services"}
              className="text-sm text-paper border-b border-slate-dim pb-0.5 hover:border-paper transition-colors"
            >
              {secondary_cta_label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Results({ stats, testimonials }) {
  const hasStats = stats.length > 0;
  const hasTestimonials = testimonials.length > 0;

  if (!hasStats && !hasTestimonials) return null;

  return (
    <section className="bg-paper text-ink px-5 md:px-8 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        {hasStats && (
          <div className="flex flex-wrap gap-y-8">
            {stats.map((s, i) => (
              <div
                key={s.id}
                className={`flex-1 min-w-[140px] px-6 first:pl-0 ${
                  i !== 0 ? "border-l border-line-light" : ""
                }`}
              >
                <p className="font-display font-bold text-3xl md:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-slate-ink">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {hasTestimonials && (
          <div className={hasStats ? "mt-20" : ""}>
            <div className="flex items-baseline gap-4 mb-2">
              <span className="timecode text-xs text-signal">01:40</span>
              <div className="h-px flex-1 bg-line-light" />
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl">
              What clients say
            </h2>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <div key={t.id} className="flex flex-col">
                  <p className="font-display text-2xl leading-none text-signal">
                    "
                  </p>
                  <p className="text-sm leading-relaxed text-ink/90 -mt-3">
                    {t.quote}
                  </p>
                  <div className="mt-5">
                    <p className="text-sm font-medium">{t.client_name}</p>
                    {t.client_role && (
                      <p className="text-xs text-slate-ink mt-0.5">
                        {t.client_role}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

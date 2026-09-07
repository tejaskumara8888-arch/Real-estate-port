function formatPrice(price) {
  if (price === null || price === undefined) return null;
  const n = Number(price);
  if (Number.isNaN(n)) return null;
  return n.toLocaleString("en-US");
}

export default function Services({ items }) {
  return (
    <section id="services" className="bg-ink px-5 md:px-8 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-baseline gap-4 mb-2">
          <span className="timecode text-xs text-signal">01:00</span>
          <div className="h-px flex-1 bg-line" />
        </div>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-paper">
          Services
        </h2>
        <p className="mt-3 text-slate max-w-md">
          Pick what the listing needs. Everything scales from a single reel
          to an ongoing monthly retainer.
        </p>

        {items.length === 0 ? (
          <p className="mt-12 text-slate-dim text-sm">
            No packages yet — add rows to{" "}
            <code className="timecode">services</code> in Supabase to fill
            this in.
          </p>
        ) : (
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((service) => {
              const price = formatPrice(service.price);
              return (
                <div
                  key={service.id}
                  className={`group flex flex-col rounded-xl p-7 border transition-all duration-300 ease-out hover:-translate-y-1.5 active:-translate-y-1.5 hover:shadow-[0_22px_50px_-22px_rgba(255,75,43,0.45)] active:shadow-[0_22px_50px_-22px_rgba(255,75,43,0.45)] ${
                    service.is_popular
                      ? "border-signal bg-ink-card hover:border-signal-soft active:border-signal-soft"
                      : "border-line bg-ink-soft hover:border-signal/50 active:border-signal/50"
                  }`}
                >
                  {service.is_popular && (
                    <span className="timecode text-[11px] text-signal mb-4">
                      MOST BOOKED
                    </span>
                  )}
                  <h3 className="font-display font-bold text-xl text-paper transition-colors duration-300 group-hover:text-signal-soft group-active:text-signal-soft">
                    {service.name}
                  </h3>
                  {service.description && (
                    <p className="mt-2 text-sm text-slate leading-relaxed">
                      {service.description}
                    </p>
                  )}

                  {price && (
                    <div className="mt-6 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-active:translate-x-0.5">
                      <span className="text-xs text-slate-dim block">
                        {service.price_note || "Starting at"}
                      </span>
                      <span className="font-display font-bold text-3xl text-paper">
                        ₹{price}
                      </span>
                    </div>
                  )}

                  {service.service_features?.length > 0 && (
                    <ul className="mt-6 space-y-2.5 flex-1">
                      {service.service_features.map((f) => (
                        <li
                          key={f.id}
                          className="text-sm text-slate flex gap-2"
                        >
                          <span className="text-signal">—</span>
                          {f.feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  <a
                    href="#contact"
                    className={`mt-8 text-center rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ease-out hover:scale-[1.03] active:scale-[1.03] ${
                      service.is_popular
                        ? "bg-signal text-ink hover:bg-signal-soft active:bg-signal-soft"
                        : "border border-line text-paper hover:border-slate active:border-slate"
                    }`}
                  >
                    Get started
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

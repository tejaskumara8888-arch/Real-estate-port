import PortfolioCard from "./PortfolioCard";

export default function Work({ heading, subheading, items }) {
  return (
    <section id="work" className="bg-ink px-5 md:px-8 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-baseline gap-4 mb-2">
          <span className="timecode text-xs text-signal">00:00</span>
          <div className="h-px flex-1 bg-line" />
        </div>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-paper">
          {heading}
        </h2>
        {subheading && (
          <p className="mt-3 text-slate max-w-md">{subheading}</p>
        )}

        {items.length === 0 ? (
          <p className="mt-12 text-slate-dim text-sm">
            No projects added yet — add rows to{" "}
            <code className="timecode">portfolio_items</code> in Supabase to
            fill this in.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {items.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

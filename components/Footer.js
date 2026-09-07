export default function Footer({ brandName }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink border-t border-line px-5 md:px-8 py-10">
      <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-4">
        <span className="font-display font-bold text-paper">
          {brandName}
        </span>
        <span className="text-xs text-slate-dim">
          © {year} {brandName}. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

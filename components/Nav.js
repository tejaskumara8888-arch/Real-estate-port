"use client";

import { useState } from "react";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav({ brandName, phone }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-line/60 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-5 md:px-8 h-16 flex items-center justify-between">
        <a
          href="#hero"
          className="font-display font-bold text-lg tracking-tight text-paper"
        >
          {brandName}
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-slate">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-paper transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="timecode text-xs text-slate hover:text-paper transition-colors"
            >
              {phone}
            </a>
          )}
          <a
            href="#contact"
            className="rounded-full bg-signal text-ink text-sm font-medium px-4 py-2 hover:bg-signal-soft transition-colors"
          >
            Start a project
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-paper text-sm border border-line rounded-full px-3 py-1.5"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-line bg-ink px-5 py-4 flex flex-col gap-4">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-slate text-base"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="rounded-full bg-signal text-ink text-sm font-medium px-4 py-2 text-center"
          >
            Start a project
          </a>
        </div>
      )}
    </header>
  );
}

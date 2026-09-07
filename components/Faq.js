"use client";

import { useState } from "react";

export default function Faq({ items }) {
  const [openId, setOpenId] = useState(null);

  if (items.length === 0) return null;

  return (
    <section id="faq" className="bg-ink px-5 md:px-8 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-baseline gap-4 mb-2">
          <span className="timecode text-xs text-signal">02:10</span>
          <div className="h-px flex-1 bg-line" />
        </div>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-paper">
          Questions
        </h2>

        <div className="mt-10 divide-y divide-line border-t border-b border-line">
          {items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id}>
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-paper font-medium">
                    {item.question}
                  </span>
                  <span className="timecode text-slate text-lg leading-none shrink-0">
                    {isOpen ? "–" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <p className="pb-5 text-sm text-slate leading-relaxed max-w-xl">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

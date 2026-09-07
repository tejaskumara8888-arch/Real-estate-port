"use client";

import { useState } from "react";
import { getVideoKind, getEmbedUrl } from "@/lib/media";

export default function PortfolioCard({ item }) {
  const [playing, setPlaying] = useState(false);
  const kind = getVideoKind(item.video_url);
  const isVertical = item.aspect_ratio === "9:16";

  const frame = (
    <div
      data-cursor={!playing ? "view" : undefined}
      className={`relative w-full ${
        isVertical ? "aspect-[9/16]" : "aspect-video"
      } overflow-hidden rounded-lg bg-ink-card border border-line transition-all duration-500 ease-out group-hover:border-signal/60 group-active:border-signal/60 group-hover:shadow-[0_20px_45px_-20px_rgba(255,75,43,0.4)] group-active:shadow-[0_20px_45px_-20px_rgba(255,75,43,0.4)]`}
    >
      {playing && (kind === "youtube" || kind === "vimeo" || kind === "drive") && (
        <iframe
          src={getEmbedUrl(item.video_url)}
          title={item.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      )}
      {playing && kind === "file" && (
        <video
          ref={(el) => {
            if (el) el.play().catch(() => {});
          }}
          src={item.video_url}
          controls
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {!playing && (
        <>
          {item.thumbnail_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.thumbnail_url}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-active:scale-110"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-dim text-sm">
              No thumbnail yet
            </div>
          )}
          <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/35 group-active:bg-ink/35 transition-colors duration-500" />
          <span className="absolute bottom-3 left-3 timecode text-[11px] px-2 py-1 rounded bg-ink/70 text-paper border border-line transition-colors duration-300 group-hover:border-signal/60 group-active:border-signal/60">
            {item.aspect_ratio || "16:9"}
          </span>
          {(kind === "youtube" || kind === "vimeo" || kind === "file" || kind === "drive") && (
            <button
              onClick={() => setPlaying(true)}
              aria-label={`Play ${item.title}`}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="w-14 h-14 rounded-full bg-paper/90 flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110 group-active:scale-110 group-hover:bg-signal group-active:bg-signal">
                <span className="ml-0.5 w-0 h-0 border-y-8 border-y-transparent border-l-[14px] border-l-ink transition-colors duration-300 group-hover:border-l-paper group-active:border-l-paper" />
              </span>
            </button>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className="group transition-transform duration-500 ease-out hover:-translate-y-1.5 active:-translate-y-1.5">
      {kind === "link" ? (
        <a href={item.video_url} target="_blank" rel="noreferrer">
          {frame}
        </a>
      ) : (
        frame
      )}
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-paper text-sm font-medium transition-colors duration-300 group-hover:text-signal-soft group-active:text-signal-soft">
            {item.title}
          </p>
          {item.client_name && (
            <p className="text-slate text-xs mt-0.5">{item.client_name}</p>
          )}
        </div>
        {item.category && (
          <span className="timecode text-[11px] text-slate-dim whitespace-nowrap mt-0.5">
            {item.category}
          </span>
        )}
      </div>
    </div>
  );
}

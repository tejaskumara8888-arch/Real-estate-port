export default function Contact({ settings }) {
  const { brand_name, phone, email, instagram_url, tiktok_url, youtube_url } =
    settings;

  const socials = [
    { label: "Instagram", url: instagram_url },
    { label: "TikTok", url: tiktok_url },
    { label: "YouTube", url: youtube_url },
  ].filter((s) => s.url);

  return (
    <section id="contact" className="bg-ink px-5 md:px-8 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-baseline gap-4 mb-2">
          <span className="timecode text-xs text-signal">02:40</span>
          <div className="h-px flex-1 bg-line" />
        </div>

        <h2 className="font-display font-bold text-3xl md:text-4xl text-paper max-w-lg">
          Have footage? Let's cut something worth posting.
        </h2>

        <div className="mt-10 flex flex-wrap gap-x-16 gap-y-8">
          {email && (
            <div>
              <p className="timecode text-xs text-slate-dim mb-2">Email</p>
              <a
                href={`mailto:${email}`}
                className="text-lg text-paper hover:text-signal transition-colors"
              >
                {email}
              </a>
            </div>
          )}
          {phone && (
            <div>
              <p className="timecode text-xs text-slate-dim mb-2">Phone</p>
              <a
                href={`tel:${phone}`}
                className="text-lg text-paper hover:text-signal transition-colors"
              >
                {phone}
              </a>
            </div>
          )}
          {socials.length > 0 && (
            <div>
              <p className="timecode text-xs text-slate-dim mb-2">Follow</p>
              <div className="flex gap-4">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg text-paper hover:text-signal transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {!email && !phone && socials.length === 0 && (
          <p className="mt-6 text-slate-dim text-sm">
            Add a phone, email, or social link to{" "}
            <code className="timecode">site_settings</code> in Supabase to
            fill this in.
          </p>
        )}
      </div>
    </section>
  );
}

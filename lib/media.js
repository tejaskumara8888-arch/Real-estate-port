// A solo editor will paste all kinds of links into the portfolio table —
// a YouTube link (watch, shorts, or shortened), a Vimeo link, a Google
// Drive share link, a direct .mp4 from storage, or an Instagram reel.
// These helpers figure out how to render whatever shows up so the
// portfolio table stays "paste a link and it works."

export function getVideoKind(url) {
  if (!url) return "none";
  const u = url.toLowerCase();
  if (u.includes("youtube.com") || u.includes("youtu.be")) return "youtube";
  if (u.includes("vimeo.com")) return "vimeo";
  if (u.includes("drive.google.com")) return "drive";
  if (/\.(mp4|webm|mov|m4v)(\?.*)?$/.test(u)) return "file";
  return "link"; // e.g. an Instagram reel, TikTok, or anything else
}

export function getEmbedUrl(url) {
  const kind = getVideoKind(url);

  if (kind === "youtube") {
    // Covers: watch?v=ID, youtu.be/ID, /shorts/ID, /embed/ID, /live/ID,
    // with any extra query params (playlist index, timestamps, tracking).
    const patterns = [
      /[?&]v=([a-zA-Z0-9_-]{6,})/,
      /youtu\.be\/([a-zA-Z0-9_-]{6,})/,
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{6,})/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{6,})/,
      /youtube\.com\/live\/([a-zA-Z0-9_-]{6,})/,
    ];
    let id = "";
    for (const re of patterns) {
      const m = url.match(re);
      if (m) {
        id = m[1];
        break;
      }
    }
    return id
      ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`
      : url;
  }

  if (kind === "vimeo") {
    const idMatch =
      url.match(/vimeo\.com\/(?:video\/)?(\d+)/) ||
      url.match(/player\.vimeo\.com\/video\/(\d+)/);
    const id = idMatch ? idMatch[1] : "";
    return id ? `https://player.vimeo.com/video/${id}` : url;
  }

  if (kind === "drive") {
    // Handles both share-link shapes:
    //   https://drive.google.com/file/d/FILE_ID/view?...
    //   https://drive.google.com/open?id=FILE_ID
    const idMatch =
      url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
      url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    const id = idMatch ? idMatch[1] : "";
    return id ? `https://drive.google.com/file/d/${id}/preview` : url;
  }

  return url;
}

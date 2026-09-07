// A solo editor will paste all kinds of links into the portfolio table —
// a YouTube link, a Vimeo link, a direct .mp4 from storage, an Instagram
// reel. These helpers figure out how to render whatever shows up so the
// portfolio table stays "paste a link and it works."

export function getVideoKind(url) {
  if (!url) return "none";
  const u = url.toLowerCase();
  if (u.includes("youtube.com") || u.includes("youtu.be")) return "youtube";
  if (u.includes("vimeo.com")) return "vimeo";
  if (/\.(mp4|webm|mov|m4v)(\?.*)?$/.test(u)) return "file";
  return "link"; // e.g. an Instagram reel, Google Drive share link, etc.
}

export function getEmbedUrl(url) {
  const kind = getVideoKind(url);

  if (kind === "youtube") {
    const idMatch =
      url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?&]+)/);
    const id = idMatch ? idMatch[1] : "";
    return id
      ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`
      : url;
  }

  if (kind === "vimeo") {
    const idMatch = url.match(/vimeo\.com\/(\d+)/);
    const id = idMatch ? idMatch[1] : "";
    return id ? `https://player.vimeo.com/video/${id}` : url;
  }

  return url;
}

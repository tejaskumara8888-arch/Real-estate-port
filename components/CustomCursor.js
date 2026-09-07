"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Site-wide custom cursor: a small signal-red dot with a lagging ring
 * behind it. Any <a>, <button>, or element tagged data-cursor="view"
 * (used on portfolio card frames) makes the ring swell and, for
 * data-cursor targets, show a short label ("VIEW").
 *
 * Only renders on devices with a real mouse (hover + fine pointer).
 * On touch devices this component renders nothing at all — no stray
 * dot/ring sitting in the corner of the screen — and the equivalent
 * tap feedback is handled by the group-active: styles on each card
 * (see PortfolioCard, Process, Services), unlocked by the touchstart
 * listener below.
 */
export default function CustomCursor() {
  const [canHover, setCanHover] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  // iOS Safari only honors the :active pseudo-class (what drives our
  // tap feedback on touch devices) once a touchstart listener exists
  // somewhere on the page. This permanent no-op listener unlocks that
  // sitewide, on every device, so hover-style effects also fire on tap.
  useEffect(() => {
    const noop = () => {};
    document.addEventListener("touchstart", noop, { passive: true });
    return () => document.removeEventListener("touchstart", noop);
  }, []);

  // Detect (and keep watching, in case of e.g. a tablet with a mouse
  // plugged/unplugged mid-session) whether this device has a real
  // hoverable, precise pointer.
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(mq.matches);
    const onChange = (e) => setCanHover(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!canHover) return;

    const root = document.documentElement;
    root.classList.add("custom-cursor-active");

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    const labelFor = (variant) => {
      if (variant === "view") return "VIEW";
      if (variant === "play") return "PLAY";
      return "";
    };

    const onOver = (e) => {
      const target = e.target.closest("a, button, [data-cursor]");
      if (!target) return;
      const variant = target.getAttribute("data-cursor");
      root.classList.add("cursor-hover");
      root.setAttribute("data-cursor-variant", variant || "default");
      label.textContent = labelFor(variant);
    };

    const onOut = (e) => {
      const target = e.target.closest("a, button, [data-cursor]");
      if (!target) return;
      const related = e.relatedTarget;
      if (related && target.contains(related)) return;
      root.classList.remove("cursor-hover");
      root.removeAttribute("data-cursor-variant");
      label.textContent = "";
    };

    const onDown = () => root.classList.add("cursor-down");
    const onUp = () => root.classList.remove("cursor-down");
    const onLeaveWindow = () => root.classList.add("cursor-hidden");
    const onEnterWindow = () => root.classList.remove("cursor-hidden");

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
      root.classList.remove(
        "custom-cursor-active",
        "cursor-hover",
        "cursor-down",
        "cursor-hidden"
      );
      root.removeAttribute("data-cursor-variant");
    };
  }, [canHover]);

  if (!canHover) return null;

  return (
    <div className="cursor-layer" aria-hidden="true">
      <div ref={ringRef} className="cursor-ring">
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}

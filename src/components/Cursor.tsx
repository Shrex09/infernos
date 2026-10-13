import React, { useEffect, useRef, useState } from "react";
import { gsap, isTouch, onScroll } from "../lib/motion";

/**
 * Two-part cursor: a precise dot plus a trailing ring. Elements with
 * `data-cursor="label"` swell the ring and print the label inside it;
 * any link or button just enlarges it.
 */
const Cursor: React.FC = () => {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled] = useState(() => !isTouch());

  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return;
    document.documentElement.classList.add("has-cursor");
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3" });
    const r = ring.current;

    let lastX = -1;
    let lastY = -1;
    const move = (e: PointerEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      r.classList.remove("is-hidden");
    };
    const update = (t: Element | null) => {
      const labelled = t?.closest?.("[data-cursor]");
      const interactive = t?.closest?.("a, button, input, textarea, label, [role='button']");
      const text = labelled?.getAttribute("data-cursor") ?? "";
      setLabel(text);
      r.classList.toggle("is-label", !!text);
      r.classList.toggle("is-hover", !text && !!interactive);
    };
    const over = (e: PointerEvent) => update(e.target as Element | null);
    // Scrolling moves content under a still pointer without firing pointerover,
    // which left labels like "Visit" stuck — re-hit-test once per frame instead
    let raf = 0;
    const rescan = () => {
      if (raf || lastX < 0) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update(document.elementFromPoint(lastX, lastY));
      });
    };
    const offScroll = onScroll(rescan);
    const leave = () => r.classList.add("is-hidden");
    const down = () => r.classList.add("is-down");
    const up = () => r.classList.remove("is-down");

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      offScroll();
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={ring} className="cursor-ring is-hidden" aria-hidden="true">
        <span className="cursor-label">{label}</span>
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
};

export default Cursor;

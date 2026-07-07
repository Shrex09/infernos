import React, { useEffect, useRef, useState } from "react";

/** Reveals an element once it scrolls into view. */
export const useReveal = <T extends HTMLElement = HTMLDivElement>(threshold = 0.15) => {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
};

/** Inline style helper for the reveal transition. */
export const revealStyle = (visible: boolean, delay = 0): React.CSSProperties => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translate3d(0, 0, 0)" : "translate3d(0, 28px, 0)",
  filter: visible ? "blur(0px)" : "blur(6px)",
  transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, filter 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
});

/**
 * Subtle scroll parallax: translates the element vertically at a fraction
 * of the scroll speed. Disabled when the user prefers reduced motion.
 */
export const useParallax = <T extends HTMLElement = HTMLDivElement>(speed = 0.25) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(0, ${(window.scrollY * speed).toFixed(1)}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return ref;
};

/**
 * 3D perspective tilt that follows the cursor.
 * Runs its own rAF loop and eases toward the cursor each frame, so the
 * motion stays fluid instead of fighting a CSS transition on every
 * mousemove event.
 */
export const useTilt = (maxDeg = 9) => {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0, lift: 0 });
  const current = useRef({ x: 0, y: 0, lift: 0 });
  const rafId = useRef(0);
  const running = useRef(false);

  useEffect(() => () => cancelAnimationFrame(rafId.current), []);

  const tick = () => {
    const card = ref.current;
    if (!card) {
      running.current = false;
      return;
    }
    const c = current.current;
    const t = target.current;
    c.x += (t.x - c.x) * 0.14;
    c.y += (t.y - c.y) * 0.14;
    c.lift += (t.lift - c.lift) * 0.14;

    card.style.transform = `perspective(1100px) rotateX(${(-c.y * maxDeg).toFixed(2)}deg) rotateY(${(c.x * maxDeg).toFixed(2)}deg) translate3d(0, ${(-4 * c.lift).toFixed(2)}px, 0)`;
    card.style.boxShadow = `${(-c.x * 24).toFixed(1)}px ${(24 - c.y * 12).toFixed(1)}px 60px -20px rgba(232, 67, 28, ${(0.32 * c.lift).toFixed(3)})`;

    const settled =
      Math.abs(t.x - c.x) < 0.001 &&
      Math.abs(t.y - c.y) < 0.001 &&
      Math.abs(t.lift - c.lift) < 0.002;

    if (settled) {
      running.current = false;
      if (t.lift === 0) {
        // Fully at rest — hand control back to the CSS classes.
        card.style.transform = "";
        card.style.boxShadow = "";
        card.style.transition = "";
        card.style.willChange = "";
        c.x = c.y = c.lift = 0;
      }
      return;
    }
    rafId.current = requestAnimationFrame(tick);
  };

  const start = () => {
    if (running.current) return;
    running.current = true;
    const card = ref.current;
    if (card) {
      card.style.willChange = "transform, box-shadow";
      // transform/box-shadow are driven per-frame; only border keeps a transition
      card.style.transition = "border-color 0.35s ease";
    }
    rafId.current = requestAnimationFrame(tick);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    target.current.x = (e.clientX - rect.left) / rect.width - 0.5;
    target.current.y = (e.clientY - rect.top) / rect.height - 0.5;
    target.current.lift = 1;
    start();
  };

  const onMouseLeave = () => {
    target.current.x = 0;
    target.current.y = 0;
    target.current.lift = 0;
    start();
  };

  return { ref, onMouseMove, onMouseLeave };
};

/** Counts from 0 to target once `start` becomes true. */
export const useCountUp = (target: number, start: boolean, duration = 1800) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return value;
};

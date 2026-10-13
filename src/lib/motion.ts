import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isTouch = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: none), (pointer: coarse)").matches;

let lenis: Lenis | null = null;
type ScrollListener = (y: number, velocity: number) => void;
const listeners = new Set<ScrollListener>();

/** Lenis smooth scroll driven by GSAP's ticker so ScrollTrigger stays in lockstep. */
export const initSmoothScroll = () => {
  if (lenis) return lenis;
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: !prefersReducedMotion(),
  });
  lenis.on("scroll", (l: Lenis) => {
    ScrollTrigger.update();
    listeners.forEach((fn) => fn(l.scroll, l.velocity));
  });
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
};

export const onScroll = (fn: ScrollListener) => {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
};

export const lockScroll = (locked: boolean) => {
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
};

export const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.6 });
  else el.scrollIntoView({ behavior: "smooth" });
};

export const scrollToTop = () => {
  if (lenis) lenis.scrollTo(0, { duration: 1.8 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
};

/* ── Site "ready" signal: the preloader fires it when it lifts ── */
let ready = false;
const READY_EVENT = "inferno:ready";

export const markReady = () => {
  ready = true;
  window.dispatchEvent(new Event(READY_EVENT));
};

export const useSiteReady = () => {
  const [isReady, setReady] = useState(ready);
  useEffect(() => {
    if (ready) {
      setReady(true);
      return;
    }
    const on = () => setReady(true);
    window.addEventListener(READY_EVENT, on);
    return () => window.removeEventListener(READY_EVENT, on);
  }, []);
  return isReady;
};

/** Whether a media query currently matches; re-renders on change. */
export const useMedia = (query: string) => {
  const [match, setMatch] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
};

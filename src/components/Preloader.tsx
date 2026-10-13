import React, { useEffect, useRef, useState } from "react";
import { gsap, markReady, prefersReducedMotion, lockScroll } from "../lib/motion";
import { LogoMark } from "./ui";

/** Ignition sequence: counts to 100, then the curtain lifts and the site reports ready. */
const Preloader: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = prefersReducedMotion();
    lockScroll(true);
    document.documentElement.classList.add("is-loading");

    const counter = { v: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.classList.remove("is-loading");
          lockScroll(false);
          setGone(true);
        },
      });
      tl.to(counter, {
        v: 100,
        duration: reduced ? 0.3 : 2.1,
        ease: "power3.inOut",
        onUpdate: () => setCount(Math.round(counter.v)),
      })
        .to(".pl-bar-fill", { scaleX: 1, duration: reduced ? 0.3 : 2.1, ease: "power3.inOut" }, 0)
        .from(".pl-mark", { scale: 0.6, opacity: 0, duration: 0.9, ease: "expo.out" }, 0)
        .from(".pl-tag span", { yPercent: 110, duration: 0.8, stagger: 0.04, ease: "expo.out" }, 0.2)
        .to(".pl-inner", { yPercent: -30, opacity: 0, duration: 0.7, ease: "power3.in" })
        .add(() => markReady(), "-=0.15")
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: reduced ? 0.3 : 1.05, ease: "expo.inOut" }, "-=0.25");
    }, el);

    return () => {
      ctx.revert();
      document.documentElement.classList.remove("is-loading");
      lockScroll(false);
    };
  }, []);

  if (gone) return null;

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="pl-inner">
        <LogoMark size={64} className="pl-mark" />
        <div className="pl-count">
          {String(count).padStart(3, "0")}
          <span>%</span>
        </div>
        <div className="pl-tag">
          {"Igniting extraordinary".split("").map((c, i) => (
            <span key={i}>{c === " " ? " " : c}</span>
          ))}
        </div>
      </div>
      <div className="pl-bar">
        <div className="pl-bar-fill" />
      </div>
    </div>
  );
};

export default Preloader;

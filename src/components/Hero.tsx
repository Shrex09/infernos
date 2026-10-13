import React, { useEffect, useRef, useState } from "react";
import { gsap, scrollToId, useSiteReady, isTouch } from "../lib/motion";
import { RollButton } from "./ui";

const WORDS = ["products", "platforms", "mobile apps", "storefronts", "experiences"];

/** Vertical slot-machine roll through WORDS. */
const RollingWord: React.FC<{ active: boolean }> = ({ active }) => {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setI((n) => (n + 1) % WORDS.length), 2400);
    return () => clearInterval(id);
  }, [active]);
  return (
    <span className="roll-word" aria-live="off">
      <span className="roll-word-sizer" aria-hidden="true">
        {WORDS.reduce((a, b) => (b.length > a.length ? b : a))}
      </span>
      {WORDS.map((w, n) => (
        <span key={w} className={`roll-word-item ${n === i ? "is-in" : n === (i - 1 + WORDS.length) % WORDS.length ? "is-out" : ""}`}>
          {w}
        </span>
      ))}
    </span>
  );
};

const Hero: React.FC = () => {
  const ready = useSiteReady();
  const root = useRef<HTMLElement>(null);

  // Intro choreography once the preloader lifts
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.set(".hero-line-inner", { yPercent: 115, rotate: 3 });
      gsap.set(".hero-fade", { opacity: 0, y: 24 });
      if (!ready) return;
      gsap
        .timeline({ delay: 0.15 })
        .to(".hero-line-inner", { yPercent: 0, rotate: 0, duration: 1.4, stagger: 0.1, ease: "expo.out" })
        .to(".hero-fade", { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: "power3.out" }, "-=1.0");

      // Headline drifts and dims as you scroll away
      gsap.to(".hero-title", {
        yPercent: -18,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, [ready]);

  // Subtle pointer parallax on the headline lines
  useEffect(() => {
    const el = root.current;
    if (!el || isTouch()) return;
    const lines = Array.from(el.querySelectorAll<HTMLElement>(".hero-line"));
    const setters = lines.map((l) => ({
      x: gsap.quickTo(l, "x", { duration: 1.2, ease: "power3" }),
      y: gsap.quickTo(l, "y", { duration: 1.2, ease: "power3" }),
    }));
    const move = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      setters.forEach((s, i) => {
        s.x(nx * (i + 1) * -10);
        s.y(ny * (i + 1) * -6);
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <section ref={root} className="hero" data-orb="0.48 0.04 1.05 1" data-orb-mobile="0.05 0.42 0.95 1" aria-label="Introduction">
      <div className="hero-top hero-fade">
        <span className="hero-meta">IT Solutions — Sangli, IN</span>
      </div>

      <h1 className="hero-title">
        <span className="hero-line">
          <span className="hero-line-inner">We forge</span>
        </span>
        <span className="hero-line">
          <span className="hero-line-inner">
            digital <em className="serif-accent"><RollingWord active={ready} /></em>
          </span>
        </span>
        <span className="hero-line">
          <span className="hero-line-inner">that scale.</span>
        </span>
      </h1>

      <div className="hero-bottom">
        <p className="hero-sub hero-fade">
          Full-stack web platforms, mobile apps and e-commerce systems — designed, engineered and shipped to
          production by a team that treats your product like its own.
        </p>
        <div className="hero-actions hero-fade">
          <RollButton onClick={() => scrollToId("contact")}>Start a project</RollButton>
          <RollButton variant="ghost" onClick={() => scrollToId("work")} arrow={false}>
            View our work
          </RollButton>
        </div>
      </div>

      <button className="scroll-cue hero-fade" onClick={() => scrollToId("about")} aria-label="Scroll to explore">
        <span className="scroll-cue-line" />
        <span>Scroll to explore</span>
      </button>
    </section>
  );
};

export default Hero;

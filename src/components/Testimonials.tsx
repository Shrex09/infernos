import React, { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { testimonials } from "../data";
import { Eyebrow } from "./ui";

const DURATION = 8;

const Testimonials: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = testimonials[i];

  // Auto-advance, with the active tab's bar acting as the timer
  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const bar = root.current?.querySelector<HTMLElement>(`.tq-tab[data-i="${i}"] .tq-tab-fill`);
    if (!bar) return;
    const tw = gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: DURATION, ease: "none", onComplete: () => setI((n) => (n + 1) % testimonials.length) });
    return () => {
      tw.kill();
      gsap.set(bar, { scaleX: 0 });
    };
  }, [i, paused]);

  // Words rise in whenever the quote changes
  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(".tq-word", { yPercent: 100, opacity: 0, duration: 0.9, stagger: 0.012, ease: "expo.out" });
      gsap.from(".tq-person > *", { y: 16, opacity: 0, duration: 0.7, stagger: 0.06, ease: "power3.out", delay: 0.2 });
    }, el);
    return () => ctx.revert();
  }, [i]);

  return (
    <section
      ref={root}
      className="section testimonials"
      data-orb="0.75 0.15 0.55 0.5"
      data-orb-mobile="0.8 -0.8 0.35 0.3"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container">
        <Eyebrow index="(06)">Client voices</Eyebrow>

        <div className="tq" ref={quoteRef} key={i}>
          <span className="tq-mark" aria-hidden="true">“</span>
          <blockquote className="tq-quote">
            {t.quote.split(" ").map((w, n) => (
              <React.Fragment key={n}>
                <span className="sw-mask">
                  <span className="tq-word">{w}</span>
                </span>{" "}
              </React.Fragment>
            ))}
          </blockquote>
          <div className="tq-person">
            <img src={t.logo} alt="" className="tq-logo" loading="lazy" />
            <div>
              <span className="tq-name">{t.name}</span>
              <span className="tq-role">
                {t.role} · {t.company}
              </span>
            </div>
            <span className="tq-result">{t.result}</span>
          </div>
        </div>

        <div className="tq-tabs" role="tablist" aria-label="Choose testimonial">
          {testimonials.map((x, n) => (
            <button
              key={x.company}
              role="tab"
              aria-selected={n === i}
              className={`tq-tab ${n === i ? "is-active" : ""}`}
              data-i={n}
              onClick={() => setI(n)}
            >
              <span className="tq-tab-num">0{n + 1}</span>
              <span className="tq-tab-name">{x.company}</span>
              <span className="tq-tab-bar">
                <span className="tq-tab-fill" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

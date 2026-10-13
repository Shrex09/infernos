import React, { useEffect, useRef } from "react";
import { gsap } from "../lib/motion";
import { stats } from "../data";

/** The core swells to centre stage here; glass tiles float in front of it. */
const Stats: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".stat-value-num").forEach((num) => {
        const target = Number(num.dataset.target);
        const o = { v: 0 };
        gsap.to(o, {
          v: target,
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: { trigger: num, start: "top 85%" },
          onUpdate: () => (num.textContent = String(Math.round(o.v))),
        });
      });
      gsap.from(".stat", {
        y: 70,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".stats-grid", start: "top 85%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section stats" data-orb="0 0 1.1 1" data-orb-mobile="0 0 1.3 0.9" aria-label="Studio in numbers">
      <div className="container">
        <p className="stats-kicker" data-reveal>
          Small team. <em className="serif-accent">Serious output.</em>
        </p>
        <div className="stats-grid">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <span className="stat-value">
                <span className="stat-value-num" data-target={s.target}>
                  0
                </span>
                <span className="stat-suffix">{s.suffix}</span>
              </span>
              <span className="stat-label">{s.label}</span>
              <span className="stat-note">{s.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

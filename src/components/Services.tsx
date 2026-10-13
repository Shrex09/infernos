import React, { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/motion";
import { services } from "../data";
import { Eyebrow } from "./ui";

/** Big-type index of services; the active row expands and an ember fill sweeps in. */
const Services: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(".svc-row", {
        y: 50,
        opacity: 0,
        duration: 1.1,
        stagger: 0.07,
        ease: "expo.out",
        scrollTrigger: { trigger: ".svc-list", start: "top 85%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={root} className="section services" data-orb="0.6 0.05 0.5 0.4" data-orb-mobile="-1.15 -0.7 0.35 0.3">
      <div className="container">
        <div className="svc-head">
          <Eyebrow index="(03)">Capabilities</Eyebrow>
          <h2 className="display-lg" data-split>
            What we <em className="serif-accent">build</em> for you
          </h2>
          <p className="lead" data-reveal>
            One team across design, engineering and launch — so nothing gets lost in a hand-off.
          </p>
        </div>

        <ul className="svc-list">
          {services.map((s, i) => {
            const open = active === i;
            return (
              <li key={s.title} className={`svc-row ${open ? "is-open" : ""}`} onMouseEnter={() => setActive(i)}>
                <button className="svc-trigger" onClick={() => setActive(i)} aria-expanded={open}>
                  <span className="svc-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="svc-title">{s.title}</span>
                  <span className="svc-plus" aria-hidden="true" />
                </button>
                <div className="svc-body">
                  <div className="svc-body-inner">
                    <p>{s.description}</p>
                    <div className="svc-tags">
                      {s.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Services;

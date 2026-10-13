import React, { useEffect, useRef } from "react";
import { gsap } from "../lib/motion";
import { Eyebrow } from "./ui";

const MANIFESTO =
  "Infernos is a product studio from Sangli. We design, engineer and ship web platforms, mobile apps and e-commerce systems — and we treat every product we touch like it's our own.";

const HOT = new Set(["design,", "engineer", "ship", "our", "own."]);

const pillars = [
  { title: "Mission-driven", desc: "We measure success by your business outcome — not by hours billed or features shipped." },
  { title: "Collaborative", desc: "You get a direct line to the engineers building your product — no layers, no account managers." },
  { title: "Innovation-first", desc: "We stay ahead of technology trends and bring you options — with honest trade-off analysis." },
  { title: "Quality assured", desc: "Every release passes functional, performance and security checks before it reaches your users." },
];

const About: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      // Each word ignites as the paragraph scrolls through the viewport
      gsap.fromTo(
        ".mf-word",
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: { trigger: ".manifesto", start: "top 80%", end: "bottom 45%", scrub: true },
        }
      );
      gsap.from(".pillar", {
        y: 60,
        opacity: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".pillars", start: "top 85%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="section about" data-orb="0.74 -0.2 0.6 0.55" data-orb-mobile="0.7 -0.6 0.45 0.4">
      <div className="container">
        <Eyebrow index="(01)">Who we are</Eyebrow>
        <p className="manifesto">
          {MANIFESTO.split(" ").map((w, i) => (
            <span key={i} className={`mf-word ${HOT.has(w) ? "mf-hot" : ""}`}>
              {w}{" "}
            </span>
          ))}
        </p>

        <div className="pillars">
          {pillars.map((p, i) => (
            <div className="pillar" key={p.title}>
              <span className="pillar-num">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

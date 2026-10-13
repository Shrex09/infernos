import React, { useEffect, useRef } from "react";
import { gsap } from "../lib/motion";
import { phases } from "../data";
import { Eyebrow } from "./ui";

/** Sticky stacked cards: each phase slides over the last, which recedes into depth. */
const Process: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".pcard");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        // Explicit start values: tweening filter from "none" makes GSAP start at brightness(0)
        gsap.fromTo(
          card.querySelector(".pcard-inner"),
          { scale: 1, rotateX: 0, filter: "brightness(1)" },
          {
            scale: 0.9,
            rotateX: 8,
            filter: "brightness(0.45)",
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1],
              // Recede only once the next card actually starts to cover this one (it reaches this
              // card's bottom edge), not as soon as it appears; on phones the cards are short, so
              // the old "top bottom" start dimmed the card you were still reading
              start: () => `top ${parseFloat(getComputedStyle(card).top) + card.offsetHeight}px`,
              end: "top 18%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });
      gsap.utils.toArray<HTMLElement>(".pcard-fuse").forEach((f) => {
        gsap.fromTo(f, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: f, start: "top 85%", end: "top 30%", scrub: true } });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={root} className="section process" data-orb="-0.85 -0.55 0.5 0.45" data-orb-mobile="0.8 -0.85 0.3 0.3">
      <div className="container">
        <div className="process-head">
          <Eyebrow index="(05)">Process</Eyebrow>
          <h2 className="display-lg" data-split>
            Transparent from <em className="serif-accent">kickoff to launch</em>
          </h2>
        </div>

        <div className="pstack">
          {phases.map((p, i) => (
            <article className="pcard" key={p.num} style={{ top: `calc(12vh + ${i * 18}px)` }}>
              <div className="pcard-inner">
                <div className="pcard-left">
                  <span className="pcard-num">{p.num}</span>
                  <span className="pcard-name">{p.name}</span>
                </div>
                <div className="pcard-right">
                  <h3>{p.heading}</h3>
                  <p>{p.description}</p>
                  <ul className="pcard-deliv">
                    {p.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  <code className="pcard-code">
                    <span className="pcard-prompt">$</span> {p.code}
                  </code>
                </div>
                <div className="pcard-fuse" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;

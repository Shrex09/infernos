import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsap, isTouch } from "../lib/motion";
import { team, dailyShuffle, Member } from "../data";
import { Eyebrow } from "./ui";

/** Amit's id in data.ts */
const LEAD_ID = "p2";

const PlayerCard: React.FC<{ m: Member; slot: number }> = ({ m, slot }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || isTouch()) return;
    const inner = el.querySelector<HTMLElement>(".player-inner")!;
    const rx = gsap.quickTo(inner, "rotateX", { duration: 0.7, ease: "power3" });
    const ry = gsap.quickTo(inner, "rotateY", { duration: 0.7, ease: "power3" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      ry((px - 0.5) * 16);
      rx(-(py - 0.5) * 12);
      inner.style.setProperty("--px", `${px * 100}%`);
      inner.style.setProperty("--py", `${py * 100}%`);
    };
    const leave = () => {
      rx(0);
      ry(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`player ${open ? "is-open" : ""}`}
      style={{ ["--pc" as string]: m.color }}
      onClick={() => setOpen((o) => !o)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setOpen((o) => !o))}
      tabIndex={0}
      role="button"
      aria-expanded={open}
      aria-label={`${m.name}, ${m.role}. Show details`}
    >
      <div className="player-inner">
        <div className="player-photo">
          <img src={m.avatar} alt={m.name} loading="lazy" />
        </div>
        <div className="player-holo" />
        <span className="player-slot">P{slot}</span>
        <div className="player-base">
          <span className="player-name">{m.name}</span>
          <span className="player-role">{m.role}</span>
          {/* Expands under the name on hover/tap; the photo stays visible above it */}
          <div className="player-detail">
            <div className="player-detail-inner">
              <p>{m.bio}</p>
              <div className="player-stats">
                {m.stats.map((s) => (
                  <div className="pstat" key={s.label}>
                    <span className="pstat-label">{s.label}</span>
                    <span className="pstat-bar">
                      <span style={{ width: `${s.value}%` }} />
                    </span>
                    <span className="pstat-val">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Team: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  // Amit always leads as P1; everyone else reshuffles once a day
  const roster = useMemo(() => {
    const lead = team.filter((m) => m.id === LEAD_ID);
    return [...lead, ...dailyShuffle(team.filter((m) => m.id !== LEAD_ID))];
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(".player", {
        y: 90,
        opacity: 0,
        rotateX: -20,
        duration: 1.2,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: ".team-grid", start: "top 85%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="team" ref={root} className="section team" data-orb="1.02 -0.55 0.45 0.35" data-orb-mobile="0.9 0.9 0.25 0.25">
      <div className="container">
        <div className="team-head">
          <div>
            <Eyebrow index="(07)">The crew</Eyebrow>
            <h2 className="display-lg" data-split>
              Choose your <em className="serif-accent">player</em>
            </h2>
          </div>
          <p className="lead" data-reveal>
            Seven builders, one squad. Hover or tap a card to see their stats — the line-up behind P1 reshuffles
            every day.
          </p>
        </div>
        <div className="team-grid">
          {roster.map((m, i) => (
            <PlayerCard key={m.id} m={m} slot={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;

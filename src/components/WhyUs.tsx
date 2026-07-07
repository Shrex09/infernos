import React from "react";
import { useReveal, revealStyle, useTilt } from "../hooks";

const ic = (d: string) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const pillars = [
  {
    icon: ic("M12 2v4M12 18v4M2 12h4M18 12h4M12 8a4 4 0 110 8 4 4 0 010-8z"),
    title: "Mission-driven",
    desc: "We measure success by your business outcome — not by hours billed or features shipped.",
  },
  {
    icon: ic("M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 3a4 4 0 110 8 4 4 0 010-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"),
    title: "Collaborative",
    desc: "You get a direct line to the engineers building your product — no layers, no account managers.",
  },
  {
    icon: ic("M9 18h6M10 22h4M12 2a7 7 0 014 12.7c-.6.5-1 1.2-1 2V17H9v-.3c0-.8-.4-1.5-1-2A7 7 0 0112 2z"),
    title: "Innovation-first",
    desc: "We stay ahead of technology trends and bring you options — with honest trade-off analysis.",
  },
  {
    icon: ic("M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4"),
    title: "Quality assured",
    desc: "Every release passes functional, performance and security checks before it reaches your users.",
  },
];

const commitments = [
  "Built by developers who've been on the client side too",
  "We speak business first, technology second",
  "From idea to deployment fast — without cutting corners",
  "Your code lives in your repository from day one",
];

const PillarCard: React.FC<{ pillar: typeof pillars[number]; index: number; visible: boolean }> = ({ pillar, index, visible }) => {
  const { ref, onMouseMove, onMouseLeave } = useTilt(8);
  return (
    <div style={{ ...revealStyle(visible, index * 100), perspective: 1100 }}>
      <div
        ref={ref}
        className="glass hover-glow"
        style={styles.card}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <div style={styles.iconRing}>{pillar.icon}</div>
        <h3 style={styles.cardTitle}>{pillar.title}</h3>
        <p style={styles.cardDesc}>{pillar.desc}</p>
      </div>
    </div>
  );
};

const WhyUs: React.FC = () => {
  const head = useReveal();
  const grid = useReveal();
  const list = useReveal();

  return (
    <section id="why" className="section" style={styles.section}>
      <div className="section-inner">
        <div style={styles.layout}>
          {/* Left: heading + commitments */}
          <div style={styles.leftCol}>
            <div ref={head.ref} style={{ ...styles.header, ...revealStyle(head.visible) }}>
              <span className="kicker">Why Infernos</span>
              <h2 className="section-heading">
                Built on <span className="text-gradient">trust</span>, proven by delivery
              </h2>
              <p className="section-sub">
                Working with an agency shouldn't feel like a gamble. Here's how
                we keep it predictable.
              </p>
            </div>

            <div ref={list.ref} style={styles.commitList}>
              {commitments.map((c, i) => (
                <div key={c} style={{ ...styles.commitItem, ...revealStyle(list.visible, i * 90) }}>
                  <span style={styles.commitCheck}>✓</span>
                  <span style={styles.commitText}>{c}</span>
                </div>
              ))}
            </div>

            <button
              className="btn-ghost"
              style={{ alignSelf: "flex-start" }}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Talk to the team →
            </button>
          </div>

          {/* Right: pillar cards */}
          <div ref={grid.ref} style={styles.grid}>
            {pillars.map((p, i) => (
              <PillarCard key={p.title} pillar={p} index={i} visible={grid.visible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: "var(--bg)",
  },
  layout: {
    display: "flex",
    gap: 64,
    alignItems: "center",
    flexWrap: "wrap",
  },
  leftCol: {
    flex: "1 1 400px",
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  commitList: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  commitItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 14,
  },
  commitCheck: {
    width: 24,
    height: 24,
    borderRadius: 8,
    background: "rgba(255, 106, 43, 0.12)",
    border: "1px solid rgba(255, 106, 43, 0.35)",
    color: "var(--accent-bright)",
    fontSize: 13,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
  commitText: {
    fontSize: 16.5,
    lineHeight: 1.55,
    color: "var(--muted)",
  },
  grid: {
    flex: "1 1 460px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    gap: 20,
  },
  card: {
    padding: 26,
    display: "flex",
    flexDirection: "column",
    gap: 14,
    height: "100%",
  },
  iconRing: {
    width: 48,
    height: 48,
    borderRadius: 13,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ff9357",
    background: "linear-gradient(145deg, rgba(255, 90, 30, 0.18), rgba(255, 165, 60, 0.06))",
    border: "1px solid rgba(255, 130, 55, 0.3)",
  },
  cardTitle: {
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: 16.5,
    color: "var(--text)",
  },
  cardDesc: {
    fontSize: 14,
    lineHeight: 1.6,
    color: "var(--muted)",
  },
};

export default WhyUs;

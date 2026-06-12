import React from "react";
import { useReveal, revealStyle } from "../hooks";

const groups = [
  {
    label: "frontend/",
    items: ["React", "TypeScript", "Next.js", "Vite", "Tailwind"],
  },
  {
    label: "backend/",
    items: ["Node.js", "Express", "Python", "REST APIs", "WebSockets"],
  },
  {
    label: "data/",
    items: ["MongoDB", "PostgreSQL", "Firebase", "Redis"],
  },
  {
    label: "deploy/",
    items: ["Vercel", "AWS", "Docker", "Git", "CI/CD"],
  },
];

const TechStack: React.FC = () => {
  const head = useReveal();
  const body = useReveal();

  return (
    <section id="stack" className="section grid-bg" style={styles.section}>
      <div style={styles.topFade} />
      <div style={styles.bottomFade} />
      <div className="section-inner">
        <div ref={head.ref} style={{ ...styles.header, ...revealStyle(head.visible) }}>
          <span className="kicker">Technology</span>
          <h2 className="section-heading">
            The stack behind <span className="text-gradient">our delivery</span>
          </h2>
          <p className="section-sub">
            Battle-tested tools, chosen per project — not hype-driven. Every
            choice is justified by performance, maintainability and your budget.
          </p>
        </div>

        <div ref={body.ref} style={styles.grid}>
          {groups.map((g, gi) => (
            <div
              key={g.label}
              className="glass hover-glow"
              style={{ ...styles.groupCard, ...revealStyle(body.visible, gi * 100) }}
            >
              <div style={styles.groupHead}>
                <span style={styles.folderIcon}>▸</span>
                <span style={styles.groupLabel}>{g.label}</span>
              </div>
              <div style={styles.itemList}>
                {g.items.map((item) => (
                  <div key={item} style={styles.item}>
                    <span style={styles.itemDot} />
                    <span style={styles.itemName}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ ...styles.noteRow, ...revealStyle(body.visible, 450) }}>
          <span className="status-dot" />
          <span style={styles.noteText}>
            All systems we ship include version control, staging environments and automated deploys.
          </span>
        </div>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: "var(--bg-2)",
    overflow: "hidden",
  },
  topFade: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    background: "linear-gradient(180deg, var(--bg), transparent)",
    pointerEvents: "none",
  },
  bottomFade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    background: "linear-gradient(0deg, var(--bg), transparent)",
    pointerEvents: "none",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
    marginBottom: 56,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 22,
  },
  groupCard: {
    padding: "26px 26px 30px",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  groupHead: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    paddingBottom: 14,
    borderBottom: "1px solid rgba(255,255,255,0.07)",
  },
  folderIcon: {
    color: "var(--amber)",
    fontSize: 14,
  },
  groupLabel: {
    fontFamily: "var(--font-mono)",
    fontWeight: 600,
    fontSize: 15,
    color: "#ffc296",
    letterSpacing: "0.04em",
  },
  itemList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  itemDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #e8431c, #ffa53c)",
    boxShadow: "0 0 8px rgba(255, 130, 55, 0.7)",
    flexShrink: 0,
  },
  itemName: {
    fontSize: 15,
    color: "rgba(245, 238, 230, 0.82)",
    fontWeight: 500,
  },
  noteRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginTop: 40,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  noteText: {
    fontFamily: "var(--font-mono)",
    fontSize: 13,
    color: "var(--muted)",
    textAlign: "center",
  },
};

export default TechStack;

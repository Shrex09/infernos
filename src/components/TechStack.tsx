import React from "react";
import { useReveal, revealStyle } from "../hooks";

interface TechLogo {
  name: string;
  icon: React.ReactNode;
}

const techLogos: TechLogo[] = [
  {
    name: "Flutter",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M14.314 0L2.3 12 6 15.7 21.714 0h-7.4z" fill="#54C5F8" />
        <path d="M14.286 9.886L7.371 16.8 11.086 20.514 18 13.6l-3.714-3.714z" fill="#29B6F6" />
        <path d="M11.086 20.514L14.8 24.229 22.2 16.829 18.486 13.114l-7.4 7.4z" fill="#01579B" />
        <path d="M14.286 17.314l3.714-3.714 3.714 3.714-3.714 3.715-3.714-3.715z" fill="#00B0FF" />
      </svg>
    ),
  },
  {
    name: "React",
    icon: (
      <svg width="18" height="18" viewBox="-11.5 -10.232 23 20.463" fill="none">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: "TypeScript",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M11 8.5H5v1.8h2v6.7h2v-6.7h2V8.5zm3.8 5.7c.4.3.9.5 1.5.5.7 0 1.1-.3 1.1-.8 0-.5-.3-.7-1.1-1l-.6-.2c-1.1-.4-1.6-.9-1.6-1.8 0-1.2.9-1.9 2.3-1.9.8 0 1.4.2 1.8.5l-.5 1.4c-.3-.2-.7-.4-1.3-.4-.5 0-.9.2-.9.6 0 .4.3.6 1 .9l.6.2c1.2.4 1.7 1 1.7 1.9 0 1.3-.9 2-2.5 2-.8 0-1.6-.2-2-.6l.6-1.3z" fill="#FFF" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="11" fill="var(--text)" />
        <path d="M16.5 17.5L8.5 7h-1.5v10h1.5V9.8l7.2 9.2c.3-.5.6-1 .8-1.5z" fill="var(--bg)" />
        <path d="M14.5 7h1.5v6.5h-1.5z" fill="var(--bg)" />
      </svg>
    ),
  },
  {
    name: "Vite",
    icon: (
      <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
        <path d="M29.6 4.9L16.7 28.5c-.3.6-1.1.6-1.4 0L2.4 4.9c-.4-.7.2-1.5 1-1.4l12.4 2.3c.1 0 .3 0 .4 0l12.4-2.3c.8-.1 1.4.7 1 1.4z" fill="url(#vite-pill-grad)" />
        <path d="M21.7 3.5L11.2 18.2h5.1l-2.6 8.3 9.8-14.8h-5.1l3.3-8.2z" fill="#FFD62E" />
        <defs>
          <linearGradient id="vite-pill-grad" x1="2" y1="3" x2="30" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#41D1FF" />
            <stop offset="1" stopColor="#BD34FE" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Tailwind",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#06B6D4">
        <path d="M12 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.4 1 1 2.2 2.1 4.6 2.1 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.4-1-1-2.2-2.1-4.6-2.1zm-5 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.4 1 1 2.2 2.1 4.6 2.1 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.4-1-1-2.2-2.1-4.6-2.1z" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    icon: (
      <svg width="18" height="18" viewBox="0 0 32 32" fill="#5FA04E">
        <path d="M16 2.5l12 6.9v13.8l-12 6.9-12-6.9V9.4L16 2.5zm0 3.3L6.8 11v10.1L16 26.3l9.2-5.3V11L16 5.8z" />
        <path d="M16 10.5c-3.1 0-5.3 1.8-5.3 4.3 0 3.8 6.5 2.3 6.5 4.7 0 .7-.6 1.1-1.6 1.1-1.3 0-2.3-.5-3.2-1.3l-1.3 1.8c1.2 1.1 2.7 1.7 4.5 1.7 3.3 0 5.4-1.8 5.4-4.4 0-4-6.5-2.5-6.5-4.8 0-.6.5-1 1.4-1 1.1 0 2 .4 2.8 1l1.2-1.8c-1.1-.8-2.4-1.3-3.9-1.3z" />
      </svg>
    ),
  },
  {
    name: "Express",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--text)">
        <path d="M18.8 6h-2.8L13.8 11 11.6 6H8.8l3.6 7.4L8.8 21h2.8l2.2-5.2 2.2 5.2h2.8l-3.6-7.6L18.8 6zM5.5 6H2v15h3.5c3.3 0 5.5-2.5 5.5-6s-2.2-6-5.5-6zm0 9.8H3.8V8.2h1.7c2.2 0 3.6 1.5 3.6 3.8s-1.4 3.8-3.6 3.8z" />
      </svg>
    ),
  },
  {
    name: "Python",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M11.9 2c-5.2 0-4.9 2.3-4.9 2.3l.01 2.3h5V7.4H5.2S2 7 2 12.3s2.8 5.1 2.8 5.1h1.7v-2.4s-.1-2.8 2.8-2.8h4.9s2.7.1 2.7-2.6V4.6S17.4 2 11.9 2zM9.5 3.7a.8.8 0 110 1.6.8.8 0 010-1.6z" fill="#387EB8" />
        <path d="M12.1 22c5.2 0 4.9-2.3 4.9-2.3l-.01-2.3h-5v-.8h6.8s3.2.4 3.2-4.9-2.8-5.1-2.8-5.1h-1.7v2.4s.1 2.8-2.8 2.8h-4.9s-2.7-.1-2.7 2.6v4.7s-.5 2.6 5 2.6zm2.4-1.7a.8.8 0 110-1.6.8.8 0 010-1.6z" fill="#FFE052" />
      </svg>
    ),
  },
  {
    name: "REST APIs",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 11a9 9 0 0 1 9 9" />
        <path d="M4 4a16 16 0 0 1 16 16" />
        <circle cx="5" cy="19" r="1" fill="#FF6B6B" />
      </svg>
    ),
  },
  {
    name: "WebSockets",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    name: "MongoDB",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#47A248">
        <path d="M12 1.5s-.8 1.4-1.2 2.3c-1.5 3.5-3.3 7-3.3 11 0 4.4 2.8 7.7 4.5 9.2.3-.3.5-.6.8-1 .4-1.6 1.4-3.3 1.4-5.3V8.8l-2.2 8.9v-7.1l2.2-4.2V1.5zm.3 22.5c1.7-1.5 4.5-4.8 4.5-9.2 0-4-1.8-7.5-3.3-11-.4-.9-1.2-2.3-1.2-2.3v17.2c0 2 1 3.7 1.4 5.3h-1.4z" />
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#336791">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
  },
  {
    name: "Firebase",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M4.6 17.5L7 2.8a.7.7 0 011.3-.2l3.4 6.3-7.1 8.6z" fill="#FFA000" />
        <path d="M12.7 9.5l2.4-4.5a.7.7 0 011.3 0l4.9 12.5-8.6-8z" fill="#F57C00" />
        <path d="M3.7 18.2l7.6 4.3a1.4 1.4 0 001.4 0l7.6-4.3L17.2 3.6a.7.7 0 00-1.2-.2L3.7 18.2z" fill="#FFCA28" />
      </svg>
    ),
  },
  {
    name: "Redis",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#DC382D">
        <path d="M1.5 8.5l10.5-5 10.5 5-10.5 5-10.5-5zm0 4.5l10.5 5 10.5-5v3.5l-10.5 5-10.5-5V13zm0 4.5l10.5 5 10.5-5v3.5l-10.5 5-10.5-5V17.5z" />
      </svg>
    ),
  },
  {
    name: "Vercel",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--text)">
        <path d="M12 2L24 22H0L12 2Z" />
      </svg>
    ),
  },
  {
    name: "AWS",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF9900">
        <path d="M18.8 17.2c-2.4 1.8-5.7 2.8-8.8 2.8-4.3 0-8.2-1.6-11.1-4.2-.2-.2 0-.5.3-.4 3.1 1.7 6.9 2.7 10.8 2.7 2.8 0 5.8-.8 8.4-2.3.4-.3.8.2.4.4zm1.4-1.2c-.3-.4-1.9-.2-2.9-.1-.3 0-.3-.3-.1-.5 1.5-1.1 4-1.1 4.3-.7.3.4-.2 2.9-1.6 4.1-.2.2-.5.1-.4-.2.4-.9.9-2.3.7-2.6zM8.3 6.9h2.2l3.4 9h-2.1l-.7-2H7.9l-.7 2H5.1l3.2-9zm2.2 5.5l-.9-2.7c-.1-.4-.3-.9-.4-1.3h-.1c-.1.4-.3.9-.4 1.3l-.9 2.7h2.7z" />
      </svg>
    ),
  },
  {
    name: "Docker",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#2496ED">
        <path d="M13.98 9.58h2.12v2.12h-2.12zm-3.18 0h2.12v2.12h-2.12zm-3.18 0h2.12v2.12H7.62zm-3.18 0h2.12v2.12H4.44zm6.36-3.18h2.12v2.12h-2.12zm-3.18 0h2.12v2.12H7.62zm9.54 0h2.12v2.12h-2.12zm-3.18-3.18h2.12v2.12h-2.12zm9.54 7.42c-.53-.32-1.7-.42-2.54-.11-.32-1.38-1.59-1.91-1.59-1.91s-.64 1.17-.11 2.33c-.74.42-1.91.42-2.33.42H1.27c-.42 2.33.32 5.09 2.33 6.68 2.33 1.8 5.62 1.8 8.48 1.8 4.24 0 7.85-1.91 9.54-5.73.95-.21 2.23-.74 2.38-2.65v-.85h-1.92z" />
      </svg>
    ),
  },
  {
    name: "Git",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#F05032">
        <path d="M21.7 10.9L13.1 2.3a2.4 2.4 0 00-3.4 0L7.5 4.5l3.2 3.2a2.3 2.3 0 012.9 2.9l3.1 3.1a2.3 2.3 0 11-1.3 1.2l-2.8-2.8v4.5a2.3 2.3 0 11-1.8 0V12a2.3 2.3 0 01-1.2-3L6.3 5.7 2.3 9.7a2.4 2.4 0 000 3.4l8.6 8.6a2.4 2.4 0 003.4 0l7.4-7.4a2.4 2.4 0 000-3.4z" />
      </svg>
    ),
  },
];

const groups = [
  {
    label: "frontend/",
    items: ["Flutter", "React", "TypeScript", "Next.js", "Vite", "Tailwind"],
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

        {/* Small moving row of tech stack logos (moving left to right) */}
        <div style={{ ...styles.logoMarqueeWrap, ...revealStyle(head.visible, 120) }}>
          <div style={styles.fadeLeft} />
          <div style={styles.fadeRight} />
          <div className="marquee-track-reverse">
            {[...techLogos, ...techLogos].map((tech, i) => (
              <div key={i} style={styles.techPill}>
                <span style={styles.techIcon}>{tech.icon}</span>
                <span style={styles.techName}>{tech.name}</span>
              </div>
            ))}
          </div>
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
    marginBottom: 36,
  },
  logoMarqueeWrap: {
    position: "relative",
    overflow: "hidden",
    marginBottom: 46,
    padding: "8px 0",
    borderRadius: 14,
    background: "var(--surface)",
    border: "1px solid var(--border)",
    boxShadow: "0 4px 20px -8px rgba(0,0,0,0.06)",
  },
  fadeLeft: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 80,
    background: "linear-gradient(90deg, var(--surface), transparent)",
    zIndex: 2,
    pointerEvents: "none",
  },
  fadeRight: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 80,
    background: "linear-gradient(270deg, var(--surface), transparent)",
    zIndex: 2,
    pointerEvents: "none",
  },
  techPill: {
    display: "flex",
    alignItems: "center",
    gap: 9,
    padding: "6px 16px",
    margin: "0 7px",
    borderRadius: 999,
    background: "var(--surface-2)",
    border: "1px solid var(--border)",
    flexShrink: 0,
    userSelect: "none",
    transition: "transform 0.2s ease, border-color 0.2s ease",
  },
  techIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
  },
  techName: {
    fontFamily: "var(--font-mono)",
    fontSize: 13,
    fontWeight: 600,
    color: "var(--text)",
    letterSpacing: "0.01em",
    whiteSpace: "nowrap",
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
    borderBottom: "1px solid rgba(0,0,0,0.07)",
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
    color: "var(--muted)",
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

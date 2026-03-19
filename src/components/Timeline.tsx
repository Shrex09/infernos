import React, { useEffect, useState } from "react";

const phases = [
  {
    label: "One",
    date: "Phase",
    heading: "Discovery and strategy planning begins",
    description: "We listen to your goals, analyze your market, and craft the right solution.",
    code: [
      "// Discovery",
      "const project = analyze({",
      "  goals: client.goals,",
      "  market: research(),",
      "});",
      "",
      "const strategy = build(project);",
    ],
  },
  {
    label: "Two",
    date: "Phase",
    heading: "Design and architecture setup",
    description: "Our designers create wireframes, prototypes, and a technical blueprint.",
    code: [
      "// Design",
      "const design = createUI({",
      "  wireframe: true,",
      "  prototype: true,",
      "});",
      "",
      "// UI ready",
    ],
  },
  {
    label: "Three",
    date: "Phase",
    heading: "Development and integration",
    description: "Our engineers build the solution using modern, scalable technologies.",
    code: [
      "// Development",
      "const app = new App({",
      "  frontend: 'React',",
      "  backend: 'Node',",
      "});",
      "",
      "app.deploy();",
    ],
  },
  {
    label: "Four",
    date: "Phase",
    heading: "Testing and quality assurance",
    description: "Rigorous testing to ensure performance, security, and reliability.",
    code: [
      "// Testing",
      "runTests({",
      "  unit: true,",
      "  e2e: true,",
      "});",
      "",
      "// Passed ✓",
    ],
  },
  {
    label: "Five",
    date: "Phase",
    heading: "Launch and ongoing support",
    description: "We deploy your product and provide continuous maintenance and updates.",
    code: [
      "// Launch",
      "deploy({",
      "  env: 'production',",
      "});",
      "",
      "// Live 🚀",
    ],
  },
];

const LiveCode: React.FC<{ lines: string[] }> = ({ lines }) => {
  const [visible, setVisible] = useState<string[]>([]);

  useEffect(() => {
    setVisible([]);
    let i = 0;

    const interval = setInterval(() => {
      if (i < lines.length) {
        setVisible((prev) => [...prev, lines[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [lines]);

  return (
    <div style={codeStyles.wrap}>
      <div style={codeStyles.bar}>
        <span style={codeStyles.dotRed}></span>
        <span style={codeStyles.dotYellow}></span>
        <span style={codeStyles.dotGreen}></span>
      </div>

      <div style={codeStyles.code}>
        {visible.map((line, i) => (
          <div key={i}>
            <span style={codeStyles.lineNum}>{i + 1}</span>
            <span>{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Timeline: React.FC = () => {
  const [active, setActive] = useState(0);
  const current = phases[active];

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        {/* Active Tab Content */}
        <div style={styles.tabPane}>
          <div style={styles.contentTop}>
            <div style={styles.content}>
              <div style={styles.titles}>
                <span style={styles.date}>{current.date}</span>
                <h3 style={styles.heading}>{current.heading}</h3>
              </div>
              <p style={styles.description}>{current.description}</p>
            </div>
            <div style={styles.actions}>
              <a href="#" style={styles.btnOutline}>Learn</a>
              <a 
                href="#footer" 
                style={styles.btnLink}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact ›
              </a>
            </div>
          </div>
          <div style={styles.imageSide}>
          <div style={styles.placeholderImg}>
  <LiveCode lines={current.code} />
</div>
          </div>
        </div>

        {/* Timeline Progress */}
        <div style={styles.progress}>
          {phases.map((phase, i) => (
            <div
              key={i}
              style={styles.progressItem}
              onClick={() => setActive(i)}
            >
              <div style={styles.progressTrack}>
                <div style={{ ...styles.divider, background: i <= active ? "#FFFFFF" : "#D8DADA" }} />
                <div style={{
                  ...styles.circle,
                  background: i === active ? "#FFFFFF" : "#B2B5B6",
                }} />
                <div style={{ ...styles.divider, background: i < active ? "#FFFFFF" : "#D8DADA" }} />
              </div>
              <span style={{
                ...styles.phaseLabel,
                color: i === active ? "#FFFFFF" : "#B2B5B6",
                cursor: "pointer",
              }}>
                {phase.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const codeStyles: Record<string, React.CSSProperties> = {
  wrap: {
    width: "100%",
    height: "100%",
    background: "#0d1117",
    borderRadius: 16,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  bar: {
    display: "flex",
    gap: 6,
    padding: 10,
    background: "#161b22",
  },
  dotRed: { width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" },
  dotYellow: { width: 10, height: 10, borderRadius: "50%", background: "#febc2e" },
  dotGreen: { width: 10, height: 10, borderRadius: "50%", background: "#28c840" },
  code: {
    padding: 16,
    fontFamily: "monospace",
    fontSize: 13,
    color: "#e6edf3",
  },
  lineNum: {
    marginRight: 10,
    color: "gray",
  },
};
const styles: Record<string, React.CSSProperties> = {
  section: {
    background: "#000B0D",
    padding: "112px 64px",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    maxWidth: 1280,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 64,
  },
  tabPane: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 80,
    flexWrap: "wrap",
  },
  contentTop: {
    flex: "1 1 400px",
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  titles: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  date: {
    fontFamily: "'Unbounded', sans-serif",
    fontWeight: 700,
    fontSize: "clamp(28px, 3vw, 48px)",
    lineHeight: 1.2,
    letterSpacing: "-0.01em",
    color: "#FFFFFF",
  },
  heading: {
    fontFamily: "'Unbounded', sans-serif",
    fontWeight: 700,
    fontSize: "clamp(24px, 2.5vw, 40px)",
    lineHeight: 1.3,
    letterSpacing: "-0.01em",
    color: "#FFFFFF",
  },
  description: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: 20,
    lineHeight: 1.5,
    color: "#FFFFFF",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 24,
  },
  btnOutline: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: 18,
    color: "#FFFFFF",
    padding: "6px 12px",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: 12,
    cursor: "pointer",
  },
  btnLink: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: 18,
    color: "#FFFFFF",
    cursor: "pointer",
  },
  imageSide: {
    flex: "1 1 400px",
  },
  placeholderImg: {
    width: "100%",
    height: 600,
    background: "linear-gradient(135deg, #1a2a3a 0%, #2a3a4a 100%)",
    borderRadius: 16,
  },
  progress: {
    display: "flex",
    flexWrap: "wrap",
    gap: 0,
  },
  progressItem: {
    flex: "1 1 80px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  progressTrack: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: 15,
  },
  divider: {
    flex: 1,
    height: 3,
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: "50%",
    flexShrink: 0,
  },
  phaseLabel: {
    fontFamily: "'Unbounded', sans-serif",
    fontWeight: 700,
    fontSize: "clamp(14px, 1.5vw, 32px)",
    lineHeight: 1.3,
    letterSpacing: "-0.01em",
    textAlign: "center",
  },
};

export default Timeline;

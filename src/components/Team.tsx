import React, { useState, useMemo, useRef, useEffect } from "react";
import { useReveal, revealStyle } from "../hooks";

interface Member {
  id: string;
  name: string;
  role: string;
  avatar: string;
  stats: { label: string; value: number; color: string }[];
  bio: string;
  mainColor: string;
}

const team: Member[] = [

  {
    id: "p1",
    name: "Shreyash",
    role: "The Logic Sovereign",
    avatar: "/shreyas1.png",
    mainColor: "#ff6a2b",
    bio: "Supreme authority over systems, architecture, and technical decisions. Commands APIs, databases, and infrastructure while forging the logic that powers every project.",
    stats: [
      { label: "Architecture", value: 100, color: "#ff6a2b" },
      { label: "Leadership", value: 95, color: "#ffa53c" },
      { label: "Logic Mastery", value: 99, color: "#e8431c" },
    ],
  },
  {
    id: "p2",
    name: "Amit",
    role: "All Rounder / Unrivaled",
    avatar: "/amit1.png",
    mainColor: "#ff2200",
    bio: "The undisputed master of every stack. Best in everything, with no competition anywhere near. Passive skill: Absolute Domination.",
    stats: [
      { label: "Logic", value: 100, color: "#ff2200" },
      { label: "Speed", value: 100, color: "#ff5533" },
      { label: "Power", value: 100, color: "#cc1a00" },
    ],
  },
  {
    id: "p3",
    name: "Sai",
    role: "The Tri-Realm Sorceress",
    avatar: "/sai1.png",
    mainColor: "#ffc36b",
    bio: "Master of the three domains: Frontend, Backend, and Mobile. Why specialize in one realm when you can build the entire universe?",
    stats: [
      { label: "Backend", value: 97, color: "#ffc36b" },
      { label: "Frontend", value: 94, color: "#ffda99" },
      { label: "Mobile", value: 99, color: "#e8a030" },
    ],
  },
  {
    id: "p4",
    name: "Yogini",
    role: "The Service Sorceress",
    avatar: "/yogini1.png",
    mainColor: "#ff8c42",
    bio: "Conjures APIs and orchestrates complex systems with arcane precision. Ultimate move: Connecting services so seamlessly that they appear to communicate by magic.",
    stats: [
      { label: "API Mastery", value: 100, color: "#ff8c42" },
      { label: "System Design", value: 97, color: "#ffaa6b" },
      { label: "Backend Magic", value: 99, color: "#e06a1a" },
    ],
  },
  {
    id: "p5",
    name: "ATHARVA",
    role: "The Visual Alchemist",
    avatar: "/atharv.png",
    mainColor: "#ffb347",
    bio: "Crafts immersive 3D experiences and stunning user interfaces. Merges art with technology to bring digital environments to life. Passive skill: 'Spatial Awareness'.",
    stats: [
      { label: "UI/UX Design", value: 98, color: "#ffb347" },
      { label: "3D Modeling", value: 95, color: "#ffd080" },
      { label: "Aesthetics", value: 97, color: "#e8902a" },
    ],
  },
  {
    id: "p6",
    name: "SOHAM",
    role: "Frontend Wizard",
    avatar: "/soham1.png",
    mainColor: "#ff5500",
    bio: "Guardian of smooth interactions and flawless interfaces. Wields React, CSS, and animations to craft legendary user journeys. Passive skill: 'Pixel Perfect Precision'.",
    stats: [
      { label: "UI Design", value: 96, color: "#ff5500" },
      { label: "Creativity", value: 92, color: "#ff7733" },
      { label: "Responsiveness", value: 98, color: "#cc4400" },
    ],
  },
  {
    id: "p7",
    name: "SARTHAK",
    role: "Vision Architect",
    avatar: "/sarthak.png",
    mainColor: "#ffa020",
    bio: "Dreams in startups, trains in AI, and treats every obstacle as a side quest. Known for turning late-night ideas into real-world projects. Passive skill: 'Infinite Grind' — gains momentum while others log off.",
    stats: [
      { label: "Innovation", value: 97, color: "#ffa020" },
      { label: "Persistence", value: 99, color: "#ffbf55" },
      { label: "Learning Speed", value: 94, color: "#d07a00" },
    ],
  },
];

const Team: React.FC = () => {
  const head = useReveal();

  // Create a daily shuffled team so no one fights over P1!
  const dailyTeam = useMemo(() => {
    const today = new Date();
    // UTC date ensures everyone worldwide sees the same order today
    const seed = today.getUTCFullYear() * 10000 + (today.getUTCMonth() + 1) * 100 + today.getUTCDate();

    let currentSeed = seed;
    // Simple pseudo-random number generator (LCG)
    const random = () => {
      currentSeed = (currentSeed * 1664525 + 1013904223) % 4294967296;
      return currentSeed / 4294967296;
    };

    const shuffled = [...team];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  const [selectedId, setSelectedId] = useState<string | null>(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 860) return null;
    return dailyTeam[0].id;
  });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Auto-rotate selected member every 4 seconds
  useEffect(() => {
    if (!selectedId || isPlaying) return;

    const timer = setInterval(() => {
      setSelectedId((current) => {
        if (!current) return dailyTeam[0].id;
        const currentIndex = dailyTeam.findIndex((m) => m.id === current);
        const nextIndex = (currentIndex + 1) % dailyTeam.length;
        return dailyTeam[nextIndex].id;
      });
    }, 8000);

    return () => clearInterval(timer);
  }, [selectedId, isPlaying, dailyTeam]);

  const selectedMember = selectedId ? dailyTeam.find((m) => m.id === selectedId) : null;

  return (
    <section id="team" className="section" style={styles.section}>
      <div style={styles.scanlines} />
      <div className="section-inner" style={{ position: "relative", zIndex: 2 }}>

        <div ref={head.ref} style={{ ...styles.header, ...revealStyle(head.visible) }}>
          <span className="kicker" style={{ color: "var(--amber)", letterSpacing: "0.2em" }}>SELECT YOUR FIGHTER</span>
          <h2 className="section-heading" style={{ fontFamily: "monospace", textTransform: "uppercase", textShadow: "4px 4px 0 rgba(232,67,28,0.5)" }}>
            Meet the <span className="text-gradient">Squad</span>
          </h2>
        </div>

        <div className="arcade-box">

          {/* Character Grid */}
          <div className="team-grid">
            {dailyTeam.map((member) => {
              const isSelected = selectedId === member.id;
              return (
                <div
                  key={member.id}
                  onMouseEnter={() => setSelectedId(member.id)}
                  onClick={() => {
                    setSelectedId(member.id);
                    if (window.innerWidth <= 860) {
                      setTimeout(() => {
                        statsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }, 50);
                    }
                  }}
                  style={{
                    ...styles.charSlot,
                    borderColor: isSelected ? member.mainColor : "rgba(0, 0, 0, 0.1)",
                    boxShadow: isSelected ? `0 0 20px ${member.mainColor}66` : "none",
                    transform: isSelected ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  <img src={member.avatar} alt={member.name} style={styles.avatarImg} />
                  {isSelected && (
                    <div style={{ ...styles.selectionCursor, borderColor: member.mainColor }}>
                      <span style={{ ...styles.corner, top: -2, left: -2, borderTop: `2px solid ${member.mainColor}`, borderLeft: `2px solid ${member.mainColor}` }} />
                      <span style={{ ...styles.corner, top: -2, right: -2, borderTop: `2px solid ${member.mainColor}`, borderRight: `2px solid ${member.mainColor}` }} />
                      <span style={{ ...styles.corner, bottom: -2, left: -2, borderBottom: `2px solid ${member.mainColor}`, borderLeft: `2px solid ${member.mainColor}` }} />
                      <span style={{ ...styles.corner, bottom: -2, right: -2, borderBottom: `2px solid ${member.mainColor}`, borderRight: `2px solid ${member.mainColor}` }} />
                    </div>
                  )}
                  <div style={{ ...styles.slotName, color: isSelected ? member.mainColor : "var(--text)", textShadow: isSelected ? `0 0 10px ${member.mainColor}` : "none" }}>
                    {member.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats Panel */}
          {selectedMember && (
            <div ref={statsRef} style={{ ...styles.statsPanel, borderColor: selectedMember.mainColor, boxShadow: `inset 0 0 30px ${selectedMember.mainColor}22` }}>
              {isPlaying ? (
                <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <button
                    onClick={() => setIsPlaying(false)}
                    style={{ ...styles.closeGameBtn, borderColor: selectedMember.mainColor, color: selectedMember.mainColor }}
                  >
                    [ X ] EXIT GAME
                  </button>
                  <div style={{ flex: 1, position: "relative", minHeight: 400, borderRadius: 8, overflow: "hidden", border: `2px solid ${selectedMember.mainColor}` }}>
                    <iframe
                      src="https://macek.github.io/google_pacman/"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      scrolling="no"
                      style={{ background: "#fff", position: "absolute", inset: 0 }}
                      title="Pacman"
                    />
                  </div>
                </div>
              ) : (
                <div key={selectedMember.id} className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div style={styles.statsHeader}>
                    <h3 style={{ ...styles.fighterName, color: selectedMember.mainColor, textShadow: `0 0 15px ${selectedMember.mainColor}88, 2px 2px 0 rgba(0,0,0,0.8)` }}>{selectedMember.name}</h3>
                    <span style={styles.fighterRole}>{selectedMember.role}</span>
                  </div>

                  <p style={styles.bio}>{selectedMember.bio}</p>

                  <div style={styles.statsBars}>
                    {selectedMember.stats.map((stat, i) => (
                      <div key={i} style={styles.statRow}>
                        <span style={styles.statLabel}>{stat.label}</span>
                        <div style={styles.barTrack}>
                          <div
                            style={{
                              ...styles.barFill,
                              width: `${stat.value}%`,
                              backgroundColor: stat.color,
                              boxShadow: `0 0 10px ${stat.color}`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    className="hide-mobile"
                    onClick={() => setIsPlaying(true)}
                    style={{ ...styles.insertCoin, color: selectedMember.mainColor }}
                  >
                    P1 READY. PRESS START.
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: "radial-gradient(ellipse 90% 60% at 60% 40%, rgba(255, 120, 40, 0.08), transparent 65%), var(--bg)",
    position: "relative",
    paddingTop: 100,
    paddingBottom: 100,
    overflow: "hidden",
  },
  scanlines: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255, 130, 55, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 130, 55, 0.04) 1px, transparent 1px)",
    backgroundSize: "44px 44px",
    zIndex: 1,
    pointerEvents: "none",
    opacity: 1,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 60,
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 20,
    flex: "1 1 300px",
    maxWidth: 400,
  },
  charSlot: {
    position: "relative",
    background: "var(--bg-2)",
    border: "1.5px solid var(--border)",
    borderRadius: 14,
    cursor: "pointer",
    transition: "all 0.22s ease-out",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    backdropFilter: "blur(8px)",
    boxShadow: "0 2px 12px -4px rgba(0,0,0,0.08)",
  },
  avatarImg: {
    width: "100%",
    aspectRatio: "1/1",
    objectFit: "cover",
    objectPosition: "center top",
    filter: "contrast(1.1) saturate(1.2)",
    marginBottom: 8,
    borderRadius: 4,
  },
  slotName: {
    fontFamily: "monospace",
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: "auto",
    textAlign: "center",
  },
  selectionCursor: {
    position: "absolute",
    inset: -6,
    pointerEvents: "none",
  },
  corner: {
    position: "absolute",
    width: 12,
    height: 12,
  },
  statsPanel: {
    flex: "1 1 400px",
    maxWidth: 500,
    background: "var(--bg-2)",
    border: "2px solid",
    borderRadius: 20,
    padding: 32,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 20,
    backdropFilter: "blur(20px)",
    transition: "all 0.3s ease",
    boxShadow: "0 20px 60px -20px rgba(232, 67, 28, 0.2), 0 4px 20px -4px rgba(0,0,0,0.08)",
  },
  statsHeader: {
    borderBottom: "1px dashed rgba(255, 106, 43, 0.35)",
    paddingBottom: 15,
  },
  fighterName: {
    fontFamily: "monospace",
    fontSize: 32,
    margin: 0,
    textTransform: "uppercase",
    textShadow: "none",
  },
  fighterRole: {
    fontFamily: "var(--font-mono)",
    fontSize: 14,
    color: "rgba(255, 165, 60, 0.7)",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
  },
  bio: {
    fontSize: 15,
    lineHeight: 1.6,
    color: "var(--muted)",
    minHeight: 80,
  },
  statsBars: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  statRow: {
    display: "flex",
    alignItems: "center",
    gap: 15,
  },
  statLabel: {
    fontFamily: "monospace",
    width: 130,
    fontSize: 13,
    color: "var(--muted)",
    textTransform: "uppercase",
  },
  barTrack: {
    flex: 1,
    height: 10,
    background: "var(--border)",
    borderRadius: 6,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 6,
    transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.4s ease",
  },
  insertCoin: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    width: "100%",
    fontFamily: "monospace",
    textAlign: "center",
    marginTop: "auto",
    paddingTop: 20,
    fontSize: 16,
    animation: "blink 1.5s infinite",
    textShadow: "0 0 10px currentColor",
  },
  closeGameBtn: {
    background: "rgba(0,0,0,0.5)",
    border: "1px solid",
    cursor: "pointer",
    fontFamily: "monospace",
    fontSize: 14,
    padding: "8px 16px",
    marginBottom: 15,
    borderRadius: 4,
    alignSelf: "flex-end",
    transition: "all 0.2s ease",
  },
};

// Add blinking animation for "PRESS START" text
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
`;
document.head.appendChild(styleSheet);

export default Team;

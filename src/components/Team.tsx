import React, { useState } from "react";
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
    name: "Amit",
    role: "All Rounder / Unrivaled",
    avatar: "/amit.png",
    mainColor: "#ff003c",
    bio: "The undisputed master of every stack. Best in everything, with no competition anywhere near. Passive skill: Absolute Domination.",
    stats: [
      { label: "Logic", value: 100, color: "#ff003c" },
      { label: "Speed", value: 100, color: "#ff4d79" },
      { label: "Power", value: 100, color: "#cc0030" },
    ],
  },
  {
    id: "p2",
    name: "Player 2",
    role: "UI Sorcerer",
    avatar: "/2.png",
    mainColor: "#f472b6",
    bio: "Weaves intricate CSS spells to bend pixels to their will. Ultimate move: Centering a div without googling.",
    stats: [
      { label: "Aesthetics", value: 100, color: "#f472b6" },
      { label: "Speed", value: 85, color: "#f9a8d4" },
      { label: "CSS Magic", value: 98, color: "#db2777" },
    ],
  },
  {
    id: "p3",
    name: "Player 3",
    role: "Bug Hunter",
    avatar: "/3.png",
    mainColor: "#fbbf24",
    bio: "Relentless pursuer of edge cases. Thrives in chaos and console logs. Passive skill: 'It works on my machine'.",
    stats: [
      { label: "Debugging", value: 99, color: "#fbbf24" },
      { label: "Patience", value: 90, color: "#fcd34d" },
      { label: "Chaos", value: 85, color: "#d97706" },
    ],
  },
  {
    id: "p4",
    name: "Player 4",
    role: "Data Wrangler",
    avatar: "/4.png",
    mainColor: "#60a5fa",
    bio: "Extracts truth from endless streams of data. Weapon of choice: Complex SQL queries.",
    stats: [
      { label: "Analysis", value: 92, color: "#60a5fa" },
      { label: "Accuracy", value: 95, color: "#93c5fd" },
      { label: "Queries", value: 88, color: "#2563eb" },
    ],
  },
  {
    id: "p5",
    name: "Player 5",
    role: "Cloud Ninja",
    avatar: "/5.png",
    mainColor: "#a78bfa",
    bio: "Masters the servers in the sky. Deploys apps without downtime. Ultimate move: Container orchestration.",
    stats: [
      { label: "DevOps", value: 96, color: "#a78bfa" },
      { label: "Uptime", value: 99, color: "#c4b5fd" },
      { label: "Scaling", value: 90, color: "#8b5cf6" },
    ],
  },
];

const Team: React.FC = () => {
  const head = useReveal();
  const [selectedId, setSelectedId] = useState<string>(team[0].id);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const selectedMember = team.find((m) => m.id === selectedId) || team[0];

  return (
    <section id="team" className="section" style={styles.section}>
      <div style={styles.scanlines} />
      <div className="section-inner" style={{ position: "relative", zIndex: 2 }}>

        <div ref={head.ref} style={{ ...styles.header, ...revealStyle(head.visible) }}>
          <span className="kicker" style={{ color: "#7df0c0", letterSpacing: "0.2em" }}>SELECT YOUR FIGHTER</span>
          <h2 className="section-heading" style={{ fontFamily: "monospace", textTransform: "uppercase", textShadow: "4px 4px 0 rgba(232,67,28,0.5)" }}>
            Meet the <span className="text-gradient">Squad</span>
          </h2>
        </div>

        <div style={styles.arcadeBox}>

          {/* Character Grid */}
          <div style={styles.gridContainer}>
            {team.map((member) => {
              const isSelected = selectedId === member.id;
              return (
                <div
                  key={member.id}
                  onMouseEnter={() => setSelectedId(member.id)}
                  style={{
                    ...styles.charSlot,
                    borderColor: isSelected ? member.mainColor : "rgba(255, 255, 255, 0.1)",
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
                  <div style={{ ...styles.slotName, color: isSelected ? member.mainColor : "#fff", textShadow: isSelected ? `0 0 10px ${member.mainColor}` : "none" }}>
                    {member.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats Panel */}
          <div style={{ ...styles.statsPanel, borderColor: selectedMember.mainColor, boxShadow: `inset 0 0 30px ${selectedMember.mainColor}22` }}>
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
                    style={{ background: "#000", position: "absolute", inset: 0 }}
                    title="Pacman"
                  />
                </div>
              </div>
            ) : (
              <>
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
                  onClick={() => setIsPlaying(true)}
                  style={{ ...styles.insertCoin, color: selectedMember.mainColor }}
                >
                  P1 READY. PRESS START.
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: "#0a0606",
    position: "relative",
    paddingTop: 100,
    paddingBottom: 100,
    overflow: "hidden",
  },
  scanlines: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
    backgroundSize: "100% 4px, 6px 100%",
    zIndex: 1,
    pointerEvents: "none",
    opacity: 0.4,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 60,
  },
  arcadeBox: {
    display: "flex",
    flexWrap: "wrap",
    gap: 40,
    alignItems: "center",
    justifyContent: "center",
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
    background: "#1a1210",
    border: "2px solid rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    cursor: "pointer",
    transition: "all 0.2s ease-out",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
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
    background: "rgba(10, 5, 5, 0.8)",
    border: "2px solid",
    borderRadius: 12,
    padding: 30,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 20,
    backdropFilter: "blur(10px)",
    transition: "all 0.3s ease",
  },
  statsHeader: {
    borderBottom: "1px dashed rgba(255,255,255,0.2)",
    paddingBottom: 15,
  },
  fighterName: {
    fontFamily: "monospace",
    fontSize: 32,
    margin: 0,
    textTransform: "uppercase",
    textShadow: "2px 2px 0 rgba(0,0,0,0.8)",
  },
  fighterRole: {
    fontFamily: "var(--font-mono)",
    fontSize: 14,
    color: "#aaa",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
  },
  bio: {
    fontSize: 15,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.85)",
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
    width: 80,
    fontSize: 13,
    color: "#fff",
    textTransform: "uppercase",
  },
  barTrack: {
    flex: 1,
    height: 12,
    background: "rgba(255,255,255,0.1)",
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

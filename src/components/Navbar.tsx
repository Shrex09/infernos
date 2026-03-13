import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.logo}>
            <span style={styles.logoText}>Logo</span>
          </div>
          <div style={{ ...styles.links, ...(menuOpen ? styles.linksOpen : {}) }}>
            {["About", "Services", "Portfolio", "Blog", "More Pages"].map((link, i) => (
              <a key={i} href="#" style={styles.link}>
                {link}
                {link === "More Pages" && <span style={styles.chevron}>▾</span>}
              </a>
            ))}
          </div>
        </div>
        <div style={styles.actions}>
          <a href="#" style={styles.btnOutline}>Sign in</a>
          <a href="#" style={styles.btnPrimary}>Get started</a>
        </div>
        <button style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
};

const styles: Record<string, React.CSSProperties> = {
  navbar: {
    background: "#E5EEFF",
    height: 72,
    display: "flex",
    alignItems: "center",
    padding: "0 64px",
    position: "sticky",
    top: 0,
    zIndex: 100,
    width: "100%",
  },
  container: {
    maxWidth: 1312,
    width: "100%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: { display: "flex", alignItems: "center", gap: 24 },
  logo: { width: 84, height: 36, display: "flex", alignItems: "center" },
  logoText: {
    fontFamily: "'Unbounded', sans-serif",
    fontWeight: 700,
    fontSize: 18,
    color: "#000B0D",
  },
  links: { display: "flex", gap: 32, alignItems: "center" },
  linksOpen: { display: "flex" },
  link: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: 18,
    color: "#000B0D",
    display: "flex",
    alignItems: "center",
    gap: 4,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  chevron: { fontSize: 14, color: "#000B0D" },
  actions: { display: "flex", gap: 16, alignItems: "center" },
  btnOutline: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: 18,
    color: "#000B0D",
    padding: "4px 10px",
    border: "1px solid rgba(0,11,13,0.15)",
    borderRadius: 12,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  btnPrimary: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: 18,
    color: "#FFFFFF",
    padding: "4px 10px",
    background: "#0057FF",
    border: "1px solid #0057FF",
    borderRadius: 12,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  hamburger: {
    display: "none",
    flexDirection: "column",
    gap: 5,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 4,
  },
};

export default Navbar;

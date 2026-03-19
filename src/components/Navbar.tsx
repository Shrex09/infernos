import React, { useState, useEffect } from "react";

const navLinks = [
  { label: "About",     id: "about" },
  { label: "Services",  id: "services" },
  { label: "Portfolio", id: "portfolio" },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [activeId, setActiveId]   = useState("");

  // Scroll effect — turn solid after 60px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight active link based on scroll position
  useEffect(() => {
    const ids = navLinks.map((l) => l.id);
    const onScroll = () => {
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveId(ids[i]);
          return;
        }
      }
      setActiveId("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
      setMenuOpen(false);
    }
  };

  return (
    <>
      <nav style={{
        ...styles.navbar,
        background: scrolled
          ? "rgba(4, 6, 12, 0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
        boxShadow: scrolled
          ? "0 4px 30px rgba(0,0,0,0.4)"
          : "none",
      }}>
        <div style={styles.container}>

          {/* ── Logo ── */}
          <div
            style={styles.logo}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img src="/infernos.jpeg" alt="Infernos" style={styles.logoImg} />
            <span style={styles.logoText}>INFERNOS</span>
          </div>

          {/* ── Desktop Links ── */}
          <div style={styles.links}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                style={styles.linkBtn}
              >
                <span style={{
                  ...styles.linkLabel,
                  color: activeId === link.id ? "#ffffff" : "rgba(255,255,255,0.65)",
                }}>
                  {link.label}
                </span>
                {/* Animated underline */}
                <span style={{
                  ...styles.linkUnderline,
                  width: activeId === link.id ? "100%" : "0%",
                }} />
              </button>
            ))}
          </div>

          {/* ── CTA + Hamburger ── */}
          <div style={styles.actions}>
            <button
              style={styles.ctaBtn}
              onClick={() => scrollTo("contact")}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#1a6fff";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 20px rgba(0,87,255,0.45)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#0057FF";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 16px rgba(0,87,255,0.3)";
              }}
            >
              Get started
            </button>

            {/* Hamburger — mobile */}
            <button
              style={styles.hamburger}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span style={{
                ...styles.hLine,
                transform: menuOpen
                  ? "rotate(45deg) translate(5px, 5px)"
                  : "none",
              }} />
              <span style={{
                ...styles.hLine,
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
              }} />
              <span style={{
                ...styles.hLine,
                transform: menuOpen
                  ? "rotate(-45deg) translate(5px, -5px)"
                  : "none",
              }} />
            </button>
          </div>
        </div>

        {/* Gradient bottom line — always visible */}
        <div style={{
          ...styles.gradientLine,
          opacity: scrolled ? 0 : 0.6,
        }} />
      </nav>

      {/* ── Mobile Menu ── */}
      <div style={{
        ...styles.mobileMenu,
        opacity:        menuOpen ? 1   : 0,
        pointerEvents:  menuOpen ? "all" : "none",
        transform:      menuOpen ? "translateY(0)" : "translateY(-12px)",
      }}>
        {navLinks.map((link, i) => (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            style={{
              ...styles.mobileLink,
              transitionDelay: menuOpen ? `${i * 50}ms` : "0ms",
              opacity:   menuOpen ? 1 : 0,
              transform: menuOpen ? "translateX(0)" : "translateX(-12px)",
            }}
          >
            <span style={styles.mobileLinkNum}>0{i + 1}</span>
            {link.label}
          </button>
        ))}
        <button
          style={{
            ...styles.mobileCta,
            transitionDelay: menuOpen ? "150ms" : "0ms",
            opacity: menuOpen ? 1 : 0,
          }}
          onClick={() => scrollTo("contact")}
        >
          Get started →
        </button>
      </div>

      {/* Inline responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger      { display: flex !important; }
          .nav-cta            { display: none !important; }
        }
        nav button:hover span[data-underline] { width: 100% !important; }
      `}</style>
    </>
  );
};

const styles: Record<string, React.CSSProperties> = {
  /* ── Navbar shell ── */
  navbar: {
    position:   "fixed",
    top: 0, left: 0, right: 0,
    height:     72,
    display:    "flex",
    flexDirection: "column",
    zIndex:     200,
    transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
  },
  container: {
    maxWidth:   1312,
    width:      "100%",
    margin:     "0 auto",
    padding:    "0 48px",
    flex:       1,
    display:    "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  /* ── Logo ── */
  logo: {
    display:    "flex",
    alignItems: "center",
    gap:        10,
    cursor:     "pointer",
  },
  logoImg: {
    height:     34,
    width:      34,
    objectFit:  "contain" as const,
    borderRadius: 6,
  },
  logoText: {
    fontFamily: "'Unbounded', sans-serif",
    fontWeight: 800,
    fontSize:   15,
    color:      "#FFFFFF",
    letterSpacing: "0.12em",
  },

  /* ── Desktop links ── */
  links: {
    display:    "flex",
    gap:        36,
    alignItems: "center",
  },
  linkBtn: {
    background:  "none",
    border:      "none",
    padding:     "4px 0",
    cursor:      "pointer",
    position:    "relative" as const,
    display:     "flex",
    flexDirection: "column" as const,
    alignItems:  "center",
    gap:         0,
  },
  linkLabel: {
    fontFamily:     "'Inter', sans-serif",
    fontWeight:     500,
    fontSize:       15,
    letterSpacing:  "0.04em",
    transition:     "color 0.25s",
    whiteSpace:     "nowrap" as const,
  },
  linkUnderline: {
    position:   "absolute" as const,
    bottom:     -2,
    left:       0,
    height:     1.5,
    background: "#0057FF",
    boxShadow:  "0 0 6px rgba(0,87,255,0.7)",
    transition: "width 0.35s cubic-bezier(0.16,1,0.3,1)",
    borderRadius: 1,
  },

  /* ── Actions ── */
  actions: {
    display:    "flex",
    alignItems: "center",
    gap:        16,
  },
  ctaBtn: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize:   14,
    color:      "#FFFFFF",
    padding:    "8px 22px",
    background: "#0057FF",
    border:     "none",
    borderRadius: 10,
    cursor:     "pointer",
    letterSpacing: "0.04em",
    boxShadow:  "0 0 16px rgba(0,87,255,0.3)",
    transition: "all 0.25s ease",
    whiteSpace: "nowrap" as const,
  },

  /* ── Hamburger ── */
  hamburger: {
    display:        "none",
    flexDirection:  "column" as const,
    gap:            5,
    background:     "none",
    border:         "none",
    cursor:         "pointer",
    padding:        4,
  },
  hLine: {
    display:      "block",
    width:        22,
    height:       2,
    background:   "#FFFFFF",
    borderRadius: 2,
    transition:   "all 0.3s ease",
  },

  /* ── Gradient bottom border (hero only) ── */
  gradientLine: {
    height:     1,
    background: "linear-gradient(90deg, transparent, rgba(0,87,255,0.5), rgba(255,255,255,0.15), rgba(0,87,255,0.5), transparent)",
    transition: "opacity 0.4s",
  },

  /* ── Mobile menu ── */
  mobileMenu: {
    position:       "fixed" as const,
    top:            72,
    left:           0,
    right:          0,
    background:     "rgba(4,6,12,0.96)",
    backdropFilter: "blur(20px)",
    borderBottom:   "1px solid rgba(255,255,255,0.06)",
    display:        "flex",
    flexDirection:  "column" as const,
    padding:        "20px 32px 28px",
    gap:            4,
    zIndex:         199,
    transition:     "all 0.35s cubic-bezier(0.16,1,0.3,1)",
  },
  mobileLink: {
    background:   "none",
    border:       "none",
    fontFamily:   "'Unbounded', sans-serif",
    fontSize:     22,
    fontWeight:   700,
    color:        "#FFFFFF",
    textAlign:    "left" as const,
    padding:      "14px 0",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    cursor:       "pointer",
    display:      "flex",
    alignItems:   "center",
    gap:          14,
    transition:   "all 0.35s cubic-bezier(0.16,1,0.3,1)",
  },
  mobileLinkNum: {
    fontFamily:     "'Inter', sans-serif",
    fontSize:       11,
    color:          "#0057FF",
    letterSpacing:  "0.1em",
    opacity:        0.8,
  },
  mobileCta: {
    fontFamily:   "'Inter', sans-serif",
    fontWeight:   600,
    fontSize:     16,
    color:        "#FFFFFF",
    padding:      "14px 0",
    background:   "transparent",
    border:       "1px solid rgba(0,87,255,0.5)",
    borderRadius: 10,
    cursor:       "pointer",
    marginTop:    12,
    transition:   "all 0.35s cubic-bezier(0.16,1,0.3,1)",
    letterSpacing: "0.04em",
  },
};

export default Navbar;
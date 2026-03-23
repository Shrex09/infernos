import React, { useState, useEffect } from "react";

const navLinks = [
  { label: "About",     id: "about" },
  { label: "Services",  id: "services" },
  { label: "Portfolio", id: "cta" },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Track window width for responsive toggle
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Solid background after 60px scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight active section while scrolling
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

  // Close menu when resizing to desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

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
        background: scrolled || menuOpen
          ? "rgba(4, 6, 12, 0.96)"
          : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(18px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.4)" : "none",
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

          {/* ── Desktop Links — hidden on mobile ── */}
          {!isMobile && (
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
                  <span style={{
                    ...styles.linkUnderline,
                    width: activeId === link.id ? "100%" : "0%",
                  }} />
                </button>
              ))}
            </div>
          )}

          {/* ── Right side: CTA (desktop) + Hamburger (mobile) ── */}
          <div style={styles.actions}>

            {/* Get started — desktop only */}
            {!isMobile && (
              <button
                style={styles.ctaBtn}
                onClick={() => scrollTo("footer")}
                onMouseEnter={(e) => {
                  const b = e.currentTarget as HTMLButtonElement;
                  b.style.background = "#1a6fff";
                  b.style.transform = "translateY(-1px)";
                  b.style.boxShadow = "0 6px 20px rgba(0,87,255,0.5)";
                }}
                onMouseLeave={(e) => {
                  const b = e.currentTarget as HTMLButtonElement;
                  b.style.background = "#0057FF";
                  b.style.transform = "translateY(0)";
                  b.style.boxShadow = "0 0 16px rgba(0,87,255,0.3)";
                }}
              >
                Get started
              </button>
            )}

            {/* Hamburger — mobile only */}
            {isMobile && (
              <button
                style={styles.hamburger}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <span style={{
                  ...styles.hLine,
                  transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
                }} />
                <span style={{
                  ...styles.hLine,
                  opacity: menuOpen ? 0 : 1,
                  transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
                }} />
                <span style={{
                  ...styles.hLine,
                  transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
                }} />
              </button>
            )}
          </div>
        </div>

        {/* Gradient bottom line */}
        {!isMobile && (
          <div style={{
            ...styles.gradientLine,
            opacity: scrolled ? 0 : 0.5,
          }} />
        )}
      </nav>

      {/* ── Mobile Dropdown Menu ── */}
      {isMobile && (
        <div style={{
          ...styles.mobileMenu,
          opacity:       menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          transform:     menuOpen ? "translateY(0)" : "translateY(-10px)",
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
                color: activeId === link.id ? "#0057FF" : "#FFFFFF",
              }}
            >
              <span style={styles.mobileLinkNum}>0{i + 1}</span>
              {link.label}
            </button>
          ))}

          <button
            style={{
              ...styles.mobileCta,
              transitionDelay: menuOpen ? `${navLinks.length * 50}ms` : "0ms",
              opacity: menuOpen ? 1 : 0,
            }}
            onClick={() => scrollTo("footer")}
          >
            Get started →
          </button>
        </div>
      )}
    </>
  );
};

const styles: Record<string, React.CSSProperties> = {
  navbar: {
    position:      "fixed",
    top: 0, left: 0, right: 0,
    height:        72,
    display:       "flex",
    flexDirection: "column",
    zIndex:        1000,
    transition:    "all 0.4s cubic-bezier(0.16,1,0.3,1)",
  },
  container: {
    width:          "100%",
    maxWidth:       1312,
    margin:         "0 auto",
    padding:        "0 24px",
    flex:           1,
    display:        "flex",
    alignItems:     "center",
    justifyContent: "space-between",
  },

  /* Logo */
  logo: {
    display:    "flex",
    alignItems: "center",
    gap:        10,
    cursor:     "pointer",
    flexShrink: 0,
  },
  logoImg: {
    height:       34,
    width:        34,
    objectFit:    "contain" as const,
    borderRadius: 6,
  },
  logoText: {
    fontFamily:    "'Unbounded', sans-serif",
    fontWeight:    800,
    fontSize:      15,
    color:         "#FFFFFF",
    letterSpacing: "0.12em",
  },

  /* Desktop links */
  links: {
    display:    "flex",
    gap:        36,
    alignItems: "center",
  },
  linkBtn: {
    background:    "none",
    border:        "none",
    padding:       "4px 0",
    cursor:        "pointer",
    position:      "relative" as const,
    display:       "flex",
    flexDirection: "column" as const,
    alignItems:    "center",
  },
  linkLabel: {
    fontFamily:    "'Inter', sans-serif",
    fontWeight:    500,
    fontSize:      15,
    letterSpacing: "0.04em",
    transition:    "color 0.25s",
    whiteSpace:    "nowrap" as const,
  },
  linkUnderline: {
    position:     "absolute" as const,
    bottom:       -2,
    left:         0,
    height:       1.5,
    background:   "#0057FF",
    boxShadow:    "0 0 6px rgba(0,87,255,0.7)",
    transition:   "width 0.35s cubic-bezier(0.16,1,0.3,1)",
    borderRadius: 1,
  },

  /* Actions */
  actions: {
    display:    "flex",
    alignItems: "center",
    gap:        16,
    flexShrink: 0,
  },
  ctaBtn: {
    fontFamily:    "'Inter', sans-serif",
    fontWeight:    600,
    fontSize:      14,
    color:         "#FFFFFF",
    padding:       "8px 22px",
    background:    "#0057FF",
    border:        "none",
    borderRadius:  10,
    cursor:        "pointer",
    letterSpacing: "0.04em",
    boxShadow:     "0 0 16px rgba(0,87,255,0.3)",
    transition:    "all 0.25s ease",
    whiteSpace:    "nowrap" as const,
  },

  /* Hamburger */
  hamburger: {
    display:       "flex",
    flexDirection: "column" as const,
    gap:           5,
    background:    "none",
    border:        "none",
    cursor:        "pointer",
    padding:       8,
  },
  hLine: {
    display:      "block",
    width:        24,
    height:       2,
    background:   "#FFFFFF",
    borderRadius: 2,
    transition:   "all 0.3s ease",
  },

  /* Gradient bottom line */
  gradientLine: {
    height:     1,
    background: "linear-gradient(90deg, transparent, rgba(0,87,255,0.5), rgba(255,255,255,0.15), rgba(0,87,255,0.5), transparent)",
    transition: "opacity 0.4s",
  },

  /* Mobile menu */
  mobileMenu: {
    position:       "fixed" as const,
    top:            72,
    left:           0,
    right:          0,
    background:     "rgba(4,6,12,0.97)",
    backdropFilter: "blur(20px)",
    borderBottom:   "1px solid rgba(255,255,255,0.06)",
    display:        "flex",
    flexDirection:  "column" as const,
    padding:        "16px 24px 24px",
    gap:            4,
    zIndex:         999,
    transition:     "all 0.35s cubic-bezier(0.16,1,0.3,1)",
  },
  mobileLink: {
    background:   "none",
    border:       "none",
    fontFamily:   "'Unbounded', sans-serif",
    fontSize:     24,
    fontWeight:   700,
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
    fontFamily:    "'Inter', sans-serif",
    fontSize:      11,
    color:         "#0057FF",
    letterSpacing: "0.1em",
    opacity:       0.7,
  },
  mobileCta: {
    fontFamily:    "'Inter', sans-serif",
    fontWeight:    600,
    fontSize:      16,
    color:         "#FFFFFF",
    padding:       "14px 0",
    background:    "transparent",
    border:        "1px solid rgba(0,87,255,0.4)",
    borderRadius:  10,
    cursor:        "pointer",
    marginTop:     8,
    transition:    "all 0.35s cubic-bezier(0.16,1,0.3,1)",
    letterSpacing: "0.04em",
  },
};

export default Navbar;
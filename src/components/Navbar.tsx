import React, { useState, useEffect } from "react";

const navLinks = [
  { label: "Services", id: "services" },
  { label: "Stack", id: "stack" },
  { label: "Process", id: "process" },
  { label: "Work", id: "work" },
  { label: "Why us", id: "why" },
  { label: "Team", id: "team" },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 860);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 860);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActiveId(ids[i]);
          return;
        }
      }
      setActiveId("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <nav
        style={{
          ...styles.navbar,
          background:
            scrolled || menuOpen ? "rgba(11, 7, 5, 0.85)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(18px)" : "none",
          WebkitBackdropFilter: scrolled || menuOpen ? "blur(18px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255, 115, 45, 0.14)"
            : "1px solid transparent",
        }}
      >
        <div style={styles.container}>
          {/* Logo */}
          <div
            style={styles.logo}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img src="/infernos.jpeg" alt="Infernos" style={styles.logoImg} />
            <span style={styles.logoText}>INFERNOS</span>
            <span style={styles.logoTag} className="hide-mobile">/ IT SOLUTIONS</span>
          </div>

          {/* Desktop links */}
          {!isMobile && (
            <div style={styles.links}>
              {navLinks.map((link, i) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  style={styles.linkBtn}
                >
                  <span style={styles.linkIndex}>0{i + 1}</span>
                  <span
                    style={{
                      ...styles.linkLabel,
                      color:
                        activeId === link.id
                          ? "#ffffff"
                          : "rgba(255,255,255,0.6)",
                    }}
                  >
                    {link.label}
                  </span>
                  <span
                    style={{
                      ...styles.linkUnderline,
                      width: activeId === link.id ? "100%" : "0%",
                    }}
                  />
                </button>
              ))}
            </div>
          )}

          <div style={styles.actions}>
            {!isMobile && (
              <button className="btn-primary" style={styles.ctaBtn} onClick={() => scrollTo("contact")}>
                Start a project
              </button>
            )}

            {isMobile && (
              <button
                style={styles.hamburger}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <span style={{ ...styles.hLine, transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
                <span style={{ ...styles.hLine, opacity: menuOpen ? 0 : 1 }} />
                <span style={{ ...styles.hLine, transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobile && (
        <div
          style={{
            ...styles.mobileMenu,
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? "all" : "none",
            transform: menuOpen ? "translateY(0)" : "translateY(-10px)",
          }}
        >
          {navLinks.map((link, i) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              style={{
                ...styles.mobileLink,
                transitionDelay: menuOpen ? `${i * 45}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(-12px)",
                color: activeId === link.id ? "#ff7a3c" : "#ffffff",
              }}
            >
              <span style={styles.mobileLinkNum}>0{i + 1}</span>
              {link.label}
            </button>
          ))}
          <button
            className="btn-primary"
            style={{
              marginTop: 12,
              justifyContent: "center",
              transitionDelay: menuOpen ? `${navLinks.length * 45}ms` : "0ms",
              opacity: menuOpen ? 1 : 0,
            }}
            onClick={() => scrollTo("contact")}
          >
            Start a project →
          </button>
        </div>
      )}
    </>
  );
};

const styles: Record<string, React.CSSProperties> = {
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: 72,
    display: "flex",
    flexDirection: "column",
    zIndex: 1000,
    transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
  },
  container: {
    width: "100%",
    maxWidth: 1312,
    margin: "0 auto",
    padding: "0 24px",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    flexShrink: 0,
  },
  logoImg: {
    height: 32,
    width: 32,
    objectFit: "contain",
    borderRadius: 6,
  },
  logoText: {
    fontFamily: "var(--font-display)",
    fontWeight: 800,
    fontSize: 15,
    color: "#FFFFFF",
    letterSpacing: "0.12em",
  },
  logoTag: {
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    color: "rgba(255, 205, 165, 0.55)",
    letterSpacing: "0.16em",
    marginTop: 3,
  },
  links: {
    display: "flex",
    gap: 32,
    alignItems: "center",
  },
  linkBtn: {
    background: "none",
    border: "none",
    padding: "4px 0",
    cursor: "pointer",
    position: "relative",
    display: "flex",
    alignItems: "baseline",
    gap: 6,
  },
  linkIndex: {
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    color: "rgba(255, 155, 70, 0.7)",
  },
  linkLabel: {
    fontFamily: "var(--font-body)",
    fontWeight: 500,
    fontSize: 14.5,
    letterSpacing: "0.03em",
    transition: "color 0.25s",
    whiteSpace: "nowrap",
  },
  linkUnderline: {
    position: "absolute",
    bottom: -3,
    left: 0,
    height: 1.5,
    background: "linear-gradient(90deg, #E8431C, #FFA53C)",
    boxShadow: "0 0 8px rgba(255, 130, 55, 0.8)",
    transition: "width 0.35s cubic-bezier(0.16,1,0.3,1)",
    borderRadius: 1,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    flexShrink: 0,
  },
  ctaBtn: {
    padding: "9px 22px",
    fontSize: 14,
  },
  hamburger: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 8,
  },
  hLine: {
    display: "block",
    width: 24,
    height: 2,
    background: "#FFFFFF",
    borderRadius: 2,
    transition: "all 0.3s ease",
  },
  mobileMenu: {
    position: "fixed",
    top: 72,
    left: 0,
    right: 0,
    background: "rgba(11, 7, 5, 0.97)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255, 115, 45, 0.15)",
    display: "flex",
    flexDirection: "column",
    padding: "16px 24px 24px",
    gap: 4,
    zIndex: 999,
    transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
  },
  mobileLink: {
    background: "none",
    border: "none",
    fontFamily: "var(--font-display)",
    fontSize: 22,
    fontWeight: 700,
    textAlign: "left",
    padding: "14px 0",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 14,
    transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
  },
  mobileLinkNum: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    color: "#ff8a45",
    letterSpacing: "0.1em",
    opacity: 0.8,
  },
};

export default Navbar;

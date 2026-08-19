import React, { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";

const navLinks = [
  { label: "Work", id: "work" },
  { label: "Services", id: "services" },
  { label: "Stack", id: "stack" },
  { label: "Process", id: "process" },
  { label: "Why us", id: "why" },
  { label: "Team", id: "team" },
];

const Navbar: React.FC = () => {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
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
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 60));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Highlight active section while scrolling
  useEffect(() => {
    const ids = navLinks.map((l) => l.id);
    let raf = 0;
    const updateActive = () => {
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActiveId(ids[i]);
          return;
        }
      }
      setActiveId("");
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateActive);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
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
          background: scrolled || menuOpen
            ? isDark ? "rgba(9, 7, 10, 0.88)" : "rgba(255, 255, 255, 0.85)"
            : "transparent",
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
                      color: activeId === link.id
                        ? isDark ? "#ffffff" : "#000000"
                        : isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
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
            {/* Theme Toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              style={{
                ...styles.themeToggle,
                background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
                border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.10)",
                boxShadow: isDark ? "0 0 0 0 transparent" : "0 1px 4px rgba(0,0,0,0.08)",
              }}
            >
              <span style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease",
                transform: isDark ? "rotate(-30deg)" : "rotate(0deg)",
              }}>
                {isDark ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" fill="#c4b5fd" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="5" fill="#f59e0b" />
                    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
              </span>
            </button>

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
                color: activeId === link.id ? "#ff7a3c" : isDark ? "#f5f0ec" : "#000000",
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
  themeToggle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    borderRadius: "50%",
    cursor: "pointer",
    flexShrink: 0,
    outline: "none",
    transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
  },
  toggleThumb: {
    display: "none",
  },
  toggleLabel: {
    display: "none",
  },
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
    color: "var(--text)",
    letterSpacing: "0.12em",
  },
  logoTag: {
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    color: "var(--amber)",
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
    color: "var(--amber)",
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
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    width: 44,
    height: 44,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },
  hLine: {
    display: "block",
    width: 24,
    height: 2,
    background: "var(--text)",
    borderRadius: 2,
    transition: "all 0.3s ease",
  },
  mobileMenu: {
    position: "fixed",
    top: 72,
    left: 0,
    right: 0,
    background: "var(--bg-2)",
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
    borderBottom: "1px solid rgba(0,0,0,0.06)",
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

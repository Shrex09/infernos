import React, { useEffect, useRef, useState } from "react";
import { gsap, lockScroll, onScroll, scrollToId, scrollToTop } from "../lib/motion";
import { navLinks, CONTACT } from "../data";
import { LogoMark, RollButton } from "./ui";

const useLocalTime = () => {
  const fmt = () =>
    new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return time;
};

const Nav: React.FC = () => {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const time = useLocalTime();

  // Hide on scroll down, reveal on scroll up
  useEffect(() => {
    let last = 0;
    return onScroll((y) => {
      setScrolled(y > 40);
      if (Math.abs(y - last) < 6) return;
      setHidden(y > last && y > 240);
      last = y;
    });
  }, []);

  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline({ paused: true })
        .set(el, { visibility: "visible" })
        .fromTo(el, { clipPath: "circle(0% at 100% 0%)" }, { clipPath: "circle(150% at 100% 0%)", duration: 0.9, ease: "expo.inOut" })
        .from(".menu-link-inner", { yPercent: 120, rotate: 4, duration: 0.9, stagger: 0.06, ease: "expo.out" }, "-=0.45")
        .from(".menu-foot > *", { opacity: 0, y: 20, duration: 0.6, stagger: 0.05, ease: "power3.out" }, "-=0.7");
    }, el);
    return () => ctx.revert();
  }, []);

  const prevOpen = useRef(false);
  useEffect(() => {
    // Only act on real open/close changes, so mounting never unlocks scroll under the preloader
    if (prevOpen.current === open) return;
    prevOpen.current = open;
    if (!tl.current) return;
    if (open) tl.current.timeScale(1).play();
    else tl.current.timeScale(1.6).reverse();
    lockScroll(open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    window.setTimeout(() => scrollToId(id), open ? 450 : 0);
  };

  return (
    <>
      <header className={`nav ${hidden && !open ? "nav--hidden" : ""} ${scrolled ? "nav--scrolled" : ""}`}>
        <button className="nav-logo" onClick={scrollToTop} aria-label="Infernos — back to top">
          <LogoMark size={30} />
          <span className="nav-word">INFERNOS</span>
        </button>

        <nav className="nav-links" aria-label="Primary">
          {navLinks.slice(0, 4).map((l) => (
            <button key={l.id} className="nav-link" onClick={() => go(l.id)}>
              <span data-text={l.label}>{l.label}</span>
            </button>
          ))}
        </nav>

        <div className="nav-right">
          <span className="nav-time">
            <span className="nav-time-dot" /> Sangli {time} IST
          </span>
          <RollButton className="nav-cta" onClick={() => go("contact")}>
            Let's talk
          </RollButton>
          <button
            className={`burger ${open ? "burger--open" : ""}`}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className="menu" ref={menuRef} aria-hidden={!open}>
        <div className="menu-glow" />
        <nav className="menu-links" aria-label="Menu">
          {navLinks.map((l, i) => (
            <button key={l.id} className="menu-link" onClick={() => go(l.id)} tabIndex={open ? 0 : -1}>
              <span className="menu-link-inner">
                <span className="menu-index">0{i + 1}</span>
                {l.label}
              </span>
            </button>
          ))}
        </nav>
        <div className="menu-foot">
          <a href={`mailto:${CONTACT.email}`} tabIndex={open ? 0 : -1}>
            {CONTACT.email}
          </a>
          <div className="menu-socials">
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>Instagram</a>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>LinkedIn</a>
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>WhatsApp</a>
          </div>
          <span className="menu-city">{CONTACT.city}</span>
        </div>
      </div>
    </>
  );
};

export default Nav;

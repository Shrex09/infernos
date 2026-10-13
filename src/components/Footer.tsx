import React, { useEffect, useRef } from "react";
import { gsap, scrollToId, scrollToTop } from "../lib/motion";
import { CONTACT, navLinks } from "../data";
import { LogoMark } from "./ui";

const Footer: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(".fw-letter", {
        yPercent: 100,
        duration: 1.4,
        stagger: 0.05,
        ease: "expo.out",
        scrollTrigger: { trigger: ".footer-word", start: "top 95%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} className="footer" data-orb="0 -1.32 1.5 0.9" data-orb-mobile="0 -1.15 1.5 0.9">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <LogoMark size={40} />
            <p>
              Igniting <em className="serif-accent">extraordinary</em> — web, mobile & e-commerce products from Sangli
              to everywhere.
            </p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <span className="footer-col-title">Navigate</span>
              {navLinks.map((l) => (
                <button key={l.id} className="footer-link" onClick={() => scrollToId(l.id)}>
                  {l.label}
                </button>
              ))}
            </div>
            <div className="footer-col">
              <span className="footer-col-title">Connect</span>
              <a className="footer-link" href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
              <a className="footer-link" href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="footer-link" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a className="footer-link" href={`mailto:${CONTACT.email}`}>Email</a>
            </div>
            <div className="footer-col">
              <span className="footer-col-title">Studio</span>
              <a className="footer-link" href={CONTACT.maps} target="_blank" rel="noopener noreferrer">
                Sangli, Maharashtra
              </a>
              <span className="footer-muted">India · IST (UTC+5:30)</span>
            </div>
          </div>
        </div>

        <div className="footer-word" aria-hidden="true">
          {"INFERNOS".split("").map((c, i) => (
            <span className="fw-mask" key={i}>
              <span className="fw-letter">{c}</span>
            </span>
          ))}
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Infernos IT Solutions</span>
          <span className="footer-built">Designed & engineered in-house · React · Three.js · GSAP</span>
          <button className="footer-top-btn" onClick={scrollToTop} data-cursor="Top">
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

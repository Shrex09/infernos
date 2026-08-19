import React, { useEffect, useRef, useState } from "react";
import { useReveal, revealStyle } from "../hooks";

interface Project {
  title: string;
  desc: string;
  features: string[];
  link?: string;
  video?: string;
  img?: string[];
  domain?: string;
}

const projects: Project[] = [
  {
    title: "Yashraj Business Group",
    desc: "Premium architectural business solutions, job portals, and professional services.",
    video: "/compressed_yashraj.mp4",
    link: "https://www.yashrajbusinessgroup.com/",
    domain: "yashrajbusinessgroup.com",
    features: ["Premium architectural solutions", "Integrated job portal", "Professional services showcase"],
  },
  {
    title: "Prerna Sarees",
    desc: "E-commerce platform for a saree brand — full catalog, category browsing and a fast, mobile-first shopping flow.",
    video: "/compressed_prernasarees.mp4",
    link: "https://prernasaree.com/",
    domain: "prernasaree.com",
    features: ["Product catalog with rich visuals", "Category-based browsing", "Optimized for mobile shoppers"],
  },
  {
    title: "Shubharambh Events",
    desc: "Event management site showcasing services and past events, built to convert visitors into inquiries.",
    video: "/compressed_shubharambh.mp4",
    link: "https://www.shubharambhevents.co.in/",
    domain: "shubharambhevents.co.in",
    features: ["Service showcase with media", "Inquiry-optimized layout", "Responsive across devices"],
  },
  {
    title: "Muscle Build Nutrition",
    desc: "Performance-focused supplement store with structured product data and a fast purchase path.",
    video: "/compressed_mb.mp4",
    link: "https://www.musclebuildnutrition.co.in/",
    domain: "musclebuildnutrition.co.in",
    features: ["Detailed supplement catalog", "Fast browsing & checkout flow", "Clear category navigation"],
  },
  {
    title: "Developer Portfolio",
    desc: "Interactive developer portfolio with video previews, smooth animations and a component-based architecture.",
    video: "/compressed_portfolio.mp4",
    link: "https://amit-lad-portfolio-dev.vercel.app/",
    domain: "vercel.app",
    features: ["Video & image project previews", "Modern animated UI", "Scalable component architecture"],
  },
  {
    title: "Mayur Nursery",
    desc: "E-commerce plant platform with catalog, care guides and inventory management for a growing nursery.",
    video: "/compressed_m1.mp4",
    link: "https://mayurnursery.in.net/?i=2",
    domain: "mayurnursery.in.net",
    features: ["Product catalog", "Plant care guides", "Inventory management"],
  },
  {
    title: "Natural Photo Studios",
    desc: "Elegant photography studio website for Sangli's premium studio — showcasing portfolios, services, and a seamless booking experience.",
    video: "/compressed_natural.mp4",
    link: "https://www.naturalphotostudios.in/",
    domain: "naturalphotostudios.in",
    features: ["Portfolio showcase with rich visuals", "Studio services & packages", "Booking & inquiry flow"],
  },
  {
    title: "Noble Security Services",
    desc: "Professional security services company in Sangli — conveying trust, authority and reliability with a clean corporate web presence.",
    video: "/compressed_noble.mp4",
    link: "https://www.noblesecurityservices.com/",
    domain: "noblesecurityservices.com",
    features: ["Corporate service showcase", "Trust-focused design", "Contact & inquiry system"],
  },
  {
    title: "E-Tech Elevators",
    desc: "Modern elevator solutions company based in Pune — a professional corporate site showcasing products, installations and after-sales services.",
    video: "/compressed_etech.mp4",
    link: "https://www.e-techelevators.com/",
    domain: "e-techelevators.com",
    features: ["Product & solutions showcase", "Installation & service listings", "Corporate inquiry flow"],
  },
];

const TOTAL = projects.length;

/** Shortest signed distance (in index units) from `pos` to card `i`, wrapping around the loop. */
const wrappedDelta = (i: number, pos: number) => {
  let d = i - pos;
  d -= TOTAL * Math.round(d / TOTAL);
  return d;
};

const normalize = (pos: number) => ((pos % TOTAL) + TOTAL) % TOTAL;

const Work: React.FC = () => {
  const head = useReveal();
  const body = useReveal();

  const [pos, setPos] = useState(0);
  const [dragging, setDragging] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ startX: 0, startPos: 0, moved: 0, stepPx: 300 });
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Videos only truly autoplay on mount in React, so drive play/pause
  // imperatively as the carousel rotates to keep the near-center cards live.
  useEffect(() => {
    projects.forEach((_, i) => {
      const v = videoRefs.current[i];
      if (!v) return;
      if (Math.abs(wrappedDelta(i, pos)) < 1.5) v.play().catch(() => {});
      else v.pause();
    });
  }, [pos]);

  const settle = (next: number) => setPos(normalize(Math.round(next)));

  const onPointerDown = (e: React.PointerEvent) => {
    const wrap = wrapRef.current;
    const cardWidth = wrap ? wrap.clientWidth * Math.min(0.42, 380 / wrap.clientWidth) : 380;
    drag.current = { startX: e.clientX, startPos: pos, moved: 0, stepPx: Math.max(cardWidth * 0.78, 140) };
    setDragging(true);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    setPos(drag.current.startPos - dx / drag.current.stepPx);
  };

  const endDrag = () => {
    if (!dragging) return;
    setDragging(false);
    settle(pos);
  };

  const goTo = (i: number) => settle(pos + wrappedDelta(i, pos));

  const activeIndex = Math.round(normalize(pos));

  return (
    <section id="work" className="section" style={styles.section}>
      <div style={styles.bgGlow} />
      <div className="section-inner">
        <div ref={head.ref} style={{ ...styles.header, ...revealStyle(head.visible) }}>
          <span className="kicker">Selected work</span>
          <h2 className="section-heading">
            Shipped &amp; running <span className="text-gradient">in production</span>
          </h2>
          <p className="section-sub">
            Real products for real businesses — drag to spin through the
            projects, or click a card to open the live site.
          </p>
        </div>

        <div ref={body.ref} style={{ ...revealStyle(body.visible, 150) }}>
          <div
            ref={wrapRef}
            className="work-carousel-box"
            style={{ ...styles.carouselBox, touchAction: "pan-y", cursor: dragging ? "grabbing" : "grab" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerLeave={dragging ? endDrag : undefined}
          >
            {projects.map((project, i) => {
              const delta = wrappedDelta(i, pos);
              const abs = Math.abs(delta);
              const isCenter = abs < 0.5;
              const visible = abs < 1.8;
              const scale = Math.max(0.55, 1 - Math.min(abs, 3) * 0.16);
              const rotateY = Math.max(-60, Math.min(60, delta * -20));
              // Immediate neighbours stay fully opaque — on this light theme a
              // faded white card against a near-white page just dissolves into
              // nothing, so depth comes from scale/rotation, not transparency.
              // Anything past the immediate neighbour drops out fast instead
              // of lingering as a washed-out ghost.
              const opacity = Math.max(0, Math.min(1, 1 - Math.max(0, abs - 1) * 1.25));
              const zIndex = Math.round(200 - abs * 10);

              const activate = () => {
                if (isCenter) {
                  if (project.link) window.open(project.link, "_blank", "noopener,noreferrer");
                } else {
                  goTo(i);
                }
              };

              return (
                <div
                  key={project.title}
                  className="work-card"
                  role="button"
                  tabIndex={visible ? 0 : -1}
                  aria-label={isCenter ? `Open ${project.title} — visit live site` : `Bring ${project.title} to center`}
                  onClick={(e) => {
                    if (drag.current.moved > 6) {
                      e.preventDefault();
                      return;
                    }
                    activate();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      activate();
                    }
                  }}
                  style={{
                    ...styles.card,
                    transform: `translate(-50%, -50%) translateX(${delta * 78}%) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex,
                    pointerEvents: visible ? "auto" : "none",
                    transition: dragging
                      ? "none"
                      : "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease, background-color 0.3s ease",
                    cursor: isCenter && project.link ? "pointer" : "pointer",
                    ...(isCenter && styles.cardCenter),
                  }}
                >
                  <div className="work-media" style={styles.mediaWrap}>
                    {project.video ? (
                      <video
                        ref={(el) => (videoRefs.current[i] = el)}
                        src={project.video}
                        style={styles.media}
                        autoPlay={abs < 1.5}
                        loop
                        muted
                        playsInline
                        preload="metadata"
                      />
                    ) : Array.isArray(project.img) ? (
                      <img src={project.img[0]} alt={project.title} style={styles.media} draggable={false} />
                    ) : null}
                    {project.link && isCenter && <span style={styles.liveChip}>● LIVE — VISIT ↗</span>}
                  </div>
                  <div className="work-card-content" style={styles.cardContent}>
                    <div style={styles.cardTitleRow}>
                      <h3 style={styles.cardTitle}>{project.title}</h3>
                      {project.domain && <span style={styles.domain}>{project.domain}</span>}
                    </div>
                    <p className="work-desc" style={styles.cardDesc}>{project.desc}</p>
                    <ul className="work-features" style={styles.featuresList}>
                      {project.features.map((feature) => (
                        <li key={feature} style={styles.featureItem}>
                          <span style={styles.featureTick}>›</span> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <p style={styles.dragHint}>← Drag to spin through projects →</p>

          <div style={styles.dots}>
            {projects.map((p, i) => (
              <button
                key={p.title}
                onClick={() => goTo(i)}
                aria-label={`Show ${p.title}`}
                aria-current={i === activeIndex}
                style={styles.dotHit}
              >
                <span
                  style={{
                    ...styles.dot,
                    width: i === activeIndex ? 28 : 8,
                    background: i === activeIndex ? "linear-gradient(90deg, #e8431c, #ffa53c)" : "var(--border)",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: "var(--bg)",
    overflow: "hidden",
  },
  bgGlow: {
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translateX(-50%)",
    width: 1100,
    height: 600,
    background: "radial-gradient(ellipse, rgba(220, 75, 20, 0.1), transparent 65%)",
    filter: "blur(50px)",
    pointerEvents: "none",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
    marginBottom: 48,
    alignItems: "center",
    textAlign: "center",
  },
  carouselBox: {
    position: "relative",
    width: "100%",
    height: 580,
    perspective: "1400px",
    userSelect: "none",
  },
  card: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: "min(380px, 84vw)",
    height: 540,
    borderRadius: 20,
    overflow: "hidden",
    background: "var(--bg-2)",
    border: "1px solid var(--border)",
    willChange: "transform, opacity",
    backdropFilter: "blur(12px)",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 10px 40px -10px rgba(232, 67, 28, 0.12), 0 2px 12px -4px rgba(0,0,0,0.08)",
  },
  cardCenter: {
    boxShadow: "0 30px 80px -20px rgba(232, 67, 28, 0.35), 0 8px 30px -8px rgba(0,0,0,0.12)",
    border: "1.5px solid rgba(255, 140, 60, 0.5)",
  },
  mediaWrap: {
    position: "relative",
    height: 220,
    flexShrink: 0,
  },
  media: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  liveChip: {
    position: "absolute",
    top: 12,
    right: 12,
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    fontWeight: 600,
    color: "var(--accent-text)",
    background: "var(--bg)",
    border: "1px solid rgba(255, 106, 43, 0.4)",
    borderRadius: 999,
    padding: "5px 12px",
    backdropFilter: "blur(6px)",
    letterSpacing: "0.08em",
  },
  cardContent: {
    padding: 22,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    flex: 1,
  },
  cardTitleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 10,
    flexWrap: "wrap",
  },
  cardTitle: {
    fontFamily: "var(--font-display)",
    color: "var(--text)",
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: "-0.01em",
  },
  domain: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    color: "var(--accent-text)",
  },
  cardDesc: {
    color: "var(--muted)",
    fontSize: 14,
    lineHeight: 1.6,
  },
  featuresList: {
    marginTop: 6,
    paddingLeft: 0,
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: 7,
  },
  featureItem: {
    fontSize: 13,
    color: "var(--muted)",
    display: "flex",
    gap: 8,
    lineHeight: 1.5,
  },
  featureTick: {
    color: "var(--accent-text)",
    fontWeight: 700,
  },
  dragHint: {
    textAlign: "center",
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    letterSpacing: "0.04em",
    color: "var(--faint)",
    marginTop: 6,
  },
  dots: {
    display: "flex",
    justifyContent: "center",
    marginTop: 8,
  },
  dotHit: {
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },
  dot: {
    display: "block",
    height: 8,
    borderRadius: 999,
    transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
  },
};

export default Work;

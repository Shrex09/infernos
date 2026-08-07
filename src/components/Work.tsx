import React, { useState, useEffect, useRef } from "react";
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

const Work: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const pausedRef = useRef(false);
  const head = useReveal();
  const body = useReveal();

  // Auto-rotate (pauses on hover)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!pausedRef.current) setIndex((prev) => (prev + 1) % projects.length);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  // Slideshow for image-based projects
  useEffect(() => {
    const current = projects[index];
    if (!Array.isArray(current.img)) return;
    const images = current.img;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [index]);

  const getPosition = (i: number) => {
    const diff = (i - index + projects.length) % projects.length;
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === projects.length - 1) return "left";
    return "hidden";
  };

  const prev = () => setIndex((i) => (i - 1 + projects.length) % projects.length);
  const next = () => setIndex((i) => (i + 1) % projects.length);

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
            Real products for real businesses — click any project to open the
            live site.
          </p>
        </div>

        <div
          ref={body.ref}
          style={{ ...styles.carouselBox, ...revealStyle(body.visible, 150) }}
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
        >
          <div style={styles.carouselWrapper}>
            {projects.map((project, i) => {
              const position = getPosition(i);
              return (
                <div
                  key={project.title}
                  onClick={() => project.link && window.open(project.link, "_blank")}
                  style={{
                    ...styles.card,
                    ...(position === "center" && styles.center),
                    ...(position === "left" && styles.left),
                    ...(position === "right" && styles.right),
                    ...(position === "hidden" && styles.hidden),
                    cursor: project.link ? "pointer" : "default",
                  }}
                >
                  <div style={styles.mediaWrap}>
                    {project.video ? (
                      <video src={project.video} style={styles.media} autoPlay loop muted playsInline />
                    ) : Array.isArray(project.img) ? (
                      <img
                        src={position === "center" ? project.img[slideIndex % project.img.length] : project.img[0]}
                        alt={project.title}
                        style={styles.media}
                      />
                    ) : null}
                    {project.link && position === "center" && (
                      <span style={styles.liveChip}>● LIVE — VISIT ↗</span>
                    )}
                  </div>
                  <div style={styles.cardContent}>
                    <div style={styles.cardTitleRow}>
                      <h3 style={styles.cardTitle}>{project.title}</h3>
                      {project.domain && <span style={styles.domain}>{project.domain}</span>}
                    </div>
                    <p style={styles.cardDesc}>{project.desc}</p>
                    <ul style={styles.featuresList}>
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

          {/* Controls */}
          <button style={{ ...styles.arrow, left: 8 }} onClick={prev} aria-label="Previous project">‹</button>
          <button style={{ ...styles.arrow, right: 8 }} onClick={next} aria-label="Next project">›</button>
        </div>

        <div style={styles.dots}>
          {projects.map((p, i) => (
            <button
              key={p.title}
              onClick={() => setIndex(i)}
              aria-label={`Show ${p.title}`}
              style={{
                ...styles.dot,
                width: i === index ? 28 : 8,
                background: i === index ? "linear-gradient(90deg, #e8431c, #ffa53c)" : "var(--border)",
              }}
            />
          ))}
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
    height: 600,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  carouselWrapper: {
    position: "relative",
    width: "100%",
    height: 580,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    perspective: "1400px",
  },
  card: {
    position: "absolute",
    width: "min(400px, 86vw)",
    height: 560,
    borderRadius: 20,
    overflow: "hidden",
    background: "var(--bg-2)",
    border: "1px solid var(--border)",
    transition:
      "transform 0.85s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.85s ease, border-color 0.85s ease",
    willChange: "transform, opacity",
    backdropFilter: "blur(12px)",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 10px 40px -10px rgba(232, 67, 28, 0.12), 0 2px 12px -4px rgba(0,0,0,0.08)",
  },
  center: {
    transform: "translateX(0) scale(1)",
    zIndex: 3,
    opacity: 1,
    boxShadow: "0 30px 80px -20px rgba(232, 67, 28, 0.35), 0 8px 30px -8px rgba(0,0,0,0.12)",
    border: "1.5px solid rgba(255, 140, 60, 0.5)",
  },
  left: {
    transform: "translateX(-340px) rotateY(22deg) scale(0.82)",
    zIndex: 2,
    opacity: 0.65,
  },
  right: {
    transform: "translateX(340px) rotateY(-22deg) scale(0.82)",
    zIndex: 2,
    opacity: 0.65,
  },
  hidden: {
    transform: "translateX(0) scale(0.7)",
    zIndex: 1,
    opacity: 0,
    pointerEvents: "none",
  },
  mediaWrap: {
    position: "relative",
    height: 230,
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
    color: "var(--accent-bright)",
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
    color: "var(--accent-bright)",
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
    color: "var(--accent-bright)",
    fontWeight: 700,
  },
  arrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 5,
    width: 46,
    height: 46,
    borderRadius: "50%",
    border: "1px solid rgba(255, 130, 55, 0.3)",
    background: "rgba(18, 10, 7, 0.8)",
    color: "#ffc296",
    fontSize: 26,
    lineHeight: 1,
    cursor: "pointer",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 4,
    transition: "all 0.25s ease",
  },
  dots: {
    display: "flex",
    gap: 8,
    justifyContent: "center",
    marginTop: 28,
  },
  dot: {
    height: 8,
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
    transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
  },
};

export default Work;

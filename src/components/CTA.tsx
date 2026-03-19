import React, { useState, useEffect } from "react";

const projects = [
  {
    title: "Portfolio",
    desc: "A modern, visually engaging developer portfolio showcasing innovative projects, clean UI design, and interactive user experiences.",
    video: "/portfolio.mp4",
    features: [
  "Interactive project showcase with video & image previews",
  "Responsive design optimized for all devices",
  "Modern UI with smooth animations and hover effects",
  "Dynamic and scalable component-based architecture"
],
link: "https://amit-lad-portfolio-dev.vercel.app/",
  },
  {
    title: "Mayur Nursery",
    desc: "E-commerce plant platform",
    features: ["Product catalog", "Care guides", "Inventory management"],
    video: "/m1.mp4",
    link: "https://mayurnursery.in.net/?i=2",
  },
  {
    title: "MediCore",
    desc: "This project stands out as a complete digital healthcare ecosystem—efficient, user-centric, and built for real-world impact.",
    features: [
  "Patient dashboard",
  "Appointment booking & management",
  "Doctor search & discovery",
  "Digital health records",
  "Prescription tracking",
  "Smart notifications & reminders",
  "Health insights & analytics",
],
    img: ["/m1.jpeg","/m2.jpeg","/m3.jpeg","/m4.jpeg","/m5.jpeg"],
  },
];

const CTA: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);

  // 🔄 Auto rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % projects.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  const currentProject = projects[index];

  if (Array.isArray(currentProject.img)) {
  const images = currentProject.img; // 👈 store safely

  const interval = setInterval(() => {
    setSlideIndex((prev) => (prev + 1) % images.length);
  }, 2000);

  return () => clearInterval(interval);
}
}, [index]);

  const getPosition = (i: number) => {
    const diff = (i - index + projects.length) % projects.length;
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    return "left";
  };

  return (
    <section id="cta" style={styles.section}>
      <div style={styles.container}>
        
        {/* 🔹 TEXT (UNCHANGED) */}
        <div style={styles.content}>
          <div style={styles.inner}>
            <h2 style={styles.heading}>Ready to build something great</h2>
            <p style={styles.text}>
              Let's talk about your project and find out how we can help you reach your goals.
            </p>
          </div>
          <div style={styles.actions}>
            <a 
              href="#footer" 
              style={styles.btnPrimary}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact us
            </a>
          </div>
        </div>

        {/* 🔥 CAROUSEL INSIDE BOX */}
        <div style={styles.carouselBox}>
          <div style={styles.carouselWrapper}>
            {projects.map((project, i) => {
              const position = getPosition(i);

              return (
                <div
                  key={i}
                  onClick={() => window.open(project.link, "_blank")}
                  style={{
                    ...styles.card,
                    ...(position === "center" && styles.center),
                    ...(position === "left" && styles.left),
                    ...(position === "right" && styles.right),
                  }}
                >
                  {project.video ? (
                    <video
                      src={project.video}
                      style={styles.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : Array.isArray(project.img) ? (
                    <img
                      src={
                        position === "center"
                          ? project.img[slideIndex] // slideshow ONLY for center
                          : project.img[0] // static image for side cards
                      }
                      style={styles.image}
                    />
                  ) : (
                    <img src={project.img} style={styles.image} />
                  )}
                  <div style={styles.cardContent}>
                    <h3 style={styles.cardTitle}>{project.title}</h3>
                    <p style={styles.cardDesc}>{project.desc}</p>
                    {project.features && (
                  <ul style={styles.featuresList}>
                    {project.features.map((feature, idx) => (
                      <li key={idx} style={styles.featureItem}>
                        • {feature}
                      </li>
                    ))}
                  </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: "#000B0D",
    padding: "112px 64px",
    display: "flex",
    justifyContent: "center",
  },

  container: {
    maxWidth: 1280,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 80,
  },

  content: {
    maxWidth: 768,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 32,
  },

  inner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
    textAlign: "center",
  },

  heading: {
    fontFamily: "'Unbounded', sans-serif",
    fontWeight: 700,
    fontSize: "clamp(32px, 4vw, 60px)",
    color: "#FFFFFF",
  },

  text: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 20,
    color: "#FFFFFF",
  },

  actions: {
    display: "flex",
    gap: 16,
  },

  btnPrimary: {
    color: "#fff",
    padding: "6px 12px",
    background: "#0057FF",
    borderRadius: 12,
  },

  btnOutline: {
    color: "#fff",
    padding: "6px 12px",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: 12,
  },

  // 🔥 BOX (REPLACED PLACEHOLDER)
  carouselBox: {
    width: "100%",
    height: 500,
    borderRadius: 16,
    background: "linear-gradient(135deg,000B0D   )",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  // 🍎 CAROUSEL
  carouselWrapper: {
    position: "relative",
    width: "100%",
    height: 400,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    perspective: "1200px",
  },

  card: {
  position: "absolute",
  width: 300,            // 👈 slightly wider
  height: 420,           // 👈 increased height
  borderRadius: 20,
  overflow: "hidden",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(139,92,246,0.3)",
  transition: "all 0.6s ease",
  backdropFilter: "blur(10px)",
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  
},

  center: {
    transform: "translateX(0) scale(1.1)",
    zIndex: 3,
    opacity: 1,
  },

  left: {
    transform: "translateX(-240px) rotateY(25deg) scale(0.9)",
    opacity: 0.5,
  },

  right: {
    transform: "translateX(240px) rotateY(-25deg) scale(0.9)",
    opacity: 0.5,
  },

  image: {
  width: "100%",
  height: 200, // 👈 slightly bigger
  objectFit: "cover",
},  

  cardContent: {
  padding: 16,
  display: "flex",
  flexDirection: "column",
  gap: 6,
  flex: 1, // 👈 important for spacing
},

  cardTitle: {
    color: "#fff",
    fontSize: 18,
  },

  cardDesc: {
    color: "#94A3B8",
    fontSize: 14,
  },

  featuresList: {
  marginTop: 10,
  paddingLeft: 0,
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: 4,
},

featureItem: {
  fontSize: 12,
  color: "#A78BFA", // 👈 purple tone
  opacity: 0.9,
},
};

export default CTA;
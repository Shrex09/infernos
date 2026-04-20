import React, { useState, useEffect } from "react";

const projects = [
  {
    title: "Prerna Sarees",
    desc: "An elegant and user-friendly e-commerce website for sarees, showcasing a wide collection with seamless browsing, smooth navigation, and a visually appealing shopping experience.",
    video: "/prernasarees.mp4",
    link: "https://prernasaree.com/",
    features: [
      "Beautiful product catalog with high-quality visuals",
      "Responsive design for smooth shopping across devices",
      "Easy navigation with category-based browsing",
      "Optimized performance for fast and seamless user experience"
    ],
  },
  {
    title: "Shubharambh Events",
    desc: "A professional and visually captivating event management website showcasing services, past events, and seamless client engagement for memorable experiences.",
    video: "/shubharambh.mp4",
    link: "https://www.shubharambhevents.co.in/",
    features: [
      "Elegant service showcase with rich visual content",
      "Responsive design for smooth viewing across all devices",
      "Clear navigation highlighting event categories and offerings",
      "Engaging layout optimized for client inquiries and conversions"
    ],
  },
  {
    title: "Muscle Build Nutrition",
    desc: "A clean and performance-focused e-commerce website for fitness supplements, designed to deliver a smooth shopping experience with clear product presentation and strong brand appeal.",
    video: "/mb.mp4",
    link: "https://www.musclebuildnutrition.co.in/",
    features: [
      "Structured product catalog with detailed supplement information",
      "Responsive design optimized for mobile and desktop users",
      "Fast and seamless browsing experience for quick purchases",
      "Clear navigation for categories, products, and customer engagement"
    ],
  },
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
    img: ["/m1.jpeg", "/m2.jpeg", "/m3.jpeg", "/m4.jpeg", "/m5.jpeg"],
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
    if (diff === projects.length - 1) return "left";
    return "hidden";
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
                    ...(position === "hidden" && styles.hidden),
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
    height: 560,
    borderRadius: 16,
    background: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  // 🍎 CAROUSEL
  carouselWrapper: {
    position: "relative",
    width: "100%",
    height: 500,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    perspective: "1200px",
  },

  card: {
    position: "absolute",
    width: 380,            // increased width
    height: 480,           // increased height
    borderRadius: 20,
    overflow: "hidden",
    background: "rgba(25, 30, 40, 0.6)", // better solid dark transparent base
    border: "1px solid rgba(139,92,246,0.2)",
    transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)", // smoother transition
    backdropFilter: "blur(12px)",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
  },

  center: {
    transform: "translateX(0) scale(1)",
    zIndex: 3,
    opacity: 1,
    boxShadow: "0 20px 40px -10px rgba(139,92,246,0.3)",
    border: "1px solid rgba(139,92,246,0.5)",
  },

  left: {
    transform: "translateX(-320px) rotateY(15deg) scale(0.85)",
    zIndex: 2,
    opacity: 0.4,
  },

  right: {
    transform: "translateX(320px) rotateY(-15deg) scale(0.85)",
    zIndex: 2,
    opacity: 0.4,
  },

  hidden: {
    transform: "translateX(0) scale(0.7)",
    zIndex: 1,
    opacity: 0,
    pointerEvents: "none",
  },

  image: {
    width: "100%",
    height: 240, // proportionally larger image
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
import React from "react";

const features = [
  {
    title: "Mission-Driven",
    desc: "We deliver innovative solutions that solve real-world problems and drive business growth.",
    icon: "🎯",
  },
  {
    title: "Collaborative",
    desc: "Our diverse team combines different expertise to create comprehensive digital solutions.",
    icon: "👥",
  },
  {
    title: "Innovation-First",
    desc: "We stay ahead of technology trends to provide cutting-edge solutions for our clients.",
    icon: "💡",
  },
  {
    title: "Quality Assured",
    desc: "Every project undergoes rigorous testing and follows industry best practices.",
    icon: "🛡️",
  },
];


// 🔥 Tilt Hook
const useTilt = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = ref.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateX = ((y - midY) / midY) * 12;
    const rotateY = ((x - midX) / midX) * -12;

    card.style.transform = `
      perspective(1200px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.05)
    `;

    // glow shadow
    card.style.boxShadow = `
      0 25px 60px rgba(139, 92, 246, 0.35),
      0 0 30px rgba(139, 92, 246, 0.4),
      inset 0 0 30px rgba(139, 92, 246, 0.2)
    `;
  };

  const handleLeave = () => {
    const card = ref.current;
    if (!card) return;

    card.style.transform = `
      perspective(1200px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;

    card.style.boxShadow = `
      0 10px 30px rgba(139, 92, 246, 0.15),
      inset 0 0 20px rgba(139, 92, 246, 0.1)
    `;
  };

  return { ref, handleMouseMove, handleLeave };
};


// 🔥 Card Component (FIXED)
const Card = ({ item, setIsHovering }: any) => {
  const { ref, handleMouseMove, handleLeave } = useTilt();

  return (
    <div
      ref={ref}
      style={styles.card}
      onMouseMove={(e) => {
        handleMouseMove(e);
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        handleLeave();
        setIsHovering(false);
      }}
    >
      <div style={styles.innerCard}>
        <div style={styles.icon}>{item.icon}</div>
        <h3 style={styles.cardTitle}>{item.title}</h3>
        <p style={styles.cardDesc}>{item.desc}</p>
      </div>
    </div>
  );
};


const LogoStrip: React.FC = () => {
  const [isHovering, setIsHovering] = React.useState(false);
  const cursorRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <section id="team" style={styles.section}>
      <div style={styles.container}>

        {/* Heading */}
        <div style={styles.header}>
          <h2 style={styles.heading}>
            About <span style={styles.highlight}>Our Team</span>
          </h2>
          <p style={styles.subtext}>
            We're a passionate team of developers specializing in modern web applications, AI/ML solutions, and innovative digital experiences that drive results
          </p>
        </div>

        {/* Cards */}
        <div style={styles.grid}>
          {features.map((item, i) => (
            <Card key={i} item={item} setIsHovering={setIsHovering} />
          ))}
        </div>

       
        

      </div>

      {/* Cursor (ONLY ONE) */}
      <div
        ref={cursorRef}
        style={{
          ...styles.cursor,
          opacity: isHovering ? 1 : 0,
        }}
      />
    </section>
  );
};


const styles: Record<string, React.CSSProperties> = {
  section: {
  background: `
    radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.15), transparent 40%),
    radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15), transparent 40%),
    #000000
  `,
  padding: "100px 64px",
  display: "flex",
  justifyContent: "center",
},

  container: {
    maxWidth: 1200,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 60,
  },

  header: {
    textAlign: "center",
  },

  heading: {
    fontSize: 40,
    fontWeight: 700,
    color: "#FFFFFF",
  },

  highlight: {
    color: "#A78BFA",
  },

  subtext: {
    fontSize: 18,
    color: "#94A3B8",
    maxWidth: 700,
    margin: "0 auto",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 24,
  },

  card: {
    background: "rgba(139, 92, 246, 0.08)",
    backdropFilter: "blur(14px)",
    padding: 24,
    borderRadius: 20,
    border: "1px solid rgba(139, 92, 246, 0.4)",
    cursor: "none",
    transition: "all 0.25s ease",
  },

  innerCard: {
    padding: 16,
  },

  icon: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#A78BFA,#7C3AED)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 28,
    marginBottom: 16,
  },

  cardTitle: {
    fontSize: 18,
    color: "#FFFFFF",
  },

  cardDesc: {
    fontSize: 14,
    color: "#CBD5F5",
  },

  skillsSection: {
    textAlign: "center",
  },

  skillsHeading: {
    fontSize: 24,
    color: "#FFFFFF",
  },

  skillsWrap: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },

  skill: {
  padding: "10px 18px",
  borderRadius: 999,
  background: "rgba(139, 92, 246, 0.1)",
  border: "1px solid rgba(139, 92, 246, 0.3)",
  color: "#E9D5FF",
  fontSize: 14,

  cursor: "none", // 👈 match cards

  transition: "all 0.25s ease",

  display: "inline-block",
},

  cursor: {
    position: "fixed",
    top: 0,
    left: 0,
    width: 80,
    height: 80,
    borderRadius: "50%",
    pointerEvents: "none",
    transform: "translate(-50%, -50%)",
    background: "radial-gradient(circle, rgba(255,255,255,0.6), transparent 70%)",
    boxShadow: "0 0 40px rgba(255,255,255,0.8)",
    transition: "opacity 0.2s ease",
    zIndex: 9999,
  },
};

export default LogoStrip;

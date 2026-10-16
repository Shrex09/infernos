/* ─────────────────────────────────────────────────────────────
   Site content. Every section reads from here, so copy changes
   never require touching layout or animation code.
───────────────────────────────────────────────────────────── */

export const CONTACT = {
  email: "connect.inferno@gmail.com",
  whatsapp: "https://wa.me/7774942956",
  instagram: "https://instagram.com/connect.inferno",
  linkedin: "https://www.linkedin.com/in/infernos-solutions/",
  maps: "https://maps.app.goo.gl/wiWJZhKQf5K1g8rE6",
  city: "Sangli, Maharashtra, India",
};

export interface Project {
  title: string;
  category: string;
  desc: string;
  features: string[];
  link: string;
  cover: string;
  domain: string;
  year: string;
}

export const projects: Project[] = [
  {
    title: "Stylux",
    category: "SaaS · Salon management",
    desc: "Salon management app built for how Indian salons run — GST billing, client dues, staff attendance and payroll, stock alerts and automatic WhatsApp reminders.",
    cover: "/covers/stylux.webp",
    link: "https://stylux.infernos.co.in/",
    domain: "stylux.infernos.co.in",
    features: ["GST billing & numbered invoices", "Staff attendance, payroll & commission", "Automatic WhatsApp reminders"],
    year: "2026",
  },
  {
    title: "1stReply",
    category: "Android app · Automation",
    desc: "Android app that texts every caller your own message the moment a call ends — in Marathi or English, running in the background with quiet hours and per-contact replies.",
    cover: "/covers/1streply.webp",
    link: "https://1streply.infernos.co.in/",
    domain: "1streply.infernos.co.in",
    features: ["Auto SMS after every call", "Marathi & English messages", "Quiet hours, limits & blacklist"],
    year: "2026",
  },
  {
    title: "Yashraj Business Group",
    category: "Corporate · Job portal",
    desc: "Premium architectural business solutions, job portals, and professional services.",
    cover: "/covers/yashraj.webp",
    link: "https://www.yashrajbusinessgroup.com/",
    domain: "yashrajbusinessgroup.com",
    features: ["Premium architectural solutions", "Integrated job portal", "Professional services showcase"],
    year: "2026",
  },
  {
    title: "Prerna Sarees",
    category: "E-commerce",
    desc: "E-commerce platform for a saree brand — full catalog, category browsing and a fast, mobile-first shopping flow.",
    cover: "/covers/prernasarees.webp",
    link: "https://prernasaree.com/",
    domain: "prernasaree.com",
    features: ["Product catalog with rich visuals", "Category-based browsing", "Optimized for mobile shoppers"],
    year: "2026",
  },
  {
    title: "Shubharambh Events",
    category: "Events · Lead gen",
    desc: "Event management site showcasing services and past events, built to convert visitors into inquiries.",
    cover: "/covers/shubharambh.webp",
    link: "https://www.shubharambhevents.co.in/",
    domain: "shubharambhevents.co.in",
    features: ["Service showcase with media", "Inquiry-optimized layout", "Responsive across devices"],
    year: "2025",
  },
  {
    title: "Muscle Build Nutrition",
    category: "E-commerce · Fitness",
    desc: "Performance-focused supplement store with structured product data and a fast purchase path.",
    cover: "/covers/mb.webp",
    link: "https://www.musclebuildnutrition.co.in/",
    domain: "musclebuildnutrition.co.in",
    features: ["Detailed supplement catalog", "Fast browsing & checkout flow", "Clear category navigation"],
    year: "2025",
  },
  {
    title: "E-Tech Elevators",
    category: "Corporate · Industrial",
    desc: "Modern elevator solutions company based in Pune — a professional corporate site showcasing products, installations and after-sales services.",
    cover: "/covers/etech.webp",
    link: "https://www.e-techelevators.com/",
    domain: "e-techelevators.com",
    features: ["Product & solutions showcase", "Installation & service listings", "Corporate inquiry flow"],
    year: "2026",
  },
  {
    title: "Natural Photo Studios",
    category: "Portfolio · Booking",
    desc: "Elegant photography studio website for Sangli's premium studio — showcasing portfolios, services, and a seamless booking experience.",
    cover: "/covers/natural.webp",
    link: "https://www.naturalphotostudios.in/",
    domain: "naturalphotostudios.in",
    features: ["Portfolio showcase with rich visuals", "Studio services & packages", "Booking & inquiry flow"],
    year: "2026",
  },
  {
    title: "Samarth Security Services",
    category: "Corporate · Services",
    desc: "Premier security & facility management solutions provider in Sangli — showcasing trained guards, armed security, housekeeping, and seamless inquiry workflows.",
    cover: "/covers/samarth.webp",
    link: "https://samarthsecurityservices.gadadegroup.in/",
    domain: "samarthsecurityservices.gadadegroup.in",
    features: ["Security & gunman services showcase", "Facility housekeeping solutions", "Direct WhatsApp & call inquiries"],
    year: "2026",
  },
  {
    title: "Noble Security Services",
    category: "Corporate · Trust",
    desc: "Professional security services company in Sangli — conveying trust, authority and reliability with a clean corporate web presence.",
    cover: "/covers/noble.webp",
    link: "https://www.noblesecurityservices.com/",
    domain: "noblesecurityservices.com",
    features: ["Corporate service showcase", "Trust-focused design", "Contact & inquiry system"],
    year: "2026",
  },
  {
    title: "Mayur Nursery",
    category: "E-commerce · Inventory",
    desc: "E-commerce plant platform with catalog, care guides and inventory management for a growing nursery.",
    cover: "/covers/m1.webp",
    link: "https://mayurnursery.in.net/?i=2",
    domain: "mayurnursery.in.net",
    features: ["Product catalog", "Plant care guides", "Inventory management"],
    year: "2025",
  },
  {
    title: "Developer Portfolio",
    category: "Portfolio · Motion",
    desc: "Interactive developer portfolio with video previews, smooth animations and a component-based architecture.",
    cover: "/covers/portfolio.webp",
    link: "https://amit-lad-portfolio-dev.vercel.app/",
    domain: "vercel.app",
    features: ["Video & image project previews", "Modern animated UI", "Scalable component architecture"],
    year: "2025",
  },
];

export interface Service {
  title: string;
  description: string;
  tags: string[];
}

export const services: Service[] = [
  {
    title: "Web platforms",
    description: "Full-stack web applications with clean architecture, fast load times and infrastructure that scales with your traffic.",
    tags: ["React", "Next.js", "Node.js", "APIs"],
  },
  {
    title: "Mobile apps",
    description: "Native and cross-platform mobile apps with smooth performance and store-ready quality on iOS and Android.",
    tags: ["Flutter", "iOS", "Android", "Firebase"],
  },
  {
    title: "UI / UX design",
    description: "Interfaces designed around real user behaviour — wireframes, prototypes and design systems that convert.",
    tags: ["Research", "Prototypes", "Design systems", "3D & motion"],
  },
  {
    title: "E-commerce",
    description: "Storefronts with catalog management, payments and order flows — proven across fashion, fitness and retail clients.",
    tags: ["Catalogs", "Payments", "Checkout", "Inventory"],
  },
  {
    title: "Digital transformation",
    description: "We modernize legacy workflows into reliable digital systems — from inventory scanning to patient records.",
    tags: ["Automation", "Dashboards", "Integrations", "Barcode"],
  },
  {
    title: "Maintenance & support",
    description: "Post-launch monitoring, updates and continuous improvement so the product you ship keeps getting better.",
    tags: ["Monitoring", "Updates", "SEO", "Hosting"],
  },
];

export interface Phase {
  num: string;
  name: string;
  heading: string;
  description: string;
  deliverables: string[];
  code: string;
}

export const phases: Phase[] = [
  {
    num: "01",
    name: "Discover",
    heading: "Discovery & strategy",
    description: "We listen to your goals, analyze your market and define exactly what to build — before a single line of code.",
    deliverables: ["Requirements document", "Technical feasibility report", "Fixed scope & quote"],
    code: "analyze({ goals, market, budget })",
  },
  {
    num: "02",
    name: "Design",
    heading: "Design & architecture",
    description: "Wireframes, interactive prototypes and a technical blueprint — you see and approve the product before development starts.",
    deliverables: ["Clickable prototype", "System architecture diagram", "Design system"],
    code: "createUI({ prototype: 'interactive' })",
  },
  {
    num: "03",
    name: "Develop",
    heading: "Development & integration",
    description: "Engineers build in weekly increments with staging links, so you watch the product come alive — no black box.",
    deliverables: ["Weekly staging builds", "Code in your repository", "Progress reports"],
    code: "app.pushToStaging({ weekly: true })",
  },
  {
    num: "04",
    name: "Test",
    heading: "Testing & QA",
    description: "Functional, performance and security testing across devices before anything reaches your users.",
    deliverables: ["Test reports", "Performance audit", "Security checklist"],
    code: "await runTests({ e2e: true, perf: true })",
  },
  {
    num: "05",
    name: "Launch",
    heading: "Launch & support",
    description: "We deploy to production, hand over documentation and stay on for maintenance, monitoring and improvements.",
    deliverables: ["Production deploy", "Documentation handover", "Ongoing support plan"],
    code: "await deploy({ env: 'production' })",
  },
];

export const techGroups: { label: string; items: string[] }[] = [
  { label: "Frontend", items: ["Flutter", "React", "TypeScript", "Next.js", "Vite", "Tailwind", "Three.js", "GSAP"] },
  { label: "Backend", items: ["Node.js", "Express", "Python", "REST APIs", "WebSockets"] },
  { label: "Data", items: ["MongoDB", "PostgreSQL", "Firebase", "Redis"] },
  { label: "Deploy", items: ["Vercel", "AWS", "Docker", "Git", "CI/CD"] },
];

export const stats = [
  { target: 10, suffix: "+", label: "Projects shipped", note: "across 5 industries" },
  { target: 96, suffix: "%", label: "Client satisfaction", note: "from real client feedback" },
  { target: 6, suffix: "", label: "Products in production", note: "live & maintained today" },
  { target: 2, suffix: "+", label: "Years in business", note: "and growing" },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  logo: string;
  result: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "The e-commerce platform for our nursery has transformed our business. Online sales have increased by 300% since launch. The team understood our needs perfectly.",
    name: "Mayur Koli",
    role: "Owner",
    company: "Mayur Nursery",
    logo: "/mayur.png",
    result: "+300% online sales",
  },
  {
    quote: "The barcode scanning solution has streamlined our inventory management completely. The integration with our existing systems was flawless. Excellent technical skills and support.",
    name: "Sarah Kumar",
    role: "IT Director",
    company: "MGTech Systems",
    logo: "/mg_logo.png",
    result: "Flawless system integration",
  },
  {
    quote: "A modern healthcare platform that redefines convenience by bringing appointments, records, and care into one intelligent system.",
    name: "Dr. Akshay B. Pawar",
    role: "Owner, Doctor",
    company: "MediCore",
    logo: "/medicore.png",
    result: "Unified patient platform",
  },
];

export interface Member {
  id: string;
  name: string;
  role: string;
  avatar: string;
  color: string;
  bio: string;
  stats: { label: string; value: number }[];
}

export const team: Member[] = [
  {
    id: "p1",
    name: "Shreyash",
    role: "The Logic Sovereign",
    avatar: "/shreyas1.png",
    color: "#ff6a2b",
    bio: "Supreme authority over systems, architecture, and technical decisions. Commands APIs, databases, and infrastructure while forging the logic that powers every project.",
    stats: [
      { label: "Architecture", value: 100 },
      { label: "Leadership", value: 95 },
      { label: "Logic Mastery", value: 99 },
    ],
  },
  {
    id: "p2",
    name: "Amit",
    role: "All Rounder / Unrivaled",
    avatar: "/amit1.png",
    color: "#ff3d1a",
    bio: "The undisputed master of every stack. Best in everything, with no competition anywhere near. Passive skill: Absolute Domination.",
    stats: [
      { label: "Logic", value: 100 },
      { label: "Speed", value: 100 },
      { label: "Power", value: 100 },
    ],
  },
  {
    id: "p3",
    name: "Sai",
    role: "The Tri-Realm Sorceress",
    avatar: "/sai1.png",
    color: "#ffc36b",
    bio: "Master of the three domains: Frontend, Backend, and Mobile. Why specialize in one realm when you can build the entire universe?",
    stats: [
      { label: "Backend", value: 97 },
      { label: "Frontend", value: 94 },
      { label: "Mobile", value: 99 },
    ],
  },
  {
    id: "p4",
    name: "Yogini",
    role: "The Service Sorceress",
    avatar: "/yogini1.png",
    color: "#ff8c42",
    bio: "Conjures APIs and orchestrates complex systems with arcane precision. Ultimate move: Connecting services so seamlessly that they appear to communicate by magic.",
    stats: [
      { label: "API Mastery", value: 100 },
      { label: "System Design", value: 97 },
      { label: "Backend Magic", value: 99 },
    ],
  },
  {
    id: "p5",
    name: "Atharva",
    role: "The Visual Alchemist",
    avatar: "/atharv.png",
    color: "#ffb347",
    bio: "Crafts immersive 3D experiences and stunning user interfaces. Merges art with technology to bring digital environments to life. Passive skill: 'Spatial Awareness'.",
    stats: [
      { label: "UI/UX Design", value: 98 },
      { label: "3D Modeling", value: 95 },
      { label: "Aesthetics", value: 97 },
    ],
  },
  {
    id: "p6",
    name: "Soham",
    role: "Frontend Wizard",
    avatar: "/soham1.png",
    color: "#ff5500",
    bio: "Guardian of smooth interactions and flawless interfaces. Wields React, CSS, and animations to craft legendary user journeys. Passive skill: 'Pixel Perfect Precision'.",
    stats: [
      { label: "UI Design", value: 96 },
      { label: "Creativity", value: 92 },
      { label: "Responsiveness", value: 98 },
    ],
  },
  {
    id: "p7",
    name: "Sarthak",
    role: "Vision Architect",
    avatar: "/sarthak.png",
    color: "#ffa020",
    bio: "Dreams in startups, trains in AI, and treats every obstacle as a side quest. Known for turning late-night ideas into real-world projects. Passive skill: 'Infinite Grind' — gains momentum while others log off.",
    stats: [
      { label: "Innovation", value: 97 },
      { label: "Persistence", value: 99 },
      { label: "Learning Speed", value: 94 },
    ],
  },
];

/**
 * Same order for everyone on a given (UTC) day, different each day —
 * so no one permanently owns the first slot.
 */
export const dailyShuffle = <T,>(items: T[]): T[] => {
  const today = new Date();
  const seed = today.getUTCFullYear() * 10000 + (today.getUTCMonth() + 1) * 100 + today.getUTCDate();
  let s = Math.imul(seed ^ 0x6c078965, 1812433253) >>> 0;
  const random = () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

export const navLinks = [
  { label: "Work", id: "work" },
  { label: "Services", id: "services" },
  { label: "Process", id: "process" },
  { label: "Team", id: "team" },
  { label: "Contact", id: "contact" },
];

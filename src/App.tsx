import React, { useEffect } from "react";
import { gsap, ScrollTrigger, useSiteReady } from "./lib/motion";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import CoreCanvas from "./components/CoreCanvas";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Work from "./components/Work";
import Services from "./components/Services";
import Stack from "./components/Stack";
import Process from "./components/Process";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import Team from "./components/Team";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { projects } from "./data";

const App: React.FC = () => {
  const ready = useSiteReady();

  // Generic scroll reveals for anything tagged data-reveal / data-split
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, { y: 40, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%" } });
      });
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        gsap.from(el, {
          yPercent: 40,
          opacity: 0,
          skewY: 4,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  // Layout settles after fonts/preloader — recompute pin and trigger positions
  useEffect(() => {
    if (!ready) return;
    ScrollTrigger.refresh();
    // Refresh is a long task — only repeat it if fonts are genuinely still swapping in
    if (document.fonts && document.fonts.status !== "loaded") document.fonts.ready.then(() => ScrollTrigger.refresh());
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, [ready]);

  return (
    <>
      <Preloader />
      <Cursor />
      <CoreCanvas />
      <Nav />
      <main className="page">
        <Hero />
        <Marquee className="marquee--clients" items={projects.map((p) => p.title)} />
        <About />
        <Work />
        <Services />
        <Marquee
          className="marquee--big"
          speed={70}
          items={["Web platforms", "Mobile apps", "UI / UX", "E-commerce", "3D & motion", "Digital transformation"]}
        />
        <Stack />
        <Process />
        <Stats />
        <Testimonials />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default App;

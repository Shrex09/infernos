import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoStrip from "./components/LogoStrip";
import About from "./components/About";
import Services from "./components/Services";
import Stats from "./components/Stats";
import Timeline from "./components/Timeline";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      <Navbar />
      <Hero />
      <LogoStrip />
      <About />
      <Services />
      <Stats />
      <Timeline />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default App;

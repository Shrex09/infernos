import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import Services from "./components/Services";
import TechStack from "./components/TechStack";
import Process from "./components/Process";
import Work from "./components/Work";
import Stats from "./components/Stats";
import WhyUs from "./components/WhyUs";
import Testimonials from "./components/Testimonials";
import Team from "./components/Team";
import CTABand from "./components/CTABand";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div style={{ width: "100%", overflowX: "hidden", background: "var(--bg)" }}>
      <Navbar />
      <Hero />
      <TrustBar />
      <Services />
      <TechStack />
      <Process />
      <Work />
      <Stats />
      <WhyUs />
      <Testimonials />
      <Team />
      <CTABand />
      <Footer />
    </div>
  );
};

export default App;

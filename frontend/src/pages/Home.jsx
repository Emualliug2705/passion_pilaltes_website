import React from "react";
import useReveal from "../hooks/useReveal";
import HeroSection from "../components/sections/HeroSection";
import ServicesSection from "../components/sections/ServicesSection";
import PrinciplesSection from "../components/sections/PrinciplesSection";
import StudiosSection from "../components/sections/StudiosSection";
import { GallerySection, TestimonialsSection } from "../components/sections/GalleryTestimonials";
import { IntroSection, AboutBettySection, FinalCTASection } from "../components/sections/IntroAbout";

const Home = () => {
  useReveal();

  return (
    <div className="bg-[#faf7f2]">
      <HeroSection />
      <IntroSection />
      <ServicesSection />
      <AboutBettySection />
      <PrinciplesSection />
      <StudiosSection />
      <GallerySection />
      <TestimonialsSection />
      <FinalCTASection />
    </div>
  );
};

export default Home;

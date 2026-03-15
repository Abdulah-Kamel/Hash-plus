import React from "react";
import { NavBar } from "@/components/navbar";
import Footer from "@/components/footer";
import HeroLanding from "@/components/about-us/HeroLanding";
import AboutSection from "@/components/about-us/AboutSection";
import VisionMission from "@/components/about-us/VisionMission";
import FeaturesGrid from "@/components/about-us/FeaturesGrid";
import ContactSection from "@/components/about-us/ContactSection";
import OnlineCourses from "@/components/online-courses";
import Cta from "@/components/cta";

const AboutUsPage = () => {
  return (
    <>
      <HeroLanding />
      <AboutSection />
      <VisionMission />
      <FeaturesGrid />
      <ContactSection />
      <OnlineCourses />
      <Cta />
    </>
  );
};

export default AboutUsPage;
 
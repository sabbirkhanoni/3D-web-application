import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import PricingSection from "../components/landing/PricingSection";
import DocumentationSection from "../components/landing/DocumentationSection";
import FAQSection from "../components/landing/FAQSection";
import CTASection from "../components/landing/CTASection";
import TestimonialsSection from "../components/landing/TestmonialsSection";

const LandingPage = () => {
  return (
    <section>
      <Header />
      <div className="bg-[#05060f] min-h-screen overflow-x-hidden">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <DocumentationSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </div>
    </section>
  );
};

export default LandingPage;

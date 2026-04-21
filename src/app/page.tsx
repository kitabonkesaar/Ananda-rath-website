"use client";

import Navbar from "@/components/Navbar";
import {
  HeroSection,
  StatsSection,
  FeaturedPackagesSection,
  WhyChooseSection,
  TestimonialsSection,
  CTASection,
  Footer,
} from "@/components/HomePage";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <FeaturedPackagesSection />
        <WhyChooseSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <WhatsAppButton variant="floating" />
      <Footer />
    </div>
  );
}

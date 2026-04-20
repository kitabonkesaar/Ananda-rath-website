import Navbar from "@/components/Navbar";
import { HeroSection, StatsSection, FeaturedPackagesSection, WhyChooseSection, TestimonialsSection, CTASection, Footer } from "@/components/HomePage";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";

const Index = () => (
  <div className="flex flex-col min-h-screen">
    <SEO 
      title="Spiritual Yatra Packages from Odisha"
      description="Experience sacred journeys with AnandaRath. Special packages for Kedarnath, Kashi, Badrinath and major spiritual circuits from Odisha. AC Sleeper Bus & meals included."
      keywords="Odisha spiritual tourism, Odisha Tirthayatra, Kedarnath Yatra from Odisha, Kashi Yatra Bhubaneswar, spiritual travel Odisha, Ananda Rath"
    />
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

export default Index;

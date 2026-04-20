import Navbar from "@/components/Navbar";
import { HeroSection, StatsSection, FeaturedPackagesSection, WhyChooseSection, TestimonialsSection, CTASection, Footer } from "@/components/HomePage";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";

/**
 * SEO: Home page - highest priority page
 * - FAQ structured data for common pilgrimage questions
 * - Home breadcrumb only
 * - Rich keywords covering all major yatra destinations
 */
const Index = () => (
  <div className="flex flex-col min-h-screen">
    <SEO 
      title="Spiritual Yatra Packages from Odisha – Kedarnath, Kashi, Badrinath Tours"
      description="AnandaRath offers premium spiritual yatra packages from Odisha. AC Sleeper Bus journeys to Kedarnath, Badrinath, Kashi, Ayodhya, Dwarika & 12 Jyotirlinga circuits. Odia food, experienced guides. Book now!"
      keywords="Odisha spiritual tourism, Kedarnath Yatra from Odisha, Kashi Yatra Bhubaneswar, Badrinath yatra package Odisha, tirth yatra from Odisha, AC sleeper bus pilgrimage, Odia tirth yatra, spiritual travel Odisha, Ananda Rath tours, pilgrimage from Bhubaneswar"
      pageType="home"
      breadcrumbs={[{ name: "Home", url: "/" }]}
      faq={[
        {
          question: "What is the cost of Kedarnath Yatra from Odisha?",
          answer: "AnandaRath offers Kedarnath Yatra packages starting from ₹15,999 per person including AC Sleeper Bus, meals, hotel stay, and guided darshan from Bhubaneswar, Odisha."
        },
        {
          question: "Do you provide AC Sleeper Bus for yatra from Odisha?",
          answer: "Yes! All our yatra packages include premium AC Sleeper Bus (2x1 seating) from multiple pickup points in Odisha including Bhubaneswar, Cuttack, and Berhampur."
        },
        {
          question: "Is food provided during the yatra?",
          answer: "Absolutely! We provide pure vegetarian Odia-style meals throughout the journey, including breakfast, lunch, and dinner at quality restaurants and dhabas."
        },
        {
          question: "How to book a yatra with AnandaRath?",
          answer: "You can book by calling +91 8249529220 or +91 8018958872, through WhatsApp, or by filling the inquiry form on our website. We accept online payments and partial advance booking."
        },
        {
          question: "Which spiritual destinations do you cover from Odisha?",
          answer: "We cover Kedarnath, Badrinath, Kashi (Varanasi), Ayodhya, Dwarika, Somnath, Mahakaleshwar, Ujjain, Mathura, Vrindavan, and complete 12 Jyotirlinga circuits from Odisha."
        }
      ]}
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

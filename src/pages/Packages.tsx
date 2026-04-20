import Navbar from "@/components/Navbar";
import { PackagesSection, Footer } from "@/components/HomePage";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";

/**
 * SEO: Packages listing page
 * - Breadcrumbs: Home > Packages
 * - Keywords target "yatra packages from Odisha" variations
 */
const Packages = () => (
  <div className="flex flex-col min-h-screen">
    <SEO 
      title="All Yatra Packages from Odisha – Kedarnath, Kashi, Dwarika Tours"
      description="Browse AnandaRath's complete list of spiritual yatra packages from Odisha. Kedarnath, Badrinath, Kashi, Ayodhya, Dwarika, Mathura tours with AC Sleeper Bus, meals & hotels included."
      keywords="yatra packages Odisha, Kedarnath yatra price, Kashi yatra package from Bhubaneswar, spiritual tours from Odisha, pilgrimage packages 2026, Badrinath tour cost, Dwarika yatra Odisha, tirth yatra bus booking"
      pageType="packages"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Packages", url: "/packages" },
      ]}
      faq={[
        {
          question: "What yatra packages does AnandaRath offer from Odisha?",
          answer: "AnandaRath offers Kedarnath, Badrinath, Kashi, Ayodhya, Dwarika, Somnath, Mathura, Vrindavan, and 12 Jyotirlinga circuit packages from Odisha with AC Sleeper Bus."
        },
        {
          question: "What is included in AnandaRath yatra packages?",
          answer: "All packages include AC Sleeper Bus (2x1), Odia vegetarian meals, hotel accommodation, guided darshan, travel insurance, and 24/7 support."
        }
      ]}
    />
    <Navbar />
    <main className="flex-1">
      {/* SEO: Visible breadcrumbs for crawl depth */}
      <div className="container pt-4">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "All Packages" },
        ]} />
      </div>
      <PackagesSection />
    </main>
    <WhatsAppButton variant="floating" />
    <Footer />
  </div>
);

export default Packages;

import Navbar from "@/components/Navbar";
import { PackagesSection, Footer } from "@/components/HomePage";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";

const Packages = () => (
  <div className="flex flex-col min-h-screen">
    <SEO 
      title="All Pilgrimage Packages from Odisha"
      description="Browse our complete list of spiritual yatra packages. From Kedarnath and Badrinath to Kashi and Ayodhya, find your perfect divine journey here."
      keywords="yatra packages Odisha, Kedarnath yatra price, Kashi yatra package, spiritual tours from Odisha, pilgrimage packages 2026"
    />
    <Navbar />
    <main className="flex-1">
      <PackagesSection />
    </main>
    <WhatsAppButton variant="floating" />
    <Footer />
  </div>
);

export default Packages;

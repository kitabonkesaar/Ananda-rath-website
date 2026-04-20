import Navbar from "@/components/Navbar";
import { PackagesSection, Footer } from "@/components/HomePage";
import WhatsAppButton from "@/components/WhatsAppButton";

const Packages = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1">
      <PackagesSection />
    </main>
    <WhatsAppButton variant="floating" />
    <Footer />
  </div>
);

export default Packages;

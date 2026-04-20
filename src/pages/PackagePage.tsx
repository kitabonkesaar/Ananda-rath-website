import Navbar from "@/components/Navbar";
import PackageDetail from "@/components/PackageDetail";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Footer } from "@/components/HomePage";

const PackagePage = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1">
      <PackageDetail />
    </main>
    <WhatsAppButton variant="floating" />
    <Footer />
  </div>
);

export default PackagePage;

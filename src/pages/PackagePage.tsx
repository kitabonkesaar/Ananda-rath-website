import Navbar from "@/components/Navbar";
import PackageDetail from "@/components/PackageDetail";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Footer } from "@/components/HomePage";

/**
 * SEO: Individual package detail page
 * - PackageDetail component handles its own SEO with:
 *   - TouristTrip structured data (JSON-LD)
 *   - Dynamic breadcrumbs (Home > Packages > Package Name)
 *   - Dynamic title, description from package data
 *   - Price structured data for rich results
 */
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

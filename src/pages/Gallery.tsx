import Navbar from "@/components/Navbar";
import { GallerySection, Footer } from "@/components/HomePage";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";

const Gallery = () => (
  <div className="flex flex-col min-h-screen">
    <SEO 
      title="Sacred Memories - Yatra Gallery"
      description="View photos from our recent spiritual journeys to Kedarnath, Kashi, and other holy places. Real photos from nuestro pilgrims from Odisha."
      keywords="yatra gallery, Kedarnath photos, Kashi yatra photos, AnandaRath gallery, spiritual tourism Odisha photos"
    />
    <Navbar />
    <main className="flex-1">
      <GallerySection />
    </main>
    <WhatsAppButton variant="floating" />
    <Footer />
  </div>
);

export default Gallery;

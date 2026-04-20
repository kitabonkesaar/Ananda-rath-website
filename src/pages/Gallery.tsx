import Navbar from "@/components/Navbar";
import { GallerySection, Footer } from "@/components/HomePage";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";

/**
 * SEO: Gallery page
 * - Breadcrumbs for crawl depth
 * - Image-focused keywords for Google Image search
 */
const Gallery = () => (
  <div className="flex flex-col min-h-screen">
    <SEO 
      title="Yatra Photo Gallery – Sacred Memories from Our Pilgrimages"
      description="View real photos from AnandaRath spiritual journeys to Kedarnath, Kashi, Badrinath and other holy destinations. See how our pilgrims from Odisha experience divine travel."
      keywords="yatra gallery photos, Kedarnath photos Odisha, Kashi yatra images, AnandaRath pilgrimage gallery, spiritual tourism photos, temple photos India, Odisha pilgrims photos"
      pageType="gallery"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Gallery", url: "/gallery" },
      ]}
    />
    <Navbar />
    <main className="flex-1">
      <div className="container pt-4">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Photo Gallery" },
        ]} />
      </div>
      <GallerySection />
    </main>
    <WhatsAppButton variant="floating" />
    <Footer />
  </div>
);

export default Gallery;

"use client";

import Navbar from "@/components/Navbar";
import { GallerySection, Footer } from "@/components/HomePage";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <GallerySection />
      </main>
      <WhatsAppButton variant="floating" />
      <Footer />
    </div>
  );
}

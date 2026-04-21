"use client";

import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { PackagesSection, Footer } from "@/components/HomePage";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function PackagesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <PackagesSection />
      </main>
      <WhatsAppButton variant="floating" />
      <Footer />
    </div>
  );
}

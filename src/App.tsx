import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index.tsx";
import Packages from "./pages/Packages.tsx";
import Gallery from "./pages/Gallery.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import PackagePage from "./pages/PackagePage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import VideoTestimonials from "./pages/VideoTestimonials.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/video-testimonials" element={<VideoTestimonials />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/package/:id" element={<PackagePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

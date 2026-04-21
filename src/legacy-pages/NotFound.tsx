import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/HomePage";
import SEO from "@/components/SEO";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => (
  <div className="flex flex-col min-h-screen">
    <SEO 
      title="404 - Page Not Found"
      description="The page you are looking for does not exist. Return to AnandaRath to explore our spiritual yatra packages from Odisha."
      noIndex={true}
    />
    <Navbar />
    <main className="flex-1 flex items-center justify-center py-20">
      <div className="text-center px-4">
        <p className="text-8xl font-extrabold text-primary/20 mb-4">404</p>
        <h1 className="text-2xl font-bold text-foreground mb-2">Page Not Found</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist. It might have been removed or the URL might be incorrect.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full gradient-saffron px-6 py-3 text-sm font-semibold text-white shadow-saffron transition-all hover:scale-105"
          >
            <Home className="h-4 w-4" />
            Go to Homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-full border-2 border-border px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default NotFound;

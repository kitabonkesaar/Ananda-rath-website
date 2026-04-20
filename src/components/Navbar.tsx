import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import WhatsAppButton from "./WhatsAppButton";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/packages", label: "Packages" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/video-testimonials", label: "Reviews" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/50 bg-background/95 backdrop-blur-lg shadow-sm"
          : "bg-background/80 backdrop-blur-md"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center group" aria-label="AnandaRath Home">
          <img src={logo} alt="AnandaRath - Spiritual Tourism" className="h-[52px] w-auto transition-transform group-hover:scale-[1.02]" />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                location.pathname === link.to
                  ? "text-primary bg-primary/5"
                  : "text-foreground/60 hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-2">
            <WhatsAppButton label="WhatsApp" />
          </div>
        </div>

        <button 
          onClick={() => setOpen(!open)} 
          className="md:hidden text-foreground p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-navigation"
        role="navigation"
        aria-label="Mobile navigation"
        className={`border-t border-border bg-background md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                location.pathname === link.to
                  ? "text-primary bg-primary/5"
                  : "text-foreground/70 hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2">
            <WhatsAppButton label="Enquire on WhatsApp" className="w-full justify-center" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

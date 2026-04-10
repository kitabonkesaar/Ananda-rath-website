import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import WhatsAppButton from "./WhatsAppButton";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="AnandaRath" className="h-10 w-10" />
          <span className="text-xl font-bold text-foreground">
            Ananda<span className="text-gradient-saffron">Rath</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary">Home</Link>
          <a href="/#packages" className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary">Packages</a>
          <a href="/#gallery" className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary">Gallery</a>
          <a href="/#about" className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary">About</a>
          <a href="/#contact" className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary">Contact</a>
          <WhatsAppButton label="WhatsApp" />
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background p-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link to="/" className="text-sm font-medium text-foreground/70" onClick={() => setOpen(false)}>Home</Link>
            <a href="/#packages" className="text-sm font-medium text-foreground/70" onClick={() => setOpen(false)}>Packages</a>
            <a href="/#gallery" className="text-sm font-medium text-foreground/70" onClick={() => setOpen(false)}>Gallery</a>
            <a href="/#about" className="text-sm font-medium text-foreground/70" onClick={() => setOpen(false)}>About</a>
            <a href="/#contact" className="text-sm font-medium text-foreground/70" onClick={() => setOpen(false)}>Contact</a>
            <WhatsAppButton label="Enquire on WhatsApp" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

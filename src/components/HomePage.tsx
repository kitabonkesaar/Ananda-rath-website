import { Link } from "react-router-dom";
import { Clock, MapPin, Star, Bus, Utensils, Shield, Heart, Image, Phone, Mail, MapPinned, ArrowRight, Sparkles } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";
import heroImg from "@/assets/hero-kedarnath.jpg";
import { usePackages, useTestimonials, useGalleryPhotos } from "@/hooks/useSupabase";
import { WHATSAPP_NUMBER } from "@/data/config";

// ── Fallback stats ──
const fallbackStats = [
  { number: "150+", label: "Yatras Completed" },
  { number: "5000+", label: "Happy Pilgrims" },
  { number: "12+", label: "Holy Destinations" },
  { number: "3+", label: "Years Experience" },
];

// ── Hero Section ──
export const HeroSection = () => (
  <section className="relative min-h-[92vh] flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroImg} alt="Sacred Kedarnath Temple in the Himalayas" className="h-full w-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 gradient-hero-overlay" />
    </div>
    <div className="container relative z-10 py-20">
      <div className="max-w-2xl animate-fade-in-up">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 mb-6">
          <span className="text-sm">🙏</span>
          <span className="text-sm font-medium text-white/90 tracking-wide">Ananda Rath Spiritual Tourism</span>
        </div>
        <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">
          Every Yatra, A<br />
          <span className="text-gradient-saffron drop-shadow-lg" style={{ WebkitTextFillColor: 'transparent' }}>Spiritual Experience</span>
        </h1>
        <p className="mb-8 text-lg text-white/75 max-w-xl leading-relaxed">
          From Odisha to Kedarnath, Kashi, Badrinath & Mahakaleshwar — comfortable AC Sleeper Bus journeys with meals, accommodation & guided darshan included.
        </p>
        <div className="flex flex-wrap gap-4">
          <WhatsAppButton variant="hero" label="Enquire on WhatsApp" />
          <Link to="/packages" className="inline-flex items-center gap-2 rounded-full border-2 border-white/25 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-white/50 hover:bg-white/10 backdrop-blur-sm">
            View Packages
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
    {/* Decorative bottom gradient */}
    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
  </section>
);

// ── Stats Section ──
export const StatsSection = () => (
  <section className="relative -mt-16 z-10">
    <div className="container">
      <div className="grid grid-cols-2 gap-4 rounded-2xl gradient-saffron p-8 shadow-saffron md:grid-cols-4 md:p-10">
        {fallbackStats.map((s, i) => (
          <div key={s.label} className={`text-center animate-count-up animate-delay-${(i + 1) * 100}`}>
            <p className="text-3xl font-extrabold text-white md:text-5xl">{s.number}</p>
            <p className="mt-1 text-sm text-white/75 font-medium">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Featured Packages Section (for home page) ──
export const FeaturedPackagesSection = () => {
  const { data: packages, isLoading } = usePackages();

  return (
    <section className="py-24">
      <div className="container">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">🕉️ Our Yatras</p>
          <h2 className="text-3xl font-bold text-foreground md:text-5xl">Popular Pilgrimage Packages</h2>
          <div className="section-divider mt-4" />
        </div>
        {isLoading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden">
                <div className="skeleton h-56 w-full" />
                <div className="p-5 space-y-3 bg-card">
                  <div className="skeleton h-6 w-3/4" />
                  <div className="skeleton h-4 w-1/2" />
                  <div className="skeleton h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : !packages?.length ? (
          <div className="text-center py-16">
            <Sparkles className="mx-auto h-12 w-12 text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground text-lg">Packages coming soon.</p>
            <p className="text-muted-foreground text-sm mt-1">Contact us on WhatsApp for details!</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {packages.slice(0, 3).map((pkg) => (
              <Link to={`/package/${pkg.slug}`} key={pkg.id} className="group overflow-hidden rounded-2xl bg-card shadow-card card-interactive">
                <div className="relative overflow-hidden">
                  {pkg.image_url ? (
                    <img src={pkg.image_url} alt={pkg.title} className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  ) : (
                    <div className="h-56 w-full bg-muted flex items-center justify-center"><Image className="h-12 w-12 text-muted-foreground/40" /></div>
                  )}
                  {pkg.seats_left !== null && pkg.seats_left > 0 && pkg.seats_left <= 15 && (
                    <div className="absolute top-3 right-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-lg">
                      {pkg.seats_left} seats left
                    </div>
                  )}
                  {pkg.next_departure && (
                    <div className="absolute bottom-3 left-3 rounded-full bg-black/60 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                      Next: {pkg.next_departure}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="mb-1 text-xl font-bold text-foreground group-hover:text-primary transition-colors">{pkg.title}</h3>
                  {pkg.subtitle && <p className="mb-3 text-sm text-muted-foreground line-clamp-1">{pkg.subtitle}</p>}
                  <div className="mb-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{pkg.duration}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{pkg.starting_from}</span>
                  </div>
                  <div className="flex items-end justify-between border-t border-border pt-4">
                    <div>
                      <span className="text-2xl font-extrabold text-primary">{pkg.price}</span>
                      <span className="text-sm text-muted-foreground"> / {pkg.price_note}</span>
                    </div>
                    <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      Details <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        {packages && packages.length > 3 && (
          <div className="text-center mt-12">
            <Link to="/packages" className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-8 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white">
              View All Packages <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

// ── Full Packages Section (for packages page) ──
export const PackagesSection = () => {
  const { data: packages, isLoading } = usePackages();

  return (
    <section className="py-24">
      <div className="container">
        <div className="page-header rounded-3xl mb-16 -mt-10">
          <div className="relative z-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">🕉️ Our Yatras</p>
            <h1 className="text-3xl font-bold text-white md:text-5xl">All Pilgrimage Packages</h1>
            <p className="mt-4 text-white/60 max-w-lg mx-auto">Choose your spiritual journey. Each yatra is designed for comfort, devotion, and unforgettable experiences.</p>
          </div>
        </div>
        {isLoading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden">
                <div className="skeleton h-56 w-full" />
                <div className="p-5 space-y-3 bg-card">
                  <div className="skeleton h-6 w-3/4" />
                  <div className="skeleton h-4 w-1/2" />
                  <div className="skeleton h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : !packages?.length ? (
          <div className="text-center py-16">
            <Sparkles className="mx-auto h-12 w-12 text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground text-lg">Packages coming soon.</p>
            <p className="text-muted-foreground text-sm mt-1">Contact us on WhatsApp for details!</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <Link to={`/package/${pkg.slug}`} key={pkg.id} className="group overflow-hidden rounded-2xl bg-card shadow-card card-interactive">
                <div className="relative overflow-hidden">
                  {pkg.image_url ? (
                    <img src={pkg.image_url} alt={pkg.title} className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  ) : (
                    <div className="h-56 w-full bg-muted flex items-center justify-center"><Image className="h-12 w-12 text-muted-foreground/40" /></div>
                  )}
                  {pkg.seats_left !== null && pkg.seats_left > 0 && pkg.seats_left <= 15 && (
                    <div className="absolute top-3 right-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-lg">
                      {pkg.seats_left} seats left
                    </div>
                  )}
                  {pkg.next_departure && (
                    <div className="absolute bottom-3 left-3 rounded-full bg-black/60 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                      Next: {pkg.next_departure}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="mb-1 text-xl font-bold text-foreground group-hover:text-primary transition-colors">{pkg.title}</h3>
                  {pkg.subtitle && <p className="mb-3 text-sm text-muted-foreground line-clamp-1">{pkg.subtitle}</p>}
                  <div className="mb-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{pkg.duration}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{pkg.starting_from}</span>
                  </div>
                  <div className="flex items-end justify-between border-t border-border pt-4">
                    <div>
                      <span className="text-2xl font-extrabold text-primary">{pkg.price}</span>
                      <span className="text-sm text-muted-foreground"> / {pkg.price_note}</span>
                    </div>
                    <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      Details <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// ── Gallery Section ──
export const GallerySection = () => {
  const { data: photos } = useGalleryPhotos();

  return (
    <section className="py-24">
      <div className="container">
        <div className="page-header rounded-3xl mb-16 -mt-10">
          <div className="relative z-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">📸 Gallery</p>
            <h1 className="text-3xl font-bold text-white md:text-5xl">Memories from Our Yatras</h1>
            <p className="mt-4 text-white/60 max-w-lg mx-auto">Precious moments captured during our spiritual journeys across India.</p>
          </div>
        </div>

        {!photos?.length ? (
          <div className="text-center py-20">
            <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-muted flex items-center justify-center">
              <Image className="h-10 w-10 text-muted-foreground/40" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Gallery Coming Soon</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We're curating beautiful photos from our yatras. In the meantime, follow us on WhatsApp for live updates from our trips!
            </p>
            <div className="mt-6">
              <WhatsAppButton label="Get Updates on WhatsApp" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {photos.map((photo) => (
              <div key={photo.id} className="group relative overflow-hidden rounded-xl card-interactive cursor-pointer">
                <img
                  src={photo.image_url}
                  alt={photo.caption || "Yatra photo"}
                  className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-110 md:h-64"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {photo.caption && (
                  <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-xs text-white font-medium">{photo.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// ── Why Choose Section ──
export const WhyChooseSection = () => (
  <section className="py-24 bg-muted/40">
    <div className="container">
      <div className="mb-14 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">✨ Why Us</p>
        <h2 className="text-3xl font-bold text-foreground md:text-5xl">Why Choose AnandaRath?</h2>
        <div className="section-divider mt-4" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Bus, title: "AC Sleeper Bus", desc: "Comfortable 2x2 seating with USB charging points and reclining seats" },
          { icon: Utensils, title: "Meals Included", desc: "Pure vegetarian breakfast and dinner at quality restaurants en-route" },
          { icon: Shield, title: "Safe Travel", desc: "Experienced drivers, GPS tracking, travel insurance for all passengers" },
          { icon: Heart, title: "Guided Darshan", desc: "Religious guide & complete darshan arrangements at every temple" },
        ].map((item, i) => (
          <div key={item.title} className={`rounded-2xl bg-card p-8 text-center shadow-card card-interactive`}>
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl gradient-saffron shadow-saffron">
              <item.icon className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-3 text-lg font-bold text-foreground">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Testimonials Section ──
export const TestimonialsSection = () => {
  const { data: testimonials } = useTestimonials();

  if (!testimonials?.length) return null;

  return (
    <section className="py-24">
      <div className="container">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">💬 Testimonials</p>
          <h2 className="text-3xl font-bold text-foreground md:text-5xl">What Our Pilgrims Say</h2>
          <div className="section-divider mt-4" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.id} className="rounded-2xl bg-card p-6 shadow-card card-interactive">
              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.rating || 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mb-5 text-sm leading-relaxed text-muted-foreground italic">"{t.text}"</p>
              <div className="flex items-center gap-3 border-t border-border pt-4">
                {t.photo_url ? (
                  <img src={t.photo_url} alt={t.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/20" loading="lazy" />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {t.name?.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  {t.location && <p className="text-xs text-muted-foreground">{t.location}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── CTA Section ──
export const CTASection = () => (
  <section className="py-24">
    <div className="container">
      <div className="rounded-3xl gradient-saffron p-10 text-center md:p-16 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">Plan Your Next Spiritual Journey</h2>
          <p className="mx-auto mb-8 max-w-xl text-white/75">
            Reach out on WhatsApp or call us. Our team will answer all your questions and help you find the perfect yatra.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <WhatsAppButton variant="hero" label="Enquire on WhatsApp" className="border-2 border-white/20 !bg-white/15 hover:!bg-white/25" />
            <a href={`tel:+${WHATSAPP_NUMBER}`} className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10 backdrop-blur-sm">
              <Phone className="h-5 w-5" />
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ── Footer ──
export const Footer = () => (
  <footer className="border-t border-border bg-foreground text-white mt-auto">
    <div className="container py-16">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="space-y-4">
          <span className="text-xl font-bold">
            Ananda<span className="text-gradient-saffron">Rath</span>
          </span>
          <p className="text-sm text-white/60 leading-relaxed">
            Every Yatra, A Spiritual Experience. We organize premium pilgrimage tours from Odisha to sacred destinations across India.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {[
              { to: "/", label: "Home" },
              { to: "/packages", label: "Packages" },
              { to: "/gallery", label: "Gallery" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact" },
            ].map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-white/50 hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Destinations */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4">Destinations</h4>
          <ul className="space-y-2">
            {["Kedarnath", "Badrinath", "Kashi (Varanasi)", "Ayodhya", "Mahakaleshwar", "Ujjain"].map((dest) => (
              <li key={dest}>
                <span className="text-sm text-white/50">{dest}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4">Contact Us</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Phone className="h-4 w-4 text-white/40 mt-0.5 shrink-0" />
              <a href={`tel:+${WHATSAPP_NUMBER}`} className="text-sm text-white/50 hover:text-white transition-colors">
                +91 98765 43210
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="h-4 w-4 text-white/40 mt-0.5 shrink-0" />
              <a href="mailto:info@anandarath.com" className="text-sm text-white/50 hover:text-white transition-colors">
                info@anandarath.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPinned className="h-4 w-4 text-white/40 mt-0.5 shrink-0" />
              <span className="text-sm text-white/50">Bhubaneswar, Odisha, India</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    {/* Bottom bar */}
    <div className="border-t border-white/10">
      <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-xs text-white/40">© 2026 AnandaRath Spiritual Tourism. All rights reserved.</p>
        <p className="text-xs text-white/40">Every Yatra, A Spiritual Experience 🙏</p>
      </div>
    </div>
  </footer>
);

// ── Homepage Composition ──
const HomePage = () => (
  <>
    <HeroSection />
    <StatsSection />
    <FeaturedPackagesSection />
    <WhyChooseSection />
    <TestimonialsSection />
    <CTASection />
  </>
);

export default HomePage;

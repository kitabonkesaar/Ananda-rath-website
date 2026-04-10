import { Link } from "react-router-dom";
import { Clock, MapPin, Star, Bus, Utensils, Shield, Heart, Image } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";
import heroImg from "@/assets/hero-kedarnath.jpg";
import { usePackages, useTestimonials, useGalleryPhotos } from "@/hooks/useSupabase";
import { WHATSAPP_NUMBER } from "@/data/config";

// Fallback data for when DB is empty
const fallbackStats = [
  { number: "150+", label: "Yatras Completed" },
  { number: "5000+", label: "Happy Pilgrims" },
  { number: "12+", label: "Holy Destinations" },
  { number: "3+", label: "Years Experience" },
];

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroImg} alt="Sacred Kedarnath Temple in the Himalayas" className="h-full w-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
    </div>
    <div className="container relative z-10 py-20">
      <div className="max-w-2xl animate-fade-in-up">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-light">🙏 Ananda Rath</p>
        <h1 className="mb-6 text-4xl font-extrabold leading-tight text-primary-foreground md:text-6xl">
          Every Yatra, A<br />
          <span className="text-gradient-saffron">Spiritual Experience</span>
        </h1>
        <p className="mb-8 text-lg text-primary-foreground/80">
          From Odisha to Kedarnath, Kashi, Badrinath & Mahakaleshwar — comfortable AC Sleeper Bus journeys with meals, accommodation & guided darshan included.
        </p>
        <div className="flex flex-wrap gap-4">
          <WhatsAppButton variant="hero" label="Enquire on WhatsApp" />
          <a href="#packages" className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/30 px-8 py-4 text-lg font-semibold text-primary-foreground transition-all hover:border-primary-foreground/60 hover:bg-primary-foreground/10">
            View Packages →
          </a>
        </div>
      </div>
    </div>
  </section>
);

const StatsSection = () => (
  <section className="relative -mt-16 z-10">
    <div className="container">
      <div className="grid grid-cols-2 gap-4 rounded-2xl gradient-saffron p-6 shadow-saffron md:grid-cols-4 md:p-8">
        {fallbackStats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-extrabold text-primary-foreground md:text-4xl">{s.number}</p>
            <p className="mt-1 text-sm text-primary-foreground/80">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PackagesSection = () => {
  const { data: packages, isLoading } = usePackages();

  return (
    <section id="packages" className="py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">🕉️ Our Yatras</p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Popular Pilgrimage Packages</h2>
        </div>
        {isLoading ? (
          <div className="text-center text-muted-foreground">Loading packages...</div>
        ) : !packages?.length ? (
          <div className="text-center text-muted-foreground">Packages coming soon. Contact us on WhatsApp!</div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <Link to={`/package/${pkg.slug}`} key={pkg.id} className="group overflow-hidden rounded-2xl bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="relative overflow-hidden">
                  {pkg.image_url ? (
                    <img src={pkg.image_url} alt={pkg.title} className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  ) : (
                    <div className="h-56 w-full bg-muted flex items-center justify-center"><Image className="h-12 w-12 text-muted-foreground" /></div>
                  )}
                  {pkg.seats_left !== null && pkg.seats_left > 0 && pkg.seats_left <= 15 && (
                    <div className="absolute top-3 right-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
                      {pkg.seats_left} seats left
                    </div>
                  )}
                  {pkg.next_departure && (
                    <div className="absolute bottom-3 left-3 rounded-full bg-foreground/70 px-3 py-1 text-xs font-medium text-primary-foreground">
                      Next: {pkg.next_departure}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="mb-1 text-xl font-bold text-foreground">{pkg.title}</h3>
                  {pkg.subtitle && <p className="mb-3 text-sm text-muted-foreground">{pkg.subtitle}</p>}
                  <div className="mb-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{pkg.duration}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{pkg.starting_from}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-2xl font-extrabold text-primary">{pkg.price}</span>
                      <span className="text-sm text-muted-foreground"> / {pkg.price_note}</span>
                    </div>
                    <span className="text-sm font-semibold text-primary">View Details →</span>
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

const GallerySection = () => {
  const { data: photos } = useGalleryPhotos();

  if (!photos?.length) return null;

  return (
    <section id="gallery" className="py-20 bg-secondary/50">
      <div className="container">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">📸 Gallery</p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Memories from Our Yatras</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {photos.map((photo) => (
            <div key={photo.id} className="group relative overflow-hidden rounded-xl">
              <img
                src={photo.image_url}
                alt={photo.caption || "Yatra photo"}
                className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110 md:h-64"
                loading="lazy"
              />
              {photo.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 to-transparent p-3">
                  <p className="text-xs text-primary-foreground">{photo.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyChooseSection = () => (
  <section id="about" className="py-20">
    <div className="container">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">✨ Why Us</p>
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">Why Choose AnandaRath?</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Bus, title: "AC Sleeper Bus", desc: "Comfortable 2x2 seating with charging points" },
          { icon: Utensils, title: "Meals Included", desc: "Pure vegetarian breakfast and dinner" },
          { icon: Shield, title: "Safe Travel", desc: "Experienced drivers, GPS tracking, insurance" },
          { icon: Heart, title: "Guided Darshan", desc: "Religious guide & complete darshan arrangements" },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl bg-card p-6 text-center shadow-card transition-all hover:-translate-y-1">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl gradient-saffron">
              <item.icon className="h-7 w-7 text-primary-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-foreground">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => {
  const { data: testimonials } = useTestimonials();

  if (!testimonials?.length) return null;

  return (
    <section className="py-20 bg-secondary/50">
      <div className="container">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">💬 Testimonials</p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">What Our Pilgrims Say</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.id} className="rounded-2xl bg-card p-6 shadow-card">
              <div className="mb-3 flex gap-1">
                {Array.from({ length: t.rating || 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
              <div className="flex items-center gap-3">
                {t.photo_url && (
                  <img src={t.photo_url} alt={t.name} className="h-10 w-10 rounded-full object-cover" loading="lazy" />
                )}
                <div>
                  <p className="font-semibold text-foreground">{t.name}</p>
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

const CTASection = () => (
  <section id="contact" className="py-20">
    <div className="container">
      <div className="rounded-3xl gradient-saffron p-10 text-center md:p-16">
        <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">Plan Your Next Spiritual Journey</h2>
        <p className="mx-auto mb-8 max-w-xl text-primary-foreground/80">
          Reach out on WhatsApp or call us. Our team will answer all your questions and help you find the perfect yatra.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <WhatsAppButton variant="hero" label="Enquire on WhatsApp" className="border-2 border-primary-foreground/20" />
          <a href={`tel:+${WHATSAPP_NUMBER}`} className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/30 px-8 py-4 text-lg font-semibold text-primary-foreground transition-all hover:bg-primary-foreground/10">
            📞 Call Us
          </a>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-border bg-card py-10">
    <div className="container text-center">
      <p className="text-sm text-muted-foreground">© 2026 AnandaRath Spiritual Tourism. All rights reserved.</p>
      <p className="mt-1 text-xs text-muted-foreground">Every Yatra, A Spiritual Experience 🙏</p>
    </div>
  </footer>
);

const HomePage = () => (
  <>
    <HeroSection />
    <StatsSection />
    <PackagesSection />
    <GallerySection />
    <WhyChooseSection />
    <TestimonialsSection />
    <CTASection />
    <Footer />
  </>
);

export default HomePage;

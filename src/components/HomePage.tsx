import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Clock, MapPin, Star, Bus, Utensils, Shield, Heart, Image, Phone, Mail, MapPinned, ArrowRight, Sparkles, Send, Camera, X, Search, SlidersHorizontal, CalendarDays, Tag } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";
import heroImg from "@/assets/hero-kedarnath.jpg";
import logo from "@/assets/logo.png";
import jagannathIcon from "@/assets/jagannath-icon.png";
import { usePackages, useTestimonials, useGalleryPhotos, useSubmitInquiry, useHeroConfig } from "@/hooks/useConvex";
import { WHATSAPP_NUMBER } from "@/data/config";

// ── Fallback stats ──
const fallbackStats = [
  { number: "150+", label: "Yatras Completed" },
  { number: "5000+", label: "Happy Pilgrims" },
  { number: "12+", label: "Holy Destinations" },
  { number: "3+", label: "Years Experience" },
];

// ── Countdown Timer Hook ──
const useCountdown = (targetDate: Date) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
};

// ── Hero Section with Countdown + Lead Form ──
export const HeroSection = () => {
  const { data: packages } = usePackages();
  const { data: heroConfig } = useHeroConfig();
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const submitInquiry = useSubmitInquiry();

  // Find closest upcoming departure date
  const nextDeparture = useMemo(() => {
    if (heroConfig?.target_date) return new Date(heroConfig.target_date);
    if (!packages?.length) return new Date(Date.now() + 35 * 24 * 60 * 60 * 1000);
    const now = new Date();
    const dates = packages
      .filter(p => p.next_departure)
      .map(p => new Date(p.next_departure!))
      .filter(d => d.getTime() > now.getTime());
    return dates.length > 0 ? dates.sort((a, b) => a.getTime() - b.getTime())[0] : new Date(Date.now() + 35 * 24 * 60 * 60 * 1000);
  }, [packages, heroConfig]);

  const timeLeft = useCountdown(nextDeparture);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;
    try {
      await submitInquiry.mutateAsync({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        package_name: "Homepage Inquiry",
      });
      // Also open WhatsApp
      const message = `🙏 New Inquiry - AnandaRath\n\nName: ${formData.name}\nPhone: ${formData.phone}`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
      setSubmitted(true);
    } catch {
      // fallback: just open WhatsApp
      const message = `🙏 Inquiry from ${formData.name}\nPhone: ${formData.phone}`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
      setSubmitted(true);
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Sacred Kedarnath Temple in the Himalayas" className="h-full w-full object-cover" width={1920} height={1080} fetchpriority="high" loading="eager" />
        <div className="absolute inset-0 gradient-hero-overlay" />
      </div>
      <div className="container relative z-10 pt-16 pb-28 md:pb-32">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left side - Text */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 mb-6">
              <span className="text-sm">🙏</span>
              <span className="text-sm font-medium text-white/90 tracking-wide">Ananda Rath Spiritual Tourism</span>
            </div>
            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
              Leading <span className="text-gradient-saffron drop-shadow-lg" style={{ WebkitTextFillColor: 'transparent' }}>Odisha Tirthayatra</span><br />
              Organizer since 2023
            </h1>
            <p className="mb-8 text-lg text-white/75 max-w-xl leading-relaxed">
              Experience the best of Odisha's spiritual tourism. We organize comfortable AC Sleeper Bus journeys to Kedarnath, Kashi, Vrindavan, Badrinath & more.
            </p>
            <div className="flex flex-wrap gap-4">
              <WhatsAppButton variant="hero" label="Enquire on WhatsApp" />
              <Link to="/packages" className="inline-flex items-center gap-2 rounded-full border-2 border-white/25 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-white/50 hover:bg-white/10 backdrop-blur-sm">
                View Packages
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Right side - Countdown + Form */}
          <div className="animate-fade-in-up animate-delay-200 relative mt-16 lg:mt-0 lg:ml-auto max-w-md w-full">
            {/* Jagannath Icon overlapping the top border */}
            <div className="absolute -top-[3.5rem] left-1/2 -translate-x-1/2 z-20 w-[7rem] h-[7rem] drop-shadow-2xl">
               <img src={jagannathIcon} alt="Jai Jagannath" className="w-full h-full object-contain hover:scale-105 transition-transform duration-300" />
            </div>

            <div className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-8 pt-12 shadow-2xl mx-auto backdrop-brightness-75">
              {/* Countdown Timer */}
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60 mb-3 text-center">⏰ {heroConfig?.timer_title ?? "NEXT YATRA DEPARTING IN"}</p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { value: timeLeft.days, label: "Days" },
                    { value: timeLeft.hours, label: "Hours" },
                    { value: timeLeft.minutes, label: "Mins" },
                    { value: timeLeft.seconds, label: "Secs" },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <div className="rounded-xl bg-white/15 backdrop-blur-sm border border-white/10 py-3 px-2">
                        <p className="text-2xl md:text-3xl font-extrabold text-white tabular-nums">{String(item.value).padStart(2, "0")}</p>
                      </div>
                      <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/50">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 mb-6" />

              {/* Lead Form */}
              {submitted ? (
                <div className="text-center py-4">
                  <p className="text-3xl mb-2">🙏</p>
                  <p className="text-lg font-bold text-white">Thank You!</p>
                  <p className="text-sm text-white/60 mt-1">We'll contact you shortly on WhatsApp.</p>
                  <button onClick={() => { setSubmitted(false); setFormData({ name: "", phone: "" }); }} className="mt-4 text-sm text-white/70 underline hover:text-white">Submit again</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <p className="text-sm font-semibold text-white/80 mb-1">📋 {heroConfig?.form_title ?? "Book Your Seat Now"}</p>
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    maxLength={100}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    maxLength={15}
                    pattern="[0-9]{10,15}"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                  />
                  <button
                    type="submit"
                    disabled={submitInquiry.isPending}
                    className="w-full rounded-xl gradient-saffron px-5 py-3.5 text-sm font-bold text-white shadow-saffron transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    {submitInquiry.isPending ? "Sending..." : "Get Callback"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

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
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">🕉️ Best Odisha Tirthayatra Packages</p>
          <h2 className="text-3xl font-bold text-foreground md:text-5xl">Top Spiritual Tourism Circuits</h2>
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
                    <img src={pkg.image_url} alt={pkg.title} className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400/f1f5f9/94a3b8?text=Image+Not+Found"; }} />
                  ) : (
                    <div className="h-56 w-full bg-muted flex items-center justify-center"><Image className="h-12 w-12 text-muted-foreground/40" /></div>
                  )}
                  {pkg.is_full ? (
                    <div className="absolute top-3 right-3 rounded-full bg-destructive px-3 py-1 text-xs font-bold text-destructive-foreground shadow-lg animate-pulse">
                      Fully Booked
                    </div>
                  ) : pkg.seats_left !== null && pkg.seats_left > 0 && pkg.seats_left <= 15 && (
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
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="mb-1 text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">{pkg.title}</h3>
                  {pkg.subtitle && <p className="mb-3 text-sm text-muted-foreground line-clamp-1">{pkg.subtitle}</p>}
                  <div className="mb-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1 bg-secondary rounded-full px-3 py-1 text-foreground/80"><Clock className="h-3.5 w-3.5" />{pkg.duration}</span>
                    <span className="flex items-center gap-1 bg-secondary rounded-full px-3 py-1 text-foreground/80"><MapPin className="h-3.5 w-3.5" />{pkg.starting_from}</span>
                    {pkg.trip_date && (
                      <span className="flex items-center gap-1 bg-secondary rounded-full px-3 py-1 text-foreground/80"><CalendarDays className="h-3.5 w-3.5" />{pkg.trip_date}</span>
                    )}
                  </div>
                  <div className="mt-auto pt-4 flex items-end justify-between border-t border-border">
                    {pkg.is_full ? (
                      <span className="text-sm font-bold text-destructive">Fully Booked</span>
                    ) : (
                      <div>
                        <span className="text-2xl font-extrabold text-primary">{pkg.price}</span>
                        <span className="text-sm text-muted-foreground"> / {pkg.price_note}</span>
                      </div>
                    )}
                    <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      View Details <ArrowRight className="h-4 w-4" />
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
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!packages) return [];
    if (!search.trim()) return packages;
    const q = search.toLowerCase();
    return packages.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
        (p.highlights && p.highlights.some((h) => h.toLowerCase().includes(q)))
    );
  }, [packages, search]);

  return (
    <section className="py-20">
      <div className="container">
        {/* ── Page Header ── */}
        <div className="page-header rounded-3xl mb-12 -mt-10 text-center">
          <div className="relative z-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">🕉️ Our Yatras</p>
            <h1 className="text-3xl font-bold text-white md:text-5xl">All Pilgrimage Packages</h1>
            <p className="mt-4 text-white/60 max-w-lg mx-auto">
              Choose your spiritual journey. Each yatra is crafted for comfort, devotion, and unforgettable experiences.
            </p>
            {packages && packages.length > 0 && (
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-2">
                <Tag className="h-4 w-4 text-white/70" />
                <span className="text-sm font-medium text-white/80">{packages.length} packages available</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Search Bar ── */}
        {!isLoading && packages && packages.length > 0 && (
          <div className="mb-10 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search destinations, highlights…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-border bg-card pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all shadow-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <p className="text-sm text-muted-foreground shrink-0">
              {search ? (
                <span><span className="font-semibold text-foreground">{filtered.length}</span> result{filtered.length !== 1 ? "s" : ""} for "{search}"</span>
              ) : (
                <span><span className="font-semibold text-foreground">{packages.length}</span> packages</span>
              )}
            </p>
          </div>
        )}

        {/* ── Cards ── */}
        {isLoading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-border/50">
                <div className="skeleton h-60 w-full" />
                <div className="p-5 space-y-3 bg-card">
                  <div className="skeleton h-6 w-3/4" />
                  <div className="skeleton h-4 w-1/2" />
                  <div className="flex gap-2">
                    <div className="skeleton h-6 w-20 rounded-full" />
                    <div className="skeleton h-6 w-24 rounded-full" />
                  </div>
                  <div className="skeleton h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : !packages?.length ? (
          <div className="text-center py-20">
            <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-muted flex items-center justify-center">
              <Sparkles className="h-9 w-9 text-muted-foreground/40" />
            </div>
            <p className="text-muted-foreground text-lg font-medium">Packages coming soon.</p>
            <p className="text-muted-foreground text-sm mt-1">Contact us on WhatsApp for details!</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-muted flex items-center justify-center">
              <Search className="h-9 w-9 text-muted-foreground/40" />
            </div>
            <p className="text-foreground text-lg font-semibold">No packages found</p>
            <p className="text-muted-foreground text-sm mt-1">Try a different keyword.</p>
            <button onClick={() => setSearch("")} className="mt-4 text-sm text-primary underline-offset-2 hover:underline">Clear search</button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((pkg) => (
              <Link
                to={`/package/${pkg.slug}`}
                key={pkg.id}
                className="group flex flex-col overflow-hidden rounded-2xl bg-card border border-border/40 shadow-card card-interactive"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  {pkg.image_url ? (
                    <img
                      src={pkg.image_url}
                      alt={pkg.title}
                      className="h-60 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400/f1f5f9/94a3b8?text=Image+Not+Found"; }}
                    />
                  ) : (
                    <div className="h-60 w-full bg-muted flex items-center justify-center">
                      <Image className="h-14 w-14 text-muted-foreground/30" />
                    </div>
                  )}
                  {/* Gradient overlay for bottom info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Top badges */}
                  <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
                    {pkg.is_full ? (
                      <span className="rounded-full bg-destructive/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-white shadow-lg animate-pulse">
                        Fully Booked
                      </span>
                    ) : pkg.seats_left !== null && pkg.seats_left !== undefined && pkg.seats_left > 0 && pkg.seats_left <= 15 ? (
                      <span className="rounded-full bg-primary/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-white shadow-lg">
                        ⚡ {pkg.seats_left} seats left
                      </span>
                    ) : null}
                  </div>

                  {/* Bottom info row (Image overlay) */}
                  {pkg.next_departure && (
                    <div className="absolute bottom-3 left-3 rounded-full bg-black/60 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white shadow-sm flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5 text-white/70" />
                      Next: {pkg.next_departure}
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {pkg.title}
                  </h3>
                  {pkg.subtitle && (
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{pkg.subtitle}</p>
                  )}

                  {/* Duration & Location */}
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5 bg-secondary text-foreground/80 rounded-full px-3 py-1">
                      <Clock className="h-3.5 w-3.5" />{pkg.duration}
                    </span>
                    <span className="flex items-center gap-1.5 bg-secondary text-foreground/80 rounded-full px-3 py-1">
                      <MapPin className="h-3.5 w-3.5" />{pkg.starting_from}
                    </span>
                    {pkg.trip_date && (
                      <span className="flex items-center gap-1.5 bg-secondary text-foreground/80 rounded-full px-3 py-1">
                        <CalendarDays className="h-3.5 w-3.5" />{pkg.trip_date}
                      </span>
                    )}
                  </div>

                  {/* Highlights */}
                  {pkg.highlights && pkg.highlights.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {pkg.highlights.slice(0, 3).map((h) => (
                        <span key={h} className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[11px] font-medium text-primary">
                          {h}
                        </span>
                      ))}
                      {pkg.highlights.length > 3 && (
                        <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-muted-foreground">
                          +{pkg.highlights.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* CTA row (Price & Details) */}
                  <div className="mt-auto pt-4 border-t border-border flex items-end justify-between">
                    {pkg.is_full ? (
                      <span className="text-sm font-bold text-destructive">Fully Booked</span>
                    ) : (
                      <div>
                        <span className="text-2xl font-extrabold text-primary">{pkg.price}</span>
                        {pkg.price_note && <span className="text-sm text-muted-foreground"> / {pkg.price_note}</span>}
                      </div>
                    )}
                    <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      View Details <ArrowRight className="h-4 w-4" />
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
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Close lightbox on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPhoto(null);
    };
    if (selectedPhoto) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

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
              <div 
                key={photo.id} 
                className="group relative overflow-hidden rounded-xl card-interactive cursor-zoom-in"
                onClick={() => setSelectedPhoto(photo.image_url)}
              >
                <img
                  src={photo.image_url}
                  alt={photo.caption || "Yatra photo"}
                  className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-110 md:h-64"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400/f1f5f9/94a3b8?text=Image+Not+Found"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-white text-lg font-bold">+</span>
                  </div>
                </div>
                {photo.caption && (
                  <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                    <p className="text-xs text-white font-medium">{photo.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setSelectedPhoto(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-all"
              onClick={(e) => { e.stopPropagation(); setSelectedPhoto(null); }}
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <img 
              src={selectedPhoto} 
              alt="Full size gallery view" 
              className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl animate-in zoom-in-95 duration-200" 
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </section>
  );
};

// ── Why Choose Section ──
export const WhyChooseSection = () => (
  <section className="py-24 warm-pattern-bg">
    <div className="container">
      <div className="mb-14 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">✨ Why Us</p>
        <h2 className="text-3xl font-bold text-foreground md:text-5xl">Why Choose AnandaRath?</h2>
        <div className="section-divider mt-4" />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {[
          { icon: Bus, title: "AC Sleeper Bus", desc: "Comfortable 2x1 seating with USB charging points and reclining seats", delay: "0ms" },
          { icon: Utensils, title: "Meals Included", desc: "Odia Cooked Food Pure Veg breakfast and dinner at quality restaurants en-route", delay: "80ms" },
          { icon: Shield, title: "Safe Travel", desc: "Experienced drivers, GPS tracking, travel insurance for all passengers", delay: "160ms" },
          { icon: Heart, title: "Guided Darshan", desc: "Religious guide & complete darshan arrangements at every temple", delay: "240ms" },
          { icon: Camera, title: "Photography", desc: "Professional photography to capture your spiritual journey and special moments", delay: "320ms" },
        ].map((item, i) => (
          <div
            key={item.title}
            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(20%-19.2px)] rounded-2xl border border-border/50 bg-card backdrop-blur-xl p-8 text-center shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-400 group animate-reveal"
            style={{ animationDelay: item.delay }}
          >
            <div className="icon-3d mx-auto mb-5 h-14 w-14 animate-micro-bounce" style={{ animationDelay: `${i * 200}ms` }}>
              <item.icon className="h-6 w-6 text-white relative z-10" strokeWidth={1.5} />
            </div>
            <h3 className="mb-3 text-lg font-bold text-foreground tracking-tight">{item.title}</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">{item.desc}</p>
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
                  <img src={t.photo_url} alt={t.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/20" loading="lazy" onError={(e) => { e.currentTarget.src = "https://placehold.co/100x100/f1f5f9/94a3b8?text=" + (t.name?.charAt(0) || "?"); }} />
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
          <img src={logo} alt="AnandaRath" className="h-12 w-auto brightness-0 invert" />
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
              { to: "/blog", label: "Blog" },
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
              <a href={`tel:+${WHATSAPP_NUMBER}`} className="text-sm text-white/50 hover:text-white transition-colors" aria-label="Call AnandaRath">
                +{WHATSAPP_NUMBER}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="h-4 w-4 text-white/40 mt-0.5 shrink-0" />
              <a href="mailto:anandarathtours@gmail.com" className="text-sm text-white/50 hover:text-white transition-colors" aria-label="Email AnandaRath">
                anandarathtours@gmail.com
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

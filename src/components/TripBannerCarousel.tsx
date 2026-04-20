import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  {
    src: "/banners/banner-kedarbadri.jpg",
    alt: "Kedar Badri Yatra 2026 – Departure May 08",
    link: "/packages",
  },
  {
    src: "/banners/banner-mathura.jpg",
    alt: "Mathura Vrindavan Yatra 2026 – Departure May 16",
    link: "/packages",
  },
  {
    src: "/banners/banner-jyotirling.jpg",
    alt: "7 Jyotirling & 1 Dham Yatra 2026 – Departure June 20",
    link: "/packages",
  },
];

const TripBannerCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % banners.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  }, []);

  // Auto-rotate every 5 seconds, pause on hover
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isHovered]);

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">🚌 Upcoming Yatras</p>
          <h2 className="text-3xl font-bold text-foreground md:text-5xl">Our Trip Packages</h2>
          <div className="section-divider mt-4" />
        </div>

        <div
          className="relative group rounded-2xl overflow-hidden shadow-xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Banner Images */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9]">
            {banners.map((banner, idx) => (
              <a
                key={idx}
                href={banner.link}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  idx === current
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-[1.02]"
                }`}
              >
                <img
                  src={banner.src}
                  alt={banner.alt}
                  className="w-full h-full object-cover"
                  loading={idx === 0 ? "eager" : "lazy"}
                />
              </a>
            ))}
          </div>

          {/* Nav Arrows */}
          <button
            onClick={(e) => { e.preventDefault(); prev(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/60"
            aria-label="Previous banner"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); next(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/60"
            aria-label="Next banner"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === current
                    ? "bg-white w-8 shadow-lg"
                    : "bg-white/50 w-2.5 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripBannerCarousel;

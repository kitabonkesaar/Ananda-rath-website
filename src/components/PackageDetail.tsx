import { useParams, Link } from "react-router-dom";
import { usePackageBySlug } from "@/hooks/useConvex";
import WhatsAppButton, { CallButton } from "@/components/WhatsAppButton";
import { Clock, MapPin, Check, X, ArrowLeft, Users, Image } from "lucide-react";
import InquiryForm from "@/components/InquiryForm";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";

interface ItineraryDay {
  day: number;
  title: string;
  desc: string;
}

const PackageDetail = () => {
  const { id } = useParams();
  const { data: pkg, isLoading, error } = usePackageBySlug(id || "");

  if (isLoading) {
    return <div className="container py-20 text-center text-muted-foreground">Loading package...</div>;
  }

  if (error || !pkg) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">Package Not Found</h1>
        <Link to="/" className="mt-4 inline-block text-primary underline">Go to Home</Link>
      </div>
    );
  }

  const whatsappMsg = `Hello, I want details about ${pkg.title} from Ananda Rath. Price: ${pkg.price}`;
  const itinerary = (pkg.itinerary as unknown as ItineraryDay[]) || [];

  return (
    <div className="pb-20">
      {/* SEO: TouristTrip structured data + breadcrumbs for rich results */}
      <SEO 
        title={`${pkg.title} – Yatra Package from Odisha`}
        description={pkg.subtitle || `Book ${pkg.title} yatra from Odisha. ${pkg.duration} journey starting at ${pkg.price}. AC Sleeper Bus, Odia meals, guided darshan included.`}
        keywords={`${pkg.title} yatra package, ${pkg.title} yatra from Odisha, Odisha to ${pkg.title} tour, AnandaRath ${pkg.title}, ${pkg.title} pilgrimage price, ${pkg.title} trip cost`}
        ogImage={pkg.image_url}
        pageType="package-detail"
        price={pkg.price}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Packages", url: "/packages" },
          { name: pkg.title, url: `/package/${pkg.slug}` },
        ]}
      />
      {/* SEO: Visible breadcrumbs for user navigation + crawl depth */}
      <div className="container pt-4 pb-2">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Packages", href: "/packages" },
          { label: pkg.title },
        ]} />
      </div>
      {/* Hero */}
      <div className="relative h-72 md:h-96">
        {pkg.image_url ? (
          <img src={pkg.image_url} alt={pkg.title} className="h-full w-full object-cover" onError={(e) => { e.currentTarget.src = "https://placehold.co/1200x600/f1f5f9/94a3b8?text=Image+Not+Found"; }} />
        ) : (
          <div className="h-full w-full bg-muted flex items-center justify-center"><Image className="h-16 w-16 text-muted-foreground/40" /></div>
        )}
        <div className="absolute inset-0 gradient-hero-overlay" />
        <div className="absolute bottom-6 left-0 right-0 container">
          <Link to="/packages" className="mb-3 inline-flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Packages
          </Link>
          <h1 className="text-3xl font-bold text-white md:text-4xl">{pkg.title}</h1>
          {pkg.subtitle && <p className="text-white/60 mt-1">{pkg.subtitle}</p>}
        </div>
      </div>

      <div className="container mt-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* Quick info */}
            <div className="flex flex-wrap gap-4 rounded-2xl bg-card p-5 shadow-card">
              <div className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-primary" /> {pkg.duration}</div>
              <div className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-primary" /> {pkg.starting_from}</div>
              {pkg.is_full ? (
                <div className="flex items-center gap-2 text-sm font-bold text-destructive"><Users className="h-4 w-4 text-destructive" /> 🚨 House Full / Sold Out</div>
              ) : pkg.seats_left !== null && pkg.seats_left > 0 && (
                <div className="flex items-center gap-2 text-sm"><Users className="h-4 w-4 text-accent" /> Only {pkg.seats_left} seats left!</div>
              )}
              <div className="ml-auto text-right">
                <span className="text-2xl font-extrabold text-primary">{pkg.price}</span>
                <span className="text-sm text-muted-foreground"> / {pkg.price_note}</span>
              </div>
            </div>

            {/* Highlights */}
            {pkg.highlights && pkg.highlights.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {pkg.highlights.map((h) => (
                  <span key={h} className="rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">{h}</span>
                ))}
              </div>
            )}

            {/* Description */}
            {pkg.description && (
              <div>
                <h2 className="mb-3 text-2xl font-bold text-foreground">About This Yatra</h2>
                <p className="text-muted-foreground leading-relaxed">{pkg.description}</p>
              </div>
            )}

            {/* Itinerary */}
            {itinerary.length > 0 && (
              <div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">Itinerary</h2>
                <div className="space-y-3">
                  {itinerary.map((day) => (
                    <div key={day.day} className="flex gap-4 rounded-xl bg-card p-4 shadow-card">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg gradient-saffron text-sm font-bold text-primary-foreground">
                        D{day.day}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{day.title}</h3>
                        <p className="text-sm text-muted-foreground">{day.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inclusions / Exclusions */}
            {((pkg.inclusions && pkg.inclusions.length > 0) || (pkg.exclusions && pkg.exclusions.length > 0)) && (
              <div className="space-y-6">
                {pkg.inclusions && pkg.inclusions.length > 0 && (
                  <div>
                    <h2 className="mb-4 text-2xl font-bold text-foreground">✅ What's Included</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {pkg.inclusions.map((item) => (
                        <div key={item} className="flex items-center gap-3 rounded-xl bg-green-50 border border-green-100 p-3.5 transition-all hover:shadow-md hover:-translate-y-0.5">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-700">
                            <Check className="h-5 w-5" />
                          </div>
                          <span className="text-sm font-medium text-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {pkg.exclusions && pkg.exclusions.length > 0 && (
                  <div>
                    <h2 className="mb-4 text-2xl font-bold text-foreground">❌ What's NOT Included</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {pkg.exclusions.map((item) => (
                        <div key={item} className="flex items-center gap-3 rounded-xl bg-red-50 border border-red-100 p-3.5 transition-all hover:shadow-md hover:-translate-y-0.5">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                            <X className="h-5 w-5" />
                          </div>
                          <span className="text-sm font-medium text-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {pkg.next_departure && (
              <div className="rounded-2xl gradient-saffron-dark p-5 text-center">
                <p className="text-sm text-primary-foreground/80">Next Departure</p>
                <p className="text-2xl font-bold text-primary-foreground">{pkg.next_departure}</p>
                {pkg.is_full ? (
                  <p className="mt-2 text-sm font-extrabold text-red-300">🚨 COMPLETELY BOOKED 🚨</p>
                ) : pkg.seats_left !== null && pkg.seats_left > 0 ? (
                  <p className="mt-2 text-sm font-semibold text-primary-foreground">⚡ Only {pkg.seats_left} seats left!</p>
                ) : null}
              </div>
            )}
            <div className="space-y-3">
              <WhatsAppButton message={whatsappMsg} label="Enquire on WhatsApp" className="w-full justify-center" />
              <CallButton className="w-full justify-center" />
            </div>
            <InquiryForm packageName={pkg.title} packageId={pkg.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;

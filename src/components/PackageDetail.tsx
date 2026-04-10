import { useParams, Link } from "react-router-dom";
import { usePackageBySlug } from "@/hooks/useSupabase";
import WhatsAppButton, { CallButton } from "@/components/WhatsAppButton";
import { Clock, MapPin, Check, X, ArrowLeft, Users, Image } from "lucide-react";
import InquiryForm from "@/components/InquiryForm";

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
      {/* Hero */}
      <div className="relative h-72 md:h-96">
        {pkg.image_url ? (
          <img src={pkg.image_url} alt={pkg.title} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-muted flex items-center justify-center"><Image className="h-16 w-16 text-muted-foreground" /></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
        <div className="absolute bottom-6 left-0 right-0 container">
          <Link to="/" className="mb-3 inline-flex items-center gap-1 text-sm text-primary-foreground/80 hover:text-primary-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Packages
          </Link>
          <h1 className="text-3xl font-bold text-primary-foreground md:text-4xl">{pkg.title}</h1>
          {pkg.subtitle && <p className="text-primary-foreground/70">{pkg.subtitle}</p>}
        </div>
      </div>

      <div className="container mt-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* Quick info */}
            <div className="flex flex-wrap gap-4 rounded-2xl bg-card p-5 shadow-card">
              <div className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-primary" /> {pkg.duration}</div>
              <div className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-primary" /> {pkg.starting_from}</div>
              {pkg.seats_left !== null && pkg.seats_left > 0 && (
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
            <div className="grid gap-6 md:grid-cols-2">
              {pkg.inclusions && pkg.inclusions.length > 0 && (
                <div className="rounded-2xl bg-card p-5 shadow-card">
                  <h3 className="mb-3 text-lg font-bold text-foreground">✅ Included</h3>
                  <ul className="space-y-2">
                    {pkg.inclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-saffron" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {pkg.exclusions && pkg.exclusions.length > 0 && (
                <div className="rounded-2xl bg-card p-5 shadow-card">
                  <h3 className="mb-3 text-lg font-bold text-foreground">❌ Not Included</h3>
                  <ul className="space-y-2">
                    {pkg.exclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {pkg.next_departure && (
              <div className="rounded-2xl gradient-saffron-dark p-5 text-center">
                <p className="text-sm text-primary-foreground/80">Next Departure</p>
                <p className="text-2xl font-bold text-primary-foreground">{pkg.next_departure}</p>
                {pkg.seats_left !== null && pkg.seats_left > 0 && (
                  <p className="mt-2 text-sm font-semibold text-primary-foreground">⚡ Only {pkg.seats_left} seats left!</p>
                )}
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

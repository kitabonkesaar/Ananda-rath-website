import { useParams, Link } from "react-router-dom";
import { packages, WHATSAPP_NUMBER } from "@/data/packages";
import WhatsAppButton, { CallButton } from "@/components/WhatsAppButton";
import { Clock, MapPin, Check, X, ArrowLeft, Users } from "lucide-react";
import heroImg from "@/assets/hero-kedarnath.jpg";
import kashiImg from "@/assets/kashi.jpg";
import mahakaleshwarImg from "@/assets/mahakaleshwar.jpg";
import InquiryForm from "@/components/InquiryForm";

const imageMap: Record<string, string> = {
  kedarnath: heroImg,
  kashi: kashiImg,
  mahakaleshwar: mahakaleshwarImg,
};

const PackageDetail = () => {
  const { id } = useParams();
  const pkg = packages.find((p) => p.id === id);

  if (!pkg) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">पैकेज नहीं मिला</h1>
        <Link to="/" className="mt-4 inline-block text-primary underline">होम पेज पर जाएं</Link>
      </div>
    );
  }

  const whatsappMsg = `Namaste, I want details about ${pkg.titleEn} from Ananda Rath. Package: ${pkg.price}`;

  return (
    <div className="pb-20">
      {/* Hero */}
      <div className="relative h-72 md:h-96">
        <img src={imageMap[pkg.image]} alt={pkg.titleEn} className="h-full w-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
        <div className="absolute bottom-6 left-0 right-0 container">
          <Link to="/" className="mb-3 inline-flex items-center gap-1 text-sm text-primary-foreground/80 hover:text-primary-foreground">
            <ArrowLeft className="h-4 w-4" /> वापस जाएं
          </Link>
          <h1 className="text-3xl font-bold text-primary-foreground md:text-4xl">{pkg.title}</h1>
          <p className="text-primary-foreground/70">{pkg.titleEn}</p>
        </div>
      </div>

      <div className="container mt-8">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick info */}
            <div className="flex flex-wrap gap-4 rounded-2xl bg-card p-5 shadow-card">
              <div className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-primary" /> {pkg.duration}</div>
              <div className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-primary" /> {pkg.startingFrom}</div>
              <div className="flex items-center gap-2 text-sm"><Users className="h-4 w-4 text-accent" /> केवल {pkg.seatsLeft} सीट बाकी!</div>
              <div className="ml-auto text-right">
                <span className="text-2xl font-extrabold text-primary">{pkg.price}</span>
                <span className="text-sm text-muted-foreground"> / {pkg.priceNote}</span>
              </div>
            </div>

            {/* Highlights */}
            <div className="flex flex-wrap gap-2">
              {pkg.highlights.map((h) => (
                <span key={h} className="rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">{h}</span>
              ))}
            </div>

            {/* Itinerary */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-foreground">यात्रा कार्यक्रम</h2>
              <div className="space-y-3">
                {pkg.itinerary.map((day) => (
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

            {/* Inclusions / Exclusions */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-card p-5 shadow-card">
                <h3 className="mb-3 text-lg font-bold text-foreground">✅ शामिल है</h3>
                <ul className="space-y-2">
                  {pkg.inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-card p-5 shadow-card">
                <h3 className="mb-3 text-lg font-bold text-foreground">❌ शामिल नहीं</h3>
                <ul className="space-y-2">
                  {pkg.exclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Urgency */}
            <div className="rounded-2xl gradient-saffron-dark p-5 text-center">
              <p className="text-sm text-primary-foreground/80">अगला प्रस्थान</p>
              <p className="text-2xl font-bold text-primary-foreground">{pkg.nextDeparture}</p>
              <p className="mt-2 text-sm font-semibold text-primary-foreground">⚡ केवल {pkg.seatsLeft} सीट बाकी!</p>
            </div>

            {/* CTA buttons */}
            <div className="space-y-3">
              <WhatsAppButton message={whatsappMsg} label="WhatsApp पर पूछें" className="w-full justify-center" />
              <CallButton className="w-full justify-center" />
            </div>

            {/* Inquiry Form */}
            <InquiryForm packageName={pkg.titleEn} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;

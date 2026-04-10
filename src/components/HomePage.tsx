import { Link } from "react-router-dom";
import { Clock, MapPin, Users } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";
import heroImg from "@/assets/hero-kedarnath.jpg";
import badrinathImg from "@/assets/badrinath.jpg";
import kashiImg from "@/assets/kashi.jpg";
import mahakaleshwarImg from "@/assets/mahakaleshwar.jpg";
import { packages, testimonials, stats, WHATSAPP_NUMBER } from "@/data/packages";
import { Star, Bus, Utensils, Shield, Heart } from "lucide-react";

const imageMap: Record<string, string> = {
  kedarnath: heroImg,
  kashi: kashiImg,
  mahakaleshwar: mahakaleshwarImg,
};

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroImg} alt="Kedarnath Temple" className="h-full w-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
    </div>
    <div className="container relative z-10 py-20">
      <div className="max-w-2xl animate-fade-in-up">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-light">🙏 आनंद रथ</p>
        <h1 className="mb-6 text-4xl font-extrabold leading-tight text-primary-foreground md:text-6xl">
          हर यात्रा, एक<br />
          <span className="text-gradient-saffron">आध्यात्मिक अनुभव</span>
        </h1>
        <p className="mb-8 text-lg text-primary-foreground/80">
          ओडिशा से केदारनाथ, काशी, बद्रीनाथ और महाकालेश्वर तक — AC Sleeper Bus में आरामदायक यात्रा। भोजन, ठहराव सब शामिल।
        </p>
        <div className="flex flex-wrap gap-4">
          <WhatsAppButton variant="hero" label="WhatsApp पर पूछें" />
          <a href="#packages" className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/30 px-8 py-4 text-lg font-semibold text-primary-foreground transition-all hover:border-primary-foreground/60 hover:bg-primary-foreground/10">
            पैकेज देखें →
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
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-extrabold text-primary-foreground md:text-4xl">{s.number}</p>
            <p className="mt-1 text-sm text-primary-foreground/80">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PackagesSection = () => (
  <section id="packages" className="py-20">
    <div className="container">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">🕉️ हमारी यात्राएं</p>
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">लोकप्रिय तीर्थ यात्रा पैकेज</h2>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <Link to={`/package/${pkg.id}`} key={pkg.id} className="group overflow-hidden rounded-2xl bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="relative overflow-hidden">
              <img src={imageMap[pkg.image]} alt={pkg.titleEn} className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" width={800} height={600} />
              <div className="absolute top-3 right-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
                {pkg.seatsLeft} seats left
              </div>
              <div className="absolute bottom-3 left-3 rounded-full bg-foreground/70 px-3 py-1 text-xs font-medium text-primary-foreground">
                अगला प्रस्थान: {pkg.nextDeparture}
              </div>
            </div>
            <div className="p-5">
              <h3 className="mb-1 text-xl font-bold text-foreground">{pkg.title}</h3>
              <p className="mb-3 text-sm text-muted-foreground">{pkg.titleEn}</p>
              <div className="mb-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{pkg.duration}</span>
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{pkg.startingFrom}</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-2xl font-extrabold text-primary">{pkg.price}</span>
                  <span className="text-sm text-muted-foreground"> / {pkg.priceNote}</span>
                </div>
                <span className="text-sm font-semibold text-primary">विवरण देखें →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const WhyChooseSection = () => (
  <section id="about" className="bg-secondary/50 py-20">
    <div className="container">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">✨ क्यों चुनें</p>
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">आनंद रथ क्यों?</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Bus, title: "AC Sleeper Bus", desc: "2x2 आरामदायक सीटिंग, चार्जिंग पॉइंट" },
          { icon: Utensils, title: "भोजन शामिल", desc: "शुद्ध शाकाहारी नाश्ता और रात्रि भोजन" },
          { icon: Shield, title: "सुरक्षित यात्रा", desc: "अनुभवी ड्राइवर, GPS ट्रैकिंग, बीमा" },
          { icon: Heart, title: "श्रद्धा + आराम", desc: "धार्मिक गाइड, सभी दर्शन व्यवस्था" },
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

const TestimonialsSection = () => (
  <section className="py-20">
    <div className="container">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">💬 यात्री अनुभव</p>
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">हमारे यात्री क्या कहते हैं</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.name} className="rounded-2xl bg-card p-6 shadow-card">
            <div className="mb-3 flex gap-1">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
            <div>
              <p className="font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section id="contact" className="py-20">
    <div className="container">
      <div className="rounded-3xl gradient-saffron p-10 text-center md:p-16">
        <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">अपनी अगली यात्रा की योजना बनाएं</h2>
        <p className="mx-auto mb-8 max-w-xl text-primary-foreground/80">
          WhatsApp पर संपर्क करें या कॉल करें। हमारी टीम आपकी हर सवाल का जवाब देगी।
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <WhatsAppButton variant="hero" label="WhatsApp पर पूछें" className="border-2 border-primary-foreground/20" />
          <a href={`tel:+${WHATSAPP_NUMBER}`} className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/30 px-8 py-4 text-lg font-semibold text-primary-foreground transition-all hover:bg-primary-foreground/10">
            📞 कॉल करें
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
      <p className="mt-1 text-xs text-muted-foreground">हर यात्रा, एक आध्यात्मिक अनुभव 🙏</p>
    </div>
  </footer>
);

const HomePage = () => (
  <>
    <HeroSection />
    <StatsSection />
    <PackagesSection />
    <WhyChooseSection />
    <TestimonialsSection />
    <CTASection />
    <Footer />
  </>
);

export default HomePage;

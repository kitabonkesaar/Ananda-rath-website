import Navbar from "@/components/Navbar";
import { WhyChooseSection, TestimonialsSection, Footer } from "@/components/HomePage";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { Users, Award, Globe, Heart } from "lucide-react";
import _heroImg from "@/assets/hero-kedarnath.jpg";
const heroImg = typeof _heroImg === "string" ? _heroImg : (_heroImg as any).src;

const AboutHero = () => (
  <section className="page-header rounded-none -mt-0">
    <div className="relative z-10 container">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">🙏 About Us</p>
      <h1 className="text-3xl font-bold text-white md:text-5xl">Our Story</h1>
      <p className="mt-4 text-white/60 max-w-lg mx-auto">
        Connecting devotees from Odisha to the sacred temples of India, one yatra at a time.
      </p>
    </div>
  </section>
);

const OurStory = () => (
  <section className="py-24">
    <div className="container">
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Our Journey</p>
          <h2 className="text-2xl font-bold text-foreground md:text-4xl leading-tight">
            From a Small Dream to<br />
            <span className="text-gradient-saffron">Thousands of Smiles</span>
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              AnandaRath was born from a simple belief — that every devotee deserves a comfortable, safe, and deeply spiritual yatra experience. 
              Founded in Odisha, we started with a single bus and a passion for service.
            </p>
            <p>
              Today, we've grown into one of the most trusted pilgrimage travel organizers in the region, 
              having served over 5,000 happy pilgrims across 150+ successful yatras to India's holiest destinations.
            </p>
            <p>
              Our dedicated team ensures every detail is taken care of — from AC sleeper buses and quality meals 
              to guided darshan arrangements — so you can focus entirely on your spiritual journey.
            </p>
          </div>
        </div>
        <div className="relative">
          <img 
            src={heroImg} 
            alt="AnandaRath team" 
            className="rounded-2xl shadow-xl w-full h-80 lg:h-[450px] object-cover"
          />
          <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-card-hover p-6 hidden md:block">
            <p className="text-3xl font-extrabold text-primary">3+</p>
            <p className="text-sm text-muted-foreground">Years of Trust</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const MissionSection = () => (
  <section className="py-24 warm-pattern-bg">
    <div className="container">
      <div className="mb-14 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Our Values</p>
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">What Drives Us</h2>
        <div className="section-divider mt-4" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Heart, title: "Devotion First", desc: "Every decision is made with devotion and respect for the spiritual significance of each destination." },
          { icon: Users, title: "Community", desc: "We build a community of like-minded pilgrims who share the joy of spiritual journeys together." },
          { icon: Award, title: "Excellence", desc: "From bus quality to meal standards, we never compromise on the quality of our services." },
          { icon: Globe, title: "Accessibility", desc: "Making sacred pilgrimages accessible and affordable to devotees from all walks of life." },
        ].map((item, i) => (
          <div key={item.title} className="rounded-2xl bg-card p-8 text-center shadow-card card-interactive animate-reveal" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="icon-3d mx-auto mb-5 h-14 w-14 animate-micro-bounce" style={{ animationDelay: `${i * 150}ms` }}>
              <item.icon className="h-7 w-7 text-white relative z-10" />
            </div>
            <h3 className="mb-3 text-lg font-bold text-foreground">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const About = () => (
  <div className="flex flex-col min-h-screen">
    <SEO 
      title="About Us - Our Spiritual Mission"
      description="Learn about AnandaRath, Odisha's leading spiritual travel agency. Our mission is to provide comfortable and divine yatra experiences to every devotee from Odisha."
      keywords="AnandaRath, Odisha spiritual travel agency, spiritual tourism mission, about Ananda Rath Odisha, spiritual tour organizers Bhubaneswar"
    />
    <Navbar />
    <main className="flex-1">
      <AboutHero />
      <OurStory />
      <WhyChooseSection />
      <MissionSection />
      <TestimonialsSection />
    </main>
    <WhatsAppButton variant="floating" />
    <Footer />
  </div>
);

export default About;

import Navbar from "@/components/Navbar";
import { Footer } from "@/components/HomePage";
import WhatsAppButton from "@/components/WhatsAppButton";
import InquiryForm from "@/components/InquiryForm";
import SEO from "@/components/SEO";
import { Phone, Mail, MapPinned, Clock, MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/data/config";

const ContactHero = () => (
  <section className="page-header rounded-none -mt-0">
    <div className="relative z-10 container">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">📞 Get in Touch</p>
      <h1 className="text-3xl font-bold text-white md:text-5xl">Contact Us</h1>
      <p className="mt-4 text-white/60 max-w-lg mx-auto">
        Have questions? We'd love to hear from you. Reach out through any of the channels below.
      </p>
    </div>
  </section>
);

const contactMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Chat with us anytime",
    value: "+91 8249529220",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
  },
  {
    icon: Phone,
    title: "Phone",
    description: "Mon-Sat, 9AM-9PM",
    value: "+91 8249529220, +91 8018958872",
    href: `tel:+${WHATSAPP_NUMBER}`,
  },
  {
    icon: Mail,
    title: "Email",
    description: "We reply within 24 hours",
    value: "anandarathtours@gmail.com",
    href: "mailto:anandarathtours@gmail.com",
  },
  {
    icon: MapPinned,
    title: "Office",
    description: "Visit us in person",
    value: "Bhubaneswar, Odisha",
    href: "#",
  },
];

const Contact = () => (
  <div className="flex flex-col min-h-screen">
    <SEO 
      title="Contact Us - Plan Your Yatra"
      description="Contact AnandaRath for spiritual yatra bookings from Odisha. Reach us via WhatsApp, phone or visit our office in Bhubaneswar."
      keywords="contact AnandaRath, spiritual tour inquiry, yatra booking Odisha, Bhubaneswar travel agency contact"
    />
    <Navbar />
    <main className="flex-1">
      <ContactHero />

      <section className="py-24">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Contact Methods */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Get in Touch</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Whether you have a question about our yatra packages, pricing, or anything else, our team is ready to help.
                </p>
              </div>

              <div className="space-y-4">
                {contactMethods.map((method) => (
                  <a
                    key={method.title}
                    href={method.href}
                    target={method.href.startsWith("http") ? "_blank" : undefined}
                    rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-4 p-4 rounded-xl bg-card shadow-card card-interactive animate-reveal"
                    style={{ animationDelay: `${contactMethods.indexOf(method) * 100}ms` }}
                  >
                    <div className="icon-3d h-11 w-11 shrink-0">
                      <method.icon className="h-5 w-5 text-white relative z-10" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{method.title}</h3>
                      <p className="text-xs text-muted-foreground">{method.description}</p>
                      <p className="text-sm font-medium text-foreground mt-1">{method.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Business Hours */}
              <div className="rounded-xl bg-muted/60 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-foreground text-sm">Business Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Monday – Saturday</span>
                    <span className="font-medium text-foreground">9:00 AM – 9:00 PM</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Sunday</span>
                    <span className="font-medium text-foreground">10:00 AM – 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl bg-card p-8 shadow-card">
                <h2 className="text-xl font-bold text-foreground mb-1">Send Us an Inquiry</h2>
                <p className="text-sm text-muted-foreground mb-6">Fill the form below and we'll get back to you within hours.</p>
                <InquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <WhatsAppButton variant="floating" />
    <Footer />
  </div>
);

export default Contact;

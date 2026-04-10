import { MessageCircle, Phone } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/data/config";

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  variant?: "floating" | "inline" | "hero";
  label?: string;
}

const WhatsAppButton = ({ message = "Hello, I want details about Yatra packages from Ananda Rath.", className = "", variant = "inline", label }: WhatsAppButtonProps) => {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  if (variant === "floating") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full gradient-saffron shadow-saffron animate-pulse-glow transition-transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7 text-primary-foreground" />
      </a>
    );
  }

  if (variant === "hero") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 rounded-full gradient-saffron px-8 py-4 text-lg font-semibold text-primary-foreground shadow-saffron transition-all hover:scale-105 hover:shadow-xl ${className}`}
      >
        <MessageCircle className="h-5 w-5" />
        {label || "Enquire on WhatsApp"}
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-lg gradient-saffron px-5 py-3 text-sm font-semibold text-primary-foreground shadow-saffron transition-all hover:scale-105 ${className}`}
    >
      <MessageCircle className="h-4 w-4" />
      {label || "Enquire on WhatsApp"}
    </a>
  );
};

export const CallButton = ({ className = "" }: { className?: string }) => (
  <a
    href={`tel:+${WHATSAPP_NUMBER}`}
    className={`inline-flex items-center gap-2 rounded-lg border-2 border-primary bg-primary/5 px-5 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/10 ${className}`}
  >
    <Phone className="h-4 w-4" />
    Call Us
  </a>
);

export default WhatsAppButton;

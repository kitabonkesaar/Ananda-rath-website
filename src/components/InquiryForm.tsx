import { useState } from "react";
import { WHATSAPP_NUMBER } from "@/data/config";
import { useSubmitInquiry } from "@/hooks/useConvex";
import { Send } from "lucide-react";
import { toast } from "sonner";

interface InquiryFormProps {
  packageName?: string;
  packageId?: string;
}

const InquiryForm = ({ packageName, packageId }: InquiryFormProps) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    travelers: "2",
    date: "",
    pickup: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const submitInquiry = useSubmitInquiry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await submitInquiry.mutateAsync({
        name: form.name.trim(),
        phone: form.phone.trim(),
        travelers: form.travelers,
        preferred_date: form.date || undefined,
        pickup_location: form.pickup || undefined,
        package_name: packageName,
        package_id: packageId,
      });

      // Also open WhatsApp
      const message = `🙏 New Inquiry - AnandaRath\n\nPackage: ${packageName || "General"}\nName: ${form.name}\nPhone: ${form.phone}\nTravelers: ${form.travelers}\nPreferred Date: ${form.date}\nPickup: ${form.pickup}`;
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");

      setSubmitted(true);
      toast.success("Inquiry submitted successfully!");
    } catch {
      toast.error("Failed to submit. Please try WhatsApp directly.");
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-card p-6 shadow-card text-center">
        <p className="text-2xl mb-2">🙏</p>
        <p className="font-semibold text-foreground">Thank You!</p>
        <p className="text-sm text-muted-foreground">We will contact you shortly.</p>
        <button onClick={() => setSubmitted(false)} className="mt-3 text-sm text-primary underline">
          Submit Again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-card p-6 shadow-card">
      <h3 className="mb-4 text-lg font-bold text-foreground">📋 Inquiry Form</h3>
      <div className="space-y-3">
        <input
          type="text" placeholder="Your Name *" required maxLength={100}
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <input
          type="tel" placeholder="Phone Number *" required maxLength={15} pattern="[0-9]{10,15}"
          value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <select
          value={form.travelers} onChange={(e) => setForm({ ...form, travelers: e.target.value })}
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <option key={n} value={n}>{n} Traveler{n > 1 ? "s" : ""}</option>
          ))}
          <option value="10+">10+ Travelers</option>
        </select>
        <input
          type="date" value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <input
          type="text" placeholder="Pickup Location (e.g. Bhubaneswar)" maxLength={100}
          value={form.pickup} onChange={(e) => setForm({ ...form, pickup: e.target.value })}
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit" disabled={submitInquiry.isPending}
          className="flex w-full items-center justify-center gap-2 rounded-lg gradient-saffron px-5 py-3 font-semibold text-primary-foreground shadow-saffron transition-all hover:scale-[1.02] disabled:opacity-50"
        >
          <Send className="h-4 w-4" /> {submitInquiry.isPending ? "Sending..." : "Submit Inquiry"}
        </button>
      </div>
    </form>
  );
};

export default InquiryForm;

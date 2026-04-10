import { useState } from "react";
import { WHATSAPP_NUMBER } from "@/data/packages";
import { Send } from "lucide-react";

interface InquiryFormProps {
  packageName?: string;
}

const InquiryForm = ({ packageName }: InquiryFormProps) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    travelers: "2",
    date: "",
    pickup: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `🙏 New Inquiry - AnandaRath\n\nPackage: ${packageName || "General"}\nName: ${form.name}\nPhone: ${form.phone}\nTravelers: ${form.travelers}\nPreferred Date: ${form.date}\nPickup: ${form.pickup}`;
    
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-card p-6 shadow-card text-center">
        <p className="text-2xl mb-2">🙏</p>
        <p className="font-semibold text-foreground">धन्यवाद!</p>
        <p className="text-sm text-muted-foreground">हम जल्द ही आपसे संपर्क करेंगे।</p>
        <button onClick={() => setSubmitted(false)} className="mt-3 text-sm text-primary underline">
          दोबारा भेजें
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-card p-6 shadow-card">
      <h3 className="mb-4 text-lg font-bold text-foreground">📋 पूछताछ फॉर्म</h3>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="आपका नाम *"
          required
          maxLength={100}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <input
          type="tel"
          placeholder="फ़ोन नंबर *"
          required
          maxLength={15}
          pattern="[0-9]{10,15}"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <select
          value={form.travelers}
          onChange={(e) => setForm({ ...form, travelers: e.target.value })}
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <option key={n} value={n}>{n} यात्री</option>
          ))}
          <option value="10+">10+ यात्री</option>
        </select>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <input
          type="text"
          placeholder="पिकअप स्थान (जैसे: Bhubaneswar)"
          maxLength={100}
          value={form.pickup}
          onChange={(e) => setForm({ ...form, pickup: e.target.value })}
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg gradient-saffron px-5 py-3 font-semibold text-primary-foreground shadow-saffron transition-all hover:scale-[1.02]"
        >
          <Send className="h-4 w-4" /> पूछताछ भेजें
        </button>
      </div>
    </form>
  );
};

export default InquiryForm;

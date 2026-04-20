import { useState } from "react";
import { useHeroConfig, useUpdateHeroConfig } from "@/hooks/useConvex";
import { toast } from "sonner";
import { Save, Loader2 } from "lucide-react";

const AdminHeroConfig = () => {
  const { data: heroConfig, isLoading } = useHeroConfig();
  const { mutateAsync: updateConfig } = useUpdateHeroConfig();

  const [form, setForm] = useState({
    timer_title: "",
    target_date: "",
    form_title: "",
  });
  const [initialized, setInitialized] = useState(false);
  const [saving, setSaving] = useState(false);

  // Sync DB data into local form state once loaded
  if (!isLoading && heroConfig && !initialized) {
    setForm({
      timer_title: heroConfig.timer_title ?? "",
      target_date: heroConfig.target_date ?? "",
      form_title: heroConfig.form_title ?? "",
    });
    setInitialized(true);
  }

  const handleSave = async () => {
    setSaving(true);
    try {
      const id = heroConfig?._id !== "default" ? heroConfig?._id : undefined;
      await updateConfig({ id, config: form });
      toast.success("Hero settings saved!");
    } catch (e: any) {
      toast.error(e.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading settings...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Hero Customization</h2>
      </div>

      <div className="space-y-5 rounded-2xl bg-card p-6 shadow-sm border border-input">
        <div>
          <label className="text-sm font-semibold text-foreground mb-1.5 block">
            Timer Heading
          </label>
          <input
            value={form.timer_title}
            onChange={(e) => setForm({ ...form, timer_title: e.target.value })}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm"
            placeholder="e.g. NEXT YATRA DEPARTING IN"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-1.5 block">
            Target Departure Date (Override)
          </label>
          <input
            type="datetime-local"
            value={form.target_date}
            onChange={(e) => setForm({ ...form, target_date: e.target.value })}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm"
          />
          <p className="text-xs text-muted-foreground mt-1.5">
            Leave blank to automatically pull from the earliest active package departure.
          </p>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-1.5 block">
            Lead Form Title
          </label>
          <input
            value={form.form_title}
            onChange={(e) => setForm({ ...form, form_title: e.target.value })}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm"
            placeholder="e.g. Book Your Seat Now"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center gap-2 w-full rounded-lg gradient-saffron px-4 py-3 font-semibold text-primary-foreground mt-2 disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Settings
        </button>
      </div>

      <div className="rounded-2xl bg-primary/5 p-6 border border-primary/10 mt-6">
        <h3 className="font-semibold text-primary mb-2">Note</h3>
        <p className="text-sm text-muted-foreground">
          Forms submitted through the hero card will automatically appear in the <strong>Leads</strong> tab labeled as <em>"Homepage Inquiry"</em>.
        </p>
      </div>
    </div>
  );
};

export default AdminHeroConfig;

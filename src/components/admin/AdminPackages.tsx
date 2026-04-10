import { useAdminPackages, useUpsertPackage, useDeletePackage } from "@/hooks/useSupabase";
import { useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { toast } from "sonner";

interface PackageForm {
  id?: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  price: string;
  price_note: string;
  starting_from: string;
  image_url: string;
  seats_left: number;
  next_departure: string;
  highlights: string;
  inclusions: string;
  exclusions: string;
  itinerary_text: string;
  is_active: boolean;
  display_order: number;
}

const emptyForm: PackageForm = {
  slug: "", title: "", subtitle: "", description: "", duration: "", price: "",
  price_note: "per person", starting_from: "", image_url: "", seats_left: 0,
  next_departure: "", highlights: "", inclusions: "", exclusions: "",
  itinerary_text: "", is_active: true, display_order: 0,
};

const AdminPackages = () => {
  const { data: packages, isLoading } = useAdminPackages();
  const upsert = useUpsertPackage();
  const deletePkg = useDeletePackage();
  const [editing, setEditing] = useState<PackageForm | null>(null);

  const openEdit = (pkg?: any) => {
    if (pkg) {
      setEditing({
        id: pkg.id,
        slug: pkg.slug,
        title: pkg.title,
        subtitle: pkg.subtitle || "",
        description: pkg.description || "",
        duration: pkg.duration,
        price: pkg.price,
        price_note: pkg.price_note || "per person",
        starting_from: pkg.starting_from,
        image_url: pkg.image_url || "",
        seats_left: pkg.seats_left || 0,
        next_departure: pkg.next_departure || "",
        highlights: (pkg.highlights || []).join(", "),
        inclusions: (pkg.inclusions || []).join("\n"),
        exclusions: (pkg.exclusions || []).join("\n"),
        itinerary_text: JSON.stringify(pkg.itinerary || [], null, 2),
        is_active: pkg.is_active,
        display_order: pkg.display_order || 0,
      });
    } else {
      setEditing({ ...emptyForm });
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    try {
      let itinerary = [];
      try { itinerary = JSON.parse(editing.itinerary_text || "[]"); } catch { /* keep empty */ }

      await upsert.mutateAsync({
        ...(editing.id ? { id: editing.id } : {}),
        slug: editing.slug,
        title: editing.title,
        subtitle: editing.subtitle || null,
        description: editing.description || null,
        duration: editing.duration,
        price: editing.price,
        price_note: editing.price_note,
        starting_from: editing.starting_from,
        image_url: editing.image_url || null,
        seats_left: editing.seats_left,
        next_departure: editing.next_departure || null,
        highlights: editing.highlights ? editing.highlights.split(",").map((s: string) => s.trim()).filter(Boolean) : [],
        inclusions: editing.inclusions ? editing.inclusions.split("\n").map((s: string) => s.trim()).filter(Boolean) : [],
        exclusions: editing.exclusions ? editing.exclusions.split("\n").map((s: string) => s.trim()).filter(Boolean) : [],
        itinerary,
        is_active: editing.is_active,
        display_order: editing.display_order,
      });
      toast.success("Package saved!");
      setEditing(null);
    } catch (e: any) {
      toast.error(e.message || "Failed to save");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this package?")) return;
    try {
      await deletePkg.mutateAsync(id);
      toast.success("Package deleted");
    } catch (e: any) {
      toast.error(e.message || "Failed to delete");
    }
  };

  if (isLoading) return <div className="text-center text-muted-foreground py-10">Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Packages ({packages?.length || 0})</h2>
        <button onClick={() => openEdit()} className="flex items-center gap-1 rounded-lg gradient-saffron px-4 py-2 text-sm font-semibold text-primary-foreground">
          <Plus className="h-4 w-4" /> Add Package
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {packages?.map((pkg) => (
          <div key={pkg.id} className="flex items-center justify-between rounded-xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-4">
              {pkg.image_url && <img src={pkg.image_url} alt="" className="h-16 w-24 rounded-lg object-cover" />}
              <div>
                <h3 className="font-semibold text-foreground">{pkg.title}</h3>
                <p className="text-xs text-muted-foreground">{pkg.duration} · {pkg.price} · {pkg.starting_from}</p>
                <p className="text-xs text-muted-foreground">/{pkg.slug} · {pkg.is_active ? "Active" : "Inactive"}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(pkg)} className="rounded-lg bg-muted p-2 text-muted-foreground hover:text-foreground"><Edit2 className="h-4 w-4" /></button>
              <button onClick={() => handleDelete(pkg.id)} className="rounded-lg bg-destructive/10 p-2 text-destructive hover:bg-destructive/20"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">{editing.id ? "Edit Package" : "Add Package"}</h3>
              <button onClick={() => setEditing(null)}><X className="h-5 w-5 text-muted-foreground" /></button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Title *" required value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="rounded-lg border border-input bg-background px-3 py-2 text-sm" />
                <input placeholder="URL Slug *" required value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="rounded-lg border border-input bg-background px-3 py-2 text-sm" />
              </div>
              <input placeholder="Subtitle" value={editing.subtitle} onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
              <textarea placeholder="Description" rows={2} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
              <div className="grid grid-cols-3 gap-3">
                <input placeholder="Duration *" required value={editing.duration} onChange={(e) => setEditing({ ...editing, duration: e.target.value })} className="rounded-lg border border-input bg-background px-3 py-2 text-sm" />
                <input placeholder="Price *" required value={editing.price} onChange={(e) => setEditing({ ...editing, price: e.target.value })} className="rounded-lg border border-input bg-background px-3 py-2 text-sm" />
                <input placeholder="Starting From *" required value={editing.starting_from} onChange={(e) => setEditing({ ...editing, starting_from: e.target.value })} className="rounded-lg border border-input bg-background px-3 py-2 text-sm" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <input placeholder="Next Departure" value={editing.next_departure} onChange={(e) => setEditing({ ...editing, next_departure: e.target.value })} className="rounded-lg border border-input bg-background px-3 py-2 text-sm" />
                <input type="number" placeholder="Seats Left" value={editing.seats_left} onChange={(e) => setEditing({ ...editing, seats_left: parseInt(e.target.value) || 0 })} className="rounded-lg border border-input bg-background px-3 py-2 text-sm" />
                <input type="number" placeholder="Order" value={editing.display_order} onChange={(e) => setEditing({ ...editing, display_order: parseInt(e.target.value) || 0 })} className="rounded-lg border border-input bg-background px-3 py-2 text-sm" />
              </div>
              <input placeholder="Image URL" value={editing.image_url} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
              <input placeholder="Highlights (comma separated)" value={editing.highlights} onChange={(e) => setEditing({ ...editing, highlights: e.target.value })} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
              <textarea placeholder="Inclusions (one per line)" rows={3} value={editing.inclusions} onChange={(e) => setEditing({ ...editing, inclusions: e.target.value })} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
              <textarea placeholder="Exclusions (one per line)" rows={2} value={editing.exclusions} onChange={(e) => setEditing({ ...editing, exclusions: e.target.value })} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
              <textarea placeholder='Itinerary JSON: [{"day":1,"title":"...","desc":"..."}]' rows={4} value={editing.itinerary_text} onChange={(e) => setEditing({ ...editing, itinerary_text: e.target.value })} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-xs" />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} /> Active (visible on site)
              </label>
              <div className="flex gap-3 pt-2">
                <button onClick={handleSave} disabled={upsert.isPending} className="flex-1 rounded-lg gradient-saffron px-4 py-2.5 font-semibold text-primary-foreground disabled:opacity-50">
                  {upsert.isPending ? "Saving..." : "Save Package"}
                </button>
                <button onClick={() => setEditing(null)} className="rounded-lg border border-input px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPackages;

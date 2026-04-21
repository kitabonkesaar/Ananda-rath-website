import { useAdminTestimonials, useUpsertTestimonial, useDeleteTestimonial, uploadImage } from "@/hooks/useConvex";
import { useState, useRef } from "react";
import { Plus, Edit2, Trash2, X, Upload, Star } from "lucide-react";
import { toast } from "sonner";

interface TestimonialForm {
  id?: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  photo_url: string;
  is_visible: boolean;
  display_order: number;
}

const empty: TestimonialForm = {
  name: "", location: "", text: "", rating: 5, photo_url: "", is_visible: true, display_order: 0,
};

const AdminTestimonials = () => {
  const { data: testimonials, isLoading } = useAdminTestimonials();
  const upsert = useUpsertTestimonial();
  const deleteT = useDeleteTestimonial();
  const [editing, setEditing] = useState<TestimonialForm | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const openEdit = (t?: any) => {
    setEditing(t ? { id: t._id, name: t.name, location: t.location || "", text: t.text, rating: t.rating || 5, photo_url: t.photo_url || "", is_visible: true, display_order: t.display_order || 0 } : { ...empty });
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploading(true);
    try {
      const url = await uploadImage(file, "testimonials");
      setEditing({ ...editing, photo_url: url });
      toast.success("Photo uploaded!");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    }
    setUploading(false);
  };

  const handleSave = async () => {
    if (!editing) return;
    try {
      await upsert.mutateAsync({
        ...(editing.id ? { id: editing.id } : {}),
        name: editing.name,
        location: editing.location || undefined,
        text: editing.text,
        rating: editing.rating,
        photo_url: editing.photo_url || undefined,
        is_visible: editing.is_visible,
        display_order: editing.display_order,
      });
      toast.success("Testimonial saved!");
      setEditing(null);
    } catch (e: any) {
      toast.error(e.message || "Failed to save");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try { await deleteT.mutateAsync(id); toast.success("Deleted"); } catch (e: any) { toast.error(e.message); }
  };

  if (isLoading) return <div className="text-center text-muted-foreground py-10">Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Testimonials ({testimonials?.length || 0})</h2>
        <button onClick={() => openEdit()} className="flex items-center gap-1 rounded-lg gradient-saffron px-4 py-2 text-sm font-semibold text-primary-foreground">
          <Plus className="h-4 w-4" /> Add Testimonial
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {testimonials?.map((t) => (
          <div key={t._id} className="rounded-xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-3 mb-2">
              {t.photo_url && <img src={t.photo_url} alt="" className="h-10 w-10 rounded-full object-cover" />}
              <div>
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
            </div>
            <div className="flex gap-0.5 mb-2">{Array.from({ length: t.rating || 5 }).map((_, i) => <Star key={i} className="h-3 w-3 fill-gold text-gold" />)}</div>
            <p className="text-xs text-muted-foreground line-clamp-3">"{t.text}"</p>
            <div className="flex gap-2 mt-3">
              <button onClick={() => openEdit(t)} className="rounded bg-muted p-1.5 text-muted-foreground hover:text-foreground"><Edit2 className="h-3 w-3" /></button>
              <button onClick={() => handleDelete(t._id)} className="rounded bg-destructive/10 p-1.5 text-destructive"><Trash2 className="h-3 w-3" /></button>
              <span className="ml-auto rounded-full px-2 py-0.5 text-xs bg-green-100 text-green-800">
                Visible
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">{editing.id ? "Edit" : "Add"} Testimonial</h3>
              <button onClick={() => setEditing(null)}><X className="h-5 w-5 text-muted-foreground" /></button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Name *" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="rounded-lg border border-input bg-background px-3 py-2 text-sm" />
                <input placeholder="Location" value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} className="rounded-lg border border-input bg-background px-3 py-2 text-sm" />
              </div>
              <textarea placeholder="Testimonial text *" rows={3} value={editing.text} onChange={(e) => setEditing({ ...editing, text: e.target.value })} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground">Rating</label>
                  <select value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: parseInt(e.target.value) })} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                    {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Stars</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Order</label>
                  <input type="number" value={editing.display_order} onChange={(e) => setEditing({ ...editing, display_order: parseInt(e.target.value) || 0 })} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
                </div>
              </div>
              {/* Photo upload */}
              <div>
                <label className="text-xs text-muted-foreground">Client Photo</label>
                <div className="flex items-center gap-3 mt-1">
                  {editing.photo_url && <img src={editing.photo_url} alt="" className="h-12 w-12 rounded-full object-cover" />}
                  <input type="file" ref={fileRef} accept="image/*" onChange={handleUpload} className="hidden" />
                  <button onClick={() => fileRef.current?.click()} disabled={uploading} className="flex items-center gap-1 rounded-lg border border-input px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground disabled:opacity-50">
                    <Upload className="h-3 w-3" /> {uploading ? "Uploading..." : "Upload Photo"}
                  </button>
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={editing.is_visible} onChange={(e) => setEditing({ ...editing, is_visible: e.target.checked })} /> Visible on website
              </label>
              <div className="flex gap-3 pt-2">
                <button onClick={handleSave} disabled={upsert.isPending} className="flex-1 rounded-lg gradient-saffron px-4 py-2.5 font-semibold text-primary-foreground disabled:opacity-50">
                  {upsert.isPending ? "Saving..." : "Save"}
                </button>
                <button onClick={() => setEditing(null)} className="rounded-lg border border-input px-4 py-2.5 text-sm text-muted-foreground">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;

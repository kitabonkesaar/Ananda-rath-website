import { useState } from "react";
import {
  useVideoTestimonialsConvex,
  useUpsertVideoTestimonial,
  useDeleteVideoTestimonial,
} from "@/hooks/useConvex";
import { getYoutubeThumbnail } from "@/data/videoTestimonials";
import { Plus, Trash2, Edit2, Save, X, ExternalLink, Youtube, Loader2 } from "lucide-react";
import { toast } from "sonner";

const emptyForm = {
  youtube_url: "",
  customer_name: "",
  location: "",
  title: "",
  display_order: 0,
};

const AdminVideoTestimonials = () => {
  const { data: videos, isLoading } = useVideoTestimonialsConvex();
  const { mutateAsync: upsert } = useUpsertVideoTestimonial();
  const { mutateAsync: remove } = useDeleteVideoTestimonial();

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.youtube_url.trim() || !form.customer_name.trim()) return;
    setSaving(true);
    try {
      await upsert({
        id: editId || undefined,
        ...form,
        display_order: form.display_order || (videos?.length ?? 0) + 1,
      });
      toast.success(editId ? "Video updated!" : "Video added!");
      setForm(emptyForm);
      setShowForm(false);
      setEditId(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to save video");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (video: any) => {
    setForm({
      youtube_url: video.youtube_url,
      customer_name: video.customer_name,
      location: video.location || "",
      title: video.title || "",
      display_order: video.display_order,
    });
    setEditId(video._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this video testimonial?")) return;
    try {
      await remove(id);
      toast.success("Video deleted");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete");
    }
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setShowForm(false);
    setEditId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Video Testimonials</h2>
          <p className="text-sm text-muted-foreground">Add YouTube links of customer testimonials</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); }}
          className="flex items-center gap-2 rounded-lg gradient-saffron px-4 py-2 text-sm font-semibold text-white shadow-saffron transition-all hover:scale-[1.02]"
        >
          <Plus className="h-4 w-4" />
          Add Video
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl bg-card p-6 shadow-card border border-border space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-foreground">{editId ? "Edit" : "Add"} Video Testimonial</h3>
            <button type="button" onClick={handleCancel} className="text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">YouTube URL *</label>
            <div className="relative mt-1">
              <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="url"
                required
                placeholder="https://www.youtube.com/watch?v=..."
                value={form.youtube_url}
                onChange={(e) => setForm({ ...form, youtube_url: e.target.value })}
                className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {form.youtube_url && getYoutubeThumbnail(form.youtube_url) && (
            <div className="rounded-lg overflow-hidden bg-muted">
              <img
                src={getYoutubeThumbnail(form.youtube_url)!}
                alt="Video thumbnail"
                className="w-full h-32 object-cover"
              />
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground">Customer Name *</label>
              <input
                type="text"
                required
                maxLength={100}
                placeholder="e.g. Ramesh Patra"
                value={form.customer_name}
                onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Location</label>
              <input
                type="text"
                maxLength={100}
                placeholder="e.g. Bhubaneswar"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-foreground">Video Title</label>
              <input
                type="text"
                maxLength={200}
                placeholder="e.g. My Kedarnath Yatra Experience"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Order</label>
              <input
                type="number"
                min={0}
                value={form.display_order}
                onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })}
                className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={handleCancel} className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex items-center gap-2 rounded-lg gradient-saffron px-5 py-2 text-sm font-semibold text-white shadow-saffron transition-all hover:scale-[1.02] disabled:opacity-50">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {editId ? "Update" : "Add"} Video
            </button>
          </div>
        </form>
      )}

      {/* Video List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin mr-2" /> Loading videos...
        </div>
      ) : !videos?.length ? (
        <div className="text-center py-12 text-muted-foreground">
          <Youtube className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p>No video testimonials yet. Click "Add Video" to add one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {[...videos]
            .sort((a, b) => a.display_order - b.display_order)
            .map((video) => {
              const thumb = getYoutubeThumbnail(video.youtube_url);
              return (
                <div key={video._id} className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card border border-border">
                  <div className="shrink-0 w-28 h-20 rounded-lg overflow-hidden bg-muted">
                    {thumb ? (
                      <img src={thumb} alt={video.title || video.customer_name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Youtube className="h-6 w-6 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">{video.title || "Untitled"}</p>
                    <p className="text-xs text-muted-foreground">{video.customer_name}{video.location ? ` • ${video.location}` : ""}</p>
                    <p className="text-xs text-muted-foreground mt-1 truncate">{video.youtube_url}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a href={video.youtube_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <button onClick={() => handleEdit(video)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(video._id)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default AdminVideoTestimonials;

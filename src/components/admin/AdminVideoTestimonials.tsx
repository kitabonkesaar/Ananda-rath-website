import { useState } from "react";
import {
  useVideoTestimonialsConvex,
  useUpsertVideoTestimonial,
  useDeleteVideoTestimonial,
} from "@/hooks/useConvex";
import { getYoutubeThumbnail } from "@/data/videoTestimonials";
import { Plus, Trash2, Edit2, Save, X, ExternalLink, Youtube, Loader2, Instagram } from "lucide-react";
import { toast } from "sonner";

const emptyForm = {
  youtube_url: "",
  instagram_reel_url: "",
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
    if (!form.youtube_url.trim() && !form.instagram_reel_url.trim()) {
      toast.error("Please provide at least one link (YouTube or Instagram Reel)");
      return;
    }
    if (!form.customer_name.trim()) return;
    setSaving(true);
    try {
      await upsert({
        id: editId || undefined,
        ...form,
        youtube_url: form.youtube_url.trim() || undefined,
        instagram_reel_url: form.instagram_reel_url.trim() || undefined,
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
      youtube_url: video.youtube_url || "",
      instagram_reel_url: video.instagram_reel_url || "",
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
          <p className="text-sm text-muted-foreground">Add YouTube & Instagram Reels links of customer testimonials</p>
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

          <div className="bg-muted/50 p-4 rounded-lg border border-border text-sm text-muted-foreground mb-4">
            Please provide at least one link. You can provide both if you have them!
          </div>

          {/* YouTube URL */}
          <div>
            <label className="text-sm font-medium text-foreground">YouTube URL <span className="text-xs text-muted-foreground font-normal">(optional)</span></label>
            <div className="relative mt-1">
              <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="url"
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

          {/* Instagram Reel URL */}
          <div>
            <label className="text-sm font-medium text-foreground">
              Instagram Reel URL
              <span className="ml-2 text-xs font-normal text-muted-foreground">(optional)</span>
            </label>
            <div className="relative mt-1">
              <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="url"
                placeholder="https://www.instagram.com/reel/..."
                value={form.instagram_reel_url}
                onChange={(e) => setForm({ ...form, instagram_reel_url: e.target.value })}
                className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Paste the Instagram Reel link so customers can also watch the review on Instagram.
            </p>
          </div>

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
              // Note: If they previously put an Instagram link in the youtube_url field, we handle it gracefully here
              const isYoutubeActuallyInsta = video.youtube_url?.includes("instagram.com");
              const hasActualYoutube = video.youtube_url && !isYoutubeActuallyInsta;
              
              const thumb = hasActualYoutube ? getYoutubeThumbnail(video.youtube_url) : null;
              
              return (
                <div key={video._id} className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl bg-card p-4 shadow-card border border-border">
                  <div className="shrink-0 w-full sm:w-28 h-40 sm:h-20 rounded-lg overflow-hidden bg-muted">
                    {thumb ? (
                      <img src={thumb} alt={video.title || video.customer_name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                        {video.instagram_reel_url || isYoutubeActuallyInsta ? (
                          <Instagram className="h-8 w-8 text-pink-500/50" />
                        ) : (
                          <Youtube className="h-8 w-8 text-muted-foreground/40" />
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">{video.title || "Untitled"}</p>
                    <p className="text-xs text-muted-foreground">{video.customer_name}{video.location ? ` • ${video.location}` : ""}</p>
                    
                    {/* Show raw URLs for admin clarity */}
                    <div className="mt-2 space-y-1">
                      {video.youtube_url && (
                        <p className="text-[11px] text-muted-foreground truncate font-mono">
                          {video.youtube_url}
                        </p>
                      )}
                      {video.instagram_reel_url && (
                        <p className="text-[11px] text-muted-foreground truncate font-mono">
                          {video.instagram_reel_url}
                        </p>
                      )}
                    </div>

                    {/* Platform badges */}
                    <div className="flex items-center gap-2 mt-2">
                      {hasActualYoutube && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-600 dark:text-red-400">
                          <Youtube className="h-3 w-3" /> YouTube
                        </span>
                      )}
                      {(video.instagram_reel_url || isYoutubeActuallyInsta) && (
                        <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold text-transparent bg-clip-text"
                          style={{
                            background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          <Instagram className="h-3 w-3" style={{ color: "#e6683c" }} /> Reel
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto mt-2 sm:mt-0">
                    {/* YouTube Link */}
                    {video.youtube_url && (
                      <a
                        href={video.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open Link"
                        className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {/* Instagram Reel Link */}
                    {video.instagram_reel_url && (
                      <a
                        href={video.instagram_reel_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open Instagram Reel"
                        className="p-2 rounded-lg hover:bg-pink-500/10 text-muted-foreground hover:text-pink-500 transition-colors"
                      >
                        <Instagram className="h-4 w-4" />
                      </a>
                    )}
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

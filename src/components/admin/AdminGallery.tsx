import { useAdminGallery, useUpsertGalleryPhoto, useDeleteGalleryPhoto, uploadImage, useAdminPackages } from "@/hooks/useSupabase";
import { useState, useRef } from "react";
import { Plus, Trash2, Upload, X } from "lucide-react";
import { toast } from "sonner";

const AdminGallery = () => {
  const { data: photos, isLoading } = useAdminGallery();
  const { data: packages } = useAdminPackages();
  const upsert = useUpsertGalleryPhoto();
  const deletePhoto = useDeleteGalleryPhoto();
  const [adding, setAdding] = useState(false);
  const [caption, setCaption] = useState("");
  const [packageId, setPackageId] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const url = await uploadImage(files[i], "gallery");
        await upsert.mutateAsync({
          image_url: url,
          caption: caption || null,
          package_id: packageId || null,
          display_order: (photos?.length || 0) + i,
        });
      }
      toast.success(`${files.length} photo(s) uploaded!`);
      setAdding(false);
      setCaption("");
      setPackageId("");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this photo?")) return;
    try { await deletePhoto.mutateAsync(id); toast.success("Deleted"); } catch (e: any) { toast.error(e.message); }
  };

  if (isLoading) return <div className="text-center text-muted-foreground py-10">Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Photo Gallery ({photos?.length || 0})</h2>
        <button onClick={() => setAdding(true)} className="flex items-center gap-1 rounded-lg gradient-saffron px-4 py-2 text-sm font-semibold text-primary-foreground">
          <Plus className="h-4 w-4" /> Add Photos
        </button>
      </div>

      {/* Upload modal */}
      {adding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Upload Photos</h3>
              <button onClick={() => setAdding(false)}><X className="h-5 w-5 text-muted-foreground" /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Caption (optional)" value={caption} onChange={(e) => setCaption(e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
              <select value={packageId} onChange={(e) => setPackageId(e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                <option value="">No package (general)</option>
                {packages?.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
              </select>
              <input type="file" ref={fileRef} accept="image/*" multiple onChange={handleUpload} className="hidden" />
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="flex w-full items-center justify-center gap-2 rounded-lg gradient-saffron px-4 py-3 font-semibold text-primary-foreground disabled:opacity-50"
              >
                <Upload className="h-4 w-4" /> {uploading ? "Uploading..." : "Select & Upload Photos"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gallery grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {photos?.map((photo) => (
          <div key={photo.id} className="group relative overflow-hidden rounded-xl">
            <img src={photo.image_url} alt={photo.caption || ""} className="h-48 w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center">
              <button
                onClick={() => handleDelete(photo.id)}
                className="opacity-0 group-hover:opacity-100 rounded-full bg-destructive p-2 text-destructive-foreground transition-opacity"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            {photo.caption && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-foreground/60 to-transparent p-2">
                <p className="text-xs text-primary-foreground">{photo.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGallery;

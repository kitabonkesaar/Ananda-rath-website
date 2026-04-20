import { useState } from "react";
import { useAdminBlogPosts, useUpsertBlogPost, useDeleteBlogPost } from "@/hooks/useConvex";
import { Plus, Edit2, Trash2, X, Eye, EyeOff, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface BlogForm {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: string;
  category: string;
  published_at: string;
  is_published: boolean;
}

const emptyForm: BlogForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image: "",
  author: "AnandaRath Team",
  category: "Travel Guide",
  published_at: new Date().toISOString().split("T")[0],
  is_published: true,
};

const categories = ["Travel Guide", "Spirituality", "Tips", "Yatra Updates", "Culture", "Announcements"];

const AdminBlog = () => {
  const { data: posts, isLoading } = useAdminBlogPosts();
  const { mutateAsync: upsert } = useUpsertBlogPost();
  const { mutateAsync: remove } = useDeleteBlogPost();
  const [editing, setEditing] = useState<BlogForm | null>(null);
  const [saving, setSaving] = useState(false);

  const openEdit = (post?: any) => {
    if (post) {
      setEditing({
        _id: post._id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        cover_image: post.cover_image || "",
        author: post.author,
        category: post.category,
        published_at: post.published_at,
        is_published: post.is_published,
      });
    } else {
      setEditing({ ...emptyForm });
    }
  };

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleSave = async () => {
    if (!editing) return;
    if (!editing.title.trim() || !editing.slug.trim()) {
      toast.error("Title and slug are required");
      return;
    }
    setSaving(true);
    try {
      const { _id, ...rest } = editing;
      await upsert({ id: _id || undefined, ...rest });
      toast.success("Blog post saved!");
      setEditing(null);
    } catch (e: any) {
      toast.error(e.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    try {
      await remove(id);
      toast.success("Post deleted");
    } catch (e: any) {
      toast.error(e.message || "Failed to delete");
    }
  };

  const togglePublish = async (post: any) => {
    try {
      const { _id, _creationTime, created_at, ...rest } = post;
      await upsert({ id: _id, ...rest, is_published: !post.is_published });
      toast.success(post.is_published ? "Post unpublished" : "Post published");
    } catch (e: any) {
      toast.error(e.message || "Failed to update");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Blog Posts ({posts?.length ?? 0})</h2>
        <button
          onClick={() => openEdit()}
          className="flex items-center gap-1.5 rounded-lg gradient-saffron px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          <Plus className="h-4 w-4" /> New Post
        </button>
      </div>

      {/* Posts List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading posts...
        </div>
      ) : (
        <div className="space-y-3">
          {posts?.map((post) => (
            <div key={post._id} className="flex items-center justify-between rounded-xl bg-card p-4 shadow-card">
              <div className="flex items-center gap-4 min-w-0 flex-1">
                {post.cover_image && (
                  <img src={post.cover_image} alt="" className="h-14 w-20 rounded-lg object-cover shrink-0" />
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-semibold text-foreground text-sm truncate">{post.title}</h3>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                      post.is_published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {post.is_published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {post.category} · {post.published_at} · by {post.author}
                  </p>
                </div>
              </div>
              <div className="flex gap-1.5 shrink-0 ml-4">
                <button
                  onClick={() => togglePublish(post)}
                  className="rounded-lg bg-muted p-2 text-muted-foreground hover:text-foreground"
                  title={post.is_published ? "Unpublish" : "Publish"}
                >
                  {post.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                <button onClick={() => openEdit(post)} className="rounded-lg bg-muted p-2 text-muted-foreground hover:text-foreground">
                  <Edit2 className="h-4 w-4" />
                </button>
                <button onClick={() => handleDelete(post._id)} className="rounded-lg bg-destructive/10 p-2 text-destructive hover:bg-destructive/20">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {!posts?.length && (
            <p className="text-center text-muted-foreground text-sm py-8 italic">No blog posts yet. Click "New Post" to get started.</p>
          )}
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-foreground">{editing._id ? "Edit Post" : "New Post"}</h3>
              <button onClick={() => setEditing(null)}><X className="h-5 w-5 text-muted-foreground" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Title *</label>
                <input
                  value={editing.title}
                  onChange={(e) => setEditing({
                    ...editing,
                    title: e.target.value,
                    slug: editing._id ? editing.slug : generateSlug(e.target.value),
                  })}
                  placeholder="Enter blog post title"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">URL Slug *</label>
                  <input
                    value={editing.slug}
                    onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Category</label>
                  <select
                    value={editing.category}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm"
                  >
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Excerpt</label>
                <textarea
                  value={editing.excerpt}
                  onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                  rows={2}
                  placeholder="Brief summary for card view..."
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Content (Markdown)</label>
                <textarea
                  value={editing.content}
                  onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                  rows={8}
                  placeholder="Write your blog post content here. Markdown is supported."
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-mono text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Cover Image URL</label>
                  <input
                    value={editing.cover_image}
                    onChange={(e) => setEditing({ ...editing, cover_image: e.target.value })}
                    placeholder="https://..."
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Publish Date</label>
                  <input
                    type="date"
                    value={editing.published_at}
                    onChange={(e) => setEditing({ ...editing, published_at: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Author</label>
                  <input
                    value={editing.author}
                    onChange={(e) => setEditing({ ...editing, author: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm"
                  />
                </div>
                <div className="flex items-end pb-0.5">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editing.is_published}
                      onChange={(e) => setEditing({ ...editing, is_published: e.target.checked })}
                      className="accent-primary"
                    />
                    Publish immediately
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg gradient-saffron px-4 py-2.5 font-semibold text-primary-foreground disabled:opacity-50"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  {editing._id ? "Update Post" : "Create Post"}
                </button>
                <button onClick={() => setEditing(null)} className="rounded-lg border border-input px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlog;

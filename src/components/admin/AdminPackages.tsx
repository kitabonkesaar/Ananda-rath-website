import { useAdminPackages, useUpsertPackage, useDeletePackage } from "@/hooks/useConvex";
import { useState } from "react";
import { Plus, Edit2, Trash2, X, Check, Ban } from "lucide-react";
import { toast } from "sonner";

interface PackageForm {
  id?: string;
  slug: string;
  title: string;
  duration: string;
  price: string;
  starting_from: string;
  image_url: string;
  trip_date: string;
  pushback_price: string;
  sleeper_price: string;
  itinerary: { day: number; title: string; desc: string }[];
  inclusions: string[];
  exclusions: string[];
  highlights: string[];
  is_active: boolean;
  is_full: boolean;
}

// Suggested inclusions the user can quick-add
const SUGGESTED_INCLUSIONS = [
  "🚌 2x1 AC Sleeper Bus",
  "🍛 Odia Home-Cooked Food (Veg)",
  "🗣️ Odia Speaking Guide",
  "📸 Professional Photography",
  "🙏 Astha / Puja Arrangements",
  "🏨 Hotel / Dharamshala Stay",
  "🎫 All Temple Entry Tickets",
  "🧳 Luggage Support",
  "💧 Drinking Water & Snacks",
  "🏥 First Aid & Medical Support",
];

const SUGGESTED_EXCLUSIONS = [
  "✈️ Airfare / Train Fare",
  "🍽️ Lunch",
  "🛕 Personal Puja Items",
  "🛍️ Shopping & Personal Expenses",
  "🧗 Pony / Palki / Helicopter Charges",
  "📜 Any Government Tax Increase",
  "🍦 Extra Snacks / Beverages",
  "💇 Laundry & Room Service",
];

const emptyForm: PackageForm = {
  slug: "", title: "", duration: "", price: "",
  starting_from: "", image_url: "",
  trip_date: "", pushback_price: "", sleeper_price: "",
  itinerary: [], inclusions: [], exclusions: [], highlights: [],
  is_active: true, is_full: false,
};

const AdminPackages = () => {
  const { data: packages, isLoading } = useAdminPackages();
  const upsert = useUpsertPackage();
  const deletePkg = useDeletePackage();
  const [editing, setEditing] = useState<PackageForm | null>(null);
  const [newInclusion, setNewInclusion] = useState("");
  const [newExclusion, setNewExclusion] = useState("");
  const [newHighlight, setNewHighlight] = useState("");

  const openEdit = (pkg?: any) => {
    if (pkg) {
      setEditing({
        id: pkg._id || pkg.id,
        slug: pkg.slug || "",
        title: pkg.title || "",
        duration: pkg.duration || "",
        price: pkg.price || "",
        starting_from: pkg.starting_from || "",
        image_url: pkg.image_url || "",
        trip_date: pkg.trip_date || "",
        pushback_price: pkg.pushback_price || "",
        sleeper_price: pkg.sleeper_price || "",
        itinerary: Array.isArray(pkg.itinerary) ? pkg.itinerary : [],
        inclusions: Array.isArray(pkg.inclusions) ? pkg.inclusions : [],
        exclusions: Array.isArray(pkg.exclusions) ? pkg.exclusions : [],
        highlights: Array.isArray(pkg.highlights) ? pkg.highlights : [],
        is_active: pkg.is_active ?? true,
        is_full: pkg.is_full ?? false,
      });
    } else {
      setEditing({ ...emptyForm });
    }
    setNewInclusion("");
    setNewExclusion("");
    setNewHighlight("");
  };

  const handleSave = async () => {
    if (!editing) return;
    if (!editing.title || !editing.slug || !editing.duration || !editing.price || !editing.starting_from) {
      toast.error("Please fill all required fields (*)");
      return;
    }

    try {
      await upsert.mutateAsync({
        ...(editing.id ? { id: editing.id } : {}),
        slug: editing.slug,
        title: editing.title,
        duration: editing.duration,
        price: editing.price,
        starting_from: editing.starting_from,
        image_url: editing.image_url || undefined,
        trip_date: editing.trip_date || undefined,
        pushback_price: editing.pushback_price || undefined,
        sleeper_price: editing.sleeper_price || undefined,
        itinerary: editing.itinerary.map((day, i) => ({ 
          day: i + 1, 
          title: day.title || "", 
          desc: day.desc || "" 
        })),
        inclusions: editing.inclusions,
        exclusions: editing.exclusions,
        highlights: editing.highlights,
        is_active: editing.is_active,
        is_full: editing.is_full,
        // Send defaults for fields removed from UI but present in schema
        display_order: 0,
        subtitle: undefined,
        description: undefined,
        price_note: "per person",
        seats_left: 0,
        next_departure: undefined,
      });
      toast.success("Package saved!");
      setEditing(null);
    } catch (e: any) {
      console.error("Save error:", e);
      toast.error(e.message || "Server Error: Check if Slug is unique");
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

  // Helper to add item to a list field
  const addToList = (field: "inclusions" | "exclusions" | "highlights", value: string) => {
    if (!editing || !value.trim()) return;
    if (editing[field].includes(value.trim())) {
      toast.error("Already added!");
      return;
    }
    setEditing({ ...editing, [field]: [...editing[field], value.trim()] });
  };

  const removeFromList = (field: "inclusions" | "exclusions" | "highlights", idx: number) => {
    if (!editing) return;
    setEditing({ ...editing, [field]: editing[field].filter((_, i) => i !== idx) });
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages?.map((pkg) => (
          <div key={pkg._id} className="rounded-xl bg-card overflow-hidden shadow-card border border-border/50 group">
            <div className="relative h-32 w-full">
              {pkg.image_url ? (
                <img src={pkg.image_url} alt="" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400/f1f5f9/94a3b8?text=Image+Not+Found"; }} />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">No Image</div>
              )}
              <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${pkg.is_active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                  {pkg.is_active ? "Active" : "Hidden"}
                </div>
                {pkg.is_full && (
                  <div className="px-2 py-0.5 rounded border border-red-500/20 bg-red-600 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-lg animate-pulse">
                    House Full
                  </div>
                )}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-foreground line-clamp-1">{pkg.title}</h3>
              <p className="text-xs text-muted-foreground mb-1">{pkg.duration} · {pkg.price}</p>
              {/* Show inclusion/exclusion counts */}
              <div className="flex gap-2 text-[10px] text-muted-foreground mb-3">
                {pkg.inclusions && pkg.inclusions.length > 0 && (
                  <span className="bg-green-50 text-green-700 px-1.5 py-0.5 rounded font-medium">{pkg.inclusions.length} incl.</span>
                )}
                {pkg.exclusions && pkg.exclusions.length > 0 && (
                  <span className="bg-red-50 text-red-700 px-1.5 py-0.5 rounded font-medium">{pkg.exclusions.length} excl.</span>
                )}
              </div>
              <div className="flex gap-2 border-t border-border/50 pt-3">
                <button onClick={() => openEdit(pkg)} className="flex-1 flex justify-center items-center gap-1 text-xs rounded-lg bg-primary/10 text-primary py-2 hover:bg-primary/20 transition-colors">
                  <Edit2 className="h-3.5 w-3.5" /> Edit
                </button>
                <button onClick={() => handleDelete(pkg._id)} className="flex justify-center items-center w-10 text-xs rounded-lg bg-destructive/10 text-destructive py-2 hover:bg-destructive/20 transition-colors">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-card p-6 shadow-2xl border border-border/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">{editing.id ? "Edit Package" : "Add New Package"}</h3>
              <button onClick={() => setEditing(null)} className="rounded-full hover:bg-muted p-1"><X className="h-6 w-6 text-muted-foreground" /></button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Title *</label>
                  <input placeholder="Chardham Yatra 2024" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm ring-offset-background placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">URL Slug *</label>
                  <input placeholder="chardham-yatra-2024" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Duration *</label>
                  <input placeholder="11 Days / 10 Nights" value={editing.duration} onChange={(e) => setEditing({ ...editing, duration: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Package Price *</label>
                  <input placeholder="₹25,000" value={editing.price} onChange={(e) => setEditing({ ...editing, price: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Starting From *</label>
                  <input placeholder="Haridwar / Delhi" value={editing.starting_from} onChange={(e) => setEditing({ ...editing, starting_from: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Trip Date</label>
                  <input placeholder="12 May 2024" value={editing.trip_date} onChange={(e) => setEditing({ ...editing, trip_date: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Pushback Price</label>
                  <input placeholder="₹18,000" value={editing.pushback_price} onChange={(e) => setEditing({ ...editing, pushback_price: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Sleeper Price</label>
                  <input placeholder="₹22,000" value={editing.sleeper_price} onChange={(e) => setEditing({ ...editing, sleeper_price: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Package Image URL</label>
                <input placeholder="https://images.unsplash.com/..." value={editing.image_url} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
              </div>

              {/* ── Highlights ── */}
              <div className="space-y-3 rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex items-center justify-between border-b border-border pb-3 mb-1">
                  <label className="text-sm font-bold text-foreground">⭐ Highlights</label>
                </div>
                <div className="flex gap-2">
                  <input
                    placeholder="e.g. Visit Kedarnath Temple"
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addToList("highlights", newHighlight); setNewHighlight(""); } }}
                    className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary/10 outline-none font-medium"
                  />
                  <button type="button" onClick={() => { addToList("highlights", newHighlight); setNewHighlight(""); }} className="flex items-center gap-1 text-xs text-primary bg-primary/10 px-3 py-2 rounded-lg hover:bg-primary/20 font-bold">
                    <Plus className="h-4 w-4" /> Add
                  </button>
                </div>
                {editing.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {editing.highlights.map((h, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full text-xs font-medium group">
                        {h}
                        <button type="button" onClick={() => removeFromList("highlights", i)} className="opacity-50 hover:opacity-100 transition-opacity">
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Inclusions ── */}
              <div className="space-y-3 rounded-xl border border-green-200 bg-green-50/30 p-4">
                <div className="flex items-center justify-between border-b border-green-200 pb-3 mb-1">
                  <label className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" /> Inclusions (What's Included)
                  </label>
                </div>
                {/* Quick-add suggested inclusions */}
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_INCLUSIONS.filter(s => !editing.inclusions.includes(s)).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => addToList("inclusions", s)}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors font-medium border border-green-200/50"
                    >
                      + {s}
                    </button>
                  ))}
                </div>
                {/* Custom inclusion input */}
                <div className="flex gap-2">
                  <input
                    placeholder="Add custom inclusion..."
                    value={newInclusion}
                    onChange={(e) => setNewInclusion(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addToList("inclusions", newInclusion); setNewInclusion(""); } }}
                    className="flex-1 rounded-lg border border-green-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-green-500/20 outline-none font-medium"
                  />
                  <button type="button" onClick={() => { addToList("inclusions", newInclusion); setNewInclusion(""); }} className="flex items-center gap-1 text-xs text-green-700 bg-green-100 px-3 py-2 rounded-lg hover:bg-green-200 font-bold">
                    <Plus className="h-4 w-4" /> Add
                  </button>
                </div>
                {/* Listed inclusions */}
                {editing.inclusions.length > 0 && (
                  <div className="space-y-1.5">
                    {editing.inclusions.map((item, i) => (
                      <div key={i} className="flex items-center justify-between bg-white border border-green-100 rounded-lg px-3 py-2 group">
                        <span className="flex items-center gap-2 text-sm text-foreground">
                          <Check className="h-3.5 w-3.5 text-green-600 shrink-0" />
                          {item}
                        </span>
                        <button type="button" onClick={() => removeFromList("inclusions", i)} className="text-muted-foreground hover:text-destructive p-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Exclusions ── */}
              <div className="space-y-3 rounded-xl border border-red-200 bg-red-50/30 p-4">
                <div className="flex items-center justify-between border-b border-red-200 pb-3 mb-1">
                  <label className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Ban className="h-4 w-4 text-red-500" /> Exclusions (What's NOT Included)
                  </label>
                </div>
                {/* Quick-add suggested exclusions */}
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_EXCLUSIONS.filter(s => !editing.exclusions.includes(s)).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => addToList("exclusions", s)}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition-colors font-medium border border-red-200/50"
                    >
                      + {s}
                    </button>
                  ))}
                </div>
                {/* Custom exclusion input */}
                <div className="flex gap-2">
                  <input
                    placeholder="Add custom exclusion..."
                    value={newExclusion}
                    onChange={(e) => setNewExclusion(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addToList("exclusions", newExclusion); setNewExclusion(""); } }}
                    className="flex-1 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-red-500/20 outline-none font-medium"
                  />
                  <button type="button" onClick={() => { addToList("exclusions", newExclusion); setNewExclusion(""); }} className="flex items-center gap-1 text-xs text-red-700 bg-red-100 px-3 py-2 rounded-lg hover:bg-red-200 font-bold">
                    <Plus className="h-4 w-4" /> Add
                  </button>
                </div>
                {/* Listed exclusions */}
                {editing.exclusions.length > 0 && (
                  <div className="space-y-1.5">
                    {editing.exclusions.map((item, i) => (
                      <div key={i} className="flex items-center justify-between bg-white border border-red-100 rounded-lg px-3 py-2 group">
                        <span className="flex items-center gap-2 text-sm text-foreground">
                          <X className="h-3.5 w-3.5 text-red-500 shrink-0" />
                          {item}
                        </span>
                        <button type="button" onClick={() => removeFromList("exclusions", i)} className="text-muted-foreground hover:text-destructive p-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* ── Itinerary ── */}
              <div className="space-y-3 rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex items-center justify-between border-b border-border pb-3 mb-1">
                  <label className="text-sm font-bold text-foreground">📅 Itinerary Days</label>
                  <button 
                    type="button"
                    onClick={() => setEditing({ 
                      ...editing, 
                      itinerary: [...editing.itinerary, { day: editing.itinerary.length + 1, title: "", desc: "" }] 
                    })}
                    className="flex items-center gap-1 text-xs text-primary bg-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-all font-bold"
                  >
                    <Plus className="h-4 w-4" /> Add Day
                  </button>
                </div>
                {editing.itinerary.length === 0 && <p className="text-xs text-muted-foreground italic text-center py-4 bg-background/50 rounded-lg">No itinerary days added yet.</p>}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {editing.itinerary.map((day, idx) => (
                    <div key={idx} className="flex gap-4 items-start bg-card border border-border/50 p-4 rounded-xl shadow-sm relative group animate-in fade-in slide-in-from-top-2">
                       <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">{idx + 1}</div>
                       <div className="flex-1 space-y-3">
                          <input 
                            placeholder="Destination / Highlights" 
                            value={day.title} 
                            onChange={(e) => {
                              const newItin = [...editing.itinerary];
                              newItin[idx].title = e.target.value;
                              setEditing({ ...editing, itinerary: newItin });
                            }}
                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary/10 outline-none font-semibold transition-all"
                          />
                          <textarea 
                            placeholder="Briefly describe the day's events..." 
                            rows={2}
                            value={day.desc} 
                            onChange={(e) => {
                              const newItin = [...editing.itinerary];
                              newItin[idx].desc = e.target.value;
                              setEditing({ ...editing, itinerary: newItin });
                            }}
                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary/10 outline-none transition-all resize-none"
                          />
                       </div>
                       <button 
                         type="button"
                         onClick={() => {
                           const newItin = editing.itinerary.filter((_, i) => i !== idx).map((d, i) => ({ ...d, day: i + 1 }));
                           setEditing({ ...editing, itinerary: newItin });
                         }}
                         className="text-muted-foreground hover:text-destructive p-1 rounded-lg hover:bg-destructive/10 transition-colors"
                       >
                         <X className="h-5 w-5" />
                       </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${editing.is_active ? 'bg-primary border-primary' : 'bg-background border-input'}`}>
                      {editing.is_active && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <input type="checkbox" className="hidden" checked={editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} /> 
                    <span className="text-slate-600 group-hover:text-foreground">Visible on Website</span>
                  </label>

                  <label className="flex items-center gap-2 text-sm font-bold cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${editing.is_full ? 'bg-destructive border-destructive' : 'bg-background border-input'}`}>
                      {editing.is_full && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <input type="checkbox" className="hidden" checked={editing.is_full} onChange={(e) => setEditing({ ...editing, is_full: e.target.checked })} /> 
                    <span className="text-destructive">Mark as House Full</span>
                  </label>
                </div>
                
                <div className="flex gap-3">
                  <button onClick={() => setEditing(null)} className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-foreground hover:bg-muted rounded-xl transition-all">Cancel</button>
                  <button 
                    onClick={handleSave} 
                    disabled={upsert.isPending} 
                    className="rounded-xl bg-gradient-to-r from-primary to-maroon px-8 py-2.5 font-bold text-white shadow-lg shadow-red-500/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all"
                  >
                    {upsert.isPending ? "Saving..." : editing.id ? "Update Package" : "Create Package"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPackages;

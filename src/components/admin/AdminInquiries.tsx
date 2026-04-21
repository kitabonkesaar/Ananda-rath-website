import { useAdminInquiries, useUpdateInquiryStatus } from "@/hooks/useConvex";
import { useState } from "react";
import { Phone, Calendar, MapPin, Users, Search } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/data/config";

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  converted: "bg-green-100 text-green-800",
  lost: "bg-red-100 text-red-800",
};

const AdminInquiries = () => {
  const { data: inquiries, isLoading } = useAdminInquiries();
  const updateStatus = useUpdateInquiryStatus();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = inquiries?.filter((i) => {
    if (filter !== "all" && i.status !== filter) return false;
    if (search && !i.name.toLowerCase().includes(search.toLowerCase()) && !i.phone.includes(search)) return false;
    return true;
  });

  const counts = {
    all: inquiries?.length || 0,
    new: inquiries?.filter((i) => i.status === "new").length || 0,
    contacted: inquiries?.filter((i) => i.status === "contacted").length || 0,
    converted: inquiries?.filter((i) => i.status === "converted").length || 0,
    lost: inquiries?.filter((i) => i.status === "lost").length || 0,
  };

  if (isLoading) return <div className="text-center text-muted-foreground py-10">Loading inquiries...</div>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-foreground">Lead Inquiries ({counts.all})</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text" placeholder="Search by name or phone..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg border border-input bg-background pl-9 pr-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap gap-2">
        {(["all", "new", "contacted", "converted", "lost"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              filter === s ? "gradient-saffron text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)} ({counts[s]})
          </button>
        ))}
      </div>

      {/* List */}
      {!filtered?.length ? (
        <div className="text-center py-10 text-muted-foreground">No inquiries found.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((inq) => (
            <div key={inq._id} className="rounded-xl bg-card p-4 shadow-card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-foreground">{inq.name}</h3>
                  <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {inq.phone}</span>
                    {inq.travelers && <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {inq.travelers} travelers</span>}
                    {inq.preferred_date && <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {inq.preferred_date}</span>}
                    {inq.pickup_location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {inq.pickup_location}</span>}
                  </div>
                  {inq.package_name && <p className="mt-1 text-xs text-primary font-medium">{inq.package_name}</p>}
                  <p className="mt-1 text-xs text-muted-foreground">{new Date(inq.created_at).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={inq.status}
                    onChange={(e) => updateStatus.mutate({ id: inq._id, status: e.target.value })}
                    className={`rounded-full px-3 py-1 text-xs font-medium border-0 ${statusColors[inq.status]}`}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="converted">Converted</option>
                    <option value="lost">Lost</option>
                  </select>
                  <a
                    href={`https://wa.me/${inq.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hello ${inq.name}, thank you for your inquiry about ${inq.package_name || "our yatra packages"}. We'd love to help you!`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg gradient-saffron px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminInquiries;

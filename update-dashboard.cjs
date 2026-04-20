const fs = require('fs');

let content = fs.readFileSync('src/pages/AdminPage.tsx', 'utf8');

// 1. Update imports
content = content.replace(
  /import \{ AreaChart.* from "recharts";/,
  `import { useAdminInquiries, useAdminPackages, useAdminTestimonials, useAdminBlogPosts } from "@/hooks/useConvex";`
);

// 2. Remove dummy data
content = content.replace(/\/\/ Recharts Dummy Data[\s\S]*?\];/m, '');

// 3. Replace AdminDashboard
const dashboardRegex = /const AdminDashboard = \(\) => \{[\s\S]*?^};/m;
const newDashboard = `const AdminDashboard = () => {
  const { data: inquiries } = useAdminInquiries();
  const { data: packages } = useAdminPackages();
  const { data: testimonials } = useAdminTestimonials();
  const { data: blogs } = useAdminBlogPosts();

  const newLeads = inquiries?.filter(i => i.status === 'new').length || 0;
  const totalLeads = inquiries?.length || 0;
  const activePackages = packages?.filter(p => p.is_active).length || 0;
  const publishedBlogs = blogs?.filter(b => b.is_published).length || 0;

  const recentInquiries = inquiries ? [...inquiries].sort((a,b) => b.created_at - a.created_at).slice(0, 5) : [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Total Leads Card */}
        <div className="rounded-xl overflow-hidden shadow-sm bg-gradient-to-r from-gray-900 to-black text-white">
          <div className="p-5 flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold mb-1">{totalLeads}</h3>
              <p className="text-sm font-medium text-white/90">Total Inquiries</p>
            </div>
            <MessageSquare className="w-8 h-8 opacity-90 text-white" />
          </div>
          <div className="bg-black/20 px-5 py-2.5 flex items-center gap-2 text-xs font-medium text-white/90">
            <Activity className="w-3.5 h-3.5" />
            <span>All time leads</span>
          </div>
        </div>

        {/* New Leads Card */}
        <div className="rounded-xl overflow-hidden shadow-sm bg-gradient-to-r from-primary to-maroon text-white">
          <div className="p-5 flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold mb-1">{newLeads}</h3>
              <p className="text-sm font-medium text-white/90">New Leads</p>
            </div>
            <Bell className="w-8 h-8 opacity-90 text-white" />
          </div>
          <div className="bg-black/20 px-5 py-2.5 flex items-center gap-2 text-xs font-medium text-white/90">
            <Clock className="w-3.5 h-3.5" />
            <span>Awaiting Response</span>
          </div>
        </div>

        {/* Active Packages Card */}
        <div className="rounded-xl overflow-hidden shadow-sm bg-gradient-to-r from-gray-800 to-gray-700 text-white">
          <div className="p-5 flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold mb-1">{activePackages}</h3>
              <p className="text-sm font-medium text-white/90">Active Packages</p>
            </div>
            <Package className="w-8 h-8 opacity-90 text-white" />
          </div>
          <div className="bg-black/20 px-5 py-2.5 flex items-center gap-2 text-xs font-medium text-white/90">
            <Activity className="w-3.5 h-3.5" />
            <span>Currently shown on site</span>
          </div>
        </div>

        {/* Published Blogs Card */}
        <div className="rounded-xl overflow-hidden shadow-sm bg-gradient-to-r from-amber-600 to-orange-500 text-white">
          <div className="p-5 flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold mb-1">{publishedBlogs}</h3>
              <p className="text-sm font-medium text-white/90">Published Blogs</p>
            </div>
            <FileText className="w-8 h-8 opacity-90 text-white" />
          </div>
          <div className="bg-black/20 px-5 py-2.5 flex items-center gap-2 text-xs font-medium text-white/90">
            <Activity className="w-3.5 h-3.5" />
            <span>Active articles</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-700">Recent Inquiries</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-xs text-slate-500 font-bold bg-slate-50">
                  <th className="py-3 px-5">Name</th>
                  <th className="py-3 px-5">Phone</th>
                  <th className="py-3 px-5">Package Detail</th>
                  <th className="py-3 px-5">Date</th>
                  <th className="py-3 px-5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-600">
                {recentInquiries.length === 0 ? (
                  <tr><td colSpan={5} className="py-8 text-center text-slate-400">No recent inquiries found</td></tr>
                ) : (
                  recentInquiries.map((inq, i) => (
                    <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50">
                      <td className="py-4 px-5 font-semibold text-slate-700">{inq.name}</td>
                      <td className="py-4 px-5">{inq.phone}</td>
                      <td className="py-4 px-5 text-slate-500">{inq.package_name || 'General Inquiry'}</td>
                      <td className="py-4 px-5">{new Date(inq.created_at).toLocaleDateString()}</td>
                      <td className="py-4 px-5 text-right">
                        <span className={"px-2 py-1 rounded text-xs font-bold uppercase tracking-wider " + (inq.status === 'new' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-500')}>
                          {inq.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};`;

content = content.replace(dashboardRegex, newDashboard);
fs.writeFileSync('src/pages/AdminPage.tsx', content);

"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { 
  LogOut, Package, Users, MessageSquare, Image as ImageIcon, 
  LayoutDashboard, Youtube, Info, Search, Bell, Menu,
  Clock, Activity, Maximize, Home, ChevronRight, FileText,
  Eye, EyeOff
} from "lucide-react";
import { useAdminInquiries, useAdminPackages, useAdminTestimonials, useAdminBlogPosts } from "@/hooks/useConvex";
import AdminPackages from "@/components/admin/AdminPackages";
import AdminInquiries from "@/components/admin/AdminInquiries";
import AdminTestimonials from "@/components/admin/AdminTestimonials";
import AdminGallery from "@/components/admin/AdminGallery";
import AdminVideoTestimonials from "@/components/admin/AdminVideoTestimonials";
import AdminHeroConfig from "@/components/admin/AdminHeroConfig";
import AdminBlog from "@/components/admin/AdminBlog";

// Demo credentials — use NEXT_PUBLIC_ADMIN_EMAIL / NEXT_PUBLIC_ADMIN_PASSWORD in .env.local
const DEMO_EMAIL =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_ADMIN_EMAIL) ||
  "admin@anandarath.com";
const DEMO_PASSWORD =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_ADMIN_PASSWORD) ||
  "admin123";

const navGroups = [
  {
    title: "Navigation",
    items: [
      { id: "dashboard", label: "Dashboard", icon: Home },
    ]
  },
  {
    title: "Management",
    items: [
      { id: "leads", label: "Leads", icon: MessageSquare },
      { id: "packages", label: "Packages", icon: Package },
      { id: "gallery", label: "Gallery", icon: ImageIcon },
    ]
  },
  {
    title: "Content",
    items: [
      { id: "hero-config", label: "Hero Settings", icon: LayoutDashboard },
      { id: "blog", label: "Blog Posts", icon: FileText },
      { id: "testimonials", label: "Testimonials", icon: Users },
      { id: "video-testimonials", label: "Video Reviews", icon: Youtube },
    ]
  }
];

const AdminDashboard = () => {
  const { data: inquiries } = useAdminInquiries();
  const { data: packages } = useAdminPackages();
  const { data: testimonials } = useAdminTestimonials();
  const { data: blogPosts } = useAdminBlogPosts();

  const newLeads = inquiries?.filter(i => i.status === 'new').length || 0;
  const totalLeads = inquiries?.length || 0;
  const activePackages = packages?.filter(p => p.is_active).length || 0;
  const publishedBlogs = blogPosts?.filter(b => b.is_published).length || 0;

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
};

const AdminPage = () => {
  const { session, isAdmin, loading, signOut, signIn } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [signingIn, setSigningIn] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isDemoLoggedIn = demoMode;
  const isLoggedIn = !!session || isDemoLoggedIn;
  const isAdminUser = isAdmin || isDemoLoggedIn;
  const userEmail = session?.user?.email || (isDemoLoggedIn ? DEMO_EMAIL : "");

  const handleSignOut = async () => {
    if (isDemoLoggedIn) {
      setDemoMode(false);
      return;
    }
    await signOut();
  };

  if (loading && !isDemoLoggedIn) {
    return <div className="flex min-h-screen items-center justify-center bg-[#f8f8f8]"><p className="text-slate-500 font-medium">Loading Workspace...</p></div>;
  }

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f8f8]">
        <div className="w-full max-w-md rounded-[20px] bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] text-center border border-slate-100">
          <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-tr from-[#ca291c] to-[#ef4444] rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/20">
             <LayoutDashboard className="h-8 w-8 text-white" />
          </div>
          <h1 className="mb-2 text-[#000000] text-2xl font-bold font-sans">Welcome to admin<span className="text-[#ca291c]">ty</span></h1>
          <p className="mb-8 text-sm text-slate-500">Sign in to access your administrative workspace</p>

          <form 
            onSubmit={async (e) => {
              e.preventDefault();
              const email = (e.currentTarget as any).email.value;
              const password = (e.currentTarget as any).password.value;

              if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
                setDemoMode(true);
                return;
              }

              setSigningIn(true);
              const { error } = await signIn(email, password);
              if (error) {
                alert(error.message);
                setSigningIn(false);
              }
            }}
            className="flex flex-col gap-5 text-left"
          >
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</p>
              <input 
                name="email" 
                type="email" 
                required 
                autoComplete="username"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-[#ca291c]/50 focus:bg-white focus:border-[#ca291c]"
                placeholder="Enter admin email"
              />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Password</p>
              <div className="relative">
                <input 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  required 
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-sm text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-[#ca291c]/50 focus:bg-white focus:border-[#ca291c]"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={signingIn}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ca291c] to-[#ef4444] px-5 py-3.5 font-bold text-white shadow-lg shadow-red-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {signingIn ? "Authenticating..." : "Sign in to Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!isAdminUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f8f8]">
        <div className="w-full max-w-md rounded-[20px] bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] text-center border border-slate-100">
          <div className="mx-auto mb-6 w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center">
             <Info className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-slate-800">Access Denied</h1>
          <p className="mb-6 text-sm text-slate-500 text-balance">
            Your account ({userEmail}) does not have the necessary privileges to access the admin panel.
          </p>
          <button onClick={handleSignOut} className="text-sm font-semibold text-[#ca291c] hover:underline">Return to Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f8f8f8] font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[260px] bg-[#0f0f0f] transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none
        lg:static lg:translate-x-0 flex flex-col h-full
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 bg-[#000000] shrink-0 gap-3 border-b border-black/10">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10 text-white font-bold" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
            <span className="text-lg">a</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">admin<span className="font-light">ty</span></span>
        </div>

        {/* User Card Mini */}
        <div className="px-6 py-5 flex items-center gap-4 bg-[#0f0f0f] border-b border-white/5">
           <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-10 h-10 rounded-lg shadow-sm" />
           <div>
             <p className="text-sm font-semibold text-white">Admin</p>
             <p className="text-[11px] text-[#ca291c] font-medium flex items-center gap-1 mt-0.5">
               <span className="w-1.5 h-1.5 rounded-full bg-[#ca291c]"></span> Online
             </p>
           </div>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          {navGroups.map((group, idx) => (
            <div key={idx} className="mb-6">
              <h4 className="px-6 mb-3 text-[11px] font-bold uppercase tracking-widest text-[#888888]">
                {group.title}
              </h4>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-4 px-6 py-3 text-sm transition-all relative group
                        ${isActive ? "text-[#ca291c] bg-black/10 font-bold" : "text-[#aaaaaa] hover:text-white hover:bg-white/5 font-medium"}
                      `}
                    >
                       <item.icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? "text-[#ca291c]" : "text-[#888888] group-hover:text-white"}`} />
                       <span>{item.label}</span>
                       <ChevronRight className={`absolute right-4 w-4 h-4 opacity-0 transition-all ${isActive ? "opacity-100 text-[#ca291c] translate-x-0" : "-translate-x-2 group-hover:opacity-40"}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f8f8f8] h-full">
        {/* Top Header */}
        <header className="h-16 bg-white flex items-center justify-between px-4 lg:px-6 shrink-0 relative z-30 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-2 lg:gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation menu"
              className="p-2.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600 rounded-lg lg:hidden transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <button className="p-2.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600 rounded-lg hidden lg:block transition-colors">
              <Maximize className="w-4 h-4" />
            </button>

            <div className="hidden md:flex items-center gap-3 ml-2 pl-4 border-l border-slate-100 text-slate-400">
              <Search className="w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search or enter website name..."
                className="bg-transparent border-none focus:outline-none focus:ring-0 text-[13px] text-slate-600 w-56 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-5">
            <div className="flex items-center gap-1 sm:gap-2">
              <button className="p-2 text-slate-400 hover:text-[#ca291c] rounded-lg relative transition-colors">
                 <Bell className="w-[18px] h-[18px]" />
                 <span className="absolute top-[6px] right-[6px] w-[6px] h-[6px] bg-[#171717] rounded-full border border-white"></span>
              </button>
              <button className="p-2 text-slate-400 hover:text-[#ca291c] rounded-lg relative hidden sm:block transition-colors">
                 <MessageSquare className="w-[18px] h-[18px]" />
              </button>
            </div>
            
            <div className="flex items-center gap-3 pl-3 sm:pl-5 border-l border-slate-100">
              <div className="hidden sm:block text-right">
                <p className="text-[13px] font-bold text-slate-700 leading-tight">Admin</p>
                <p className="text-[11px] text-slate-400 font-medium">{userEmail}</p>
              </div>
              <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-9 h-9 rounded-lg shadow-sm" />
              <button onClick={handleSignOut} className="p-2 text-slate-300 hover:text-[#171717] rounded-lg ml-1 transition-colors" title="Sign out">
                <LogOut className="w-[18px] h-[18px]" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 pb-20 relative z-10 w-full" style={{ scrollbarWidth: 'thin' }}>
          {activeTab === "dashboard" && <AdminDashboard />}
          
          <div className={`${activeTab === "dashboard" ? "hidden" : "block"} max-w-[1200px] mx-auto`}>
            {activeTab === "leads" && <AdminInquiries />}
            {activeTab === "packages" && <AdminPackages />}
            {activeTab === "gallery" && <AdminGallery />}
            {activeTab === "hero-config" && <AdminHeroConfig />}
            {activeTab === "blog" && <AdminBlog />}
            {activeTab === "testimonials" && <AdminTestimonials />}
            {activeTab === "video-testimonials" && <AdminVideoTestimonials />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;

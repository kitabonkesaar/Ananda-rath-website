import { useState } from "react";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { LogOut, Package, Users, MessageSquare, Image, LayoutDashboard } from "lucide-react";
import AdminPackages from "@/components/admin/AdminPackages";
import AdminInquiries from "@/components/admin/AdminInquiries";
import AdminTestimonials from "@/components/admin/AdminTestimonials";
import AdminGallery from "@/components/admin/AdminGallery";

const tabs = [
  { id: "inquiries", label: "Inquiries", icon: MessageSquare },
  { id: "packages", label: "Packages", icon: Package },
  { id: "testimonials", label: "Testimonials", icon: Users },
  { id: "gallery", label: "Gallery", icon: Image },
];

const AdminPage = () => {
  const { session, isAdmin, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("inquiries");
  const [signingIn, setSigningIn] = useState(false);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-background"><p className="text-muted-foreground">Loading...</p></div>;
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-card text-center">
          <LayoutDashboard className="mx-auto mb-4 h-12 w-12 text-primary" />
          <h1 className="mb-2 text-2xl font-bold text-foreground">Admin Panel</h1>
          <p className="mb-6 text-sm text-muted-foreground">Sign in with Google to access the admin dashboard</p>
          <button
            onClick={async () => {
              setSigningIn(true);
              const result = await lovable.auth.signInWithOAuth("google", {
                redirect_uri: window.location.origin + "/admin",
              });
              if (result.error) {
                setSigningIn(false);
              }
            }}
            disabled={signingIn}
            className="flex w-full items-center justify-center gap-2 rounded-lg gradient-saffron px-5 py-3 font-semibold text-primary-foreground shadow-saffron transition-all hover:scale-[1.02] disabled:opacity-50"
          >
            {signingIn ? "Signing in..." : "Sign in with Google"}
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-card text-center">
          <h1 className="mb-2 text-2xl font-bold text-foreground">Access Denied</h1>
          <p className="mb-4 text-sm text-muted-foreground">
            Your account ({session.user.email}) does not have admin access.
          </p>
          <button onClick={signOut} className="text-sm text-primary underline">Sign Out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-lg">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-bold text-foreground">AnandaRath Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground hidden sm:block">{session.user.email}</span>
            <button onClick={signOut} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-border bg-card">
        <div className="container flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container py-6">
        {activeTab === "inquiries" && <AdminInquiries />}
        {activeTab === "packages" && <AdminPackages />}
        {activeTab === "testimonials" && <AdminTestimonials />}
        {activeTab === "gallery" && <AdminGallery />}
      </div>
    </div>
  );
};

export default AdminPage;

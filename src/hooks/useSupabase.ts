import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Packages
export const usePackages = () =>
  useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data;
    },
  });

export const usePackageBySlug = (slug: string) =>
  useQuery({
    queryKey: ["package", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .eq("slug", slug)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

// Testimonials
export const useTestimonials = () =>
  useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data;
    },
  });

// Gallery
export const useGalleryPhotos = (packageId?: string) =>
  useQuery({
    queryKey: ["gallery", packageId],
    queryFn: async () => {
      let q = supabase.from("gallery_photos").select("*").order("display_order");
      if (packageId) q = q.eq("package_id", packageId);
      const { data, error } = await q;
      if (error) throw error;
      return data;
    },
  });

// Inquiries (submit)
export const useSubmitInquiry = () => {
  return useMutation({
    mutationFn: async (inquiry: {
      name: string;
      phone: string;
      travelers?: string;
      preferred_date?: string;
      pickup_location?: string;
      package_name?: string;
      package_id?: string;
    }) => {
      const { error } = await supabase.from("inquiries").insert(inquiry);
      if (error) throw error;
    },
  });
};

// Admin: All inquiries
export const useAdminInquiries = () =>
  useQuery({
    queryKey: ["admin-inquiries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

// Admin: Update inquiry status
export const useUpdateInquiryStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status, notes }: { id: string; status: string; notes?: string }) => {
      const { error } = await supabase
        .from("inquiries")
        .update({ status, notes })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-inquiries"] }),
  });
};

// Admin: CRUD packages
export const useAdminPackages = () =>
  useQuery({
    queryKey: ["admin-packages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data;
    },
  });

export const useUpsertPackage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (pkg: Record<string, unknown>) => {
      const { error } = await supabase.from("packages").upsert(pkg as any);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-packages"] }),
  });
};

export const useDeletePackage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("packages").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-packages"] }),
  });
};

// Admin: CRUD testimonials
export const useAdminTestimonials = () =>
  useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data;
    },
  });

export const useUpsertTestimonial = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (t: Record<string, unknown>) => {
      const { error } = await supabase.from("testimonials").upsert(t as any);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-testimonials"] }),
  });
};

export const useDeleteTestimonial = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-testimonials"] }),
  });
};

// Admin: CRUD gallery
export const useAdminGallery = () =>
  useQuery({
    queryKey: ["admin-gallery"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_photos")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data;
    },
  });

export const useUpsertGalleryPhoto = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (p: Record<string, unknown>) => {
      const { error } = await supabase.from("gallery_photos").upsert(p as any);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-gallery"] }),
  });
};

export const useDeleteGalleryPhoto = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("gallery_photos").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-gallery"] }),
  });
};

// Upload image to storage
export const uploadImage = async (file: File, folder: string = "photos") => {
  const ext = file.name.split(".").pop();
  const name = `${folder}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from("gallery").upload(name, file);
  if (error) throw error;
  const { data } = supabase.storage.from("gallery").getPublicUrl(name);
  return data.publicUrl;
};

// Auth helpers
export const useAdminCheck = () =>
  useQuery({
    queryKey: ["admin-check"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      return !!data;
    },
  });

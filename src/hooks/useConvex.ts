import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

// ─── uploadImage (base64 fallback — swap for Convex File Storage if needed) ──
export async function uploadImage(file: File, _bucket: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

// ─── Helper: strip null/undefined from an object ─────────────────────────────
function cleanObject(obj: Record<string, any>): Record<string, any> {
  const out: Record<string, any> = {};
  Object.entries(obj).forEach(([k, v]) => {
    if (v !== undefined && v !== null) out[k] = v;
  });
  return out;
}

// ═══════════════════════════════════════════════════════════════════════════════
// PACKAGES
// ═══════════════════════════════════════════════════════════════════════════════

export const usePackages = () => {
  const data = useQuery(api.packages.getPackages);
  return { data, isLoading: data === undefined };
};

export const usePackageBySlug = (slug: string) => {
  const data = useQuery(api.packages.getPackageBySlug, slug ? { slug } : "skip");
  return { data, isLoading: data === undefined, error: null };
};

export const useAdminPackages = () => {
  const data = useQuery(api.packages.getPackages);
  return { data, isLoading: data === undefined };
};

export const useUpsertPackage = () => {
  const upsert = useMutation(api.packages.upsertPackage);
  const mutateAsync = async (packageData: any) => {
    const { id, ...pkg } = packageData;
    return await upsert({ id: id || undefined, package: cleanObject(pkg) as any });
  };
  return { mutateAsync, isPending: false };
};

export const useDeletePackage = () => {
  const del = useMutation(api.packages.deletePackage);
  const mutateAsync = async (id: string) => del({ id: id as any });
  return { mutateAsync };
};

// ═══════════════════════════════════════════════════════════════════════════════
// INQUIRIES
// ═══════════════════════════════════════════════════════════════════════════════

export const useSubmitInquiry = () => {
  const submit = useMutation(api.inquiries.submitInquiry);
  const [isPending, setIsPending] = [false, () => {}];
  const mutateAsync = async (inquiry: any) => submit(inquiry);
  return { mutateAsync, isPending: false };
};

export const useAdminInquiries = () => {
  const data = useQuery(api.inquiries.getInquiries);
  return { data, isLoading: data === undefined };
};

export const useUpdateInquiryStatus = () => {
  const update = useMutation(api.inquiries.updateInquiryStatus);
  const mutateAsync = async (args: any) => update(args);
  return {
    mutateAsync,
    mutate: (args: any) => { update(args).catch(console.error); },
  };
};

export const useDeleteInquiry = () => {
  const del = useMutation(api.inquiries.deleteInquiry);
  const mutateAsync = async (id: string) => del({ id: id as any });
  return { mutateAsync };
};

// ═══════════════════════════════════════════════════════════════════════════════
// TESTIMONIALS (text)
// ═══════════════════════════════════════════════════════════════════════════════

export const useTestimonials = () => {
  const data = useQuery(api.testimonials.getTestimonials);
  return { data, isLoading: data === undefined };
};

export const useAdminTestimonials = () => {
  const data = useQuery(api.testimonials.getTestimonials);
  return { data, isLoading: data === undefined };
};

export const useUpsertTestimonial = () => {
  const upsert = useMutation(api.testimonials.upsertTestimonial);
  const mutateAsync = async (testimonialData: any) => {
    const { id, ...testimonial } = testimonialData;
    return await upsert({ id: id || undefined, testimonial: cleanObject(testimonial) as any });
  };
  return { mutateAsync, isPending: false };
};

export const useDeleteTestimonial = () => {
  const del = useMutation(api.testimonials.deleteTestimonial);
  const mutateAsync = async (id: string) => del({ id: id as any });
  return { mutateAsync };
};

// ═══════════════════════════════════════════════════════════════════════════════
// VIDEO TESTIMONIALS
// ═══════════════════════════════════════════════════════════════════════════════

export const useVideoTestimonialsConvex = () => {
  const data = useQuery(api.videoTestimonials.getVideoTestimonials);
  return { data, isLoading: data === undefined };
};

export const useUpsertVideoTestimonial = () => {
  const upsert = useMutation(api.videoTestimonials.upsertVideoTestimonial);
  const mutateAsync = async (videoData: any) => {
    const { id, created_at, ...video } = videoData;
    return await upsert({ id: id || undefined, video: cleanObject(video) as any });
  };
  return { mutateAsync, isPending: false };
};

export const useDeleteVideoTestimonial = () => {
  const del = useMutation(api.videoTestimonials.deleteVideoTestimonial);
  const mutateAsync = async (id: string) => del({ id: id as any });
  return { mutateAsync };
};

// ═══════════════════════════════════════════════════════════════════════════════
// GALLERY
// ═══════════════════════════════════════════════════════════════════════════════

export const useGalleryPhotos = (packageId?: string) => {
  const data = useQuery(api.gallery.getGalleryPhotos, { packageId });
  return { data, isLoading: data === undefined };
};

export const useAdminGallery = () => {
  const data = useQuery(api.gallery.getGalleryPhotos, {});
  return { data, isLoading: data === undefined };
};

export const useUpsertGalleryPhoto = () => {
  const upsert = useMutation(api.gallery.upsertGalleryPhoto);
  const mutateAsync = async (photoData: any) => {
    const { id, ...photo } = photoData;
    return await upsert({ id: id || undefined, photo: cleanObject(photo) as any });
  };
  return { mutateAsync, isPending: false };
};

export const useDeleteGalleryPhoto = () => {
  const del = useMutation(api.gallery.deleteGalleryPhoto);
  const mutateAsync = async (id: string) => del({ id: id as any });
  return { mutateAsync };
};

// ═══════════════════════════════════════════════════════════════════════════════
// BLOG POSTS
// ═══════════════════════════════════════════════════════════════════════════════

export const useAdminBlogPosts = () => {
  const data = useQuery(api.blog.getBlogPosts);
  return { data, isLoading: data === undefined };
};

export const usePublishedBlogPosts = () => {
  const data = useQuery(api.blog.getPublishedBlogPosts);
  return { data, isLoading: data === undefined };
};

export const useBlogPostBySlug = (slug: string) => {
  const data = useQuery(api.blog.getBlogPostBySlug, slug ? { slug } : "skip");
  return { data, isLoading: data === undefined };
};

export const useUpsertBlogPost = () => {
  const upsert = useMutation(api.blog.upsertBlogPost);
  const mutateAsync = async (postData: any) => {
    const { id, created_at, ...post } = postData;
    return await upsert({ id: id || undefined, post: cleanObject(post) as any });
  };
  return { mutateAsync, isPending: false };
};

export const useDeleteBlogPost = () => {
  const del = useMutation(api.blog.deleteBlogPost);
  const mutateAsync = async (id: string) => del({ id: id as any });
  return { mutateAsync };
};

// ═══════════════════════════════════════════════════════════════════════════════
// HERO CONFIG
// ═══════════════════════════════════════════════════════════════════════════════

export const useHeroConfig = () => {
  const data = useQuery(api.heroConfig.getHeroConfig);
  return { data, isLoading: data === undefined };
};

export const useUpdateHeroConfig = () => {
  const update = useMutation(api.heroConfig.updateHeroConfig);
  const mutateAsync = async (args: { id?: any; config: { timer_title: string; target_date: string; form_title: string } }) => {
    return await update({ id: args.id || undefined, config: args.config });
  };
  return { mutateAsync, isPending: false };
};

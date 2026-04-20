import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ── Get gallery photos (optionally filtered by package) ────────────────────
export const getGalleryPhotos = query({
  args: { packageId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let photos = await ctx.db
      .query("gallery_photos")
      .withIndex("by_display_order")
      .order("asc")
      .collect();
    if (args.packageId) {
      photos = photos.filter((p) => p.package_id === args.packageId);
    }
    return photos;
  },
});

// ── Create or update a gallery photo ──────────────────────────────────────
export const upsertGalleryPhoto = mutation({
  args: {
    id: v.optional(v.id("gallery_photos")),
    photo: v.object({
      image_url: v.string(),
      caption: v.optional(v.string()),
      package_id: v.optional(v.string()),
      display_order: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    if (args.id) {
      await ctx.db.patch(args.id, args.photo);
      return args.id;
    } else {
      return await ctx.db.insert("gallery_photos", args.photo);
    }
  },
});

// ── Delete a gallery photo ─────────────────────────────────────────────────
export const deleteGalleryPhoto = mutation({
  args: { id: v.id("gallery_photos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

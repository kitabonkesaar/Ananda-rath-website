import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ── Get all video testimonials (sorted by display_order) ───────────────────
export const getVideoTestimonials = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("video_testimonials")
      .withIndex("by_display_order")
      .order("asc")
      .collect();
  },
});

// ── Create or update a video testimonial ───────────────────────────────────
export const upsertVideoTestimonial = mutation({
  args: {
    id: v.optional(v.id("video_testimonials")),
    video: v.object({
      youtube_url: v.string(),
      customer_name: v.string(),
      location: v.optional(v.string()),
      title: v.optional(v.string()),
      display_order: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    if (args.id) {
      await ctx.db.patch(args.id, args.video);
      return args.id;
    } else {
      return await ctx.db.insert("video_testimonials", {
        ...args.video,
        created_at: Date.now(),
      });
    }
  },
});

// ── Delete a video testimonial ─────────────────────────────────────────────
export const deleteVideoTestimonial = mutation({
  args: { id: v.id("video_testimonials") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

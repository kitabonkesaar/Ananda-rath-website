import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ── Get all testimonials (sorted by display_order) ─────────────────────────
export const getTestimonials = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("testimonials")
      .withIndex("by_display_order")
      .order("asc")
      .collect();
  },
});

// ── Create or update a testimonial ────────────────────────────────────────
export const upsertTestimonial = mutation({
  args: {
    id: v.optional(v.id("testimonials")),
    testimonial: v.object({
      name: v.string(),
      location: v.string(),
      rating: v.number(),
      text: v.string(),
      photo_url: v.optional(v.string()),
      display_order: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    if (args.id) {
      await ctx.db.patch(args.id, args.testimonial);
      return args.id;
    } else {
      return await ctx.db.insert("testimonials", args.testimonial);
    }
  },
});

// ── Delete a testimonial ───────────────────────────────────────────────────
export const deleteTestimonial = mutation({
  args: { id: v.id("testimonials") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

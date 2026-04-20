import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ── List all packages (sorted by display_order) ────────────────────────────
export const getPackages = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("packages")
      .withIndex("by_display_order")
      .order("asc")
      .collect();
  },
});

// ── Get a single package by slug ───────────────────────────────────────────
export const getPackageBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("packages")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

// ── Create or update a package ─────────────────────────────────────────────
export const upsertPackage = mutation({
  args: {
    id: v.optional(v.id("packages")),
    package: v.object({
      slug: v.string(),
      title: v.string(),
      subtitle: v.optional(v.string()),
      description: v.optional(v.string()),
      duration: v.string(),
      price: v.string(),
      price_note: v.optional(v.string()),
      starting_from: v.string(),
      image_url: v.optional(v.string()),
      seats_left: v.optional(v.number()),
      next_departure: v.optional(v.string()),
      trip_date: v.optional(v.string()),
      pushback_price: v.optional(v.string()),
      sleeper_price: v.optional(v.string()),
      highlights: v.optional(v.array(v.string())),
      inclusions: v.optional(v.array(v.string())),
      exclusions: v.optional(v.array(v.string())),
      itinerary: v.optional(v.any()),
      is_active: v.boolean(),
      is_full: v.optional(v.boolean()),
      display_order: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    if (args.id) {
      await ctx.db.patch(args.id, args.package);
      return args.id;
    } else {
      return await ctx.db.insert("packages", args.package);
    }
  },
});

// ── Delete a package ───────────────────────────────────────────────────────
export const deletePackage = mutation({
  args: { id: v.id("packages") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ── Get the hero config (returns defaults if no row exists) ────────────────
export const getHeroConfig = query({
  args: {},
  handler: async (ctx) => {
    const configs = await ctx.db.query("hero_config").collect();
    if (configs.length > 0) return configs[0];

    // Fallback defaults when DB is empty
    return {
      _id: "default" as any,
      _creationTime: 0,
      timer_title: "NEXT YATRA DEPARTING IN",
      target_date: "",
      form_title: "Book Your Seat Now",
    };
  },
});

// ── Create or update the hero config (singleton upsert) ───────────────────
export const updateHeroConfig = mutation({
  args: {
    id: v.optional(v.id("hero_config")),
    config: v.object({
      timer_title: v.string(),
      target_date: v.string(),
      form_title: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    // If a valid DB ID was passed, patch it directly
    if (args.id) {
      await ctx.db.patch(args.id, args.config);
      return args.id;
    }

    // Otherwise find existing row and patch, or insert new
    const existing = await ctx.db.query("hero_config").first();
    if (existing) {
      await ctx.db.patch(existing._id, args.config);
      return existing._id;
    } else {
      return await ctx.db.insert("hero_config", args.config);
    }
  },
});

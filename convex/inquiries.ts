import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ── Get all inquiries (newest first) ──────────────────────────────────────
export const getInquiries = query({
  args: {},
  handler: async (ctx) => {
    const inquiries = await ctx.db.query("inquiries").collect();
    return inquiries.sort((a, b) => b.created_at - a.created_at);
  },
});

// ── Submit a new inquiry ───────────────────────────────────────────────────
export const submitInquiry = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
    travelers: v.optional(v.string()),
    preferred_date: v.optional(v.string()),
    pickup_location: v.optional(v.string()),
    package_name: v.optional(v.string()),
    package_id: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("inquiries", {
      ...args,
      status: "new",
      created_at: Date.now(),
    });
  },
});

// ── Update inquiry status / notes ──────────────────────────────────────────
export const updateInquiryStatus = mutation({
  args: {
    id: v.id("inquiries"),
    status: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      ...(args.notes !== undefined ? { notes: args.notes } : {}),
    });
  },
});

// ── Delete an inquiry ──────────────────────────────────────────────────────
export const deleteInquiry = mutation({
  args: { id: v.id("inquiries") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

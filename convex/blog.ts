import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ── Get all blog posts (published first, then draft) ───────────────────────
export const getBlogPosts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("blog_posts").collect();
    return posts.sort((a, b) => b.created_at - a.created_at);
  },
});

// ── Get published blog posts only ─────────────────────────────────────────
export const getPublishedBlogPosts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("blog_posts")
      .withIndex("by_published", (q) => q.eq("is_published", true))
      .collect();
  },
});

// ── Get a single blog post by slug ─────────────────────────────────────────
export const getBlogPostBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("blog_posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

// ── Create or update a blog post ───────────────────────────────────────────
export const upsertBlogPost = mutation({
  args: {
    id: v.optional(v.id("blog_posts")),
    post: v.object({
      title: v.string(),
      slug: v.string(),
      excerpt: v.string(),
      content: v.string(),
      cover_image: v.optional(v.string()),
      author: v.string(),
      category: v.string(),
      published_at: v.string(),
      is_published: v.boolean(),
    }),
  },
  handler: async (ctx, args) => {
    if (args.id) {
      await ctx.db.patch(args.id, args.post);
      return args.id;
    } else {
      return await ctx.db.insert("blog_posts", {
        ...args.post,
        created_at: Date.now(),
      });
    }
  },
});

// ── Delete a blog post ─────────────────────────────────────────────────────
export const deleteBlogPost = mutation({
  args: { id: v.id("blog_posts") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

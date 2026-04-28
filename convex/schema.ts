import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // ── Packages ──────────────────────────────────────────────────────────────
  packages: defineTable({
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
  })
    .index("by_slug", ["slug"])
    .index("by_display_order", ["display_order"]),

  // ── Inquiries / Leads ──────────────────────────────────────────────────────
  inquiries: defineTable({
    name: v.string(),
    phone: v.string(),
    travelers: v.optional(v.string()),
    preferred_date: v.optional(v.string()),
    pickup_location: v.optional(v.string()),
    package_name: v.optional(v.string()),
    package_id: v.optional(v.string()),
    status: v.string(),           // "new" | "contacted" | "booked" | "cancelled"
    notes: v.optional(v.string()),
    created_at: v.number(),       // Unix ms timestamp
  }).index("by_status", ["status"]),

  // ── Text Testimonials ──────────────────────────────────────────────────────
  testimonials: defineTable({
    name: v.string(),
    location: v.string(),
    rating: v.number(),           // 1-5
    text: v.string(),
    photo_url: v.optional(v.string()),
    display_order: v.number(),
  }).index("by_display_order", ["display_order"]),

  // ── Video Testimonials ─────────────────────────────────────────────────────
  video_testimonials: defineTable({
    youtube_url: v.optional(v.string()),
    instagram_reel_url: v.optional(v.string()),  // Instagram Reels link
    customer_name: v.string(),
    location: v.optional(v.string()),
    title: v.optional(v.string()),
    display_order: v.number(),
    created_at: v.number(),       // Unix ms timestamp
  }).index("by_display_order", ["display_order"]),

  // ── Gallery Photos ─────────────────────────────────────────────────────────
  gallery_photos: defineTable({
    image_url: v.string(),
    caption: v.optional(v.string()),
    package_id: v.optional(v.string()),
    display_order: v.number(),
  }).index("by_display_order", ["display_order"]),

  // ── Blog Posts ─────────────────────────────────────────────────────────────
  blog_posts: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    cover_image: v.optional(v.string()),  // renamed from coverImage for consistency
    author: v.string(),
    category: v.string(),
    published_at: v.string(),             // ISO date string e.g. "2026-04-01"
    is_published: v.boolean(),
    created_at: v.number(),               // Unix ms timestamp
  })
    .index("by_slug", ["slug"])
    .index("by_published", ["is_published"]),

  // ── Hero Config (singleton) ────────────────────────────────────────────────
  hero_config: defineTable({
    timer_title: v.string(),              // e.g. "NEXT YATRA DEPARTING IN"
    target_date: v.string(),              // ISO date or empty string
    form_title: v.string(),              // e.g. "Book Your Seat Now"
  }),
});

import { internalMutation } from "./_generated/server";

export default internalMutation({
  args: {},
  handler: async (ctx) => {
    // 1. Seed Packages
    const packages = await ctx.db.query("packages").collect();
    if (packages.length === 0) {
      await ctx.db.insert("packages", {
        slug: "char-dham-yatra-odisha",
        title: "Char Dham Yatra from Odisha",
        subtitle: "A sacred journey to Badrinath, Kedarnath, Gangotri, and Yamunotri",
        description: "Experience the ultimate spiritual journey from Odisha to the majestic Char Dham in the Himalayas with total comfort.",
        duration: "14 Days / 13 Nights",
        price: "45,000",
        price_note: "per person",
        starting_from: "Bhubaneswar",
        image_url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
        seats_left: 12,
        next_departure: "2026-05-15T00:00:00Z",
        trip_date: "May 15, 2026",
        pushback_price: "47,000",
        sleeper_price: "50,000",
        highlights: ["Guided Darshan", "Odia Meals", "Comfortable Transport"],
        is_active: true,
        display_order: 1,
      });

      await ctx.db.insert("packages", {
        slug: "kedarnath-yatra-odisha",
        title: "Kedarnath Special Yatra",
        subtitle: "Direct journey from Bhubaneswar to the abode of Lord Shiva",
        description: "A focused, comfortable group journey designed specifically for devotees from Odisha visiting Kedarnath.",
        duration: "8 Days / 7 Nights",
        price: "28,500",
        price_note: "per person",
        starting_from: "Cuttack",
        image_url: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800",
        seats_left: 5,
        next_departure: "2026-05-20T00:00:00Z",
        trip_date: "May 20, 2026",
        pushback_price: "29,500",
        sleeper_price: "32,000",
        highlights: ["Helicopter booking assistance", "Odia Guide", "Medical support"],
        is_active: true,
        display_order: 2,
      });
    }

    // 2. Seed Blog Posts
    const blogs = await ctx.db.query("blog_posts").collect();
    if (blogs.length === 0) {
      await ctx.db.insert("blog_posts", {
        title: "Complete Guide to Kedarnath Yatra 2026 from Odisha",
        slug: "kedarnath-yatra-guide-2026",
        excerpt: "Everything you need to know before embarking on your spiritual journey to Kedarnath — packing tips, best season, route details, and more.",
        content: "## The Call of the Mountains\n\nKedarnath, nestled in the majestic Garhwal Himalayas at an altitude of 3,583 meters, is one of the most sacred Jyotirlinga temples in India. For devotees from Odisha, this journey is not just travel; it's a pilgrimage of a lifetime.\n\n## Best Time to Visit\nThe ideal window is May to June and September to October. Monsoon months (July-August) should be avoided due to landslide risks.\n\n## What to Pack\n- Warm layered clothing\n- Comfortable trekking shoes\n- Rain gear\n- Basic medicines\n- Torch/flashlight\n- Water bottle\n\n## Why Travel With Us?\nWhen you travel with AnandaRath, we handle everything — from comfortable 2x1 AC sleeper buses to Odia home-cooked meals, guided darshan, and photography services.",
        cover_image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
        author: "AnandaRath Team",
        category: "Travel Guide",
        published_at: "2026-04-01",
        is_published: true,
        created_at: Date.now(),
      });
    }

    // 3. Seed Video Testimonials
    const videos = await ctx.db.query("video_testimonials").collect();
    if (videos.length === 0) {
      await ctx.db.insert("video_testimonials", {
        youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        customer_name: "Ramesh Patra",
        location: "Bhubaneswar",
        title: "My Kedarnath Yatra Experience with AnandaRath",
        display_order: 1,
        created_at: Date.now(),
      });
      await ctx.db.insert("video_testimonials", {
        youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        customer_name: "Sunita Das",
        location: "Cuttack",
        title: "Comfortable Kashi Pilgrimage",
        display_order: 2,
        created_at: Date.now(),
      });
    }

    // 4. Seed Text Testimonials
    const testimonials = await ctx.db.query("testimonials").collect();
    if (testimonials.length === 0) {
      await ctx.db.insert("testimonials", {
        name: "Prakash Mohanty",
        location: "Khurda",
        rating: 5,
        text: "The arrangements were superb. The Odia meals provided during the entire trip made us feel at home. Highly recommended for elderly travelers.",
        display_order: 1,
      });
      await ctx.db.insert("testimonials", {
        name: "Lipa Sahoo",
        location: "Bhadrak",
        rating: 5,
        text: "Very professional and caring team. The guide helped my parents greatly during the Kedarnath trek. The sleeper bus was very comfortable.",
        display_order: 2,
      });
    }

    // 5. Seed Hero Config
    const heroConfigs = await ctx.db.query("hero_config").collect();
    if (heroConfigs.length === 0) {
      await ctx.db.insert("hero_config", {
        timer_title: "NEXT YATRA DEPARTING IN",
        target_date: "2026-05-15T12:00:00",
        form_title: "Book Your Yatra Seat Now",
      });
    }

    // 6. Seed Inquiries
    const inquiries = await ctx.db.query("inquiries").collect();
    if (inquiries.length === 0) {
      await ctx.db.insert("inquiries", {
        name: "Trupti Nayak",
        phone: "+91 9876543210",
        travelers: "4",
        preferred_date: "May 2026",
        pickup_location: "Bhubaneswar",
        package_name: "Char Dham Yatra from Odisha",
        status: "new",
        notes: "Requested a lower berth in sleeper bus.",
        created_at: Date.now() - 3600000, // 1 hour ago
      });
    }

    // 7. Seed Gallery Photos
    const gallery = await ctx.db.query("gallery_photos").collect();
    if (gallery.length === 0) {
      const photos = [
        { image_url: "/gallery/1.jpg", caption: "Group members with a holy man", display_order: 1 },
        { image_url: "/gallery/2.jpg", caption: "Yatris in front of Kashi Vishwanath temple", display_order: 2 },
        { image_url: "/gallery/3.jpg", caption: "Group photo by the holy river", display_order: 3 },
        { image_url: "/gallery/4.jpg", caption: "Devotees taking a rest", display_order: 4 },
        { image_url: "/gallery/5.jpg", caption: "Couple asking for blessings", display_order: 5 },
      ];
      for (const photo of photos) {
        await ctx.db.insert("gallery_photos", photo);
      }
    }

    return "Successfully seeded demo data!";
  },
});

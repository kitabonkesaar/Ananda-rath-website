export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: string;
  publishedAt: string;
  isPublished: boolean;
}

const STORAGE_KEY = "ananda_rath_blog_posts";

export const getBlogPosts = (): BlogPost[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  // Seed with sample posts
  const seed: BlogPost[] = [
    {
      id: "1",
      title: "Complete Guide to Kedarnath Yatra 2026",
      slug: "kedarnath-yatra-guide-2026",
      excerpt: "Everything you need to know before embarking on your spiritual journey to Kedarnath — packing tips, best season, route details, and more.",
      content: "Kedarnath, nestled in the majestic Garhwal Himalayas at an altitude of 3,583 meters, is one of the most sacred Jyotirlinga temples in India...\n\n## Best Time to Visit\nThe ideal window is May to June and September to October. Monsoon months (July-August) should be avoided due to landslide risks.\n\n## What to Pack\n- Warm layered clothing\n- Comfortable trekking shoes\n- Rain gear\n- Basic medicines\n- Torch/flashlight\n- Water bottle\n\n## Our Yatra Includes\nWhen you travel with AnandaRath, we handle everything — from comfortable 2x1 AC sleeper buses to Odia home-cooked meals, guided darshan, and photography services.",
      coverImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
      author: "AnandaRath Team",
      category: "Travel Guide",
      publishedAt: "2026-04-01",
      isPublished: true,
    },
    {
      id: "2",
      title: "Spiritual Significance of Char Dham Yatra",
      slug: "char-dham-yatra-spiritual-significance",
      excerpt: "Discover the deep spiritual meaning behind the Char Dham pilgrimage — Badrinath, Kedarnath, Gangotri, and Yamunotri.",
      content: "The Char Dham Yatra is considered one of the most sacred pilgrimages in Hinduism...\n\n## The Four Sacred Abodes\n1. **Yamunotri** - Source of the Yamuna river\n2. **Gangotri** - Source of the Ganges\n3. **Kedarnath** - One of the twelve Jyotirlingas\n4. **Badrinath** - The abode of Lord Vishnu\n\n## Spiritual Benefits\nIt is believed that completing the Char Dham Yatra washes away all sins and leads to Moksha (liberation).",
      coverImage: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800",
      author: "AnandaRath Team",
      category: "Spirituality",
      publishedAt: "2026-03-20",
      isPublished: true,
    },
    {
      id: "3",
      title: "Top 5 Tips for First-Time Pilgrims",
      slug: "tips-first-time-pilgrims",
      excerpt: "First time on a yatra? Here are essential tips to make your spiritual journey comfortable, safe, and deeply meaningful.",
      content: "Embarking on your first pilgrimage can be both exciting and overwhelming...\n\n## 1. Start With Physical Preparation\nMany temples involve climbing stairs or trekking. Start light exercises weeks before.\n\n## 2. Pack Light But Smart\nCarry essentials only. Your bag should include warm layers, comfortable shoes, and personal medicines.\n\n## 3. Stay Hydrated\nHigh-altitude destinations can cause dehydration. Carry a water bottle and drink frequently.\n\n## 4. Respect Local Customs\nEach temple has its own set of traditions. Listen to your guide and follow temple protocols.\n\n## 5. Book With a Trusted Operator\nChoose a travel operator like AnandaRath that handles logistics so you can focus purely on your spiritual experience.",
      coverImage: "https://images.unsplash.com/photo-1544015759-62f984c92588?w=800",
      author: "AnandaRath Team",
      category: "Tips",
      publishedAt: "2026-03-10",
      isPublished: true,
    },
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  return seed;
};

export const saveBlogPosts = (posts: BlogPost[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

export const addBlogPost = (post: Omit<BlogPost, "id">): BlogPost => {
  const posts = getBlogPosts();
  const newPost: BlogPost = { ...post, id: Date.now().toString() };
  posts.unshift(newPost);
  saveBlogPosts(posts);
  return newPost;
};

export const updateBlogPost = (id: string, updates: Partial<BlogPost>) => {
  const posts = getBlogPosts();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx !== -1) {
    posts[idx] = { ...posts[idx], ...updates };
    saveBlogPosts(posts);
  }
};

export const deleteBlogPost = (id: string) => {
  const posts = getBlogPosts().filter((p) => p.id !== id);
  saveBlogPosts(posts);
};

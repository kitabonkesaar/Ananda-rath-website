import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/HomePage";
import WhatsAppButton from "@/components/WhatsAppButton";
import { usePublishedBlogPosts } from "@/hooks/useConvex";
import SEO from "@/components/SEO";
import { Calendar, User, ArrowRight, Tag, BookOpen, Loader2 } from "lucide-react";

const BlogPage = () => {
  const { data: allPostsRaw, isLoading } = usePublishedBlogPosts();
  const allPosts = allPostsRaw ?? [];
  const categories = useMemo(() => ["All", ...new Set(allPosts.map((p) => p.category))], [allPosts]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  const filtered = activeCategory === "All" ? allPosts : allPosts.filter((p) => p.category === activeCategory);

  // Simple markdown-ish renderer
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("## ")) return <h2 key={i} className="text-xl font-bold text-foreground mt-6 mb-3">{line.replace("## ", "")}</h2>;
      if (line.startsWith("# ")) return <h1 key={i} className="text-2xl font-bold text-foreground mt-6 mb-3">{line.replace("# ", "")}</h1>;
      if (line.startsWith("- ")) return <li key={i} className="text-muted-foreground ml-4 mb-1">{line.replace("- ", "")}</li>;
      if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-bold text-foreground">{line.replace(/\*\*/g, "")}</p>;
      if (line.match(/^\d+\.\s\*\*/)) {
        const parts = line.match(/^(\d+)\.\s\*\*(.+?)\*\*\s*-?\s*(.*)/);
        if (parts) return <p key={i} className="mb-2"><span className="font-bold text-foreground">{parts[1]}. {parts[2]}</span>{parts[3] ? ` - ${parts[3]}` : ""}</p>;
      }
      if (line.trim() === "") return <br key={i} />;
      return <p key={i} className="text-muted-foreground leading-relaxed mb-2">{line}</p>;
    });
  };

  // Detail view
  if (selectedPost) {
    return (
      <div className="flex flex-col min-h-screen">
        <SEO 
          title={selectedPost.title}
          description={selectedPost.excerpt}
          keywords={`${selectedPost.title}, spiritual blog Odisha, yatra stories, ${selectedPost.category}`}
          ogImage={selectedPost.cover_image}
        />
        <Navbar />
        <main className="flex-1">
          {/* Blog Detail Hero */}
          <div className="relative">
            {selectedPost.cover_image && (
              <div className="h-80 md:h-[420px] relative overflow-hidden">
                <img src={selectedPost.cover_image} alt={selectedPost.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              </div>
            )}
            <div className="container relative z-10 -mt-32 pb-8">
              <button
                onClick={() => setSelectedPost(null)}
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mb-6 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full"
              >
                ← Back to Blog
              </button>
              <div className="max-w-3xl">
                <span className="inline-block rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1 mb-4">{selectedPost.category}</span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight mb-4">{selectedPost.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><User className="h-4 w-4" />{selectedPost.author}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{new Date(selectedPost.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <section className="pb-24">
            <div className="container">
              <article className="max-w-3xl prose-custom">
                {renderContent(selectedPost.content)}
              </article>

              {/* CTA inside article */}
              <div className="max-w-3xl mt-12 rounded-2xl bg-gradient-to-r from-primary to-maroon p-8 text-center">
                <h3 className="text-xl font-bold text-white mb-2">Ready for Your Spiritual Journey?</h3>
                <p className="text-white/70 text-sm mb-5">Book your yatra with AnandaRath and travel in comfort & devotion.</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link to="/packages" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-primary hover:bg-white/90 transition-all">
                    View Packages <ArrowRight className="h-4 w-4" />
                  </Link>
                  <WhatsAppButton label="Chat on WhatsApp" />
                </div>
              </div>
            </div>
          </section>
        </main>
        <WhatsAppButton variant="floating" />
        <Footer />
      </div>
    );
  }

  // Listing view
  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Spiritual Blog - Yatra Stories & Travel Guides"
        description="Read spiritual insights, travel tips, and stories from our pilgrimage journeys across India. Expert guides for Kedarnath, Kashi, and more."
        keywords="spiritual blog Odisha, yatra travel tips, Kedarnath guide, Kashi yatra stories, AnandaRath blog"
      />
      <Navbar />
      <main className="flex-1">
        {/* Blog Header */}
        <section className="page-header rounded-none">
          <div className="relative z-10 container">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">📖 Our Blog</p>
            <h1 className="text-3xl font-bold text-white md:text-5xl">Yatra Stories & Guides</h1>
            <p className="mt-4 text-white/60 max-w-lg mx-auto">
              Spiritual insights, travel tips, and stories from our pilgrimage journeys.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-primary to-maroon text-white shadow-lg"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Posts Grid */}
            {isLoading ? (
              <div className="flex items-center justify-center py-20 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin mr-2" /> Loading posts...
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">No posts in this category yet.</p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((post, i) => (
                  <article
                    key={post._id ?? post.slug}
                    onClick={() => setSelectedPost(post)}
                    className="group cursor-pointer rounded-2xl bg-card overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    {post.cover_image && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold text-primary">
                            <Tag className="h-3 w-3" />{post.category}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{post.author}</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(post.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                          </span>
                        </div>
                        <span className="text-primary font-semibold flex items-center gap-1 text-xs group-hover:gap-1.5 transition-all">
                          Read <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <WhatsAppButton variant="floating" />
      <Footer />
    </div>
  );
};

export default BlogPage;

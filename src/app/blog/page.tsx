"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/HomePage";
import WhatsAppButton from "@/components/WhatsAppButton";
import { usePublishedBlogPosts } from "@/hooks/useConvex";
import { Calendar, User, ArrowRight, Tag, BookOpen, Loader2 } from "lucide-react";

export default function BlogPage() {
  const { data: allPostsRaw, isLoading } = usePublishedBlogPosts();
  const allPosts = allPostsRaw ?? [];
  const categories = useMemo(() => ["All", ...new Set(allPosts.map((p) => p.category))], [allPosts]);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? allPosts : allPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="page-header rounded-none">
          <div className="relative z-10 container">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">📖 Our Blog</p>
            <h1 className="text-3xl font-bold text-white md:text-5xl">Yatra Stories &amp; Guides</h1>
            <p className="mt-4 text-white/60 max-w-lg mx-auto">
              Spiritual insights, travel tips, and stories from our pilgrimage journeys.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
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
                  <Link
                    key={post._id ?? post.slug}
                    href={`/blog/${post.slug}`}
                    className="group cursor-pointer rounded-2xl bg-card overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                    style={{ animationDelay: `${i * 80}ms` } as React.CSSProperties}
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
                  </Link>
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
}

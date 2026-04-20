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

  // Markdown renderer that handles headings, lists, tables, blockquotes, bold
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];
    let tableRows: string[][] = [];
    let inTable = false;

    const flushTable = () => {
      if (tableRows.length === 0) return;
      const headers = tableRows[0];
      // skip separator row (index 1)
      const bodyRows = tableRows.slice(2);
      elements.push(
        <div key={`table-${elements.length}`} className="overflow-x-auto my-4 rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                {headers.map((h, hi) => (
                  <th key={hi} className="text-left px-4 py-2.5 font-bold text-foreground border-b border-border">{renderInline(h.trim())}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, ri) => (
                <tr key={ri} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-2 text-muted-foreground">{renderInline(cell.trim())}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
    };

    // Render inline markdown: **bold**, *italic*
    const renderInline = (text: string) => {
      const parts = text.split(/(\*\*[^*]+\*\*)/g);
      return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i} className="font-bold text-foreground">{part.slice(2, -2)}</strong>;
        }
        return part;
      });
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Table row
      if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
        if (!inTable) inTable = true;
        const cells = line.trim().slice(1, -1).split("|");
        // Skip separator rows like |---|---|
        if (cells.every(c => c.trim().match(/^[-:]+$/))) {
          tableRows.push(cells.map(c => c.trim()));
          continue;
        }
        tableRows.push(cells.map(c => c.trim()));
        continue;
      } else if (inTable) {
        flushTable();
        inTable = false;
      }

      // Headings
      if (line.startsWith("### ")) {
        elements.push(<h3 key={i} className="text-lg font-bold text-foreground mt-5 mb-2">{renderInline(line.replace("### ", ""))}</h3>);
        continue;
      }
      if (line.startsWith("## ")) {
        elements.push(<h2 key={i} className="text-xl font-bold text-foreground mt-8 mb-3">{renderInline(line.replace("## ", ""))}</h2>);
        continue;
      }
      if (line.startsWith("# ")) {
        elements.push(<h1 key={i} className="text-2xl font-bold text-foreground mt-8 mb-3">{renderInline(line.replace("# ", ""))}</h1>);
        continue;
      }

      // Blockquote
      if (line.startsWith("> ")) {
        elements.push(
          <blockquote key={i} className="border-l-4 border-primary/40 bg-primary/5 rounded-r-xl pl-4 pr-4 py-3 my-3 italic text-muted-foreground">
            {renderInline(line.replace(/^>\s*/, "").replace(/^\*/, "").replace(/\*$/, ""))}
          </blockquote>
        );
        continue;
      }

      // Bullet list
      if (line.startsWith("- ")) {
        elements.push(
          <li key={i} className="text-muted-foreground ml-5 mb-1.5 list-disc leading-relaxed">
            {renderInline(line.replace("- ", ""))}
          </li>
        );
        continue;
      }

      // Numbered list with bold title: "1. **Title** – description"
      if (line.match(/^\d+\.\s/)) {
        elements.push(
          <li key={i} className="text-muted-foreground ml-5 mb-1.5 list-decimal leading-relaxed">
            {renderInline(line.replace(/^\d+\.\s/, ""))}
          </li>
        );
        continue;
      }

      // Heading-like numbered "#### 1." patterns
      if (line.startsWith("#### ")) {
        elements.push(<h4 key={i} className="text-base font-bold text-foreground mt-4 mb-1">{renderInline(line.replace("#### ", ""))}</h4>);
        continue;
      }

      // Empty line
      if (line.trim() === "") {
        elements.push(<div key={i} className="h-2" />);
        continue;
      }

      // Default paragraph
      elements.push(<p key={i} className="text-muted-foreground leading-relaxed mb-2">{renderInline(line)}</p>);
    }

    // Flush any remaining table
    if (inTable) flushTable();

    return elements;
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

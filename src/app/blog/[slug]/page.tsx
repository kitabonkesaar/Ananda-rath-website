"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/HomePage";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useBlogPostBySlug } from "@/hooks/useConvex";
import { Calendar, User, ArrowRight, Loader2 } from "lucide-react";

const renderInline = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-bold text-foreground">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const renderContent = (content: string) => {
  const lines = content.split("\n");
  const elements: JSX.Element[] = [];
  let tableRows: string[][] = [];
  let inTable = false;

  const flushTable = () => {
    if (tableRows.length === 0) return;
    const headers = tableRows[0];
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

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      if (!inTable) inTable = true;
      const cells = line.trim().slice(1, -1).split("|");
      tableRows.push(cells.map(c => c.trim()));
      continue;
    } else if (inTable) {
      flushTable();
      inTable = false;
    }
    if (line.startsWith("### ")) { elements.push(<h3 key={i} className="text-lg font-bold text-foreground mt-5 mb-2">{renderInline(line.replace("### ", ""))}</h3>); continue; }
    if (line.startsWith("## ")) { elements.push(<h2 key={i} className="text-xl font-bold text-foreground mt-8 mb-3">{renderInline(line.replace("## ", ""))}</h2>); continue; }
    if (line.startsWith("# ")) { elements.push(<h1 key={i} className="text-2xl font-bold text-foreground mt-8 mb-3">{renderInline(line.replace("# ", ""))}</h1>); continue; }
    if (line.startsWith("#### ")) { elements.push(<h4 key={i} className="text-base font-bold text-foreground mt-4 mb-1">{renderInline(line.replace("#### ", ""))}</h4>); continue; }
    if (line.startsWith("> ")) {
      elements.push(<blockquote key={i} className="border-l-4 border-primary/40 bg-primary/5 rounded-r-xl pl-4 pr-4 py-3 my-3 italic text-muted-foreground">{renderInline(line.replace(/^>\s*/, ""))}</blockquote>);
      continue;
    }
    if (line.startsWith("- ")) { elements.push(<li key={i} className="text-muted-foreground ml-5 mb-1.5 list-disc leading-relaxed">{renderInline(line.replace("- ", ""))}</li>); continue; }
    if (line.match(/^\d+\.\s/)) { elements.push(<li key={i} className="text-muted-foreground ml-5 mb-1.5 list-decimal leading-relaxed">{renderInline(line.replace(/^\d+\.\s/, ""))}</li>); continue; }
    if (line.trim() === "") { elements.push(<div key={i} className="h-2" />); continue; }
    elements.push(<p key={i} className="text-muted-foreground leading-relaxed mb-2">{renderInline(line)}</p>);
  }
  if (inTable) flushTable();
  return elements;
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "";
  const { data: post, isLoading } = useBlogPostBySlug(slug);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin mr-2" /> Loading post...
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-6xl font-extrabold text-primary/20 mb-4">404</p>
            <h1 className="text-xl font-bold text-foreground mb-4">Post Not Found</h1>
            <Link href="/blog" className="text-primary underline">← Back to Blog</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <div className="relative">
          {post.cover_image && (
            <div className="h-80 md:h-[420px] relative overflow-hidden">
              <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            </div>
          )}
          <div className="container relative z-10 -mt-32 pb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mb-6 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full"
            >
              ← Back to Blog
            </Link>
            <div className="max-w-3xl">
              <span className="inline-block rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1 mb-4">{post.category}</span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight mb-4">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><User className="h-4 w-4" />{post.author}</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{new Date(post.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
              </div>
            </div>
          </div>
        </div>

        <section className="pb-24">
          <div className="container">
            <article className="max-w-3xl prose-custom">
              {renderContent(post.content)}
            </article>
            <div className="max-w-3xl mt-12 rounded-2xl bg-gradient-to-r from-primary to-maroon p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Ready for Your Spiritual Journey?</h3>
              <p className="text-white/70 text-sm mb-5">Book your yatra with AnandaRath and travel in comfort &amp; devotion.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/packages" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-primary hover:bg-white/90 transition-all">
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

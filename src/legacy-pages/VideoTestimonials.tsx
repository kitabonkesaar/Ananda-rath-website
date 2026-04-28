import { useState } from "react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import { Footer } from "@/components/HomePage";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getYoutubeEmbedUrl } from "@/data/videoTestimonials";
import { useVideoTestimonialsConvex } from "@/hooks/useConvex";
import { Play, MapPin, X, Instagram, Youtube } from "lucide-react";

const VideoTestimonials = () => {
  const { data: videos, isLoading } = useVideoTestimonialsConvex();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Pilgrim Experiences - Video Testimonials"
        description="Watch video reviews from devotees who joined our spiritual yatras. Hear about their experiences with AnandaRath services from Odisha."
        keywords="yatra reviews, spiritual tour testimonials, AnandaRath feedback, pilgrim videos Odisha, Kedarnath yatra reviews"
      />
      <Navbar />
      <main className="flex-1">
        {/* Page Header */}
        <section className="page-header rounded-none">
          <div className="relative z-10 container">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">🎬 Video Testimonials</p>
            <h1 className="text-3xl font-bold text-white md:text-5xl">Hear From Our Pilgrims</h1>
            <p className="mt-4 text-white/60 max-w-lg mx-auto">
              Watch real stories from devotees who have traveled with AnandaRath.
            </p>
          </div>
        </section>

        {/* Video Grid */}
        <section className="py-24">
          <div className="container">
            {isLoading ? (
              <div className="text-center py-20">
                <div className="mx-auto mb-6 h-12 w-12 rounded-full border-b-2 border-primary animate-spin"></div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Loading videos...</h3>
              </div>
            ) : !videos?.length ? (
              <div className="text-center py-20">
                <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                  <Play className="h-10 w-10 text-muted-foreground/40" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Videos Coming Soon</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  We're collecting video testimonials from our happy pilgrims. Stay tuned!
                </p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[...videos]
                  .sort((a, b) => a.display_order - b.display_order)
                  .map((video) => {
                    const isYoutubeActuallyInsta = video.youtube_url?.includes("instagram.com");
                    const hasActualYoutube = video.youtube_url && !isYoutubeActuallyInsta;
                    
                    const embedUrl = hasActualYoutube ? getYoutubeEmbedUrl(video.youtube_url) : null;
                    const videoId = hasActualYoutube ? extractVideoId(video.youtube_url || "") : "";
                    const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
                    
                    const reelUrl = video.instagram_reel_url || (isYoutubeActuallyInsta ? video.youtube_url : null);
                    
                    return (
                      <div key={video._id} className="rounded-2xl bg-card shadow-card card-interactive overflow-hidden group flex flex-col">
                        {/* Video Thumbnail */}
                        <div
                          className="relative cursor-pointer aspect-video bg-black shrink-0"
                          onClick={() => {
                            if (embedUrl) {
                              setActiveVideo(video._id === activeVideo ? null : video._id);
                            } else if (reelUrl) {
                              window.open(reelUrl, "_blank");
                            }
                          }}
                        >
                          {activeVideo === video._id && embedUrl ? (
                            <iframe
                              src={`${embedUrl}?autoplay=1`}
                              title={video.title || video.customer_name}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="absolute inset-0 w-full h-full"
                            />
                          ) : (
                            <>
                              {thumbnailUrl ? (
                                <img
                                  src={thumbnailUrl}
                                  alt={video.title || video.customer_name}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900/40 to-pink-900/40">
                                  <Instagram className="h-16 w-16 text-pink-500/50" />
                                </div>
                              )}
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                                <div className="h-16 w-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                  {embedUrl ? (
                                    <Play className="h-7 w-7 text-white ml-1" fill="white" />
                                  ) : (
                                    <Instagram className="h-7 w-7 text-white" />
                                  )}
                                </div>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Info */}
                        <div className="p-5 flex-1 flex flex-col">
                          {video.title && (
                            <h3 className="font-bold text-foreground mb-3 line-clamp-2">{video.title}</h3>
                          )}
                          
                          <div className="mt-auto">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                                  {video.customer_name?.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-semibold text-foreground text-sm">{video.customer_name}</p>
                                  {video.location && (
                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                      <MapPin className="h-3 w-3" /> {video.location}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Instagram Reel Badge */}
                              {reelUrl && (
                                <a
                                  href={reelUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Watch on Instagram Reels"
                                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white transition-all hover:scale-105 hover:shadow-lg shrink-0"
                                  style={{
                                    background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                                  }}
                                >
                                  <Instagram className="h-3.5 w-3.5" />
                                  Reel
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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

// Helper to extract video ID
function extractVideoId(url: string): string {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname.startsWith("/shorts/")) {
        return parsed.pathname.split("/")[2] || "";
      }
      return parsed.searchParams.get("v") || "";
    } else if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.slice(1);
    }
  } catch { /* ignore */ }
  return "";
}

export default VideoTestimonials;

import { useState, useEffect } from "react";

// ── Video Testimonial Type ──
export interface VideoTestimonial {
  id: string;
  youtube_url: string;
  customer_name: string;
  location?: string;
  title?: string;
  display_order: number;
  created_at: string;
}

const STORAGE_KEY = "ananda_rath_video_testimonials";

// ── Default demo data ──
const defaultVideos: VideoTestimonial[] = [
  {
    id: "demo-1",
    youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    customer_name: "Ramesh Patra",
    location: "Bhubaneswar",
    title: "My Kedarnath Yatra Experience",
    display_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-2",
    youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    customer_name: "Sunita Das",
    location: "Cuttack",
    title: "Kashi & Ayodhya Pilgrimage Memories",
    display_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-3",
    youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    customer_name: "Prakash Mohanty",
    location: "Balasore",
    title: "Badrinath Darshan - A Spiritual Journey",
    display_order: 3,
    created_at: new Date().toISOString(),
  },
];

// Initialize localStorage with defaults if empty
const initStorage = (): VideoTestimonial[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch { /* ignore */ }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultVideos));
  return defaultVideos;
};

// ── Hook: get video testimonials ──
export const useVideoTestimonials = () => {
  const [videos, setVideos] = useState<VideoTestimonial[]>([]);

  useEffect(() => {
    setVideos(initStorage());
  }, []);

  const refresh = () => setVideos(initStorage());

  return { videos, refresh };
};

// ── CRUD helpers ──
export const getVideoTestimonials = (): VideoTestimonial[] => {
  return initStorage();
};

export const addVideoTestimonial = (video: Omit<VideoTestimonial, "id" | "created_at">): VideoTestimonial => {
  const videos = getVideoTestimonials();
  const newVideo: VideoTestimonial = {
    ...video,
    id: `vid-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    created_at: new Date().toISOString(),
  };
  videos.push(newVideo);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
  return newVideo;
};

export const updateVideoTestimonial = (id: string, updates: Partial<VideoTestimonial>) => {
  const videos = getVideoTestimonials();
  const idx = videos.findIndex(v => v.id === id);
  if (idx !== -1) {
    videos[idx] = { ...videos[idx], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
  }
};

export const deleteVideoTestimonial = (id: string) => {
  const videos = getVideoTestimonials().filter(v => v.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
};

// ── YouTube URL to embed ──
export const getYoutubeEmbedUrl = (url: string): string | null => {
  try {
    const parsed = new URL(url);
    let videoId: string | null = null;
    
    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname.startsWith("/shorts/")) {
        videoId = parsed.pathname.split("/")[2];
      } else {
        videoId = parsed.searchParams.get("v");
      }
    } else if (parsed.hostname.includes("youtu.be")) {
      videoId = parsed.pathname.slice(1);
    }

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  } catch { /* ignore */ }
  return null;
};

export const getYoutubeThumbnail = (url: string): string | null => {
  try {
    const parsed = new URL(url);
    let videoId: string | null = null;

    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname.startsWith("/shorts/")) {
        videoId = parsed.pathname.split("/")[2];
      } else {
        videoId = parsed.searchParams.get("v");
      }
    } else if (parsed.hostname.includes("youtu.be")) {
      videoId = parsed.pathname.slice(1);
    }

    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
  } catch { /* ignore */ }
  return null;
};

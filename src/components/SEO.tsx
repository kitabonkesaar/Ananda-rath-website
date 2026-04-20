import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  noIndex?: boolean;
}

// Helper to upsert a meta tag
function upsertMeta(selector: string, attr: string, value: string) {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    const [attrName, attrVal] = selector.match(/\[(.+?)=["'](.+?)["']\]/)?.slice(1) ?? [];
    if (attrName && attrVal) el.setAttribute(attrName, attrVal);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

// Helper to upsert a link tag
function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

const SEO = ({ 
  title, 
  description, 
  keywords, 
  ogImage, 
  ogUrl,
  noIndex = false,
}: SEOProps) => {
  const siteName = "AnandaRath Spiritual Tourism";
  const defaultTitle = "AnandaRath - Kedarnath, Kashi, Badrinath Yatra from Odisha";
  const defaultDescription = "Book spiritual yatra packages from Odisha. Premium AC Sleeper Bus journeys to Kedarnath, Badrinath, Kashi, Mahakaleshwar and more. Every Yatra, A Spiritual Experience.";
  const defaultKeywords = "Odisha's spiritual tourism, Odisha Tirthayatra, Kedarnath Yatra from Odisha, Vrindavan Yatra from Odisha, Kashi Yatra from Odisha, Badrinath Yatra from Odisha, Mahakaleshwar Yatra from Odisha, Spiritual travel agency in Odisha, Ananda Rath spiritual tours, Puri to Kedarnath yatra, Bhubaneswar to Kashi yatra, spiritual travel Odisha";
  const defaultOgImage = "https://anandarath.com/og-image.jpg";

  useEffect(() => {
    const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
    const fullDescription = description || defaultDescription;
    const fullKeywords = keywords || defaultKeywords;
    const fullUrl = ogUrl || window.location.href;
    const fullImage = ogImage || defaultOgImage;

    // Page title
    document.title = fullTitle;

    // Basic meta
    upsertMeta('meta[name="description"]', "content", fullDescription);
    upsertMeta('meta[name="keywords"]', "content", fullKeywords);
    upsertMeta('meta[name="robots"]', "content", noIndex ? "noindex,nofollow" : "index,follow");

    // Open Graph
    upsertMeta('meta[property="og:title"]', "content", fullTitle);
    upsertMeta('meta[property="og:description"]', "content", fullDescription);
    upsertMeta('meta[property="og:url"]', "content", fullUrl);
    upsertMeta('meta[property="og:image"]', "content", fullImage);
    upsertMeta('meta[property="og:type"]', "content", "website");
    upsertMeta('meta[property="og:site_name"]', "content", siteName);

    // Twitter Card
    upsertMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "content", fullTitle);
    upsertMeta('meta[name="twitter:description"]', "content", fullDescription);
    upsertMeta('meta[name="twitter:image"]', "content", fullImage);

    // Canonical URL
    upsertLink("canonical", fullUrl);

  }, [title, description, keywords, ogImage, ogUrl, noIndex]);

  return null;
};

export default SEO;

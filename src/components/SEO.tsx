import { useEffect } from "react";

/**
 * SEO Component - Handles all dynamic meta tags, Open Graph, Twitter Cards,
 * canonical URLs, and JSON-LD structured data for every page.
 * 
 * SEO Improvements:
 * - Dynamic page-specific structured data (BreadcrumbList, Service, FAQPage)
 * - Proper canonical URL handling (removes trailing slashes, query params)
 * - Enhanced OG tags with locale and image dimensions
 * - Twitter card with proper attribution
 * - Robots meta with max directives for rich snippet eligibility
 */

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  noIndex?: boolean;
  /** SEO: Page type for enhanced structured data */
  pageType?: "home" | "packages" | "package-detail" | "blog" | "blog-post" | "contact" | "about" | "gallery" | "reviews";
  /** SEO: Breadcrumb trail for this page */
  breadcrumbs?: BreadcrumbItem[];
  /** SEO: FAQ items for FAQ structured data */
  faq?: FAQItem[];
  /** SEO: Service/Product price for package pages */
  price?: string;
  /** SEO: Article publish date for blog posts */
  publishedAt?: string;
  /** SEO: Article author */
  author?: string;
}

const SITE_NAME = "AnandaRath Spiritual Tourism";
const SITE_URL = "https://anandarath.com";
const DEFAULT_TITLE = "AnandaRath - Kedarnath, Kashi, Badrinath Yatra from Odisha";
const DEFAULT_DESCRIPTION = "Book spiritual yatra packages from Odisha. Premium AC Sleeper Bus journeys to Kedarnath, Badrinath, Kashi, Mahakaleshwar and more. Every Yatra, A Spiritual Experience.";
const DEFAULT_KEYWORDS = "Odisha spiritual tourism, Odisha Tirthayatra, Kedarnath Yatra from Odisha, Kashi Yatra from Odisha, Badrinath Yatra from Odisha, Mahakaleshwar Yatra, Vrindavan Yatra from Odisha, Ananda Rath spiritual tours, Bhubaneswar to Kedarnath yatra, Odia tirth yatra, pilgrimage from Odisha";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

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

// Helper to inject/update JSON-LD structured data
function upsertJsonLd(id: string, data: object) {
  let el = document.querySelector(`script[data-seo-id="${id}"]`) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-seo-id", id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

// Remove stale JSON-LD on route change
function removeJsonLd(id: string) {
  const el = document.querySelector(`script[data-seo-id="${id}"]`);
  if (el) el.remove();
}

const SEO = ({
  title,
  description,
  keywords,
  ogImage,
  ogUrl,
  noIndex = false,
  pageType,
  breadcrumbs,
  faq,
  price,
  publishedAt,
  author,
}: SEOProps) => {

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
    const fullDescription = description || DEFAULT_DESCRIPTION;
    const fullKeywords = keywords || DEFAULT_KEYWORDS;
    // SEO: Clean canonical URL - strip trailing slash, query params
    const rawUrl = ogUrl || window.location.origin + window.location.pathname;
    const canonicalUrl = rawUrl.replace(/\/$/, "") || SITE_URL;
    const fullImage = ogImage || DEFAULT_OG_IMAGE;

    // ── Page Title ──
    document.title = fullTitle;

    // ── Basic Meta Tags ──
    upsertMeta('meta[name="description"]', "content", fullDescription);
    upsertMeta('meta[name="keywords"]', "content", fullKeywords);
    upsertMeta('meta[name="robots"]', "content",
      noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );

    // ── Open Graph Tags ──
    upsertMeta('meta[property="og:title"]', "content", fullTitle);
    upsertMeta('meta[property="og:description"]', "content", fullDescription);
    upsertMeta('meta[property="og:url"]', "content", canonicalUrl);
    upsertMeta('meta[property="og:image"]', "content", fullImage);
    upsertMeta('meta[property="og:image:width"]', "content", "1200");
    upsertMeta('meta[property="og:image:height"]', "content", "630");
    upsertMeta('meta[property="og:type"]', "content", pageType === "blog-post" ? "article" : "website");
    upsertMeta('meta[property="og:site_name"]', "content", SITE_NAME);
    upsertMeta('meta[property="og:locale"]', "content", "en_IN");

    // ── Twitter Card Tags ──
    upsertMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "content", fullTitle);
    upsertMeta('meta[name="twitter:description"]', "content", fullDescription);
    upsertMeta('meta[name="twitter:image"]', "content", fullImage);

    // ── Article-specific meta for blog posts ──
    if (pageType === "blog-post" && publishedAt) {
      upsertMeta('meta[property="article:published_time"]', "content", publishedAt);
      upsertMeta('meta[property="article:author"]', "content", author || "AnandaRath");
    }

    // ── Canonical URL ──
    upsertLink("canonical", canonicalUrl);

    // ── JSON-LD: Breadcrumbs ──
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
        })),
      };
      upsertJsonLd("page-breadcrumbs", breadcrumbData);
    } else {
      removeJsonLd("page-breadcrumbs");
    }

    // ── JSON-LD: FAQ Page ──
    if (faq && faq.length > 0) {
      const faqData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      };
      upsertJsonLd("page-faq", faqData);
    } else {
      removeJsonLd("page-faq");
    }

    // ── JSON-LD: Service for package detail pages ──
    if (pageType === "package-detail" && title && price) {
      const serviceData = {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: title,
        description: fullDescription,
        image: fullImage,
        url: canonicalUrl,
        touristType: "Pilgrims",
        provider: {
          "@type": "TravelAgency",
          name: "AnandaRath Spiritual Tourism",
          url: SITE_URL,
        },
        offers: {
          "@type": "Offer",
          price: price.replace(/[^\d]/g, ""),
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url: canonicalUrl,
        },
      };
      upsertJsonLd("page-service", serviceData);
    } else {
      removeJsonLd("page-service");
    }

    // ── JSON-LD: BlogPosting for blog posts ──
    if (pageType === "blog-post" && publishedAt) {
      const articleData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description: fullDescription,
        image: fullImage,
        url: canonicalUrl,
        datePublished: publishedAt,
        author: {
          "@type": "Person",
          name: author || "AnandaRath",
        },
        publisher: {
          "@type": "Organization",
          name: "AnandaRath Spiritual Tourism",
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/logo.png`,
          },
        },
      };
      upsertJsonLd("page-article", articleData);
    } else {
      removeJsonLd("page-article");
    }

    // ── Scroll to top on route change ──
    window.scrollTo(0, 0);

    // Cleanup stale structured data on unmount
    return () => {
      removeJsonLd("page-breadcrumbs");
      removeJsonLd("page-faq");
      removeJsonLd("page-service");
      removeJsonLd("page-article");
    };
  }, [title, description, keywords, ogImage, ogUrl, noIndex, pageType, breadcrumbs, faq, price, publishedAt, author]);

  return null;
};

export default SEO;

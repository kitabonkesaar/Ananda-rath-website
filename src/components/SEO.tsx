import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
}

const SEO = ({ 
  title, 
  description, 
  keywords, 
  ogImage, 
  ogUrl 
}: SEOProps) => {
  const siteName = "AnandaRath Spiritual Tourism";
  const defaultTitle = "AnandaRath - Kedarnath, Kashi, Badrinath Yatra from Odisha";
  const defaultDescription = "Book spiritual yatra packages from Odisha. Premium AC Sleeper Bus journeys to Kedarnath, Badrinath, Kashi, Mahakaleshwar and more. Every Yatra, A Spiritual Experience.";
  const defaultKeywords = "Odisha's spiritual tourism, Odisha Tirthayatra, Kedarnath Yatra from Odisha, Vrindavan Yatra from Odisha, Kashi Yatra from Odisha, Badrinath Yatra from Odisha, Mahakaleshwar Yatra from Odisha, Spiritual travel agency in Odisha, Ananda Rath spiritual tours, Puri to Kedarnath yatra, Bhubaneswar to Kashi yatra, spiritual travel Odisha";

  useEffect(() => {
    // Set Title
    document.title = title ? `${title} | ${siteName}` : defaultTitle;

    // Set Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description || defaultDescription);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description || defaultDescription;
      document.head.appendChild(meta);
    }

    // Set Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", keywords || defaultKeywords);
    } else {
      metaKeywords = document.createElement("meta");
      (metaKeywords as HTMLMetaElement).name = "keywords";
      (metaKeywords as HTMLMetaElement).content = keywords || defaultKeywords;
      document.head.appendChild(metaKeywords);
    }

    // Set OG Title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", title ? `${title} | ${siteName}` : defaultTitle);
    }

    // Set OG Description
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute("content", description || defaultDescription);
    }

    // Set OG URL
    const ogUrlMeta = document.querySelector('meta[property="og:url"]');
    if (ogUrlMeta) {
      ogUrlMeta.setAttribute("content", ogUrl || window.location.href);
    }

    // Set OG Image
    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) {
      if (ogImage) ogImageMeta.setAttribute("content", ogImage);
    }

  }, [title, description, keywords, ogImage, ogUrl]);

  return null;
};

export default SEO;

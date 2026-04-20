import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

/**
 * SEO Breadcrumb Navigation Component
 * 
 * Provides visible breadcrumb trail matching the JSON-LD BreadcrumbList
 * structured data injected by the SEO component. This improves:
 * - Crawl depth (Google can discover parent pages)
 * - User navigation (users can go back to parent sections)
 * - Rich results (breadcrumbs appear in Google SERPs)
 */

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Light variant for use on dark backgrounds (page headers) */
  variant?: "default" | "light";
}

const Breadcrumbs = ({ items, variant = "default" }: BreadcrumbsProps) => {
  const isLight = variant === "light";
  
  return (
    <nav 
      aria-label="Breadcrumb navigation" 
      className={`flex items-center gap-1 text-sm flex-wrap ${isLight ? "text-white/60" : "text-muted-foreground"}`}
    >
      <Link 
        to="/" 
        className={`flex items-center gap-1 hover:${isLight ? "text-white" : "text-foreground"} transition-colors`}
        aria-label="Home"
      >
        <Home className="h-3.5 w-3.5" />
        <span className="sr-only">Home</span>
      </Link>

      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          <ChevronRight className="h-3.5 w-3.5 opacity-50" />
          {item.href && index < items.length - 1 ? (
            <Link 
              to={item.href} 
              className={`hover:${isLight ? "text-white" : "text-foreground"} transition-colors`}
            >
              {item.label}
            </Link>
          ) : (
            <span 
              className={`font-medium ${isLight ? "text-white" : "text-foreground"}`}
              aria-current="page"
            >
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;

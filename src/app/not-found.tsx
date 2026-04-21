import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center py-20">
      <div className="text-center px-4">
        <p className="text-8xl font-extrabold text-primary/20 mb-4">404</p>
        <h1 className="text-2xl font-bold text-foreground mb-2">Page Not Found</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The page you&#39;re looking for doesn&#39;t exist. It might have been removed or the URL might be incorrect.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full gradient-saffron px-6 py-3 text-sm font-semibold text-white shadow-saffron transition-all hover:scale-105"
          >
            <Home className="h-4 w-4" />
            Go to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}

"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold text-primary mb-2">Something went wrong</h1>
        <p className="text-muted-foreground mb-4">Please refresh the page or try again later.</p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}

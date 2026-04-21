import type { Metadata } from "next";
import "@/index.css";
import Providers from "@/components/providers";

export const metadata: Metadata = {
  title: {
    default: "AnandaRath - Spiritual Yatra Packages from Odisha",
    template: "%s | AnandaRath Spiritual Tourism",
  },
  description:
    "Book spiritual yatra packages to Kedarnath, Kashi, Badrinath and major pilgrimage circuits from Odisha. AC Sleeper Bus, meals & expert guides included.",
  metadataBase: new URL("https://anandarath.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "AnandaRath Spiritual Tourism",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

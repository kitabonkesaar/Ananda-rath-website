import type { Metadata } from "next";
import Script from "next/script";
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
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1216785026215659');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1216785026215659&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

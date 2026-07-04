import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { ToastProvider } from "@/components/ui/Toast";
import { ConfirmProvider } from "@/components/ui/ConfirmDialog";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { getSettings } from "@/app/admin/settings/actions";

export const metadata: Metadata = {
  metadataBase: new URL("https://rumio.id"),
  title: "Rumio.id | Jual Beli Properti Purwokerto & Virtual Tour 360°",
  description:
    "Temukan properti impian Anda di Purwokerto dan Banyumas melalui Rumio.id. Kami menyediakan layanan jual beli, sewa rumah, dan perumahan baru dengan inovasi survei Virtual Tour 360°.",
  keywords: [
    "Rumio.id",
    "Jual Beli Rumah Purwokerto",
    "Properti Purwokerto",
    "Perumahan Purwokerto",
    "Virtual Tour 360",
    "Sewa Properti Banyumas",
    "Agen Properti Purwokerto",
    "Real Estate Banyumas",
    "Rumah Dijual Purwokerto"
  ],
  openGraph: {
    title: "Rumio.id | Jual Beli Properti Purwokerto & Virtual Tour 360°",
    description:
      "Cari rumah, perumahan baru, atau properti komersial di Purwokerto. Dilengkapi fitur Virtual Tour 360° untuk pengalaman survei digital yang nyata.",
    url: "https://rumio.id",
    siteName: "Rumio.id",
    type: "website",
    images: [
      {
        url: "https://rumio.id/og-image.webp", // Menggunakan gambar yang sudah ada di folder public
        width: 1200,
        height: 630,
        alt: "Rumio.id - Platform Properti Terbaik Purwokerto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rumio.id | Jual Beli Properti Purwokerto",
    description:
      "Cari rumah dan perumahan baru di Purwokerto dengan inovasi Virtual Tour 360° dari Rumio.id.",
    images: ["https://rumio.id/og-image.webp"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await getSettings([
    "contact_whatsapp",
    "contact_email",
    "general_office_address",
    "social_instagram",
    "social_facebook",
    "social_tiktok",
    "social_youtube",
    "tracking_google_analytics",
    "tracking_meta_pixel"
  ]);
  const waNumberRaw = data?.contact_whatsapp || "";
  // Pastikan format nomor yang bisa dipakai untuk link (hilangkan karakter non-angka)
  const waNumber = waNumberRaw.replace(/[^0-9]/g, "");

  const gaId = data?.tracking_google_analytics;
  const pixelId = data?.tracking_meta_pixel;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative font-sans text-slate-900 bg-white">
        {/* Google Analytics */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}

        {/* Meta Pixel */}
        {pixelId && (
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
              fbq('init', '${pixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
        <ToastProvider>
          <ConfirmProvider>
            <SmoothScroll>
              <div className="flex flex-col min-h-screen">
                <Navbar whatsappNumber={waNumber} />
                <main className="flex-1">{children}</main>
                <Footer
                  whatsappNumber={waNumber}
                  rawWhatsapp={waNumberRaw}
                  email={data?.contact_email}
                  address={data?.general_office_address}
                  socials={{
                    instagram: data?.social_instagram,
                    facebook: data?.social_facebook,
                    tiktok: data?.social_tiktok,
                    youtube: data?.social_youtube,
                  }}
                />
              </div>
            </SmoothScroll>
          </ConfirmProvider>
        </ToastProvider>
      </body>
    </html>
  );
}

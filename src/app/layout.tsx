import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

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
  title: "Rumio.id | Platform Properti & Virtual Tour 360°",
  description:
    "Temukan properti impian Anda dengan mudah melalui Rumio.id. Kami menyediakan layanan jual, beli, sewa properti, serta inovasi Virtual Tour 360° untuk pengalaman survei digital yang nyata.",
  keywords: [
    "Rumio.id",
    "Properti",
    "Virtual Tour 360",
    "Jual Beli Rumah",
    "Sewa Properti",
    "Agen Properti",
    "Real Estate",
  ],
  openGraph: {
    title: "Rumio.id | Platform Properti & Virtual Tour 360°",
    description:
      "Temukan properti impian Anda dengan mudah melalui Rumio.id. Dilengkapi inovasi Virtual Tour 360° untuk pengalaman survei digital yang nyata.",
    url: "https://rumio.id",
    siteName: "Rumio.id",
    type: "website",
    images: [
      {
        url: "https://rumio.id/og-image.webp", // Menggunakan gambar yang sudah ada di folder public
        width: 1200,
        height: 630,
        alt: "Rumio.id - Platform Properti Terbaik",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rumio.id | Platform Properti & Virtual Tour 360°",
    description:
      "Temukan properti impian Anda dengan inovasi Virtual Tour 360° dari Rumio.id.",
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
    "social_youtube"
  ]);
  const waNumberRaw = data?.contact_whatsapp || "";
  // Pastikan format nomor yang bisa dipakai untuk link (hilangkan karakter non-angka)
  const waNumber = waNumberRaw.replace(/[^0-9]/g, "");

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative font-sans text-slate-900 bg-white">
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
      </body>
    </html>
  );
}

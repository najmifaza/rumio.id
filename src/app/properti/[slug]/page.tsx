import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  Share2,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import ViewTracker from "@/components/ViewTracker";

import ImageGallery from "@/components/ui/image-gallery";
import Icon360 from "@/components/ui/Icon360";
import VirtualTourViewer, { VirtualTourData } from "@/components/ui/VirtualTourViewer";
import { formatPriceFull, formatKPREstimate } from "@/lib/format";
import { getSettings } from "@/app/admin/settings/actions";
import WhatsAppBookingButton from "@/components/WhatsAppBookingButton";

const stripHtml = (html: string) => {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
};

// Cache property query to avoid duplicate DB calls between generateMetadata and page component
const getProperty = cache(async (slug: string) => {
  return prisma.property.findUnique({
    where: { slug },
    include: { images: true },
  });
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await getProperty(slug);

  if (!property) {
    return {
      title: "Properti Tidak Ditemukan | Rumio.id",
    };
  }

  const title = `${property.title} | Rumio.id`;
  const description = stripHtml(property.description).substring(0, 150) + "...";
  const image = property.featuredImage || "https://rumio.id/og-image.webp";
  const url = `https://rumio.id/properti/${property.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: settings } = await getSettings(["contact_whatsapp"]);
  const waNumber = settings?.contact_whatsapp?.replace(/[^0-9]/g, "") || "";

  const property = await getProperty(slug);

  if (!property) {
    notFound();
  }

  // View count increment dipindahkan ke ViewTracker (client-side) agar tidak dikali 2 oleh React Strict Mode

  let gallery = property.images.map(img => ({ url: img.imageUrl, caption: img.caption }));
  
  if (gallery.length > 0) {
    const featuredIndex = gallery.findIndex(g => g.url === property.featuredImage);
    if (featuredIndex > 0) {
      const featured = gallery[featuredIndex];
      gallery = [
        featured,
        ...gallery.filter((_, idx) => idx !== featuredIndex)
      ];
    }
  } else {
    gallery = property.featuredImage ? [{ url: property.featuredImage, caption: "" }] : [{ url: "/placeholder-image.jpg", caption: "" }];
  }

  let mapsEmbed = null;
  let mapsLink = null;
  
  if (property.mapsUrl) {
    if (property.mapsUrl.includes('embed') || property.mapsUrl.includes('iframe')) {
      // Jika user paste kode <iframe>, ambil src-nya saja
      const srcMatch = property.mapsUrl.match(/src=["']([^"']+)["']/);
      mapsEmbed = srcMatch ? srcMatch[1] : property.mapsUrl;
    } else {
      // Jika link biasa
      mapsLink = property.mapsUrl;
    }
  }

  // Tentukan apakah properti memiliki virtual tour yang valid
  const hasTour = Boolean(
    property.virtualTourData &&
    typeof property.virtualTourData === "object" &&
    ((property.virtualTourData as VirtualTourData).url ||
      (property.virtualTourData as VirtualTourData).nodes)
  );

  return (
    <main className="min-h-screen bg-slate-50 pb-20 font-sans pt-20">
      <ViewTracker propertyId={property.id} />
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-0">
        {/* Header Section */}
        <div className="mb-8">
          {/* Breadcrumb */}
          <Breadcrumbs
            className="py-6"
            items={[
              { label: "Beranda", href: "/" },
              { label: "Properti", href: "/properti" },
              { label: property.title },
            ]}
          />

          <h1 className="text-3xl md:text-[34px] font-bold text-[#0B1528] tracking-tight mb-4">
            {property.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-[#0B1528] font-medium">
              <MapPin className="w-4 h-4" />
              <span>{property.location}</span>
            </div>

            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-sm text-[#0B1528] hover:text-amber-600 transition-colors font-bold">
                <Share2 className="w-4 h-4" />
                Bagikan
              </button>
            </div>
          </div>
        </div>

        {/* Image Gallery Component */}
        <ImageGallery
          gallery={gallery}
          title={property.title}
          badge={property.listingType}
          virtualTourSectionId={hasTour ? "virtual-tour" : undefined}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Specs Card */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-2 lg:grid-cols-6 gap-y-6 gap-x-4 sm:gap-x-6 lg:divide-x lg:divide-slate-100">
              <div className="flex items-center gap-3 lg:px-4 xl:px-6 first:lg:pl-0 last:lg:pr-0">
                <div className="p-2 border border-slate-200 rounded-lg">
                  <Maximize className="w-6 h-6 text-slate-600 stroke-[1.5]" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium whitespace-nowrap">
                    Luas Tanah
                  </p>
                  <p className="font-bold text-[#0B1528] text-base sm:text-lg whitespace-nowrap">
                    {property.landArea || property.buildingArea} m²
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 lg:px-4 xl:px-6 first:lg:pl-0 last:lg:pr-0">
                <div className="p-2 border border-slate-200 rounded-lg">
                  <Maximize className="w-6 h-6 text-slate-600 stroke-[1.5]" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium whitespace-nowrap">
                    Luas Bangunan
                  </p>
                  <p className="font-bold text-[#0B1528] text-base sm:text-lg whitespace-nowrap">
                    {property.buildingArea} m²
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 lg:px-4 xl:px-6 first:lg:pl-0 last:lg:pr-0">
                <div className="p-2 border border-slate-200 rounded-lg">
                  <Bed className="w-6 h-6 text-slate-600 stroke-[1.5]" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium whitespace-nowrap">
                    Kamar Tidur
                  </p>
                  <p className="font-bold text-[#0B1528] text-base sm:text-lg whitespace-nowrap">
                    {property.bedrooms}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 lg:px-4 xl:px-6 first:lg:pl-0 last:lg:pr-0">
                <div className="p-2 border border-slate-200 rounded-lg">
                  <Bath className="w-6 h-6 text-slate-600 stroke-[1.5]" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium whitespace-nowrap">
                    Kamar Mandi
                  </p>
                  <p className="font-bold text-[#0B1528] text-base sm:text-lg whitespace-nowrap">
                    {property.bathrooms}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 lg:px-4 xl:px-6 first:lg:pl-0 last:lg:pr-0">
                <div className="p-2 border border-slate-200 rounded-lg">
                  <FileText className="w-6 h-6 text-slate-600 stroke-[1.5]" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium whitespace-nowrap">
                    Sertifikat
                  </p>
                  <p className="font-bold text-[#0B1528] text-base sm:text-lg whitespace-nowrap">
                    {property.certificate || "SHM"}
                  </p>
                </div>
              </div>
            </div>

            {/* Virtual Tour Banner or Viewer */}
            {hasTour ? (
              <div id="virtual-tour" className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm mb-8">
                <h3 className="text-2xl font-bold text-[#0B1528] mb-4">
                  Virtual Tour 360°
                </h3>
                <div className="w-full h-[500px] rounded-xl overflow-hidden relative">
                  <VirtualTourViewer data={property.virtualTourData as VirtualTourData} />
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-100 shadow-sm">
                <div className="space-y-4 max-w-sm">
                  <h3 className="text-2xl font-bold text-[#0B1528]">
                    Virtual Tour 360°
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    Properti ini belum memiliki Virtual Tour. Hubungi kami untuk meminta preview 360° untuk properti ini.
                  </p>
                  <a 
                    href={waNumber ? `https://wa.me/${waNumber}?text=${encodeURIComponent(`Halo Admin Rumio, saya tertarik dengan properti ${property.title} dan ingin info lebih lanjut tentang Request 360 Tour.`)}` : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex bg-[#0B1528] hover:bg-[#16294a] text-white gap-2 items-center justify-center h-12 px-6 rounded-xl font-semibold w-full sm:w-auto mt-2"
                  >
                    <Icon360 className="w-7 h-7 text-white mr-2" />
                    Request 360° Tour
                  </a>
                </div>
                <div className="w-full md:w-[50%] lg:w-[55%] aspect-video md:aspect-2/1 bg-black rounded-xl overflow-hidden relative shadow-inner shrink-0">
                  <img
                    src={gallery[0]?.url}
                    alt="3D Floor Plan"
                    className="w-full h-full object-cover opacity-60 scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/60 shadow-lg cursor-not-allowed">
                      <Icon360 className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Description + Detail */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Col 1: Deskripsi */}
                <div>
                  <h3 className="text-lg font-bold text-[#0B1528] mb-4">
                    Deskripsi Properti
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm mb-5">
                    {property.description ||
                      `${property.title} yang berlokasi di ${property.location} menawarkan hunian nyaman dengan ${property.bedrooms} kamar tidur, ${property.bathrooms} kamar mandi, luas bangunan ${property.buildingArea} m² di atas lahan ${property.landArea || property.buildingArea} m².`}
                  </p>
                  {property.highlights && Array.isArray(property.highlights) && property.highlights.length > 0 && (
                    <ul className="space-y-2">
                      {(property.highlights as string[]).map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm text-slate-700"
                        >
                          <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
                            <svg
                              className="w-3 h-3 text-amber-600"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Col 2: Detail Properti */}
                <div>
                  <h3 className="text-lg font-bold text-[#0B1528] mb-4">
                    Detail Properti
                  </h3>
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-slate-100">
                      {[
                        {
                          label: "ID Properti",
                          value: property.id,
                        },
                        {
                          label: "Tipe Properti",
                          value: property.propertyType || "Rumah",
                        },
                        {
                          label: "Tipe Iklan",
                          value: property.listingType || "Dijual",
                        },
                        {
                          label: "Kondisi",
                          value: property.condition || "Baru",
                        },
                        {
                          label: "Jumlah Lantai",
                          value: property.floors ? `${property.floors}` : "1",
                        },
                        {
                          label: "Daya Listrik",
                          value: property.electricity || "-",
                        },
                        { label: "Sumber Air", value: property.waterSupply || "-" },
                        { label: "Hadap", value: property.facing || "-" },
                        {
                          label: "Tahun Bangunan",
                          value: property.buildYear
                            ? `${property.buildYear}`
                            : "-",
                        },
                      ].map(({ label, value }) => (
                        <tr key={label}>
                          <td className="py-2.5 text-slate-500 w-[45%]">
                            {label}
                          </td>
                          <td className="py-2.5 text-slate-400 pr-2">:</td>
                          <td className="py-2.5 font-medium text-[#0B1528]">
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 flex flex-col gap-4">
              {/* Price / Booking Card */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-amber-200 shadow-xl shadow-amber-900/5">
                <span className="text-sm font-semibold text-amber-600 block mb-2">
                  Harga Dijual
                </span>
                <p className="text-3xl md:text-4xl font-extrabold text-[#0B1528] mb-8">
                  {formatPriceFull(property.price)}
                </p>

                <div className="mb-6 space-y-1">
                  <span className="text-sm text-slate-500">
                    Estimasi KPR mulai dari
                  </span>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-[#0B1528] text-lg">
                      {formatKPREstimate(property.price)}{" "}
                      <span className="text-sm font-normal text-slate-500">
                        / bulan
                      </span>
                    </p>
                    <a
                      href="#"
                      className="text-sm text-amber-600 hover:text-amber-700 font-semibold underline underline-offset-4 decoration-amber-600/30"
                    >
                      Simulasi KPR
                    </a>
                  </div>
                </div>

                <hr className="border-slate-100 mb-6" />

                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-5 h-5 text-amber-600" />
                    <span className="font-bold text-[#0B1528]">
                      Booking Properti Sekarang
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-2 leading-relaxed">
                    Amankan properti ini dengan booking sebesar{" "}
                    <span className="font-bold text-[#0B1528]">
                      {"Rp 5.000.000"}
                    </span>
                  </p>
                  <p className="text-xs text-slate-500">
                    100% dapat dikembalikan jika batal
                  </p>
                </div>

                <div className="space-y-4">
                  <WhatsAppBookingButton 
                    waLink={waNumber ? `https://wa.me/${waNumber}?text=${encodeURIComponent(`Halo Admin Rumio, saya tertarik untuk melakukan booking properti ${property.title} seharga ${formatPriceFull(property.price)}. Mohon info lebih lanjut.`)}` : "#"}
                    propertySlug={property.slug}
                    propertyTitle={property.title}
                    priceFormatted={formatPriceFull(property.price)}
                  />
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-500 font-medium">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Aman & Terpercaya</span>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-[#0B1528]">Lokasi Properti</h3>
                  {mapsLink && (
                    <a
                      href={mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      Lihat di Maps
                    </a>
                  )}
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-100 aspect-video">
                  {mapsEmbed ? (
                    <iframe
                      src={mapsEmbed}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Lokasi Properti"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
                      Peta tidak tersedia
                    </div>
                  )}
                </div>
                <p className="flex items-center gap-1.5 text-sm text-slate-500 mt-3">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                  {property.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

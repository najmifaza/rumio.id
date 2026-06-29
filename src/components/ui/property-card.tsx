import { Bed, Bath, Car, Maximize, ArrowRight } from "lucide-react";
import Link from "next/link";
import Icon360 from "./Icon360";
import { formatPriceFull } from "@/lib/format";

export interface PropertyCardProps {
  image: string;
  title: string;
  location: string;
  beds: number;
  baths: number;
  cars: number;
  area: number;
  priceNumeric: number;
  link: string;
  badge?: string;
  status?: string;
}

export default function PropertyCard({
  image,
  title,
  location,
  beds,
  baths,
  cars,
  area,
  priceNumeric,
  link,
  badge = "360°",
  status = "AVAILABLE",
}: PropertyCardProps) {
  const isSold = status === "SOLD";

  return (
    <div className={`bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 flex flex-col font-sans ${isSold ? 'opacity-80 grayscale-[20%]' : 'hover:shadow-xl hover:-translate-y-1 group'}`}>
      {/* Image */}
      <div className="relative h-52 overflow-hidden shrink-0">
        <img
          src={image.includes("unsplash.com") && !image.includes("?") ? `${image}?w=600&q=80&fm=webp` : image}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-500 ${!isSold && 'group-hover:scale-105'}`}
        />

        {/* Sold Overlay */}
        {isSold && (
          <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center z-10">
            <span className="bg-rose-600 text-white px-4 py-2 rounded-xl font-bold tracking-widest uppercase text-sm shadow-xl rotate-[-12deg] border-2 border-white/20 backdrop-blur-sm">
              Terjual
            </span>
          </div>
        )}

        {/* Badge */}
        {badge && !isSold && (
          <div className="absolute top-3 left-3 z-20">
            <span className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-amber-600 shadow-sm flex items-center gap-1.5">
              <Icon360 className="w-3.5 h-3.5" />
              {badge}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 relative z-20">
        <h3 className="font-bold text-lg text-[#0B1528] leading-snug mb-1 line-clamp-1">
          {title}
        </h3>

        <p className="text-sm text-slate-500 mb-5 line-clamp-1">{location}</p>

        {/* Specs */}
        <div className="flex items-center justify-between text-slate-600 mb-6">
          <div className="flex items-center gap-1" title="Kamar Tidur">
            <Bed className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium">{beds}</span>
          </div>

          <div className="flex items-center gap-1" title="Kamar Mandi">
            <Bath className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium">{baths}</span>
          </div>

          <div className="flex items-center gap-1" title="Garasi">
            <Car className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium">{cars}</span>
          </div>

          <div className="flex items-center gap-1" title="Luas Bangunan">
            <Maximize className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium ">{area} m²</span>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex flex-row items-center justify-between lg:flex-col lg:items-start gap-2 mt-auto pt-4 border-t border-slate-100">
          <p className="text-xl font-extrabold text-amber-600 tracking-tight">
            {formatPriceFull(priceNumeric)}
          </p>

          <Link
            href={link}
            className={`inline-flex items-center gap-1 text-sm font-semibold whitespace-nowrap transition-colors ${isSold ? 'text-slate-400 hover:text-slate-600' : 'text-[#0B1528] hover:text-amber-600 group/link'}`}
          >
            Lihat Detail
            <ArrowRight className={`w-4 h-4 transition-transform duration-200 ${!isSold && 'group-hover/link:translate-x-1'}`} />
          </Link>
        </div>
      </div>
    </div>
  );
}

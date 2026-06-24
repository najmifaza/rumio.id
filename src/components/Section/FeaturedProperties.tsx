import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PropertyCard from "@/components/ui/property-card";
import { mockProperties } from "@/data/properties";

export default function FeaturedProperties() {
  return (
    <section className="w-full bg-white py-24 px-6 lg:px-12 xl:px-0 font-sans">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="flex items-start justify-between mb-10 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-600 tracking-[0.15em] uppercase">
              Properti Unggulan
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1528] tracking-tight">
              Properti Terbaru dari Rumio
            </h2>
          </div>

          <Link
            href="/properti"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-amber-600 transition-colors whitespace-nowrap mt-auto group/link"
          >
            Lihat semua properti
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export interface BlogCardProps {
  image: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  description: string;
  link: string;
}

export default function BlogCard({
  image,
  category,
  date,
  readTime,
  title,
  description,
  link,
}: BlogCardProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 lg:gap-8 bg-white rounded-2xl border border-slate-100 p-4 md:p-5 hover:shadow-xl transition-all duration-300 group relative">
      {/* Image Container */}
      <div className="relative w-full md:w-[320px] lg:w-[400px] h-[240px] md:h-[280px] shrink-0 rounded-xl overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-[#D98A2C] text-white text-[11px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wider shadow-sm">
            {category}
          </span>
        </div>

        {/* Read Time Badge */}
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-1.5 bg-[#1F2937]/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-sm">
            <Clock className="w-3.5 h-3.5" />
            <span>{readTime}</span>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 py-1 md:py-4 justify-center">
        <p className="text-[13px] font-medium text-slate-500 mb-3">{date}</p>

        <h3 className="text-[22px] font-bold text-[#0B1528] mb-3.5 leading-[1.3] group-hover:text-[#D98A2C] transition-colors">
          <Link href={link} className="before:absolute before:inset-0">
            {title}
          </Link>
        </h3>

        <p className="text-slate-500 mb-6 leading-relaxed text-[15px] line-clamp-3 md:line-clamp-2">
          {description}
        </p>

        <div className="mt-auto">
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#D98A2C] transition-colors">
            Baca Selengkapnya
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </div>
  );
}

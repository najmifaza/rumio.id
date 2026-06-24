import {
  Search,
  Home,
  Box,
  Briefcase,
  TrendingUp,
  Cpu,
  FileText,
  ArrowRight,
} from "lucide-react";
import BlogCard from "@/components/ui/blog-card";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import CtaHelpCard from "@/components/ui/cta-help-card";
import { getAllBlogs } from "@/lib/blog";

export default function BlogPage() {
  const blogs = getAllBlogs();

  return (
    <main className="min-h-screen bg-slate-50 pb-20 font-sans">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[450px] lg:h-[500px] flex items-center overflow-hidden bg-white pt-20">
        {/* Background Image Container */}
        <div className="absolute top-0 right-0 w-full lg:w-[65%] h-full z-0">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1580587771525-78b9dba3b914?")',
            }}
          />
          {/* Gradient mask to blend with the white background on the left */}
          <div className="absolute inset-0 bg-linear-to-r from-white via-white/80 sm:via-white/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-0">
          <div className="max-w-2xl">
            <Breadcrumbs
              className="mb-6"
              items={[{ label: "Beranda", href: "/" }, { label: "Blog" }]}
            />
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold mb-4 md:mb-6 tracking-tight">
              <span className="text-[#0B1528]">Blog </span>
              <span className="text-amber-600">Rumio</span>
            </h1>

            <p className="text-slate-600 text-lg md:text-xl mb-8 md:mb-10 leading-relaxed max-w-[500px]">
              Tips, panduan, dan inspirasi seputar properti, pemasaran, dan
              teknologi visual.
            </p>

            {/* Search Bar */}
            <div className="relative w-full max-w-[560px] bg-white rounded-2xl border border-slate-200 shadow-sm">
              <input
                type="text"
                placeholder="Cari artikel, topik, atau kata kunci..."
                className="w-full h-14 pl-6 pr-14 text-[15px] rounded-2xl border-none outline-none focus:ring-2 focus:ring-amber-500 shadow-sm text-slate-800 placeholder:text-slate-400"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-[#0B1528] transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-0 mt-12 md:mt-16">
        <h2 className="text-2xl md:text-[28px] font-bold text-[#0B1528] mb-8">
          Artikel Terbaru
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* List Artikel */}
          <div className="lg:w-2/3 xl:w-8/12 flex flex-col gap-8">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.slug}
                image={blog.image}
                category={blog.category}
                date={blog.date}
                readTime={blog.readTime}
                title={blog.title}
                description={blog.description}
                link={`/blog/${blog.slug}`}
              />
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 xl:w-4/12">
            <div className="sticky top-28 space-y-6">
              {/* Card Kategori */}
              <div className="bg-white rounded-[20px] border border-slate-100 p-6 lg:p-8 shadow-sm">
                <h3 className="text-[19px] font-bold text-[#0B1528] mb-6">
                  Kategori
                </h3>

                <ul className="space-y-5">
                  <li className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3.5 text-slate-500 group-hover:text-[#0B1528] transition-colors">
                      <Home className="w-[18px] h-[18px] stroke-[2]" />
                      <span className="font-medium text-[15px]">
                        Tips Properti
                      </span>
                    </div>
                    <span className="text-slate-400 text-[13px] font-medium border border-slate-200 px-2.5 py-0.5 rounded-lg group-hover:border-slate-300 group-hover:text-slate-600 transition-colors">
                      12
                    </span>
                  </li>

                  <li className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3.5 text-slate-500 group-hover:text-[#0B1528] transition-colors">
                      <Box className="w-[18px] h-[18px] stroke-[2]" />
                      <span className="font-medium text-[15px]">
                        Virtual Tour
                      </span>
                    </div>
                    <span className="text-slate-400 text-[13px] font-medium border border-slate-200 px-2.5 py-0.5 rounded-lg group-hover:border-slate-300 group-hover:text-slate-600 transition-colors">
                      8
                    </span>
                  </li>

                  <li className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3.5 text-slate-500 group-hover:text-[#0B1528] transition-colors">
                      <Briefcase className="w-[18px] h-[18px] stroke-[2]" />
                      <span className="font-medium text-[15px]">
                        Marketing Properti
                      </span>
                    </div>
                    <span className="text-slate-400 text-[13px] font-medium border border-slate-200 px-2.5 py-0.5 rounded-lg group-hover:border-slate-300 group-hover:text-slate-600 transition-colors">
                      10
                    </span>
                  </li>

                  <li className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3.5 text-slate-500 group-hover:text-[#0B1528] transition-colors">
                      <TrendingUp className="w-[18px] h-[18px] stroke-[2]" />
                      <span className="font-medium text-[15px]">Investasi</span>
                    </div>
                    <span className="text-slate-400 text-[13px] font-medium border border-slate-200 px-2.5 py-0.5 rounded-lg group-hover:border-slate-300 group-hover:text-slate-600 transition-colors">
                      9
                    </span>
                  </li>

                  <li className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3.5 text-slate-500 group-hover:text-[#0B1528] transition-colors">
                      <Cpu className="w-[18px] h-[18px] stroke-[2]" />
                      <span className="font-medium text-[15px]">Teknologi</span>
                    </div>
                    <span className="text-slate-400 text-[13px] font-medium border border-slate-200 px-2.5 py-0.5 rounded-lg group-hover:border-slate-300 group-hover:text-slate-600 transition-colors">
                      7
                    </span>
                  </li>

                  <li className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3.5 text-slate-500 group-hover:text-[#0B1528] transition-colors">
                      <FileText className="w-[18px] h-[18px] stroke-[2]" />
                      <span className="font-medium text-[15px]">Panduan</span>
                    </div>
                    <span className="text-slate-400 text-[13px] font-medium border border-slate-200 px-2.5 py-0.5 rounded-lg group-hover:border-slate-300 group-hover:text-slate-600 transition-colors">
                      6
                    </span>
                  </li>
                </ul>
              </div>

              {/* Card CTA Pemasaran */}
              <CtaHelpCard />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

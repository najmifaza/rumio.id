import {
  Home,
  Box,
  Briefcase,
  TrendingUp,
  Cpu,
  FileText,
} from "lucide-react";
import Link from "next/link";
import BlogCard from "@/components/ui/blog-card";
import HeroBlog from "@/components/Section/HeroBlog";
import CtaHelpCard from "@/components/ui/cta-help-card";
import { getAllBlogs, getBlogCategories } from "@/lib/blog";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
  const category = typeof searchParams.category === "string" ? searchParams.category : undefined;

  const { data: blogs, total, totalPages } = await getAllBlogs({ page, limit: 5, category });
  const categories = await getBlogCategories();



  const getCategoryIcon = (category: string) => {
    const lowerCat = category.toLowerCase();
    if (lowerCat.includes("properti")) return <Home className="w-[18px] h-[18px] stroke-2" />;
    if (lowerCat.includes("virtual")) return <Box className="w-[18px] h-[18px] stroke-2" />;
    if (lowerCat.includes("marketing") || lowerCat.includes("bisnis")) return <Briefcase className="w-[18px] h-[18px] stroke-2" />;
    if (lowerCat.includes("investasi") || lowerCat.includes("tren")) return <TrendingUp className="w-[18px] h-[18px] stroke-2" />;
    if (lowerCat.includes("teknologi") || lowerCat.includes("tech")) return <Cpu className="w-[18px] h-[18px] stroke-2" />;
    return <FileText className="w-[18px] h-[18px] stroke-2" />;
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20 font-sans">
      <HeroBlog />

      {/* Main Content Area */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-0 mt-12 md:mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-[#0B1528]">
            {category ? `Artikel: ${category}` : "Artikel Terbaru"}
          </h2>
          {category && (
            <Link href="/blog" className="text-sm text-amber-600 font-semibold hover:text-amber-700">
              Lihat Semua Artikel
            </Link>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* List Artikel */}
          <div className="lg:w-2/3 xl:w-8/12 flex flex-col gap-8">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <BlogCard
                  key={blog.slug}
                  image={blog.image}
                  category={blog.category}
                  date={blog.date}
                  readTime={blog.readTime}
                  title={blog.title}
                  description={blog.description}
                  link={`/blog/${blog.slug}`}
                  author={blog.author}
                />
              ))
            ) : (
              <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm">
                <h3 className="text-lg font-bold text-[#0B1528] mb-2">Belum ada artikel</h3>
                <p className="text-slate-500">Artikel untuk kategori ini belum tersedia.</p>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-4">
                <Link
                  href={`/blog?page=${Math.max(1, page - 1)}${category ? `&category=${encodeURIComponent(category)}` : ""}`}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg border ${page === 1 ? 'border-slate-200 text-slate-300 pointer-events-none' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Link>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Link
                    key={i}
                    href={`/blog?page=${i + 1}${category ? `&category=${encodeURIComponent(category)}` : ""}`}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg border font-semibold text-sm transition-colors ${
                      page === i + 1
                        ? "bg-[#0B1528] border-[#0B1528] text-white pointer-events-none"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {i + 1}
                  </Link>
                ))}

                <Link
                  href={`/blog?page=${Math.min(totalPages, page + 1)}${category ? `&category=${encodeURIComponent(category)}` : ""}`}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg border ${page === totalPages ? 'border-slate-200 text-slate-300 pointer-events-none' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            )}
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
                  {categories.map((cat, idx) => (
                    <Link 
                      href={`/blog?category=${encodeURIComponent(cat.name)}`}
                      key={idx} 
                      className="flex items-center justify-between group cursor-pointer"
                    >
                      <div className={`flex items-center gap-3.5 transition-colors ${category === cat.name ? 'text-amber-600' : 'text-slate-500 group-hover:text-[#0B1528]'}`}>
                        {getCategoryIcon(cat.name)}
                        <span className="font-medium text-[15px]">
                          {cat.name}
                        </span>
                      </div>
                      <span className={`text-[13px] font-medium border px-2.5 py-0.5 rounded-lg transition-colors ${category === cat.name ? 'border-amber-200 text-amber-700 bg-amber-50' : 'text-slate-400 border-slate-200 group-hover:border-slate-300 group-hover:text-slate-600'}`}>
                        {cat.count}
                      </span>
                    </Link>
                  ))}
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

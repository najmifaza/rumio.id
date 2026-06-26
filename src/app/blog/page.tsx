import {
  Home,
  Box,
  Briefcase,
  TrendingUp,
  Cpu,
  FileText,
} from "lucide-react";
import BlogCard from "@/components/ui/blog-card";
import HeroBlog from "@/components/Section/HeroBlog";
import CtaHelpCard from "@/components/ui/cta-help-card";
import { getAllBlogs } from "@/lib/blog";

export default async function BlogPage() {
  const blogs = await getAllBlogs();

  const categoryCounts = blogs.reduce((acc, blog) => {
    acc[blog.category] = (acc[blog.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categories = Object.entries(categoryCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

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
                author={blog.author}
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
                  {categories.map((cat, idx) => (
                    <li key={idx} className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-3.5 text-slate-500 group-hover:text-[#0B1528] transition-colors">
                        {getCategoryIcon(cat.name)}
                        <span className="font-medium text-[15px]">
                          {cat.name}
                        </span>
                      </div>
                      <span className="text-slate-400 text-[13px] font-medium border border-slate-200 px-2.5 py-0.5 rounded-lg group-hover:border-slate-300 group-hover:text-slate-600 transition-colors">
                        {cat.count}
                      </span>
                    </li>
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

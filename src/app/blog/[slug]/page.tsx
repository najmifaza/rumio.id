import { getBlogData, getAllBlogs } from "@/lib/blog";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import CtaHelpCard from "@/components/ui/cta-help-card";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { sanitizeBlogContent } from "@/lib/sanitize";

// This allows Next.js to generate static pages for each blog
export async function generateStaticParams() {
  const { data: blogs } = await getAllBlogs({ limit: 1000 });
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogData(slug);

  if (!blog) {
    return {
      title: "Artikel Tidak Ditemukan | Rumio.id",
    };
  }

  const title = `${blog.title} | Rumio.id Blog`;
  const url = `https://rumio.id/blog/${blog.slug}`;

  return {
    title,
    description: blog.description,
    openGraph: {
      title,
      description: blog.description,
      url,
      type: "article",
      images: [
        {
          url: blog.image.startsWith('http') ? blog.image : `https://rumio.id${blog.image}`,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: blog.description,
      images: [blog.image],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogData(slug);

  if (!blog) {
    notFound();
  }

  // Ambil semua artikel untuk kebutuhan artikel terkait dan populer
  const { data: allBlogs } = await getAllBlogs({ limit: 10 });

  // Artikel Terkait: kategori sama, kecualikan artikel aktif saat ini
  let relatedPosts = allBlogs.filter(
    (b) => b.category === blog.category && b.slug !== slug,
  );

  // Jika artikel dengan kategori sama kurang dari 3, isi dengan artikel terbaru lainnya
  if (relatedPosts.length < 3) {
    const fallbackPosts = allBlogs.filter(
      (b) => b.slug !== slug && !relatedPosts.some((r) => r.slug === b.slug),
    );
    relatedPosts = [...relatedPosts, ...fallbackPosts].slice(0, 3);
  } else {
    relatedPosts = relatedPosts.slice(0, 3);
  }

  // Blog Populer: Ambil artikel lain dan urutkan berdasarkan view terbanyak
  const popularPosts = allBlogs
    .filter((b) => b.slug !== slug)
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-50 pb-20 font-sans pt-28">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-0">
        {/* Back Link & Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Beranda", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: blog.title },
            ]}
          />
        </div>

        {/* 2-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          {/* Main Content Area (Left) */}
          <div className="w-full lg:w-2/3 xl:w-8/12">
            <article className=" border-slate-100">
              {/* Header */}
              <header className="mb-8 text-left">
                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-4 inline-block">
                  {blog.category}
                </span>

                <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#0B1528] mb-6 leading-tight">
                  {blog.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <span>Oleh <span className="font-bold text-[#0B1528]">{blog.author}</span></span>
                  </div>
                  <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>
              </header>

              {/* Featured Image */}
              <div className="w-full aspect-video rounded-2xl overflow-hidden mb-10 shadow-sm">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div
                className="prose prose-slate prose-lg max-w-none prose-headings:text-[#0B1528] prose-a:text-amber-600 hover:prose-a:text-amber-700 prose-img:rounded-xl prose-headings:font-bold prose-p:my-4 prose-li:my-0 [&_ul_li_p]:my-0 [&_ol_li_p]:my-0 [&_ul]:my-4"
                dangerouslySetInnerHTML={{ __html: sanitizeBlogContent(blog.content) }}
              />
            </article>

            {/* Footer actions */}
            <div className="mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Daftar Blog
              </Link>
            </div>
          </div>

          {/* Sidebar (Right) - Blog Populer */}
          <div className="w-full lg:w-1/3 xl:w-4/12 lg:sticky lg:top-28 flex flex-col gap-6">
            <div className="bg-white rounded-3xl border border-slate-100 p-6 lg:p-8 shadow-sm">
              <h3 className="text-[19px] font-bold text-[#0B1528] mb-6 border-b border-slate-100 pb-3">
                Blog Populer
              </h3>

              <div className="flex flex-col gap-6">
                {popularPosts.map((post) => (
                  <Link
                    href={`/blog/${post.slug}`}
                    key={post.slug}
                    className="flex gap-4 group cursor-pointer"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                      <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1">
                        {post.category}
                      </span>
                      <h4 className="text-sm font-bold text-[#0B1528] line-clamp-2 group-hover:text-amber-600 transition-colors leading-snug mb-1">
                        {post.title}
                      </h4>
                      <span className="text-xs text-slate-400">
                        {post.date}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>{" "}
            <CtaHelpCard />
          </div>
        </div>

        {/* Related Posts Section (Bottom) */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 border-t border-slate-200 pt-16">
            <h3 className="text-2xl font-bold text-[#0B1528] mb-8">
              Artikel Terkait
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post.slug}
                  className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full cursor-pointer"
                >
                  <div className="w-full aspect-16/10 rounded-xl overflow-hidden mb-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                    <span className="text-amber-600 font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <h4 className="font-bold text-[#0B1528] group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug mb-2">
                    {post.title}
                  </h4>
                  <p className="text-slate-500 text-[13px] line-clamp-2 mb-4 mt-auto">
                    {post.description}
                  </p>
                  <span className="text-xs font-bold text-amber-600 group-hover:text-amber-700 transition-colors inline-flex items-center gap-1">
                    Baca Selengkapnya
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      &rarr;
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

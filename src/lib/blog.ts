import { prisma } from "./prisma";

export interface BlogData {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  description: string;
  content: string;
  author: string;
  viewCount: number;
}

const stripHtml = (html: string) => {
  if (!html) return '';
  // Replace HTML tags with a space to avoid words sticking together
  const text = html.replace(/<[^>]*>?/gm, ' ');
  // Replace multiple spaces with a single space
  return text.replace(/\s+/g, ' ').trim();
};

export async function getBlogCategories() {
  const blogs = await prisma.blog.groupBy({
    by: ['category'],
    _count: {
      category: true,
    },
  });

  return blogs
    .map(b => ({
      name: b.category,
      count: b._count.category
    }))
    .sort((a, b) => b.count - a.count);
}

export async function getAllBlogs({
  page = 1,
  limit = 10,
  category,
}: {
  page?: number;
  limit?: number;
  category?: string;
} = {}): Promise<{ data: Omit<BlogData, "content">[], total: number, totalPages: number }> {
  const skip = (page - 1) * limit;
  const where = category ? { category } : {};

  const [blogs, total] = await Promise.all([
    prisma.blog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.blog.count({ where })
  ]);

  const data = blogs.map(blog => ({
    slug: blog.slug,
    title: blog.title,
    category: blog.category,
    date: blog.createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    readTime: `${Math.max(1, Math.ceil(blog.content.length / 1000))} Min Read`,
    image: blog.featuredImage || "/placeholder-image.jpg",
    description: stripHtml(blog.content).substring(0, 150) + "...",
    author: blog.author,
    viewCount: blog.viewCount,
  }));

  return {
    data,
    total,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getBlogData(slug: string): Promise<BlogData | null> {
  const blog = await prisma.blog.findUnique({
    where: { slug }
  });

  if (!blog) return null;

  // Update view count
  await prisma.blog.update({
    where: { id: blog.id },
    data: { viewCount: { increment: 1 } }
  });

  return {
    slug: blog.slug,
    title: blog.title,
    category: blog.category,
    date: blog.createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    readTime: `${Math.max(1, Math.ceil(blog.content.length / 1000))} Min Read`,
    image: blog.featuredImage || "/placeholder-image.jpg",
    description: stripHtml(blog.content).substring(0, 150) + "...",
    content: blog.content,
    author: blog.author,
    viewCount: blog.viewCount,
  };
}

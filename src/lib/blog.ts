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

export async function getAllBlogs(): Promise<Omit<BlogData, "content">[]> {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return blogs.map(blog => ({
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

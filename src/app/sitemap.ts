import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://rumio.id'

  // Get all active properties
  const properties = await prisma.property.findMany({
    where: { status: { not: 'SOLD' } },
    select: {
      slug: true,
      createdAt: true,
    }
  })

  const propertyUrls = properties.map((property) => ({
    url: `${baseUrl}/properti/${property.slug}`,
    lastModified: property.createdAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Get all blogs
  const blogs = await prisma.blog.findMany({
    select: {
      slug: true,
      createdAt: true,
    }
  })

  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: blog.createdAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Static routes
  const staticRoutes = [
    '',
    '/properti',
    '/blog',
    '/tentang-kami',
    '/property-scout',
    '/pricing',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return [...staticRoutes, ...propertyUrls, ...blogUrls]
}

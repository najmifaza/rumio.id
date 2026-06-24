import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogsDirectory = path.join(process.cwd(), "src/data/blogs");

export interface BlogData {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  description: string;
  content: string;
}

export function getAllBlogs(): Omit<BlogData, "content">[] {
  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogsDirectory);
  const allBlogsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const slug = fileName.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(blogsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      return {
        slug,
        title: matterResult.data.title,
        category: matterResult.data.category,
        date: matterResult.data.date,
        readTime: matterResult.data.readTime,
        image: matterResult.data.image,
        description: matterResult.data.description,
      };
    });

  return allBlogsData;
}

export function getBlogData(slug: string): BlogData | null {
  const fullPath = path.join(blogsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  return {
    slug,
    title: matterResult.data.title,
    category: matterResult.data.category,
    date: matterResult.data.date,
    readTime: matterResult.data.readTime,
    image: matterResult.data.image,
    description: matterResult.data.description,
    content: matterResult.content,
  };
}

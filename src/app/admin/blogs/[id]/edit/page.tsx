import { prisma } from "@/lib/prisma";
import BlogForm from "@/components/admin/BlogForm";
import { notFound } from "next/navigation";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const blog = await prisma.blog.findUnique({
    where: { id },
  });

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#0B1528] mb-1">Edit Artikel</h1>
        <p className="text-slate-500 font-medium">Perbarui konten artikel blog Anda.</p>
      </div>

      <BlogForm initialData={blog} />
    </div>
  );
}

import BlogForm from "@/components/admin/BlogForm";

export default function CreateBlogPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#0B1528] mb-1">Tambah Artikel</h1>
        <p className="text-slate-500 font-medium">Buat konten artikel baru untuk blog Anda.</p>
      </div>
      
      <BlogForm />
    </div>
  );
}

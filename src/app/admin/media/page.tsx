import { prisma } from "@/lib/prisma";
import MediaGallery from "@/components/admin/MediaGallery";
import Breadcrumbs from "@/components/ui/breadcrumbs";

export const dynamic = "force-dynamic";

export default async function MediaAdminPage() {
  const assets = await prisma.mediaAsset.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "Galeri Media" },
        ]}
      />
      <div>
        <h1 className="text-2xl font-bold text-[#0B1528]">Pustaka Media</h1>
        <p className="text-sm text-slate-500 mt-1">
          Kelola semua gambar, video, dan berkas yang diunggah secara terpusat.
        </p>
      </div>

      <div className="flex-1 min-h-0">
        <MediaGallery initialAssets={assets} />
      </div>
    </div>
  );
}

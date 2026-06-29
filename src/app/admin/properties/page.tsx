import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPriceFull } from "@/lib/format";
import DeletePropertyButton from "@/components/admin/DeletePropertyButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Helper component untuk merender tabel
function PropertyTable({ properties, emptyMessage, isAdmin }: { properties: any[], emptyMessage: string, isAdmin: boolean }) {
  return (
    <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden mb-12">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">Properti</th>
              <th className="px-6 py-4">Tipe & Status</th>
              <th className="px-6 py-4">Harga</th>
              <th className="px-6 py-4 text-center">Views</th>
              <th className="px-6 py-4 text-center">WA Clicks</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {properties.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              properties.map((prop) => (
                <tr key={prop.id} className={`transition-colors ${prop.status === 'SOLD' ? 'bg-slate-50 opacity-80' : 'hover:bg-slate-50'}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200 relative">
                        <img
                          src={prop.featuredImage || "/placeholder-image.jpg"}
                          alt={prop.title}
                          className={`w-full h-full object-cover ${prop.status === 'SOLD' ? 'grayscale' : ''}`}
                        />
                      </div>
                      <div>
                        <p className="font-bold text-[#0B1528] text-[15px] mb-0.5 line-clamp-1">{prop.title}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1 line-clamp-1">
                          {prop.location}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5 items-start">
                      <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md text-xs font-semibold border border-blue-100">
                        {prop.propertyType}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold border ${prop.listingType === 'Dijual' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                        {prop.listingType}
                      </span>
                      {prop.status === 'SOLD' && (
                        <span className="bg-rose-100 text-rose-700 px-2.5 py-0.5 rounded-md text-xs font-bold border border-rose-200">
                          Terjual
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-[#0B1528]">
                    {formatPriceFull(prop.price)}
                  </td>
                  <td className="px-6 py-4 text-center font-medium">
                    {prop.viewCount}
                  </td>
                  <td className="px-6 py-4 text-center font-medium text-emerald-600">
                    {(prop as any).whatsappClicks || 0}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/properti/${prop.slug}`} target="_blank">
                        <Button variant="outline" size="icon" className="w-9 h-9 rounded-lg border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      {isAdmin && (
                        <>
                          <Link href={`/admin/properties/${prop.id}/edit`}>
                            <Button variant="outline" size="icon" className="w-9 h-9 rounded-lg border-slate-200 text-slate-500 hover:text-amber-600 hover:bg-amber-50">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <DeletePropertyButton id={prop.id} />
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default async function AdminPropertiesPage() {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === "ADMIN";
  const userId = session?.user?.id as string;

  // ADMIN lihat semua, OWNER hanya lihat yang di-assign ke mereka
  const whereClause = isAdmin ? {} : { ownerId: userId };

  const properties = await prisma.property.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    include: { owner: { select: { name: true } } },
  });

  const availableProperties = properties.filter(p => p.status !== 'SOLD');
  const soldProperties = properties.filter(p => p.status === 'SOLD');

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#0B1528] mb-1">Daftar Properti</h1>
          <p className="text-slate-500 font-medium">
            {isAdmin ? "Kelola semua listing properti di sini." : "Properti yang di-assign kepada Anda."}
          </p>
        </div>
        {isAdmin && (
          <Link href="/admin/properties/create">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white font-bold h-11 px-6 rounded-xl flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Tambah Properti
            </Button>
          </Link>
        )}
      </div>

      <h2 className="text-xl font-bold text-[#0B1528] mb-4">Properti Aktif</h2>
      <PropertyTable 
        properties={availableProperties} 
        emptyMessage={isAdmin ? "Belum ada data properti aktif." : "Belum ada properti yang di-assign kepada Anda."}
        isAdmin={isAdmin}
      />

      {soldProperties.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-[#0B1528] mb-4">Properti Terjual</h2>
          <PropertyTable 
            properties={soldProperties} 
            emptyMessage="Belum ada properti yang terjual."
            isAdmin={isAdmin}
          />
        </>
      )}
    </div>
  );
}

import { prisma } from "@/lib/prisma";
import { Users, Calendar, User, Phone, MapPin, Mail } from "lucide-react";
import { ScoutStatusSelect, DeleteScoutButton } from "./ScoutActions";

export const dynamic = "force-dynamic";

export default async function AdminScoutPage() {
  const scouts = await prisma.propertyScout.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1528] flex items-center gap-2">
            <Users className="w-6 h-6 text-amber-600" />
            Pendaftaran Property Scout
          </h1>
          <p className="text-slate-500 mt-1">
            Kelola calon partner scout yang ingin bergabung.
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Pendaftar</th>
                <th className="px-6 py-4">Kontak</th>
                <th className="px-6 py-4">Kota Domisili</th>
                <th className="px-6 py-4">Tanggal Daftar</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {scouts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Users className="w-12 h-12 mb-3 opacity-20" />
                      <p className="font-medium text-slate-500">Belum ada pendaftar Property Scout.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                scouts.map((scout) => (
                  <tr key={scout.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-800 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        {scout.fullName}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <a 
                          href={`https://wa.me/${scout.whatsapp.replace(/[^0-9]/g, '')}?text=Halo%20${scout.fullName},%20saya%20dari%20Rumio...`} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-600 hover:text-amber-700 flex items-center gap-1.5 font-medium"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          {scout.whatsapp}
                        </a>
                        <div className="flex items-center gap-1.5 text-slate-500 mt-1 text-xs">
                          <Mail className="w-3.5 h-3.5" />
                          {scout.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 font-medium text-slate-700 capitalize">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {scout.city}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Calendar className="w-3.5 h-3.5" />
                        {scout.createdAt.toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <ScoutStatusSelect id={scout.id} currentStatus={scout.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DeleteScoutButton id={scout.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

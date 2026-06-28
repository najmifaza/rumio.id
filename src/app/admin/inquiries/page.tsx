import { prisma } from "@/lib/prisma";
import {
  MessageSquare,
  Calendar,
  User,
  Phone,
  MapPin,
  Tag,
} from "lucide-react";
import { InquiryStatusSelect, DeleteInquiryButton } from "./inquiries-client";

export const dynamic = "force-dynamic";

export default async function InquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1528] flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-amber-600" />
            Inbox Permintaan
          </h1>
          <p className="text-slate-500 mt-1">
            Kelola permintaan properti masuk dari pelanggan (Titip Jual / Cari
            Properti).
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Tipe</th>
                <th className="px-6 py-4">Pelanggan</th>
                <th className="px-6 py-4">Kriteria / Lokasi</th>
                <th className="px-6 py-4">Budget / Harga</th>
                <th className="px-6 py-4">Tanggal Masuk</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <MessageSquare className="w-12 h-12 mb-3 opacity-20" />
                      <p className="font-medium text-slate-500">
                        Belum ada permintaan masuk.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold ${
                          inq.type === "CARI_PROPERTI"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {inq.type === "CARI_PROPERTI"
                          ? "CARI PROPERTI"
                          : "TITIP JUAL"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          {inq.name}
                        </span>
                        <a
                          href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=Halo%20${inq.name},%20saya%20dari%20Rumio...`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-600 hover:text-amber-700 flex items-center gap-1.5 mt-1 text-xs font-medium"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          {inq.phone}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5 text-xs">
                        <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                          <Tag className="w-3.5 h-3.5 text-slate-400" />
                          {inq.transactionType} • {inq.propertyType}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {inq.location}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {inq.budgetOrPrice || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Calendar className="w-3.5 h-3.5" />
                        {inq.createdAt.toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <InquiryStatusSelect
                        id={inq.id}
                        currentStatus={inq.status}
                      />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DeleteInquiryButton id={inq.id} />
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

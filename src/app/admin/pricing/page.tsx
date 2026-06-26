import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Tag, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PricingAdminPage() {
  const plans = await prisma.pricingPlan.findMany({
    include: {
      features: {
        orderBy: { sortOrder: 'asc' }
      }
    },
    orderBy: { price: 'asc' }
  });

  const addons = await prisma.addonPlan.findMany({
    orderBy: { price: 'asc' }
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1528]">Harga & Paket</h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola paket berlangganan dan layanan tambahan untuk pengguna.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/pricing/addons/new"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Addon Baru
          </Link>
          <Link
            href="/admin/pricing/plans/new"
            className="flex items-center gap-2 px-4 py-2 bg-[#0B1528] text-white rounded-lg text-sm font-semibold hover:bg-[#1a2b4c] transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Paket Baru
          </Link>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#0B1528] flex items-center gap-2">
          <Tag className="w-5 h-5 text-amber-500" />
          Paket Berlangganan Utama
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative overflow-hidden flex flex-col">
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                  Populer
                </div>
              )}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-[#0B1528]">{plan.name}</h3>
                <p className="text-sm text-slate-500 mt-1 line-clamp-2">{plan.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold text-[#0B1528]">
                  Rp {plan.price.toLocaleString("id-ID")}
                </span>
                <span className="text-slate-500 text-sm">/bulan</span>
              </div>
              
              <div className="space-y-3 mb-8 flex-1">
                {plan.features.slice(0, 4).map((feature) => (
                  <div key={feature.id} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600 line-clamp-2">{feature.text}</span>
                  </div>
                ))}
                {plan.features.length > 4 && (
                  <div className="text-xs font-medium text-slate-400 pl-6">
                    + {plan.features.length - 4} fitur lainnya
                  </div>
                )}
              </div>

              <Link 
                href={`/admin/pricing/plans/${plan.id}/edit`}
                className="w-full py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Paket
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Addons */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h2 className="text-lg font-bold text-[#0B1528] flex items-center gap-2">
          <Tag className="w-5 h-5 text-blue-500" />
          Layanan Tambahan (Add-ons)
        </h2>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-700">Nama Addon</th>
                  <th className="px-6 py-4 font-semibold text-slate-700">Deskripsi</th>
                  <th className="px-6 py-4 font-semibold text-slate-700">Harga</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {addons.map((addon) => (
                  <tr key={addon.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-[#0B1528]">{addon.name}</td>
                    <td className="px-6 py-4 text-slate-500">{addon.description}</td>
                    <td className="px-6 py-4 font-medium text-slate-700">
                      Rp {addon.price.toLocaleString("id-ID")} {addon.priceSuffix && <span className="text-slate-400 font-normal">{addon.priceSuffix}</span>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/admin/pricing/addons/${addon.id}/edit`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        <Edit className="w-4 h-4" /> Edit
                      </Link>
                    </td>
                  </tr>
                ))}
                {addons.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-slate-400">
                      Belum ada layanan tambahan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

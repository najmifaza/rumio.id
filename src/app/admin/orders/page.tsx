import { prisma } from "@/lib/prisma";
import { ShoppingCart, Calendar, User, Phone, MapPin, Tag, FileText } from "lucide-react";
import { OrderStatusSelect, DeleteOrderButton } from "./orders-client";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.packageOrder.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1528] flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-amber-600" />
            Kelola Pesanan Paket
          </h1>
          <p className="text-slate-500 mt-1">
            Pantau dan kelola semua pesanan paket listing properti dari pelanggan.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Paket & Properti</th>
                <th className="px-6 py-4">Pemesan</th>
                <th className="px-6 py-4">Total & Metode</th>
                <th className="px-6 py-4">Tanggal Pesanan</th>
                <th className="px-6 py-4">Bukti Bayar</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <ShoppingCart className="w-12 h-12 mb-3 opacity-20" />
                      <p className="font-medium text-slate-500">Belum ada pesanan masuk.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                orders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5 text-xs">
                        <span className="font-bold text-slate-800 text-sm">{order.planName}</span>
                        <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                          <Tag className="w-3.5 h-3.5 text-slate-400" />
                          {order.propertyType}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {order.location}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          {order.customerName}
                        </span>
                        <a 
                          href={`https://wa.me/${order.whatsapp.replace(/^0/, '62')}`} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-600 hover:text-amber-700 flex items-center gap-1.5 mt-1 text-xs font-medium"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          {order.whatsapp}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800">Rp {order.totalPrice.toLocaleString("id-ID")}</p>
                      <span className="inline-flex mt-1 px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-bold uppercase">{order.paymentMethod}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(order.createdAt).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <a href={order.proofUrl} target="_blank" className="inline-flex items-center gap-1.5 text-amber-600 hover:text-amber-700 font-medium text-xs bg-amber-50 px-3 py-1.5 rounded-lg transition-colors">
                        <FileText className="w-4 h-4" />
                        Lihat Bukti
                      </a>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <OrderStatusSelect id={order.id} currentStatus={order.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DeleteOrderButton id={order.id} />
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

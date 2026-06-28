"use client";

import { useState } from "react";
import { updateOrderStatus, deleteOrder } from "@/app/actions/order";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";

export function OrderStatusSelect({ id, currentStatus }: { id: string; currentStatus: string }) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setIsUpdating(true);
    try {
      const res = await updateOrderStatus(id, newStatus);
      if (res.success) {
        router.refresh();
      } else {
        alert("Gagal memperbarui status.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <select
      value={currentStatus}
      onChange={handleStatusChange}
      disabled={isUpdating}
      className={`text-xs font-semibold px-2 py-1 rounded-md border ${
        currentStatus === "PENDING"
          ? "bg-blue-50 text-blue-700 border-blue-200"
          : currentStatus === "CONFIRMED"
          ? "bg-green-50 text-green-700 border-green-200"
          : "bg-red-50 text-red-700 border-red-200"
      }`}
    >
      <option value="PENDING">PENDING</option>
      <option value="CONFIRMED">CONFIRMED</option>
      <option value="REJECTED">REJECTED</option>
    </select>
  );
}

export function DeleteOrderButton({ id }: { id: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Yakin ingin menghapus pesanan ini secara permanen?")) return;
    
    setIsDeleting(true);
    try {
      const res = await deleteOrder(id);
      if (res.success) {
        router.refresh();
      } else {
        alert("Gagal menghapus pesanan.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan sistem.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
      title="Hapus Pesanan"
    >
      {isDeleting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  );
}

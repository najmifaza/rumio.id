"use client";

import { useState } from "react";
import { updateOrderStatus, deleteOrder } from "@/app/actions/order";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { useConfirm } from "@/components/ui/ConfirmDialog";

export function OrderStatusSelect({ id, currentStatus }: { id: string; currentStatus: string }) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const { showToast } = useToast();

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setIsUpdating(true);
    try {
      const res = await updateOrderStatus(id, newStatus);
      if (res.success) {
        showToast("Status pesanan diperbarui", "success");
        router.refresh();
      } else {
        showToast("Gagal memperbarui status", "error");
      }
    } catch (error) {
      console.error(error);
      showToast("Terjadi kesalahan sistem", "error");
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
  const { showToast } = useToast();
  const { confirm } = useConfirm();

  const handleDelete = async () => {
    if (!(await confirm({ message: "Yakin ingin menghapus pesanan ini secara permanen?", confirmText: "Ya, Hapus" }))) return;
    
    setIsDeleting(true);
    try {
      const res = await deleteOrder(id);
      if (res.success) {
        showToast("Pesanan berhasil dihapus", "success");
        router.refresh();
      } else {
        showToast("Gagal menghapus pesanan", "error");
      }
    } catch (error) {
      console.error(error);
      showToast("Terjadi kesalahan sistem", "error");
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

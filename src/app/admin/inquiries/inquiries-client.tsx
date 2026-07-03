"use client";

import { useState } from "react";
import { updateInquiryStatus, deleteInquiry } from "./actions";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { useConfirm } from "@/components/ui/ConfirmDialog";

export function InquiryStatusSelect({ id, currentStatus }: { id: string; currentStatus: string }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { showToast } = useToast();

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsUpdating(true);
    const res = await updateInquiryStatus(id, e.target.value);
    setIsUpdating(false);
    if (!res.success) {
      showToast(res.error || "Gagal memperbarui status", "error");
    } else {
      showToast("Status diperbarui", "success");
    }
  };

  return (
    <select
      value={currentStatus}
      onChange={handleStatusChange}
      disabled={isUpdating}
      className={`text-xs font-semibold px-2 py-1 rounded-md border ${
        currentStatus === "NEW" 
          ? "bg-blue-50 text-blue-700 border-blue-200" 
          : currentStatus === "CONTACTED"
          ? "bg-amber-50 text-amber-700 border-amber-200"
          : "bg-green-50 text-green-700 border-green-200"
      }`}
    >
      <option value="NEW">Baru</option>
      <option value="CONTACTED">Dihubungi</option>
      <option value="DONE">Selesai</option>
    </select>
  );
}

export function DeleteInquiryButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { showToast } = useToast();
  const { confirm } = useConfirm();

  const handleDelete = async () => {
    if (!(await confirm({ message: "Apakah Anda yakin ingin menghapus data ini?", confirmText: "Ya, Hapus" }))) return;
    
    setIsDeleting(true);
    const res = await deleteInquiry(id);
    if (!res.success) {
      setIsDeleting(false);
      showToast(res.error || "Gagal menghapus data", "error");
    } else {
      showToast("Data berhasil dihapus", "success");
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
      title="Hapus"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}

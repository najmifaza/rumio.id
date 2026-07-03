"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteBlog } from "@/app/admin/blogs/actions";
import { useToast } from "@/components/ui/Toast";
import { useConfirm } from "@/components/ui/ConfirmDialog";

export default function DeleteBlogButton({ id }: { id: string }) {
  const { showToast } = useToast();
  const { confirm } = useConfirm();

  const handleDelete = async () => {
    if (await confirm({ message: "Yakin ingin menghapus blog/artikel ini? Tindakan ini tidak dapat dibatalkan.", confirmText: "Ya, Hapus" })) {
      const res = await deleteBlog(id);
      if (!res.success) {
        showToast(res.error || "Gagal menghapus blog", "error");
      } else {
        showToast("Blog berhasil dihapus", "success");
      }
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleDelete}
      className="w-9 h-9 rounded-lg border-slate-200 text-slate-500 hover:text-red-600 hover:bg-red-50"
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  );
}

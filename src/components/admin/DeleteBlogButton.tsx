"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteBlog } from "@/app/admin/blogs/actions";

export default function DeleteBlogButton({ id }: { id: string }) {
  const handleDelete = async () => {
    if (confirm("Yakin ingin menghapus blog/artikel ini? Tindakan ini tidak dapat dibatalkan.")) {
      const res = await deleteBlog(id);
      if (!res.success) {
        alert(res.error);
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

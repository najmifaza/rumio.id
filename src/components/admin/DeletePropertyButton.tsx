"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteProperty } from "@/app/admin/properties/actions";

export default function DeletePropertyButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("Apakah Anda yakin ingin menghapus properti ini?")) {
      setIsDeleting(true);
      const res = await deleteProperty(id);
      if (!res.success) {
        alert(res.error);
        setIsDeleting(false);
      }
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="w-9 h-9 rounded-lg border-slate-200 text-slate-500 hover:text-red-600 hover:bg-red-50 disabled:opacity-50"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
    </Button>
  );
}

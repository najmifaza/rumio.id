"use client";

import { useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { updateScoutStatus, deleteScout } from "./actions";
import { useRouter } from "next/navigation";

export function ScoutStatusSelect({ id, currentStatus }: { id: string; currentStatus: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    startTransition(async () => {
      await updateScoutStatus(id, newStatus);
      router.refresh();
    });
  };

  return (
    <div className="relative inline-block text-left">
      <select
        value={currentStatus}
        onChange={handleStatusChange}
        disabled={isPending}
        className={`appearance-none bg-white border rounded-lg px-3 py-1.5 pr-8 text-xs font-semibold outline-none cursor-pointer disabled:opacity-50 transition-colors ${
          currentStatus === "NEW" 
            ? "border-blue-200 text-blue-700 hover:bg-blue-50"
            : currentStatus === "CONTACTED"
            ? "border-orange-200 text-orange-700 hover:bg-orange-50"
            : currentStatus === "ACCEPTED"
            ? "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
            : "border-red-200 text-red-700 hover:bg-red-50"
        }`}
      >
        <option value="NEW">Baru</option>
        <option value="CONTACTED">Dihubungi</option>
        <option value="ACCEPTED">Diterima</option>
        <option value="REJECTED">Ditolak</option>
      </select>
      {isPending && (
        <Loader2 className="w-3 h-3 animate-spin absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
      )}
      {!isPending && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      )}
    </div>
  );
}

export function DeleteScoutButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (confirm("Apakah Anda yakin ingin menghapus pendaftar ini?")) {
      startTransition(async () => {
        await deleteScout(id);
        router.refresh();
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
      title="Hapus pendaftar"
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  );
}

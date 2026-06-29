"use client";

import { useState, useTransition } from "react";
import { createUser, resetUserPassword, deleteUser } from "./actions";
import { useRouter } from "next/navigation";
import {
  UserPlus,
  Trash2,
  KeyRound,
  Loader2,
  X,
  Eye,
  EyeOff,
  ShieldCheck,
  User as UserIcon,
} from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  _count: { properties: number };
};

// ---- Modal Tambah User ----
function AddUserModal({ onClose }: { onClose: () => void }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await createUser(formData);
      if (result.success) {
        router.refresh();
        onClose();
      } else {
        setError(result.error || "Terjadi kesalahan.");
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-[#0B1528]">Tambah Pengguna Baru</h2>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-700 block mb-1.5">Nama Lengkap</label>
            <input name="name" required placeholder="Contoh: Budi Santoso" className="w-full h-11 px-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700 block mb-1.5">Email</label>
            <input name="email" type="email" required placeholder="budi@example.com" className="w-full h-11 px-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700 block mb-1.5">Password</label>
            <div className="relative">
              <input name="password" type={showPassword ? "text" : "password"} required minLength={6} placeholder="Min. 6 karakter" className="w-full h-11 px-4 pr-12 border border-slate-200 rounded-xl text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700 block mb-1.5">Peran (Role)</label>
            <select name="role" className="w-full h-11 px-4 border border-slate-200 rounded-xl text-sm outline-none focus:border-amber-500 bg-white">
              <option value="OWNER">Admin Properti (OWNER)</option>
              <option value="ADMIN">Admin Utama (ADMIN)</option>
            </select>
          </div>

          {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

          <button type="submit" disabled={isPending} className="w-full h-11 bg-[#0B1528] text-white rounded-xl font-bold text-sm hover:bg-[#1a2b4c] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
            {isPending ? "Menyimpan..." : "Tambah Pengguna"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ---- Modal Reset Password ----
function ResetPasswordModal({ user, onClose }: { user: User; onClose: () => void }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get("password") as string;
    startTransition(async () => {
      const result = await resetUserPassword(user.id, newPassword);
      if (result.success) {
        setSuccess(true);
        router.refresh();
        setTimeout(onClose, 1500);
      } else {
        setError(result.error || "Terjadi kesalahan.");
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-[#0B1528]">Reset Password</h2>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-sm text-slate-500">Reset password untuk <strong className="text-[#0B1528]">{user.name}</strong>.</p>
          <div>
            <label className="text-sm font-semibold text-slate-700 block mb-1.5">Password Baru</label>
            <div className="relative">
              <input name="password" type={showPassword ? "text" : "password"} required minLength={6} placeholder="Min. 6 karakter" className="w-full h-11 px-4 pr-12 border border-slate-200 rounded-xl text-sm outline-none focus:border-amber-500" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
          {success && <p className="text-sm text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg">Password berhasil direset!</p>}
          <button type="submit" disabled={isPending} className="w-full h-11 bg-amber-500 text-white rounded-xl font-bold text-sm hover:bg-amber-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
            {isPending ? "Menyimpan..." : "Simpan Password Baru"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ---- Komponen Utama ----
export default function UsersClient({ users, currentUserId }: { users: User[]; currentUserId: string }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [resetTarget, setResetTarget] = useState<User | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = (user: User) => {
    if (!confirm(`Hapus pengguna "${user.name}"? Semua properti mereka akan ikut terhapus!`)) return;
    startTransition(async () => {
      await deleteUser(user.id);
      router.refresh();
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1528] flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-amber-600" />
            Manajemen Pengguna
          </h1>
          <p className="text-slate-500 mt-1">Kelola akun admin dan admin properti platform Rumio.id.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#0B1528] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#1a2b4c] transition-colors shadow-sm whitespace-nowrap"
        >
          <UserPlus className="w-4 h-4" />
          Tambah Pengguna
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Pengguna</th>
                <th className="px-6 py-4">Peran</th>
                <th className="px-6 py-4 text-center">Properti</th>
                <th className="px-6 py-4">Bergabung</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                        <UserIcon className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-bold text-[#0B1528]">
                          {user.name}
                          {user.id === currentUserId && (
                            <span className="ml-2 text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-bold">ANDA</span>
                          )}
                        </p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${user.role === "ADMIN" ? "bg-purple-100 text-purple-700" : "bg-emerald-100 text-emerald-700"}`}>
                      {user.role === "ADMIN" ? "Admin Utama" : "Admin Properti"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-slate-700">
                    {user._count.properties}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    {new Date(user.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setResetTarget(user)}
                        className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Reset Password"
                      >
                        <KeyRound className="w-4 h-4" />
                      </button>
                      {user.id !== currentUserId && (
                        <button
                          onClick={() => handleDelete(user)}
                          disabled={isPending}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Hapus Pengguna"
                        >
                          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && <AddUserModal onClose={() => setShowAddModal(false)} />}
      {resetTarget && <ResetPasswordModal user={resetTarget} onClose={() => setResetTarget(null)} />}
    </div>
  );
}

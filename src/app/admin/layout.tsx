import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Home, Building, FileText, Settings } from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Mengecek session login di sisi server
  const session = await getServerSession(authOptions);

  // Jika belum login, tendang kembali ke /login
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-[#0B1528]">
      {/* Sidebar Kiri */}
      <aside className="w-64 bg-white border-r border-slate-200 fixed h-full flex flex-col z-10">
        <div className="p-6 border-b border-slate-100">
          <Link href="/" className="block">
            <img src="/logo.svg" alt="Rumio.id Logo" className="h-13 w-auto" />
          </Link>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <nav className="space-y-1">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 bg-amber-50 text-amber-700 rounded-xl font-bold transition-all"
            >
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/properties"
              className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-[#0B1528] hover:bg-slate-50 rounded-xl font-medium transition-all"
            >
              <Building className="w-5 h-5" />
              <span>Properti</span>
            </Link>
            <Link
              href="/admin/blogs"
              className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-[#0B1528] hover:bg-slate-50 rounded-xl font-medium transition-all"
            >
              <FileText className="w-5 h-5" />
              <span>Blog / Artikel</span>
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-[#0B1528] hover:bg-slate-50 rounded-xl font-medium transition-all"
            >
              <Settings className="w-5 h-5" />
              <span>Pengaturan</span>
            </Link>
          </nav>
        </div>

        {/* Profil & Logout */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="px-4 py-2 mb-2">
            <p className="text-sm font-bold text-[#0B1528] truncate">
              {session.user?.name}
            </p>
            <p className="text-[11px] font-medium text-slate-500 truncate">
              {session.user?.email}
            </p>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Konten Utama Kanan */}
      <main className="flex-1 ml-64 p-8 xl:p-10">
        <div className="w-full">{children}</div>
      </main>
    </div>
  );
}

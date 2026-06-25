import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Building2, Eye, FileText, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  // Mengambil total data dari database
  const totalProperties = await prisma.property.count();
  const totalBlogs = await prisma.blog.count();
  const totalAdmins = await prisma.user.count({ where: { role: "ADMIN" } });
  
  // Menghitung total view
  const propertiesViews = await prisma.property.aggregate({
    _sum: { viewCount: true }
  });
  const totalViews = propertiesViews._sum.viewCount || 0;

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-black mb-2 text-[#0B1528]">
        Selamat Datang, {session?.user?.name?.split(' ')[0]}! 👋
      </h1>
      <p className="text-slate-500 mb-10 font-medium text-lg">
        Ini adalah pusat kendali untuk mengelola platform Rumio.id.
      </p>

      {/* Quick Stats Placeholder */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Total Properti", value: totalProperties.toString(), icon: Building2, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
          { label: "Total Artikel", value: totalBlogs.toString(), icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
          { label: "Pengunjung Properti", value: totalViews.toString(), icon: Eye, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
          { label: "Total Admin", value: totalAdmins.toString(), icon: Users, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
        ].map((stat, i) => (
          <div key={i} className={`bg-white p-6 rounded-3xl border ${stat.border} shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div>
              <p className="text-4xl font-black text-[#0B1528] tracking-tight">{stat.value}</p>
              <p className="text-sm text-slate-500 font-bold mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
        <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-[#0B1528]">Aktivitas Terbaru</h2>
        </div>
        <div className="text-center py-16 text-slate-400 flex flex-col items-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-slate-300" />
          </div>
          <p className="font-medium text-slate-500">Belum ada aktivitas yang direkam.</p>
          <p className="text-sm">Data properti dan blog yang baru ditambahkan akan muncul di sini.</p>
        </div>
      </div>
    </div>
  );
}

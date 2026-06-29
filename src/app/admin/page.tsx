import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Building2, Eye, FileText, Users, TrendingUp } from "lucide-react";
import { prisma } from "@/lib/prisma";
import LeadsChart from "@/components/admin/LeadsChart";

export const dynamic = "force-dynamic";

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === "ADMIN";
  const userId = session?.user?.id as string;

  const resolvedParams = await searchParams;
  const range = typeof resolvedParams.range === "string" ? parseInt(resolvedParams.range) : 6;

  // Kondisi filter: ADMIN lihat semua, OWNER hanya miliknya
  const propertyWhere = isAdmin ? {} : { ownerId: userId };

  const totalProperties = await prisma.property.count({ where: propertyWhere });

  const propertiesViews = await prisma.property.aggregate({
    where: propertyWhere,
    _sum: { viewCount: true },
  });
  const totalViews = propertiesViews._sum.viewCount || 0;

  // Hanya tampilkan untuk Admin Utama
  const totalBlogs = isAdmin ? await prisma.blog.count() : null;
  const totalAdmins = isAdmin ? await prisma.user.count({ where: { role: "ADMIN" } }) : null;

  // Properti terbaru untuk tabel aktivitas
  const recentProperties = await prisma.property.findMany({
    where: propertyWhere,
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      featuredImage: true,
      viewCount: true,
      createdAt: true,
      owner: { select: { name: true } },
    },
  });

  // Calculate leads chart data (last 6 months) for ADMIN
  let leadsChartData: { name: string; inquiries: number; scouts: number; orders: number }[] = [];
  
  if (isAdmin) {
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
    const currentMonth = new Date().getMonth();
    
    // Initialize chart data with 0s for the last 'range' months
    leadsChartData = Array.from({ length: range }).map((_, i) => {
      const d = new Date();
      d.setMonth(currentMonth - (range - 1) + i);
      return {
        name: months[(d.getMonth() + 12) % 12],
        month: (d.getMonth() + 12) % 12,
        year: d.getFullYear(),
        inquiries: 0,
        scouts: 0,
        orders: 0,
      };
    });

    const startDate = new Date();
    startDate.setMonth(currentMonth - (range - 1));
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);

    const [inquiries, scouts, orders] = await Promise.all([
      prisma.inquiry.findMany({ where: { createdAt: { gte: startDate } }, select: { createdAt: true } }),
      prisma.propertyScout.findMany({ where: { createdAt: { gte: startDate } }, select: { createdAt: true } }),
      prisma.packageOrder.findMany({ where: { createdAt: { gte: startDate } }, select: { createdAt: true } }),
    ]);

    inquiries.forEach(i => {
      const match = leadsChartData.find(d => d.month === i.createdAt.getMonth() && d.year === i.createdAt.getFullYear());
      if (match) match.inquiries += 1;
    });
    scouts.forEach(s => {
      const match = leadsChartData.find(d => d.month === s.createdAt.getMonth() && d.year === s.createdAt.getFullYear());
      if (match) match.scouts += 1;
    });
    orders.forEach(o => {
      const match = leadsChartData.find(d => d.month === o.createdAt.getMonth() && d.year === o.createdAt.getFullYear());
      if (match) match.orders += 1;
    });
  }

  const adminStats = [
    { label: "Total Properti", value: totalProperties.toString(), icon: Building2, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
    ...(isAdmin
      ? [
          { label: "Total Artikel", value: totalBlogs!.toString(), icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
          { label: "Pengunjung Properti", value: totalViews.toString(), icon: Eye, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
          { label: "Total Admin", value: totalAdmins!.toString(), icon: Users, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
        ]
      : [
          { label: "Total Kunjungan", value: totalViews.toString(), icon: Eye, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
        ]
    ),
  ];

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-black mb-2 text-[#0B1528]">
        Selamat Datang, {session?.user?.name?.split(" ")[0]}! 👋
      </h1>
      <p className="text-slate-500 mb-10 font-medium text-lg">
        {isAdmin
          ? "Ini adalah pusat kendali untuk mengelola platform Rumio.id."
          : "Kelola properti Anda dan pantau performa listing di sini."}
      </p>

      {/* Stats */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${isAdmin ? "lg:grid-cols-4" : "lg:grid-cols-2"} gap-6 mb-10`}>
        {adminStats.map((stat, i) => (
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10">
        {/* Leads Chart */}
        {isAdmin && (
          <div className="xl:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 lg:p-8 flex flex-col">
            <LeadsChart data={leadsChartData} currentRange={range} />
          </div>
        )}

        {/* Properti Terbaru */}
        <div className={`${isAdmin ? "xl:col-span-1" : "xl:col-span-3"} bg-white rounded-3xl border border-slate-100 shadow-sm p-6 lg:p-8 flex flex-col`}>
          <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-[#0B1528]">
              {isAdmin ? "Properti Terbaru" : "Properti Anda"}
            </h2>
          </div>

        {recentProperties.length === 0 ? (
          <div className="text-center py-12 text-slate-400 flex flex-col items-center">
            <Building2 className="w-12 h-12 mb-3 opacity-20" />
            <p className="font-medium text-slate-500">Belum ada properti.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentProperties.map((prop) => (
              <div key={prop.id} className="flex items-center gap-4 py-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                  <img
                    src={prop.featuredImage || "/placeholder-image.jpg"}
                    alt={prop.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#0B1528] text-sm truncate">{prop.title}</p>
                  {isAdmin && (
                    <p className="text-xs text-slate-400">{prop.owner.name}</p>
                  )}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <Eye className="w-3.5 h-3.5" /> {prop.viewCount}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${prop.status === "SOLD" ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"}`}>
                    {prop.status === "SOLD" ? "Terjual" : "Aktif"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}



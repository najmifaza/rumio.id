import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import SidebarNav from "@/components/admin/SidebarNav";
import LogoutButton from "@/components/admin/LogoutButton";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Admin Dashboard | Rumio.id",
  robots: {
    index: false,
    follow: false,
  },
};

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

  const userRole = session.user.role;
  const isAdmin = userRole === "ADMIN";

  const [newInquiriesCount, newScoutsCount, newOrdersCount] = isAdmin 
    ? await Promise.all([
        prisma.inquiry.count({ where: { status: "NEW" } }),
        prisma.propertyScout.count({ where: { status: "NEW" } }),
        prisma.packageOrder.count({ where: { status: "PENDING" } })
      ])
    : [0, 0, 0];

  const sidebarContent = (
    <>
      <div className="p-4 lg:p-6 border-b border-slate-100 hidden lg:block">
        <Link href="/" className="block">
          <img src="/logo.svg" alt="Rumio.id Logo" className="h-13 w-auto" />
        </Link>
      </div>

      <div className="p-4 flex-1 overflow-y-auto" data-lenis-prevent="true">
        <SidebarNav
          newInquiriesCount={newInquiriesCount}
          newScoutsCount={newScoutsCount}
          newOrdersCount={newOrdersCount}
          userRole={userRole}
        />
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
    </>
  );

  return (
    <AdminLayoutWrapper sidebarContent={sidebarContent}>
      {children}
    </AdminLayoutWrapper>
  );
}

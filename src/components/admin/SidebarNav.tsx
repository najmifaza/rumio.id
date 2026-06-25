"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building, FileText, Settings } from "lucide-react";

export default function SidebarNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Properti", href: "/admin/properties", icon: Building },
    { name: "Blog / Artikel", href: "/admin/blogs", icon: FileText },
    { name: "Pengaturan", href: "/admin/settings", icon: Settings },
  ];

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              isActive
                ? "bg-amber-50 text-amber-700 font-bold"
                : "text-slate-500 hover:text-[#0B1528] hover:bg-slate-50"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}

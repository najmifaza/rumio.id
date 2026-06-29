"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Building,
  FileText,
  Settings,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Image as ImageIcon,
  MessageSquare,
  LayoutTemplate,
  ShieldCheck,
} from "lucide-react";

export default function SidebarNav({
  newInquiriesCount = 0,
  newScoutsCount = 0,
  newOrdersCount = 0,
  userRole = "OWNER",
}: {
  newInquiriesCount?: number;
  newScoutsCount?: number;
  newOrdersCount?: number;
  userRole?: string;
}) {
  const pathname = usePathname();
  const isAdmin = userRole === "ADMIN";

  const [isSettingsOpen, setIsSettingsOpen] = useState(pathname.startsWith("/admin/settings"));
  const [isInboxOpen, setIsInboxOpen] = useState(
    pathname.startsWith("/admin/inquiries") || pathname.startsWith("/admin/scouts") || pathname.startsWith("/admin/orders"),
  );

  // Menu yang selalu tampil untuk semua role
  const commonItems = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Properti", href: "/admin/properties", icon: Building },
    { name: "Buat Banner", href: "/admin/banner-generator", icon: LayoutTemplate },
  ];

  // Menu khusus ADMIN Utama
  const adminOnlyItems = [
    {
      name: "Kotak Masuk",
      icon: MessageSquare,
      isDropdown: true,
      isOpen: isInboxOpen,
      toggle: () => setIsInboxOpen(!isInboxOpen),
      activePaths: ["/admin/inquiries", "/admin/scouts", "/admin/orders"],
      children: [
        { name: "Permintaan Properti", href: "/admin/inquiries", badge: newInquiriesCount },
        { name: "Pendaftaran Scout", href: "/admin/scouts", badge: newScoutsCount },
        { name: "Pesanan Paket", href: "/admin/orders", badge: newOrdersCount },
      ],
    },
    { name: "Blog / Artikel", href: "/admin/blogs", icon: FileText },
    { name: "Galeri Media", href: "/admin/media", icon: ImageIcon },
    { name: "Harga & Paket", href: "/admin/pricing", icon: CreditCard },
    { name: "Pengguna", href: "/admin/users", icon: ShieldCheck },
    {
      name: "Pengaturan",
      icon: Settings,
      isDropdown: true,
      isOpen: isSettingsOpen,
      toggle: () => setIsSettingsOpen(!isSettingsOpen),
      activePaths: ["/admin/settings"],
      children: [
        { name: "Umum", href: "/admin/settings/general" },
        { name: "Kontak", href: "/admin/settings/contact" },
        { name: "Sosial Media", href: "/admin/settings/social" },
      ],
    },
  ];

  const navItems = isAdmin
    ? [commonItems[0], ...adminOnlyItems.slice(0, 1), commonItems[1], commonItems[2], ...adminOnlyItems.slice(1)]
    : commonItems;

  const renderItem = (item: {
    name: string;
    href?: string;
    icon?: React.ElementType;
    isDropdown?: boolean;
    isOpen?: boolean;
    toggle?: () => void;
    activePaths?: string[];
    children?: { name: string; href: string; badge?: number }[];
  }) => {
    if (item.isDropdown) {
      const isGroupActive = item.activePaths?.some((p) => pathname.startsWith(p));

      return (
        <div key={item.name} className="pt-1">
          <button
            onClick={item.toggle}
            className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              isGroupActive
                ? "bg-amber-50 text-amber-700 font-bold"
                : "text-slate-500 hover:text-[#0B1528] hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3">
              {item.icon && <item.icon className="w-5 h-5" />}
              <span>{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.name === "Kotak Masuk" &&
                (newInquiriesCount > 0 || newScoutsCount > 0 || newOrdersCount > 0) &&
                !item.isOpen && (
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                )}
              {item.isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {item.isOpen && (
            <div className="mt-1 ml-6 pl-2 border-l border-slate-200 space-y-1">
              {item.children?.map((subItem) => {
                const isSubActive = pathname === subItem.href;
                return (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isSubActive
                        ? "bg-amber-50/80 text-amber-700"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <span className="truncate">{subItem.name}</span>
                    {subItem.badge ? (
                      <div className="w-5 h-5 shrink-0 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm">
                        {subItem.badge > 99 ? "99+" : subItem.badge}
                      </div>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    const isActive =
      item.href === "/admin"
        ? pathname === "/admin"
        : item.href && pathname.startsWith(item.href);

    return (
      <Link
        key={item.href || item.name}
        href={item.href || "#"}
        className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all ${
          isActive
            ? "bg-amber-50 text-amber-700 font-bold"
            : "text-slate-500 hover:text-[#0B1528] hover:bg-slate-50"
        }`}
      >
        <div className="flex items-center gap-3">
          {item.icon && <item.icon className="w-5 h-5" />}
          <span>{item.name}</span>
        </div>
      </Link>
    );
  };

  return <nav className="space-y-1">{navItems.map(renderItem)}</nav>;
}


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
  ShoppingCart,
} from "lucide-react";

export default function SidebarNav({
  newInquiriesCount = 0,
  newScoutsCount = 0,
  newOrdersCount = 0,
}: {
  newInquiriesCount?: number;
  newScoutsCount?: number;
  newOrdersCount?: number;
}) {
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(
    pathname.startsWith("/admin/settings"),
  );
  const [isInboxOpen, setIsInboxOpen] = useState(
    pathname.startsWith("/admin/inquiries") ||
      pathname.startsWith("/admin/scouts") ||
      pathname.startsWith("/admin/orders"),
  );

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: Home },
    {
      name: "Kotak Masuk",
      icon: MessageSquare,
      isDropdown: true,
      isOpen: isInboxOpen,
      toggle: () => setIsInboxOpen(!isInboxOpen),
      activePaths: ["/admin/inquiries", "/admin/scouts", "/admin/orders"],
      children: [
        {
          name: "Permintaan Properti",
          href: "/admin/inquiries",
          badge: newInquiriesCount,
        },
        {
          name: "Pendaftaran Scout",
          href: "/admin/scouts",
          badge: newScoutsCount,
        },
        { name: "Pesanan Paket", href: "/admin/orders", badge: newOrdersCount },
      ],
    },
    { name: "Properti", href: "/admin/properties", icon: Building },
    { name: "Blog / Artikel", href: "/admin/blogs", icon: FileText },
    { name: "Galeri Media", href: "/admin/media", icon: ImageIcon },
    { name: "Harga & Paket", href: "/admin/pricing", icon: CreditCard },
    {
      name: "Buat Banner",
      href: "/admin/banner-generator",
      icon: LayoutTemplate,
    },
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

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        if (item.isDropdown) {
          const isGroupActive = item.activePaths?.some((p) =>
            pathname.startsWith(p),
          );

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
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* Tampilkan titik merah jika ada inbox baru tapi menu sedang tertutup */}
                  {item.name === "Kotak Masuk" &&
                    (newInquiriesCount > 0 ||
                      newScoutsCount > 0 ||
                      newOrdersCount > 0) &&
                    !item.isOpen && (
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    )}
                  {item.isOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </button>

              {item.isOpen && (
                <div className="mt-1 ml-4 pl-4 border-l border-slate-200 space-y-1">
                  {item.children?.map(
                    (subItem: {
                      name: string;
                      href: string;
                      badge?: number;
                    }) => {
                      const isSubActive = pathname === subItem.href;
                      return (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                            isSubActive
                              ? "bg-amber-50/80 text-amber-700"
                              : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                          }`}
                        >
                          <span>{subItem.name}</span>
                          {subItem.badge ? (
                            <div className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm">
                              {subItem.badge > 99 ? "99+" : subItem.badge}
                            </div>
                          ) : null}
                        </Link>
                      );
                    },
                  )}
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
      })}
    </nav>
  );
}

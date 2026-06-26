"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building, FileText, Settings, ChevronDown, ChevronUp, CreditCard, Image as ImageIcon, MessageSquare } from "lucide-react";

export default function SidebarNav({ newInquiriesCount = 0 }: { newInquiriesCount?: number }) {
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(pathname.startsWith("/admin/settings"));

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Properti", href: "/admin/properties", icon: Building },
    { name: "Blog / Artikel", href: "/admin/blogs", icon: FileText },
    { name: "Inbox Permintaan", href: "/admin/inquiries", icon: MessageSquare },
    { name: "Galeri Media", href: "/admin/media", icon: ImageIcon },
    { name: "Harga & Paket", href: "/admin/pricing", icon: CreditCard },
  ];

  const settingItems = [
    { name: "Umum", href: "/admin/settings/general" },
    { name: "Kontak", href: "/admin/settings/contact" },
    { name: "Sosial Media", href: "/admin/settings/social" },
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
            className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all ${
              isActive
                ? "bg-amber-50 text-amber-700 font-bold"
                : "text-slate-500 hover:text-[#0B1528] hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </div>
            
            {/* Notification Badge */}
            {item.name === "Inbox Permintaan" && newInquiriesCount > 0 && (
              <div className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[11px] font-bold shadow-sm">
                {newInquiriesCount > 99 ? "99+" : newInquiriesCount}
              </div>
            )}
          </Link>
        );
      })}

      {/* Settings Dropdown */}
      <div className="pt-2">
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
            pathname.startsWith("/admin/settings")
              ? "bg-blue-50 text-blue-600 font-bold"
              : "text-slate-500 hover:text-[#0B1528] hover:bg-slate-50"
          }`}
        >
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5" />
            <span>Pengaturan</span>
          </div>
          {isSettingsOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {isSettingsOpen && (
          <div className="mt-1 ml-4 pl-4 border-l border-slate-200 space-y-1">
            {settingItems.map((subItem) => {
              const isSubActive = pathname === subItem.href;
              return (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isSubActive
                      ? "bg-blue-50/50 text-blue-600"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {subItem.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}

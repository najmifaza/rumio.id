"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import FindPropertyModal from "@/components/ui/find-property-modal";

export default function Navbar({
  whatsappNumber = "",
}: {
  whatsappNumber?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  const waText = encodeURIComponent(
    "Halo Admin Rumio, saya mengunjungi website Rumio.id dan ingin bertanya seputar layanan Anda.",
  );
  const waLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${waText}`
    : "#";

  // Effect untuk mendeteksi event scroll
  useEffect(() => {
    const handleScroll = () => {
      // Jika scroll lebih dari 20px dari atas, set isScrolled ke true
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Tambahkan event listener saat komponen di-mount
    window.addEventListener("scroll", handleScroll);

    // Bersihkan event listener saat komponen di-unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // NOTE: useMemo MUST be above any early return — Rules of Hooks compliance
  const navLinks = useMemo(() => [
    { name: "Beranda", href: "/", isActive: pathname === "/" },
    {
      name: "Properti",
      href: "/properti",
      isActive: pathname.startsWith("/properti"),
    },
    { name: "Blog", href: "/blog", isActive: pathname.startsWith("/blog") },
    {
      name: "Pricing",
      href: "/pricing",
      isActive: pathname.startsWith("/pricing"),
    },
    {
      name: "Tentang Kami",
      href: "/tentang-kami",
      isActive: pathname.startsWith("/tentang-kami"),
    },
    {
      name: "Property Scout",
      href: "/property-scout",
      isActive: pathname.startsWith("/property-scout"),
    },
  ], [pathname]);

  // Jangan tampilkan Navbar di halaman admin
  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
    return null;
  }

  return (
    <div
      style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 50 }}
    >
      <header
        className={`w-full transition-all duration-300 ease-in-out ${
          isScrolled || isOpen
            ? "bg-white shadow-md backdrop-blur-md supports-[backdrop-filter]:bg-white/95"
            : "bg-transparent"
        }`}
      >
        <div
          className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 2xl:px-0 flex items-center justify-between relative z-50 transition-all duration-300"
          style={{
            paddingTop: isScrolled ? "16px" : "24px",
            paddingBottom: isScrolled ? "16px" : "24px",
          }}
        >
          {/* LOGO */}
          <div className="flex-1 flex justify-start">
            <Link href="/" className="flex items-center">
              <img src="/logo.svg" alt="Rumio" className="h-12 w-auto" />
            </Link>
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden xl:flex flex-shrink-0 items-center gap-4 lg:gap-6 2xl:gap-8 text-base 2xl:text-lg font-semibold text-slate-600">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`transition-colors ${
                  link.isActive ? "text-amber-600" : "hover:text-[#0B1528]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* DESKTOP BUTTONS */}
          <div className="hidden xl:flex flex-1 justify-end items-center gap-3 lg:gap-4">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex gap-2 text-slate-700 bg-white hover:bg-slate-50 border-slate-200 rounded-xl px-4 py-2.5 2xl:px-6 2xl:py-3 text-base 2xl:text-lg font-medium h-auto"
            >
              <Search className="w-4 h-4 2xl:w-5 2xl:h-5 text-amber-500" />
              Carikan Properti
            </Button>
            <Link href={waLink} target="_blank" rel="noopener noreferrer">
              <Button className="inline-flex gap-2 rounded-xl px-4 py-2.5 2xl:px-6 2xl:py-3 text-base 2xl:text-lg font-semibold bg-[#25D366] hover:bg-[#20b858] text-white border-none shadow-sm transition-colors h-auto">
                <WhatsAppIcon width="24" height="24" />
                Hubungi Kami
              </Button>
            </Link>
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <div className="flex-1 flex justify-end xl:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-col justify-center items-center gap-[6px] rounded-full shadow-md border-slate-100/50 z-50 hover:bg-slate-50 bg-white"
              aria-label="Toggle Menu"
            >
              <span
                className={`block w-6 h-[2px] bg-[#0B1528] rounded-full transition-all duration-300 ease-in-out ${
                  isOpen ? "rotate-45 translate-y-[8px]" : ""
                }`}
              />
              <span
                className={`block w-6 h-[2px] bg-[#0B1528] rounded-full transition-all duration-300 ease-in-out ${
                  isOpen ? "opacity-0 translate-x-3" : "opacity-100"
                }`}
              />
              <span
                className={`block w-6 h-[2px] bg-[#0B1528] rounded-full transition-all duration-300 ease-in-out ${
                  isOpen ? "-rotate-45 -translate-y-[8px]" : ""
                }`}
              />
            </Button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        <div
          className={`xl:hidden absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-300 ease-in-out origin-top border-t border-slate-100/50 ${
            isOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-4 invisible"
          }`}
        >
          <div className="flex flex-col px-6 py-6 space-y-5">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-semibold transition-colors ${
                  link.isActive
                    ? "text-amber-600"
                    : "text-slate-600 hover:text-[#0B1528]"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-slate-100" />
            <Button
              variant="outline"
              onClick={() => {
                setIsOpen(false);
                setIsModalOpen(true);
              }}
              className="flex justify-center w-full mt-2 gap-2 py-2.5 text-slate-700 bg-white border-slate-200 rounded-lg font-medium"
            >
              <Search className="w-4 h-4 text-amber-500" />
              Carikan Properti
            </Button>
            <Link href={waLink} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="w-full">
              <Button className="flex justify-center w-full mt-2 gap-2 py-2.5 rounded-lg font-semibold bg-[#25D366] hover:bg-[#20b858] text-white border-none shadow-sm transition-colors">
                <WhatsAppIcon width="18" height="18" />
                Hubungi Kami
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <FindPropertyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

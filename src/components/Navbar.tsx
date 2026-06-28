"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import FindPropertyModal from "@/components/ui/find-property-modal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

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

  // Jangan tampilkan Navbar di halaman admin
  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
    return null;
  }

  const navLinks = [
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
    { name: "Tentang Kami", href: "/#tentang-kami", isActive: false },
    { name: "Property Scout", href: "/property-scout", isActive: pathname.startsWith("/property-scout") },
  ];

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
          className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-0 flex items-center justify-between relative z-50 transition-all duration-300"
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
          <nav className="hidden md:flex flex-shrink-0 items-center gap-4 lg:gap-8 text-lg font-semibold text-slate-600">
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
          <div className="hidden md:flex flex-1 justify-end items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex gap-2 text-slate-700 bg-white hover:bg-slate-50 border-slate-200 rounded-xl px-6 py-3 text-lg font-medium h-auto"
            >
              <Search className="w-5 h-5 text-amber-500" />
              Carikan Properti
            </Button>
            <Button
              className="inline-flex gap-2 rounded-xl px-6 py-3 text-lg font-semibold bg-[#25D366] hover:bg-[#20b858] text-white border-none shadow-sm transition-colors h-auto"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.81 11.81 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z"/>
              </svg>
              Hubungi Kami
            </Button>
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <div className="flex-1 flex justify-end md:hidden">
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
          className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-300 ease-in-out origin-top border-t border-slate-100/50 ${
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
            <Button
              className="flex justify-center w-full mt-2 gap-2 py-2.5 rounded-lg font-semibold bg-[#25D366] hover:bg-[#20b858] text-white border-none shadow-sm transition-colors"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.81 11.81 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z"/>
              </svg>
              Hubungi Kami
            </Button>
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

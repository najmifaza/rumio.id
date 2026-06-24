"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  const navLinks = [
    { name: "Beranda", href: "/", isActive: pathname === "/" },
    { name: "Layanan", href: "/#layanan", isActive: false },
    { name: "Properti", href: "/properti", isActive: pathname.startsWith("/properti") },
    { name: "Blog", href: "/blog", isActive: pathname.startsWith("/blog") },
    { name: "Tentang Kami", href: "/#tentang-kami", isActive: false },
    { name: "Property Scout", href: "/#property-scout", isActive: false },
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
          <Link href="/" className="flex items-center">
            <img src="/logo.svg" alt="Rumio" className="h-10 w-auto" />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
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

          {/* DESKTOP BUTTON */}
          <Button
            variant="outlineAmber"
            size="nav"
            className="hidden md:inline-flex gap-2"
          >
            <MessageCircle className="w-4 h-4 text-slate-500" />
            Hubungi Kami
          </Button>

          {/* MOBILE HAMBURGER BUTTON */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col justify-center items-center gap-[6px] rounded-full shadow-md border-slate-100/50 z-50 hover:bg-slate-50 bg-white"
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
              variant="outlineAmber"
              size="nav"
              className="flex justify-center w-full mt-2 gap-2 py-3"
            >
              <MessageCircle className="w-4 h-4 text-slate-500" />
              Hubungi Kami
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
}

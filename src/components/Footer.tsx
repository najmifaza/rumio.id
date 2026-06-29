"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

interface FooterProps {
  whatsappNumber?: string;
  rawWhatsapp?: string;
  email?: string;
  address?: string;
  socials?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
  };
  description?: string;
}

export default function Footer({ 
  whatsappNumber = "", 
  rawWhatsapp = "", 
  email = "hello@rumio.id", 
  address = "Bintaro Jaya, Tangerang Selatan",
  socials = {},
  description = "Solusi terbaik untuk mencari, membeli, dan menyewa properti di kawasan Bintaro dan sekitarnya."
}: FooterProps) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const waText = encodeURIComponent("Halo Admin Rumio, saya mengunjungi website Rumio.id dan ingin bertanya seputar layanan Anda.");
  const waLink = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${waText}` : "#";

  return (
    <footer className="bg-[#0B1528] text-white pt-16 pb-8 border-t border-slate-800 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo-footer.svg" alt="Rumio.id Logo" width={150} height={45} className="object-contain h-auto" />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Rumio.id adalah platform properti terpercaya yang membantu Anda menemukan rumah, apartemen, atau tanah idaman dengan proses yang mudah, aman, dan transparan.
            </p>
            <div className="flex items-center gap-4">
              {/* SOCIAL LINKS */}
              {socials.instagram && (
                <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#D98A2C] hover:text-white transition-all">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              )}
              {socials.facebook && (
                <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#D98A2C] hover:text-white transition-all">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {socials.tiktok && (
                <a href={socials.tiktok} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#D98A2C] hover:text-white transition-all">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.22-1.15 4.5-2.97 5.76-1.84 1.25-4.14 1.48-6.19.8-2.03-.69-3.71-2.22-4.52-4.2-.82-1.99-.74-4.29.23-6.23 1.01-1.95 2.87-3.41 4.96-3.9 1.15-.27 2.34-.28 3.51-.12v4.06c-1.39-.14-2.8.27-3.83 1.12-1.01.83-1.6 2.1-1.6 3.4.01 1.49.88 2.85 2.21 3.49 1.35.63 2.95.42 4.09-.54 1.05-.88 1.63-2.2 1.63-3.57.02-4.8.01-9.61.02-14.41z"/>
                  </svg>
                </a>
              )}
              {socials.youtube && (
                <a href={socials.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#D98A2C] hover:text-white transition-all">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Tautan Cepat</h3>
            <ul className="space-y-4">
              {[
                { name: "Beranda", path: "/" },
                { name: "Properti Dijual", path: "/properti" },
                { name: "Artikel & Berita", path: "/blog" },
                { name: "Paket Agen", path: "/pricing" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.path}
                    className="text-slate-400 hover:text-[#D98A2C] transition-colors text-sm flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Layanan */}
          <div>
            <h3 className="text-lg font-bold mb-6">Layanan Kami</h3>
            <ul className="space-y-4">
              {[
                { name: "Titip Jual Properti", path: "#" },
                { name: "Konsultasi KPR", path: "#" },
                { name: "Virtual Tour 360°", path: "#" },
                { name: "Property Management", path: "#" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.path}
                    className="text-slate-400 hover:text-[#D98A2C] transition-colors text-sm flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Hubungi Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D98A2C] shrink-0 mt-0.5" />
                <span className="text-slate-400 text-sm leading-relaxed">
                  {address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#D98A2C] shrink-0" />
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="text-slate-400 text-sm hover:text-white transition-colors">
                  {rawWhatsapp || whatsappNumber || "+62 812-3456-7890"}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#D98A2C] shrink-0" />
                <a href={`mailto:${email}`} className="text-slate-400 text-sm hover:text-white transition-colors">
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Rumio.id. Hak Cipta Dilindungi.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-slate-500 hover:text-white transition-colors text-sm">
              Kebijakan Privasi
            </Link>
            <Link href="/terms" className="text-slate-500 hover:text-white transition-colors text-sm">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

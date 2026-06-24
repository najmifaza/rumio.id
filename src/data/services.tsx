import { MonitorSmartphone, QrCode, MessageCircle } from "lucide-react";
import Icon360 from "@/components/ui/Icon360";

export interface ServiceItem {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
}

export const servicesData: ServiceItem[] = [
  {
    icon: Icon360,
    title: "Virtual Tour 360°",
    description: "Tampilkan setiap sudut properti secara interaktif dan imersif.",
    link: "#",
  },
  {
    icon: MonitorSmartphone,
    title: "Landing Page Eksklusif",
    description: "Setiap properti memiliki halaman sendiri dengan URL unik.",
    link: "#",
  },
  {
    icon: QrCode,
    title: "QR Code Otomatis",
    description: "QR Code lengkap yang dapat dicetak untuk media promosi.",
    link: "#",
  },
  {
    icon: MessageCircle,
    title: "Integrasi WhatsApp",
    description: "Calon pembeli dapat langsung menghubungi Anda via WhatsApp.",
    link: "#",
  },
];

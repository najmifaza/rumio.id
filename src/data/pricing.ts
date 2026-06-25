import { Send, Crown, Gem, LucideIcon } from "lucide-react";

export type PricingFeature = {
  text: string;
  tableValues: { label: string; value: string | boolean }[];
};

export type PricingPlan = {
  id: string;
  name: string;
  description: string;
  price: string;
  icon: LucideIcon;
  isPopular?: boolean;
  features: PricingFeature[];
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Cocok untuk properti pribadi atau listing sederhana",
    price: "1.500.000",
    icon: Send,
    features: [
      {
        text: "15 Foto Properti Profesional",
        tableValues: [{ label: "Foto Properti", value: "15 Foto" }],
      },
      {
        text: "Virtual Tour 360° (Basic)",
        tableValues: [{ label: "Virtual Tour 360°", value: "Basic" }],
      },
      {
        text: "Landing Page Eksklusif",
        tableValues: [{ label: "Landing Page", value: "Standar" }],
      },
      {
        text: "QR Code Otomatis",
        tableValues: [{ label: "QR Code", value: true }],
      },
      {
        text: "Integrasi WhatsApp",
        tableValues: [{ label: "Integrasi WhatsApp", value: true }],
      },
      { text: "Form Lead & Manajemen Leads", tableValues: [] },
      {
        text: "Hosting 30 Hari",
        tableValues: [{ label: "Hosting", value: "30 Hari" }],
      },
      {
        text: "Support via WhatsApp",
        tableValues: [{ label: "Support", value: "WhatsApp" }],
      },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Paket paling seimbang untuk pemasaran properti optimal",
    price: "2.500.000",
    icon: Crown,
    isPopular: true,
    features: [
      {
        text: "30 Foto Properti Profesional",
        tableValues: [{ label: "Foto Properti", value: "30 Foto" }],
      },
      {
        text: "Virtual Tour 360° (Premium)",
        tableValues: [{ label: "Virtual Tour 360°", value: "Premium" }],
      },
      {
        text: "Landing Page Premium",
        tableValues: [{ label: "Landing Page", value: "Premium" }],
      },
      {
        text: "QR Code + QR Banner (Cetak)",
        tableValues: [
          { label: "QR Code", value: true },
          { label: "QR Banner (Cetak)", value: true },
        ],
      },
      {
        text: "Integrasi WhatsApp Dinamis",
        tableValues: [{ label: "Integrasi WhatsApp", value: true }],
      },
      { text: "Form Lead & Manajemen Leads", tableValues: [] },
      {
        text: "Statistik & Analitik Dasar",
        tableValues: [{ label: "Statistik & Analitik", value: "Dasar" }],
      },
      {
        text: "Hosting 60 Hari",
        tableValues: [{ label: "Hosting", value: "60 Hari" }],
      },
      {
        text: "Support Prioritas",
        tableValues: [{ label: "Support", value: "Prioritas" }],
      },
    ],
  },
  {
    id: "signature",
    name: "Signature",
    description: "Untuk properti premium dengan pemasaran maksimal",
    price: "4.000.000",
    icon: Gem,
    features: [
      {
        text: "Foto Profesional Unlimited",
        tableValues: [{ label: "Foto Properti", value: "Unlimited" }],
      },
      {
        text: "Virtual Tour 360° (Advanced)",
        tableValues: [{ label: "Virtual Tour 360°", value: "Advanced" }],
      },
      {
        text: "Landing Page Custom Premium",
        tableValues: [{ label: "Landing Page", value: "Custom Premium" }],
      },
      {
        text: "QR Code + QR Banner Premium",
        tableValues: [
          { label: "QR Code", value: true },
          { label: "QR Banner (Cetak)", value: true },
        ],
      },
      {
        text: "WhatsApp Virtual Assistant",
        tableValues: [{ label: "WhatsApp Virtual Assistant", value: true }],
      },
      { text: "Form Lead & Manajemen Leads", tableValues: [] },
      {
        text: "Statistik & Analitik Lengkap",
        tableValues: [{ label: "Statistik & Analitik", value: "Lengkap" }],
      },
      {
        text: "Hosting 90 Hari",
        tableValues: [{ label: "Hosting", value: "90 Hari" }],
      },
      {
        text: "Feature di Halaman Beranda",
        tableValues: [{ label: "Featured di Beranda", value: true }],
      },
      {
        text: "Support VIP",
        tableValues: [{ label: "Support", value: "VIP" }],
      },
    ],
  },
];


export type AddonPlan = {
  id: string;
  name: string;
  description: string;
  price: string;
  priceSuffix?: string;
  image: string;
};

export const addonPlans: AddonPlan[] = [
  {
    id: "drone",
    name: "Foto Drone",
    description:
      "Foto udara untuk menampilkan lokasi & lingkungan sekitar properti.",
    price: "500.000",
    image:
      "https://images.unsplash.com/photo-1504890001746-a9a68eda46e2?q=80&w=1574",
  },
  {
    id: "video",
    name: "Video Cinematic",
    description:
      "Video profesional berdurasi 1-2 menit untuk promosi maksimal.",
    price: "1.000.000",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
  },
  {
    id: "floor-plan",
    name: "Floor Plan 2D",
    description:
      "Denah 2D untuk memudahkan calon pembeli memahami layout properti.",
    price: "250.000",
    image:
      "https://plus.unsplash.com/premium_photo-1726877098040-3745503673b4?q=80&w=1740&fit=crop",
  },
  {
    id: "featured",
    name: "Featured Listing",
    description:
      "Tampilkan properti Anda di halaman beranda Rumio selama 7 hari.",
    price: "250.000",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=400&fit=crop",
  },
  {
    id: "hosting",
    name: "Perpanjangan Hosting",
    description:
      "Perpanjangan masa tayang landing page setelah periode paket berakhir.",
    price: "100.000",
    priceSuffix: "/bulan",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=400&fit=crop",
  },
];

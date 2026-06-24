export interface Property {
  id: string;
  image: string;
  title: string;
  location: string;
  beds: number;
  baths: number;
  cars: number;
  area: number;
  landArea?: number;
  certificate?: string;
  kpr?: string;
  bookingPrice?: string;
  price?: string; // @deprecated - gunakan priceNumeric
  priceNumeric: number; // Harga dalam angka (sumber utama)
  features?: string[]; // Fitur unggulan untuk filter
  link: string;
  slug: string;
  badge?: string;
  gallery: string[];
  // Extended detail fields
  description?: string;
  highlights?: string[];
  propertyType?: string; // e.g. "Rumah", "Villa", "Apartemen"
  listingType?: string; // e.g. "Dijual", "Disewa"
  condition?: string; // e.g. "Baru", "Bekas"
  floors?: number;
  electricity?: string; // e.g. "3.500 Watt"
  water?: string; // e.g. "PAM", "Sumur"
  facing?: string; // e.g. "Utara", "Selatan"
  builtYear?: number;
  coordinates?: { lat: number; lng: number }; // Input koordinat saja, URL di-generate otomatis
}

export const mockProperties: Property[] = [
  {
    id: "prop-1",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
    title: "Rumah Minimalis Modern",
    location: "Banyumas, Jawa Tengah",
    beds: 3,
    baths: 2,
    cars: 3,
    area: 90,
    landArea: 120,
    certificate: "SHM",
    kpr: "Rp 5.4 Juta",
    bookingPrice: "Rp 1.000.000",
    priceNumeric: 875000000,
    features: ["Carport", "Dekat Sekolah", "Dekat Mall"],
    link: "/properti/rumah-minimalis-modern",
    slug: "rumah-minimalis-modern",
    description:
      "Rumah modern 1 lantai dengan desain minimalis yang elegan dan fungsional. Dilengkapi dengan pencahayaan alami yang optimal, sirkulasi udara baik, dan material berkualitas tinggi. Cocok untuk keluarga muda yang menginginkan kenyamanan dan gaya hidup modern.",
    highlights: [
      "Desain modern minimalis",
      "Lokasi strategis dekat pusat kota",
      "Lingkungan aman perumahan",
      "Dekat sekolah & fasilitas umum",
      "Akses mudah ke tol & transportasi umum",
    ],
    propertyType: "Rumah",
    listingType: "Dijual",
    condition: "Baru",
    floors: 1,
    electricity: "1.300 Watt",
    water: "PDAM",
    facing: "Timur",
    builtYear: 2023,
    coordinates: { lat: -7.424705840529867, lng: 109.23943316672428 },
    gallery: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    ],
  },
  {
    id: "prop-2",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    title: "Villa dengan Kolam Renang",
    location: "Baturraden, Jawa Tengah",
    beds: 4,
    baths: 4,
    cars: 2,
    area: 200,
    landArea: 250,
    certificate: "SHM",
    kpr: "Rp 14.2 Juta",
    bookingPrice: "Rp 5.000.000",
    priceNumeric: 2150000000,
    features: ["Carport", "Taman", "Kolam Renang", "Keamanan 24 Jam"],
    link: "/properti/villa-kolam-renang",
    slug: "villa-kolam-renang",
    description:
      "Villa mewah 2 lantai dengan kolam renang pribadi dan pemandangan alam Baturraden yang menakjubkan. Properti ini dirancang untuk kenyamanan premium dengan material high-end, taman luas, dan sistem keamanan modern. Ideal sebagai hunian eksklusif atau properti investasi.",
    highlights: [
      "Kolam renang pribadi",
      "Pemandangan alam Baturraden",
      "Material interior high-end",
      "Taman luas & area BBQ",
      "Sistem keamanan CCTV 24 jam",
    ],
    propertyType: "Villa",
    listingType: "Dijual",
    condition: "Baru",
    floors: 2,
    electricity: "7.700 Watt",
    water: "PAM",
    facing: "Selatan",
    builtYear: 2024,
    coordinates: { lat: -7.42183, lng: 109.24215 },
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4ea0d?w=1200&q=80",
    ],
  },
  {
    id: "prop-3",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80",
    title: "Rumah Cluster Premium",
    location: "Purwokerto Utara",
    beds: 3,
    baths: 3,
    cars: 2,
    area: 110,
    landArea: 135,
    certificate: "SHM",
    kpr: "Rp 9.1 Juta",
    bookingPrice: "Rp 2.500.000",
    priceNumeric: 1350000000,
    features: ["Carport", "Keamanan 24 Jam", "Dekat Sekolah", "Dekat Mall"],
    link: "/properti/rumah-cluster-premium",
    slug: "rumah-cluster-premium",
    description:
      "Rumah cluster 2 lantai di kawasan perumahan premium Purwokerto Utara. Desain modern kontemporer dengan ruang tamu luas, dapur open-plan, dan kamar tidur yang nyaman. Kawasan perumahan one gate system dengan keamanan 24 jam.",
    highlights: [
      "Perumahan one gate system",
      "Desain kontemporer 2 lantai",
      "Dapur open-plan modern",
      "Dekat RS & mall",
      "Lingkungan asri & hijau",
    ],
    propertyType: "Rumah",
    listingType: "Dijual",
    condition: "Baru",
    floors: 2,
    electricity: "3.500 Watt",
    water: "PDAM",
    facing: "Barat",
    builtYear: 2024,
    coordinates: { lat: -7.4192, lng: 109.2378 },
    gallery: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566752229-250ce2dd8206?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753104-685f4f24cb4d?w=1200&q=80",
    ],
  },
  {
    id: "prop-4",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    title: "Apartemen Studio Furnished",
    location: "Purwokerto Selatan",
    beds: 1,
    baths: 3,
    cars: 1,
    area: 36,
    landArea: 36,
    certificate: "HGB",
    kpr: "Rp 3.2 Juta",
    bookingPrice: "Rp 1.000.000",
    priceNumeric: 450000000,
    features: ["Dekat Mall", "Dekat Sekolah"],
    link: "/properti/apartemen-studio-furnished",
    slug: "apartemen-studio-furnished",
    description:
      "Apartemen studio fully furnished di lokasi pusat Purwokerto Selatan. Cocok untuk profesional muda atau sebagai investasi properti dengan potensi sewa tinggi. Dilengkapi perabot lengkap, AC, dan akses ke fasilitas gym, kolam renang, dan co-working space.",
    highlights: [
      "Fully furnished siap huni",
      "Fasilitas gym & kolam renang",
      "Lokasi pusat kota strategis",
      "Potensi sewa tinggi",
      "Akses co-working space",
    ],
    propertyType: "Apartemen",
    listingType: "Dijual",
    condition: "Baru",
    floors: 1,
    electricity: "900 Watt",
    water: "PAM",
    facing: "Utara",
    builtYear: 2022,
    coordinates: { lat: -7.4279, lng: 109.241 },
    gallery: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1de2d96674?w=1200&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    ],
  },
];

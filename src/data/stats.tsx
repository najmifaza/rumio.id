import { Users, Eye, MessageSquareText, Building2 } from "lucide-react";

export interface StatItem {
  icon: React.ElementType;
  value: string;
  label: string;
  description: string;
}

export const statsData: StatItem[] = [
  {
    icon: Users,
    value: "350+",
    label: "Properti Aktif",
    description: "Dipercaya oleh pemilik properti di berbagai kota.",
  },
  {
    icon: Eye,
    value: "12.5K+",
    label: "Total Pengunjung",
    description: "Jumlah kunjungan ke landing page properti kami.",
  },
  {
    icon: MessageSquareText,
    value: "2.1K+",
    label: "Leads Terkumpul",
    description: "Calon pembeli tertarik dan menghubungi via Rumio.",
  },
  {
    icon: Building2,
    value: "25+",
    label: "Kota di Indonesia",
    description: "Layanan Rumio telah tersedia di berbagai kota.",
  },
];

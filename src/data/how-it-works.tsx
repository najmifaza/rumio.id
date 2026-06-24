import { FileText, Camera, TrendingUp } from "lucide-react";

export interface StepItem {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

export const stepsData: StepItem[] = [
  {
    number: "1",
    icon: FileText,
    title: "Daftarkan Properti",
    description:
      "Isi form pendaftaran dengan detail properti Anda secara lengkap.",
  },
  {
    number: "2",
    icon: Camera,
    title: "Kami Siapkan & Promosikan",
    description:
      "Rumio membuat Virtual Tour 360°, landing page, dan media promosi.",
  },
  {
    number: "3",
    icon: TrendingUp,
    title: "Dapatkan Lebih Banyak Leads",
    description:
      "Properti Anda tampil profesional dan menarik lebih banyak calon pembeli.",
  },
];

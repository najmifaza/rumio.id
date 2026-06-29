import { getSettings } from "./actions";
import SettingsForm, { SettingField } from "@/components/admin/SettingsForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    redirect("/admin");
  }

  const fields: SettingField[] = [
    { 
      key: "general_office_address", 
      label: "Alamat Kantor Utama", 
      type: "textarea", 
      placeholder: "Contoh: Jl. Bintaro Utama Raya No.1..." 
    },
    { 
      key: "contact_whatsapp", 
      label: "Nomor WhatsApp (Admin / CS)", 
      type: "tel",
      placeholder: "Contoh: 6281234567890",
      helpText: "Gunakan format internasional tanpa tanda plus (contoh: 62812...)."
    },
    { 
      key: "contact_email", 
      label: "Alamat Email Resmi", 
      type: "email", 
      placeholder: "Contoh: hello@rumio.id" 
    },
    { 
      key: "contact_hours", 
      label: "Jam Operasional", 
      type: "text", 
      placeholder: "Contoh: Senin - Sabtu: 08:00 - 17:00" 
    },
    { 
      key: "social_instagram", 
      label: "Instagram URL", 
      type: "url",
      placeholder: "https://instagram.com/rumio.id"
    },
    { 
      key: "social_facebook", 
      label: "Facebook URL", 
      type: "url", 
      placeholder: "https://facebook.com/rumio.id" 
    },
    { 
      key: "social_tiktok", 
      label: "TikTok URL", 
      type: "url", 
      placeholder: "https://tiktok.com/@rumio.id" 
    },
    { 
      key: "social_youtube", 
      label: "YouTube URL", 
      type: "url", 
      placeholder: "https://youtube.com/c/rumio_id" 
    }
  ];

  const res = await getSettings(fields.map(f => f.key));

  return (
    <SettingsForm 
      title="Pengaturan Sistem" 
      description="Kelola informasi operasional, kontak, dan sosial media website Anda dalam satu halaman."
      fields={fields}
      initialData={res.data || {}}
    />
  );
}

import { getSettings } from "../actions";
import SettingsForm, { SettingField } from "@/components/admin/SettingsForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SocialSettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    redirect("/admin");
  }

  const fields: SettingField[] = [
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
      title="Pengaturan Sosial Media" 
      description="Masukkan URL resmi akun sosial media Anda untuk ditampilkan di website."
      fields={fields}
      initialData={res.data || {}}
    />
  );
}

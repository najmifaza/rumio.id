import { getSettings } from "../actions";
import SettingsForm, { SettingField } from "@/components/admin/SettingsForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ContactSettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    redirect("/admin");
  }

  const fields: SettingField[] = [
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
    }
  ];

  const res = await getSettings(fields.map(f => f.key));

  return (
    <SettingsForm 
      title="Pengaturan Kontak" 
      description="Atur informasi kontak yang akan ditampilkan kepada pengunjung."
      fields={fields}
      initialData={res.data || {}}
    />
  );
}

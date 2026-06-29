import { getSettings } from "../actions";
import SettingsForm, { SettingField } from "@/components/admin/SettingsForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function GeneralSettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    redirect("/admin");
  }

  const fields: SettingField[] = [
    { 
      key: "general_site_name", 
      label: "Nama Website", 
      placeholder: "Contoh: Rumio.id - Spesialis Properti Bintaro" 
    },
    { 
      key: "general_site_description", 
      label: "Deskripsi Singkat (SEO)", 
      type: "textarea", 
      placeholder: "Tuliskan deskripsi yang akan muncul di mesin pencari..." 
    },
    { 
      key: "general_office_address", 
      label: "Alamat Kantor Utama", 
      type: "textarea", 
      placeholder: "Contoh: Jl. Bintaro Utama Raya No.1..." 
    }
  ];

  const res = await getSettings(fields.map(f => f.key));

  return (
    <SettingsForm 
      title="Pengaturan Umum" 
      description="Kelola informasi dasar dan identitas website Anda."
      fields={fields}
      initialData={res.data || {}}
    />
  );
}

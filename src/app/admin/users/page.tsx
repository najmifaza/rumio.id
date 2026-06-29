import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUsers } from "./actions";
import UsersClient from "./UsersClient";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);

  // Hanya ADMIN utama yang boleh masuk
  if (!session || session.user.role !== "ADMIN") {
    redirect("/admin");
  }

  const users = await getUsers();

  return <UsersClient users={users} currentUserId={session.user.id} />;
}

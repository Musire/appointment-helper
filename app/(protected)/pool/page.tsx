import { StaffPool } from "@/features/pool";
import { getCurrentUser } from "@/lib/auth/session"
import { redirect } from "next/navigation";

export default async function PoolPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "STAFF") {
    redirect("/dashboard");
  }

  return <StaffPool />;
  
}
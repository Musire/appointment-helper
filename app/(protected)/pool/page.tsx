import { getCurrentUser } from "@/domains/identity/auth/session";
import { StaffPool } from "@/domains/pool";
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
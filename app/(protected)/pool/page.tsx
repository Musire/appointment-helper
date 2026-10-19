import { getCurrentUser } from "@/domains/auth/auth.actions";
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
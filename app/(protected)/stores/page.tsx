import { StaffStore } from "@/features/stores";
import { getCurrentUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function StoresPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  switch (user.role) {
    case "STAFF":
      return <StaffStore />

    default:
      return redirect("/dashboard")
  }
}
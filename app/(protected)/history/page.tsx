import { EnduserHistory, StaffHistory } from "@/features/history";
import { getCurrentUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function HistoryPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  switch (user.role) {
    case "STAFF":
      return <StaffHistory />
    case "USER":
      return <EnduserHistory />

    default:
      return redirect("/dashboard")
  }
}
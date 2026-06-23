import { AdminDashboard, EnduserDashboard, StaffDashboard } from "@/features/dashboard"
import { getCurrentUser } from "@/lib/auth/session"
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  switch (user.role) {
    case "SUPERADMIN":
    case "ADMIN":
      return <AdminDashboard />

    case "STAFF":
      return <StaffDashboard />

    default:
      return <EnduserDashboard />
  }
}
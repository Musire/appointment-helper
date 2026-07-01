import { RoleRenderer } from "@/components/UI/auth/RoleRenderer";
import { AdminDashboard, EnduserDashboard, StaffDashboard } from "@/features/dashboard/components";

export default async function DashboardPage() {
  return (
    <RoleRenderer
      roles={{
        ADMIN: <AdminDashboard />,
        STAFF: <StaffDashboard />,
        USER: <EnduserDashboard />
      }}>
    </RoleRenderer>
  )
}

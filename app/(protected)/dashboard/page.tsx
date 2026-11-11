import { RoleRenderer } from "@/components/ui/auth/RoleRenderer";
import { AdminDashboard, EnduserDashboard, StaffDashboard } from "@/features/dashboard/components";
import EndUserDashboardDataLayer from "@/features/dashboard/components/EndUserDashboardDataLayer";

export default async function DashboardPage() {
  return (
    <RoleRenderer
      roles={{
        ADMIN: <AdminDashboard />,
        STAFF: <StaffDashboard/>,
        USER: <EndUserDashboardDataLayer />
      }}>
    </RoleRenderer>
  )
}

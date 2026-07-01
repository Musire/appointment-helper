import { RoleRenderer } from "@/components/UI/auth/RoleRenderer";
import AdminDashboard  from "@/features/dashboard/components/AdminDashboard"
import StaffDashboard from "@/features/dashboard/components/staff/StaffDashboard"
import EnduserDashboard  from "@/features/dashboard/components/EnduserDashboard";

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

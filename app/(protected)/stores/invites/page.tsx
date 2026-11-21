import { RoleRenderer } from "@/components/ui/auth/RoleRenderer";
import StaffInviteDataLayer from "@/domains/availability/components/StaffInviteDataLayer";



export default async function StoreInvites() {
  return (
    <RoleRenderer 
      roles={{
        STAFF: <StaffInviteDataLayer />
      }}
    />
  )
}
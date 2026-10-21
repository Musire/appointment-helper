import { RoleRenderer } from "@/components/ui/auth/RoleRenderer";
import StaffPool from "@/domains/pool/components/StaffPoolDataLayer";

export default async function PoolPage() {
  return (
    <RoleRenderer 
      roles={{
        STAFF: <StaffPool />
      }}
    />
  )
}
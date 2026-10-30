import { RoleRenderer } from "@/components/ui/auth/RoleRenderer";
import { AdminStore } from "@/domains/store/components";
import StaffStoreDataLayer from "@/domains/availability/components/StaffStoreDataLayer";

type Props = {
  params: Promise<{ storeId: string }>
}

export default async function StoresPage({ params }: Props) {
  return (
    <RoleRenderer 
      roles={{
        STAFF: <StaffStoreDataLayer />,
        ADMIN: <AdminStore />
      }}
    />
  )
}
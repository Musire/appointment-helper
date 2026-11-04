import { RoleRenderer } from "@/components/ui/auth/RoleRenderer";
import StaffStoreDataLayer from "@/domains/availability/components/StaffStoreDataLayer";
import { AdminStoreDetails } from "@/features/admin-store-management/components";
import { convertParamToString } from "@/lib/manipulateParam";

type Props = {
  params: Promise<{ storeId: string }>
}

export default async function StoresPage({ params }: Props) {
  const { storeId } = await params
  return (
    <RoleRenderer 
      roles={{
        STAFF: <StaffStoreDataLayer />,
        ADMIN: <AdminStoreDetails storeId={convertParamToString(storeId)} />
      }}
    />
  )
}
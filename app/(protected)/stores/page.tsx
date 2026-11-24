import { RoleRenderer } from "@/components/ui/auth/RoleRenderer";
import StaffStoreDataLayer from "@/domains/availability/components/StaffStoreDataLayer";
import StoreDetailsDataLayer from "@/features/admin-store-management/components/StoreDetailsDataLayer";
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
        ADMIN: <StoreDetailsDataLayer storeId={convertParamToString(storeId)} />
      }}
    />
  )
}
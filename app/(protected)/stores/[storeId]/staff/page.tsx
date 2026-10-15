import { RoleRenderer } from "@/components/ui/auth/RoleRenderer";
import StoreStaffDataLayer from "@/features/admin-staff-search/components/StoreStaffDataLayer";

type Props = {
  params: Promise<{ storeId: string }>
}

export default async function StoreServiceStaffPage ({ params }: Props ) {
    const { storeId } = await params
    return (
        <RoleRenderer 
            roles={{
                'ADMIN': <StoreStaffDataLayer storeId={storeId} />    
            }}
        />
    );
}
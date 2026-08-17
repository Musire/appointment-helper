import { RoleRenderer } from "@/components/ui/auth/RoleRenderer";
import { StoreStaff } from "@/features/admin-staff-search/components/server";

type Props = {
  params: Promise<{ storeId: string }>
}

export default async function StoreServiceStaffPage ({ params }: Props ) {
    const { storeId } = await params
    return (
        <RoleRenderer 
            roles={{
                'ADMIN': <StoreStaff storeId={storeId} />    
            }}
        />
    );
}
import { RoleRenderer } from "@/components/ui/auth/RoleRenderer";
import { AdminStoreDetails } from "@/features/admin-store-management/components";
import { ParamsType } from "@/lib/types";

type Props = ParamsType<{storeId: string}>

export default async function StoreDetailsPage ({ params }: Props) {
    const { storeId } = await params
    
    return (
        <RoleRenderer
            roles={{
                'ADMIN': <AdminStoreDetails storeId={storeId} />
            }}
        />
    );
}
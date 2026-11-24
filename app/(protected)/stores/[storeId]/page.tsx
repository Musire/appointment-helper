import { RoleRenderer } from "@/components/ui/auth/RoleRenderer";
import StoreDetailsDataLayer from "@/features/admin-store-management/components/StoreDetailsDataLayer";
import { ParamsType } from "@/lib/types";

type Props = ParamsType<{storeId: string}>

export default async function StoreDetailsPage ({ params }: Props) {
    const { storeId } = await params
    
    return (
        <RoleRenderer
            roles={{
                'ADMIN': <StoreDetailsDataLayer storeId={storeId} />
            }}
        />
    );
}
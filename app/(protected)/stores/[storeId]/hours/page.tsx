import { RoleRenderer } from "@/components/UI/auth/RoleRenderer";
import { HourConfig } from "@/domains/store/components";
import { AdminStoreHours } from "@/features/admin-store-management/components";

type Props = {
  params: Promise<{ storeId: string }>
}

export default function StoreHoursPage ({ params }: Props) {
    return (
        <RoleRenderer 
            roles={{
                'ADMIN': <HourConfig params={params} />   
            }}
        />
    );
}
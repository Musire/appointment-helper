import { RoleRenderer } from "@/components/ui/auth/RoleRenderer";
import StoreAvailabilityDataLayer from "@/features/staff-store/components/StoreAvailabilityDataLayer";
import { convertParamToString } from "@/lib/manipulateParam";

type Props = {
  params: Promise<{ storeId: string }>
}

export default async function StoreAvailiblityPage ({ params }: Props) {
    const {storeId} = await params
    const converted = convertParamToString(storeId)
    return (
        <RoleRenderer 
            roles={{
                'STAFF': <StoreAvailabilityDataLayer storeId={converted} />
            }}
        />
    );
}

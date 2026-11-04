import { RoleRenderer } from "@/components/ui/auth/RoleRenderer";
import AdminHourDataLayer from "@/features/hour-selection/components/AdminHourDataLayer";
import { convertParamToString } from "@/lib/manipulateParam";

type Props = {
  params: Promise<{storeId: string}>
}

export default async function StoreHoursPage ({params}: Props) {
    const { storeId } = await params
    return (
        <RoleRenderer 
            roles={{
                ADMIN: <AdminHourDataLayer storeId={convertParamToString(storeId)} />
            }}
        />
    );
}
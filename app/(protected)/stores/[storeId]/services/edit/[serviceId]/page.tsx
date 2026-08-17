import { RoleRenderer } from "@/components/ui/auth/RoleRenderer";
import AdminServiceEdit from "@/features/mutate-service/components/AdminEditService";

type Props = {
  params: Promise<{ storeId: string, serviceId: string }>
}

export default async function EditServicePage ({ params }: Props) {
    return (
        <RoleRenderer
            roles={{
                'ADMIN': <AdminServiceEdit params={params} />   
            }}
        />
    );
}
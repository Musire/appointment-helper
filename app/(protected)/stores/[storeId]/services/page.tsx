import { RoleRenderer } from "@/components/ui/auth/RoleRenderer";
import ServicePage from "@/domains/service/components/StoreService";

type Props = {
  params: Promise<{ storeId: string }>
}

export default async function StoreServicesPage ({ params }: Props) {
    return (
        <RoleRenderer
            roles={{
                'ADMIN': <ServicePage params={params} />   
            }}
        />
    );
}
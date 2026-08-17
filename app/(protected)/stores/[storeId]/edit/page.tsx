import { RoleRenderer } from "@/components/ui/auth/RoleRenderer";
import { StoreEdit } from "@/features/admin-store-management/components";

type Props = {
  params: Promise<{
    storeId: string
  }>
}

export default function StoreEditPage ({ params }: Props) {
    return (
        <RoleRenderer 
            roles={{
                'ADMIN': <StoreEdit params={params}/>   
            }}
        />
    );
}
import { RoleRenderer } from "@/components/ui/auth/RoleRenderer";
import AdminStoreEditDataLayer from "@/domains/store/components/AdminStoreEditDataLayer";

type Props = {
  params: Promise<{
    storeId: string
  }>
}

export default function StoreEditPage ({ params }: Props) {
    return (
        <RoleRenderer 
            roles={{
                'ADMIN': <AdminStoreEditDataLayer params={params}/>   
            }}
        />
    );
}
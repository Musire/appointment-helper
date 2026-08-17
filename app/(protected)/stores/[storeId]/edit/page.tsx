import { RoleRenderer } from "@/components/ui/auth/RoleRenderer";
import { StoreEdit } from "@/features/admin-store-management/components";

export default function StoreEditPage () {
    return (
        <RoleRenderer 
            roles={{
                'ADMIN': <StoreEdit/>   
            }}
        />
    );
}
import { RoleRenderer } from "@/components/UI/auth/RoleRenderer";
import AdminNewStore from "@/features/create-store/components/AdminNewStore";

export default function NewStore () {
    return (
        <RoleRenderer 
            roles={{
                'ADMIN': <AdminNewStore /> 
            }}
        />
    );
}
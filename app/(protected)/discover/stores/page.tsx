import { RoleRenderer } from "@/components/UI/auth/RoleRenderer";
import { StoreDiscovery } from "@/features/discover-store/components";


export default async function DiscoverStore () {

    return (
        <RoleRenderer 
            roles={{
                'USER': <StoreDiscovery />
            }}
        /> 
    );
}
import { RoleRenderer } from "@/components/ui/auth/RoleRenderer";
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
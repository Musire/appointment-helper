import { RoleRenderer } from "@/components/UI/auth/RoleRenderer";
import { BarberDiscovery } from "@/features/discover-barber/components";


export default async function DiscoverBarber () {

    return (
        <RoleRenderer 
            roles={{
                'USER': <BarberDiscovery />
            }}
        /> 
    );
}
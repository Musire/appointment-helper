import { RoleRenderer } from "@/components/ui/auth/RoleRenderer";
import { NewService } from "@/domains/service/components";


export default async function NewStoreServicePage () {
    return (
        <RoleRenderer
            roles={{
                'ADMIN': <NewService  />   
            }}
        />
    );
}
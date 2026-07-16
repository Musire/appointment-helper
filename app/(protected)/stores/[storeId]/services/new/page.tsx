import { RoleRenderer } from "@/components/UI/auth/RoleRenderer";
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
import { RoleRenderer } from "@/components/UI/auth/RoleRenderer";
import { NewCategory } from "@/domains/service/components";


export default async function NewStoreServiceCategoryPage () {
    return (
        <RoleRenderer
            roles={{
                'ADMIN': <NewCategory />   
            }}
        />
    );
}
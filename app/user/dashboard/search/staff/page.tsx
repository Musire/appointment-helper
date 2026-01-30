import { StaffSearch } from "@/app/user/components";
import { getActiveStaff } from "@/lib/queries/users";

export default async function StaffSearchPage () {
    const staff = await getActiveStaff()
    
    return (
        <div className="">
            <StaffSearch staff={staff} />
        </div>
    );
}
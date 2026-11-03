import { getProfile } from "@/domains/profile/user-profile/queries/profile";
import StaffProfile from "./StaffProfile";

export default async function StaffProfileDataLayer () {
    const profile = await getProfile()
    
    return (
        <div className="flex flex-1">
            <StaffProfile profile={profile} />
        </div>
    );
}
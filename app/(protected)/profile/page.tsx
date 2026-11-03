import { RoleRenderer } from "@/components/ui/auth/RoleRenderer";
import StaffProfileDataLayer from "@/features/profile-staff/components/StaffProfileDataLayer";

export default function ProfilePage () {
    return (
        <RoleRenderer 
          roles={{
            STAFF: <StaffProfileDataLayer />
          }}
        />
    );
}
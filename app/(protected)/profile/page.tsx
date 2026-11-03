import { RoleRenderer } from "@/components/ui/auth/RoleRenderer";
import AdminProfileDataLayer from "@/features/profile-admin/components/AdminProfileDataLayer";
import UserProfileDataLayer from "@/features/profile-enduser/components/UserProfileDataLayer";
import StaffProfileDataLayer from "@/features/profile-staff/components/StaffProfileDataLayer";

export default function ProfilePage () {
    return (
        <RoleRenderer 
          roles={{
            ADMIN: <AdminProfileDataLayer />,
            STAFF: <StaffProfileDataLayer />,
            USER: <UserProfileDataLayer />
          }}
        />
    );
}
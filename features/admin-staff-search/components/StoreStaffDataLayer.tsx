import { getInviteStatus } from "@/domains/invite/invite.queries";
import { getAvailableStaff } from "@/domains/staff/staff.queries";
import StoreStaff from "./StoreStaff";
import { StaffDataType } from "@/domains/invite/invite.types";

export default async function StoreStaffDataLayer ({ storeId }: { storeId: string }) {
    const { data: staffData } = await getAvailableStaff(storeId) as { data: StaffDataType[] };
    const { data : inviteData } = await getInviteStatus(storeId)

    if (!staffData || !inviteData) return <div className="">some error</div>

    return (
        <StoreStaff staffData={staffData} inviteData={inviteData} />
    );
}
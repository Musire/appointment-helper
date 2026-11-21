import { getStaffInvites } from "@/domains/invite/invite.queries";
import StaffInvites from "./StaffInvites";

export default async function StaffInviteDataLayer () {
    const { data: invites } = await getStaffInvites()

    return (
        <StaffInvites invites={invites ?? []} />
    );
}
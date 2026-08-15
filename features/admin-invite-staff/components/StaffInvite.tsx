import { InviteType } from "../types";
import InvitationCard from "./InvitationCard";

export default async function StaffInvitationPage ({ data }: { data: InviteType[] }) {

  return (
    <div className="flex flex-col flex-1 py-6 space-y-6">
      {data?.map(c => <InvitationCard key={c.id} data={c} />)}
      {!data.length && (
        <p className="flex-1 text-else centered ">no candidates found</p>
      )}
    </div>
  );
}
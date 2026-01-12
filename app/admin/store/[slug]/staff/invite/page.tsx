import { StaffSearch } from "@/components/dashboards/client";
import { BackButton } from "@/components/UI/buttons";

export default function StaffInvitationPage () {

  return (
    <div className="flex flex-col py-6 space-y-6">
      <BackButton className="w-24" />
      <StaffSearch data={[]} />
    </div>
  );
}
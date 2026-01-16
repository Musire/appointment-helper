import { StaffSearch } from "@/components/dashboards";
import { BackButton } from "@/components/UI/buttons";
import { getInvitableStaffUsers } from "@/lib/queries/users";

export default async function StaffInvitationPage ({ params }: { params : { slug: string}}) {
  const { slug } = await params
  const staff = await getInvitableStaffUsers(slug)

  return (
    <div className="flex flex-col py-6 space-y-6">
      <BackButton className="w-24" />
      <StaffSearch data={staff} />
    </div>
  );
}
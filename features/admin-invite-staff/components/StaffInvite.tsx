import { StaffSearch } from "@/app/admin/store/[slug]/staff/components";
import { BackButton } from "@/components/UI/buttons";
import { getInvitableStaffUsers } from "@/lib/queries/users";

export default async function StaffInvitationPage ({ params }: { params : { slug: string}}) {
  const { slug } = await params
  const staff = await getInvitableStaffUsers(slug)

  return (
    <div className="flex flex-col py-6 space-y-6">
      <BackButton className="w-24" />
      <StaffSearch data={staff} store={{ id:'449813c0-582f-4640-b16f-7d5bbc94c697', name: 'fresh cutz'}} />
    </div>
  );
}
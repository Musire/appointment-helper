import { ProfileCreation } from "@/features/staff/components";

export default async function StaffStatus () {
  
  const requirements = {
    hours: true
  }

  return (
    <div className=" relative flex flex-col divide-y-2 divide-disabled py-6 ">
      <ProfileCreation requirements={requirements} />
    </div>
  );
}
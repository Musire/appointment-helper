import ProfileCreation from "./ProfileCreation";

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
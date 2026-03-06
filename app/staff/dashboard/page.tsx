import { ProfileCreation } from "../components";

export default async function StaffDashboard () {
  
  const requirements = {
    hours: true
  }

  return (
    <div className=" relative flex flex-col divide-y-2 divide-disabled ">
      <ProfileCreation requirements={requirements} />
    </div>
  );
}
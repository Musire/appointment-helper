import { AvatarCard, BioCard, ContactInfo } from "@/domains/staff-dashboard";

export default async function StaffDashboard () {

  const testData = {
    name: 'mark johnson',
    job: 'expert barber',
    bio: "Over 10 years of experience in classic cuts, fades, and beard grooming. Passionate about creationg the perfect look for every client."
  }

  return (
    <div className=" relative flex flex-col divide-y-2 divide-disabled ">
      <AvatarCard data={testData} />
      <ContactInfo />
      <BioCard bio={testData.bio}  />
    </div>
  );
}
import { Body } from "@/components/UI";
import { ListItem, ProfileHeader, SegmentCard } from "@/domains/user-profile";

export default async function StaffDashboard () {

  const testData = {
    name: 'mark johnson',
    job: 'expert barber',
    bio: "Over 10 years of experience in classic cuts, fades, and beard grooming. Passionate about creationg the perfect look for every client."
  }

  return (
    <div className="h-[77dvh] overflow-y-scroll scrollbar-none grid grid-cols-1 md:grid-cols-2 py-6 divide-y-2 divide-disabled gap-6 ">
      <div className="md:row-span-2 h-full">
        <ProfileHeader />
      </div>
      <SegmentCard title="Contact Information">
        <ListItem 
          icon="mail"
          label="Email"
          value="neoteric.languageservices@gmail.com"
        />
        <ListItem 
          icon="phone"
          label="Phone"
          value="+52 (614) 123 4567"
        />
        <ListItem 
          icon="instagram"
          label="Instagram"
          value="@markthebarber"
        />
      </SegmentCard>
      <SegmentCard title="Biography" >
        <Body>{testData.bio}</Body>
      </SegmentCard>
    </div>
  );
}

import { ListItem, ProfileHeader, SegmentCard } from "@/domains/user-profile/components";

export default function UserProfile() {
  return (
    <div className="h-[50dvh] py-6">
      <div className="max-w-md mx-auto space-y-6">
        <ProfileHeader />

        <SegmentCard title="Contact Information">
          <ListItem
            icon="mail"
            label="Email"
            value="neoteric.languageservices@gmail.com"
          />
          <ListItem
            icon="phone"
            label="Phone"
            value="neoteric.languageservices@gmail.com"
          />
        </SegmentCard>
      </div>
    </div>
  );
}

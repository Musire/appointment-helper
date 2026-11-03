import { Profile } from "../profile.types";
import { ListItem, ProfileHeader, SegmentCard } from "../user-profile";

type Props = {
  profile: Profile
}

export default function UserProfile({ profile }: Props ) {
  return (
    <div className="h-[50dvh] py-6">
      <div className="max-w-md mx-auto space-y-6">
        <ProfileHeader profile={profile}  />

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

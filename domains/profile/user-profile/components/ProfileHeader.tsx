import { Caption } from "@/components/UI";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { getProfile } from "../queries/profile";
import AvatarImage from "./AvatarImage";

export default async function ProfileHeader() {
    const profile = await getProfile()
    
    if (!profile) {
        return (
            <div className="">no profile found</div>
        )
    }
    return (
        <article className="centered-col p-6 surface-1 rounded-xl stacked space-y-4">
            {/* img placeholder */}
            <AvatarImage imageUrl={profile?.avatarUrl} className="size-48" />
            <p className="text-lg text-main capitalize">{profile?.fullName}</p>
            <Link href="profile/edit" className="flex items-center gap-2 px-4 py-2 rounded-full border-border border hover:bg-background  transition">
                <Pencil size={16} />
                <Caption className="text-fluid-sm">Edit Profile</Caption>
            </Link>
        </article>
    );
}
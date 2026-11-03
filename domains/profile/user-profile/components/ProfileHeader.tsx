'use client';

import { Caption } from "@/components/ui";
import { logout } from "@/domains/auth/auth.actions";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { Profile } from "../../profile.types";
import AvatarImage from "./AvatarImage";

type Props = {
    profile: Profile
}

export default function ProfileHeader({ profile }: Props) {

    if (!profile) return null;
    
    return (
        <article className="relative centered-col p-6 surface-1 rounded-xl stacked space-y-4">
            {/* img placeholder */}
            <AvatarImage imageUrl={profile?.avatarUrl} className="size-48" />
            <p className="text-lg text-main capitalize">{profile?.fullName}</p>
            <Link href="profile/edit" className="flex items-center gap-2 px-4 py-2 rounded-full border-border border hover:bg-background  transition">
                <Pencil size={16} />
                <Caption className="text-fluid-sm">Edit Profile</Caption>
            </Link>
            <button 
                type="button" 
                onClick={logout}
                className="absolute right-4 top-6 normal-space bg-error/20 rounded-lg w-24 cursor-pointer hover:bg-error/40 text-else hover:text-main"
            >
                logout
            </button>
        </article>
    );
}
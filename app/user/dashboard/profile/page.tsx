import { AvatarImage } from "@/domains/user-profile";
import { getProfile } from "@/domains/user-profile/queries/profile";
import { Mail, Smartphone } from "lucide-react";
import Link from "next/link";

export default async function ProfilePage () {
    const profile = await getProfile()
    // console.log('profile', profile)
    
    if (!profile) {
        return (
            <div className="">no profile found</div>
        )
    }
    return (
        <div className=" relative flex flex-col divide-y-2 divide-disabled ">
            <article className="centered-col pb-6">
                {/* img placeholder */}
                <AvatarImage imageUrl={profile?.avatarUrl} className="size-48" />
                <p className="text-lg text-main capitalize">{profile?.fullName}</p>
                <Link href="profile/edit" className="btn w-48 mt-2 text-center text-main">Edit Profile</Link>
            </article>
            <ul className="stacked space-y-2 mt-6 ml-6">
                <li className="font-semibold text-main">Contact Info</li>
                <li className="space-x-2 flex items-center ">
                    <Mail strokeWidth={1} />
                    <p className="">{profile?.email}</p>
                </li>
                <li className="space-x-2 flex items-center ">
                    <Smartphone strokeWidth={1} />
                    <p className="">{profile?.email}</p>
                </li>
            </ul>
        </div>
    );
}
"use client";

import { Bell } from "lucide-react";
import Link from "next/link";
import { useHeaderTitle } from "../hooks/useHeaderTitle";
import AvatarButton from "./AvatarButton";
import BackButton from "./BackButton";


type Props = {
    avatarUrl: string | null
}

export default function Header({ avatarUrl }: Props) {
  const title = useHeaderTitle()

  return (
    // 'h-20' and 'spaced' (flex justify-between) ensure dimensions are retained
    <div className="border-b border-whitesmoke/15 w-full h-20 flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <BackButton />
        {/* 3. The title displays only if it exists in the map */}
        <p className="text-2xl font-medium min-w-25">
          {title}
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Link 
          href="/notification" 
          className="bg-transparent border border-adjust hover:bg-darkest rounded-full size-10 flex items-center justify-center"
        >
          <Bell size={15} strokeWidth={1} />
        </Link>
        {avatarUrl && <AvatarButton avatarUrl={avatarUrl} />}
      </div>
    </div>
  );
}

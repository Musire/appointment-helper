"use client";

import { useHeaderTitle } from "../hooks/useHeaderTitle";
import AvatarButton from "./AvatarButton";
import BackButton from "./BackButton";
import NotificationButton from "./NotificationButton";

type Props = {
    avatarUrl: string | null
}

export default function Header({ avatarUrl }: Props) {
  const title = useHeaderTitle()

  return (
    <div className="border-b border-border w-full h-20 flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <BackButton />
        <p className="text-2xl font-medium min-w-25">
          {title}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <NotificationButton />
        <AvatarButton avatarUrl={avatarUrl} />
      </div>
    </div>
  );
}

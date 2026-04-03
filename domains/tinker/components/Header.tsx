"use client";

import { Button } from "@/components/UI/buttons";
import { useDrawer } from "@/hooks";
import { Bell } from "lucide-react";
import { useHeaderTitle } from "../hooks/useHeaderTitle";
import AvatarButton from "./AvatarButton";
import BackButton from "./BackButton";
import { SidePanel } from "@/components/UI/sidepanel";


type Props = {
    avatarUrl: string | null
}

export default function Header({ avatarUrl }: Props) {
  const title = useHeaderTitle()
  const { isMounted, animation, openDrawer, closeDrawer } = useDrawer()

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
        <Button
          onClick={openDrawer}
          className="border border-adjust rounded-full  flex items-center justify-center min-w-10 h-10 w-10 p-0"
        >
          <Bell size={20} strokeWidth={1} />
        </Button>
        <SidePanel 
          onClose={closeDrawer} 
          isMounted={isMounted}
          animation={animation} 
        />
        {avatarUrl && <AvatarButton avatarUrl={avatarUrl} />}
      </div>
    </div>
  );
}

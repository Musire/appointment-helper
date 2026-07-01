"use client";

import { Drawer, Theme } from "@/components/UI";
import { Button } from "@/components/ui/button";
import { logout } from "@/domains/identity/actions/auth.actions";
import { useDrawer } from "@/hooks";
import { User } from "lucide-react";
import Link from "next/link";


type Props = {
  avatarUrl: string | null;
}

export default function AvatarButton({ avatarUrl }: Props) {
  const { isMounted, animation, toggleDrawer, closeDrawer } = useDrawer(300);

  return (
    <div className="flex items-center space-x-2">
      {/* The Trigger Button */}
      <button 
        onClick={toggleDrawer}
        type="button"
        aria-label="Toggle Menu"
        className="relative size-10 rounded-full bg-mid overflow-hidden hover:ring-2 ring-main transition-all hover:cursor-pointer"
      >
        {!avatarUrl
          ? <div className="text-deep centered">
              <User />
            </div>
          : <img 
              src={avatarUrl} 
              alt="User Profile" 
              className="w-full h-full object-cover"
            />
        }
      </button>
      {/* The Drawer Instance */}
      <Drawer 
        isMounted={isMounted} 
        animation={animation} 
        withOverlay 
        onClose={closeDrawer} 
      >
        <div className="fixed inset-y-0 right-0 w-80 surface-1 shadow-2xl p-6 stacked space-y-4">
           {/* Drawer content goes here */}
           <Theme />
           <Link href={`profile`} onClick={closeDrawer}>View Profile</Link>
           <Button type="button" className="w-24" onClick={logout}>logout</Button>
        </div>
      </Drawer>
    </div>
  );
}

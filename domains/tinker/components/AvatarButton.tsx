"use client";

import { logout } from "@/app/actions/auth.actions";
import { Drawer } from "@/components/UI";
import { useDrawer } from "@/hooks";


type Props = {
  avatarUrl: string;
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
        className="relative size-10 rounded-full bg-mid overflow-hidden hover:ring-2 ring-main transition-all"
      >
        <img 
          src={avatarUrl} 
          alt="User Profile" 
          className="w-full h-full object-cover"
        />
      </button>

      {/* The Drawer Instance */}
      <Drawer 
        isMounted={isMounted} 
        animation={animation} 
        withOverlay 
        onClose={closeDrawer} 
      >
        <div className="fixed inset-y-0 right-0 w-80 bg-darkest shadow-2xl p-6">
           {/* Drawer content goes here */}
           <button type="button" className="btn" onClick={logout}>logout</button>
        </div>
      </Drawer>
    </div>
  );
}

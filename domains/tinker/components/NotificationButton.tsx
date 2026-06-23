"use client";

import { Drawer } from "@/components/UI";
import { useDrawer } from "@/hooks";
import { Bell } from "lucide-react";


export default function NotificationButton() {
  const { isMounted, animation, toggleDrawer, closeDrawer } = useDrawer(300);

  return (
    <div className="flex items-center space-x-2">
      {/* The Trigger Button */}
      <button 
        onClick={toggleDrawer}
        type="button"
        aria-label="Toggle Menu"
        className="border border-border rounded-full  flex items-center justify-center min-w-10 h-10 w-10 p-0 hover:cursor-pointer hover:ring-2 ring-main"
      >
        <Bell size={20} strokeWidth={1} />
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
           hi it's the side panel notificaiton section
        </div>
      </Drawer>
    </div>
  );
}

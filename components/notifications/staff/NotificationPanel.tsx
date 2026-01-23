'use client';

import { useDrawer, useNotifications } from "@/hooks";
import { Bell } from "lucide-react";
import NotificationsClient from "./NotificationClient";

export type NotificationPanelProps = {
    userId: string | null
}

export default function NotificationPanel ({ userId } : NotificationPanelProps) {
    const { isMounted, toggleDrawer } = useDrawer()
    const { unreadCount, notifications } = useNotifications(userId)
    return (
        <>
            <button 
                type="button" 
                className="relative text-whitesmoke/60 hover:text-whitesmoke/87 hover:cursor-pointer active:text-whitesmoke/87"
                onClick={toggleDrawer}
            >
                <Bell size={25}/>
                <p className="absolute -right-1 top-0 bg-darker rounded-full size-5 centered text-sm">{unreadCount}</p>
            </button>
            {isMounted && <NotificationsClient notifications={notifications} />}
        </>
    );
}
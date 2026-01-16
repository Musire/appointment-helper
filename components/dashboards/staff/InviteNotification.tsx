'use client';
import { Notification } from "@/generated/prisma";
import { timeAgo } from "@/lib/time";

export type InviteNotificationProp = {
    notification: Notification
}

export default function InviteNotification ({ notification }: InviteNotificationProp) {
    const { read, createdAt } = notification

    const handleAccept = () => console.log('invite accepted')
    const handleReject = () => console.log('invite rejected')
    return (
        <li className={` border border-whitesmoke/20 p-4 flex flex-col space-y-4 ${read ? "" : "bg-darker"}`}>
            <span className="w-full spaced">
                <p className="font-medium">You have been invited to join: store name</p>
                <p className="text-muted text-sm">
                    {timeAgo(createdAt)}
                </p>
            </span>
            <span className="w-full spaced space-x-4 ">
                <button onClick={handleAccept} type="button" className="active:bg-whitesmoke/87 active:text-deep grow flex-1 h-full border border-whitesmoke/20 py-2 capitalize hover:cursor-pointer">accept</button>
                <button onClick={handleReject} type="button" className="grow  h-full flex-1 active:bg-rose-950/30 border border-whitesmoke/20 active:border-error-dark py-2 active:text-rose-100 capitalize hover:cursor-pointer">reject</button>
            </span>
        </li>
    );
}
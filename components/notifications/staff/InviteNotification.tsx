'use client';
import { acceptInvite, rejectInvite } from "@/app/actions/invite.actions";
import { Notification } from "@/generated/prisma";
import { parseSchemaSync } from "@/lib/helpers/parseSchema";
import { timeAgo } from "@/lib/time";
import { InviteNotificationPayloadSchema } from "@/validation/NotificationPayload.schema";
import { Check, X } from "lucide-react";
import { useState } from "react";
import InviteNotificationView from "./InviteNotificationView";

export type InviteNotificationProp = {
    notification: Notification
}

export default function InviteNotification ({ notification }: InviteNotificationProp) {
    const { read, createdAt, payload, id } = notification
    const { inviteId, inviteStatus } = parseSchemaSync(InviteNotificationPayloadSchema, payload)

    const [msg, setMsg] = useState<string | null>(null)
    const [err, setErr] = useState<string | null>(null)

    const handleAccept = async (inviteId: string, notificationId: string) => {
        const { success, error } = await acceptInvite(inviteId, notificationId)
        if (!success) {
            setErr(error)
            return;
        }
        setMsg('Invite was accepted')
    }

    const handleReject = async (inviteId: string, notificationId: string) => {
        const { success, error } = await rejectInvite(inviteId, notificationId)
        if (!success) {
            setErr(error)
            return;
        }
        setMsg('Invite was rejected')
    }

    return (
        <li className={` border border-whitesmoke/20 p-4 flex flex-col space-y-4 ${read ? "bg-transparent" : "bg-darker"}`}>
            <span className="w-full spaced">
                <p className="font-medium">You have been invited to join: store name</p>
                <p className="text-muted text-sm">
                    {timeAgo(createdAt)}
                </p>
            </span>
            {inviteStatus === "ACCEPTED" && (
                <span className="flex space-x-4 text-success-dark">
                    <Check />
                    <p className="">You have accepted the invitation</p>
                </span>
            )}
            {inviteStatus === "REJECTED" && (
                <span className="flex space-x-4 text-error-dark">
                    <X />
                    <p className="text-error-dark">You have rejected the invitation</p>
                </span>
            )}
            <InviteNotificationView
                external={{
                    inviteStatus,
                    msg,
                    err,
                    handleAccept: async() => await handleAccept(inviteId, id),
                    handleReject: async() => await handleReject(inviteId, id)                
                }}
            />
        </li>
    );
}
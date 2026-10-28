'use client';

import { useToast } from "@/context/ToastContext";
import { acceptInvite, rejectInvite } from "@/domains/invite/invite.actions";
import { useState, useTransition } from "react";

type Store = {
    name: string;
    address: string;
}

type Props = {
  store: Store;
  inviteId: string;
}


export default function StaffInviteCard ({ store, inviteId }: Props) {
    const { createError } = useToast()
    const [pending, startTransition] = useTransition()
    const [actionType, setActionType] = useState<"accept" | "reject" | null>(null);

    const handleAccept = () => {
        setActionType("accept");
        startTransition(async () => {
            const res = await acceptInvite({id: inviteId})
            if (!res.success && res.error) {
                createError(res.error)
            }
            console.log(res)
        })
    }

    const handleReject = () => {
        setActionType("reject");
        startTransition(async () => {
            const res = await rejectInvite({id: inviteId})
            if (!res.success && res.error) {
                createError(res.error)
            }
        })
    }

    return (
        <article className="flex items-center space-x-4 py-2">
            <div className="size-10 bg-surface-1 rounded-md" />
            <p className="stacked space-y-1">
                <span className="">{store.name}</span>
                <span className="text-xs text-else">{store.address}</span>
            </p>
            <div className="flex items-center space-x-4">
                <button 
                    type="button" 
                    className="w-20 cursor-pointer disabled:cursor-not-allowed"
                    disabled={pending}
                    onClick={handleAccept}
                >
                    {pending && actionType === 'accept' ? "accepting.." : "accept"}
                </button>
                <button 
                    type="button" 
                    className="w-20 cursor-pointer disabled:cursor-not-allowed"
                    disabled={pending}
                    onClick={handleReject}    
                >
                    {pending && actionType === 'reject' ? "rejecting.." : "reject"}
                </button>
            </div>
        </article>
    );
}

'use client';

import { useToast } from "@/context/ToastContext";
import { acceptInvite, rejectInvite } from "@/domains/invite/invite.actions";
import { Store as StoreIcon } from "lucide-react";
import { useState, useTransition } from "react";

type Store = {
  name: string;
  address: string;
};

type Props = {
  store: Store;
  inviteId: string;
};

export default function StaffInviteCard({ store, inviteId }: Props) {
  const { createError } = useToast();
  const [pending, startTransition] = useTransition();
  const [actionType, setActionType] = useState<"accept" | "reject" | null>(null);

  const handleAccept = () => {
    setActionType("accept");

    startTransition(async () => {
      const res = await acceptInvite({ id: inviteId });

      if (!res.success && res.error) {
        createError(res.error);
      }
    });
  };

  const handleReject = () => {
    setActionType("reject");

    startTransition(async () => {
      const res = await rejectInvite({ id: inviteId });

      if (!res.success && res.error) {
        createError(res.error);
      }
    });
  };

  return (
    <article className="flex min-h-30 items-center gap-5 rounded-2xl border border-white/10 bg-linear-to-r from-[#141414] to-[#0b0b0b] p-5 max-sm:flex-wrap max-sm:gap-3">

      {/* Store icon */}
      <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-[#242424] text-white">
        <StoreIcon size={30} strokeWidth={1.8} aria-hidden="true" />
      </span>

      {/* Store information */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h3 className="truncate text-lg font-semibold text-main">
          {store.name}
        </h3>

        <p className="truncate text-sm text-else">
          {store.address}
        </p>
      </div>

      {/* Invitation actions */}
      <div className="flex shrink-0 items-center gap-3 max-sm:w-full">

        <button
          type="button"
          disabled={pending}
          onClick={handleAccept}
          className="min-h-14 min-w-28 rounded-xl border cursor-pointer hover:bg-whitesmoke/75 border-whitesmoke/87 bg-whitesmoke/87 px-5 text-sm font-semibold text-black transition  disabled:cursor-not-allowed disabled:opacity-50 max-sm:flex-1"
        >
          {pending && actionType === "accept"
            ? "Accepting..."
            : "Accept"}
        </button>

        <button
          type="button"
          disabled={pending}
          onClick={handleReject}
          className="min-h-14 min-w-28 rounded-xl border border-border bg-transparent px-5 text-sm font-semibold text-main transition cursor-pointer hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50 max-sm:flex-1"
        >
          {pending && actionType === "reject"
            ? "Declining..."
            : "Decline"}
        </button>

      </div>
    </article>
  );
}

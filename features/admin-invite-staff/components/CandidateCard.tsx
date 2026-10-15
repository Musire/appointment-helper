'use client';

import { useToast } from "@/context/ToastContext";
import { sendInvite } from "@/domains/invite/invite.actions";
import { useTransition } from "react";

export type CandidateCardProps = {
  data: { id: string; email: string; fullName: string | null; };
  storeId: string;
}

export default function CandidateCard ({ data, storeId }: CandidateCardProps) {
    const { fullName, email } = data
    const { createSuccess, createError } = useToast()
      const [ pending, startTransition ] = useTransition()

    const handleInvite = async () => {
            startTransition(async() => {
                const { success, error } = await sendInvite({
                    targetId: data.id,
                    storeId
                })
    
                if (!success && error) {
                    createError(error)
                    return;
                }
                
                createSuccess('successfully invited user')
            })
        }

    return (
      <li className=" normal-space min-w-56 ">
          <article className="grid grid-rows-2 grid-cols-[25%_50%_25%] gap-x-2 place-content-center items-center p-4">
            <div className="size-12 rounded-full border border-whitesmoke/20 bg-darker row-span-2" />
            <p className="col-start-2 text-whitesmoke/87 px-2 truncate">{fullName}</p>
            <p className="col-start-2 text-whitesmoke/60 px-2 text-sm truncate">{email}</p>
            <button disabled={pending} onClick={handleInvite} type="button" className="disabled:cursor-not-allowed cursor-pointer btn row-span-2 col-start-3 row-start-1">invite</button>
          </article>
      </li>
    );
}
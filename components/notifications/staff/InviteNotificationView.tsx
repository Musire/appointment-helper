import { Check, X } from "lucide-react";
import Status from "./Status";

export type InviteNotificationViewProps = {
    external: {
        inviteStatus: string;
        err: string | null;
        msg: string | null;
        handleAccept: () => void;
        handleReject: () => void;
    }
}

export default function InviteNotificationView ({ external }: InviteNotificationViewProps) {
    const { inviteStatus, err, msg, handleAccept, handleReject } = external
    return (
        <>
            {msg && (
                <Status icon={<Check />} text={msg} tone="success" />
            )}

            {err && (
                <Status icon={<X />} text={err} tone="error" />
            )}

            {!err && !msg && inviteStatus === 'PENDING' && (
                <span className="w-full spaced space-x-4 ">
                    <button onClick={handleAccept} type="button" className="active:bg-whitesmoke/87 active:text-deep grow flex-1 h-full border border-whitesmoke/20 py-2 capitalize hover:cursor-pointer">accept</button>
                    <button onClick={handleReject} type="button" className="grow  h-full flex-1 active:bg-rose-950/30 border border-whitesmoke/20 active:border-error-dark py-2 active:text-rose-100 capitalize hover:cursor-pointer">reject</button>
                </span>
            )}
        </>
    );
}
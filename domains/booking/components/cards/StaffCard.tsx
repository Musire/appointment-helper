'use client';
import { Check, User } from "lucide-react";

export type StaffBrief = {
    id: string;
    fullName: string | null;
    email: string;
    bio: string | null;
}

type StaffCardProps = {
    data: StaffBrief;
    selected: boolean;
    onSelect: () => void;
}

export function StaffCard ({ data, selected, onSelect }: StaffCardProps) {
    const { fullName } = data
    const isSelected = selected 
        ? "ring-whitesmoke/30" 
        : "ring-whitesmoke/15 hover:bg-deep";
    
    return (
        <li
            onClick={onSelect}
            className={`p-3 cursor-pointer rounded ring-2 relative ${isSelected}
            `}
        >
            <article className="flex space-x-6">
                <User size={40} strokeWidth={1} className={`${selected ? "text-alternate" : "text-whitesmoke/60 hover:text-whitesmoke/87"}`} />
                <span className="flex flex-col">
                    <p className="capitalize text-whitesmoke/87">{ fullName }</p>
                    <p className="capitalize text-whitesmoke/60">barber</p>
                </span>
            </article>
            <div className={`absolute size-6 right-6 top-1/2 -translate-y-1/2  rounded-full ring-2 ${selected ? "ring-alternate/50": "hidden"} centered`}>
                <Check size={20} className="text-alternate" />
            </div>
        </li>
    );
}
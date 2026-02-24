'use client';
import { User } from "lucide-react";

export type StaffBrief = {
    id: string;
    fullName: string | null;
    email: string;
    bio: string | null;
}

type StaffCardProps = {
    data: StaffBrief;
}

export function StaffCard ({ data }: StaffCardProps) {
    const { fullName } = data
    
    return (
        <article className="flex space-x-6">
            <User size={40} strokeWidth={1} className="" />
            <span className="flex flex-col">
                <p className="capitalize text-whitesmoke/87">{ fullName }</p>
                <p className="capitalize text-whitesmoke/60">barber</p>
            </span>
        </article>
);
}
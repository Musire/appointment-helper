'use client';

import { Check, Store } from "lucide-react";

export type StoreBrief = {
    id: string;
    name: string;
    description: string | null;
}

type StoreCardProps = {
    data: StoreBrief;
    selected: boolean;
    onSelect: () => void;
}

export function StoreCard ({ data, selected, onSelect }: StoreCardProps) {
    const { name, description } = data
    const isSelected = selected 
        ? "ring-whitesmoke/30 bg-darkest" 
        : "ring-whitesmoke/15 hover:bg-deep"
    return (
        <li
            onClick={onSelect}
            className={`p-3 cursor-pointer rounded ring-2 relative group ${isSelected}
            `}
        >
            <article className="flex space-x-6 items-center group-hover:text-alternate">
                <Store size={40} strokeWidth={1} className={` ${selected ? "text-alternate" : "text-whitesmoke/60 group-hover:text-whitesmoke/75"}`} />
                <span className="">
                    <p className="capitalize text-whitesmoke/87 ">{name}</p>
                    <p className="text-whitesmoke/60 capitalize">{description}</p>
                </span>
            </article>
            <div className={`absolute size-6 right-6 top-1/2 -translate-y-1/2  rounded-full ring-2 ${selected ? "ring-alternate/50": "hidden"} centered`}>
                <Check size={20} className="text-alternate" />
            </div>
        </li>
    );
}
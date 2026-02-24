'use client';

import { Store } from "lucide-react";

export type StoreBrief = {
    id: string;
    name: string;
    description: string | null;
}

type StoreCardProps = {
    data: StoreBrief;
}

export function StoreCard ({ data }: StoreCardProps) {
    const { name, description } = data

    return (
        <article className="flex space-x-6 items-center group-hover:text-alternate">
            <Store size={40} strokeWidth={1} className="" />
            <span className="">
                <p className="capitalize text-whitesmoke/87 ">{name}</p>
                <p className="text-whitesmoke/60 capitalize">{description}</p>
            </span>
        </article>
    );
}
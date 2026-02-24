'use client';
import { Check, Scissors } from "lucide-react";

export type ServiceType = {
    id: string;
    name: string;
    durationMin: Number;
    priceCents: Number
}

type ServiceCardProps = {
    data: ServiceType;
}

export default function ServiceCard ({ data }: ServiceCardProps) {
    const { name, durationMin, priceCents} = data
    return (
        <article className="flex items-center space-x-6" >
            <Scissors size={40} className="" />
            <span className="flex flex-col space-y-2">
                <p className="capitalize">{name}</p>
                <p className="">{`$${priceCents} | ${durationMin} mins`}</p>
            </span>
        </article>
    );
}
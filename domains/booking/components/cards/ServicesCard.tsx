'use client';
import { Check, Scissors } from "lucide-react";

export type ServiceType = {
    id: string;
    name: string;
    durationMin: Number;
    priceCents: Number
}

type ServiceCardProps = {
    item: ServiceType;
    selected: boolean;
    onSelect: () => void;
}

export default function ServiceCard ({ item, selected, onSelect }: ServiceCardProps) {
    const isSelected = selected 
        ? 'ring-whitesmoke/30 bg-darkest' 
        : 'ring-whitesmoke/15 hover:bg-deep';
    
    
    return (
        <li 
            onClick={onSelect}
            className={`ring-2 normal-space flex-col flex space-y-4 hover:cursor-pointer  relative p-6  ${isSelected}`}
        >
            <article className="flex items-center space-x-6" >
                <Scissors size={40} className={`${selected ? "text-alternate" : "text-whitesmoke/60 hover:text-whitesmoke/87"}`} />
                <span className="flex flex-col space-y-2">
                    <p className="capitalize">{item.name}</p>
                    <p className="">{`$${item.priceCents} | ${item.durationMin} mins`}</p>
                </span>
            </article>
            <p className="">description of the service</p>
            <div className={`absolute size-6 right-6 top-1/2 -translate-y-1/2  rounded-full ring-2 ${selected ? "ring-alternate/50": "hidden"} centered`}>
                <Check size={20} className="text-alternate" />
            </div>
        </li>
    );
}
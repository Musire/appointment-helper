import { Service } from "@/generated/prisma";
import { formatCurrency } from "@/lib/stringMutate";
import { Scissors as Icon } from "lucide-react";

type ServiceSlotProps = {
    service: Service
}

export default function ServiceCard ({ service }: ServiceSlotProps) {
    return (
        <li className="stacked w-full min-w-60 h-full p-6 text-main">
            <div className="flex items-center space-x-4 pb-6 border-b-2 border-disabled">
                <Icon size={30} strokeWidth={1} />
                <p className="capitalize text-xl">{service.name}</p>
            </div>
            <p className="text-else">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa 
            </p>
            <span className="spaced justify-self-end mt-auto">
                <p className="text-xl font-bold">{formatCurrency(service.priceCents)}</p>
                <p className="normal-space border-adjust border-2 rounded-full">{`${service.durationMin} mins`}</p>
            </span>
            
        </li>
    );
}
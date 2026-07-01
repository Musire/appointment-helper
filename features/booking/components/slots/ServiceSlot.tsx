import { Service } from "@/generated/prisma";
import { Scissors as Icon } from "lucide-react";

type ServiceSlotProps = {
    service: Service
}

export default function ServiceSlot ({ service }: ServiceSlotProps) {
    return (
        <li className="flex items-center space-x-6 w-72">
            <Icon size={30} strokeWidth={1} />
            <span className="">
                <p className="capitalize">{service.name}</p>
                <p className="">{`$${service.priceCents} | ${service.durationMin} mins`}</p>
            </span>
        </li>
    );
}

import { Service } from "@/generated/prisma";
import { Scissors as Icon } from "lucide-react";

type ServiceSlotProps = {
    services: Service[]
}

export default function ServiceSlot({ services }: ServiceSlotProps) {
    return (
        <div className="flex items-start gap-x-4 w-full pb-4">
            <Icon size={30} strokeWidth={1} className="shrink-0" />

            <div className="flex flex-col flex-1 gap-y-2">
                {services.map(service => (
                    <div
                        key={service.id}
                        className="flex items-center justify-between w-full"
                    >
                        <p className="capitalize">{service.name}</p>
                        <p className="text-sm text-else">${service.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

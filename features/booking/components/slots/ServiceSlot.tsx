
import { Service } from "@/generated/prisma";
import { Scissors as Icon } from "lucide-react";

type ServiceSlotProps = {
    services: Service[]
}

export default function ServiceSlot({ services }: ServiceSlotProps) {
    return (
        <div className="flex items-center space-x-6 w-full pb-4">
            <Icon size={30} strokeWidth={1} className="" />
            <div className="flex flex-col flex-1 gap-y-2">
                {services.map(service => (
                    <div
                        key={service.id}
                        className="flex items-center justify-between w-full"
                    >
                        <p className=" capitalize">{service.name}</p>
                        <p className="">${service.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

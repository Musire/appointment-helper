import { ServiceCard } from "@/features/admin-store-services/components";
import ServiceCreation from "./ServiceCreation";

export interface service {
    id: string;
    name: string;
    price: number;
}

type Props = {
    services: service[]
}

export default function ServiceContainer ({ services }: Props) {
    return (
        <div className="">
            <ServiceCreation />
            {services.map(service => {
                return <ServiceCard key={service.id} service={service} />
            })}
        </div>
    );
}
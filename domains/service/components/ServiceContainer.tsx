import { Body } from "@/components/UI";
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
        <div className="flex flex-1 ">
            <ServiceCreation />
            {services.map(service => {
                return <ServiceCard key={service.id} service={service} />
            })}
            {!services.length && (
                <>
                    <Body className="centered flex-1 text-else">No services created yet</Body>
                </>
            )}
        </div>
    );
}
'use client';

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
        <div className="flex flex-1 py-6 ">
            <ServiceCreation />
            {!!services.length && (<ul className="grid grid-cols-2 gap-4 w-full">
                {services.map(service => {
                    return <ServiceCard 
                        onEdit={() => console.log(`edit ${service.id}`)} 
                        onDelete={() => console.log(`cancel ${service.id}`)}
                        key={service.id} 
                        service={service} />
                })}
            </ul>)}
            {!services.length && (
                <Body className="centered flex-1 text-else">
                    No services created yet
                </Body>
            )}
        </div>
    );
}
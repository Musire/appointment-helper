'use client';

import { Body } from "@/components/UI";
import { ServiceCard } from "@/features/admin-store-services/components";
import { deleteService } from "@/features/mutate-service/actions/service-mutation.actions";
import { useDrawer } from "@/hooks";
import { useState, useTransition } from "react";
import ServiceCreation from "./ServiceCreation";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";

export interface service {
    id: string;
    name: string;
    price: number;
}

type Props = {
    services: service[];
    storeId: string
}

export default function ServiceContainer ({ services, storeId }: Props) {
    
    const [isDeleting, startDeleteTransition] = useTransition();

    const { isMounted, openDrawer, closeDrawer } = useDrawer()
    const [error, setError] = useState<string | null>(null);


    const handleDelete = (serviceId: string, storeId: string) => {
        startDeleteTransition(async () => {
            try {
                const res = await deleteService(serviceId, storeId)

                if (res.error) {
                    setError(res.error)
                }

            } catch (error) {
                setError('Network error! Please check your connection.')
            }
        })
    }

    const router = useRouter()

    return (
        <div className="flex flex-1 py-6 ">
            <ServiceCreation />
            {!!services.length && (<ul className="grid grid-cols-2 gap-4 w-full">
                {services.map(service => {
                    return <ServiceCard 
                        onEdit={() => router.push(`services/edit/${service.id}`)} 
                        onDelete={openDrawer}
                        key={service.id} 
                        service={service} 
                        modalOpen={isMounted}
                        onDeletion={() => handleDelete(service.id, storeId)}
                        onClose={closeDrawer}
                    />
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
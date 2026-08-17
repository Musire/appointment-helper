'use client';

import { Body } from "@/components/ui";
import { useToast } from "@/context/ToastContext";
import { ServiceCard } from "@/features/admin-store-services/components";
import { deleteService } from "@/features/mutate-service/actions/service-mutation.actions";
import { useDrawer } from "@/hooks";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import ServiceCreation from "./ServiceCreation";

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
    const {createError, createSuccess} = useToast()


    const handleDelete = (serviceId: string, storeId: string) => {
        startDeleteTransition(async () => {
            try {
                const res = await deleteService(serviceId, storeId)

                if (res.error) {
                    createError(res.error)
                    return
                }

                createSuccess('deleted service')

            } catch (error) {
                createError('Network error! Please check your connection.')
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
'use client';

import { SelectableList } from "@/components/UI";
import { Service } from "@/generated/prisma";
import { useSelect } from "@/hooks";
import { useRouter } from "next/navigation";
import { ServiceCard } from "../cards";
import { ContinueButton, Header } from "../page";

type ServiceStepProps = {
    services: Service[]
}

export default function ServicesStep ({ services }: ServiceStepProps ) {
    const { selected, handleSelect } = useSelect()
    const router = useRouter()

    return (
        <div className="flex flex-col space-y-6 ">
            <Header 
                step={3}
                max={5} 
                title="Select Services"
                subtitle="Time to pick what needs to get done"
            />
            <SelectableList 
                items={services}
                getId={item => item.id}
                selected={selected}
                onSelect={handleSelect}
                scrollable
                renderItem={(item) => (
                    <ServiceCard service={item} />
                )}
            />
            <ContinueButton 
                onBack={() => router.back()} 
                next="dateTime" 
                selected={selected}
            />
        </div>
    );
}
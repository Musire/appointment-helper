'use client';

import { SelectableList } from "@/components/ui";
import { Service } from "@/generated/prisma";
import { useSelect } from "@/hooks";
import { useRouter } from "next/navigation";
import { ServiceCard } from "../cards";
import { ContinueButton } from "../page";

type ServiceStepProps = {
    services: Service[]
}

export default function ServicesStep ({ services }: ServiceStepProps ) {
    const { selected, handleSelect } = useSelect()
    const router = useRouter()

    return (
        <div className="flex flex-col max-w-full  space-y-6 ">
            <h3 className="text-primary">{`Step ${3} of ${5}`}</h3>

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
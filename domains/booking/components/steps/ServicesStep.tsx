'use client';

import { SelectableList } from "@/components/UI";
import { ContinueButton, Header, Indicator } from "../page";
import { useRouter } from "next/navigation";
import { useSelect } from "@/hooks";
import { Service } from "@/generated/prisma";
import { ServiceCard } from "../cards";

type ServiceStepProps = {
    services: Service[]
}

export default function ServicesStep ({ services }: ServiceStepProps ) {
    const { selected, handleSelect } = useSelect()
    const router = useRouter()
    
    const handleBack = () => {
        router.push('/user/staff')
    }

    return (
        <div className="flex flex-col space-y-6 ">
            <Header onBack={handleBack} title="Select Services" />
            <Indicator index={3} />
            <SelectableList 
                items={services}
                getId={item => item.id}
                selected={selected}
                onSelect={handleSelect}
                renderItem={(item) => (
                    <ServiceCard service={item} />
                )}
            />
            <ContinueButton next="dateTime" {...{selected}} />
        </div>
    );
}
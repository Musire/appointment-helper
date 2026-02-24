'use client';

import { FetchGuard, SelectableList } from "@/components/UI";
import { useFetch } from "@/hooks";
import { useState } from "react";
import { useStepper } from "../../context";
import ServiceCard, { ServiceType } from "../cards/ServicesCard";
import { ContinueButton, Header, Indicator } from "../page";


export default function ServicesStep () {
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const { steps, formData, back, updateData, next } = useStepper()

    console.log(formData)

    const res = useFetch<ServiceType[]>(
        '/api/storeServices',
        { body: { storeId: formData?.storeId } }
    )

    const handleSelect = (id: string | null) => {
        setSelectedId((prev) => (prev === id ? null : id))
    }
    
    const handleContinue = () => {
        if (!selectedId) return;
        updateData('serviceId', selectedId)
        next()
    }


    return (
        <div className="flex flex-col space-y-6 ">
            <Header onBack={back} title="Select Services" />
            <Indicator  
                steps={steps}
                index={3}
            />
            <FetchGuard state={res} >
                {(data) => (
                    <SelectableList 
                        items={data}
                        getId={item => item.id}
                        selected={selectedId}
                        onSelect={handleSelect}
                        renderItem={(item) => (
                            <ServiceCard data={item} />
                        )}
                    />
                )}
            </FetchGuard>
            <ContinueButton onContinue={handleContinue} />
        </div>
    );
}
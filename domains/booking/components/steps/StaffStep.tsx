'use client';

import { FetchGuard, SelectableList } from "@/components/UI";
import { 
    ContinueButton, 
    Header, 
    Indicator, 
    StaffBrief, 
    StaffCard } from "@/domains/booking";
import { useFetch } from "@/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStepper } from "../../context";


export default function StaffStep () {
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const router = useRouter()
    const { steps, formData, changeFlow, next, updateData, back } = useStepper()
    
    const res = useFetch<StaffBrief[]>('/api/staff',
        { 
            method: 'POST',
            body: {
                storeId: formData.storeId
            }
        }
    )

    const handleSelect = (id: string | null) => {
        setSelectedId((prev) => (prev === id ? null : id))
    }

    const handleContinue = () => {
        if (!selectedId) return;
        updateData('staffId', selectedId)
        next()
    }

    return (
        <div className="flex flex-col space-y-6">
            <Header onBack={back} title="Select Staff" />
            <Indicator steps={steps} index={2} />
            <FetchGuard
                state={res}
            >
                {(data) => (
                    <SelectableList 
                        items={data}
                        selected={selectedId}
                        onSelect={handleSelect}
                        getId={item => item.id}
                        renderItem={(item) => (
                            <StaffCard data={item}/>  
                        )}
                    />
                )}
            </FetchGuard>
            <ContinueButton isDisabled={!selectedId} onContinue={handleContinue} />
        </div>
    );
}
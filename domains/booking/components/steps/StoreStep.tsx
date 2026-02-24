'use client';

import { FetchGuard, SelectableList } from "@/components/UI";
import { ContinueButton, Header, Indicator, StoreBrief, StoreCard } from "@/domains/booking";
import { useFetch } from "@/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStepper } from "../../context";

export default function StoreStep () {
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const router = useRouter()

    const { steps, changeFlow, next, updateData } = useStepper()

    const res = useFetch<StoreBrief[]>('/api/stores')

    const handleSelect = (id: string | null) => {
        setSelectedId((prev) => (prev === id ? null : id))
    }

    const handleBack = () => {
        router.push('/user/dashboard')
    }

    const handleContinue = () => {
        if (!selectedId) return;
        updateData('storeId', selectedId)
        next()
    }

    console.log(selectedId)


    return (
        <div className="flex flex-col space-y-6">
            <Header onBack={handleBack} title="select store" />
            <Indicator steps={steps} index={1} />
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
                            <StoreCard data={item}/>  
                        )}
                    />
                )}
            </FetchGuard>
            <ContinueButton isDisabled={!selectedId} onContinue={handleContinue} />
        </div>
    );
}
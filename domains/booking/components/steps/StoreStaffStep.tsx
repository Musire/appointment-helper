'use client';
import { ContinueButton, Header, Indicator, StaffSelector } from "@/domains/booking";
import { useState } from "react";

type StoreStaffProps = {
    storeId: string;
    onBack: () => void;
    onChange: (v:string) => void;
    steps: string[];
}

export default function StoreStaffStep ({ storeId, onBack, onChange, steps }: StoreStaffProps) {
    const [selectedId, setSelectedId] = useState< string | null >(null);

    const handleContinue = () => {
        if (!selectedId) return;
        onChange(selectedId)
    }

    const handleSelect = (id: string | null) => {
        setSelectedId((prev) => (prev === id ? null : id))
    }
    
    return (
        <div className="flex-col flex space-y-6">
            <Header onBack={onBack} title="Select Store" />
            <Indicator {...{steps}} index={3} />
            <StaffSelector
                {...{storeId}}
                {...{selectedId}}
                onSelect={handleSelect}
            />
            <ContinueButton isDisabled={!selectedId} onContinue={handleContinue} />
        </div>
    );
}
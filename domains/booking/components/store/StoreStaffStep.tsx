'use client';
import { ContinueButton, Header, Indicator } from "@/domains/booking";
import { useState } from "react";
import StaffSelector from "./StaffSelector";

type StoreStaffProps = {
    storeId: string;
    onBack: () => void;
    onChange: (v:string) => void;
    steps: string[];
}

export default function StoreStaffStep ({ storeId, onBack, onChange, steps }: StoreStaffProps) {
    const [selectedId, setSelectedId] = useState< string | null >(null);
    const [view, setView] = useState<'staff' | 'details'>('staff');

    const handleBack = () => {
        if (view === 'details') {
            setView('staff')
            setSelectedId(null)
            return
        }
        
        if (!selectedId) {
            onBack()
        }
    }

    const handleContinue = () => {
        if (view === 'staff') {
            setView('details')
            return
        }
        
        if (selectedId) {
            onChange(selectedId)
        }
    }

    const handleSelect = (id: string | null) => {
        setSelectedId((prev) => (prev === id ? null : id))
    }
    
    return (
        <div className="flex-col flex space-y-6">
            <Header onBack={handleBack} title="Select Store" />
            <Indicator {...{steps}} index={2} />
            <StaffSelector
                {...{storeId}}
                {...{selectedId}}
                {...{view}}
                onSelect={handleSelect}
            />
            <ContinueButton isDisabled={!selectedId} onContinue={handleContinue} />
        </div>
    );
}
'use client';
import { StoreSelection } from "../selectors";
import { ContinueButton, Header } from "../page";
import { useState } from "react";

type StaffStoreProps = {
    staffId: string;
    onBack: () => void;
    onChange: (v:string) => void;
}

export default function StaffStoreStep ({ staffId, onBack, onChange }: StaffStoreProps) {
    const [selectedId, setSelectedId] = useState< string | null >(null);
    const [view, setView] = useState<'stores' | 'details'>('stores');

    const handleBack = () => {
        if (view === 'details') {
            setView('stores')
            setSelectedId(null)
            return
        }
        
        if (!selectedId) {
            onBack()
        }
    }

    const handleContinue = () => {
        if (view === 'stores') {
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
            <StoreSelection 
                {...{staffId}} 
                {...{selectedId}}
                onSelect={handleSelect}
                {...{view}}
            />
            <ContinueButton isDisabled={!selectedId} onContinue={handleContinue} />
        </div>
    );
}
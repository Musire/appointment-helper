'use client';
import { useState } from "react";
import { ContinueButton, Header, Indicator } from "../page";
import { StoreSelection } from "../selectors";

type StaffStoreProps = {
    staffId: string;
    onBack: () => void;
    onChange: (v:string) => void;
    steps: string[];
}

export default function StaffStoreStep ({ staffId, onBack, onChange, steps }: StaffStoreProps) {
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
            <Indicator {...{steps}} index={2} />
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
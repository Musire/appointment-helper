'use client';
import { useState } from "react";
import { ContinueButton, Header, Indicator } from "../page";
import { StoreSelection } from "../selectors";

type StaffStoreProps = {
    staffId: string;
    onBack: () => void;
    onChange: (v:string) => void;
    steps: string[];
    anchor: string;
}

export default function StaffStoreStep ({ staffId, onBack, onChange, steps, anchor }: StaffStoreProps) {
    const [selectedId, setSelectedId] = useState< string | null >(null);

    const handleContinue = () => {
        if (selectedId) onChange(selectedId); 
    }

    const handleSelect = (id: string | null) => {
        setSelectedId((prev) => (prev === id ? null : id))
    }
    
    return (
        <div className="flex-col flex space-y-6">
            <Header onBack={onBack} title="Select staff store" />
            <Indicator {...{steps}} index={anchor === 'store' ? 2 : 4} />
            <StoreSelection
                {...{staffId}} 
                {...{selectedId}}
                onSelect={handleSelect}
            />
            <ContinueButton isDisabled={!selectedId} onContinue={handleContinue} />
        </div>
    );
}
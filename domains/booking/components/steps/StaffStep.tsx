'use client';

import { 
    ContinueButton, 
    Header, 
    Indicator, 
    StaffBrief, 
    StaffSearch } from "@/domains/booking";
import { useOrchestrator } from "@/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

type StaffStepProps = {
    onChange: (v: string) => void;
    changeAnchor: (v: string) => void;
    staff: StaffBrief[];
    steps: string[];
}

export default function StaffStep ({ onChange, changeAnchor, staff, steps }: StaffStepProps) {
    const activeStyle = 'border-b-2 border-whitesmoke/87 text-whitesmoke/87'
    const inActiveStyle = 'text-whitesmoke/37 hover:text-whitesmoke/60'
    const router = useRouter()
    const { clear } = useOrchestrator('orchestrator-history')

    const [selectedId, setSelectedId] = useState<string | null>(null)


    const handleSelect = (id: string | null) => {
        setSelectedId((prev) => (prev === id ? null : id))
    }

    const handleContinue = () => {
        if (selectedId) onChange(selectedId); 
    }

    const handleAnchor = () => {
        changeAnchor('store')
        clear()
    }

    return (
        <div className="flex flex-col space-y-6">
            <Header onBack={() => router.push('/user/dashboard')} title="Select Staff" />
            <Indicator steps={steps} index={1} />
            <span className="flex items-center space-x-4 ">
                <button 
                    onClick={handleAnchor}
                    className={`px-3 py-2 transition-colors hover:cursor-pointer ${inActiveStyle}`}
                >
                    Store
                </button>
                <p className={`px-3 py-2 ${activeStyle}`}>Staff</p>
            </span>
            <StaffSearch 
                staff={staff} 
                {...{selectedId}}
                onSelect={handleSelect}
            />
            <ContinueButton isDisabled={false} onContinue={handleContinue} />
        </div>
    );
}
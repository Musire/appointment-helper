'use client';

import { ContinueButton, Header, StaffBrief, StaffSearch } from "@/app/user/components";
import { useRouter } from "next/navigation";
import { useState } from "react";

type StaffStepProps = {
    onChange: (v: string) => void;
    changeAnchor: (v: string) => void;
    staff: StaffBrief[]
}

export default function StaffStep ({ onChange, changeAnchor, staff }: StaffStepProps) {
    const activeStyle = 'border-b-2 border-whitesmoke/87 text-whitesmoke/87'
    const inActiveStyle = 'text-whitesmoke/37 hover:text-whitesmoke/60'
    const router = useRouter()

    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [view, setView] = useState<'search' | 'details'>('search');

    const handleBack = () => {
        if (view === 'details') {
            setView('search')
            setSelectedId(null)
            return
        }
        
        if (!selectedId) {
            router.push('/user/dashboard')
        }
    }

    const handleContinue = () => {
        if (view === 'search') {
            setView('details');
            return;
        }

        if (selectedId) {
            onChange(selectedId);
        }
    }

    const handleSelect = (id: string | null) => {
        setSelectedId((prev) => (prev === id ? null : id))
    }

    return (
        <div className="flex flex-col space-y-6">
            <Header onBack={handleBack} title="Select Staff" />
            <span className="flex items-center space-x-4 ">
                <button 
                    onClick={() => changeAnchor('store')}
                    className={`px-3 py-2 transition-colors hover:cursor-pointer ${inActiveStyle}`}
                >
                    Store
                </button>
                <p className={`px-3 py-2 ${activeStyle}`}>Staff</p>
            </span>
            <StaffSearch 
                staff={staff} 
                onChange={onChange}
                {...{selectedId}}
                onSelect={handleSelect}
                {...{view}}
            />
            <ContinueButton isDisabled={false} onContinue={handleContinue} />
        </div>
    );
}
'use client';

import { Header, Indicator, StoreBrief, StoreSearch } from "@/app/user/components";
import { useOrchestrator } from "@/hooks";
import { useRouter } from "next/navigation";

type StoreStepProps = { 
    changeAnchor: (v: string) => void;
    stores: StoreBrief[];
    steps: string[];
}

export default function StoreStep ({ changeAnchor, stores, steps }: StoreStepProps) {
    const activeStyle = 'border-b-2 border-whitesmoke/87 text-whitesmoke/87'
    const inActiveStyle = 'text-whitesmoke/37 hover:text-whitesmoke/60'

    const router = useRouter()
    const { clear } = useOrchestrator('orchestrator-history')

    const handleBack = () => {
        router.push('/user/dashboard')
    }

    const handleAnchor = () => {
        changeAnchor('staff')
        clear()
    }

    return (
        <div className="flex flex-col space-y-6">
            <Header onBack={handleBack} title="select store" />
            <Indicator steps={steps} index={1} />
            <span className="flex items-center space-x-4">
                <p className={`px-3 py-2 ${activeStyle}`} >Store</p>
                <button 
                    onClick={handleAnchor}
                    className={`px-3 py-2 transition-colors hover:cursor-pointer ${inActiveStyle}`}
                >
                    Staff
                </button>
            </span>
            <StoreSearch stores={stores} />
        </div>
    );
}
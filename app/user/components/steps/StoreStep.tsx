'use client';

import { Header, StoreBrief, StoreSearch } from "@/app/user/components";
import { useRouter } from "next/navigation";

type StoreStepProps = { 
    changeAnchor: (v: string) => void;
    stores: StoreBrief[]
}

export default function StoreStep ({ changeAnchor, stores }: StoreStepProps) {
    const activeStyle = 'border-b-2 border-whitesmoke/87 text-whitesmoke/87'
    const inActiveStyle = 'text-whitesmoke/37 hover:text-whitesmoke/60'

    const router = useRouter()

    const handleBack = () => {
        router.push('/user/dashboard')
    }

    return (
        <div className="flex flex-col space-y-6">
            <Header onBack={handleBack} title="select store" />
            <span className="flex items-center space-x-4">
                <p className={`px-3 py-2 ${activeStyle}`} >Store</p>
                <button 
                    onClick={() => changeAnchor('staff')}
                    className={`px-3 py-2 transition-colors hover:cursor-pointer ${inActiveStyle}`}
                >
                    Staff
                </button>
            </span>
            <StoreSearch stores={stores} />
        </div>
    );
}
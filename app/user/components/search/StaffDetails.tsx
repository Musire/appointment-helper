'use client';

import { useFetch } from "@/hooks";
import { ArrowLeft } from "lucide-react";

type StaffDetailsProps = {
    onBack: () => void;
    onChange: () => void;
}

export default function StaffDetails ({ onBack, onChange }: StaffDetailsProps) {

    const { status, error, data } = useFetch('/api/staffDetails')

    if (status === 'idle') {
        return null
    }

    if (status === 'loading') {
        return <p className="">loading ...</p>
    }

    if (error) {
        return <p className="text-error-dark">{error}</p>
    }

    return (
        <div className="flex flex-col space-y-6">
            <button 
                onClick={onBack}
                className="hover:cursor-pointer w-fit"
            >
                    <ArrowLeft />
            </button>
            <pre className="">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
}
'use client';

import { useFetch } from "@/hooks";

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
        <div className="">
            <pre className="">
                {JSON.stringify(data, null, 2)}
            </pre>
            <button 
                onClick={onBack}
                className="btn absolute left-6 bottom-20"
            >
                    back
            </button>
            <button 
                onClick={onChange}
                className="btn absolute right-6 bottom-20"
            >
                continue
            </button>
        </div>
    );
}
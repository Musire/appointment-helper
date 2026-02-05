'use client';

import { useFetch } from "@/hooks/useFetch";

type StaffDetailsProps = {
    onBack: () => void;
}

export default function StaffDetails ({ onBack }: StaffDetailsProps) {

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
            <button className="btn absolute right-6 bottom-20">continue</button>
        </div>
    );
}
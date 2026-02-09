'use client';

import { useFetch } from "@/hooks";

type ServiceStepProps = {
    storeId: string;
    onBack: () => void;
}

type StoreServices = {
    id: string;
    name: string
}

export default function ServicesStep ({ storeId, onBack }: ServiceStepProps) {
    const result = useFetch<StoreServices[]>(
        '/api/storeServices',
        {
            body: {
                storeId
            }
        }
    )

    return (
        <div className="">
            services Step
            <pre className="">
                {JSON.stringify(result?.data, null, 2)}
            </pre>
            <button 
                onClick={onBack} 
                className="btn absolute bottom-20 left-6"
            >
                back
            </button>
        </div>
    );
}
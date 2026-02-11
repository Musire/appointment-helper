'use client';

import { SelectableDisplay } from "@/components/UI";
import { useFetch } from "@/hooks";
import { ArrowLeft } from "lucide-react";
import ServiceCard from "../cards/ServicesCard";

type ServiceStepProps = {
    storeId: string;
    onBack: () => void;
    onChange: (v: string | null) => void;
}

type StoreServices = {
    id: string;
    name: string
}

export default function ServicesStep ({ storeId, onBack, onChange }: ServiceStepProps) {
    const result = useFetch<StoreServices[]>(
        '/api/storeServices',
        {
            body: {
                storeId
            }
        }
    )

    if (result.status === 'idle') {
        return null
    }

    if (result.status === 'loading') {
        return <p className="">loading ...</p>
    }

    if (result.error) {
        return <p className="text-error-dark">{result.error}</p>
    }

    if (!result?.data) {
        return null
    }

    return (
        <div className="flex flex-col space-y-6">
            <button 
                onClick={onBack} 
                className="hover:cursor-pointer **:"
            >
                <ArrowLeft />
            </button>
            <SelectableDisplay 
                data={result.data}
                getId={item => item.id}
                onChange={onChange}
                renderItem={(props) => (
                    <ServiceCard key={props.item.id} {...props}/>
                )}
            />
            
        </div>
    );
}
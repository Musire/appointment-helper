'use client';

import { SelectableDisplay } from "@/components/UI";
import { useFetch } from "@/hooks";
import ServiceCard from "../cards/ServicesCard";
import { Header, Indicator } from "../page";

type ServiceStepProps = {
    storeId: string;
    onBack: () => void;
    onChange: (v: string | null) => void;
    steps: string[];
}

type StoreServices = {
    id: string;
    name: string
}

export default function ServicesStep ({ storeId, onBack, onChange, steps }: ServiceStepProps) {
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
        <div className="flex flex-col space-y-6 ">
            <Header onBack={onBack} title="Select Services" />
            <Indicator  
                steps={steps}
                index={3}
            />
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
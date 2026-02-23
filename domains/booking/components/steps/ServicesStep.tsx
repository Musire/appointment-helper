'use client';

import { FetchGuard, SelectableDisplay } from "@/components/UI";
import { useFetch } from "@/hooks";
import ServiceCard, { ServiceType } from "../cards/ServicesCard";
import { Header, Indicator } from "../page";

type ServiceStepProps = {
    storeId: string;
    onBack: () => void;
    onChange: (v: string | null) => void;
    steps: string[];
}

export default function ServicesStep ({ storeId, onBack, onChange, steps }: ServiceStepProps) {
    const result = useFetch<ServiceType[]>(
        '/api/storeServices',
        { body: { storeId } }
    )

    return (
        <div className="flex flex-col space-y-6 ">
            <Header onBack={onBack} title="Select Services" />
            <Indicator  
                steps={steps}
                index={5}
            />
            <FetchGuard state={result} >
                {(data) => (
                    <SelectableDisplay 
                        data={data}
                        getId={item => item.id}
                        onChange={onChange}
                        renderItem={(props) => (
                            <ServiceCard key={props.item.id} {...props}/>
                        )}
                    />
                )}
            </FetchGuard>
        </div>
    );
}
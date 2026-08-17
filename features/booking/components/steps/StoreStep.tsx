'use client';

import { SelectableList } from "@/components/ui";
import { ContinueButton, StoreCard } from "@/features/booking";
import { useSelect } from "@/hooks";
import { useRouter } from "next/navigation";

type StoreStepProps = {
    stores: {
        id: string;
        name: string;
        address: string;
    }[]
}

export default function StoreStep ({ stores }: StoreStepProps ) {
    const router = useRouter()
    const { selected, handleSelect } = useSelect<string | undefined>()

    return (
        <div className="flex flex-col space-y-6  flex-1">
            <h3 className="text-primary">{`Step ${1} of ${5}`}</h3>

            <SelectableList 
                items={stores}
                selected={selected}
                onSelect={handleSelect}
                getId={item => item.id}
                scrollable
                renderItem={(item) => (
                    <StoreCard store={item}/>  
                )}
            />
            <ContinueButton 
                onBack={() => router.push('/dashboard')} 
                next="staff" 
                selected={selected}
            />
        </div>
    );
}
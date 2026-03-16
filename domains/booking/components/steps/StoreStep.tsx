'use client';

import { SelectableList } from "@/components/UI";
import { ContinueButton, Header, StoreCard } from "@/domains/booking";
import { Store } from "@/generated/prisma";
import { useSelect } from "@/hooks";
import { useRouter } from "next/navigation";

type StoreStepProps = {
    stores: Store[]
}

export default function StoreStep ({ stores }: StoreStepProps ) {
    const router = useRouter()
    const { selected, handleSelect } = useSelect<string | undefined>()

    return (
        <div className="flex flex-col space-y-6 ">
            <Header 
                step={1}
                max={5}
                title="Select Store"
                subtitle="Choose your preferred shop to continue booking"
            />
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
'use client';

import { SelectableList } from "@/components/UI";
import { ContinueButton, Header, Indicator, StoreCard } from "@/domains/booking";
import { Store } from "@/generated/prisma";
import { useSelect } from "@/hooks";
import { useRouter } from "next/navigation";

type StoreStepProps = {
    stores: Store[]
}

export default function StoreStep ({ stores }: StoreStepProps ) {
    const router = useRouter()
    const { selected, handleSelect } = useSelect<string | undefined>()

    const handleBack = () => {
        router.push('/user/dashboard')
    }

    return (
        <div className="flex flex-col space-y-6">
            <Header onBack={handleBack} title="select store" />
            <Indicator index={1} />
            <SelectableList 
                items={stores}
                selected={selected}
                onSelect={handleSelect}
                getId={item => item.id}
                renderItem={(item) => (
                    <StoreCard store={item}/>  
                )}
            />
            <ContinueButton next="staff" {...{selected}} />
        </div>
    );
}
'use client';

import { SelectableList } from "@/components/UI";

import { useSelect } from "@/hooks";
import { useRouter } from "next/navigation";
import { StaffCard } from "../cards";
import { ContinueButton, Header } from "../page";
import { StaffUser } from "../search";

type StaffStepProps = {
    staff : StaffUser[]
}


export default function StaffStep ({ staff }: StaffStepProps) {
    const router = useRouter()
    const { selected, handleSelect } = useSelect<string | undefined>()

    return (
        <div className="flex flex-1 max-w-full flex-col space-y-6 py-6 ">
            <h3 className="text-primary">{`Step ${2} of ${5}`}</h3>

            <SelectableList 
                items={staff}
                selected={selected}
                onSelect={handleSelect}
                getId={item => item.id}
                scrollable
                renderItem={(item) => (
                    <StaffCard staff={item}/>  
                )}
            />
            <ContinueButton 
                onBack={() => router.back()} 
                next="service" 
                selected={selected}
            />
        </div>
    );
}
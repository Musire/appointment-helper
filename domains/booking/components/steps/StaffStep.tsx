'use client';

import { SelectableList } from "@/components/UI";
import { 
    ContinueButton, 
    Header, 
    StaffCard, 
    StaffUser} from "@/domains/booking";
import { useSelect } from "@/hooks";
import { useRouter } from "next/navigation";

type StaffStepProps = {
    staff : StaffUser[]
}


export default function StaffStep ({ staff }: StaffStepProps) {
    const router = useRouter()
    const { selected, handleSelect } = useSelect<string | undefined>()

    const handleBack = () => {
        router.push('/user/booking')
    }

    return (
        <div className="flex flex-col space-y-6 ">
            <Header 
                step={2}
                max={5} 
                title="Select Staff"
                subtitle="Pick that professional that makes you comfortable"     
            />
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
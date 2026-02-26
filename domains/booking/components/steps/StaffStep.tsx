'use client';

import { SelectableList } from "@/components/UI";
import { 
    ContinueButton, 
    Header, 
    Indicator, 
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
        <div className="flex flex-col space-y-6">
            <Header onBack={handleBack} title="Select Staff" />
            <Indicator  index={2} />
            <SelectableList 
                items={staff}
                selected={selected}
                onSelect={handleSelect}
                getId={item => item.id}
                renderItem={(item) => (
                    <StaffCard staff={item}/>  
                )}
            />
            <ContinueButton {...{selected}} next="service" />
        </div>
    );
}
'use client';
import AvailabilitySteps from "@/components/forms/steps/AvailabilitySteps";
import { MultiForm } from "@/components/UI";
import { AvailabilitySchema, AvailabilityType } from "@/validation/Availability.schema";
import { useRouter } from "next/navigation";

export default function BookingPanel () {
    const router = useRouter()

    const onSubmit = async (formData: AvailabilityType ) => {
        console.log(formData)
        router.refresh()
    }

    const data = {
        storeId: '',
        monday: {
            enabled: false,
            slots: []
        },
        tuesday: {
            enabled: false,
            slots: []
        },
        wednesday: {
            enabled: false,
            slots: []
        },
        thursday: {
            enabled: false,
            slots: []
        },
        friday: {
            enabled: false,
            slots: []
        },
        saturday: {
            enabled: false,
            slots: []
        },
        sunday: {
            enabled: false,
            slots: []
        },
    }

    return (
        <div className="py-6">
            <MultiForm 
                schema={AvailabilitySchema}
                onSubmit={onSubmit}
                initialValues={data}
                steps={AvailabilitySteps}
                ctx={{ stores: [{id: '123456', name: 'first'}] }}
            />
        </div>
    );
}
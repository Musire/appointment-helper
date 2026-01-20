'use client';
import { MultiForm } from "@/components/UI";
import { AvailabilitySchema, AvailabilityType } from "@/validation/Availability.schema";

export default function BookingPanel () {

    const onSubmit = async (formData: AvailabilityType ) => {
        console.log(formData)
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
        }
    }

    return (
        <div className="py-6">
            <MultiForm 
                schema={AvailabilitySchema}
                onSubmit={onSubmit}
                initialValues={data}
            />
        </div>
    );
}
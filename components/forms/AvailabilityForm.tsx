'use client';
import { AvailabilitySchema, AvailabilityType } from "@/validation/Availability.schema";
import { Form } from "../UI";
import { TimeslotInput } from "../dashboards";

export type AvailabilityFormProps = {
    data: AvailabilityType;
    isUpdate?: boolean
    
}

export default function AvailabilityForm ({ data, isUpdate }: AvailabilityFormProps) {
    const handleSubmit = async(formData: AvailabilityType) => {
        console.log(formData)
    }
    return (
        <Form 
            schema={AvailabilitySchema}
            initialValues={data}
            onSubmit={handleSubmit}
        >
            <TimeslotInput 
                trigger="monday"
            />
            <TimeslotInput 
                trigger="tuesday"
            />
        </Form>
    );
}
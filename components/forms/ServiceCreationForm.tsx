'use client';
import { Form, Input } from "@/components/UI";
import { useStore } from "@/context";
import { createService } from "@/domains/store/actions/service.actions";
import { ServiceCreationSchema, ServiceCreationType } from "@/validation/ServiceCreation.schema";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ServiceCreationProps = {
    data: ServiceCreationType;
    isUpdate?: boolean;
}

export default function ServiceCreationForm ({ data, isUpdate }: ServiceCreationProps) {
    const [formError, setError] = useState<string | null>(null)
    const { storeId } = useStore()
    const router = useRouter()


    const handleSubmit = async (formData: ServiceCreationType) => {
        const payload = {...formData, storeId}
        
        const { success, error} = await createService(payload)
        if (!success) {
            setError(error)
            throw new Error('Error upon submission')
        }

        router.back()
    }    
    return (
        <>
        <Form
            initialValues={data}
            schema={ServiceCreationSchema}
            onSubmit={handleSubmit}
            >
            <Input type="hidden" name="storeId" />
            <Input label="service name" name="name" />
            <Input type="number" label="price" name="price" />
        </Form>
        {formError && <p className="mt-6 text-error-dark">{formError}</p>}
        </>
    );
}
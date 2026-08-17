'use client';

import { Form, Input } from "@/components/ui";
import { createStore, updateStore } from "@/domains/store/actions/admin.actions";
import { StoreCreationSchema, StoreCreationType } from "@/validation/StoreCreation.schema";
import { useRouter } from 'next/navigation';
import { useState } from "react";


type StoreCreationFormType = {
    data?: StoreCreationType;
    isUpdate?: boolean;
}

export default function StoreCreationForm ({ data, isUpdate }: StoreCreationFormType) {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    const onSubmit = async (formData: StoreCreationType) => {
        setError(null)

        const { success, error } = isUpdate
            ? await updateStore(formData)
            : await createStore(formData)

        if (!success) {
            setError(error)
            throw new Error(error ?? "Submission failed")
        }

        router.push('/dashboard')
    }

    const passingData = data ?? {
            name: '',
            address: '',
        }
        
    return (
        <>
            <Form 
                onSubmit={onSubmit}
                schema={StoreCreationSchema}
                initialValues={passingData}
                >
                <Input 
                    label="store name"
                    name="name"
                />
                <Input 
                    label="address"
                    name="address"
                />
            </Form>
            {error && <p className="text-error-dark my-6 w-full">{error}</p>}
        </>
    );
}
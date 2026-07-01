'use client';

import { Form, Input } from "@/components/UI";
import { createStore, updateStore } from "@/domains/store/actions/admin.actions";
import { StoreCreationSchema, StoreCreationType } from "@/validation/StoreCreation.schema";
import { useRouter } from 'next/navigation';
import { useState } from "react";

function isValidTimeZone(tz: string): boolean {
    return Intl.supportedValuesOf('timeZone').includes(tz);
}

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

        router.push('/admin/dashboard')
    }

    const passingData = data 
        ? data 
        : {
            name: '',
            description: '',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
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
                    label="description"
                    name="description"
                />
                <Input 
                    name="timezone"
                    type="hidden"
                />
            </Form>
            {error && <p className="text-error-dark my-6 w-full">{error}</p>}
        </>
    );
}
'use client';

import { ActionForm, Input } from "@/components/ui";
import { createStore } from "@/domains/store/store.actions";
import { StoreCreationSchema } from "@/validation/StoreCreation.schema";
import { useRouter } from 'next/navigation';

export default function StoreCreationForm () {
    const router = useRouter()

    const onSuccess = () => {
        router.push('/dashboard')
    }

    return (
        <>
            <ActionForm 
                schema={StoreCreationSchema}
                initialValues={{ name: '', address: '' }}
                actionFn={createStore}
                onSuccess={onSuccess}
            >
                <Input 
                    label="store name"
                    name="name"
                />
                <Input 
                    label="address"
                    name="address"
                />
            </ActionForm>
        </>
    );
}
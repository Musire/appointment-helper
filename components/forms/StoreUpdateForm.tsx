'use client';

import { ActionForm, Input } from "@/components/ui";
import { updateStore } from "@/domains/store/store.actions";
import { StoreUpdateSchema, StoreUpdateType } from "@/validation/StoreCreation.schema";
import { useRouter } from 'next/navigation';

type Props = {
  data: StoreUpdateType
}

export default function StoreUpdateForm ({ data }: Props) {
    const router = useRouter()

    const onSuccess = () => {
        router.push('/dashboard')
    }

    return (
        <>
            <ActionForm 
                schema={StoreUpdateSchema}
                initialValues={data}
                actionFn={updateStore}
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
                <Input 
                    name="id"
                    type="hidden"
                />
            </ActionForm>
        </>
    );
}
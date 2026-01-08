'use client';
import { Form, Input, ControlledInput } from "@/components/UI";
import { useStore } from "@/stores";
import { ServiceCreationSchema, ServiceCreationType } from "@/validation/ServiceCreation.schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DropdownButton } from "@/components/UI/buttons";
import { createService } from "@/app/actions/service.actions";

type ServiceCreationProps = {
    data: ServiceCreationType;
    isUpdate?: boolean;
}

export default function ServiceCreationForm ({ data, isUpdate }: ServiceCreationProps) {
    const [formError, setError] = useState<string | null>(null)
    const { store, categories } = useStore()
    const router = useRouter()


    const handleSubmit = async (formData: ServiceCreationType) => {
        const payload = {...formData, storeId: store.id}
        
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
            <ControlledInput
                label="service category"
                name={'categoryId'}
                children={(field) => (
                    <DropdownButton 
                        options={categories.map(c => c.name)}
                        value={
                            categories.find(c => c.id === field.value)?.name ?? null
                        }
                        onChange={(selectedName) => {
                            const category = categories.find(c => c.name === selectedName)
                            if (category) {
                                field.onChange(category.id)
                            }
                        }}
                    />
                )}
            />
            <Input label="service name" name="name" />
            <Input type="hidden" name="storeId" />
            <Input type="number" label="duration" name="durationMin" />
            <Input type="number" label="price" name="priceCents" />
            <ControlledInput 
                label="service type"
                name="type"
                children={(field) => (
                    <DropdownButton
                        options={['SINGLE', 'COMBO']} 
                        {...{field}}
                    />
                )}
            />

        </Form>
        {formError && <p className="mt-6 text-error-dark">{formError}</p>}
        </>
    );
}
'use client';
import { createCategory } from "@/app/actions/category.actions";
import { Form, Input } from "@/components/UI";
import { useStore } from "@/stores";
import { CategoryCreationSchema, CategoryCreationType } from "@/validation/Category.schema";
import { useRouter } from "next/navigation";
import { useState } from "react";

type CreationCategoryProps = {
    data: CategoryCreationType;
    isUpdate?: boolean;
}

export default function CategoryCreationForm ({ data, isUpdate }: CreationCategoryProps) {
    const [formError, setError] = useState<string | null>(null)
    const { store } = useStore()
    const router = useRouter()
    const handleSubmit = async (formData: CategoryCreationType) => {
        const payload = {...formData, storeId: store.id}
        
        const { success, error} = await createCategory(payload)
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
            schema={CategoryCreationSchema}
            onSubmit={handleSubmit}
            >
            <Input label="category name" name="name" />
            <Input type="hidden" name="storeId" />
        </Form>
        {formError && <p className="mt-6 text-error-dark">{formError}</p>}
        </>
    );
}
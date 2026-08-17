'use client';
import { Form, Input } from "@/components/ui";
import { useStore } from "@/context";
import { createCategory } from "@/domains/store/actions/category.actions";
import { CategoryCreationSchema, CategoryCreationType } from "@/validation/Category.schema";
import { useRouter } from "next/navigation";
import { useState } from "react";

type CreationCategoryProps = {
    data: CategoryCreationType;
    isUpdate?: boolean;
}

export default function CategoryCreationForm ({ data, isUpdate }: CreationCategoryProps) {
    const [formError, setError] = useState<string | null>(null)
    const { storeId } = useStore()
    const router = useRouter()
    const handleSubmit = async (formData: CategoryCreationType) => {
        const payload = {...formData, storeId }
        
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
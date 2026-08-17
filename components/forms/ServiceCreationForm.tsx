'use client';
import { Form, Input } from "@/components/ui";
import { useStore } from "@/context";
import { upsertService } from "@/domains/store/actions/service.actions";
import { ServiceCreationSchema, ServiceCreationType } from "@/validation/ServiceCreation.schema";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type ServiceCreationProps = {
    data: ServiceCreationType;
    isUpdate?: boolean;
}

export default function ServiceCreationForm ({ data, isUpdate }: ServiceCreationProps) {
    const [formError, setError] = useState<string | null>(null)
    const { storeId } = useStore()
    const router = useRouter()
    const [isPending, startTransition] = useTransition();


   const handleSubmit = (formData: ServiceCreationType) => {
        startTransition(async () => {
            try {
                setError(null);

                const injected = { ...formData, storeId };

                console.log(injected);

                const res = await upsertService(injected);
                
                if (!res.success) {
                    setError(res.error)
                    return
                }

                router.back()
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Something went wrong."
                );
            }
        });
    };
    
    return (
        <>
        <Form
            initialValues={data}
            schema={ServiceCreationSchema}
            onSubmit={handleSubmit}
            >
            <Input label="service name" name="name" />
            <Input type="number" label="price" name="price" />
        </Form>
        {formError && <p className="mt-6 text-error-dark">{formError}</p>}
        </>
    );
}
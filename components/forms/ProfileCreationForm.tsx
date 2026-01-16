'use client';
import { ProfileCreationSchema, ProfileCreationType } from "@/validation/ProfileCreation.schema";
import { Form, Input } from "../UI";
import { createStaffProfile } from "@/app/actions/staff.actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export type ProfileCreationFormProps = {
    data: ProfileCreationType
    onClose: () => void;
}

export default function ProfileCreationForm ({ data, onClose }: ProfileCreationFormProps) {   
    const [error, setError] = useState< string | null>(null)
    const router = useRouter()
    const handleSubmit = async (formData: ProfileCreationType) => {
        const payload = {...formData}

        console.log(payload)
        const { success, error } = await createStaffProfile(payload)
        if (!success) {
            setError(error)
            return;
        }
        const closeModal = setTimeout(() => {
            onClose()
            router.refresh()
        }, 300)
        return () => clearTimeout(closeModal)
    }
    return (
        <Form
            initialValues={data}
            schema={ProfileCreationSchema} 
            onSubmit={handleSubmit}   
        >
            <Input 
                label='profile bio'
                name='bio'
                type='text-area'
            />
        </Form>
    );
}
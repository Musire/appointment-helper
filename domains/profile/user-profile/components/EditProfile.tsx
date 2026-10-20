'use client';

import { FileUploader, StatusButton } from "@/components/ui";
import { ActionResponse } from "@/domains/auth/auth.types";
import { useState, useTransition } from "react";
import { editUser } from "../actions/user.actions";

export default function EditProfile () {
    const [isPending, startTransition] = useTransition();
    
    const [formState, setFormState] = useState<ActionResponse<{ user: any }>>({ 
        success: false, 
        data: undefined, 
        error: undefined 
    });

    const handleSubmit = (formData: FormData) => {

        startTransition(async () => {
            const result = await editUser(formState, formData);
            setFormState(result as ActionResponse<{ user: any }>);
        });
    };

    return (
        <form action={ e => handleSubmit(e)} className="" >
            <FileUploader />
            <StatusButton state={formState} isPending={isPending} />
            {!formState.success && formState.error && (
                <p className="">{formState.error}</p>
            )}
        </form>
    );
}

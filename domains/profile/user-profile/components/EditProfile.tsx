'use client';

import { FileUploader, StatusButton } from "@/components/ui";
import { useActionState } from "react";
import { editUser } from "../actions/user.actions";
import { UploadState } from "@/features/image-validation/actions/image-uploading.actions";

type ProfileFormState = UploadState & {
    error: string | null;
}

export default function EditProfile () {
    const initialState: ProfileFormState = {
        success: false,
        message: '',
        error: null
    }

    // Wrap the action to ensure the returned state matches ProfileFormState
    const handleAction = async (prevState: ProfileFormState, formData: FormData): Promise<ProfileFormState> => {
        const result = await editUser(prevState, formData);
        return {
            ...result,
            error: null 
        };
    };

    const [formState, formAction, isPending] = useActionState(handleAction, initialState);

    return (
        <form action={formAction} className="">
            <FileUploader />
            <StatusButton state={formState} isPending={isPending} />
            {!formState?.success && formState?.message && (
                <p className="">{formState.message}</p>
            )}
        </form>
    );
}
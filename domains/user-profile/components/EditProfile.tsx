'use client';

import { FileUploader, StatusButton } from "@/components/UI";
import { UploadState } from "@/domains/image-validation/actions/image-uploading.actions";
import { useActionState } from "react";
import { editUser } from "../actions/user.actions";

export default function EditProfile () {
    const initialState: UploadState = {
        success: false,
        message: ''
    }
    const [formState, formAction, isPending] = useActionState(editUser, initialState)
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
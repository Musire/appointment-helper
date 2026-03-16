'use client';

import { FileUploader, StatusButton } from "@/components/UI";
import { uploadImage, UploadState } from "@/domains/image-validation/actions/image-uploading.actions";
import { useActionState } from "react";

export default function TinkerTestPage () {
    const initialState: UploadState = {
        success: false,
        message: ""
    }
    const [state, formAction, isPending] = useActionState(uploadImage, initialState)
    return (
        <div className="p-6 h-dvh w-screen bg-deep text-main">
            <form action={formAction} className=" stacked max-w-xl mx-auto">
                <FileUploader />
                <StatusButton 
                    state={state} 
                    isPending={isPending} 
                />
            </form>
        </div>
    );
}

'use client';

import { ActionResponse } from "@/domains/auth/auth.types";
import { cn } from "@/lib/utils";
import { Button } from "../buttons";

type StatusButtonProps<T> = {
    isPending: boolean;
    state: ActionResponse<T>;
    showSuccess: boolean; 
    className?: string;
    idleText?: string;
}

export default function StatusButton<T>({
    isPending,
    state,
    showSuccess,
    className,
    idleText = "Submit"
}: StatusButtonProps<T>) {

    
    const isError = !!state?.error;

    return (
        <Button
            type="submit"
            disabled={isPending}
            className={cn(
                "px-3 py-2 self-end",
                {
                    "bg-success-dark text-deep hover:bg-success-dark": showSuccess,
                    "bg-error-dark text-deep hover:bg-error-dark": isError,
                    "opacity-70": isPending,
                },
                className
            )}
        >
            {isPending ? (
                "Loading..."
            ) : showSuccess ? (
                "Success!"
            ) : isError ? (
                "Try Again"
            ) : (
                idleText
            )}
        </Button>
    );
}

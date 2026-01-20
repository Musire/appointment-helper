'use client'; 

import { AvailabilityType } from "@/validation/Availability.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z, { output } from "zod";

export default function useMultiForm <S extends z.ZodObject<any>> (
    initialValues: unknown, 
    schema: unknown,
    onSubmit: (x: output<S>) => void,
    error?: string | null
) {
    const methods = useForm<AvailabilityType>({
        resolver: zodResolver(schema as any),
        defaultValues: initialValues as any,
        mode: "onBlur",
        shouldUnregister: false
    });

    const {
      trigger,
      handleSubmit,
      setError,
      clearErrors,
      reset,
      formState: { isSubmitting, isSubmitSuccessful, errors }
    } = methods;

    const hasErrors = Object.keys(errors).length > 0;
    const showError = !isSubmitting && hasErrors;
    const showSuccess = !isSubmitting && isSubmitSuccessful && !hasErrors;

    const wrappedSubmit: SubmitHandler<z.infer<S>> = (data) => {
        clearErrors("root.server"); // clear previous server errors
        try {
            onSubmit(data);
        } catch (err: any) {
            const message = err?.message || "Unexpected error";
            setError("root.server", { type: "server", message });
        }
    };

    // set form error to the global error passed
    useEffect(() => {
          if(error) setError("root.server", { type: "server", message: error })
    }, [error])
    
    // reset form after 1s if successful
    useEffect(() => {
        if (!isSubmitSuccessful) return;
        console.log('successful submit and timeout started ')

        const timeoutId = setTimeout(() => {
        reset();
    }, 1000)

        return () => clearTimeout(timeoutId);
    }, [isSubmitSuccessful, reset]);

    return {
        trigger,
        handleSubmit,
        setError,
        clearErrors,
        reset,
        isSubmitting,
        isSubmitSuccessful, 
        errors,
        showError,
        showSuccess,
        methods,
        wrappedSubmit
    };
}
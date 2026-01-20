'use client';

import { AvailibilitySteps } from "@/components/forms/steps";
import { useMultiForm } from "@/hooks";
import { stepReducer } from "@/reducers";
import { AvailabilityType } from "@/validation/Availability.schema";
import { useReducer } from "react";
import { FieldValues, FormProvider, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { FormError, MultiActionTray } from ".";

interface FormProps<S extends z.ZodTypeAny> {
  schema: S;
  initialValues: z.infer<S>;
  onSubmit: (x: z.infer<S>) => void;
  error?: string | null;
}

export default function MultiForm<S extends z.ZodObject<any>> ({ initialValues, onSubmit, schema, error }: FormProps<S>) {
    const {
        handleSubmit,
        isSubmitting,
        errors,
        showError,
        showSuccess,
        trigger,
        methods,
        wrappedSubmit
    } = useMultiForm<S>(initialValues, schema, onSubmit, error)

    const [state, dispatch] = useReducer(stepReducer, { index: 0 });
    const isLast = state.index === AvailibilitySteps.length - 1;

    const Panel = AvailibilitySteps[state.index]?.Panel

    const onNext = async () => {
      const fields = AvailibilitySteps[state.index].fields;
      const isValid = await trigger(fields);
      if (!isValid) return;
      dispatch({ type: "NEXT" });
      console.log('moving to next')
    };

    return (
      <FormProvider {...methods}>
        <form
          className="flex flex-col min-w-72 max-w-lg w-full grow h-full space-y-4 "
          onSubmit={handleSubmit(wrappedSubmit as SubmitHandler<FieldValues>)}
        >
          <Panel />
          <MultiActionTray
            index={state.index}
            isLast={isLast}
            onBack={() => dispatch({ type: 'BACK' })}
            onNext={onNext}
            formState={{
              isSubmitting,
              showError,
              showSuccess
            }}
          />
        </form>
        <FormError<AvailabilityType>
          showError={showError}
          errors={errors}
        />
      </FormProvider>
    );
}
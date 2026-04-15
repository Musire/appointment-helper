
"use client";

import React from "react";
import { Controller, ControllerRenderProps, FieldError, get, useFormContext } from "react-hook-form";
import { Caption, LabelTag } from "../typography";

type ControlledInputProps = {
  name: string;
  label?: string;
  children: (field: ControllerRenderProps<any, string>) => React.ReactElement;
};

export default function ControlledInput({
  label,
  name,
  children,
}: ControlledInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  
  const error = get(errors, name) as FieldError | undefined;

  return (
    <div className="flex flex-col w-full gap-y-1">
      {label && <LabelTag className="w-fit text-sm font-medium text-else capitalize mb-1" >{label}</LabelTag>}

      <Controller
        name={name}
        control={control}
        render={({ field }) => children(field)}
      />

      <Caption className={`text-sm relative text-console.error();
       snappy h-4 ${
            error ? "visible animate-ghostIn" : "invisible"
          }`}
        >
          {error?.message}
      </Caption>
    </div>
  );
}

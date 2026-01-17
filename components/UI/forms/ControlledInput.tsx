
"use client";

import React from "react";
import { Controller, FieldError, get, useFormContext } from "react-hook-form";

type ControlledInputProps = {
  name: string;
  label?: string;
  children: (field: {
    value: any;
    onChange: (value: any) => void;
    onBlur: () => void;
    name: string;
    ref: React.Ref<any>;
  }) => React.ReactElement;
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
      {label && <legend className="w-full text-lg capitalize mb-1" >{label}</legend>}

      <Controller
        name={name}
        control={control}
        render={({ field }) => children(field)}
      />

      <p className={`text-sm relative text-error-dark snappy h-4 ${
            error ? "visible animate-ghostIn" : "invisible"
          }`}
        >
          {error?.message}
      </p>
    </div>
  );
}

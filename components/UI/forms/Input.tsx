"use client";

import {
  useFormContext,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

// Discriminated union for input vs textarea
type FormFieldProps<T extends FieldValues> =
  | ({
      label: string;
      name: Path<T>;
      as?: "input"; // default
      type?: InputHTMLAttributes<HTMLInputElement>["type"];
    } & InputHTMLAttributes<HTMLInputElement>)
  | ({
      label: string;
      name: Path<T>;
      as: "textarea";
      type?: string;
    } & TextareaHTMLAttributes<HTMLTextAreaElement>);


export default function Input<T extends FieldValues>(
  props: FormFieldProps<T>
) {
  const {
    label,
    name,
    as = "input",
    ...rest
  } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const fieldError = errors[name] as FieldError | undefined;

  const baseClasses =
    "grow bg-transparent border border-white/40 rounded-lg focus:outline-none text-base normal-space text-white/60";

  if (as === "textarea") {
    return (
      <div>
        <label className="flex flex-col w-full space-y-1">
          <span className="w-fit capitalize text-white/75 text-lg">{label}</span>

          <textarea
            {...register(name)}
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            className={`min-h-32 ${baseClasses} ${
              fieldError ? "border-error-dark snappy scrollbar-adjust" : ""
            }`}
          />

          <p className="text-sm relative text-error-dark snappy h-4">
            {fieldError?.message}
          </p>
        </label>
      </div>
    );
  }

  // ⬇️ TypeScript KNOWS this is the input branch here
  return (
    <div>
      <label className="flex flex-col w-full space-y-1">
        <span className="w-fit capitalize text-white/75 text-lg">{label}</span>

        <input
          type={props.type}
          {...register(name)}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          className={`${baseClasses} ${
            fieldError ? "border-error-dark snappy" : ""
          }`}
        />

        <p className="text-sm relative text-error-dark snappy h-4">
          {fieldError?.message}
        </p>
      </label>
    </div>
  );
}
